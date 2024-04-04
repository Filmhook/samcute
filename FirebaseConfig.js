//import * as firebase from 'firebase';

//  import firebase from 'firebase/app'
//  import 'firebase/auth'

import {initializeApp} from 'firebase/app'
import {getFirestore} from 'firebase/firestore'


const firebaseConfig = {
    apiKey: "AIzaSyCyTAY6me97_MO5unuqhbPLuABv4w_K0ic",
    authDomain: "filmhook-mediaapps.firebaseapp.com",
    projectId: "filmhook-mediaapps",
    storageBucket: "filmhook-mediaapps.appspot.com",
    messagingSenderId: "159646328352",
    appId: "1:159646328352:web:50540cdbcb46b587e6be45",
    measurementId: "G-RJTF4RPEN5",
};

   // Initialize Firebase
   //firebase.initializeApp(firebaseConfig)

   // Get the authentication instance
   //const auth = firebase.auth()

   //export default auth; 


const app = initializeApp(firebaseConfig)

export default  app;