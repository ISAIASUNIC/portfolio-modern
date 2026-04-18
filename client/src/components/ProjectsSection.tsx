import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';

/**
 * Projects Section Component
 * Gallery of projects with hover effects and glassmorphism cards
 * Design: Modern grid with micro-interactions
 */
export default function ProjectsSection() {
  const projects = [
    {
      id: 1,
      title: 'E-Commerce Platform',
      description: 'Plataforma de e-commerce moderna com React, TypeScript e Stripe',
      tags: ['React', 'TypeScript', 'Tailwind', 'Stripe'],
      image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663573025369/Xyv9EonTUbeR6pycU65psv/code-abstract-tech-hTR927RogMnvsjDysRdUF6.webp',
      link: '#',
      github: '#',
    },
    {
      id: 2,
      title: 'Dashboard Analytics',
      description: 'Dashboard interativo com gráficos em tempo real e análise de dados',
      tags: ['React', 'Recharts', 'Node.js', 'MongoDB'],
      image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663573025369/Xyv9EonTUbeR6pycU65psv/code-abstract-tech-hTR927RogMnvsjDysRdUF6.webp',
      link: '#',
      github: '#',
    },
    {
      id: 3,
      title: 'Social Media App',
      description: 'Aplicação social com autenticação, feed em tempo real e notificações',
      tags: ['React Native', 'Firebase', 'Redux', 'Expo'],
      image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663573025369/Xyv9EonTUbeR6pycU65psv/code-abstract-tech-hTR927RogMnvsjDysRdUF6.webp',
      link: '#',
      github: '#',
    },
    {
      id: 4,
      title: 'Design System',
      description: 'Sistema de design completo com componentes reutilizáveis e documentação',
      tags: ['Figma', 'Storybook', 'React', 'TypeScript'],
      image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663573025369/Xyv9EonTUbeR6pycU65psv/code-abstract-tech-hTR927RogMnvsjDysRdUF6.webp',
      link: '#',
      github: '#',
    },
    {
      id: 5,
      title: 'AI Chat Interface',
      description: 'Interface de chat com IA integrada, suporte a múltiplos idiomas',
      tags: ['React', 'OpenAI', 'WebSocket', 'Tailwind'],
      image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663573025369/Xyv9EonTUbeR6pycU65psv/code-abstract-tech-hTR927RogMnvsjDysRdUF6.webp',
      link: '#',
      github: '#',
    },
    {
      id: 6,
      title: 'Portfolio Website',
      description: 'Website de portfólio moderno com animações e dark mode',
      tags: ['React', 'Framer Motion', 'Tailwind', 'TypeScript'],
      image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663573025369/Xyv9EonTUbeR6pycU65psv/code-abstract-tech-hTR927RogMnvsjDysRdUF6.webp',
      link: '#',
      github: '#',
    },
  ];

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

  return (
    <section id="projects" className="relative py-24 bg-slate-900">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-poppins font-bold mb-4">
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Projetos em Destaque
            </span>
          </h2>
          <p className="text-slate-400 font-outfit text-lg max-w-2xl mx-auto">
            Seleção de projetos que demonstram minha expertise em desenvolvimento
            full-stack, design moderno e otimização de performance.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {projects.map((project) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              whileHover={{ y: -8 }}
              className="group relative overflow-hidden rounded-xl glass-dark hover:border-cyan-400/50 transition-all duration-300"
            >
              {/* Image Container */}
              <div className="relative h-48 overflow-hidden">
                <motion.img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                <h3 className="text-xl font-poppins font-bold text-white group-hover:text-cyan-400 transition-colors">
                  {project.title}
                </h3>

                <p className="text-sm text-slate-400 font-outfit leading-relaxed">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-xs font-outfit rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex gap-3 pt-4">
                  <motion.a
                    href={project.link}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 px-4 py-2 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 rounded-lg transition-all duration-300 text-sm font-outfit"
                  >
                    <ExternalLink size={16} />
                    Demo
                  </motion.a>
                  <motion.a
                    href={project.github}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 px-4 py-2 bg-slate-700/50 hover:bg-slate-700 text-slate-300 rounded-lg transition-all duration-300 text-sm font-outfit"
                  >
                    <Github size={16} />
                    Code
                  </motion.a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
