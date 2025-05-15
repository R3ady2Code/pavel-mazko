import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { ProductService } from "./ProductsService";
import { getStorage } from "firebase/storage";
import { GalleryService } from "./GalleryService";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
}  

const app = initializeApp(firebaseConfig);
export const firebase = getFirestore(app);
export const storage = getStorage(app);

export const productModel = new ProductService(firebase, storage);
export const galleryModel = new GalleryService(storage);
