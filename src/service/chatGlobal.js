import {
  collection,
  addDoc,
  onSnapshot,
  serverTimestamp,
  query,
  orderBy,
  getDoc,
  updateDoc,
  increment,
  doc,
  where,
} from "firebase/firestore";
import { db } from "./firebase";

export async function enviarMensajeAfirebase(newMessage) {
  const chatRef = collection(db, "chat");
  await addDoc(chatRef, {
    ...newMessage,
    created_at: serverTimestamp(),
    likes: 0,
    likesBy: [],
    comentarios: 0,
    comentarios_text: [],
  });
}

/**
 * @param {*} id
 * @param {*} userId
 *
 * Esta funcion lo que busca hacer es permitirle al usuario dar like a los posts.
 *
 *  Funciona de la siguiente manera:
 */
export async function darLike(id, userId) {
  const postRef = doc(db, "chat", id); // Mediante doc() se obtiene la direccion del documento, en exactitud el que necesitamos con la id.
  const postDoc = await getDoc(postRef); // Ya teniendo la referencia lo buscamos con getDoc para que podamos obtener la data.

  if (postDoc.exists()) {
    // Si existe, pasaremos a obtenerla informacion del documento.
    const postData = postDoc.data(); // Obtenemos la info.

    if (!postData.likesBy || !postData.likesBy.includes(userId)) {
      // Si el usuario no se encuentra en el Array 'likesBy' o el Array no existe, se procede a incrementar el dato likes del documento.
      try {
        // Mediante updateDoc() actualizaremos el documento
        await updateDoc(postRef, {
          likes: increment(1),
          likesBy: [...(postData.likesBy || []), userId],
        });
      } catch (err) {
        console.log("Error al dar like:", err);
      }
    } else {
      console.log("El usuario ya ha dado like a este mensaje.");
      await updateDoc(postRef, {
        likes: increment(-1),
        likesBy: postData.likesBy.filter((uid) => uid !== userId),
      });
    }
  } else {
    console.log("El mensaje no existe.");
  }
}

export async function enviarComentarioAlPost(comentario, usertag, username, id) {
  const commentRef = collection(db, "comentario");
  await addDoc(commentRef, {
    post: id,
    comentario: comentario,
    usertag: usertag,
    username: username,
    created_at: serverTimestamp(),
  });
  const postRef = doc(db, "chat", id);
  const postDoc = await getDoc(postRef);

  if (postDoc.exists()) {
    const postData = postDoc.data();

    try {
      await updateDoc(postRef, {
        comentarios: increment(1),
      });
    } catch (err) {
      console.log(err);
    }
  }
}

export function getComentariosDelPost(id, callback) {
  const commentsRef = collection(db, "comentario") // Cambia "comentarios" al nombre de tu colección
  const q = query(commentsRef, where("post", "==", id));// Filtra por el ID del post
  
  return onSnapshot(q, (querySnapshot) => {
    const comentarios = [];
    querySnapshot.forEach((doc) => {
      comentarios.push({ id: doc.id, ...doc.data() });
    });
    callback(comentarios); // Devuelve los comentarios a través del callback
  }, (error) => {
    console.error("Error obteniendo comentarios: ", error);
  });
}

export function cambiosEnElChat(callback) {
  const chatRef = collection(db, "chat");
  const q = query(chatRef, orderBy("created_at"));
  onSnapshot(q, (snapshot) => {
    const messages = snapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });
    callback(messages);
  });
}

export async function obtenerPostsDeUsuarioById(usertag, callback) {
  const chatRef = collection(db, "chat");
  const q = query(chatRef, where("usertag", "==", usertag));
  onSnapshot(q, (snapshot) => {
    const messages = snapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });
    callback(messages);
  });
}
