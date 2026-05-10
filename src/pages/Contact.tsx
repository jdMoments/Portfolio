import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, MessageSquare, Send } from 'lucide-react';
import SoftAurora from '../components/SoftAurora';

export const Contact: React.FC = () => {
  const [formState, setFormState] = React.useState({
    name: '',
    email: '',
    message: ''
  });

  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const [errors, setErrors] = React.useState<{ [key: string]: string }>({});

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formState.name.trim()) newErrors.name = 'Name is required';
    if (!formState.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email)) {
      newErrors.email = 'Invalid email address';
    }
    if (!formState.message.trim()) newErrors.message = 'Message is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    // In a real app, you'd send this to a backend
    console.log('Form submitted:', formState);
    setIsSubmitted(true);
    setFormState({ name: '', email: '', message: '' });
    setErrors({});
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  return (
    <section className="relative overflow-hidden bg-[#040412] py-24 transition-colors duration-300">
      <div className="absolute inset-0 z-0">
        <SoftAurora
          speed={0.6}
          scale={1.5}
          brightness={1}
          color1="#f7f7f7"
          color2="#e100ff"
          noiseFrequency={2.5}
          noiseAmplitude={1}
          bandHeight={0.5}
          bandSpread={1}
          octaveDecay={0.1}
          layerOffset={0}
          colorSpeed={1}
          enableMouseInteraction={true}
          mouseInfluence={0.25}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.1),transparent_24%),linear-gradient(180deg,rgba(4,4,18,0.3),rgba(4,4,18,0.86)_42%,rgba(4,4,18,0.96))]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="mb-16 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="mb-4 text-4xl font-bold tracking-tight text-white">Get In Touch</h2>
              <p className="text-lg text-slate-300/82">
                Have a project in mind or just want to say hi? Feel free to reach out!
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="space-y-6 md:col-span-1">
              <div className="rounded-2xl border border-white/12 bg-white/8 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.24)] backdrop-blur-xl">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-white/12 bg-white/10">
                  <Mail className="h-6 w-6 text-white" />
                </div>
                <h4 className="mb-1 font-bold text-white">Email</h4>
                <p className="text-sm text-slate-300/78">hello@example.com</p>
              </div>
              
              <div className="rounded-2xl border border-white/12 bg-white/8 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.24)] backdrop-blur-xl">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-white/12 bg-white/10">
                  <MessageSquare className="h-6 w-6 text-white" />
                </div>
                <h4 className="mb-1 font-bold text-white">Social</h4>
                <p className="text-sm text-slate-300/78">@devportfolio</p>
              </div>
            </div>

            <div className="md:col-span-2 relative">
              <AnimatePresence>
                {isSubmitted && (
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="absolute -top-12 left-0 right-0 z-10 flex justify-center"
                  >
                    <div className="flex items-center space-x-2 rounded-full border border-emerald-400/30 bg-emerald-400/12 px-6 py-3 text-emerald-100 shadow-lg backdrop-blur-md">
                      <Send className="h-4 w-4" />
                      <span className="font-bold text-sm">Message Sent Successfully!</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <form
                onSubmit={handleSubmit}
                className="space-y-6 rounded-3xl border border-white/12 bg-white/8 p-8 shadow-[0_20px_70px_rgba(0,0,0,0.28)] backdrop-blur-xl"
              >
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-bold uppercase tracking-widest text-slate-300/70">Name</label>
                    <input
                      type="text"
                      id="name"
                      value={formState.name}
                      onChange={(e) => {
                        setFormState({ ...formState, name: e.target.value });
                        if (errors.name) setErrors({ ...errors, name: '' });
                      }}
                      className={`w-full rounded-xl border px-4 py-3 text-white transition-all placeholder:text-slate-400/70 focus:outline-none focus:ring-2 focus:ring-fuchsia-300/25 ${
                        errors.name
                          ? 'border-red-400 bg-red-950/20'
                          : 'border-white/10 bg-slate-950/45 focus:border-fuchsia-300/70'
                      }`}
                      placeholder="Your Name"
                    />
                    {errors.name && <p className="text-xs text-red-500 font-medium">{errors.name}</p>}
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-bold uppercase tracking-widest text-slate-300/70">Email</label>
                    <input
                      type="email"
                      id="email"
                      value={formState.email}
                      onChange={(e) => {
                        setFormState({ ...formState, email: e.target.value });
                        if (errors.email) setErrors({ ...errors, email: '' });
                      }}
                      className={`w-full rounded-xl border px-4 py-3 text-white transition-all placeholder:text-slate-400/70 focus:outline-none focus:ring-2 focus:ring-fuchsia-300/25 ${
                        errors.email
                          ? 'border-red-400 bg-red-950/20'
                          : 'border-white/10 bg-slate-950/45 focus:border-fuchsia-300/70'
                      }`}
                      placeholder="your@email.com"
                    />
                    {errors.email && <p className="text-xs text-red-500 font-medium">{errors.email}</p>}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-bold uppercase tracking-widest text-slate-300/70">Message</label>
                  <textarea
                    id="message"
                    rows={5}
                    value={formState.message}
                    onChange={(e) => {
                      setFormState({ ...formState, message: e.target.value });
                      if (errors.message) setErrors({ ...errors, message: '' });
                    }}
                    className={`w-full resize-none rounded-xl border px-4 py-3 text-white transition-all placeholder:text-slate-400/70 focus:outline-none focus:ring-2 focus:ring-fuchsia-300/25 ${
                      errors.message
                        ? 'border-red-400 bg-red-950/20'
                        : 'border-white/10 bg-slate-950/45 focus:border-fuchsia-300/70'
                    }`}
                    placeholder="Tell me about your project..."
                  />
                  {errors.message && <p className="text-xs text-red-500 font-medium">{errors.message}</p>}
                </div>

                <button
                  type="submit"
                  className="group flex w-full items-center justify-center rounded-xl bg-white py-4 font-bold text-black transition-all hover:bg-fuchsia-100"
                >
                  Send Message
                  <Send className="ml-2 h-5 w-5 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
