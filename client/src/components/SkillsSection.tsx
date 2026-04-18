import { motion } from 'framer-motion';

/**
 * Skills Section Component
 * Modern skills visualization with categories and proficiency levels
 * Design: Glassmorphism with animated progress bars
 */
export default function SkillsSection() {
  const skillCategories = [
    {
      category: 'Frontend',
      skills: [
        { name: 'React', proficiency: 95 },
        { name: 'TypeScript', proficiency: 90 },
        { name: 'Tailwind CSS', proficiency: 95 },
        { name: 'Framer Motion', proficiency: 85 },
      ],
    },
    {
      category: 'Backend',
      skills: [
        { name: 'Node.js', proficiency: 90 },
        { name: 'Express', proficiency: 88 },
        { name: 'MongoDB', proficiency: 85 },
        { name: 'PostgreSQL', proficiency: 82 },
      ],
    },
    {
      category: 'Tools & Others',
      skills: [
        { name: 'Git', proficiency: 95 },
        { name: 'Docker', proficiency: 80 },
        { name: 'AWS', proficiency: 78 },
        { name: 'Figma', proficiency: 85 },
      ],
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
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section id="skills" className="relative py-24 bg-gradient-to-b from-slate-900 to-slate-900/50">
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
              Habilidades & Expertise
            </span>
          </h2>
          <p className="text-slate-400 font-outfit text-lg max-w-2xl mx-auto">
            Tecnologias e ferramentas que domino para criar soluções modernas e escaláveis.
          </p>
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={categoryIndex}
              variants={itemVariants}
              className="glass-dark p-8 rounded-xl space-y-6"
            >
              <h3 className="text-2xl font-poppins font-bold text-cyan-400">
                {category.category}
              </h3>

              <div className="space-y-5">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-white font-outfit font-semibold">
                        {skill.name}
                      </span>
                      <span className="text-cyan-300 text-sm font-outfit">
                        {skill.proficiency}%
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.proficiency}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: skillIndex * 0.1 }}
                        className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
