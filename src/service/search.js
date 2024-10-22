import {
  collection,
  addDoc,
  onSnapshot,
  serverTimestamp,
  query,
  getDocs,
  orderBy,
  getDoc,
  updateDoc,
  increment,
  doc,
  where,
} from "firebase/firestore";
import { db } from "./firebase";

export async function busqueda(param, referencia, callback) {
  const ref = collection(db, referencia);
  const q = query(ref, where("tokens", "array-contains", param.toLowerCase()));
  onSnapshot(q, (snapshote) => {
    const messages = snapshote.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });

    callback(messages);
  });
}
