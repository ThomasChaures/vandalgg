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

async function getPrivateChat(senderTag, receiverTag) {
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
    });
  } else {
    chatDoc = chatSnap.docs[0];
  }

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
