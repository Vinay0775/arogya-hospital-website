import { motion } from 'motion/react';
import { Image as ImageIcon, Maximize2 } from 'lucide-react';

const images = [
  {
    url: 'https://images.unsplash.com/photo-1629909608135-ca29e0c1e2b6?auto=format&fit=crop&q=80&w=800',
    title: 'Modern Consultation Room',
  },
  {
    url: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800',
    title: 'Patient Waiting Area',
  },
  {
    url: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=800',
    title: 'Advanced Medical Equipment',
  },
  {
    url: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=800',
    title: 'Diagnostic Lab',
  },
  {
    url: 'https://images.unsplash.com/photo-1581594658553-359424894318?auto=format&fit=crop&q=80&w=800',
    title: 'Friendly Staff',
  },
  {
    url: 'https://images.unsplash.com/photo-1504813184591-01572f98c85f?auto=format&fit=crop&q=80&w=800',
    title: 'Clinic Exterior',
  },
];

export default function Gallery() {
  return (
    <section className="py-24 px-6 bg-bg-main">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16">
          <div className="max-w-2xl space-y-4">
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900">
              A Glimpse Into <br />
              <span className="text-gradient">Our Premium Clinic</span>
            </h2>
            <p className="text-lg text-text-muted">
              Take a virtual tour of our state-of-the-art facility designed for your comfort and care.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((image, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="group relative aspect-square rounded-[32px] overflow-hidden card-shadow"
            >
              <img
                src={image.url}
                alt={image.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-linear-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-8">
                <p className="text-white font-bold text-xl mb-2">{image.title}</p>
                <div className="flex items-center gap-2 text-accent-400 text-sm font-bold">
                  <Maximize2 className="w-4 h-4" />
                  <span>View Larger</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
