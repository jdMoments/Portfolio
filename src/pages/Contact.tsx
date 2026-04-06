import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, MessageSquare, Send } from 'lucide-react';

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
    <section className="py-24 bg-white dark:bg-neutral-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white mb-4">Get In Touch</h2>
              <p className="text-lg text-gray-500 dark:text-neutral-400">
                Have a project in mind or just want to say hi? Feel free to reach out!
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-1 space-y-6">
              <div className="p-6 bg-white dark:bg-neutral-900 rounded-2xl border border-gray-100 dark:border-neutral-800 shadow-sm">
                <div className="w-12 h-12 bg-gray-50 dark:bg-neutral-800 rounded-xl flex items-center justify-center mb-4">
                  <Mail className="w-6 h-6 text-black dark:text-white" />
                </div>
                <h4 className="font-bold text-gray-900 dark:text-white mb-1">Email</h4>
                <p className="text-sm text-gray-500 dark:text-neutral-400">hello@example.com</p>
              </div>
              
              <div className="p-6 bg-white dark:bg-neutral-900 rounded-2xl border border-gray-100 dark:border-neutral-800 shadow-sm">
                <div className="w-12 h-12 bg-gray-50 dark:bg-neutral-800 rounded-xl flex items-center justify-center mb-4">
                  <MessageSquare className="w-6 h-6 text-black dark:text-white" />
                </div>
                <h4 className="font-bold text-gray-900 dark:text-white mb-1">Social</h4>
                <p className="text-sm text-gray-500 dark:text-neutral-400">@devportfolio</p>
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
                    <div className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-6 py-3 rounded-full border border-green-200 dark:border-green-800 shadow-lg flex items-center space-x-2">
                      <Send className="w-4 h-4" />
                      <span className="font-bold text-sm">Message Sent Successfully!</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <form onSubmit={handleSubmit} className="bg-white dark:bg-neutral-900 p-8 rounded-3xl border border-gray-100 dark:border-neutral-800 shadow-sm space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-bold uppercase tracking-widest text-gray-400 dark:text-neutral-500">Name</label>
                    <input
                      type="text"
                      id="name"
                      value={formState.name}
                      onChange={(e) => {
                        setFormState({ ...formState, name: e.target.value });
                        if (errors.name) setErrors({ ...errors, name: '' });
                      }}
                      className={`w-full px-4 py-3 bg-gray-50 dark:bg-neutral-800 border ${errors.name ? 'border-red-500' : 'border-gray-100 dark:border-neutral-700'} rounded-xl focus:outline-none focus:ring-2 focus:ring-black/5 dark:focus:ring-white/5 focus:border-black dark:focus:border-white text-gray-900 dark:text-white transition-all`}
                      placeholder="Your Name"
                    />
                    {errors.name && <p className="text-xs text-red-500 font-medium">{errors.name}</p>}
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-bold uppercase tracking-widest text-gray-400 dark:text-neutral-500">Email</label>
                    <input
                      type="email"
                      id="email"
                      value={formState.email}
                      onChange={(e) => {
                        setFormState({ ...formState, email: e.target.value });
                        if (errors.email) setErrors({ ...errors, email: '' });
                      }}
                      className={`w-full px-4 py-3 bg-gray-50 dark:bg-neutral-800 border ${errors.email ? 'border-red-500' : 'border-gray-100 dark:border-neutral-700'} rounded-xl focus:outline-none focus:ring-2 focus:ring-black/5 dark:focus:ring-white/5 focus:border-black dark:focus:border-white text-gray-900 dark:text-white transition-all`}
                      placeholder="your@email.com"
                    />
                    {errors.email && <p className="text-xs text-red-500 font-medium">{errors.email}</p>}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-bold uppercase tracking-widest text-gray-400 dark:text-neutral-500">Message</label>
                  <textarea
                    id="message"
                    rows={5}
                    value={formState.message}
                    onChange={(e) => {
                      setFormState({ ...formState, message: e.target.value });
                      if (errors.message) setErrors({ ...errors, message: '' });
                    }}
                    className={`w-full px-4 py-3 bg-gray-50 dark:bg-neutral-800 border ${errors.message ? 'border-red-500' : 'border-gray-100 dark:border-neutral-700'} rounded-xl focus:outline-none focus:ring-2 focus:ring-black/5 dark:focus:ring-white/5 focus:border-black dark:focus:border-white text-gray-900 dark:text-white transition-all resize-none`}
                    placeholder="Tell me about your project..."
                  />
                  {errors.message && <p className="text-xs text-red-500 font-medium">{errors.message}</p>}
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-black dark:bg-white text-white dark:text-black rounded-xl font-bold hover:bg-gray-800 dark:hover:bg-neutral-200 transition-all flex items-center justify-center group"
                >
                  Send Message
                  <Send className="ml-2 w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
