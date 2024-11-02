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

function getCacheKey(senderTag, receiverTag){
  return [senderTag, receiverTag].sort().join("_")
}
function getPrivateChatDocFromCache(key){
  return chatDocCache[key] || null
}

function addPrivateChatDocToCache(key, doc){
  chatDocCache[key] = doc
}
async function getPrivateChat(senderTag, receiverTag) {


  const cacheKey = getCacheKey(senderTag, receiverTag);
  const cacheDoc = getPrivateChatDocFromCache(cacheKey);

  if(cacheDoc) return cacheDoc

  const chatRef = collection(db, "private-chats");

  const q = query(
    chatRef,
    where("users", "==", {
      [senderTag]: true,
      [receiverTag]: true,
    }),
    limit(1)
  );

  const chatSnap = await getDocs(q);
  let chatDoc;

  if (chatSnap.empty) {
    chatDoc = await addDoc(chatRef, {
      users: {
        [senderTag]: true,
        [receiverTag]: true,
      },
      usersArray: [senderTag, receiverTag],
    });
  } else {
    chatDoc = chatSnap.docs[0];
  }

  addPrivateChatDocToCache(cacheKey, chatDoc)

  return chatDoc;
}

export async function savePrivateChatMessage(senderTag, receiverTag, text) {
  const chatDoc = await getPrivateChat(senderTag, receiverTag);

  const messagesRef = collection(db, `private-chats/${chatDoc.id}/messages`);

  await addDoc(messagesRef, {
    user: senderTag,
    content: text,
    created_at: serverTimestamp(),
  });
}

export async function subscribeToPrivateChat(senderTag, receiverTag, callback) {
  const chatDoc = await getPrivateChat(senderTag, receiverTag);
  const messagesRef = collection(db, `private-chats/${chatDoc.id}/messages`);

  const q = query(messagesRef, orderBy("created_at"));
  onSnapshot(q, (snap) => {
    const messages = snap.docs.map((doc) => {
      return {
        id: doc.id,
        user_id: doc.data().user,
        content: doc.data().content,
        created_at: doc.data().created_at,
      };
    });
    callback(messages);
  });
}

async function getDocIds(usertag, callback) {
  const chatRef = collection(db, "private-chats");

  console.log(usertag);

  const q = query(chatRef, where("usersArray", "array-contains", usertag));

  try {
    const querySnapshot = await getDocs(q);
    const chats = querySnapshot.docs.map((doc) => {
      console.log(doc);
      return {
        id: doc.id,
      };
    });

    callback(chats);
  } catch (error) {
    console.error("Error al obtener los documentos: ", error);
    callback([]);
  }
}

export async function getListadoDeChats(usertag) {
  const docsC = [];

  await getDocIds(usertag, async (chats) => {
    for (const chat of chats) {
      console.log(chat);
      const messagesRef = collection(db, `private-chats/${chat.id}/messages`);

      const q = query(messagesRef, orderBy("created_at", "desc"), limit(1));
      const messageSnap = await getDocs(q);

      messageSnap.forEach((doc) => {
        docsC.push({
          chatId: chat.id,
          nombre: doc.data().user,
          contenido: doc.data().content,
          fecha: doc.data().created_at,
        });
      });
    }
  });

  return docsC;
}
