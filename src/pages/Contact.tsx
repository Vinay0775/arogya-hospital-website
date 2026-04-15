import { motion } from 'motion/react';
import { MapPin, Phone, Mail, Clock, MessageSquare, Send, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export default function Contact() {
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
            <span>Contact Us</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-6xl font-extrabold text-slate-900"
          >
            Get in Touch with <br />
            <span className="text-gradient">Our Medical Team</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-text-muted max-w-3xl mx-auto leading-relaxed"
          >
            Have questions or need assistance? We're here to help. Reach out to us through any of the channels below.
          </motion.p>
        </div>
      </section>

      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <div className="space-y-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {[
                { icon: MapPin, title: 'Our Location', content: 'Plot No. 45, Sector 18, Gurgaon, Haryana 122015', color: 'text-brand-600', bg: 'bg-brand-50' },
                { icon: Phone, title: 'Phone Number', content: '+91 98765 43210', color: 'text-accent-600', bg: 'bg-accent-50' },
                { icon: Mail, title: 'Email Address', content: 'contact@arogyamedicare.in', color: 'text-purple-600', bg: 'bg-purple-50' },
                { icon: Clock, title: 'Working Hours', content: 'Mon - Sat: 9am - 6pm', color: 'text-rose-600', bg: 'bg-rose-50' },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="p-8 rounded-[32px] bg-slate-50 space-y-4 card-shadow border border-white"
                >
                  <div className={`w-12 h-12 rounded-xl ${item.bg} flex items-center justify-center ${item.color}`}>
                    <item.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">{item.title}</h4>
                    <p className="text-sm text-text-muted leading-relaxed">{item.content}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="h-[400px] rounded-[32px] overflow-hidden card-shadow border-8 border-slate-50">
              <iframe
                title="Clinic Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3506.2233913120413!2d77.087842!3d28.472719!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d19219327557d%3A0x990496c211d4607d!2sSector%2018%2C%20Gurugram%2C%20Haryana!5e0!3m2!1sen!2s!4v1633023222539!5m2!1sen!2s"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
              />
            </div>
          </div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-slate-900 p-8 md:p-12 rounded-[32px] text-white card-shadow relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-brand-600/20 blur-3xl rounded-full -mr-20 -mt-20" />
            
            <div className="relative z-10 space-y-8">
              <div className="space-y-4">
                <h3 className="text-3xl font-extrabold">Send us a Message</h3>
                <p className="text-slate-400">
                  Fill out the form below and we'll get back to you as soon as possible.
                </p>
              </div>

              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-300 ml-1">Full Name</label>
                    <Input className="bg-white/5 border-white/10 h-14 rounded-xl text-white placeholder:text-slate-500 focus:border-brand-500 focus:ring-brand-500" placeholder="e.g. Rajesh Kumar" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-300 ml-1">Mobile Number</label>
                    <Input className="bg-white/5 border-white/10 h-14 rounded-xl text-white placeholder:text-slate-500 focus:border-brand-500 focus:ring-brand-500" placeholder="+91 98765 43210" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-300 ml-1">Email Address</label>
                  <Input className="bg-white/5 border-white/10 h-14 rounded-xl text-white placeholder:text-slate-500 focus:border-brand-500 focus:ring-brand-500" placeholder="john@example.com" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-300 ml-1">Subject</label>
                  <Input className="bg-white/5 border-white/10 h-14 rounded-xl text-white placeholder:text-slate-500 focus:border-brand-500 focus:ring-brand-500" placeholder="General Inquiry" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-300 ml-1">Message</label>
                  <Textarea className="bg-white/5 border-white/10 min-h-[150px] rounded-xl text-white placeholder:text-slate-500 focus:border-brand-500 focus:ring-brand-500 pt-4" placeholder="How can we help you?" />
                </div>

                <Button className="w-full h-14 rounded-xl bg-gradient-brand text-lg font-bold btn-shadow border-none">
                  <span className="flex items-center gap-2">
                    <Send className="w-5 h-5" />
                    <span>Send Message</span>
                  </span>
                </Button>
              </form>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
