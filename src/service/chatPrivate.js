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
    setDoc,
  } from "firebase/firestore";
  import { db } from "./firebase";



  export async function seguimientoDeChat(mytag, usertag) {
    const emails = [mytag, usertag].sort();
    const listChatRef = doc(db, 'chatNotify', `${emails[0]}-to-${emails[1]}`);

    await setDoc(listChatRef, {
        participants: emails, // Guardar los usuarios que participan
        last_updated: serverTimestamp(), // Para saber cuándo fue la última actividad en este chat
        new_message: true // Bandera para saber si hay nuevos mensajes
    }, { merge: true }); // 'merge' asegura que no sobrescribas campos si ya existe el documento
}


export async function enviarPrivateMessage(newMessage, mytag, usertag) {

    const emails = [mytag, usertag].sort()
    const chatPrivateRef = collection(db, `chat/private-${emails[0]}-to-${emails[1]}`)

    await addDoc(chatPrivateRef, {
        ...newMessage,
        created_at: serverTimestamp(),
    })
}


export async function obtenerChatPrivado(mytag, usertag, callback) {
    const emails = [mytag, usertag].sort()
    const chatPrivateRef = collection(db, `chat/private-${emails[0]}-to-${emails[1]}`)
    const q = query(chatPrivateRef, orderBy("created_at"))
    onSnapshot(q, (snap) => {
        const chat = snap.docs.map((doc) => {
            return{
                id: doc.id,
                ...doc.data()
            }
        })
        callback(chat)
    })
}


export async function obtenerListaDeChats(mytag) {
    
}