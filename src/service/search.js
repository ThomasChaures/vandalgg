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



export async function busqueda(param, referencia) {
    const ref = collection(db, referencia);
    const q = query(ref, where("tokens", "array-contains", param.toLowerCase()));
    const querySnapshot = await getDocs(q);
    
    let search = [];
    querySnapshot.forEach((doc) => {
      search.push({ id: doc.id, ...doc.data() });
    });
  
    return search;
  }