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
 *  @param {*} myemail  Mail de mi cuenta
 *  @param {*} useremail ID del documento del usuario
 *
 * Esta funcion hace lo siguiente, primero chequea que los mails sean validos. Despues de eso entra a la consulta a
 * firebase. Mediante un query utilizando where. Buscamos el "id_m" que seria el mailID. Este se otorga cuando el usuario se crea la cuenta.
 * Se espera encontrar el documento y se consulta si esta vacio. Si lo esta, devuelve un error. Si no, pasamos la variable userDoc el cual frena la busqueda
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
 * @param { el email del usuario auth } myemail
 * @param { la id del documento del otro usuario } useremail
 *
 * Esta funcion se encarga de permitir al usuario seguir a otro. Primero se toma el mail del usuario loggeado y despues el id_m (emailID)
 * del usuario al que se va a seguir.
 *
 * Se inicia la consulta a Firebase, referenciamos la collection, utilizamos un query para buscar el documento del usuario a seugir
 * y esperamos a recibirlo.
 *
 * Esperamos a recibir los datos y cuando los tenemos entramos a un try/catch para contener los posibles errores que pueda tener la accion.
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
 *  @param {email del usuario registrado} id
 *  @param {nombre del usuario registrado } username
 *  @param {nombre unico del usuario registrado} usertag
 *
 * Esta funcion tiene como objetivo crear los datos de un usuario de forma inicial, toma de referencia la collection "usuario". La
 * cual permite mantener las cuentas con mas informacion.
 */

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
    rango: "unranked",
  });
}

/**
 *  @param {email de usuario equivalente a id_m} email
 *
 * Esta funcion lo que hace es localizar los datos del usuario segun su id_m que seria el mail.
 * Decidi utilizar try/catch debido a que tenia ciertos problemas en algunas circunstancias y esto logro solucionarlo.
 * Referencio la collection, despues con un query hago una consulta para encontrar el usuario y despues mediatne getDocs(q) obtengo los datos.
 * Si esta vacio devuelve un error. Si no, se pasa mediatne un .docs[0] para tener la referencia exacta de la informacion y con un .data obtenemos
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
      seguidores: userData.seguidor,
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
 *   @param {nombre unico del usuario} usertag
 *   @param {devolucion de los datos} callback
 *
 *  Esta funcion busca devolver los datos de un usuario mediante su nombre unico. Esto se utiliza en la red social
 *  para cosas como ver el perfil de usuarios.
 *  Cuando uno ve un post/twit/mensaje de un usuario, se puede clickear en el nombre o tag para ir a su perfil.
 *  Este toma de parametro el tag y se le pasa esta funcion.
 *
 * Sacando el ejemplo de lado, pasamos a la explicacion:
 *
 * Primero referenciamos la collection "usuario", despues mediante un query hacemos una consulta.
 * Esperamos a recibir el documento del usuario con un getDocs(q).
 * Si este no esta vacio, se llama a la data del documento exacto y se pasa en un callback.
 * Si no, se pasa null al mismo. Tambien si no pasa el try, el catch devuele eso tambien.
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
 * @param {nombreunico} usertag 
 * 
 * Esta funcion lo que hace es hacer la busqueda cotidiana para localizar algun dato y verifica que nadie tenga 
 * el usertag que se introdujo. 
 * 
 * Por ejemplo, al crear la cuenta esta verfifica que no exista el tag que se pondra al usuario para permitirselo a la cuenta.
 * 
 * Para empezar, se llama a la collection "usuario", despues con query se hace una busqueda la cual despues con el querySnapshot localizaremos 
 * el documento. Si esta vacio devuelve true, si existe devuelve false.
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
