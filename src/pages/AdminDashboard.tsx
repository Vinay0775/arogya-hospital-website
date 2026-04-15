import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { db, auth, handleFirestoreError, OperationType } from '@/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { 
  collection, 
  query, 
  orderBy, 
  onSnapshot, 
  updateDoc, 
  doc, 
  deleteDoc 
} from 'firebase/firestore';
import { 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Trash2, 
  User, 
  Phone, 
  Mail, 
  Calendar as CalendarIcon,
  Filter,
  Search,
  ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from 'date-fns';

interface Appointment {
  id: string;
  patientName: string;
  patientPhone: string;
  patientEmail?: string;
  date: string;
  time: string;
  problem?: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: string;
  userId?: string;
}

export default function AdminDashboard() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [authLoading, setAuthLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate('/admin-portal');
      } else if (user.email !== 'vinayvishwakarma080@gmail.com') {
        // If logged in but not the admin email, you might want to show an error or redirect
        // For now, let's just let Firestore rules handle the data access restriction
        setAuthLoading(false);
      } else {
        setAuthLoading(false);
      }
    });

    return () => unsubscribeAuth();
  }, [navigate]);

  useEffect(() => {
    if (authLoading) return;

    const q = query(collection(db, 'appointments'), orderBy('createdAt', 'desc'));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Appointment[];
      setAppointments(docs);
      setLoading(false);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'appointments');
    });

    return () => unsubscribe();
  }, []);

  const updateStatus = async (id: string, newStatus: 'confirmed' | 'cancelled') => {
    try {
      await updateDoc(doc(db, 'appointments', id), { status: newStatus });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `appointments/${id}`);
    }
  };

  const deleteAppointment = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this appointment?')) return;
    try {
      await deleteDoc(doc(db, 'appointments', id));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `appointments/${id}`);
    }
  };

  const filteredAppointments = appointments.filter(app => {
    const matchesSearch = app.patientName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         app.patientPhone.includes(searchTerm);
    const matchesStatus = statusFilter === 'all' || app.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <Badge variant="secondary" className="bg-green-100 text-green-700 border-green-200">Confirmed</Badge>;
      case 'cancelled':
        return <Badge variant="destructive" className="bg-red-100 text-red-700 border-red-200">Cancelled</Badge>;
      default:
        return <Badge variant="outline" className="bg-blue-100 text-blue-700 border-blue-200">Pending</Badge>;
    }
  };

  if (authLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-600"></div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-12 px-6 min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900">Admin Dashboard</h1>
            <p className="text-text-muted">Manage your clinic appointments and patient requests.</p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
              <Input 
                placeholder="Search patient..." 
                className="pl-10 bg-white border-slate-200 rounded-xl"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40 bg-white border-slate-200 rounded-xl">
                <SelectValue placeholder="Filter Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="confirmed">Confirmed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-600"></div>
          </div>
        ) : filteredAppointments.length === 0 ? (
          <div className="bg-white rounded-[32px] p-12 text-center card-shadow border border-slate-100">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <CalendarIcon className="w-10 h-10 text-slate-300" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">No appointments found</h3>
            <p className="text-text-muted mt-2">Try adjusting your search or filters.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {filteredAppointments.map((app) => (
              <motion.div
                key={app.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-[24px] p-6 card-shadow border border-slate-100 hover:border-brand-200 transition-colors group"
              >
                <div className="flex flex-col lg:flex-row gap-6">
                  <div className="flex-1 space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-2xl bg-brand-50 flex items-center justify-center text-brand-600">
                          <User className="w-6 h-6" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-slate-900">{app.patientName}</h3>
                          <div className="flex items-center gap-4 mt-1">
                            {getStatusBadge(app.status)}
                            <span className="text-xs text-text-muted flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              Booked {format(new Date(app.createdAt), 'MMM d, h:mm a')}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div className="flex items-center gap-2 text-sm text-text-muted">
                        <Phone className="w-4 h-4 text-brand-500" />
                        {app.patientPhone}
                      </div>
                      {app.patientEmail && (
                        <div className="flex items-center gap-2 text-sm text-text-muted">
                          <Mail className="w-4 h-4 text-brand-500" />
                          {app.patientEmail}
                        </div>
                      )}
                      <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
                        <CalendarIcon className="w-4 h-4 text-brand-500" />
                        {format(new Date(app.date), 'EEEE, MMM d')}
                      </div>
                      <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
                        <Clock className="w-4 h-4 text-brand-500" />
                        {app.time}
                      </div>
                    </div>

                    {app.problem && (
                      <div className="bg-slate-50 rounded-xl p-4 text-sm text-slate-600 border border-slate-100">
                        <span className="font-bold text-slate-900 block mb-1">Health Concern:</span>
                        {app.problem}
                      </div>
                    )}
                  </div>

                  <div className="flex lg:flex-col items-center justify-center gap-3 lg:border-l lg:pl-6 border-slate-100">
                    {app.status === 'pending' && (
                      <>
                        <Button 
                          onClick={() => updateStatus(app.id, 'confirmed')}
                          className="w-full rounded-xl bg-green-600 hover:bg-green-700 text-white gap-2"
                        >
                          <CheckCircle2 className="w-4 h-4" />
                          Confirm
                        </Button>
                        <Button 
                          variant="outline"
                          onClick={() => updateStatus(app.id, 'cancelled')}
                          className="w-full rounded-xl border-red-200 text-red-600 hover:bg-red-50 gap-2"
                        >
                          <XCircle className="w-4 h-4" />
                          Cancel
                        </Button>
                      </>
                    )}
                    {app.status === 'confirmed' && (
                      <Button 
                        variant="outline"
                        onClick={() => updateStatus(app.id, 'cancelled')}
                        className="w-full rounded-xl border-red-200 text-red-600 hover:bg-red-50 gap-2"
                      >
                        <XCircle className="w-4 h-4" />
                        Cancel Appointment
                      </Button>
                    )}
                    {app.status === 'cancelled' && (
                      <Button 
                        variant="outline"
                        onClick={() => updateStatus(app.id, 'confirmed')}
                        className="w-full rounded-xl border-green-200 text-green-600 hover:bg-green-50 gap-2"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        Re-confirm
                      </Button>
                    )}
                    <Button 
                      variant="ghost"
                      size="icon"
                      onClick={() => deleteAppointment(app.id)}
                      className="rounded-xl text-slate-400 hover:text-red-600 hover:bg-red-50"
                    >
                      <Trash2 className="w-5 h-5" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
