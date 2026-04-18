import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import { useState } from 'react';
import { Address } from '@/contexts/OrderContext';

interface AddressFormProps {
  onSubmit: (address: Address) => void;
}

/**
 * Address Form Component
 * Form for collecting delivery address with validation
 * Design: Modern form with glassmorphism
 */
export default function AddressForm({ onSubmit }: AddressFormProps) {
  const [formData, setFormData] = useState<Address>({
    street: '',
    number: '',
    complement: '',
    neighborhood: '',
    city: 'São Paulo',
    state: 'SP',
    zipCode: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.street.trim()) newErrors.street = 'Rua é obrigatória';
    if (!formData.number.trim()) newErrors.number = 'Número é obrigatório';
    if (!formData.neighborhood.trim()) newErrors.neighborhood = 'Bairro é obrigatório';
    if (!formData.zipCode.trim()) newErrors.zipCode = 'CEP é obrigatório';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="glass-dark p-8 rounded-xl"
    >
      <div className="flex items-center gap-3 mb-6">
        <MapPin className="text-cyan-400" size={28} />
        <h2 className="text-2xl font-poppins font-bold text-white">Endereço de Entrega</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Street */}
        <motion.div variants={itemVariants}>
          <label className="block text-sm font-outfit font-semibold text-slate-300 mb-2">
            Rua *
          </label>
          <motion.input
            whileFocus={{ scale: 1.02 }}
            type="text"
            name="street"
            value={formData.street}
            onChange={handleChange}
            className={`w-full px-4 py-3 bg-slate-800/50 border rounded-lg text-white font-outfit placeholder-slate-500 focus:outline-none focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300 ${
              errors.street ? 'border-red-500' : 'border-slate-700/50'
            }`}
            placeholder="Av. Paulista"
          />
          {errors.street && (
            <p className="text-red-400 text-sm font-outfit mt-1">{errors.street}</p>
          )}
        </motion.div>

        {/* Number and Complement */}
        <motion.div variants={itemVariants} className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-outfit font-semibold text-slate-300 mb-2">
              Número *
            </label>
            <motion.input
              whileFocus={{ scale: 1.02 }}
              type="text"
              name="number"
              value={formData.number}
              onChange={handleChange}
              className={`w-full px-4 py-3 bg-slate-800/50 border rounded-lg text-white font-outfit placeholder-slate-500 focus:outline-none focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300 ${
                errors.number ? 'border-red-500' : 'border-slate-700/50'
              }`}
              placeholder="1000"
            />
            {errors.number && (
              <p className="text-red-400 text-sm font-outfit mt-1">{errors.number}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-outfit font-semibold text-slate-300 mb-2">
              Complemento
            </label>
            <motion.input
              whileFocus={{ scale: 1.02 }}
              type="text"
              name="complement"
              value={formData.complement}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-lg text-white font-outfit placeholder-slate-500 focus:outline-none focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300"
              placeholder="Apto 201"
            />
          </div>
        </motion.div>

        {/* Neighborhood */}
        <motion.div variants={itemVariants}>
          <label className="block text-sm font-outfit font-semibold text-slate-300 mb-2">
            Bairro *
          </label>
          <motion.input
            whileFocus={{ scale: 1.02 }}
            type="text"
            name="neighborhood"
            value={formData.neighborhood}
            onChange={handleChange}
            className={`w-full px-4 py-3 bg-slate-800/50 border rounded-lg text-white font-outfit placeholder-slate-500 focus:outline-none focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300 ${
              errors.neighborhood ? 'border-red-500' : 'border-slate-700/50'
            }`}
            placeholder="Bela Vista"
          />
          {errors.neighborhood && (
            <p className="text-red-400 text-sm font-outfit mt-1">{errors.neighborhood}</p>
          )}
        </motion.div>

        {/* City and State */}
        <motion.div variants={itemVariants} className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-outfit font-semibold text-slate-300 mb-2">
              Cidade
            </label>
            <motion.input
              whileFocus={{ scale: 1.02 }}
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-lg text-white font-outfit placeholder-slate-500 focus:outline-none focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300"
              placeholder="São Paulo"
            />
          </div>

          <div>
            <label className="block text-sm font-outfit font-semibold text-slate-300 mb-2">
              Estado
            </label>
            <motion.input
              whileFocus={{ scale: 1.02 }}
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              maxLength={2}
              className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-lg text-white font-outfit placeholder-slate-500 focus:outline-none focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300 uppercase"
              placeholder="SP"
            />
          </div>
        </motion.div>

        {/* ZIP Code */}
        <motion.div variants={itemVariants}>
          <label className="block text-sm font-outfit font-semibold text-slate-300 mb-2">
            CEP *
          </label>
          <motion.input
            whileFocus={{ scale: 1.02 }}
            type="text"
            name="zipCode"
            value={formData.zipCode}
            onChange={handleChange}
            placeholder="01311-100"
            className={`w-full px-4 py-3 bg-slate-800/50 border rounded-lg text-white font-outfit placeholder-slate-500 focus:outline-none focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300 ${
              errors.zipCode ? 'border-red-500' : 'border-slate-700/50'
            }`}
          />
          {errors.zipCode && (
            <p className="text-red-400 text-sm font-outfit mt-1">{errors.zipCode}</p>
          )}
        </motion.div>

        {/* Submit Button */}
        <motion.button
          variants={itemVariants}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="w-full px-6 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-outfit font-semibold rounded-lg hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300"
        >
          Continuar para Pagamento
        </motion.button>
      </form>
    </motion.div>
  );
}
