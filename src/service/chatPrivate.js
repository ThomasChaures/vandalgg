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
  getDocs,
  limit,
} from "firebase/firestore";
import { db } from "./firebase";

let chatDocCache = {};

function getCacheKey(senderId, receiverId){
  return [senderId, receiverId].sort().join("_")
}
function getPrivateChatDocFromCache(key){
  return chatDocCache[key] || null
}

function addPrivateChatDocToCache(key, doc){
  chatDocCache[key] = doc
}
async function getPrivateChat(senderId, receiverId) {


  const cacheKey = getCacheKey(senderId, receiverId);
  const cacheDoc = getPrivateChatDocFromCache(cacheKey);

  if(cacheDoc) return cacheDoc

  const chatRef = collection(db, "private-chats");

  const q = query(
    chatRef,
    where("users", "==", {
      [senderId]: true,
      [receiverId]: true,
    }),
    limit(1)
  );

  const chatSnap = await getDocs(q);
  let chatDoc;

  if (chatSnap.empty) {
    chatDoc = await addDoc(chatRef, {
      users: {
        [senderId]: true,
        [receiverId]: true,
      },
      usersArray: [senderId, receiverId],
    });
  } else {
    chatDoc = chatSnap.docs[0];
  }

  addPrivateChatDocToCache(cacheKey, chatDoc)

  return chatDoc;
}

export async function savePrivateChatMessage(senderId, receiverId, text, usertag) {
  const chatDoc = await getPrivateChat(senderId, receiverId);

  const messagesRef = collection(db, `private-chats/${chatDoc.id}/messages`);

  await addDoc(messagesRef, {
    user_id: senderId,
    usertag: usertag,
    content: text,
    created_at: serverTimestamp(),
  });
}

export async function subscribeToPrivateChat(senderId, receiverId, callback) {
  const chatDoc = await getPrivateChat(senderId, receiverId);
  const messagesRef = collection(db, `private-chats/${chatDoc.id}/messages`);

  const q = query(messagesRef, orderBy("created_at"));
  onSnapshot(q, (snap) => {
    const messages = snap.docs.map((doc) => {
      return {
        id: doc.id,
        user_id: doc.data().user_id,
        content: doc.data().content,
        created_at: doc.data().created_at,
      };
    });
    callback(messages);
  });
}

async function getDocIds(user_id) {
  const chatRef = collection(db, "private-chats");
  const q = query(chatRef, where("usersArray", "array-contains", user_id));

  try {
    const querySnapshot = await getDocs(q);


    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
    }));
  } catch (error) {
    console.error("Error al obtener los documentos: ", error);
    return []; 
  }
}


 async function getListadoDeChats(user_id) {
  const docsC = [];


  const chats = await getDocIds(user_id); 


  for (const chat of chats) {
    console.log(chat);

    const messagesRef = collection(db, `private-chats/${chat.id}/messages`);
    const q = query(messagesRef, orderBy("created_at", "desc"), limit(1));
    const messageSnap = await getDocs(q);

    messageSnap.forEach((doc) => {
      docsC.push({
        chatId: chat.id,
        nombre: doc.data().usertag,
        contenido: doc.data().content,
        fecha: doc.data().created_at,
      });
    });
  }

  return docsC; 
}

