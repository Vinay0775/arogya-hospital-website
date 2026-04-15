import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Stethoscope, Activity, Baby, Sparkles, HeartPulse, Brain, Eye, ShieldCheck, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const services = [
  {
    id: 'general',
    title: 'General Checkup',
    icon: Stethoscope,
    color: 'bg-blue-50 text-blue-600',
    symptoms: ['Fatigue', 'Mild Fever', 'Body Aches', 'General Weakness'],
    causes: ['Viral infections', 'Stress', 'Nutritional deficiencies', 'Lack of sleep'],
    process: 'Our general checkup includes a physical exam, blood tests, and lifestyle assessment to ensure your overall health is on track.',
  },
  {
    id: 'diabetes',
    title: 'Diabetes Care',
    icon: Activity,
    color: 'bg-red-50 text-red-600',
    symptoms: ['Increased Thirst', 'Frequent Urination', 'Blurred Vision', 'Slow Healing'],
    causes: ['Genetics', 'Insulin resistance', 'Sedentary lifestyle', 'Poor diet'],
    process: 'We offer continuous glucose monitoring, personalized nutrition plans, and medication management for both Type 1 and Type 2 diabetes.',
  },
  {
    id: 'child',
    title: 'Child Care',
    icon: Baby,
    color: 'bg-purple-50 text-purple-600',
    symptoms: ['Growth Delays', 'Frequent Colds', 'Behavioral Changes', 'Skin Rashes'],
    causes: ['Developmental stages', 'Immune system growth', 'Environmental factors'],
    process: 'Pediatric care focusing on vaccinations, developmental milestones, and common childhood illnesses in a friendly environment.',
  },
  {
    id: 'skin',
    title: 'Skin Treatment',
    icon: Sparkles,
    color: 'bg-accent-50 text-accent-600',
    symptoms: ['Acne', 'Eczema', 'Discoloration', 'Persistent Itching'],
    causes: ['Hormonal changes', 'Allergies', 'UV exposure', 'Skin conditions'],
    process: 'Advanced dermatological treatments including laser therapy, chemical peels, and medical-grade skincare routines.',
  },
  {
    id: 'heart',
    title: 'Cardiology',
    icon: HeartPulse,
    color: 'bg-rose-50 text-rose-600',
    symptoms: ['Chest Pain', 'Shortness of Breath', 'Palpitations', 'Dizziness'],
    causes: ['High blood pressure', 'Cholesterol', 'Smoking', 'Stress'],
    process: 'Heart health screenings, ECGs, and blood pressure management to prevent and treat cardiovascular diseases.',
  },
  {
    id: 'mental',
    title: 'Mental Wellness',
    icon: Brain,
    color: 'bg-indigo-50 text-indigo-600',
    symptoms: ['Anxiety', 'Insomnia', 'Mood Swings', 'Difficulty Concentrating'],
    causes: ['Work stress', 'Life changes', 'Chemical imbalances', 'Trauma'],
    process: 'Compassionate counseling and psychiatric support to help you manage stress and improve your mental well-being.',
  },
];

export default function Services() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-24 px-6 bg-slate-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto text-center space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 text-brand-600 font-bold uppercase tracking-widest text-sm"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Our Services</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-6xl font-extrabold text-slate-900"
          >
            Comprehensive Medical <br />
            <span className="text-gradient">Solutions for Everyone</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-text-muted max-w-3xl mx-auto leading-relaxed"
          >
            We offer a wide range of specialized services to meet your unique health needs. Our team uses the latest medical technology to provide the best care possible.
          </motion.p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {services.map((service, i) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (i % 3) * 0.1 }}
                className="group"
              >
                <div className="space-y-6 p-8 rounded-[32px] bg-white border border-slate-100 card-shadow hover:-translate-y-2 transition-all duration-500">
                  <div className={`w-16 h-16 rounded-2xl ${service.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <service.icon className="w-8 h-8" />
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold text-slate-900">{service.title}</h3>
                    
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="symptoms" className="border-none">
                        <AccordionTrigger className="text-sm font-bold text-text-muted hover:text-brand-600 py-2">
                          Common Symptoms
                        </AccordionTrigger>
                        <AccordionContent>
                          <ul className="grid grid-cols-2 gap-2 pt-2">
                            {service.symptoms.map((s, idx) => (
                              <li key={idx} className="flex items-center gap-2 text-sm text-text-muted">
                                <CheckCircle2 className="w-3 h-3 text-brand-500" />
                                {s}
                              </li>
                            ))}
                          </ul>
                        </AccordionContent>
                      </AccordionItem>
                      
                      <AccordionItem value="causes" className="border-none">
                        <AccordionTrigger className="text-sm font-bold text-text-muted hover:text-brand-600 py-2">
                          Potential Causes
                        </AccordionTrigger>
                        <AccordionContent>
                          <ul className="grid grid-cols-2 gap-2 pt-2">
                            {service.causes.map((c, idx) => (
                              <li key={idx} className="flex items-center gap-2 text-sm text-text-muted">
                                <CheckCircle2 className="w-3 h-3 text-accent-500" />
                                {c}
                              </li>
                            ))}
                          </ul>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>

                    <p className="text-text-muted text-sm leading-relaxed">
                      {service.process}
                    </p>
                  </div>

                  <Button asChild className="w-full rounded-xl bg-slate-50 text-slate-900 hover:bg-brand-600 hover:text-white transition-all shadow-none group-hover:shadow-lg">
                    <Link to="/appointment" className="flex items-center justify-center gap-2">
                      <span>Book Appointment</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 bg-gradient-brand text-white">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-4xl md:text-5xl font-extrabold">Ready to Prioritize Your Health?</h2>
          <p className="text-xl text-white/80">
            Don't wait for symptoms to worsen. Book a preventive checkup today and stay ahead of your health.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild size="lg" className="rounded-full bg-white text-brand-600 hover:bg-slate-50 px-10 h-14 text-lg font-bold shadow-xl border-none">
              <Link to="/appointment">Book Appointment Now</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full border-white/30 text-white hover:bg-white/10 px-10 h-14 text-lg font-bold">
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
