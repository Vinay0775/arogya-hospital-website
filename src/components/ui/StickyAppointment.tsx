import { Link } from 'react-router-dom';
import { Calendar } from 'lucide-react';
import { motion, useScroll, useTransform } from 'motion/react';

export default function StickyAppointment() {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [100, 300], [0, 1]);
  const y = useTransform(scrollY, [100, 300], [100, 0]);

  return (
    <motion.div
      style={{ opacity, y }}
      className="fixed bottom-6 left-6 right-6 z-40 md:hidden"
    >
      <Link
        to="/appointment"
        className="flex items-center justify-center gap-2 w-full bg-gradient-brand text-white py-4 rounded-2xl font-bold shadow-2xl hover:opacity-90 transition-opacity"
      >
        <Calendar className="w-5 h-5" />
        <span>Book Appointment Now</span>
      </Link>
    </motion.div>
  );
}
