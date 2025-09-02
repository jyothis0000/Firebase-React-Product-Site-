import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'


const firebaseConfig = {
    apiKey: "AIzaSyBB7WcS6PBnvLKL_UTcLMJ5g4RicpH-FR8",
    authDomain: "react-user-managment-site.firebaseapp.com",
    projectId: "react-user-managment-site",
    storageBucket: "react-user-managment-site.firebasestorage.app",
    messagingSenderId: "760686288602",
    appId: "1:760686288602:web:081f43a1e2642e36614fe3"
  };

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)

export const db = getFirestore(app)

export default app 