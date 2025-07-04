
import { useState, useEffect } from 'react';
import { User, Task, FocusSession } from '@/types';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

export const useTaskTide = () => {
  const { user: authUser, loading: authLoading } = useAuth();
  const [user, setUser] = useState<User | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch user profile and tasks when authenticated
  useEffect(() => {
    if (authLoading) return;
    
    if (authUser) {
      fetchUserProfile();
      fetchTasks();
    } else {
      setUser(null);
      setTasks([]);
      setLoading(false);
    }
  }, [authUser, authLoading]);

  const fetchUserProfile = async () => {
    if (!authUser) return;

    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', authUser.id)
      .single();

    if (data && !error) {
      setUser({
        id: data.id,
        name: data.name,
        avatar: data.avatar,
        dailyGoal: data.daily_goal,
        streak: data.streak,
        totalPoints: data.total_points,
        level: data.level
      });
    }
  };

  const fetchTasks = async () => {
    if (!authUser) return;
    
    setLoading(true);
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .eq('user_id', authUser.id)
      .order('created_at', { ascending: false });

    if (data && !error) {
      const formattedTasks: Task[] = data.map(task => ({
        id: task.id,
        title: task.title,
        subject: task.subject,
        duration: task.duration,
        points: task.points,
        completed: task.completed,
        difficulty: task.difficulty as 'easy' | 'medium' | 'hard'
      }));
      setTasks(formattedTasks);
    } else {
      // Create sample tasks for new users
      await createSampleTasks();
    }
    setLoading(false);
  };

  const createSampleTasks = async () => {
    if (!authUser) return;

    const sampleTasks = [
      {
        user_id: authUser.id,
        title: 'Review Math Chapter 5',
        subject: 'Mathematics',
        duration: 25,
        points: 50,
        difficulty: 'medium'
      },
      {
        user_id: authUser.id,
        title: 'Read History Assignment',
        subject: 'History',
        duration: 30,
        points: 60,
        difficulty: 'easy'
      },
      {
        user_id: authUser.id,
        title: 'Practice Spanish Vocabulary',
        subject: 'Spanish',
        duration: 20,
        points: 40,
        difficulty: 'easy'
      },
      {
        user_id: authUser.id,
        title: 'Physics Problem Set',
        subject: 'Physics',
        duration: 45,
        points: 90,
        difficulty: 'hard'
      }
    ];

    const { error } = await supabase
      .from('tasks')
      .insert(sampleTasks);

    if (!error) {
      fetchTasks(); // Refresh tasks
    }
  };

  const completeTask = async (taskId: string) => {
    if (!authUser) return;

    // Update task as completed
    const { error: taskError } = await supabase
      .from('tasks')
      .update({ 
        completed: true,
        completed_at: new Date().toISOString()
      })
      .eq('id', taskId);

    if (taskError) return;

    // Update local state
    const task = tasks.find(t => t.id === taskId);
    if (task && user) {
      // Update user points
      const newTotalPoints = user.totalPoints + task.points;
      
      const { error: profileError } = await supabase
        .from('profiles')
        .update({ total_points: newTotalPoints })
        .eq('id', authUser.id);

      if (!profileError) {
        setUser(prev => prev ? { ...prev, totalPoints: newTotalPoints } : null);
      }
    }

    // Refresh tasks
    fetchTasks();
  };

  return {
    user,
    tasks,
    loading: loading || authLoading,
    isOnboarded: !!authUser,
    completeOnboarding: () => {}, // Not needed with auth
    completeTask
  };
};
