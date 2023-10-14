import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDJvs8mOU5ZeKAaFCUEQNkO7qw2ZmX_WPU",
  authDomain: "centering-chess-392910.firebaseapp.com",
  projectId: "centering-chess-392910",
  storageBucket: "centering-chess-392910.appspot.com",
  messagingSenderId: "849621477934",
  appId: "1:849621477934:web:3e5c819b5f7f5dcb5e0dbf",
  measurementId: "G-XDCFTP7FHL"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };