import fb from "firebase/app";
import "firebase/firestore";

if (!fb.apps.length) {
  const config = {
    apiKey: "AIzaSyB9rKHygzD5wVhazGNmCsGtYH0EvXWMPJU",
    authDomain: "dengerin-de0d1.firebaseapp.com",
    databaseURL: "https://dengerin-de0d1.firebaseio.com",
    projectId: "dengerin-de0d1",
    storageBucket: "dengerin-de0d1.appspot.com",
    messagingSenderId: "435712346276",
    appId: "1:435712346276:web:e230e5f76fcbfadb697e31",
  };

  fb.initializeApp(config);
}
// Punya Fawwaz :

export const db = fb.firestore();
