import {initializeApp} from "firebase/app";
import {getStorage} from "firebase/storage";
import {getFirestore} from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyC3GtWFOnWEOlLvwRP63FkypF6hTbr_uRw",
    authDomain: "fotos-app-58239.firebaseapp.com",
    projectId: "fotos-app-58239",
    storageBucket: "fotos-app-58239.appspot.com",
    messagingSenderId: "104289312035",
    appId: "1:104289312035:web:d8c965f5a3bfadd829c096"
  };

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const firestore = getFirestore(app);