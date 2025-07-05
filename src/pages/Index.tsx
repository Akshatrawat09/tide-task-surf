
import React, { useState } from 'react';
import { useTaskTide } from '@/hooks/useTaskTide';
import { useAuth } from '@/hooks/useAuth';
import Dashboard from '@/components/Dashboard';
import FocusMode from '@/components/FocusMode';
import LandingPage from '@/components/LandingPage';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Logo from '@/components/Logo';

const Index = () => {
  const { user: authUser, loading: authLoading } = useAuth();
  const { user, tasks, loading, completeTask } = useTaskTide();
  const [focusMode, setFocusMode] = useState<{ active: boolean; task?: any }>({ active: false });

  const handleStartFocus = () => {
    const nextTask = tasks.find(task => !task.completed);
    if (nextTask) {
      setFocusMode({ active: true, task: nextTask });
    }
  };

  const handleCompleteFocus = () => {
    if (focusMode.task) {
      completeTask(focusMode.task.id);
    }
    setFocusMode({ active: false });
  };

  const handleExitFocus = () => {
    setFocusMode({ active: false });
  };

  // Show loading while checking auth
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Logo size="large" />
          <p className="mt-4 text-muted-foreground">Loading your waves...</p>
        </div>
      </div>
    );
  }

  // Show landing page if not authenticated
  if (!authUser) {
    return <LandingPage />;
  }

  // Show loading message if user profile not loaded yet
  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <Logo size="large" />
            <CardTitle>Setting up your profile...</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-center text-muted-foreground">
              Getting your TaskTide ready! 🌊
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (focusMode.active && focusMode.task) {
    return (
      <FocusMode
        taskTitle={focusMode.task.title}
        duration={focusMode.task.duration}
        onComplete={handleCompleteFocus}
        onExit={handleExitFocus}
      />
    );
  }

  return (
    <Dashboard
      user={user}
      tasks={tasks}
      onStartFocus={handleStartFocus}
      onCompleteTask={completeTask}
    />
  );
};

export default Index;
