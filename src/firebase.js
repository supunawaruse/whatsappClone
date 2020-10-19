
import firebase from 'firebase';

const firebaseConfig = {
    // in here add your firebase config details
  };


  
  const firebaseApp = firebase.initializeApp(firebaseConfig);

  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider;

  export {auth,provider};

  export default db;