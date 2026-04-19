import { useState } from 'react';
import { Menu, X, Moon, Sun, MapPin } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { motion } from 'framer-motion';

/**
 * Navigation Component - Delivery App
 * Modern sticky navigation with location and theme toggle
 * Design: Minimalist with glassmorphism effect
 */
export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Restaurantes', href: '/restaurants' },
    { label: 'Pedidos', href: '/orders' },
    { label: 'Favoritos', href: '/favorites' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 w-full z-50 glass-dark border-b border-slate-700/30"
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="text-2xl font-poppins font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"
        >
          🍜 DeliJapa
        </motion.div>

        {/* Location */}
        <div className="hidden md:flex items-center gap-2 text-slate-300 font-outfit text-sm">
          <MapPin size={16} className="text-cyan-400" />
          <span>São Paulo, SP</span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <motion.button
              key={item.label}
              onClick={() => (window.location.href = item.href)}
              whileHover={{ color: '#06b6d4' }}
              className="text-slate-300 hover:text-cyan-400 transition-colors duration-300 font-outfit text-sm cursor-pointer"
            >
              {item.label}
            </motion.button>
          ))}
        </div>

        {/* Theme Toggle & Mobile Menu Button */}
        <div className="flex items-center gap-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-slate-800/50 hover:bg-slate-700/50 transition-colors"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <Sun size={20} className="text-yellow-400" />
            ) : (
              <Moon size={20} className="text-slate-300" />
            )}
          </motion.button>

          {/* Mobile Menu Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg bg-slate-800/50 hover:bg-slate-700/50 transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <X size={24} className="text-slate-300" />
            ) : (
              <Menu size={24} className="text-slate-300" />
            )}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: isOpen ? 1 : 0, height: isOpen ? 'auto' : 0 }}
        transition={{ duration: 0.3 }}
        className="md:hidden overflow-hidden bg-slate-900/80 border-t border-slate-700/30"
      >
        <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => {
                window.location.href = item.href;
                setIsOpen(false);
              }}
              className="text-slate-300 hover:text-cyan-400 transition-colors duration-300 font-outfit py-2 cursor-pointer w-full text-left"
            >
              {item.label}
            </button>
          ))}
        </div>
      </motion.div>
    </motion.nav>
  );
}
