import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "./firebase";



// Función para subir un archivo a Firebase Storage
export async function fileUpload(ruta, file) {
   const fileRef = ref(storage, ruta);
   await uploadBytes(fileRef, file); // Sube el archivo a la ruta especificada
}

// Función para obtener la URL de descarga de un archivo en Firebase Storage
export async function getFileURL(ruta) {
    const fileRef = ref(storage, ruta);
    const url = await getDownloadURL(fileRef); // Obtiene la URL
    return url; // Devuelve la URL de descarga
}
