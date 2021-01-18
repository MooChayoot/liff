import firebase from 'firebase';
const firebaseConfig = {
    apiKey: "AIzaSyChaAjUMhqiJb4D4X2iaatPzQ10cRTrVQM",
  authDomain: "twin-hr.firebaseapp.com",
  databaseURL: "https://twin-hr.firebaseio.com",
  projectId: "twin-hr",
  storageBucket: "twin-hr.appspot.com",
  messagingSenderId: "580954814880",
  appId: "1:580954814880:web:9132f84ed998362dd30cc5",
  measurementId: "G-TE95GBSQSC"
};
const firebaseApp = firebase.initializeApp(firebaseConfig);
export default firebaseApp;