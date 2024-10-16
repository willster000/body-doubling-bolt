import React, { useState } from 'react';
import { useTask } from '../contexts/TaskContext';
import { Task } from '../types';

const TestingComponent: React.FC = () => {
  const [testTask, setTestTask] = useState('');
  const [testResult, setTestResult] = useState<string>('');
  const { simulateMatchForTesting } = useTask();

  const runTest = async () => {
    try {
      const result = await simulateMatchForTesting(testTask);
      if (result) {
        const [task1, task2] = result;
        setTestResult(`Match found! User ${task1.userId} matched with User ${task2.userId} for task: ${testTask}`);
      } else {
        setTestResult(`No match found for task: ${testTask}`);
      }
    } catch (error) {
      setTestResult(`Error: ${(error as Error).message}`);
    }
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg">
      <h2 className="text-xl font-bold mb-4">Testing Utility</h2>
      <input
        type="text"
        value={testTask}
        onChange={(e) => setTestTask(e.target.value)}
        placeholder="Enter task to test"
        className="w-full p-2 mb-2 border rounded"
      />
      <button
        onClick={runTest}
        className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Run Test
      </button>
      {testResult && (
        <div className="mt-4 p-2 bg-white rounded">
          <h3 className="font-bold">Test Result:</h3>
          <p>{testResult}</p>
        </div>
      )}
    </div>
  );
};

export default TestingComponent;