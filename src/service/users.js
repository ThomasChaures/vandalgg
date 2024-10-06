import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  updateDoc,
  increment,
} from "firebase/firestore";
import { db } from "./firebase";

/**
 *  @param { string } myemail  Mail de mi cuenta
 *  @param { string } useremail ID del documento del usuario
 *
 * Esta función hace lo siguiente, primero chequea que los mails sean validos. Después de eso entra a la consulta a
 * firebase. Mediante un query utilizando where. Buscamos el "id_m" que seria el mailID. Este se otorga cuando el usuario se crea la cuenta.
 * Se espera encontrar el documento y se consulta si esta vacío. Si lo esta, devuelve un error. Si no, pasamos la variable userDoc el cual frena la búsqueda
 * cuando encuentra la igualdad, debido al .docs[0]. Se obtiene la data y se valida si el usuario sigue o no al otro.
 *
 * Esto devuelve true o false, asegurado que lo devuelve asi debido a que en el return utilizo un doble !. El cual obliga digamos a devolver ese resultado.
 *
 */
export async function checkFollow(myemail, useremail) {
  if (!myemail || !useremail) {
    console.error("Los emails proporcionados no son válidos.", {
      myemail,
      useremail,
    });
    return null;
  }

  const usersRef = collection(db, "usuario");
  const q = query(usersRef, where("id_m", "==", useremail));

  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) {
    console.log("Este usuario no existe.");
    return null;
  }

  const userDoc = querySnapshot.docs[0];
  const userData = userDoc.data();

  const siguiendo = userData.seguidores_cuentas.find(
    (seguidor) => seguidor === myemail
  );
  return !!siguiendo;
}


/**
 * @param { string } myemail
 * @param { string } useremail
 *
 * Esta función se encarga de permitir al usuario seguir a otro. Primero se toma el mail del usuario loggeado y después el id_m (emailID)
 * del usuario al que se va a seguir.
 *
 * Se inicia la consulta a Firebase, referenciamos la collection, utilizamos un query para buscar el documento del usuario a seguir
 * y esperamos a recibirlo.
 *
 * Esperamos a recibir los datos y cuando los tenemos entramos a un try/catch para contener los posibles errores que pueda tener la acción.
 *
 * Se verifica que el usuario no lo siga y que no tenga un array con seguidores, si da paso entonces se sigue al usuario, si el usuario intenta accionar otra vez
 * se deja de seguir.
 */

export async function darFollow(myemail, useremail) {
  if (!myemail || !useremail) {
    return null;
  }

  const usersRef = collection(db, "usuario");
  const q = query(usersRef, where("id_m", "==", useremail));

  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) {
    console.log("Este usuario no existe.");
    return null;
  }

  const userDoc = querySnapshot.docs[0];
  const userData = userDoc.data();

  try {
    if (
      !userData.seguidores_cuentas ||
      !userData.seguidores_cuentas.includes(myemail)
    ) {
      await updateDoc(userDoc.ref, {
        seguidores: increment(1),
        seguidores_cuentas: [...(userData.seguidores_cuentas || []), myemail],
      });
      return true;
    } else {
      await updateDoc(userDoc.ref, {
        seguidores: increment(-1),
        seguidores_cuentas: userData.seguidores_cuentas.filter(
          (mail) => mail !== myemail
        ),
      });
      return false;
    }
  } catch (err) {
    console.error("Error al actualizar el documento:", err);
  }
}

/**
 *  @param {string} id
 *  @param {string} username
 *  @param {string} usertag
 *
 * Esta función tiene como objetivo crear los datos de un usuario de forma inicial, toma de referencia la collection "usuario". La
 * cual permite mantener las cuentas con mas información.
 */

export async function crearDatosDeUsuario(id, username, usertag) {
  const userRef = collection(db, "usuario");
  await addDoc(userRef, {
    id_m: id,
    username: username,
    usertag: usertag,
    description: "Este usuario aun no tiene descripción.",
    seguidores: 0,
    seguidores_cuentas: [],
    seguidos: 0,
    seguidos_cuentas: [],
    rango: "unranked",
  });
}

