admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    databaseURL: 'https://goit-js-course-group-5-login.firebaseio.com'
});

const app = admin.initializeApp();

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyC3hhRHZkM_yIQ-Jzbxb9g859m5cQHFeLc",
    authDomain: "goit-js-course-group-5-login.firebaseapp.com",
    projectId: "goit-js-course-group-5-login",
    storageBucket: "goit-js-course-group-5-login.appspot.com",
    messagingSenderId: "380387542115",
    appId: "1:380387542115:web:7bde70cbc3d240dbaa2456",
    measurementId: "G-HCLMH4KKCY"
};

