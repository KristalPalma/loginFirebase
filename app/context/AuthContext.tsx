import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { auth, db } from '../../firebaseConfig'
import { 
    onAuthStateChanged, 
    signInWithEmailAndPassword, 
    signOut, 
    createUserWithEmailAndPassword,
    updateProfile
} from "firebase/auth";

import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

interface User {
    uid: string;
    email: string;
    name: string;
    photoURL?: string;
    bio?: string;
    phone?: string;
    language?: string;
    favorites?: string[];
}


interface AuthContextType {
    user: User | null
    login: (email: string, password: string) => boolean;
    logout: () => void
    updateUser: (updates: Partial<User>) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            if (firebaseUser) {
                const userDoc = await getDoc(doc(db, "users", firebaseUser.uid));
                if (userDoc.exists()) {
                    setUser({ uid: firebaseUser.uid, email: firebaseUser.email!, ...userDoc.data() } as User);
                } else {
                    setUser({
                        uid: firebaseUser.uid,
                        email: firebaseUser.email!,
                        name: firebaseUser.displayName || "",
                        photoURL: firebaseUser.photoURL || "",
                    });
                }
            } else {
                setUser(null);
            }
            setLoading(false);
        });
        return () => unsubscribe()
    },[])




    const login = async (email: string, password: string) => {
        try {
            await signInWithEmailAndPassword(auth, email, password)
            return true;
        } catch (error: any) {
            console.log(`Error al iniciar sesión: ${error.message}`);
            return false
        }
    }

    const register = async (email: string, password: string) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const newUser = userCredential.user;
            await setDoc(doc(db, "users", newUser.uid), {
                email: newUser.email,
                name: "",
                photoURL: "",
                bio: "",
                phone: "",
                language: "es",
                favorites: [],
            });
            return true;
        } catch (error) {
            console.log(`Error al registrar: ${error.message}`);
            return false;
        }
    };



    

    const logout = async () => {
        await signOut(auth)
        setUser(null)
    }



    const updateUser = async (updates: Partial<User>) => {
        if (!user) return false;
        try {
            await updateDoc(doc(db, "users", user.uid), updates);
            setUser({ ...user, ...updates });
            return true;
        } catch (error) {
            console.log(`Error al actualizar usuario: ${error.message}`);
            return false;
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, loading, updateUser}}>
            {children}
        </AuthContext.Provider>
    )
}


export function useAuth() {
     return useContext(AuthContext)
}