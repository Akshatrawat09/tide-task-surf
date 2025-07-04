
export interface User {
  id: string;
  name: string;
  avatar: string;
  dailyGoal: number;
  streak: number;
  totalPoints: number;
  level: number;
}

export interface Task {
  id: string;
  title: string;
  subject: string;
  duration: number;
  points: number;
  completed: boolean;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface FocusSession {
  id: string;
  taskId: string;
  duration: number;
  completed: boolean;
  startTime: Date;
  endTime?: Date;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earned: boolean;
  earnedAt?: Date;
}
