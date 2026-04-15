import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, X, Send, Phone, User, Calendar, Clock, CheckCircle2, ArrowRight, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { db, auth, handleFirestoreError, OperationType } from '@/lib/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

type Language = 'en' | 'hi';

interface Message {
  id: string;
  type: 'bot' | 'user';
  text: string;
  options?: string[];
  inputType?: 'text' | 'phone' | 'date' | 'time' | 'none';
}

const DOCTOR_NAME = "Dr. Rajesh Sharma";
const DOCTOR_EXP = "15+ years";

const translations = {
  en: {
    welcome: "Namaste 🙏 Welcome to Arogya Medicare. How can we help you today?",
    choose_problem: "What problem would you like to consult for?",
    problems: ["General Checkup", "Fever / Cold", "Skin Problem", "Diabetes", "Other"],
    how_long: "How long have you been facing this issue?",
    symptoms: "What are your main symptoms?",
    recommendation: `I recommend consulting ${DOCTOR_NAME}. He has ${DOCTOR_EXP} of experience and specializes in these cases.`,
    ask_name: "To book an appointment, please share your Full Name:",
    ask_phone: "Great! Now please share your Mobile Number:",
    ask_date: "Which day would you like to visit?",
    ask_time: "Please select a preferred time slot:",
    success: "Your appointment request has been submitted! Our team will call you shortly to confirm.",
    whatsapp_redirect: "For direct consultation, you can also connect on WhatsApp.",
    whatsapp_btn: "Chat on WhatsApp",
    limited_slots: "⚠️ Limited slots available today. Book now!",
    doctor_available: "Doctor is available till 8 PM only.",
    typing: "Arogya Bot is typing...",
    placeholder_name: "Enter your name",
    placeholder_phone: "Enter mobile number",
    change_lang: "Aap Hindi me baat karna chahte hain?",
    lang_btn: "Switch to Hindi"
  },
  hi: {
    welcome: "नमस्ते 🙏 आरोग्य मेडिकेयर में आपका स्वागत है। हम आपकी कैसे मदद कर सकते हैं?",
    choose_problem: "आप किस समस्या के लिए परामर्श करना चाहते हैं?",
    problems: ["सामान्य जांच", "बुखार / सर्दी", "त्वचा की समस्या", "मधुमेह", "अन्य"],
    how_long: "आपको यह समस्या कब से है?",
    symptoms: "आपके मुख्य लक्षण क्या हैं?",
    recommendation: `मैं ${DOCTOR_NAME} से परामर्श करने की सलाह देता हूँ। उनके पास ${DOCTOR_EXP} का अनुभव है।`,
    ask_name: "अपॉइंटमेंट बुक करने के लिए, कृपया अपना पूरा नाम साझा करें:",
    ask_phone: "बहुत अच्छा! अब कृपया अपना मोबाइल नंबर साझा करें:",
    ask_date: "आप किस दिन आना चाहेंगे?",
    ask_time: "कृपया पसंदीदा समय चुनें:",
    success: "आपका अपॉइंटमेंट अनुरोध सबमिट हो गया है! हमारी टीम जल्द ही पुष्टि के लिए आपको कॉल करेगी।",
    whatsapp_redirect: "सीधे परामर्श के लिए, आप व्हाट्सएप पर भी जुड़ सकते हैं।",
    whatsapp_btn: "व्हाट्सएप पर चैट करें",
    limited_slots: "⚠️ आज सीमित स्लॉट उपलब्ध हैं। अभी बुक करें!",
    doctor_available: "डॉक्टर केवल रात 8 बजे तक उपलब्ध हैं।",
    typing: "आरोग्य बॉट टाइप कर रहा है...",
    placeholder_name: "अपना नाम दर्ज करें",
    placeholder_phone: "मोबाइल नंबर दर्ज करें",
    change_lang: "Do you want to talk in English?",
    lang_btn: "English में बदलें"
  }
};

