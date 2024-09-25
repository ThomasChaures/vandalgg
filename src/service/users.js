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



  

  export async function crearDatosDeUsuario(id, username, usertag, nacimiento) {
        const userRef = collection(db, 'usuario')
        await addDoc(userRef, {
            id: id,
            username: username,
            usertag: usertag,
            description: '',
            posts: [], // array en donde se guardarian los uids de cada documento que sea un post del usuario
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