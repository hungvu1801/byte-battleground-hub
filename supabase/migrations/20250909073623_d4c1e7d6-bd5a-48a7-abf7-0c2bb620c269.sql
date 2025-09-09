-- Create enum types
CREATE TYPE public.difficulty_level AS ENUM ('easy', 'medium', 'hard');
CREATE TYPE public.challenge_status AS ENUM ('draft', 'published', 'archived');
CREATE TYPE public.achievement_type AS ENUM ('first_challenge', 'score_milestone', 'streak', 'difficulty_master');

-- Create profiles table
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT UNIQUE,
  display_name TEXT,
  avatar_url TEXT,
  total_score INTEGER DEFAULT 0,
  challenges_completed INTEGER DEFAULT 0,
  current_streak INTEGER DEFAULT 0,
  max_streak INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create challenges table
CREATE TABLE public.challenges (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  difficulty difficulty_level NOT NULL,
  status challenge_status NOT NULL DEFAULT 'draft',
  expected_output TEXT,
  test_cases JSONB,
  time_limit INTEGER DEFAULT 300, -- seconds
  max_score INTEGER DEFAULT 100,
  tags TEXT[],
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create user_challenges table (tracks attempts)
CREATE TABLE public.user_challenges (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  challenge_id UUID NOT NULL REFERENCES public.challenges(id) ON DELETE CASCADE,
  code_submission TEXT,
  score INTEGER DEFAULT 0,
  completed BOOLEAN DEFAULT FALSE,
  time_taken INTEGER, -- seconds
  attempts INTEGER DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, challenge_id)
);

-- Create achievements table
CREATE TABLE public.achievements (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  description TEXT NOT NULL,
  type achievement_type NOT NULL,
  icon TEXT,
  requirement_value INTEGER,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create user_achievements table
CREATE TABLE public.user_achievements (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  achievement_id UUID NOT NULL REFERENCES public.achievements(id) ON DELETE CASCADE,
  earned_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, achievement_id)
);

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.challenges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_challenges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_achievements ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
CREATE POLICY "Users can view all profiles" 
ON public.profiles 
FOR SELECT 
USING (true);

CREATE POLICY "Users can update their own profile" 
ON public.profiles 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile" 
ON public.profiles 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- RLS Policies for challenges
CREATE POLICY "Everyone can view published challenges" 
ON public.challenges 
FOR SELECT 
USING (status = 'published' OR auth.uid() = created_by);

CREATE POLICY "Authenticated users can create challenges" 
ON public.challenges 
FOR INSERT 
WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Users can update their own challenges" 
ON public.challenges 
FOR UPDATE 
USING (auth.uid() = created_by);

CREATE POLICY "Users can delete their own challenges" 
ON public.challenges 
FOR DELETE 
USING (auth.uid() = created_by);

-- RLS Policies for user_challenges
CREATE POLICY "Users can view their own challenge attempts" 
ON public.user_challenges 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own challenge attempts" 
ON public.user_challenges 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own challenge attempts" 
ON public.user_challenges 
FOR UPDATE 
USING (auth.uid() = user_id);

-- RLS Policies for achievements
CREATE POLICY "Everyone can view achievements" 
ON public.achievements 
FOR SELECT 
USING (true);

-- RLS Policies for user_achievements
CREATE POLICY "Everyone can view user achievements" 
ON public.user_achievements 
FOR SELECT 
USING (true);

CREATE POLICY "Users can only insert their own achievements" 
ON public.user_achievements 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_profiles_updated_at
BEFORE UPDATE ON public.profiles
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_challenges_updated_at
BEFORE UPDATE ON public.challenges
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_user_challenges_updated_at
BEFORE UPDATE ON public.user_challenges
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create function to handle new user registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, username, display_name)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data ->> 'username',
    COALESCE(NEW.raw_user_meta_data ->> 'full_name', NEW.email)
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Trigger to create profile on user signup
CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW
EXECUTE FUNCTION public.handle_new_user();

-- Insert some sample achievements
INSERT INTO public.achievements (name, description, type, icon, requirement_value) VALUES
('First Steps', 'Complete your first coding challenge', 'first_challenge', '🎯', 1),
('Getting Started', 'Score 100 total points', 'score_milestone', '⭐', 100),
('Rising Star', 'Score 500 total points', 'score_milestone', '🌟', 500),
('Code Master', 'Score 1000 total points', 'score_milestone', '👑', 1000),
('Streak Starter', 'Complete challenges 3 days in a row', 'streak', '🔥', 3),
('Consistent Coder', 'Complete challenges 7 days in a row', 'streak', '⚡', 7),
('Easy Master', 'Complete 10 easy challenges', 'difficulty_master', '🥉', 10),
('Medium Master', 'Complete 10 medium challenges', 'difficulty_master', '🥈', 10),
('Hard Master', 'Complete 10 hard challenges', 'difficulty_master', '🥇', 10);