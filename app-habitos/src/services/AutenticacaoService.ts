import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";
import { addDoc, collection, getFirestore, setDoc, doc} from "firebase/firestore";
import { initializeApp } from "firebase/app";
import {app} from "./firebase";



export async function cadastrarUsuario(nomeDeUsuario:string, email: string, senha: string) {
    const credencial = await createUserWithEmailAndPassword(auth, email, senha);

    const db = getFirestore(app);
    const documento = await setDoc(doc(db, "usuarios", credencial.user.uid), {
        nome: nomeDeUsuario,
        email: email
    });

    return credencial.user;
}

export async function autenticarUsuario(email: string, senha: string) {
    const credencial = await signInWithEmailAndPassword (auth, email, senha);
    return credencial.user;
}