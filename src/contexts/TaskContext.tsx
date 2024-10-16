import React, { createContext, useContext, useState, ReactNode } from 'react';
import { db } from '../firebase';
import { collection, addDoc, query, where, getDocs, updateDoc, onSnapshot, doc } from 'firebase/firestore';
import { useAuth } from './AuthContext';
import { Task } from '../types';
import { simulateMatch } from '../utils/testingUtils';

interface TaskContextType {
  currentTask: string;
  setCurrentTask: (task: string) => void;
  findMatch: (task: string) => Promise<string | null>;
  listenForMatch: (taskId: string, onMatch: (matchedUserId: string) => void) => () => void;
  simulateMatchForTesting: (task: string) => Promise<[Task, Task] | null>;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const useTask = () => {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTask must be used within a TaskProvider');
  }
  return context;
};

export const TaskProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentTask, setCurrentTask] = useState('');
  const { currentUser } = useAuth();

  const findMatch = async (task: string): Promise<string | null> => {
    // ... (existing implementation)
  };

  const listenForMatch = (taskId: string, onMatch: (matchedUserId: string) => void) => {
    // ... (existing implementation)
  };

  const simulateMatchForTesting = async (task: string): Promise<[Task, Task] | null> => {
    const tasksRef = collection(db, 'tasks');
    const q = query(tasksRef, where('task', '==', task), where('matched', '==', false));
    const querySnapshot = await getDocs(q);
    
    const tasks = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Task));
    const matchedTasks = simulateMatch(tasks, task);

    if (matchedTasks) {
      const [task1, task2] = matchedTasks;
      await updateDoc(doc(db, 'tasks', task1.id!), { matched: true, matchedUserId: task2.userId });
      await updateDoc(doc(db, 'tasks', task2.id!), { matched: true, matchedUserId: task1.userId });
    }

    return matchedTasks;
  };

  const value = {
    currentTask,
    setCurrentTask,
    findMatch,
    listenForMatch,
    simulateMatchForTesting,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};