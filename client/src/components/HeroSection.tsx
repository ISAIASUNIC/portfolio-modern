import { motion } from 'framer-motion';
import { ArrowRight, Github, Linkedin, Mail } from 'lucide-react';

/**
 * Hero Section Component
 * Modern hero with gradient background and animated text
 * Design: Glassmorphism with bold typography
 */
export default function HeroSection() {
  const heroImage = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663573025369/Xyv9EonTUbeR6pycU65psv/hero-gradient-abstract-afD2Carq5pwGX52rZzepNt.webp';

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen w-full overflow-hidden pt-20"
    >
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('${heroImage}')`,
          backgroundAttachment: 'fixed',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/40 via-slate-900/60 to-slate-900/80" />
      </div>

      {/* Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative container mx-auto px-4 h-screen flex flex-col justify-center items-start gap-8"
      >
        {/* Main Title */}
        <motion.div variants={itemVariants} className="max-w-2xl">
          <h1 className="text-5xl md:text-7xl font-poppins font-bold leading-tight">
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              Criando Experiências
            </span>
            <br />
            <span className="text-white">Digitais Extraordinárias</span>
          </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          variants={itemVariants}
          className="text-lg md:text-xl text-slate-300 font-outfit max-w-xl leading-relaxed"
        >
          Desenvolvedor full-stack apaixonado por criar interfaces modernas,
          performáticas e acessíveis. Transformando ideias em realidade digital.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 pt-4"
        >
          <motion.a
            href="#projects"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-outfit font-semibold rounded-lg flex items-center gap-2 hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300"
          >
            Ver Projetos
            <ArrowRight size={20} />
          </motion.a>

          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 border-2 border-cyan-400 text-cyan-400 font-outfit font-semibold rounded-lg hover:bg-cyan-400/10 transition-all duration-300"
          >
            Entrar em Contato
          </motion.a>
        </motion.div>

        {/* Social Links */}
        <motion.div
          variants={itemVariants}
          className="flex gap-6 pt-8"
        >
          {[
            { icon: Github, href: '#', label: 'GitHub' },
            { icon: Linkedin, href: '#', label: 'LinkedIn' },
            { icon: Mail, href: '#', label: 'Email' },
          ].map(({ icon: Icon, href, label }) => (
            <motion.a
              key={label}
              href={href}
              whileHover={{ scale: 1.2, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className="p-3 rounded-lg bg-slate-800/50 text-slate-300 hover:text-cyan-400 hover:bg-slate-700/50 transition-all duration-300"
              aria-label={label}
            >
              <Icon size={24} />
            </motion.a>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-cyan-400 rounded-full flex justify-center p-2">
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-2 bg-cyan-400 rounded-full"
          />
        </div>
      </motion.div>
    </section>
  );
}
