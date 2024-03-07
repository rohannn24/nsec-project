import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
apiKey: "AIzaSyAlPub-PqGlbiknYtkmStdRqI09ClbzLKU",
  authDomain: "yt-clone-441c5.firebaseapp.com",
  projectId: "yt-clone-441c5",
  storageBucket: "yt-clone-441c5.appspot.com",
  messagingSenderId: "665663587733",
  appId: "1:665663587733:web:ff8791eb0ed33c0066e29c" 
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();

export default app;



