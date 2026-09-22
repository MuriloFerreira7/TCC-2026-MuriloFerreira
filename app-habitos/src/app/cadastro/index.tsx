import { useState } from "react";
import { cadastrarUsuario } from "@/services/AutenticacaoService";
import { router } from "expo-router";

import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet
} from "react-native";

export default function TelaCadastro() {
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [confirmarSenha, setConfirmarSenha] = useState("");

    async function cadastrar() {
        if (senha !== confirmarSenha) {
            console.log("As senhas são diferentes!");
            return
        }

        try {
            const usuario = await cadastrarUsuario(email, senha);
            console.log("Usuario " + usuario.uid + " criado!");
            router.replace("/inicio");
        } catch (erro) {
            console.log("Erro ao cadastrar:", erro);
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>Criar conta</Text>

            <TextInput
                style={styles.input}
                placeholder="Nome"
                value={nome}
                onChangeText={setNome}
            />

            <TextInput
                style={styles.input}
                placeholder="E-mail"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />

            <TextInput
                style={styles.input}
                placeholder="Senha"
                value={senha}
                onChangeText={setSenha}
                secureTextEntry
            />

            <TextInput
                style={styles.input}
                placeholder="Confirmar senha"
                value={confirmarSenha}
                onChangeText={setConfirmarSenha}
                secureTextEntry
            />

            <TouchableOpacity
                style={styles.botao}
                onPress={cadastrar}
            >
                <Text style={styles.textoBotao}>Cadastrar</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => router.push("/login")}>
                <Text style={styles.linkLogin}>
                    Já possui uma conta? Entrar
                </Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        padding: 24,
    },

    titulo: {
        fontSize: 28,
        fontWeight: "bold",
        marginBottom: 24,
    },

    input: {
        borderWidth: 1,
        borderRadius: 8,
        padding: 12,
        marginBottom: 12,
    },

    botao: {
        padding: 14,
        borderRadius: 8,
        alignItems: "center",
    },

    textoBotao: {
        fontWeight: "bold",
    },

    linkLogin: {
        marginTop: 20,
        textAlign: "center",
        color: "#2563EB",
        fontSize: 15,
    }
});