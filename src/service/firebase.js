// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAhyUpQ8n8wN1BJCkOm9OqP1enVGMRBXLU',
  authDomain: 'dv-proyecto.firebaseapp.com',
  projectId: 'dv-proyecto',
  storageBucket: 'dv-proyecto.appspot.com',
  messagingSenderId: '323424264293',
  appId: '1:323424264293:web:a846467ae8089735f4268c'
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)
export const db = getFirestore()
export const auth = getAuth()
