import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";

export async function cadastrarUsuario(email: string, senha: string) {
    const credencial = await createUserWithEmailAndPassword(auth, email, senha);
    return credencial.user;
}

export async function autenticarUsuario(email: string, senha: string) {
    const credencial = await signInWithEmailAndPassword (auth, email, senha);
    return credencial.user;
}