
import React, { useState } from 'react';
import { useTaskTide } from '@/hooks/useTaskTide';
import Onboarding from '@/components/Onboarding';
import Dashboard from '@/components/Dashboard';
import FocusMode from '@/components/FocusMode';

const Index = () => {
  const { user, tasks, isOnboarded, completeOnboarding, completeTask } = useTaskTide();
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

  if (!isOnboarded) {
    return <Onboarding onComplete={completeOnboarding} />;
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
      user={user!}
      tasks={tasks}
      onStartFocus={handleStartFocus}
      onCompleteTask={completeTask}
    />
  );
};

export default Index;
