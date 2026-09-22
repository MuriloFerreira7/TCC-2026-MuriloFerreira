import { useState } from "react";
import { autenticarUsuario } from "@/services/AutenticacaoService";
import { router } from "expo-router";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet
} from "react-native";


export default function TelaLogin() {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    async function autenticar() {
        try {
            const usuario = await autenticarUsuario(email, senha);
            console.log("Usuario " + usuario.uid + " está logado");
            router.replace("/inicio");
        } catch (erro) {
            console.log("Erro ao autenticar: ", erro);
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>Login</Text>

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

            <TouchableOpacity
                style={styles.botao}
                onPress={autenticar}
            >
                <Text style={styles.textoBotao}>Entrar</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => router.push("/cadastro")}>
                <Text style={styles.linkCadastro}>
                    Não possui uma conta? Cadastre-se
                </Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        paddingHorizontal: 30,
        backgroundColor: "#F5F5F5",
    },

    titulo: {
        fontSize: 32,
        fontWeight: "bold",
        marginBottom: 30,
        textAlign: "center",
        color: "#222",
    },

    input: {
        height: 52,
        backgroundColor: "#FFFFFF",
        borderWidth: 1,
        borderColor: "#DADADA",
        borderRadius: 10,
        paddingHorizontal: 15,
        fontSize: 16,
        marginBottom: 15,
    },

    botao: {
        height: 52,
        backgroundColor: "#2563EB",
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10,
    },

    textoBotao: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "bold",
    },

    linkCadastro: {
        marginTop: 20,
        textAlign: "center",
        color: "#2563EB",
        fontSize: 15,
    }
});