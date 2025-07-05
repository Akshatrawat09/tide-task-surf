
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Logo from '@/components/Logo';
import { useNavigate } from 'react-router-dom';
import { 
  Timer, 
  Trophy, 
  Users, 
  Star, 
  Target, 
  Gift, 
  Calendar, 
  BarChart3, 
  Settings 
} from 'lucide-react';

const LandingPage = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Timer,
      title: "Focus Sessions",
      description: "Start a distraction-free timer, get encouragement, and earn points."
    },
    {
      icon: Trophy,
      title: "Gamified Progress",
      description: "Collect badges, XP, and streaks for every completed task."
    },
    {
      icon: Users,
      title: "Study Crews",
      description: "Team up with friends, join group challenges, and cheer each other on."
    },
    {
      icon: Star,
      title: "Custom Avatars",
      description: "Unlock outfits and accessories as you progress."
    },
    {
      icon: Target,
      title: "Skill Trees",
      description: "Visualize your learning journey and unlock new topics."
    },
    {
      icon: Gift,
      title: "Virtual Rewards",
      description: "Earn coins to spend on avatar upgrades and special features."
    },
    {
      icon: Calendar,
      title: "Daily Quests",
      description: "Take on daily/weekly challenges for bonus rewards."
    },
    {
      icon: BarChart3,
      title: "Progress Analytics",
      description: "See your improvement, track time, and celebrate milestones."
    },
    {
      icon: Settings,
      title: "Accessibility",
      description: "Custom fonts, colors, and voice commands for all learners."
    }
  ];

  const userFlow = [
    { step: "1. Welcome", description: "See the logo, tagline, and mascot greeting." },
    { step: "2. Quick Signup", description: "Enter your name, pick an avatar, set your daily study goal." },
    { step: "3. Dashboard", description: "View today's tasks as \"waves,\" with a big \"Start Focus Session\" button." },
    { step: "4. Focus Mode", description: "Timer starts, distractions blocked, encouragement shown." },
    { step: "5. Rewards & Social", description: "Earn points, badges, join crews, and see your progress." },
    { step: "6. Reflection", description: "End-of-day summary, mood check-in, set tomorrow's goal." }
  ];

  const reviews = [
    {
      text: "TaskTide makes studying actually fun! Competing with my friends keeps me on track.",
      author: "Aanya S.",
      rating: 5
    },
    {
      text: "I love the avatars and daily quests. I've never been this consistent with my homework!",
      author: "Rahul M.",
      rating: 5
    },
    {
      text: "The focus sessions help me avoid distractions. Highly recommend!",
      author: "Priya K.",
      rating: 5
    }
  ];

  const faqs = [
    {
      question: "Who is TaskTide for?",
      answer: "Any student who wants to stay focused, finish assignments on time, and enjoy studying."
    },
    {
      question: "Is it free?",
      answer: "Yes! Get started for free and unlock more features as you progress."
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 glass-effect border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Logo size="medium" />
            <div>
              <h1 className="text-xl font-bold text-primary">TaskTide</h1>
              <p className="text-sm text-muted-foreground">Ride the Wave of Productivity</p>
            </div>
          </div>
          <Button 
            onClick={() => navigate('/auth')}
            className="bg-accent hover:bg-accent/90 text-white"
          >
            Get Started Free
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 text-center">
        <div className="container mx-auto max-w-4xl">
          <div className="mb-8">
            <Logo size="large" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Beat Procrastination. Make Studying Fun.
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            TaskTide turns your study tasks into a social, gamified adventure. 
            Surf through assignments, earn rewards, and stay motivated—together! 🌊
          </p>
          <Button 
            size="lg"
            onClick={() => navigate('/auth')}
            className="bg-accent hover:bg-accent/90 text-white text-lg px-8 py-4 animate-pulse-gentle"
          >
            Get Started Free
          </Button>
        </div>
      </section>

      {/* What is TaskTide */}
      <section className="py-16 px-4 bg-secondary/30">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-6">What is TaskTide?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            TaskTide is a productivity and focus platform for students. 
            It helps you conquer distractions, finish homework on time, and enjoy studying 
            by making it social and rewarding.
          </p>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12">Exciting Features</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="glass-effect hover:shadow-lg transition-all animate-fade-in">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <feature.icon className="w-8 h-8 text-primary" />
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* User Flow */}
      <section className="py-16 px-4 bg-secondary/30">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-12">User Flow</h2>
          <div className="space-y-4">
            {userFlow.map((step, index) => (
              <Card key={index} className="glass-effect">
                <CardContent className="flex items-center space-x-4 p-6">
                  <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="font-semibold text-primary">{step.step}</h3>
                    <p className="text-muted-foreground">{step.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-12">Why Students Love TaskTide</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {reviews.map((review, index) => (
              <Card key={index} className="glass-effect">
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                    ))}
                  </div>
                  <blockquote className="text-muted-foreground mb-4">
                    "{review.text}"
                  </blockquote>
                  <cite className="text-sm font-semibold">— {review.author}</cite>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-4 bg-secondary/30">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-12">FAQ</h2>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <Card key={index} className="glass-effect">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-2 text-primary">Q: {faq.question}</h3>
                  <p className="text-muted-foreground">A: {faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4 text-center">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl font-bold mb-6">Ready to Surf Your Way to Success?</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join thousands of students who've transformed their study habits with TaskTide.
          </p>
          <Button 
            size="lg"
            onClick={() => navigate('/auth')}
            className="bg-accent hover:bg-accent/90 text-white text-lg px-8 py-4"
          >
            Start Your Journey Today
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t bg-secondary/50">
        <div className="container mx-auto max-w-4xl text-center">
          <p className="text-sm text-muted-foreground mb-4">
            Contact | Privacy | Terms
          </p>
          <p className="text-sm text-muted-foreground">
            Made with 💙 by students, for students.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
