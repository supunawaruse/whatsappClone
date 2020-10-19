
import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyDdDWyA2YguAt5PX9d8jOKTm1NXuZivCQU",
    authDomain: "whatsapp-clone-d1a5d.firebaseapp.com",
    databaseURL: "https://whatsapp-clone-d1a5d.firebaseio.com",
    projectId: "whatsapp-clone-d1a5d",
    storageBucket: "whatsapp-clone-d1a5d.appspot.com",
    messagingSenderId: "207871271553",
    appId: "1:207871271553:web:78820589f5114b00466380",
    measurementId: "G-63ET0XDHM2"
  };


  
  const firebaseApp = firebase.initializeApp(firebaseConfig);

  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider;

  export {auth,provider};

  export default db;