
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Logo from './Logo';

interface OnboardingProps {
  onComplete: (userData: { name: string; avatar: string; dailyGoal: number }) => void;
}

const Onboarding = ({ onComplete }: OnboardingProps) => {
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('🌊');
  const [dailyGoal, setDailyGoal] = useState(2);

  const avatars = ['🌊', '🏄‍♂️', '🏄‍♀️', '🐠', '🐙', '🦈', '🌴', '⭐'];
  const goalOptions = [1, 2, 3, 4, 5];

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      onComplete({ name, avatar, dailyGoal });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md glass-effect">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Logo size="large" />
          </div>
          <CardTitle className="text-2xl font-bold text-primary">
            Welcome to TaskTide!
          </CardTitle>
          <p className="text-muted-foreground">
            {step === 1 && "Let's get you set up to surf through your tasks!"}
            {step === 2 && "Choose your wave rider avatar"}
            {step === 3 && "Set your daily study goal"}
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">What's your name?</label>
                <Input
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="text-center text-lg"
                />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <label className="text-sm font-medium mb-2 block text-center">Pick your avatar</label>
              <div className="grid grid-cols-4 gap-3">
                {avatars.map((emoji) => (
                  <button
                    key={emoji}
                    onClick={() => setAvatar(emoji)}
                    className={`p-3 text-2xl rounded-lg transition-all hover:scale-110 ${
                      avatar === emoji
                        ? 'bg-primary text-primary-foreground ring-2 ring-primary'
                        : 'bg-secondary hover:bg-secondary/80'
                    }`}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <label className="text-sm font-medium mb-2 block text-center">
                How many study sessions per day?
              </label>
              <div className="grid grid-cols-5 gap-2">
                {goalOptions.map((num) => (
                  <button
                    key={num}
                    onClick={() => setDailyGoal(num)}
                    className={`p-3 text-lg font-bold rounded-lg transition-all hover:scale-105 ${
                      dailyGoal === num
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-secondary hover:bg-secondary/80'
                    }`}
                  >
                    {num}
                  </button>
                ))}
              </div>
              <p className="text-xs text-muted-foreground text-center">
                You can change this later!
              </p>
            </div>
          )}

          <Button
            onClick={handleNext}
            className="w-full text-lg py-6 wave-gradient hover:scale-105 transition-transform"
            disabled={step === 1 && !name.trim()}
          >
            {step < 3 ? 'Next Wave 🌊' : 'Start Surfing! 🏄‍♂️'}
          </Button>

          <div className="flex justify-center space-x-2">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full transition-colors ${
                  i === step ? 'bg-primary' : 'bg-muted'
                }`}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Onboarding;
