
import { useState, useEffect } from 'react';
import { User, Task, FocusSession } from '@/types';

export const useTaskTide = () => {
  const [user, setUser] = useState<User | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isOnboarded, setIsOnboarded] = useState(false);

  // Initialize with sample data
  useEffect(() => {
    const savedUser = localStorage.getItem('tasktide-user');
    const savedTasks = localStorage.getItem('tasktide-tasks');
    
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setIsOnboarded(true);
    }
    
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    } else {
      // Create sample tasks
      const sampleTasks: Task[] = [
        {
          id: '1',
          title: 'Review Math Chapter 5',
          subject: 'Mathematics',
          duration: 25,
          points: 50,
          completed: false,
          difficulty: 'medium'
        },
        {
          id: '2',
          title: 'Read History Assignment',
          subject: 'History',
          duration: 30,
          points: 60,
          completed: false,
          difficulty: 'easy'
        },
        {
          id: '3',
          title: 'Practice Spanish Vocabulary',
          subject: 'Spanish',
          duration: 20,
          points: 40,
          completed: false,
          difficulty: 'easy'
        },
        {
          id: '4',
          title: 'Physics Problem Set',
          subject: 'Physics',
          duration: 45,
          points: 90,
          completed: false,
          difficulty: 'hard'
        }
      ];
      setTasks(sampleTasks);
    }
  }, []);

  const completeOnboarding = (userData: { name: string; avatar: string; dailyGoal: number }) => {
    const newUser: User = {
      id: '1',
      name: userData.name,
      avatar: userData.avatar,
      dailyGoal: userData.dailyGoal,
      streak: 1,
      totalPoints: 0,
      level: 1
    };
    
    setUser(newUser);
    setIsOnboarded(true);
    localStorage.setItem('tasktide-user', JSON.stringify(newUser));
  };

  const completeTask = (taskId: string) => {
    setTasks(prevTasks => {
      const updatedTasks = prevTasks.map(task => {
        if (task.id === taskId) {
          return { ...task, completed: true };
        }
        return task;
      });
      localStorage.setItem('tasktide-tasks', JSON.stringify(updatedTasks));
      return updatedTasks;
    });

    // Update user points
    if (user) {
      const task = tasks.find(t => t.id === taskId);
      if (task) {
        const updatedUser = {
          ...user,
          totalPoints: user.totalPoints + task.points
        };
        setUser(updatedUser);
        localStorage.setItem('tasktide-user', JSON.stringify(updatedUser));
      }
    }
  };

  return {
    user,
    tasks,
    isOnboarded,
    completeOnboarding,
    completeTask
  };
};
