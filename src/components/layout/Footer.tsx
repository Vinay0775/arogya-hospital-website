import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-100 pt-20 pb-10 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        <div className="space-y-6">
          <Link to="/" className="text-2xl font-extrabold tracking-tighter text-gradient">
            AROGYA MEDICARE
          </Link>
          <p className="text-text-muted leading-relaxed">
            Providing world-class medical care with a personal touch. Our clinic is equipped with modern technology to ensure the best treatment for our patients.
          </p>
          <div className="flex items-center gap-4">
            {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-brand-600 hover:text-white transition-all"
              >
                <Icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-slate-900 font-bold mb-6">Quick Links</h4>
          <ul className="space-y-4 text-text-muted">
            {['Home', 'About Us', 'Services', 'Blog', 'Contact'].map((item) => (
              <li key={item}>
                <Link to={item === 'Home' ? '/' : `/${item.toLowerCase().replace(' ', '-')}`} className="hover:text-brand-600 transition-colors">
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-slate-900 font-bold mb-6">Our Services</h4>
          <ul className="space-y-4 text-text-muted">
            {['General Checkup', 'Diabetes Care', 'Skin Treatment', 'Child Care', 'Health Screening'].map((item) => (
              <li key={item}>
                <Link to="/services" className="hover:text-brand-600 transition-colors">
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-slate-900 font-bold mb-6">Contact Info</h4>
          <ul className="space-y-4 text-text-muted">
            <li className="flex gap-3">
              <MapPin className="w-5 h-5 text-brand-600 shrink-0" />
              <span>Plot No. 45, Sector 18, Gurgaon, Haryana 122015</span>
            </li>
            <li className="flex gap-3">
              <Phone className="w-5 h-5 text-brand-600 shrink-0" />
              <span>+91 98765 43210</span>
            </li>
            <li className="flex gap-3">
              <Mail className="w-5 h-5 text-brand-600 shrink-0" />
              <span>contact@arogyamedicare.in</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-text-muted">
        <p>© {new Date().getFullYear()} AROGYA MEDICARE. All rights reserved.</p>
        <div className="flex gap-8">
          <a href="#" className="hover:text-brand-600 transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-brand-600 transition-colors">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}
