import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Search, Calendar, User, ArrowRight, ShieldCheck, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';

const posts = [
  {
    title: '10 Tips for Managing Diabetes Effectively',
    excerpt: 'Learn how to maintain healthy blood sugar levels through diet, exercise, and consistent monitoring.',
    category: 'Diabetes',
    author: 'Dr. Rajesh Sharma',
    date: 'Oct 12, 2023',
    image: 'https://images.unsplash.com/photo-1505751172107-573967a4dd29?auto=format&fit=crop&q=80&w=800',
  },
  {
    title: 'Understanding the Importance of Regular Checkups',
    excerpt: 'Preventive care is the cornerstone of long-term health. Discover why annual physicals are essential.',
    category: 'General Health',
    author: 'Dr. Rajesh Sharma',
    date: 'Oct 08, 2023',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800',
  },
  {
    title: 'Common Skin Conditions and How to Treat Them',
    excerpt: 'From acne to eczema, we explore the most common dermatological issues and modern treatment options.',
    category: 'Skin Care',
    author: 'Dr. Rajesh Sharma',
    date: 'Sep 28, 2023',
    image: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&q=80&w=800',
  },
  {
    title: 'Healthy Eating Habits for a Stronger Immune System',
    excerpt: 'Boost your body natural defenses with these nutrient-rich foods and simple dietary changes.',
    category: 'Nutrition',
    author: 'Dr. Rajesh Sharma',
    date: 'Sep 15, 2023',
    image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80&w=800',
  },
  {
    title: 'The Link Between Mental Health and Physical Well-being',
    excerpt: 'Exploring the mind-body connection and how stress management can improve your physical health.',
    category: 'Mental Health',
    author: 'Dr. Rajesh Sharma',
    date: 'Sep 02, 2023',
    image: 'https://images.unsplash.com/photo-1499209974431-9ddd3e2f01f8?auto=format&fit=crop&q=80&w=800',
  },
  {
    title: 'Pediatric Care: What Every Parent Should Know',
    excerpt: 'A guide to childhood vaccinations, growth milestones, and common health concerns for kids.',
    category: 'Pediatrics',
    author: 'Dr. Rajesh Sharma',
    date: 'Aug 20, 2023',
    image: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&q=80&w=800',
  },
];

export default function Blog() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-24 px-6 bg-slate-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 text-brand-600 font-bold uppercase tracking-widest text-sm"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Health Tips & Articles</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-6xl font-extrabold text-slate-900"
          >
            Stay Informed, <br />
            <span className="text-gradient">Stay Healthy</span>
          </motion.h1>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-2xl mx-auto relative"
          >
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-400" />
            <Input
              className="w-full h-16 pl-16 pr-6 rounded-full border-none shadow-xl bg-white text-lg focus:ring-2 focus:ring-brand-500"
              placeholder="Search health topics..."
            />
          </motion.div>

          <div className="flex flex-wrap justify-center gap-3 pt-4">
            {['All', 'Diabetes', 'General Health', 'Skin Care', 'Nutrition', 'Mental Health', 'Pediatrics'].map((cat, i) => (
              <Button
                key={i}
                variant={i === 0 ? 'default' : 'outline'}
                className={cn(
                  'rounded-full px-6 h-10 text-sm font-bold transition-all',
                  i === 0 ? 'bg-brand-600 shadow-lg' : 'border-slate-200 bg-white hover:bg-brand-50 hover:text-brand-600'
                )}
              >
                {cat}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {posts.map((post, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (i % 3) * 0.1 }}
              >
                <Card className="group h-full border-none card-shadow hover:-translate-y-2 transition-all duration-500 rounded-[32px] overflow-hidden bg-slate-50">
                  <div className="aspect-[16/10] overflow-hidden relative">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-6 left-6">
                      <div className="bg-white/90 backdrop-blur-sm px-4 py-1.5 rounded-full text-xs font-bold text-brand-600 flex items-center gap-1.5 shadow-lg">
                        <Tag className="w-3 h-3" />
                        {post.category}
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-8 space-y-6">
                    <div className="flex items-center gap-6 text-xs font-bold text-slate-400 uppercase tracking-widest">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-brand-400" />
                        <span>{post.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-brand-400" />
                        <span>{post.author}</span>
                      </div>
                    </div>

                    <h3 className="text-2xl font-bold text-slate-900 group-hover:text-brand-600 transition-colors leading-tight">
                      {post.title}
                    </h3>
                    
                    <p className="text-slate-500 leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>

                    <Link to="#" className="inline-flex items-center gap-2 text-sm font-bold text-brand-600 group-hover:gap-3 transition-all">
                      <span>Read Full Article</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="mt-20 text-center">
            <Button variant="outline" size="lg" className="rounded-full border-slate-200 px-12 h-14 text-lg font-bold hover:bg-slate-50">
              Load More Articles
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}