/**
 *  @param {string} email
 *
 * Esta función lo que hace es localizar los datos del usuario según su id_m que seria el mail.
 * Decidí utilizar try/catch debido a que tenia ciertos problemas en algunas circunstancias y esto logro solucionarlo.
 * Referencio la collection, después con un query hago una consulta para encontrar el usuario y después mediante getDocs(q) obtengo los datos.
 * Si esta vació devuelve un error. Si no, se pasa mediante un .docs[0] para tener la referencia exacta de la información y con un .data obtenemos
 * el objeto en si.
 *
 * Como resultado si todo salio bien, devuelve todos los datos que tenga el mismo.
 */
export async function localizarLosDatosDelUsuario(email) {
  try {
    const userDoc = collection(db, "usuario");
    const q = query(userDoc, where("id_m", "==", email));
    const qSnapshot = await getDocs(q);

    if (qSnapshot.empty) {
      throw new Error(
        `No se encontró ningún usuario con el correo electrónico ${email}.`
      );
    }

    const userSnapshot = qSnapshot.docs[0];
    const userData = userSnapshot.data();

    return {
      id_m: userData.id_m,
      username: userData.username,
      usertag: userData.usertag,
      description: userData.description,
      fecha_nacimiento: userData.nacimiento,
      seguidores: userData.seguidores,
      seguidores_cuentas: userData.seguidores_cuentas,
      seguidos: userData.seguidos,
      seguidos_cuentas: userData.seguidos_cuentas,
      rango: userData.rango,
    };
  } catch (error) {
    console.error("Error buscando los datos del usuario:", error);
    throw error;
  }
}

/**
 *   @param {string} usertag
 *   @param {devolución de los datos} callback
 *
 *  Esta función busca devolver los datos de un usuario mediante su nombre único. Esto se utiliza en la red social
 *  para cosas como ver el perfil de usuarios.
 *  Cuando uno ve un post/twit/mensaje de un usuario, se puede clickear en el nombre o tag para ir a su perfil.
 *  Este toma de parámetro el tag y se le pasa esta función.
 *
 * Sacando el ejemplo de lado, pasamos a la explicación:
 *
 * Primero referenciamos la collection "usuario", después mediante un query hacemos una consulta.
 * Esperamos a recibir el documento del usuario con un getDocs(q).
 * Si este no esta vacío, se llama a la data del documento exacto y se pasa en un callback.
 * Si no, se pasa null al mismo. También si no pasa el try, el catch devuelve eso también.
 */
export async function localizarLosDatosDelUsuarioLoggeadoByUsertag(
  usertag,
  callback
) {
  try {
    const userRef = collection(db, "usuario");
    const q = query(userRef, where("usertag", "==", usertag));

    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const user = querySnapshot.docs[0].data();
      callback(user);
    } else {
      callback(null);
    }
  } catch (err) {
    console.error("Error al localizar los datos del usuario:", err);
    callback(null);
  }
}


/**
 * @param {string} usertag 
 * 
 * Esta función lo que hace es hacer la búsqueda cotidiana para localizar algún dato y verifica que nadie tenga 
 * el usertag que se introdujo. 
 * 
 * Por ejemplo, al crear la cuenta esta verifica que no exista el tag que se pondrá al usuario para permitírselo a la cuenta.
 * 
 * Para empezar, se llama a la collection "usuario", después con query se hace una búsqueda la cual después con el querySnapshot localizaremos 
 * el documento. Si esta vació devuelve true, si existe devuelve false.
 */
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



/**
 * 
 * @param {string} email 
 * @param {string} description 
 * @param {string} username 
 * @param {string} rango 
 * 
 * Esta función lo que hace es buscar el perfil del usuario mediante el mail y si existe, permite cambiar los valores.
 * Estos son el username, descripción y rango. 
 */
export async function editarPerfil(email, description, username, rango) {
  const userRef = collection(db, "usuario");
  const q = query(userRef, where("id_m", "==", email));
  const querySnapshot = await getDocs(q);

  if (!querySnapshot.empty) {
    const docRef = querySnapshot.docs[0].ref;
    return await updateDoc(docRef, { description, username, rango });
  } else {
    throw new Error("No se encontró el usuario con ese email.");
  }
}
