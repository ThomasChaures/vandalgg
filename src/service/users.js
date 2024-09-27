import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  updateDoc,
  increment
} from "firebase/firestore";
import { db } from "./firebase";

  export async function checkFollow(myemail, useremail) {

    if (!myemail || !useremail) {
        console.error('Los emails proporcionados no son válidos.', { myemail, useremail });
        return null;
    }

    const usersRef = collection(db, 'usuario');
    const q = query(usersRef, where("id_m", "==", useremail));

    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
        console.log('Este usuario no existe.');
        return null;
    }

    const userDoc = querySnapshot.docs[0];
    const userData = userDoc.data();

    const siguiendo = userData.seguidores_cuentas.find(seguidor => seguidor === myemail);
    return !!siguiendo;
}

export async function darFollow(myemail, useremail) {
    // Verifica que myemail y useremail no sean undefined o null
    if (!myemail || !useremail) {
        return null;
    }

    const usersRef = collection(db, 'usuario');
    const q = query(usersRef, where("id_m", "==", useremail));

    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
        console.log('Este usuario no existe.');
        return null;
    }

    const userDoc = querySnapshot.docs[0];
    const userData = userDoc.data();

    try {
        if (!userData.seguidores_cuentas || !userData.seguidores_cuentas.includes(myemail)) {
            // Añadir seguidor
            await updateDoc(userDoc.ref, {
                seguidores: increment(1),
                seguidores_cuentas: [...(userData.seguidores_cuentas || []), myemail]
            });
            return true;
        } else {
            // Eliminar seguidor
            await updateDoc(userDoc.ref, {
                seguidores: increment(-1),
                seguidores_cuentas: userData.seguidores_cuentas.filter(mail => mail !== myemail)
            });
            return false;
        }
    } catch (err) {
        console.error('Error al actualizar el documento:', err);
       
    }
}

export async function crearDatosDeUsuario(id, username, usertag) {
  const userRef = collection(db, "usuario");
  await addDoc(userRef, {
    id_m: id,
    username: username,
    usertag: usertag,
    description: "Este usuario aun no tiene descripcion.",
    seguidores: 0,
    seguidores_cuentas: [],
    seguidos: 0,
    seguidos_cuentas: [],
  });
}

export async function localizarLosDatosDelUsuario(email) {
  try {
    // Crea una referencia a la colección y ejecuta la consulta donde 'id_m' es igual al email
    const userDoc = collection(db, "usuario");
    const q = query(userDoc, where("id_m", "==", email));
    const qSnapshot = await getDocs(q); // Ejecuta la consulta con getDocs

    // Verifica si la consulta trajo resultados
    if (qSnapshot.empty) {
      throw new Error(
        `No se encontró ningún usuario con el correo electrónico ${email}.`
      );
    }

    // Obtén el primer documento de los resultados (en caso de que haya más de uno)
    const userSnapshot = qSnapshot.docs[0];
    const userData = userSnapshot.data(); // Obtén los datos del documento

    // Retorna los datos del usuario
    return {
      id_m: userData.id_m,
      username: userData.username,
      usertag: userData.usertag,
      description: userData.description,
      fecha_nacimiento: userData.nacimiento,
      seguidores: userData.seguidor,
      seguidores_cuentas: userData.seguidores_cuentas,
      seguidos: userData.seguidos,
      seguidos_cuentas: userData.seguidos_cuentas,
    };
  } catch (error) {
    console.error("Error buscando los datos del usuario:", error);
    throw error;
  }
}

export async function localizarLosDatosDelUsuarioLoggeadoByUsertag(
  usertag,
  callback
) {
  try {
    const userRef = collection(db, "usuario");
    const q = query(userRef, where("usertag", "==", usertag));

    const querySnapshot = await getDocs(q); // Usa getDocs para obtener los datos una sola vez

    if (!querySnapshot.empty) {
      const user = querySnapshot.docs[0].data();
      callback(user);
    } else {
      callback(null);
    }
  } catch (err) {
    console.error("Error al localizar los datos del usuario:", err);
    callback(null); // Asegúrate de que el callback se llame incluso si hay un error
  }
}

export async function esUnicoTag(usertag) {
  const userRef = collection(db, "usuario");
  const q = query(userRef, where("usertag", "==", usertag));
  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) {
    return true;
  } else {
    return false;
  }
}

export async function editarPerfil(email, description, username, usertag) {
  const userRef = collection(db, "usuario");
  const q = query(userRef, where("id_m", "==", email));
  const querySnapshot = await getDocs(q);

  if (!querySnapshot.empty) {
    const docRef = querySnapshot.docs[0].ref; // Toma el primer documento que cumple con el criterio
    return await updateDoc(docRef, { description, username, usertag });
  } else {
    throw new Error("No se encontró el usuario con ese email.");
  }
}
