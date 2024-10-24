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

function tokenizar(contenido) {
  // Convierte el contenido a minúsculas y lo divide en palabras usando espacios como separador.
  // El resultado es un array donde cada elemento es una palabra.
  const palabras = contenido.toLowerCase().split(/\s+/);
  let tokens = []; // Inicializa un array vacío para almacenar los tokens generados.

  // Recorre cada palabra en el array de palabras.
  palabras.forEach((palabra) => {
    // Comprueba que la palabra no esté vacía (puede ocurrir si hay múltiples espacios).
    if (palabra) {
      // Genera subtokens para la palabra actual y los añade al array de tokens.
      tokens = tokens.concat(generarSubTokens(palabra));
    }
  });

  // Genera combinaciones de palabras.
  for (let i = 0; i < palabras.length; i++) {
    // Inicia un segundo bucle para crear combinaciones de palabras.
    for (let j = i + 1; j <= palabras.length; j++) {
      // Crea una frase combinando palabras desde el índice i hasta j.
      const frase = palabras.slice(i, j).join(" ");
      // Asegura que la frase no esté vacía antes de añadirla a los tokens.
      if (frase) {
        tokens.push(frase); // Añade la frase combinada al array de tokens.
      }
    }
  }

  // Devuelve el array de tokens generados.
  return tokens;
}

function generarSubTokens(palabra) {
  let subTokens = []; // Inicializa un array vacío para almacenar los subtokens generados.

  // Genera subtokens de la palabra. La variable i representa la longitud del subtoken.
  for (let i = 1; i <= palabra.length; i++) {
    // Añade al array subTokens la parte de la palabra desde el inicio hasta el índice i.
    subTokens.push(palabra.slice(0, i));
  }

  // Devuelve el array de subtokens generados.
  return subTokens;
}

/**
 *
 * @param {object} newMessage
 *
 * Primero se toma la referencia de la collection 'chat' y después con addDoc() se crea el mensaje con el objeto pasado y
 * algunos datos extras para su seguimiento.
 */
export async function enviarMensajeAfirebase(newMessage) {
  const post = newMessage.content;
  const token = tokenizar(post); // Tokenizar el contenido del mensaje

  const chatRef = collection(db, "chat");
  await addDoc(chatRef, {
    ...newMessage,
    created_at: serverTimestamp(),
    likes: 0,
    likesBy: [],
    tokens: token, // Guardar los tokens generados
    comentarios: 0,
    comentarios_text: [],
  });
}

/**
 * @param {*} id
 * @param {*} userId
 *
 * Esta función lo que busca hacer es permitirle al usuario dar like a los posts. Primero se referencia
 * el documento del chat al que queremos accionar. Hacemos la búsqueda y si este existe procedemos a realizar
 * la modificaciones en los datos dando a entender que se likeo el post. El usuario sera agregado a un array de usuarios
 * y se incrementara el numero de likes. Ademas en caso de que el usuario ya haya dado like si activa la función otra vez,
 * pasara lo contrario a lo dicho anteriormente.
 *
 */
export async function darLike(id, userId) {
  const postRef = doc(db, "chat", id);
  const postDoc = await getDoc(postRef);

  if (postDoc.exists()) {
    const postData = postDoc.data();

    if (!postData.likesBy || !postData.likesBy.includes(userId)) {
      try {
        await updateDoc(postRef, {
          likes: increment(1),
          likesBy: [...(postData.likesBy || []), userId],
        });
      } catch (err) {
        throw err;
      }
    } else {
      await updateDoc(postRef, {
        likes: increment(-1),
        likesBy: postData.likesBy.filter((uid) => uid !== userId),
      });
    }
  }
}

/**
 *
 * @param {string} comentario
 * @param {string} usertag
 * @param {string} username
 * @param {string} id
 *
 * Primero se referencia la collection 'comentarios', despues se crea el comentario. Se referencia el post inicial y se epera
 * a obtener el documento. Si existe se incrementa el numero de comentarios. El id de parametro que se usa, es el id de documento del post.
 */
export async function enviarComentarioAlPost(
  comentario,
  usertag,
  username,
  id,
  fecha,
  foto
) {
  const commentRef = collection(db, "comentario");
  await addDoc(commentRef, {
    post: id,
    comentario: comentario,
    usertag: usertag,
    username: username,
    fecha,
    foto,
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
      throw err;
    }
  }
}

/**
 *
 * @param {*} id
 * @param {*} callback
 *
 * Esta funcion lo que hace es recibir el id del post, que seria el del documento y por medio de una query buscar
 * los comentarios que tengan en el valor post el id del documento. Entonces los pushea todos en un array. Despues
 * el usuario los obtiene por medio de un callback.
 */
export function getComentariosDelPost(id, callback) {
  const commentsRef = collection(db, "comentario");
  const q = query(commentsRef, where("post", "==", id));

  return onSnapshot(
    q,
    (querySnapshot) => {
      const comentarios = [];
      querySnapshot.forEach((doc) => {
        comentarios.push({ id: doc.id, ...doc.data() });
      });
      callback(comentarios);
    },
    (error) => {
      console.error("Error obteniendo comentarios: ", error);
    }
  );
}

/**
 *
 * @param {*} callback
 *
 * Esta funcion lo que hace es devolver los documentos en forma de objeto que hay en la collection 'chat'.
 *
 */
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

export function obtenerPost(callback, id) {
  const chatRef = doc(db, "chat", id);
  onSnapshot(chatRef, (doc) => {
    if (doc.exists()) {
      const post = {
        id: doc.id,
        ...doc.data()
      };
      callback(post);
    } else {
      console.log("El documento no existe");
    }
  });
  
}

/**
 *
 * @param {string} usertag
 * @param {*} callback
 *
 * Mediante esta función se permite obtener los post un usuario mediante su usertag. Se referencia a una collection, en
 * este caso a la del chat y después se establece un query el cual tiene como objetivo encontrar al usuario.
 * Si este existe entonces se devuelve, en otro caso no.
 */
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
