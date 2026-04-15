import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Calendar, Phone, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.05),transparent)]">
      <div className="dot-pattern absolute inset-0 opacity-50 -z-10" />
      
      <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="space-y-8"
        >
          <h1 className="text-5xl md:text-7xl font-extrabold leading-[1.1] tracking-tight text-slate-900">
            Trusted Care for <br />
            <span className="text-gradient">Your Health</span>
          </h1>

          <p className="text-lg md:text-xl text-text-muted leading-relaxed max-w-xl">
            Expert medical diagnosis and personalized treatment plans for you and your family. Led by Dr. Rajesh Sharma, MBBS MD.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Button asChild size="lg" className="w-full sm:w-auto rounded-full bg-gradient-brand px-8 h-14 text-lg font-bold btn-shadow border-none">
              <Link to="/appointment">Get Started Today</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="w-full sm:w-auto rounded-xl border-slate-200 px-8 h-14 text-lg font-bold bg-white card-shadow">
              <a href="tel:+1234567890" className="flex items-center gap-2">
                <Phone className="w-5 h-5 text-brand-600" />
                <span>Call Now</span>
              </a>
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative hidden lg:block"
        >
          <div className="relative aspect-[4/3] max-w-xl mx-auto rounded-[32px] overflow-hidden card-shadow bg-linear-to-b from-brand-100 to-white flex items-end justify-center">
            <div className="text-[180px] grayscale opacity-80 mb-[-20px]">👨‍⚕️</div>
            
            {/* Overlay Info */}
            <div className="absolute bottom-6 left-6 right-6 glass p-6 rounded-2xl border border-white/30 flex justify-around items-center">
              <div className="text-center">
                <div className="text-lg font-bold text-brand-600">Board Certified</div>
                <div className="text-xs text-text-muted">Top 1% in City</div>
              </div>
              <div className="w-px h-10 bg-slate-200" />
              <div className="text-center">
                <div className="text-lg font-bold text-accent-600">★ 4.9/5</div>
                <div className="text-xs text-text-muted">Patient Rating</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
