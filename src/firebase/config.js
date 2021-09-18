//import * as firebase from 'firebase';
import firebase from 'firebase/app'
import '@firebase/auth';
import '@firebase/firestore';
import '@firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyBd50ojcaQJGkoSeVll_yWUGOelhR0rBtU",
  authDomain: "doormie-9b9d1.firebaseapp.com",
  databaseURL: "https://doormie-9b9d1-default-rtdb.firebaseio.com",
  projectId: "doormie-9b9d1",
  storageBucket: "doormie-9b9d1.appspot.com",
  messagingSenderId: "128548350518",
  appId: "1:128548350518:web:2f81a864c2dde453b50697",
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase };