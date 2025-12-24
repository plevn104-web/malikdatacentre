-- Courses & Training System for MALIK DATA CENTRE

-- Create courses table
CREATE TABLE public.courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT NOT NULL,
  duration_weeks INTEGER NOT NULL,
  price_pkr NUMERIC NOT NULL,
  features JSONB DEFAULT '[]'::jsonb,
  is_bundle BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create course enrollments table
CREATE TABLE public.course_enrollments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
  transaction_id UUID REFERENCES public.transactions(id),
  status TEXT NOT NULL DEFAULT 'pending', -- pending, active, completed, cancelled
  enrolled_at TIMESTAMP WITH TIME ZONE,
  completed_at TIMESTAMP WITH TIME ZONE,
  progress INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, course_id)
);

-- Enable RLS
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.course_enrollments ENABLE ROW LEVEL SECURITY;

-- Courses: Anyone can view active courses
CREATE POLICY "Anyone can view active courses"
ON public.courses
FOR SELECT
USING (is_active = true);

-- Courses: Admins can manage all courses
CREATE POLICY "Admins can manage courses"
ON public.courses
FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role));

-- Enrollments: Users can view their own enrollments
CREATE POLICY "Users can view their own enrollments"
ON public.course_enrollments
FOR SELECT
USING (auth.uid() = user_id);

-- Enrollments: Users can create their own enrollment requests
CREATE POLICY "Users can create enrollment requests"
ON public.course_enrollments
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Enrollments: Only admins can update enrollments (for approval)
CREATE POLICY "Admins can manage all enrollments"
ON public.course_enrollments
FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role));

-- Trigger for updated_at
CREATE TRIGGER update_courses_updated_at
BEFORE UPDATE ON public.courses
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_course_enrollments_updated_at
BEFORE UPDATE ON public.course_enrollments
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert courses data
INSERT INTO public.courses (title, slug, description, duration_weeks, price_pkr, features, is_bundle, display_order) VALUES
(
  'AI Foundations & Prompt Engineering',
  'ai-foundations',
  'Beginner-friendly course covering AI basics, terminology, capabilities, limitations, and Prompt Engineering fundamentals. Learn how to use ChatGPT and AI tools with smart prompts for real-world tasks and earning opportunities.',
  8,
  13500,
  '["AI Basics & Terminology", "ChatGPT Mastery", "Prompt Engineering", "Real-World Applications", "Earning Opportunities"]'::jsonb,
  false,
  1
),
(
  'ChatGPT & AI Tools Mastery',
  'chatgpt-mastery',
  'Master ChatGPT, Claude, Gemini, and top AI tools for automation, content creation, research, and business workflows.',
  6,
  9500,
  '["ChatGPT Pro Techniques", "Claude & Gemini", "Content Creation", "Business Automation", "Research Methods"]'::jsonb,
  false,
  2
),
(
  'AI Automation (No Code / Low Code)',
  'ai-automation',
  'Learn real business automation using no-code/low-code tools like Make and Zapier. Build workflows, bots, and automation systems.',
  8,
  15000,
  '["Make.com Mastery", "Zapier Workflows", "Bot Building", "Business Automation", "Integration Systems"]'::jsonb,
  false,
  3
),
(
  'YouTube Automation With AI',
  'youtube-automation',
  'Complete AI-based YouTube automation system including scripts, videos, thumbnails, uploading, and monetization roadmap.',
  6,
  11500,
  '["AI Script Writing", "Video Generation", "Thumbnail Design", "Upload Automation", "Monetization Strategy"]'::jsonb,
  false,
  4
),
(
  'Freelancing With AI',
  'freelancing-ai',
  'Learn how to earn on Fiverr and Upwork using AI skills such as writing, automation, research, and design.',
  5,
  8000,
  '["Fiverr Success", "Upwork Mastery", "AI Writing Services", "Client Acquisition", "Portfolio Building"]'::jsonb,
  false,
  5
),
(
  'E-Commerce With AI',
  'ecommerce-ai',
  'Build AI-powered e-commerce businesses including product research, Shopify setup, automation, and sales optimization.',
  8,
  16500,
  '["Product Research", "Shopify Setup", "AI Automation", "Sales Optimization", "Scaling Strategies"]'::jsonb,
  false,
  6
),
(
  'AI for Digital Marketing',
  'digital-marketing-ai',
  'Learn AI-driven social media marketing, SEO, ads automation, and analytics optimization.',
  6,
  12500,
  '["Social Media AI", "SEO Automation", "Ads Optimization", "Analytics Mastery", "Growth Hacking"]'::jsonb,
  false,
  7
),
(
  'Advanced Prompt Engineering & AI Projects',
  'advanced-prompts',
  'Advanced prompt strategies with real-world AI projects, assignments, and portfolio-ready work.',
  6,
  10500,
  '["Advanced Prompts", "Real Projects", "Portfolio Work", "Industry Applications", "Certification"]'::jsonb,
  false,
  8
),
(
  'AI Complete Pack (All 8 Courses)',
  'ai-complete-bundle',
  'Get access to all 8 professional AI courses with lifetime support, certificates, and community access. The complete AI education package.',
  48,
  65000,
  '["All 8 Courses", "Certificate on Completion", "Lifetime Support", "Community Access", "Priority Updates", "1-on-1 Mentoring Sessions"]'::jsonb,
  true,
  0
);

-- Comments for documentation
COMMENT ON TABLE public.courses IS 'Professional AI & Automation courses catalog';
COMMENT ON TABLE public.course_enrollments IS 'User course enrollment and progress tracking';