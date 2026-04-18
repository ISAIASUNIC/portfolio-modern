import { motion } from 'framer-motion';
import { Code2, Zap, Target } from 'lucide-react';

/**
 * About Section Component
 * Organic layout with image and text, highlighting key values
 * Design: Anti-grid layout with glassmorphism cards
 */
export default function AboutSection() {
  const aboutImage = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663573025369/Xyv9EonTUbeR6pycU65psv/workspace-creative-dec7GhBPYmm2WERUVNBvke.webp';

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
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

  const values = [
    {
      icon: Code2,
      title: 'Código Limpo',
      description: 'Escrevo código limpo, maintível e bem documentado',
    },
    {
      icon: Zap,
      title: 'Performance',
      description: 'Otimizo cada pixel para experiências rápidas',
    },
    {
      icon: Target,
      title: 'Foco no Usuário',
      description: 'Cada decisão é baseada em necessidades reais',
    },
  ];

  return (
    <section id="about" className="relative py-24 bg-gradient-to-b from-slate-900/50 to-slate-900">
      <div className="container mx-auto px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
        >
          {/* Image - Organic positioning */}
          <motion.div
            variants={itemVariants}
            className="relative order-2 lg:order-1"
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
              className="relative rounded-2xl overflow-hidden shadow-2xl"
            >
              <img
                src={aboutImage}
                alt="Workspace"
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 to-transparent" />
            </motion.div>

            {/* Floating Card */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -bottom-6 -right-6 glass-dark p-6 rounded-xl shadow-xl max-w-xs"
            >
              <p className="text-sm text-slate-300 font-outfit">
                "Transformando ideias em código que funciona e inspira."
              </p>
            </motion.div>
          </motion.div>

          {/* Text Content - Organic layout */}
          <motion.div
            variants={itemVariants}
            className="order-1 lg:order-2 space-y-8"
          >
            <div>
              <motion.h2
                variants={itemVariants}
                className="text-4xl md:text-5xl font-poppins font-bold mb-4"
              >
                <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  Sobre Mim
                </span>
              </motion.h2>
              <motion.p
                variants={itemVariants}
                className="text-slate-300 font-outfit text-lg leading-relaxed"
              >
                Sou um desenvolvedor apaixonado por criar experiências digitais
                que combinam design moderno com funcionalidade impecável. Com
                mais de 5 anos de experiência, tenho trabalhado em projetos
                desafiadores que exigem criatividade, técnica e atenção aos
                detalhes.
              </motion.p>
            </div>

            {/* Values Grid */}
            <motion.div
              variants={containerVariants}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              {values.map(({ icon: Icon, title, description }, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                  className="glass-dark p-6 rounded-xl hover:border-cyan-400/50 transition-all duration-300"
                >
                  <Icon className="w-8 h-8 text-cyan-400 mb-3" />
                  <h3 className="font-poppins font-bold text-white mb-2">
                    {title}
                  </h3>
                  <p className="text-sm text-slate-400 font-outfit">
                    {description}
                  </p>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA */}
            <motion.a
              variants={itemVariants}
              href="#projects"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-outfit font-semibold rounded-lg hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300"
            >
              Ver Meus Projetos
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
