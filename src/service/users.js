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



  export async function darFollow(myemail, useremail) {
      // Crear una consulta para buscar el usuario por correo electrónico
      const usersRef = collection(db, 'usuario');
      const q = query(usersRef, where("id", "==", useremail));
      
      const querySnapshot = await getDocs(q);
      
      if (querySnapshot.empty) {
          console.log('Este usuario no existe.');
          return null;  // Retorna null si el usuario no existe
      }
  
      const userDoc = querySnapshot.docs[0]; // Obtiene el primer documento que coincide
      const userData = userDoc.data();
  
      try {
          if (!userData.seguidores_cuentas || !userData.seguidores_cuentas.includes(myemail)) {
              // Seguir al usuario
              await updateDoc(userDoc.ref, {
                  seguidores: increment(1),
                  seguidores_cuentas: [...(userData.seguidores_cuentas || []), myemail]
              });
              return true;  // Retorna true si se sigue al usuario
          } else {
              // Dejar de seguir al usuario
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


  export async function localizarLosDatosDelUsuarioLoggeado(id) {
        try{
            const userRer = collection(db, 'usuario')
            const q = query(userRer, where('id', '==', id))
            const querySnapshot = await getDocs(q)

            if(!querySnapshot.empty){
                const userData = querySnapshot.docs[0].data()
                return userData
            } else {
                throw new Error('Usuario no encontrado')
            }
        }catch(err){
            console.log(err)
            throw err
        }
  }

  export async function localizarLosDatosDelUsuarioLoggeadoByUsertag(usertag) {
    try{
        const userRer = collection(db, 'usuario')
        const q = query(userRer, where('usertag', '==', usertag))
        const querySnapshot = await getDocs(q)

        if(!querySnapshot.empty){
            const userData = querySnapshot.docs[0].data()
            return userData
        } else {
            throw new Error('Usuario no encontrado')
        }
    }catch(err){
        console.log(err)
        throw err
    }
}