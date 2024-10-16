import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTask } from '../contexts/TaskContext';
import { CheckCircle, Clock } from 'lucide-react';

const TaskSelection: React.FC = () => {
  const [selectedTask, setSelectedTask] = useState('');
  const [isWaiting, setIsWaiting] = useState(false);
  const [matchFound, setMatchFound] = useState(false);
  const navigate = useNavigate();
  const { setCurrentTask, findMatch, listenForMatch } = useTask();

  const tasks = [
    'Any task',
    'Study',
    'Work',
    'Clean',
    'Exercise',
    'Read',
    'Write',
    'Meditate',
    'Code',
    'Plan',
  ];

  useEffect(() => {
    let unsubscribe: () => void;

    const handleTaskSelect = async (task: string) => {
      setSelectedTask(task);
      setCurrentTask(task);
      setIsWaiting(true);
      const taskId = await findMatch(task);
      
      if (taskId) {
        unsubscribe = listenForMatch(taskId, (matchedUserId) => {
          setMatchFound(true);
          navigate('/chat', { state: { matchedUserId, task } });
        });
      }
    };

    if (selectedTask) {
      handleTaskSelect(selectedTask);
    }

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [selectedTask, setCurrentTask, findMatch, listenForMatch, navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Select a Task</h2>
        {!isWaiting ? (
          <div className="grid grid-cols-2 gap-4">
            {tasks.map((task) => (
              <button
                key={task}
                onClick={() => setSelectedTask(task)}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
              >
                {task}
              </button>
            ))}
          </div>
        ) : matchFound ? (
          <div className="text-center">
            <CheckCircle className="mx-auto mb-4 text-green-500" size={48} />
            <p className="mb-4">Match found for {selectedTask}!</p>
            <p>Redirecting to chat room...</p>
          </div>
        ) : (
          <div className="text-center">
            <Clock className="mx-auto mb-4 text-blue-500 animate-spin" size={48} />
            <p>Waiting for a match for {selectedTask}...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskSelection;