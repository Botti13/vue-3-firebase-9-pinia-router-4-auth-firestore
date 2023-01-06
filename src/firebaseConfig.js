import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from 'firebase/firestore/lite'
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBFm2mogBHPs-pcC0KX0Xb4a2KWwhEICYs",
    authDomain: "vue-3-2022-3894a.firebaseapp.com",
    projectId: "vue-3-2022-3894a",
    storageBucket: "vue-3-2022-3894a.appspot.com",
    messagingSenderId: "1011347355632",
    appId: "1:1011347355632:web:d42cb9c55f16bd19200f35"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth()
const db = getFirestore()
const storage = getStorage(app);


export { auth, db, storage }