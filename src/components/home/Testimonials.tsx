import { motion } from 'motion/react';
import { Quote, Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const testimonials = [
  {
    name: 'James Wilson',
    role: 'Diabetes Patient',
    content: 'Dr. Mitchell is incredibly thorough and caring. She took the time to explain my condition and created a plan that actually works for my lifestyle.',
    rating: 5,
    image: 'https://picsum.photos/seed/p1/100/100',
  },
  {
    name: 'Emily Chen',
    role: 'General Checkup',
    content: 'The clinic is modern, clean, and the staff is very professional. I felt comfortable from the moment I walked in. Highly recommended!',
    rating: 5,
    image: 'https://picsum.photos/seed/p2/100/100',
  },
  {
    name: 'Michael Brown',
    role: 'Skin Treatment',
    content: 'Excellent results with my skin treatment. The advanced technology they use is impressive, and the follow-up care was exceptional.',
    rating: 5,
    image: 'https://picsum.photos/seed/p3/100/100',
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 px-6 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h4 className="text-brand-600 font-bold uppercase tracking-widest text-sm">Testimonials</h4>
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900">
            What Our Patients <br />
            <span className="text-gradient">Are Saying</span>
          </h2>
          <p className="text-lg text-text-muted">
            Real stories from real patients. We take pride in the positive impact we have on our community's health.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="h-full border-none card-shadow rounded-[24px] overflow-hidden bg-white hover:border-accent-600 border transition-all">
                <CardContent className="p-8 space-y-6 relative">
                  <Quote className="absolute top-6 right-8 w-12 h-12 text-slate-50 opacity-50" />
                  
                  <div className="flex gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-accent-600 text-accent-600" />
                    ))}
                  </div>

                  <p className="text-text-main leading-relaxed italic relative z-10">
                    "{testimonial.content}"
                  </p>

                  <div className="flex items-center gap-4 pt-4 border-t border-slate-50">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-brand-100"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <h5 className="font-bold text-slate-900">{testimonial.name}</h5>
                      <p className="text-xs font-bold text-text-muted uppercase tracking-wider">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
