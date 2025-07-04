
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import Logo from './Logo';
import TaskWave from './TaskWave';
import { User, Task } from '@/types';

interface DashboardProps {
  user: User;
  tasks: Task[];
  onStartFocus: () => void;
  onCompleteTask: (taskId: string) => void;
}

const Dashboard = ({ user, tasks, onStartFocus, onCompleteTask }: DashboardProps) => {
  const completedToday = tasks.filter(task => task.completed).length;
  const progressPercentage = (completedToday / user.dailyGoal) * 100;
  const pendingTasks = tasks.filter(task => !task.completed);

  return (
    <div className="min-h-screen p-4 pb-20">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-3">
          <Logo size="medium" />
          <div>
            <h1 className="text-2xl font-bold">TaskTide</h1>
            <p className="text-sm text-muted-foreground">Surf through your tasks</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl">{user.avatar}</div>
          <p className="text-sm font-medium">{user.name}</p>
        </div>
      </div>

      {/* Welcome Message */}
      <Card className="mb-6 glass-effect">
        <CardContent className="pt-6">
          <div className="text-center">
            <h2 className="text-xl font-semibold mb-2">
              Ready to ride some waves? 🌊
            </h2>
            <p className="text-muted-foreground">
              You've got {pendingTasks.length} tasks waiting to be surfed!
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Progress Section */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Today's Progress</span>
            <span className="text-lg">🔥 {user.streak}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Sessions completed</span>
                <span>{completedToday}/{user.dailyGoal}</span>
              </div>
              <Progress value={progressPercentage} className="h-3" />
            </div>
            <div className="flex justify-between items-center">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{user.totalPoints}</div>
                <div className="text-xs text-muted-foreground">Points</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-accent">Level {user.level}</div>
                <div className="text-xs text-muted-foreground">Surfer</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Focus Button */}
      {pendingTasks.length > 0 && (
        <Button
          onClick={onStartFocus}
          className="w-full py-8 text-xl font-bold mb-6 wave-gradient hover:scale-105 transition-transform animate-pulse-gentle"
        >
          🏄‍♂️ Start Focus Session
        </Button>
      )}

      {/* Today's Waves (Tasks) */}
      <Card>
        <CardHeader>
          <CardTitle>Today's Waves</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {pendingTasks.length === 0 ? (
              <div className="text-center py-8">
                <div className="text-6xl mb-4">🎉</div>
                <h3 className="text-lg font-semibold mb-2">All waves surfed!</h3>
                <p className="text-muted-foreground">
                  You've completed all your tasks for today. Great job!
                </p>
              </div>
            ) : (
              pendingTasks.map((task) => (
                <TaskWave
                  key={task.id}
                  task={task}
                  onComplete={() => onCompleteTask(task.id)}
                />
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
