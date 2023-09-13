// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDbO5W0Wvm0ExKWFte7UaSpiGMNDQ0yr8I",
  authDomain: "netflix-gpt-4f0c9.firebaseapp.com",
  projectId: "netflix-gpt-4f0c9",
  storageBucket: "netflix-gpt-4f0c9.appspot.com",
  messagingSenderId: "1058481467942",
  appId: "1:1058481467942:web:fabfbdb5889419f5e12ce7",
  measurementId: "G-27BKPVS20P",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();
