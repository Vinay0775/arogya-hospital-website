import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Calendar as CalendarIcon, Clock, User, Phone, Mail, MessageSquare, CheckCircle2, Filter, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { db, auth, handleFirestoreError, OperationType } from '@/lib/firebase';
import { collection, addDoc, query, where, orderBy, onSnapshot } from 'firebase/firestore';
import { Badge } from '@/components/ui/badge';

const timeSlots = [
  '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
  '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM',
];

interface AppointmentData {
  id: string;
  patientName: string;
  patientPhone: string;
  patientEmail: string;
  date: string;
  time: string;
  problem: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: string;
}

export default function Appointment() {
  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    problem: '',
  });

  const [appointments, setAppointments] = useState<AppointmentData[]>([]);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [isAuthReady, setIsAuthReady] = useState(false);

  useEffect(() => {
    const unsubscribeAuth = auth.onAuthStateChanged((user) => {
      setIsAuthReady(true);
      if (user) {
        const q = query(
          collection(db, 'appointments'),
          where('userId', '==', user.uid),
          orderBy('createdAt', 'desc')
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
          const docs = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          })) as AppointmentData[];
          setAppointments(docs);
        }, (error) => {
          handleFirestoreError(error, OperationType.LIST, 'appointments');
        });

        return () => unsubscribe();
      } else {
        setAppointments([]);
      }
    });

    return () => unsubscribeAuth();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!date || !time) {
      alert('Please select a date and time.');
      return;
    }

    setIsLoading(true);
    try {
      const appointmentData = {
        patientName: formData.name,
        patientPhone: formData.phone,
        patientEmail: formData.email,
        date: date.toISOString(),
        time: time,
        problem: formData.problem,
        status: 'pending',
        createdAt: new Date().toISOString(),
        userId: auth.currentUser?.uid || null,
      };

      const path = 'appointments';
      await addDoc(collection(db, path), appointmentData);
      setIsSubmitted(true);
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, 'appointments');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen pt-32 pb-20 px-6 flex items-center justify-center bg-slate-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full glass p-12 rounded-[3rem] text-center space-y-6 shadow-2xl"
        >
          <div className="w-20 h-20 bg-accent-100 text-accent-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-12 h-12" />
          </div>
          <h2 className="text-3xl font-bold text-slate-900 font-display">Appointment Requested!</h2>
          <p className="text-slate-600">
            Thank you for choosing Arogya Medicare. We have received your request and will contact you shortly to confirm your time slot.
          </p>
          <Button asChild className="w-full rounded-xl bg-gradient-brand h-12">
            <a href="/">Return Home</a>
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 bg-bg-main">
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-12">
        {/* Info Column */}
        <div className="lg:col-span-2 space-y-8">
          <div className="space-y-4">
            <h4 className="text-brand-600 font-bold uppercase tracking-widest text-sm">Booking</h4>
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight">
              Book Your <br />
              <span className="text-gradient">Consultation</span>
            </h1>
            <p className="text-lg text-text-muted">
              Take the first step towards better health. Fill out the form and our team will get back to you within 2 hours.
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex gap-4 p-6 glass rounded-2xl border border-white/30">
              <div className="w-12 h-12 shrink-0 rounded-xl bg-brand-50 flex items-center justify-center text-brand-600">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <h5 className="font-bold text-slate-900">Working Hours</h5>
                <p className="text-sm text-text-muted">Mon - Sat: 9:00 AM - 6:00 PM</p>
                <p className="text-sm text-text-muted">Sunday: Emergency Only</p>
              </div>
            </div>
              <div className="flex gap-4 p-6 glass rounded-2xl border border-white/30">
                <div className="w-12 h-12 shrink-0 rounded-xl bg-accent-50 flex items-center justify-center text-accent-600">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h5 className="font-bold text-slate-900">Direct Contact</h5>
                  <p className="text-sm text-text-muted">Call: +91 98765 43210</p>
                  <p className="text-sm text-text-muted">WhatsApp: +91 98765 43210</p>
                </div>
              </div>
          </div>
        </div>

        {/* Form Column */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-3 bg-white p-8 md:p-12 rounded-[32px] card-shadow border border-slate-100"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">Patient's Full Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <Input 
                    required 
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="e.g. Rajesh Kumar" 
                    className="pl-12 h-14 rounded-xl border-slate-200 focus:ring-brand-500" 
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">Mobile Number</label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <Input 
                    required 
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    type="tel" 
                    placeholder="+91 98765 43210" 
                    className="pl-12 h-14 rounded-xl border-slate-200" 
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 ml-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <Input 
                  required 
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  type="email" 
                  placeholder="rajesh@example.com" 
                  className="pl-12 h-14 rounded-xl border-slate-200" 
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">Preferred Date</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        'w-full h-14 justify-start text-left font-normal rounded-xl border-slate-200',
                        !date && 'text-slate-400'
                      )}
                    >
                      <CalendarIcon className="mr-2 h-5 w-5 text-slate-400" />
                      {date ? format(date, 'PPP') : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 rounded-2xl shadow-2xl border-none" align="start">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      disabled={(date) => date < new Date() || date.getDay() === 0}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">Preferred Time</label>
                <Select onValueChange={setTime} value={time}>
                  <SelectTrigger className="h-14 rounded-xl border-slate-200">
                    <div className="flex items-center gap-2">
                      <Clock className="w-5 h-5 text-slate-400" />
                      <SelectValue placeholder="Select time" />
                    </div>
                  </SelectTrigger>
                  <SelectContent className="rounded-xl shadow-xl border-none">
                    {timeSlots.map((slot) => (
                      <SelectItem key={slot} value={slot}>{slot}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 ml-1">Health Concern / Symptoms</label>
              <div className="relative">
                <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-slate-400" />
                <Textarea
                  name="problem"
                  value={formData.problem}
                  onChange={handleInputChange}
                  placeholder="Briefly describe your health concern..."
                  className="pl-12 min-h-[120px] rounded-xl border-slate-200 pt-4"
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-14 rounded-xl bg-gradient-brand text-lg font-bold btn-shadow border-none"
            >
              {isLoading ? 'Processing...' : 'Confirm Appointment'}
            </Button>
            
            <p className="text-center text-xs text-text-muted">
              By clicking confirm, you agree to our privacy policy and terms of service.
            </p>
          </form>
        </motion.div>
      </div>

      {/* Appointments List Section */}
      {auth.currentUser && (
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-24 space-y-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="space-y-2">
              <h2 className="text-3xl font-extrabold text-slate-900">My Appointments</h2>
              <p className="text-text-muted">Track and manage your medical consultations.</p>
            </div>
            
            <div className="flex items-center gap-4 bg-white p-2 rounded-2xl card-shadow border border-slate-100">
              <Filter className="w-5 h-5 text-slate-400 ml-2" />
              <Select onValueChange={setFilterStatus} value={filterStatus}>
                <SelectTrigger className="w-[180px] border-none focus:ring-0">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent className="rounded-xl shadow-xl border-none">
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="confirmed">Confirmed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {appointments.filter(app => filterStatus === 'all' ? true : app.status === filterStatus).length > 0 ? (
              appointments.filter(app => filterStatus === 'all' ? true : app.status === filterStatus).map((app) => (
                <motion.div
                  key={app.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white p-6 rounded-[24px] border border-slate-100 card-shadow space-y-4"
                >
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <p className="text-xs font-bold text-text-muted uppercase tracking-wider">
                        {format(new Date(app.date), 'PPP')}
                      </p>
                      <h3 className="text-lg font-bold text-slate-900">{app.time}</h3>
                    </div>
                    <Badge className={cn(
                      "rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider",
                      app.status === 'pending' && "bg-amber-50 text-amber-600 border-amber-100",
                      app.status === 'confirmed' && "bg-emerald-50 text-emerald-600 border-emerald-100",
                      app.status === 'cancelled' && "bg-rose-50 text-rose-600 border-rose-100"
                    )}>
                      {app.status}
                    </Badge>
                  </div>
                  
                  <div className="pt-4 border-t border-slate-50 space-y-3">
                    <div className="flex items-center gap-3 text-sm text-text-muted">
                      <User className="w-4 h-4 text-brand-600" />
                      <span>{app.patientName}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-text-muted">
                      <MessageSquare className="w-4 h-4 text-brand-600" />
                      <span className="line-clamp-1">{app.problem}</span>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full py-20 text-center space-y-4 bg-slate-50 rounded-[32px] border-2 border-dashed border-slate-200">
                <Search className="w-12 h-12 text-slate-300 mx-auto" />
                <p className="text-text-muted font-medium">No appointments found for the selected filter.</p>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
}