const timeSlots = [
  '09:00 AM', '10:00 AM', '11:00 AM', '02:00 PM', '04:00 PM', '06:00 PM'
];

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [lang, setLang] = useState<Language>('en');
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentStep, setCurrentStep] = useState<string>('welcome');
  const [isTyping, setIsTyping] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [leadData, setLeadData] = useState<any>({
    rawDate: null
  });
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const addBotMessage = (text: string, options?: string[], inputType: Message['inputType'] = 'none') => {
    setIsTyping(true);
    setTimeout(() => {
      const newMessage: Message = {
        id: Math.random().toString(36).substr(2, 9),
        type: 'bot',
        text,
        options,
        inputType
      };
      setMessages(prev => [...prev, newMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const addUserMessage = (text: string) => {
    const newMessage: Message = {
      id: Math.random().toString(36).substr(2, 9),
      type: 'user',
      text
    };
    setMessages(prev => [...prev, newMessage]);
  };

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      startChat();
    }
  }, [isOpen]);

  const startChat = () => {
    const t = translations[lang];
    addBotMessage(t.welcome, [t.lang_btn, ...t.problems]);
    setCurrentStep('main_menu');
  };

  const handleOptionClick = (option: string) => {
    const t = translations[lang];
    addUserMessage(option);

    if (option === translations.en.lang_btn || option === translations.hi.lang_btn) {
      const newLang = lang === 'en' ? 'hi' : 'en';
      setLang(newLang);
      setMessages([]);
      // Restart with new lang
      setTimeout(() => {
        const nt = translations[newLang];
        const welcomeMsg = {
          id: 'welcome',
          type: 'bot' as const,
          text: nt.welcome,
          options: [nt.lang_btn, ...nt.problems],
          inputType: 'none' as const
        };
        setMessages([welcomeMsg]);
        setCurrentStep('main_menu');
      }, 500);
      return;
    }

    if (currentStep === 'main_menu') {
      setLeadData({ ...leadData, problem: option });
      addBotMessage(t.how_long, undefined, 'text');
      setCurrentStep('problem_duration');
    } else if (currentStep === 'appointment_date') {
      const dates = [
        new Date(),
        new Date(Date.now() + 86400000),
        new Date(Date.now() + 172800000)
      ];
      const dateStrings = dates.map(d => format(d, 'eee, MMM d'));
      const dateIndex = dateStrings.indexOf(option);
      const selectedDate = dates[dateIndex] || new Date();
      
      setLeadData({ ...leadData, date: option, rawDate: selectedDate });
      addBotMessage(t.ask_time, timeSlots);
      setCurrentStep('appointment_time');
    } else if (currentStep === 'appointment_time') {
      setLeadData({ ...leadData, time: option });
      saveAndFinish({ ...leadData, time: option });
    }
  };

  const handleTextInput = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const val = inputValue.trim();
    addUserMessage(val);
    setInputValue('');
    const t = translations[lang];

    if (currentStep === 'problem_duration') {
      setLeadData({ ...leadData, duration: val });
      addBotMessage(t.symptoms, undefined, 'text');
      setCurrentStep('symptoms');
    } else if (currentStep === 'symptoms') {
      setLeadData({ ...leadData, symptoms: val });
      addBotMessage(t.recommendation);
      setTimeout(() => {
        addBotMessage(t.ask_name, undefined, 'text');
        setCurrentStep('lead_name');
      }, 1500);
    } else if (currentStep === 'lead_name') {
      setLeadData({ ...leadData, name: val });
      addBotMessage(t.ask_phone, undefined, 'phone');
      setCurrentStep('lead_phone');
    } else if (currentStep === 'lead_phone') {
      setLeadData({ ...leadData, phone: val });
      const dates = [
        format(new Date(), 'eee, MMM d'),
        format(new Date(Date.now() + 86400000), 'eee, MMM d'),
        format(new Date(Date.now() + 172800000), 'eee, MMM d')
      ];
      addBotMessage(t.ask_date, dates);
      setCurrentStep('appointment_date');
    }
  };

  const saveAndFinish = async (finalData: any) => {
    const t = translations[lang];
    try {
      await addDoc(collection(db, 'appointments'), {
        patientName: finalData.name,
        patientPhone: finalData.phone,
        problem: `${finalData.problem} (${finalData.symptoms})`,
        date: (finalData.rawDate || new Date()).toISOString(),
        time: finalData.time,
        status: 'pending',
        createdAt: new Date().toISOString(),
        userId: auth.currentUser?.uid || null
      });
      
      addBotMessage(t.success);
      setTimeout(() => {
        addBotMessage(t.whatsapp_redirect);
      }, 1000);
      setCurrentStep('finished');
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, 'appointments');
    }
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-brand rounded-full shadow-2xl flex items-center justify-center text-white z-[60] hover:scale-110 transition-transform"
      >
        {isOpen ? <X className="w-8 h-8" /> : <MessageCircle className="w-8 h-8" />}
        {!isOpen && (
          <span className="absolute -top-2 -right-2 bg-rose-500 text-white text-[10px] font-bold px-2 py-1 rounded-full animate-bounce">
            1
          </span>
        )}
      </button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95, transformOrigin: 'bottom right' }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-4 sm:right-6 w-[calc(100vw-32px)] sm:w-[380px] h-[500px] sm:h-[600px] max-h-[calc(100vh-120px)] bg-white rounded-[24px] sm:rounded-[32px] shadow-2xl z-[60] flex flex-col overflow-hidden border border-slate-100"
          >
            {/* Header */}
            <div className="bg-gradient-brand p-5 sm:p-6 text-white shrink-0">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                    <User className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base sm:text-lg leading-tight">Arogya Assistant</h3>
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-[10px] sm:text-xs text-white/80">Online | 24/7 Available</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button onClick={() => setIsOpen(false)} className="p-1.5 hover:bg-white/10 rounded-full transition-colors">
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <p className="text-[9px] sm:text-[10px] text-white/60 uppercase tracking-widest font-bold">
                {translations[lang].limited_slots}
              </p>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-slate-50/50 scrollbar-hide">
              {messages.map((msg) => (
                <div key={msg.id} className={cn("flex flex-col", msg.type === 'user' ? "items-end" : "items-start")}>
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    className={cn(
                      "max-w-[85%] p-3 sm:p-4 rounded-2xl text-sm leading-relaxed shadow-sm",
                      msg.type === 'user' 
                        ? "bg-brand-600 text-white rounded-tr-none" 
                        : "bg-white text-slate-700 border border-slate-100 rounded-tl-none"
                    )}
                  >
                    {msg.text}
                  </motion.div>
                  
                  {msg.type === 'bot' && msg.options && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {msg.options.map((opt, idx) => (
                        <motion.button
                          key={opt}
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 + (idx * 0.05) }}
                          onClick={() => handleOptionClick(opt)}
                          className="bg-white border border-brand-100 text-brand-600 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-[11px] sm:text-xs font-bold hover:bg-brand-600 hover:text-white transition-all shadow-sm active:scale-95"
                        >
                          {opt}
                        </motion.button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              
              {isTyping && (
                <div className="flex flex-col items-start gap-2">
                  <div className="bg-white p-3 sm:p-4 rounded-2xl rounded-tl-none shadow-sm border border-slate-100">
                    <div className="flex gap-1">
                      <div className="w-1.5 h-1.5 bg-brand-400 rounded-full animate-bounce" />
                      <div className="w-1.5 h-1.5 bg-brand-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                      <div className="w-1.5 h-1.5 bg-brand-400 rounded-full animate-bounce [animation-delay:0.4s]" />
                    </div>
                  </div>
                  <span className="text-[10px] text-slate-400 font-medium ml-1">
                    {translations[lang].typing}
                  </span>
                </div>
              )}
              
              {currentStep === 'finished' && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="pt-4"
                >
                  <Button asChild className="w-full bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl h-12 gap-2">
                    <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer">
                      <Phone className="w-4 h-4" />
                      {translations[lang].whatsapp_btn}
                    </a>
                  </Button>
                </motion.div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-3 sm:p-4 bg-white border-t border-slate-100 shrink-0">
              {['lead_name', 'lead_phone', 'problem_duration', 'symptoms'].includes(currentStep) ? (
                <form onSubmit={handleTextInput} className="flex gap-2">
                  <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder={currentStep === 'lead_phone' ? translations[lang].placeholder_phone : translations[lang].placeholder_name}
                    className="rounded-xl border-slate-200 focus:ring-brand-500 h-10 sm:h-11"
                    type={currentStep === 'lead_phone' ? 'tel' : 'text'}
                    autoFocus
                  />
                  <Button type="submit" size="icon" className="rounded-xl bg-brand-600 shrink-0 h-10 w-10 sm:h-11 sm:w-11">
                    <Send className="w-4 h-4" />
                  </Button>
                </form>
              ) : (
                <div className="text-center py-1 sm:py-2">
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                    {translations[lang].doctor_available}
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
