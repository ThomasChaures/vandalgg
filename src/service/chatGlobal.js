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
  doc
} from 'firebase/firestore'
import { db } from './firebase'

export async function enviarMensajeAfirebase(newMessage) {
  const chatRef = collection(db, 'chat')
  await addDoc(chatRef, {
    ...newMessage,
    created_at: serverTimestamp(),
    username: 'Usuario',
    usertag: '@usuario',
    likes: 0,
    likesBy: [],
    comentarios: 0,
    comentarios_text: []
  })
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
  const postRef = doc(db, 'chat', id) // Mediante doc() se obtiene la direccion del documento, en exactitud el que necesitamos con la id.
  const postDoc = await getDoc(postRef) // Ya teniendo la referencia lo buscamos con getDoc para que podamos obtener la data.

  if (postDoc.exists()) {
    // Si existe, pasaremos a obtenerla informacion del documento.
    const postData = postDoc.data() // Obtenemos la info.

    if (!postData.likesBy || !postData.likesBy.includes(userId)) {
      // Si el usuario no se encuentra en el Array 'likesBy' o el Array no existe, se procede a incrementar el dato likes del documento.
      try {
        // Mediante updateDoc() actualizaremos el documento
        await updateDoc(postRef, {
          likes: increment(1),
          likesBy: [...(postData.likesBy || []), userId]
        })
      } catch (err) {
        console.log('Error al dar like:', err)
      }
    } else {
      console.log('El usuario ya ha dado like a este mensaje.')
    }
  } else {
    console.log('El mensaje no existe.')
  }
}

export async function enviarComentarioAlPost(comentario) {
  const commentRef = collection(db, 'comentario')
  await addDoc(chatRef, {
    ...comentario,
    created_at: serverTimestamp(),
    username: 'Usuario',
    usertag: '@usuario',
    likes: 0,
    likesBy: []
  })
}

// export async functio getComentariosDelPost(id){
//   const commentRef = getDoc(id,.)
// }

export function cambiosEnElChat(callback) {
  const chatRef = collection(db, 'chat')
  const q = query(chatRef, orderBy('created_at'))
  onSnapshot(q, (snapshot) => {
    const messages = snapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data()
      }
    })
    callback(messages)
  })
}
