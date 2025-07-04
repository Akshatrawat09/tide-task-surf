
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface FocusModeProps {
  taskTitle: string;
  duration: number;
  onComplete: () => void;
  onExit: () => void;
}

const FocusMode = ({ taskTitle, duration, onComplete, onExit }: FocusModeProps) => {
  const [timeLeft, setTimeLeft] = useState(duration * 60); // Convert to seconds
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const encouragingMessages = [
    "You're riding this wave perfectly! 🌊",
    "Keep flowing, you've got this! 💪",
    "Smooth sailing ahead! ⛵",
    "You're in the zone! 🎯",
    "Making great progress! 🚀",
    "Stay focused, surfer! 🏄‍♂️",
    "Riding the wave of productivity! 🌊✨"
  ];

  const [currentMessage, setCurrentMessage] = useState(encouragingMessages[0]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    
    if (isActive && !isPaused && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft => timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      onComplete();
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, isPaused, timeLeft, onComplete]);

  // Change encouraging message every 2 minutes
  useEffect(() => {
    const messageInterval = setInterval(() => {
      const randomMessage = encouragingMessages[Math.floor(Math.random() * encouragingMessages.length)];
      setCurrentMessage(randomMessage);
    }, 120000);

    return () => clearInterval(messageInterval);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progressPercentage = ((duration * 60 - timeLeft) / (duration * 60)) * 100;

  const handleStart = () => {
    setIsActive(true);
    setIsPaused(false);
  };

  const handlePause = () => {
    setIsPaused(!isPaused);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    }}>
      <Card className="w-full max-w-md glass-effect">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-primary mb-2">
            Focus Mode 🎯
          </CardTitle>
          <p className="text-lg font-medium">{taskTitle}</p>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* Timer Display */}
          <div className="text-center">
            <div className="text-6xl font-bold text-primary mb-4">
              {formatTime(timeLeft)}
            </div>
            <Progress value={progressPercentage} className="h-4 mb-4" />
            <p className="text-sm text-muted-foreground">
              {Math.floor(progressPercentage)}% completed
            </p>
          </div>

          {/* Encouraging Message */}
          <Card className="bg-primary/10 border-primary/20">
            <CardContent className="pt-4">
              <p className="text-center text-primary font-medium animate-float">
                {currentMessage}
              </p>
            </CardContent>
          </Card>

          {/* Controls */}
          <div className="space-y-3">
            {!isActive ? (
              <Button
                onClick={handleStart}
                className="w-full py-6 text-xl font-bold wave-gradient hover:scale-105 transition-transform"
              >
                Start Surfing! 🏄‍♂️
              </Button>
            ) : (
              <Button
                onClick={handlePause}
                className="w-full py-6 text-xl font-bold"
                variant={isPaused ? "default" : "secondary"}
              >
                {isPaused ? 'Resume 🌊' : 'Pause ⏸️'}
              </Button>
            )}
            
            <Button
              onClick={onExit}
              variant="outline"
              className="w-full"
            >
              Exit Focus Mode
            </Button>
          </div>

          {/* Distraction Blocker Message */}
          <div className="text-center text-xs text-muted-foreground">
            <p>🚫 Distractions blocked</p>
            <p>Stay in the flow!</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FocusMode;
