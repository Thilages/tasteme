
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
          bio: "Edit your bio by taping below",
          likedMovies: [],
          likedSongs: [],
          likedGames: []
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

export const AddMoviesAndTvShows = async (uid, data, onAlert) => {
  try {

    const usersDocRef = doc(db, "users", uid)
    const userDoc = await getDoc(usersDocRef)

    const Userdata = userDoc.data()

    const moviesList = Userdata.likedMovies || []

    const movieExists = moviesList.some((item) => item.posterUrl == data.posterUrl)

    if (movieExists) {
      onAlert({
        title: "Error",
        message: "This item Already exists in your collection",
        error: true,
      })

    } else {
      await updateDoc(usersDocRef, {
        likedMovies: arrayUnion(data)
      })
      onAlert({
        title: "Success",
        message: `${data.name} added to your colelction`,
        error: false,
      })
    }



  } catch (error) {
    console.log(error)
  }

}

export const getLikedMovies = async (uid) => {
  const usersDocRef = doc(db, "users", uid)
  const userData = await getDoc(usersDocRef)

  const movies = userData.data().likedMovies

  return movies
}

export const getLikedSongs = async (uid) => {
  const usersDocRef = doc(db, "users", uid)
  const userData = await getDoc(usersDocRef)

  const movies = userData.data().likedSongs

  return movies
}

export const getLikedGames = async (uid) => {
  const usersDocRef = doc(db, "users", uid)
  const userData = await getDoc(usersDocRef)

  const movies = userData.data().likedGames

  return movies
}

export const AddGames = async (uid, data, onAlert) => {
  try {

    const usersDocRef = doc(db, "users", uid)
    const userDoc = await getDoc(usersDocRef)

    const Userdata = userDoc.data()

    const gameList = Userdata.likedGames || []

    const gameExists = gameList.some((item) => item.posterUrl == data.posterUrl)

    if (gameExists) {
      onAlert({
        title: "Error",
        message: "This item Already exists in your collection",
        error: true,
      })

    } else {
      await updateDoc(usersDocRef, {
        likedGames: arrayUnion(data)
      })
      onAlert({
        title: "Success",
        message: `${data.name} added to your colelction`,
        error: false,
      })
    }



  } catch (error) {
    console.log(error)
  }

}

export const AddSongs = async (uid, data, onAlert) => {
  try {

    const usersDocRef = doc(db, "users", uid);
    const userDoc = await getDoc(usersDocRef);


    const Userdata = userDoc.data();


    const songList = Userdata.likedSongs || [];


    const songExists = songList.some((item) => item.posterUrl === data.posterUrl);
    const songExists_ = songList.some((item) => item.name === data.name);
    if (songExists || songExists_) {

      onAlert({
        title: "Error",
        message: "This song already exists in your collection",
        error: true,
      });
    } else {

      await updateDoc(usersDocRef, {
        likedSongs: arrayUnion(data),
      });


      onAlert({
        title: "Success",
        message: `${data.name} added to your collection`,
        error: false,
      });
    }
  } catch (error) {
    console.error("Error adding song to collection:", error);


    onAlert({
      title: "Error",
      message: "An error occurred while adding the song to your collection. Please try again.",
      error: true,
    });
  }
};

export const getUserData = async (uid) => {
  const usersDocRef = doc(db, "users", uid)
  const userData = await getDoc(usersDocRef)

  const details = userData.data()

  if (
    details.likedGames?.length >= 3 &&
    details.likedMovies?.length >= 3 &&
    details.likedSongs?.length >= 3
  ) {

    console.log("User has enough liked games, movies, and songs.");
  } else {

    console.log("User doesn't have enough liked items in one or more categories.");
  }


  return details
}

export const upDataProfile = async (uid, bio, onAlert) => {
  try {
    const usersDocRef = doc(db, "users", uid)
    await updateDoc(usersDocRef, { bio: bio })
    onAlert({
      title: "Success",
      message: `Bio updated Successfully`,
      error: false,
    });
  } catch (error) {
    onAlert({
      title: "Error",
      message: `${error}`,
      error: true,
    });
  }
}