import { useRouter } from "expo-router"
import { useAuth } from "./context/AuthContext"
import { useEffect } from "react"
import { Button, Text, View, StyleSheet, Image } from "react-native"

export default function HomeScreen() {
    const { user, logout } = useAuth()
    const router = useRouter()

    useEffect(() => {
        if (!user) {
            router.replace('/login')
        }
    }, [user]);

    return (
        <View style={styles.container}>
            <Image source={require("../assets/images/sailor-moon.png")} style={styles.image} />
            <Text style={styles.welcome}>Bienvenido {user?.name}</Text>
            <Text style={styles.title}>^^</Text>
            <Text style={styles.message}>Ve a tu perfil para configurarlo</Text>

            <View style={styles.buttonContainer}>
                <Button
                    title="Ir al perfil"
                    onPress={() => router.push(`/profile`)}
                    color="#ffcc00"
                />
                <Button
                    title="Logout"
                    onPress={() => { logout(); router.replace('/login') }}
                    color="#ff9900"
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff8dc',
        padding: 20,
    },
    image: {
        width: 150,
        height: 150,
        marginBottom: 20,
    },
    title: {
        fontSize: 36,
        fontWeight: 'bold',
        color: '#ffcc00',
        textAlign: 'center',
        marginBottom: 10,
    },
    message: {
        fontSize: 20,
        color: '#ffcc00',
        marginBottom: 20,
        textAlign: 'center',
    },
    welcome: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#ff9900',
        marginBottom: 30,
    },
    buttonContainer: {
        width: '80%',
        marginTop: 10,
    },
});
