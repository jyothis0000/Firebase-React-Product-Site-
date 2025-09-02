import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  updateProfile
} from 'firebase/auth'
import { doc, setDoc, getDoc } from 'firebase/firestore'
import { auth, db } from './config'

export const signUp = async (email, password, userData) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    const user = userCredential.user
    
    await updateProfile(user, {
      displayName: userData.fullName
    })
    
    await setDoc(doc(db, 'users', user.uid), {
      uid: user.uid,
      email: user.email,
      fullName: userData.fullName,
      dob: userData.dob,
      mobile: userData.mobile,
      createdAt: new Date().toISOString()
    })
    
    return { success: true, user }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

export const signIn = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    return { success: true, user: userCredential.user }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

export const signOutUser = async () => {
  try {
    await signOut(auth)
    return { success: true }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

export const getCurrentUserData = async (uid) => {
  try {
    const userDoc = await getDoc(doc(db, 'users', uid))
    if (userDoc.exists()) {
      return { success: true, data: userDoc.data() }
    } else {
      return { success: false, error: 'User data not found' }
    }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

export const onAuthStateChange = (callback) => {
  return onAuthStateChanged(auth, callback)
} 