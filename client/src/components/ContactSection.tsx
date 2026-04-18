import { motion } from 'framer-motion';
import { Mail, Linkedin, Github } from 'lucide-react';
import { useState } from 'react';

/**
 * Contact Section Component
 * Modern contact form with social links and glassmorphism design
 * Design: Clean form with micro-interactions
 */
export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setFormData({ name: '', email: '', message: '' });
      setSubmitted(false);
    }, 3000);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const socialLinks = [
    { icon: Mail, href: 'mailto:hello@example.com', label: 'Email' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Github, href: '#', label: 'GitHub' },
  ];

  return (
    <section id="contact" className="relative py-24 bg-slate-900">
      <div className="container mx-auto px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="max-w-2xl mx-auto"
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="mb-12 text-center">
            <h2 className="text-4xl md:text-5xl font-poppins font-bold mb-4">
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Vamos Conversar
              </span>
            </h2>
            <p className="text-slate-400 font-outfit text-lg">
              Tenho interesse em oportunidades freelance e projetos desafiadores.
              Entre em contato comigo!
            </p>
          </motion.div>

          {/* Contact Form */}
          <motion.form
            variants={itemVariants}
            onSubmit={handleSubmit}
            className="glass-dark p-8 rounded-xl space-y-6 mb-12"
          >
            {/* Name Input */}
            <div>
              <label className="block text-sm font-outfit font-semibold text-slate-300 mb-2">
                Nome
              </label>
              <motion.input
                whileFocus={{ scale: 1.02 }}
                type="text"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-lg text-white font-outfit placeholder-slate-500 focus:outline-none focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300"
                placeholder="Seu nome"
              />
            </div>

            {/* Email Input */}
            <div>
              <label className="block text-sm font-outfit font-semibold text-slate-300 mb-2">
                Email
              </label>
              <motion.input
                whileFocus={{ scale: 1.02 }}
                type="email"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-lg text-white font-outfit placeholder-slate-500 focus:outline-none focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300"
                placeholder="seu.email@example.com"
              />
            </div>

            {/* Message Textarea */}
            <div>
              <label className="block text-sm font-outfit font-semibold text-slate-300 mb-2">
                Mensagem
              </label>
              <motion.textarea
                whileFocus={{ scale: 1.02 }}
                required
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                rows={5}
                className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-lg text-white font-outfit placeholder-slate-500 focus:outline-none focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300 resize-none"
                placeholder="Sua mensagem..."
              />
            </div>

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-outfit font-semibold rounded-lg hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={submitted}
            >
              {submitted ? 'Mensagem Enviada!' : 'Enviar Mensagem'}
            </motion.button>
          </motion.form>

          {/* Social Links */}
          <motion.div variants={itemVariants} className="text-center">
            <p className="text-slate-400 font-outfit mb-6">Ou conecte-se comigo:</p>
            <div className="flex justify-center gap-4">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  whileHover={{ scale: 1.15, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-4 rounded-lg bg-slate-800/50 text-slate-300 hover:text-cyan-400 hover:bg-slate-700/50 transition-all duration-300"
                  aria-label={label}
                >
                  <Icon size={24} />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
