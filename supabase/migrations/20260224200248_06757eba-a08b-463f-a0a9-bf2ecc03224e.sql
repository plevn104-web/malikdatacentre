
CREATE TABLE public.video_daily_usage (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  usage_date DATE NOT NULL DEFAULT CURRENT_DATE,
  generation_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, usage_date)
);

ALTER TABLE public.video_daily_usage ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own video usage" ON public.video_daily_usage
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own video usage" ON public.video_daily_usage
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own video usage" ON public.video_daily_usage
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Block anonymous video usage access" ON public.video_daily_usage
  FOR SELECT USING (auth.uid() IS NOT NULL);
