
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth"
import { Firestore, getFirestore, doc, setDoc, collection, query, where, getDocs, getDoc, arrayUnion, updateDoc } from "firebase/firestore"




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



export const checkAuthStatus = (callback) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      callback(user)
    } else {
      return null
    }
  });
};

export const loginUser = async (username, password, onAlert) => {
  const email = username.concat("@suck.com")

  try {
    await signInWithEmailAndPassword(auth, email, password)
    onAlert({
      title: "Sign-up successful",
      message: "You have successfully signed up!",
      error: false,
    });
  } catch (error) {
    onAlert({
      title: "Loginn error",
      message: error.message || "An error occurred during Login.",
      error: true,
    });
  }
}

export const SignUpUser = async (username, password, onAlert) => {
  try {
    const email = username.concat("@suck.com");
    const userRef = collection(db, "users");
    const q = query(userRef, where("email", "==", email));
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      try {
        const user = await createUserWithEmailAndPassword(auth, email, password);

        const uid = user.user.uid

        await setDoc(doc(db, "users", uid), {
          name: username,
          email: email,
          likedMovies: [],
        })
        await signInWithEmailAndPassword(auth, email, password)



        onAlert({
          title: "Sign-up successful",
          message: "You have successfully signed up!",
          error: false,
        });
        return user;
      } catch (error) {
        onAlert({
          title: "Sign-up error",
          message: error.message || "An error occurred during sign-up.",
          error: true,
        });
      }
    } else {
      onAlert({
        title: "Sign-up error",
        message: "Name already taken. Please use a different name.",
        error: true,
      });
    }
  } catch (error) {
    console.error("Error fetching user:", error);
    onAlert({
      title: "Sign-up error",
      message: "An unexpected error occurred.",
      error: true,
    });
  }
};

export const logOutUser = async (onAlert) => {

  try {
    await signOut(auth)
    window.location.reload()
    setTimeout(() => {
      onAlert({
        title: "Logged Out",
        message: "Successfully logged Out from your account",
        error: true,
      })
    }, 2000);

  } catch (error) {
    console.log(error)
  }
}

export const AddMoviesAndTvShows = async (uid, data) => {
  try {

    const usersDocRef = doc(db, "users", uid)
    const userDoc = await getDoc(usersDocRef)

    const Userdata = userDoc.data()

    const moviesList = Userdata.likedMovies || []

    const movieExists = moviesList.some((item) => item.name == data.name)

    if (movieExists) {
      console.log("Movies Already in your Collection")

    } else {
      await updateDoc(usersDocRef, {
        likedMovies: arrayUnion(data)
      })
      console.log("movie added to the db")
    }



  } catch (error) {
    console.log(error)
  }

}


