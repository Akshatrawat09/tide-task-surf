
import React from 'react';
import { Button } from '@/components/ui/button';
import { Task } from '@/types';

interface TaskWaveProps {
  task: Task;
  onComplete: () => void;
}

const TaskWave = ({ task, onComplete }: TaskWaveProps) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDifficultyEmoji = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return '🌊';
      case 'medium': return '🌊🌊';
      case 'hard': return '🌊🌊🌊';
      default: return '🌊';
    }
  };

  return (
    <div className="flex items-center justify-between p-4 rounded-lg border glass-effect hover:shadow-md transition-all group">
      <div className="flex-1">
        <div className="flex items-center space-x-3 mb-2">
          <span className="text-lg animate-wave">
            {getDifficultyEmoji(task.difficulty)}
          </span>
          <h3 className="font-medium group-hover:text-primary transition-colors">
            {task.title}
          </h3>
        </div>
        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
          <span className="flex items-center space-x-1">
            <span>📚</span>
            <span>{task.subject}</span>
          </span>
          <span className="flex items-center space-x-1">
            <span>⏱️</span>
            <span>{task.duration} min</span>
          </span>
          <span className={`px-2 py-1 rounded-full text-xs ${getDifficultyColor(task.difficulty)}`}>
            {task.difficulty}
          </span>
        </div>
      </div>
      <div className="flex items-center space-x-3">
        <div className="text-right">
          <div className="text-sm font-semibold text-primary">+{task.points}</div>
          <div className="text-xs text-muted-foreground">points</div>
        </div>
        <Button
          onClick={onComplete}
          size="sm"
          variant="outline"
          className="hover:bg-primary hover:text-primary-foreground transition-colors"
        >
          Surf! 🏄‍♂️
        </Button>
      </div>
    </div>
  );
};

export default TaskWave;
