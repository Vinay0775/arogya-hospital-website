import { motion } from 'motion/react';
import { Award, GraduationCap, Briefcase, Heart, CheckCircle2, ShieldCheck } from 'lucide-react';

export default function About() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-24 px-6 bg-gradient-soft relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2 text-brand-600 font-bold uppercase tracking-widest text-sm">
              <ShieldCheck className="w-4 h-4" />
              <span>About the Doctor</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 leading-tight">
              Dedicated to Your <br />
              <span className="text-gradient">Health & Well-being</span>
            </h1>
            <p className="text-xl text-text-muted leading-relaxed">
              Dr. Rajesh Sharma is a board-certified internist with a passion for preventive medicine and patient education. With over 15 years of experience, he has helped thousands of patients achieve their health goals.
            </p>
            <div className="flex items-center gap-6 pt-4">
              <div className="text-center">
                <p className="text-3xl font-bold text-slate-900">15+</p>
                <p className="text-sm text-slate-500 font-medium">Years Exp.</p>
              </div>
              <div className="w-px h-12 bg-slate-200" />
              <div className="text-center">
                <p className="text-3xl font-bold text-slate-900">10k+</p>
                <p className="text-sm text-slate-500 font-medium">Patients</p>
              </div>
              <div className="w-px h-12 bg-slate-200" />
              <div className="text-center">
                <p className="text-3xl font-bold text-slate-900">25+</p>
                <p className="text-sm text-slate-500 font-medium">Awards</p>
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative"
          >
            <div className="rounded-[32px] overflow-hidden card-shadow border-8 border-white">
              <img
                src="https://images.unsplash.com/photo-1559839734-2b71f1536783?auto=format&fit=crop&q=80&w=1000"
                alt="Dr. Rajesh Sharma"
                className="w-full aspect-square object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Experience Timeline */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-4xl mx-auto space-y-16">
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-bold font-display text-slate-900">Professional Journey</h2>
            <p className="text-lg text-slate-600">A timeline of excellence in medical practice and education.</p>
          </div>

          <div className="space-y-12 relative before:absolute before:left-[19px] before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-100">
            {[
              {
                year: '2018 - Present',
                title: 'Chief Medical Officer',
                org: 'Arogya Medicare Clinic',
                desc: 'Leading a team of specialists and implementing advanced patient care protocols.',
                icon: Award,
              },
              {
                year: '2012 - 2018',
                title: 'Senior Physician',
                org: 'AIIMS, New Delhi',
                desc: 'Specialized in complex internal medicine cases and resident mentorship.',
                icon: Briefcase,
              },
              {
                year: '2008 - 2012',
                title: 'Medical Residency',
                org: 'Safdarjung Hospital',
                desc: 'Completed intensive residency training with honors in clinical excellence.',
                icon: GraduationCap,
              },
              {
                year: '2004 - 2008',
                title: 'Medical Doctorate',
                org: 'Maulana Azad Medical College',
                desc: 'Graduated top of the class with a focus on internal medicine.',
                icon: Heart,
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative pl-12"
              >
                <div className="absolute left-0 top-1 w-10 h-10 rounded-full bg-white border-4 border-brand-100 flex items-center justify-center text-brand-600 z-10 shadow-sm">
                  <item.icon className="w-5 h-5" />
                </div>
                <div className="space-y-2">
                  <span className="text-sm font-bold text-brand-600 uppercase tracking-wider">{item.year}</span>
                  <h3 className="text-xl font-bold text-slate-900">{item.title}</h3>
                  <p className="text-slate-500 font-bold">{item.org}</p>
                  <p className="text-slate-600 leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Personal Message */}
      <section className="py-24 px-6 bg-slate-900 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-brand-600/10 blur-3xl rounded-full -mr-20 -mt-20" />
        <div className="max-w-4xl mx-auto text-center space-y-8 relative z-10">
          <Heart className="w-16 h-16 text-brand-400 mx-auto opacity-50" />
          <h2 className="text-4xl md:text-5xl font-bold font-display leading-tight">
            "My mission is to provide care that is as <span className="text-brand-400">compassionate</span> as it is <span className="text-brand-400">competent</span>."
          </h2>
          <p className="text-xl text-slate-400 leading-relaxed italic">
            - Dr. Rajesh Sharma
          </p>
          <div className="pt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              'Patient-First Approach',
              'Evidence-Based Medicine',
              'Continuous Innovation',
            ].map((text, i) => (
              <div key={i} className="flex items-center justify-center gap-3 text-lg font-medium">
                <CheckCircle2 className="w-6 h-6 text-brand-400" />
                <span>{text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
