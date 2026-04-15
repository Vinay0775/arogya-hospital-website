import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Stethoscope, Activity, Baby, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const services = [
  {
    title: 'General Checkup',
    description: 'Comprehensive health evaluations and preventive screenings for all ages.',
    icon: Stethoscope,
    color: 'bg-blue-50 text-blue-600',
  },
  {
    title: 'Diabetes Care',
    description: 'Expert management of blood sugar levels and lifestyle counseling.',
    icon: Activity,
    color: 'bg-red-50 text-red-600',
  },
  {
    title: 'Child Care',
    description: 'Specialized pediatric care focusing on growth, development, and wellness.',
    icon: Baby,
    color: 'bg-purple-50 text-purple-600',
  },
  {
    title: 'Skin Treatment',
    description: 'Advanced dermatological solutions for healthy and glowing skin.',
    icon: Sparkles,
    color: 'bg-accent-50 text-accent-600',
  },
];

export default function ServicesPreview() {
  return (
    <section className="py-24 px-6 bg-bg-main">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16">
          <div className="max-w-2xl space-y-4">
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900">
              Specialized Medical Services <br />
              <span className="text-gradient">Tailored for You</span>
            </h2>
            <p className="text-lg text-text-muted">
              We provide a wide range of medical services to ensure your health and well-being. Our expert team is here to support you at every step.
            </p>
          </div>
          <Button asChild variant="outline" className="rounded-full border-slate-200 text-brand-600 hover:bg-brand-50 card-shadow">
            <Link to="/services" className="flex items-center gap-2">
              <span>View All Services</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group bg-white p-8 rounded-[24px] border border-slate-100 transition-all duration-200 hover:border-accent-600 card-shadow cursor-pointer"
            >
              <div className="w-12 h-12 bg-accent-50 rounded-xl flex items-center justify-center text-accent-600 mb-6 group-hover:scale-110 transition-transform">
                <service.icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">{service.title}</h3>
              <p className="text-sm text-text-muted leading-relaxed mb-6">
                {service.description}
              </p>
              <Link 
                to="/services" 
                className="inline-flex items-center gap-2 text-sm font-bold text-brand-600 hover:gap-3 transition-all"
              >
                Learn More <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
