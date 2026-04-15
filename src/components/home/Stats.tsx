import { motion, useSpring, useTransform, useInView } from 'motion/react';
import { Users, Award, Clock, HeartPulse } from 'lucide-react';
import { useEffect, useRef } from 'react';

function Counter({ value, suffix = '' }: { value: string, suffix?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const numericValue = parseInt(value.replace(/\D/g, ''));
  
  const spring = useSpring(0, {
    mass: 1,
    stiffness: 100,
    damping: 30,
  });
  
  const display = useTransform(spring, (current) => 
    Math.round(current).toLocaleString() + suffix
  );

  useEffect(() => {
    if (isInView) {
      spring.set(numericValue);
    }
  }, [isInView, spring, numericValue]);

  return <motion.span ref={ref}>{display}</motion.span>;
}

const stats = [
  { label: 'Patients Treated', value: '10000', suffix: '+', icon: Users, color: 'text-brand-600', bg: 'bg-brand-50' },
  { label: 'Years Experience', value: '15', suffix: '+', icon: Clock, color: 'text-accent-600', bg: 'bg-accent-50' },
  { label: 'Medical Awards', value: '25', suffix: '+', icon: Award, color: 'text-purple-600', bg: 'bg-purple-50' },
  { label: 'Success Rate', value: '99', suffix: '%', icon: HeartPulse, color: 'text-red-600', bg: 'bg-red-50' },
];

export default function Stats() {
  return (
    <section className="pb-12 px-6 bg-bg-main">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-wrap lg:flex-nowrap justify-between gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex-1 min-w-[200px] bg-white p-8 rounded-[20px] border border-slate-100 flex flex-col items-center card-shadow"
            >
              <div className="text-3xl font-extrabold text-brand-600 font-display">
                <Counter value={stat.value} suffix={stat.suffix} />
              </div>
              <p className="text-xs uppercase tracking-[1px] text-text-muted mt-1 font-bold">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
