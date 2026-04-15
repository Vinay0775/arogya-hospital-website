import { useState, useEffect } from 'react';
import { auth } from '@/lib/firebase';
import { GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';
import { motion } from 'motion/react';
import { LogIn, LogOut, ShieldCheck, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(auth.currentUser);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser && currentUser.email === 'vinayvishwakarma080@gmail.com') {
        navigate('/admin');
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  const handleGoogleLogin = async () => {
    setLoading(true);
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      if (result.user.email === 'vinayvishwakarma080@gmail.com') {
        navigate('/admin');
      }
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 flex items-center justify-center bg-slate-50 px-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white rounded-[32px] p-8 md:p-12 card-shadow border border-slate-100 text-center space-y-8"
      >
        <div className="w-20 h-20 bg-brand-50 rounded-2xl flex items-center justify-center mx-auto text-brand-600">
          <ShieldCheck className="w-10 h-10" />
        </div>
        
        <div className="space-y-2">
          <h1 className="text-3xl font-extrabold text-slate-900">Admin Access</h1>
          <p className="text-text-muted">Please sign in with your authorized Google account to access the dashboard.</p>
        </div>

        <div className="space-y-4">
          {user ? (
            <div className="space-y-4">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center gap-4">
                <img 
                  src={user.photoURL || ''} 
                  alt="Profile" 
                  className="w-12 h-12 rounded-full border-2 border-white shadow-sm"
                  referrerPolicy="no-referrer"
                />
                <div className="text-left">
                  <p className="font-bold text-slate-900">{user.displayName}</p>
                  <p className="text-xs text-text-muted">{user.email}</p>
                </div>
              </div>
              {user.email === 'vinayvishwakarma080@gmail.com' ? (
                <Button 
                  onClick={() => navigate('/admin')}
                  className="w-full rounded-xl bg-brand-600 hover:bg-brand-700 h-12 gap-2"
                >
                  Go to Dashboard
                  <ArrowRight className="w-4 h-4" />
                </Button>
              ) : (
                <div className="p-3 bg-red-50 text-red-600 text-sm rounded-xl border border-red-100">
                  This account is not authorized for admin access.
                </div>
              )}
              <Button 
                variant="ghost"
                onClick={() => signOut(auth)}
                className="w-full rounded-xl text-red-600 hover:bg-red-50 h-12 gap-2"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </Button>
            </div>
          ) : (
            <Button 
              onClick={handleGoogleLogin}
              disabled={loading}
              className="w-full rounded-xl bg-slate-900 hover:bg-slate-800 h-14 text-lg font-bold gap-3 shadow-xl border-none"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                <>
                  <LogIn className="w-5 h-5" />
                  Sign in with Google
                </>
              )}
            </Button>
          )}
        </div>

        <p className="text-xs text-text-muted">
          Only authorized administrators can view and manage appointment data.
        </p>
      </motion.div>
    </div>
  );
}
