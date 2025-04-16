// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { getVertexAI, getGenerativeModel } from "firebase/vertexai";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBhq37Zjfls0wUmD69QQ89jE_oZZeG-rkg",
  authDomain: "all-jam.firebaseapp.com",
  projectId: "all-jam",
  storageBucket: "all-jam.firebasestorage.app",
  messagingSenderId: "586517071574",
  appId: "1:586517071574:web:92789f6fda5e7ca7946b77",
  measurementId: "G-PQK237TQ2J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const db = getFirestore(app);

export { db };

// Initialize the Vertex AI service
const vertexAI = getVertexAI(app);
// Create a `GenerativeModel` instance with a model that supports your use case
export const model = getGenerativeModel(vertexAI, { model: "gemini-2.0-flash" });

export const auth = getAuth();
auth.settings.appVerificationDisabledForTesting = true; // Only for development
