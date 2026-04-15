import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { CheckCircle2, Award, GraduationCap, Briefcase, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function DoctorHighlight() {
  return (
    <section className="py-24 px-6 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="relative z-10 rounded-[32px] overflow-hidden card-shadow">
            <img
              src="https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=1000"
              alt="Dr. Rajesh Sharma"
              className="w-full aspect-[4/5] object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          
          <div className="absolute bottom-8 -right-8 glass p-6 rounded-2xl shadow-xl z-20 max-w-[240px] border border-white/30">
            <div className="flex items-center gap-4 mb-3">
              <div className="w-12 h-12 rounded-full bg-brand-600 flex items-center justify-center text-white">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-bold text-text-muted uppercase tracking-wider">Recognized</p>
                <p className="text-sm font-bold text-slate-900">Best Physician 2023</p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          <div className="space-y-4">
            <h4 className="text-brand-600 font-bold uppercase tracking-widest text-sm">Meet Your Doctor</h4>
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight">
              Dr. Rajesh Sharma <br />
              <span className="text-text-muted text-3xl md:text-4xl font-normal">MBBS, MD (Internal Medicine)</span>
            </h2>
            <p className="text-lg text-text-muted leading-relaxed">
              With over 15 years of experience in internal medicine, Dr. Sharma is dedicated to providing comprehensive and compassionate care. He believes in a holistic approach to health, focusing on both treatment and prevention.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex gap-4">
              <div className="w-12 h-12 shrink-0 rounded-xl bg-brand-50 flex items-center justify-center text-brand-600">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div>
                <h5 className="font-bold text-slate-900">Education</h5>
                <p className="text-sm text-text-muted">AIIMS, New Delhi</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-12 h-12 shrink-0 rounded-xl bg-accent-50 flex items-center justify-center text-accent-600">
                <Briefcase className="w-6 h-6" />
              </div>
              <div>
                <h5 className="font-bold text-slate-900">Experience</h5>
                <p className="text-sm text-text-muted">15+ Years in Practice</p>
              </div>
            </div>
          </div>

          <ul className="space-y-3">
            {[
              'Personalized treatment plans',
              'Advanced diagnostic technology',
              'Preventive health screenings',
              'Compassionate patient support',
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-3 text-text-main font-medium">
                <CheckCircle2 className="w-5 h-5 text-brand-600" />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <div className="pt-4 flex flex-col sm:flex-row gap-4">
            <Button asChild size="lg" className="rounded-full bg-gradient-brand px-8 h-14 text-lg font-bold btn-shadow border-none">
              <Link to="/about">View Full Profile</Link>
            </Button>
            <Button asChild variant="ghost" size="lg" className="rounded-full px-8 h-14 text-lg text-brand-600 hover:bg-brand-50">
              <Link to="/appointment" className="flex items-center gap-2">
                <span>Book a Consultation</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
