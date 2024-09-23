import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from './firebase'

export async function login({ email, password }) {
  try {
    await signInWithEmailAndPassword(auth, email, password)
    console.log('Logeado')
  } catch (err) {
    console.log(err)
    throw err
  }
}
