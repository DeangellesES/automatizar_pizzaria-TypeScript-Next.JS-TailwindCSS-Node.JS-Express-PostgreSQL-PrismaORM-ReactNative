import { useState } from "react";
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";

import { useRouter } from 'expo-router';
import { Button } from "../../components/Button";
import { Input } from "../../components/input";

import { colors, fontSize, spacing } from '../../constants/theme';
import { useAuth } from "../../contexts/AuthContext";

export default function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const { signIn } = useAuth()
    const router = useRouter()

    async function handleLogin() {

        if(!email.trim() || !password.trim()) {
            Alert.alert("Atenção", "Preencha todos os campos!")
            return
        }

        try{
            setLoading(true)
            await signIn(email, password)
            router.replace("/(authenticated)/dashboard")

        }catch(err){
            console.log(err)
            Alert.alert("Erro", "Erro ao fazer o login")
        }finally {
            setLoading(false)
        }
    }

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                keyboardShouldPersistTaps="handled"
            >
                <View style={styles.logoContainer}>
                    <Text style={styles.logoText}>
                        Pizza<Text style={styles.logoBrand}>ria</Text>
                    </Text>
                    <Text style={styles.logoSubtitle}>Garçom app</Text>
                </View>

                <View style={styles.formContainer}>
                    <Input
                        label="Email"
                        placeholder="Digite seu email..."
                        placeholderTextColor={colors.gray}
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                    />

                    <Input
                        label="Senha"
                        placeholder="Digite sua senha..."
                        placeholderTextColor={colors.gray}
                        secureTextEntry={true}
                        value={password}
                        onChangeText={setPassword}

                    />

                    <Button
                        title="Acessar"
                        loading={loading}
                        onPress={handleLogin}
                    />

                </View>

            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.background,
        flex: 1,
    },
    scrollContent: {
        justifyContent: "center",
        flex: 1,
        paddingHorizontal: spacing.xl,
    },
    logoContainer: {
        alignItems: "center",
        marginBottom: spacing.xl,
    },
    logoText: {
        fontSize: 34,
        fontWeight: "bold",
        color: colors.primary,
    },
    logoBrand: {
        color: colors.brand,
    },
    logoSubtitle: {
        color: colors.primary,
        fontSize: fontSize.md,
    },
    formContainer: {
        gap: spacing.md
    }
})