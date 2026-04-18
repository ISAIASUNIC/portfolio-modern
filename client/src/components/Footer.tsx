import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Heart } from 'lucide-react';

/**
 * Footer Component
 * Minimalist footer with social links and copyright
 * Design: Glassmorphism with geometric pattern background
 */
export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Github, href: '#', label: 'GitHub' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Mail, href: 'mailto:hello@example.com', label: 'Email' },
  ];

  return (
    <footer className="relative bg-gradient-to-b from-slate-900 to-slate-950 border-t border-slate-800/50">
      {/* Background Pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url('https://d2xsxph8kpxj0f.cloudfront.net/310519663573025369/Xyv9EonTUbeR6pycU65psv/geometric-pattern-dark-mo44k9qCoTqUASvh8RwA8M.webp')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      <div className="relative container mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row items-center justify-between gap-8 mb-8"
        >
          {/* Brand */}
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-poppins font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-2">
              Portfolio
            </h3>
            <p className="text-slate-400 font-outfit text-sm">
              Desenvolvedor full-stack criando experiências digitais extraordinárias
            </p>
          </div>

          {/* Social Links */}
          <div className="flex gap-4">
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <motion.a
                key={label}
                href={href}
                whileHover={{ scale: 1.2, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className="p-3 rounded-lg bg-slate-800/50 text-slate-300 hover:text-cyan-400 hover:bg-slate-700/50 transition-all duration-300"
                aria-label={label}
              >
                <Icon size={20} />
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent my-8" />

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-400 font-outfit"
        >
          <div className="flex items-center gap-1">
            <span>Feito com</span>
            <Heart size={16} className="text-red-500 fill-red-500" />
            <span>por você</span>
          </div>

          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-cyan-400 transition-colors">
              Privacidade
            </a>
            <a href="#" className="hover:text-cyan-400 transition-colors">
              Termos
            </a>
            <a href="#" className="hover:text-cyan-400 transition-colors">
              Sitemap
            </a>
          </div>

          <div>
            © {currentYear} Portfolio. Todos os direitos reservados.
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
