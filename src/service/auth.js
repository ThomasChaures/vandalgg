
import { auth } from './firebase'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';



let userLogged = {
  id: '',
  email: ''
}

let observers = []

onAuthStateChanged(auth, (user) => {
  if (user) {
    userLogged = {
      id: user.uid,
      email: user.email
    }
  } else {
    userLogged = {
      id: null,
      email: null
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
