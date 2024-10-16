import { Task } from '../types';

export const simulateMatch = (tasks: Task[], taskToMatch: string): [Task, Task] | null => {
  const availableTasks = tasks.filter(task => !task.matched && task.task === taskToMatch);
  if (availableTasks.length >= 2) {
    const [task1, task2] = availableTasks.slice(0, 2);
    task1.matched = true;
    task1.matchedUserId = task2.userId;
    task2.matched = true;
    task2.matchedUserId = task1.userId;
    return [task1, task2];
  }
  return null;
};