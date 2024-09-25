
import { auth } from './firebase'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';
import { localizarLosDatosDelUsuarioLoggeado } from './users';

let userLogged = {
  id: '',
  email: '',
  username: '',
  usertag: '',
  posts: [],
  seguidores: 0,
  seguidores_cuentas: [],
  seguidos: 0,
  seguidos_cuentas: []
}

let observers = []

onAuthStateChanged(auth, async (user) => {
  if (user) {
    userLogged.id = user.uid 
    userLogged.email = user.email
    try {
      const data = await localizarLosDatosDelUsuarioLoggeado(userLogged.email);  // Espera a que los datos se resuelvan
      if (data) {
        userLogged.username = data.username;
        userLogged.usertag = data.usertag;
      }
    } catch (error) {
      console.error("Error al localizar los datos del usuario:", error);
    }
  } else {
    userLogged = {
      id: null,
      email: null,
      username:null,
      usertag: null,
      posts: null,
      seguidores: null,
      seguidores_cuentas: null,
      seguidos: null,
      seguidos_cuentas: null
    }
  }
  notifyAll()
})

export function subscribeToAuth(callback){
  observers.push(callback)
  notify(callback)
}

function notify(callback){
  callback({...userLogged})
}

function notifyAll(){
  observers.forEach(callback => notify(callback))
}

export async function login({ email, password }) {
  try {
    await signInWithEmailAndPassword(auth, email, password)
    console.log('Logeado')
  } catch (err) {
    console.log(err)
    throw err
  }
}

export async function cerrarSesion() {
  try {
    await signOut(auth);
    console.log("Sesión cerrada con éxito")
  } catch (error) {
    console.error("Error al cerrar sesión: ", error)
  }
}
export async function register({email, password}) {
    try{
      await createUserWithEmailAndPassword(auth, email, password)
      return true
    } catch (err) {
      console.log(err)
      throw err
    }
} 
