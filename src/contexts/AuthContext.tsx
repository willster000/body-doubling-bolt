import React, { createContext, useContext, useState, ReactNode } from 'react';
import { db } from '../firebase';
import { collection, addDoc, query, where, getDocs, DocumentData } from 'firebase/firestore';
import { User } from '../types';

interface AuthContextType {
  currentUser: User | null;
  signUp: (username: string, password: string) => Promise<void>;
  signIn: (username: string, password: string) => Promise<void>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const signUp = async (username: string, password: string) => {
    const usersRef = collection(db, 'users');
    const q = query(usersRef, where('username', '==', username));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      throw new Error('Username already exists');
    }

    const newUser: User = {
      username,
      password, // In a real app, make sure to hash the password before storing
      createdAt: new Date(),
    };

    await addDoc(usersRef, newUser);
    setCurrentUser(newUser);
  };

  const signIn = async (username: string, password: string) => {
    const usersRef = collection(db, 'users');
    const q = query(usersRef, where('username', '==', username));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      throw new Error('User not found');
    }

    const userDoc = querySnapshot.docs[0];
    const userData = userDoc.data() as User;

    if (userData.password !== password) { // In a real app, use proper password comparison
      throw new Error('Incorrect password');
    }

    setCurrentUser(userData);
  };

  const signOut = () => {
    setCurrentUser(null);
  };

  const value = {
    currentUser,
    signUp,
    signIn,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};