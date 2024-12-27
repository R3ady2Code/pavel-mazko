// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { ProductService } from "./ProductsService";
import { getStorage } from "firebase/storage";
import { GalleryService } from "./GalleryService";

const firebaseConfig = {
    apiKey: "AIzaSyDcE4S6-K_eszkodZxIZZ2Kp_BCeyBeppQ",
    authDomain: "mazko-store.firebaseapp.com",
    projectId: "mazko-store",
    storageBucket: "mazko-store.firebasestorage.app",
    messagingSenderId: "308980306591",
    appId: "1:308980306591:web:59a23f72347bb2a808c8aa",
    measurementId: "G-CGN7PCGNF6"
};

const app = initializeApp(firebaseConfig);
export const firebase = getFirestore(app);
export const storage = getStorage(app);

export const productModel = new ProductService(firebase, storage);
export const galleryModel = new GalleryService(storage);
