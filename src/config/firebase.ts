import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, OAuthProvider } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDYsYfhniHxx9hinMK1YGyHoog0x2ocJoM",
  authDomain: "crowd2capital.firebaseapp.com",
  projectId: "crowd2capital",
  storageBucket: "crowd2capital.firebasestorage.app",
  messagingSenderId: "166215411111",
  appId: "1:166215411111:web:9cfbfebad58b8d41268282"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const database = getDatabase(app);
export const storage = getStorage(app);

// Auth providers
export const googleProvider = new GoogleAuthProvider();
export const linkedinProvider = new OAuthProvider('linkedin.com');

export default app; 