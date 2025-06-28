import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { 
  signInWithEmailAndPassword, 
  signInWithPopup, 
  signOut, 
  onAuthStateChanged,
  User as FirebaseUser,
  createUserWithEmailAndPassword,
  updateProfile
} from 'firebase/auth';
import { ref, set, push, get } from 'firebase/database';
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { auth, database, storage, googleProvider, linkedinProvider } from '../config/firebase';
import { User, Hirer, Hiree, AuthContextType } from '../types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // Get user data from database
        const userRef = ref(database, `users/${firebaseUser.uid}`);
        const snapshot = await get(userRef);
        
        if (snapshot.exists()) {
          setUser(snapshot.val());
        } else {
          // Create basic user record
          const basicUser: User = {
            id: firebaseUser.uid,
            name: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'User',
            email: firebaseUser.email || '',
            type: 'hiree', // default type
            createdAt: Date.now()
          };
          await set(userRef, basicUser);
          setUser(basicUser);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const login = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      throw new Error('Invalid credentials. Please try again.');
    }
  };

  const loginWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      throw new Error('Google login failed. Please try again.');
    }
  };

  const loginWithLinkedIn = async () => {
    try {
      await signInWithPopup(auth, linkedinProvider);
    } catch (error) {
      throw new Error('LinkedIn login failed. Please try again.');
    }
  };

  const logout = () => {
    signOut(auth);
  };

  const registerHirer = async (hirerData: Omit<Hirer, 'id' | 'createdAt'>) => {
    try {
      const currentUser = auth.currentUser;
      if (!currentUser) {
        throw new Error('No authenticated user');
      }

      // Update Firebase user profile with name
      if (hirerData.firstName && hirerData.lastName) {
        await updateProfile(currentUser, {
          displayName: `${hirerData.firstName} ${hirerData.lastName}`
        });
      }

      const hirer: Hirer = {
        ...hirerData,
        id: currentUser.uid,
        createdAt: Date.now()
      };

      // Save to database
      await set(ref(database, `hirers/${currentUser.uid}`), hirer);
      
      // Update user type and name
      const userRef = ref(database, `users/${currentUser.uid}`);
      const updatedUser: User = {
        id: currentUser.uid,
        name: `${hirerData.firstName} ${hirerData.lastName}`,
        email: hirerData.email,
        type: 'hirer',
        createdAt: Date.now()
      };
      await set(userRef, updatedUser);

      setUser(updatedUser);
    } catch (error) {
      throw new Error('Failed to register hirer. Please try again.');
    }
  };

  const registerHiree = async (hireeData: Omit<Hiree, 'id' | 'createdAt'>) => {
    try {
      const currentUser = auth.currentUser;
      if (!currentUser) {
        throw new Error('No authenticated user');
      }

      const hiree: Hiree = {
        ...hireeData,
        id: currentUser.uid,
        createdAt: Date.now()
      };

      // Save to database
      await set(ref(database, `hirees/${currentUser.uid}`), hiree);
      
      // Update user type
      const userRef = ref(database, `users/${currentUser.uid}`);
      const updatedUser: User = {
        id: currentUser.uid,
        name: currentUser.displayName || currentUser.email?.split('@')[0] || 'User',
        email: currentUser.email || '',
        type: 'hiree',
        createdAt: Date.now()
      };
      await set(userRef, updatedUser);

      setUser(updatedUser);
    } catch (error) {
      throw new Error('Failed to register hiree. Please try again.');
    }
  };

  const uploadImage = async (file: File): Promise<string> => {
    try {
      const currentUser = auth.currentUser;
      if (!currentUser) {
        throw new Error('No authenticated user');
      }

      const imageRef = storageRef(storage, `profile-images/${currentUser.uid}/${file.name}`);
      await uploadBytes(imageRef, file);
      const downloadURL = await getDownloadURL(imageRef);
      return downloadURL;
    } catch (error) {
      throw new Error('Failed to upload image. Please try again.');
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated: !!user,
      login,
      loginWithGoogle,
      loginWithLinkedIn,
      logout,
      registerHirer,
      registerHiree
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};