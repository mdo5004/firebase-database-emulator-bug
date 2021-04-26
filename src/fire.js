import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyAhPdbZcVBaA-JLprKZQf9UOgEHr0TJNds",
  authDomain: "react-firebase-app-50cb5.firebaseapp.com",
  databaseURL: "https://react-firebase-app-50cb5.firebaseio.com",
  projectId: "react-firebase-app-50cb5",
  storageBucket: "react-firebase-app-50cb5.appspot.com",
  messagingSenderId: "682884504431",
  appId: "1:682884504431:web:a754d015e651c1f74f269a",
};

const fire = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

export default fire;

fire.database().useEmulator('localhost', 9000);
firebase.database.enableLogging(true);
console.log('using database emulator on port 9000');
fire.auth().useEmulator('http://localhost:9099');
console.log('using auth emulator on port 9099');
