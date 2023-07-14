// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../interfaces/auth.interface";
import { APIResGoogleSignIn } from "../interfaces/axios.interface";
import axios from "axios";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const env = import.meta.env;
const api = env.VITE_SERVER_URL;

async function GetFirebaseKeys(): Promise<firebaseConfig> {
    const { data }: APIResGoogleSignIn = await axios.get(
        `${api}/auth/firebase-keys`
    );
    const config = data.data;
    return config;
}

// Your web app's Firebase configuration
const config = {
    apiKey: (await GetFirebaseKeys()).apiKey,
    authDomain: (await GetFirebaseKeys()).authDomain,
    projectId: (await GetFirebaseKeys()).projectId,
    storageBucket: (await GetFirebaseKeys()).storageBucket,
    messagingSenderId: (await GetFirebaseKeys()).messagingSenderId,
    appId: (await GetFirebaseKeys()).appId,
};

// Initialize Firebase
const app = initializeApp(config);

export const auth = getAuth(app);
