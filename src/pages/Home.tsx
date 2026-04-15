import Hero from '@/components/home/Hero';
import Stats from '@/components/home/Stats';
import ServicesPreview from '@/components/home/ServicesPreview';
import DoctorHighlight from '@/components/home/DoctorHighlight';
import Testimonials from '@/components/home/Testimonials';
import Gallery from '@/components/home/Gallery';
import { motion } from 'motion/react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className="overflow-hidden">
      <Hero />
      <Stats />
      <ServicesPreview />
      <DoctorHighlight />
      <Testimonials />
      <Gallery />
      
      {/* Location & Map Section */}
      <section className="py-24 px-6 bg-bg-main">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <h4 className="text-brand-600 font-bold uppercase tracking-widest text-sm">Find Us</h4>
              <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900">
                Visit Our Clinic <br />
                <span className="text-gradient">In Health City</span>
              </h2>
              <p className="text-lg text-text-muted">
                We are conveniently located in the heart of the city, easily accessible by public transport and with ample parking space.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="w-10 h-10 shrink-0 rounded-xl bg-brand-50 flex items-center justify-center text-brand-600">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="font-bold text-slate-900">Address</h5>
                    <p className="text-sm text-text-muted">Plot No. 45, Sector 18, Gurgaon, Haryana 122015</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 shrink-0 rounded-xl bg-brand-50 flex items-center justify-center text-brand-600">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="font-bold text-slate-900">Phone</h5>
                    <p className="text-sm text-text-muted">+91 98765 43210</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="w-10 h-10 shrink-0 rounded-xl bg-brand-50 flex items-center justify-center text-brand-600">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="font-bold text-slate-900">Email</h5>
                    <p className="text-sm text-text-muted">contact@arogyamedicare.in</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 shrink-0 rounded-xl bg-brand-50 flex items-center justify-center text-brand-600">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="font-bold text-slate-900">Hours</h5>
                    <p className="text-sm text-text-muted">Mon - Sat: 9am - 6pm</p>
                  </div>
                </div>
              </div>
            </div>

            <Button size="lg" className="rounded-full bg-slate-900 text-white px-8 h-14 shadow-xl hover:bg-slate-800 border-none">
              Get Directions on Google Maps
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="h-[400px] md:h-[500px] rounded-[32px] overflow-hidden card-shadow border-8 border-white"
          >
            <iframe
              title="Clinic Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.8354345093747!2d-122.41941548468212!3d37.77492957975948!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085809c6c8f4459%3A0xb10ed6d9b5050fa5!2sSan%20Francisco%2C%20CA!5e0!3m2!1sen!2s!4v1633023222539!5m2!1sen!2s"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
            />
          </motion.div>
        </div>
      </section>
    </div>
  );
}
