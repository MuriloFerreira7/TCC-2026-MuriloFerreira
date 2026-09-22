import { auth } from "@/services/firebase";
import { Redirect } from "expo-router";


export default function TelaInicial() {
  const usuario = auth.currentUser;

  if (usuario) {
    return <Redirect href="/inicio" />;
  } else {
    return <Redirect href="/login" />;
  }

}