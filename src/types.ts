export interface User {
  username: string;
  password: string;
  createdAt: Date;
}

export interface Task {
  id?: string;
  task: string;
  timestamp: Date;
  matched: boolean;
  userId: string;
  matchedUserId?: string;
}