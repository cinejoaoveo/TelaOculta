import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

// Suas credenciais do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDhKz3v_JFJ39vPlBZLVrQ4wtC11-iy32Y",
  authDomain: "telaocultak.firebaseapp.com",
  projectId: "telaocultak",
  storageBucket: "telaocultak.firebasestorage.app",
  messagingSenderId: "539635191596",
  appId: "1:539635191596:web:e06d067b8ea71105f92689"
};

// Inicializa o Firebase
const app: FirebaseApp = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { app, auth, googleProvider };