import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyAxhCK-LaZsyU-ollJsYb2VOfVKzsIysfM",
  authDomain: "instagram-d6528.firebaseapp.com",
  projectId: "instagram-d6528",
  storageBucket: "instagram-d6528.appspot.com",
  messagingSenderId: "333696949268",
  appId: "1:333696949268:web:9c97c0896647c9985f1b01",
  measurementId: "G-QR06WJG4CC"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage, ref, uploadBytes, getDownloadURL, deleteObject };
