import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './components/MainPage';
import AuthPage from './components/AuthPage';
import TaskSelection from './components/TaskSelection';
import ChatRoom from './components/ChatRoom';
import TestingComponent from './components/TestingComponent';
import { AuthProvider } from './contexts/AuthContext';
import { TaskProvider } from './contexts/TaskContext';

function App() {
  return (
    <Router>
      <AuthProvider>
        <TaskProvider>
          <div className="min-h-screen bg-gray-100">
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/auth" element={<AuthPage />} />
              <Route path="/tasks" element={<TaskSelection />} />
              <Route path="/chat" element={<ChatRoom />} />
            </Routes>
            {process.env.NODE_ENV === 'development' && (
              <div className="fixed bottom-4 right-4">
                <TestingComponent />
              </div>
            )}
          </div>
        </TaskProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;