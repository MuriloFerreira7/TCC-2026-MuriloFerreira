import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAUc508koJfg4l1d7gRP7CSBdfXAgkG2D4",
    authDomain: "tcc-habitos.firebaseapp.com",
    databaseURL: "https://tcc-habitos-default-rtdb.firebaseio.com",
    projectId: "tcc-habitos",
    storageBucket: "tcc-habitos.firebasestorage.app",
    messagingSenderId: "747427780474",
    appId: "1:747427780474:web:d4dd989c483b725590a8c3"
};

export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);