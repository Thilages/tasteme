
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"
import { Firestore, getFirestore, doc, setDoc, collection, query, where, getDocs } from "firebase/firestore"


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCBx6dCitHI4Kasr-7Pcq7OSVsxwIwgJ_U",
  authDomain: "tasteme-c7647.firebaseapp.com",
  projectId: "tasteme-c7647",
  storageBucket: "tasteme-c7647.firebasestorage.app",
  messagingSenderId: "349315825036",
  appId: "1:349315825036:web:a73c2870b14718212eeaa9",
  measurementId: "G-S52BNE8FDM"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app)


export const checkAuthStatus = () => {
  const user = auth.currentUser
  return user
}

export const loginUser = () => {

}

export const SignUpUser = async (username, password) => {
  try {
    const name = username.concat("@suck.com")
    console.log(name)
    const userRef = collection(db, "users")
    const q = query(userRef, where("email", "==", name))
    const document = await getDocs(q)

    console.log(document.empty)

    console.log(user.user)
  } catch (error) {
    console.log(error)
  }
}