import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  GraduationCap, 
  Clock, 
  BookOpen, 
  Star, 
  CheckCircle,
  ArrowRight,
  Sparkles,
  Crown,
  Users,
  Award,
  MessageCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Json } from '@/integrations/supabase/types';

interface Course {
  id: string;
  title: string;
  slug: string;
  description: string;
  duration_weeks: number;
  price_pkr: number;
  features: string[];
  is_bundle: boolean;
  display_order: number;
}

const USD_RATE = 278; // PKR to USD conversion rate

export default function Courses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [bundleCourse, setBundleCourse] = useState<Course | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [enrollingId, setEnrollingId] = useState<string | null>(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchCourses();
  }, []);

  const parseFeatures = (features: Json | null): string[] => {
    if (!features) return [];
    if (Array.isArray(features)) {
      return features.map(f => String(f));
    }
    return [];
  };

  const fetchCourses = async () => {
    try {
      const { data, error } = await supabase
        .from('courses')
        .select('*')
        .eq('is_active', true)
        .order('display_order');

      if (error) throw error;

      const coursesData: Course[] = (data || []).map(course => ({
        id: course.id,
        title: course.title,
        slug: course.slug,
        description: course.description,
        duration_weeks: course.duration_weeks,
        price_pkr: Number(course.price_pkr),
        features: parseFeatures(course.features),
        is_bundle: course.is_bundle || false,
        display_order: course.display_order
      }));

      const bundle = coursesData.find(c => c.is_bundle);
      const regularCourses = coursesData.filter(c => !c.is_bundle);

      setBundleCourse(bundle || null);
      setCourses(regularCourses);
    } catch (error) {
      console.error('Error fetching courses:', error);
      toast.error('Failed to load courses');
    } finally {
      setIsLoading(false);
    }
  };

  const formatPKR = (amount: number) => {
    return `PKR ${amount.toLocaleString()}`;
  };

  const formatUSD = (pkrAmount: number) => {
    const usd = Math.round(pkrAmount / USD_RATE);
    return `$${usd}`;
  };

  const handleEnroll = async (course: Course) => {
    if (!user) {
      toast.info('Please login to enroll in courses');
      navigate('/auth');
      return;
    }

    setEnrollingId(course.id);
    try {
      // Check if already enrolled
      const { data: existing } = await supabase
        .from('course_enrollments')
        .select('id, status')
        .eq('user_id', user.id)
        .eq('course_id', course.id)
        .maybeSingle();

      if (existing) {
        if (existing.status === 'active') {
          toast.info('You are already enrolled in this course');
          navigate('/dashboard');
          return;
        } else if (existing.status === 'pending') {
          toast.info('Your enrollment is pending approval');
          return;
        }
      }

      // Create enrollment request
      const { error } = await supabase
        .from('course_enrollments')
        .insert({
          user_id: user.id,
          course_id: course.id,
          status: 'pending'
        });

      if (error) throw error;

      toast.success('Enrollment request submitted! Please complete payment via wallet or WhatsApp.');
      
      // Open WhatsApp with enrollment message
      const message = `Hi! I want to enroll in: ${course.title}\nPrice: ${formatPKR(course.price_pkr)} (${formatUSD(course.price_pkr)})\n\nPlease share payment details.`;
      window.open(`https://wa.me/923489057646?text=${encodeURIComponent(message)}`, '_blank');
    } catch (error: any) {
      console.error('Enrollment error:', error);
      toast.error('Failed to process enrollment');
    } finally {
      setEnrollingId(null);
    }
  };

  const CourseCard = ({ course, featured = false }: { course: Course; featured?: boolean }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`h-full ${featured ? 'lg:col-span-2' : ''}`}
    >
      <Card className={`h-full relative overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-1 ${
        featured 
          ? 'bg-gradient-to-br from-primary/20 via-primary/10 to-background border-primary/50' 
          : 'bg-card border-border hover:border-primary/50'
      }`}>
        {featured && (
          <div className="absolute top-0 right-0">
            <div className="bg-primary text-primary-foreground px-4 py-1 text-sm font-bold rounded-bl-lg flex items-center gap-1">
              <Crown className="h-4 w-4" />
              BEST VALUE
            </div>
          </div>
        )}
        
        <CardHeader className="pb-4">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                {featured ? (
                  <div className="p-2 rounded-lg bg-primary/20">
                    <Sparkles className="h-5 w-5 text-primary" />
                  </div>
                ) : (
                  <div className="p-2 rounded-lg bg-secondary/50">
                    <BookOpen className="h-5 w-5 text-secondary-foreground" />
                  </div>
                )}
                <Badge variant="outline" className="text-xs">
                  <Clock className="h-3 w-3 mr-1" />
                  {course.duration_weeks} Weeks
                </Badge>
              </div>
              <h3 className={`font-display font-bold ${featured ? 'text-xl md:text-2xl' : 'text-lg'} text-foreground`}>
                {course.title}
              </h3>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <p className="text-muted-foreground text-sm leading-relaxed">
            {course.description}
          </p>

          {/* Features */}
          <div className="space-y-2">
            {course.features.slice(0, featured ? 6 : 4).map((feature, i) => (
              <div key={i} className="flex items-center gap-2 text-sm">
                <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                <span className="text-foreground">{feature}</span>
              </div>
            ))}
          </div>

          {/* Price */}
          <div className={`pt-4 border-t border-border ${featured ? 'bg-primary/5 -mx-6 px-6 py-4 -mb-6 mt-6' : ''}`}>
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Course Fee</p>
                <div className="flex items-baseline gap-2">
                  <span className={`font-bold ${featured ? 'text-2xl' : 'text-xl'} text-foreground`}>
                    {formatPKR(course.price_pkr)}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    ({formatUSD(course.price_pkr)})
                  </span>
                </div>
              </div>
              <Button 
                onClick={() => handleEnroll(course)}
                disabled={enrollingId === course.id}
                className={featured ? 'bg-primary hover:bg-primary/90' : ''}
                size={featured ? 'lg' : 'default'}
              >
                {enrollingId === course.id ? (
                  <div className="h-5 w-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                ) : (
                  <>
                    Enroll Now
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-24 pb-16 overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-secondary/10 blur-3xl" />
        </div>

        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <Badge className="mb-4 bg-primary/20 text-primary border-primary/30">
              <GraduationCap className="h-3 w-3 mr-1" />
              Professional Training
            </Badge>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
              Professional AI & Automation{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                Courses
              </span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Learn cutting-edge AI skills from industry experts. Master ChatGPT, automation, 
              freelancing, and more with our comprehensive training programs.
            </p>

            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Users className="h-5 w-5 text-primary" />
                <span>Expert Instructors</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Award className="h-5 w-5 text-primary" />
                <span>Certificate Included</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <MessageCircle className="h-5 w-5 text-primary" />
                <span>Lifetime Support</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Bundle Offer - Featured */}
      {bundleCourse && (
        <section className="py-8 px-4">
          <div className="container mx-auto max-w-4xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-3xl blur-xl" />
              <CourseCard course={bundleCourse} featured />
            </motion.div>
          </div>
        </section>
      )}

      {/* All Courses Grid */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-3xl font-bold text-foreground mb-4">
              Individual Courses
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Choose the courses that match your goals. Each course includes hands-on projects, 
              assignments, and certificate on completion.
            </p>
          </motion.div>

          {isLoading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {courses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Payment Methods */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">
              How to Enroll
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="bg-card border-border">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 rounded-xl bg-primary/20">
                    <Star className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-bold text-lg text-foreground">Via Wallet Balance</h3>
                </div>
                <ol className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-primary">1.</span>
                    Add balance to your wallet
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-primary">2.</span>
                    Wait for admin approval
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-primary">3.</span>
                    Enroll in your chosen course
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-primary">4.</span>
                    Access course in your dashboard
                  </li>
                </ol>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 rounded-xl bg-green-500/20">
                    <MessageCircle className="h-6 w-6 text-green-500" />
                  </div>
                  <h3 className="font-bold text-lg text-foreground">Via WhatsApp</h3>
                </div>
                <ol className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-green-500">1.</span>
                    Click "Enroll Now" on any course
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-green-500">2.</span>
                    Contact us on WhatsApp
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-green-500">3.</span>
                    Complete payment
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-green-500">4.</span>
                    Get instant access
                  </li>
                </ol>
                <Button 
                  className="w-full mt-4 bg-green-600 hover:bg-green-700"
                  onClick={() => window.open('https://wa.me/923489057646?text=Hi! I want to enroll in a course. Please share details.', '_blank')}
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Contact on WhatsApp
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}