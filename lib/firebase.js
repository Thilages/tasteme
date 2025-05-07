
import { getTopGerne } from "@/api/movieDataBase";
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
          likedGames: [],
          gerne: [],
          tasteDetails: "",
          tasteTitle: ""
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
  const usersDocRef = doc(db, "users", uid);
  const userData = await getDoc(usersDocRef);

  if (!userData.exists()) {
    console.log("User data not found.");
    return null;
  }

  const details = userData.data();


  const getTop3Names = (items) =>
    items?.length
      ? items
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 3)
        .map((item) => item.name)
      : [];


  const topMovies = [];
  const topGames = [];
  const topSongs = [];


  topMovies.push(...getTop3Names(details.likedMovies || []));
  topGames.push(...getTop3Names(details.likedGames || []));
  topSongs.push(...getTop3Names(details.likedSongs || []));

  const prompt = `Movies:${topMovies.join(",")},
              Games:${topGames.join(",")},
              Songs:${topSongs.join(",")}`

  if (
    topMovies.length >= 3 &&
    topGames.length >= 3 &&
    topSongs.length >= 3 && !details.gerne?.length
  ) {
    const apiUrl = "https://api.groq.com/openai/v1/chat/completions";
    const apiKey = "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";

    const requestBody = {
      messages: [
        {
          role: "system",
          content: `
You are an AI with a distinct, quirky taste in entertainment. I will give you three games, three movies, and three songs. For each, identify two unique words that reflect its essence and show your preferences. Return your response in this format: [{\"game\": \"word1\"}, {\"game\": \"word2\"}, {\"movie\": \"word1\"}, {\"movie\": \"word2\"}, {\"song\": \"word1\"}, {\"song\": \"word2\"}]. Don’t add explanations, just the array.

Example Input:
Games: Call of Duty, The Witcher 3, Minecraft
Movies: The Matrix, Titanic, The Lion King
Songs: Blinding Lights, Bohemian Rhapsody, Shake It Off

Example Output:
[{"game": "fast-paced"}, {"game": "fantasy"}, {"movie": "mind-bending"}, {"movie": "epic"}, {"song": "nostalgic"}, {"song": "timeless"}]
`

        },
        {
          role: "user",
          content: `Movies:${topMovies.map((item) => `${item},`)}
                    Games:${topGames.map((item) => `${item},`)}
                    Songs:${topSongs.map((item) => `${item},`)}          
          
          `,
        },
      ],
      model: "llama-3.3-70b-versatile",
    };

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey} `,
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status} `);
      }

      const data = await response.json();
      const groqResponse = data.choices[0].message.content.trim()
      console.log(groqResponse)

      const parsedArrary = JSON.parse(groqResponse)

      const { type, description } = await getUserType(prompt)
      await upDataGerne(uid, parsedArrary, type, description)
    } catch (error) {
      console.error("Error:", error.message);
    }
  } else {
    console.log(
      "User doesn't have enough liked items in one or more categories."
    );
  }



  return details;
};


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
      message: `${error} `,
      error: true,
    });
  }
}


export const upDataGerne = async (uid, gerneArrary, type, details) => {
  console.log(type)
  try {
    console.log(gerneArrary, type, details)
    const usersDocRef = doc(db, "users", uid)
    await updateDoc(usersDocRef, { gerne: gerneArrary })
    await updateDoc(usersDocRef, { tasteDetails: details })
    await updateDoc(usersDocRef, { tasteTitle: type })

  } catch (error) {
    console.log(error)
  }
}

const getUserType = async (lists) => {
  console.log(lists.trim())
  const apiUrl = "https://api.groq.com/openai/v1/chat/completions";
  const apiKey = "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";

  const requestBody = {
    messages: [
      {
        role: "system",
        content: ` You are a creative personality profiler. The user will provide you three movies, three songs, and three games. Your task is to:

        1. Create a unique, scientific-sounding name that reflects their tastes across all nine choices.
        2. Write an explanation just about the name. The description should be around 277 characters, reflecting the user's preferences.
        
        Only respond with a JSON object in this exact format:
        
        {
          "type": "<your unique scientific-sounding name>",
          "description": "<explanation of the name>"
        }

        example output:

        {
          "type": "Adrenoximus",
          "description": "Suggesting a person who thrives on high-energy, action-packed experiences. It perfectly encapsulates a preference for intense, fast-paced games, movies, and music that get the heart racing."
        }
        `

      },
      {
        role: "user",
        content: lists,
      },
    ],
    model: "llama-3.3-70b-versatile",
  };

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey} `,
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status} `);
    }

    const data = await response.json();
    const groqResponse = data.choices[0].message.content.trim()
    const object = JSON.parse(groqResponse)
    return object
  }
  catch (error) {
    console.error("Error:", error.message);
  }
}



export const getUserdataByName = async (username) => {
  try {
    console.log("Searching for username:", username);

    // Reference the "users" collection
    const userRef = collection(db, "users");

    // Create a query to find documents where "name" == username
    const q = query(userRef, where("name", "==", username));

    // Execute the query
    const snapshot = await getDocs(q);

    // Check if there are documents in the snapshot
    if (!snapshot.empty) {
      // Extract data from each document
      const userData = snapshot.docs.map((doc) => ({
        id: doc.id, // Document ID
        ...doc.data(), // Document fields
      }));

      console.log("User data:", userData[0]);
      return userData; // Return the array of user data
    } else {
      console.log("No users found with the given name.");
      return [];
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error; // Re-throw the error for the calling function to handle
  }
};
