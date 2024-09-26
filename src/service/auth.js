
import { auth } from './firebase'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut} from 'firebase/auth';
import { localizarLosDatosDelUsuario } from './users';


let userLogged = {
  id: '',
  email: '',
  username: '',
  usertag: ''
};

let observers = []

onAuthStateChanged(auth, async (user) => {
  if (user) {
    userLogged.id = user.uid 
    userLogged.email = user.email

    const fullProfile = await localizarLosDatosDelUsuario(user.email)
    userLogged.username = fullProfile.username
    userLogged.usertag = fullProfile.usertag
    
  } else {
    userLogged.id = null;
    userLogged.email = null;
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
