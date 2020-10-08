import firebase from 'firebase/app'
import firestore from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCKv-BaGXz0mxN5ZKuSFBOfE0tFu_k1Euo",
  authDomain: "emilian-blogi.firebaseapp.com",
  databaseURL: "https://emilian-blogi.firebaseio.com",
  projectId: "emilian-blogi",
  storageBucket: "emilian-blogi.appspot.com",
  messagingSenderId: "1066982118612",
  appId: "1:1066982118612:web:2b5dd6781020ee27d8d741",
  measurementId: "G-S14WST845R"
};

// Initialize Firebase
const firebaseApp =  firebase.initializeApp(firebaseConfig);

export default firebaseApp.firestore()