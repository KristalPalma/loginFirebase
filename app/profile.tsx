import { useRouter } from "expo-router";
import { useAuth } from "./context/AuthContext";
import { useEffect, useState } from "react";
import { Alert, Button, Image, Text, TextInput, View, FlatList, StyleSheet } from "react-native";

export default function ProfileScreen() {
    const { user, updateUser, logout } = useAuth();
    const router = useRouter();

    // Estados del perfil
    const [name, setName] = useState(user?.name || "");
    const [bio, setBio] = useState(user?.bio || "");
    const [phone, setPhone] = useState(user?.phone || "");
    const [language, setLanguage] = useState(user?.language || "");
    const [newFavorite, setNewFavorite] = useState(""); // Nuevo favorito a agregar
    const [favorites, setFavorites] = useState(user?.favorites || []);

    useEffect(() => {
        if (!user) {
            router.replace('/login');
        }
    }, [user]);

    const handleSave = async () => {
        const success = await updateUser({ name, bio, phone, language });
        if (success) {
            Alert.alert("Perfil actualizado");
        } else {
            Alert.alert("Error", "No se pudo actualizar el perfil");
        }
    };

    const handleAddFavorite = async () => {
        if (!newFavorite.trim()) return Alert.alert("Error", "El favorito no puede estar vacío");
        if (favorites.includes(newFavorite)) return Alert.alert("Error", "Este favorito ya está en la lista");

        const updatedFavorites = [...favorites, newFavorite]; // Agregar el nuevo favorito
        setFavorites(updatedFavorites); // Actualizar estado local
        setNewFavorite(""); // Limpiar input

        const success = await updateUser({ favorites: updatedFavorites });
        if (!success) {
            Alert.alert("Error", "No se pudo guardar el favorito");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Perfil</Text>

            {/* Foto de perfil */}
            {user?.photoURL && (
                <Image source={{ uri: user.photoURL }} style={styles.profileImage} />
            )}

            <Text style={styles.email}>Correo: {user?.email}</Text>

            {/* Campos editables */}
            <TextInput
                placeholder="Nombre"
                value={name}
                onChangeText={setName}
                style={styles.input}
            />
            <TextInput
                placeholder="Biografía"
                value={bio}
                onChangeText={setBio}
                style={styles.input}
            />
            <TextInput
                placeholder="Teléfono"
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
                style={styles.input}
            />
            <TextInput
                placeholder="Idioma"
                value={language}
                onChangeText={setLanguage}
                style={styles.input}
            />

            {/* Lista de favoritos */}
            <Text style={styles.favoritesTitle}>Favoritos</Text>

            <FlatList
                data={favorites}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => <Text style={styles.favoriteItem}>- {item}</Text>}
            />

            {/* Agregar favoritos */}
            <TextInput
                placeholder="Agregar nuevo favorito"
                value={newFavorite}
                onChangeText={setNewFavorite}
                style={styles.input}
            />
            <Button title="Añadir a favoritos" onPress={handleAddFavorite} color="#ffcc00" />

            <Button title="Guardar Cambios" onPress={handleSave} color="#ff9900" />
            
            <Button title="Cerrar Sesión" color="red" onPress={logout} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff8dc',
        padding: 20,
        alignItems: 'center',
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#ffcc00',
        marginBottom: 20,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 20,
    },
    email: {
        fontSize: 18,
        color: '#ff9900',
        marginBottom: 15,
    },
    input: {
        width: '80%',
        height: 40,
        borderColor: '#ffcc00',
        borderWidth: 1,
        borderRadius: 10,
        paddingLeft: 10,
        backgroundColor: 'white',
        marginVertical: 10,
    },
    favoritesTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#ffcc00',
        marginTop: 20,
    },
    favoriteItem: {
        fontSize: 16,
        color: '#ff9900',
        marginVertical: 5,
    },
});
