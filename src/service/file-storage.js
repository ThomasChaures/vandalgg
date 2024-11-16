import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "./firebase";



// Función para subir un archivo a Firebase Storage
export async function fileUpload(ruta, file) {
   const fileRef = ref(storage, ruta);
   await uploadBytes(fileRef, file); 
   console.log('end')// Sube el archivo a la ruta especificada
}

// Función para obtener la URL de descarga de un archivo en Firebase Storage
export async function getFileURL(ruta) {
    console.log('1')
    const fileRef = ref(storage, ruta);
    console.log('2', fileRef)
    const url = await getDownloadURL(fileRef); // Obtiene la URL
    return url; // Devuelve la URL de descarga
}
