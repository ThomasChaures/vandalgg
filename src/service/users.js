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
    getDocs
  } from 'firebase/firestore'
  import { db } from './firebase'


  export async function checkFollow(myemail, useremail) {
    // Verifica que myemail y useremail no sean undefined o null
    if (!myemail || !useremail) {
        console.error('Los emails proporcionados no son válidos.', { myemail, useremail });
        return null;
    }

    const usersRef = collection(db, 'usuario');
    const q = query(usersRef, where("id", "==", useremail));

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
        console.error('Los emails proporcionados no son válidos.', { myemail, useremail });
        return null;
    }

    const usersRef = collection(db, 'usuario');
    const q = query(usersRef, where("id", "==", useremail));

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
        return false;
    }
}

  

  export async function crearDatosDeUsuario(id, username, usertag, nacimiento) {
        const userRef = collection(db, 'usuario')
        await addDoc(userRef, {
            id: id,
            username: username,
            usertag: usertag,
            description: '',
            fecha_nacimiento: nacimiento,
            seguidores: 0,
            seguidores_cuentas: [],
            seguidos: 0,
            seguidos_cuentas: []
        })
  }


  export async function localizarLosDatosDelUsuarioLoggeado(email, callback) {
        try{
            const userRerf = collection(db, 'usuario')
            const q = query(userRerf, where('id', '==', email))
            const querySnapshot = await getDocs(q)

            if(!querySnapshot.empty){
                const userData = querySnapshot.docs[0].data()
           

               let userP = {
                    username:userData.username,
                    usertag:userData.usertag
                }

                callback(userP)
            } else {
                callback(null)
            }
        }catch(err){
            console.log(err)
            throw err
        }
  }

  export async function localizarLosDatosDelUsuarioLoggeadoByUsertag(usertag, callback) {
    try {
        const userRef = collection(db, 'usuario'); // Cambié de 'userRer' a 'userRef' para mayor claridad
        const q = query(userRef, where('usertag', '==', usertag));

        const querySnapshot = await getDocs(q); // Usa getDocs para obtener los datos una sola vez

        if (!querySnapshot.empty) {
            const user = querySnapshot.docs[0].data();
            callback(user);
        } else {
            callback(null); // Si no hay resultados
        }

    } catch (err) {
        console.error('Error al localizar los datos del usuario:', err);
        callback(null); // Asegúrate de que el callback se llame incluso si hay un error
    }
}

