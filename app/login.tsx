import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, Button, Text, TextInput, View, Image, StyleSheet } from "react-native";
import { useAuth } from "./context/AuthContext";

export default function LoginScreen() {
    const { login, register } = useAuth();
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const handleLogin = async () => {
        const success = await login(email, password);

        if (success) {
            router.replace('/home');
        } else {
            Alert.alert('Error', 'El usuario y/o contraseña son incorrectas');
        }
    };
    
    const handleRegister = async () => {
        const success = await register(email, password);

        if (success) {
            Alert.alert('Registro Exitoso', 'Ya puedes iniciar sesión');
        } else {
            Alert.alert('Error', 'No se pudo registrar');
        }
    };

    return (
        <View style={styles.container}>
            <Image source={require("../assets/images/flowers.png")} style={styles.flowerImage} />
            <Text style={styles.title}>Bienvenido</Text>
            <TextInput 
                style={styles.input}
                placeholder="Ingresa tu correo"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
            />
            <TextInput 
                style={styles.input}
                placeholder="Ingresa tu contraseña"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <View style={styles.buttonContainer}>
                <Button
                    title="Ingresar"
                    onPress={handleLogin}
                    color="#ffcc00"
                />
                <Button 
                    title="Registrar"
                    onPress={handleRegister}
                    color="#ff9900"
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff8dc',
        padding: 20,
    },
    flowerImage: {
        width: 100,
        height: 100,
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#ffcc00',
        marginBottom: 20,
    },
    input: {
        width: '80%',
        height: 40,
        borderColor: '#ffcc00',
        borderWidth: 2,
        borderRadius: 10,
        paddingLeft: 10,
        backgroundColor: 'white',
        marginBottom: 10,
    },
    buttonContainer: {
        marginTop: 10,
        width: '80%',
        padding: 10,
        
    },
});
