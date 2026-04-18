import { motion } from 'framer-motion';
import { CreditCard, Zap, Banknote } from 'lucide-react';
import { useState } from 'react';
import { PaymentMethod } from '@/contexts/OrderContext';

interface PaymentFormProps {
  onSubmit: (paymentMethod: PaymentMethod) => void;
}

/**
 * Payment Form Component
 * Payment method selection with card details form
 * Design: Modern payment options with glassmorphism
 */
export default function PaymentForm({ onSubmit }: PaymentFormProps) {
  const [selectedMethod, setSelectedMethod] = useState<'card' | 'pix' | 'cash'>('card');
  const [cardData, setCardData] = useState({
    cardNumber: '',
    cardName: '',
    cardExpiry: '',
    cardCvv: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateCard = () => {
    const newErrors: Record<string, string> = {};

    if (!cardData.cardNumber.replace(/\s/g, '')) newErrors.cardNumber = 'Número do cartão é obrigatório';
    if (!cardData.cardName.trim()) newErrors.cardName = 'Nome do titular é obrigatório';
    if (!cardData.cardExpiry.trim()) newErrors.cardExpiry = 'Data de validade é obrigatória';
    if (!cardData.cardCvv.trim()) newErrors.cardCvv = 'CVV é obrigatório';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (selectedMethod === 'card' && !validateCard()) {
      return;
    }

    const paymentMethod: PaymentMethod = {
      type: selectedMethod,
      details: selectedMethod === 'card' ? cardData : undefined,
    };

    onSubmit(paymentMethod);
  };

  const handleCardChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === 'cardNumber') {
      formattedValue = value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
    } else if (name === 'cardExpiry') {
      formattedValue = value.replace(/\D/g, '').replace(/(\d{2})(\d)/, '$1/$2').slice(0, 5);
    } else if (name === 'cardCvv') {
      formattedValue = value.replace(/\D/g, '').slice(0, 3);
    }

    setCardData({ ...cardData, [name]: formattedValue });
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

  const paymentOptions = [
    {
      id: 'card',
      name: 'Cartão de Crédito',
      icon: CreditCard,
      description: 'Visa, Mastercard, Elo',
    },
    {
      id: 'pix',
      name: 'PIX',
      icon: Zap,
      description: 'Instantâneo e seguro',
    },
    {
      id: 'cash',
      name: 'Dinheiro',
      icon: Banknote,
      description: 'Na entrega',
    },
  ];

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Payment Method Selection */}
      <motion.div variants={itemVariants} className="glass-dark p-8 rounded-xl">
        <h2 className="text-2xl font-poppins font-bold text-white mb-6">Forma de Pagamento</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {paymentOptions.map(({ id, name, icon: Icon, description }) => (
            <motion.button
              key={id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedMethod(id as 'card' | 'pix' | 'cash')}
              className={`p-4 rounded-lg border-2 transition-all duration-300 ${
                selectedMethod === id
                  ? 'border-cyan-400 bg-cyan-500/10'
                  : 'border-slate-700/50 bg-slate-800/30 hover:border-slate-600'
              }`}
            >
              <Icon
                size={28}
                className={`mb-2 ${selectedMethod === id ? 'text-cyan-400' : 'text-slate-400'}`}
              />
              <p className="font-poppins font-bold text-white text-sm">{name}</p>
              <p className="text-xs text-slate-400 font-outfit">{description}</p>
            </motion.button>
          ))}
        </div>

        {/* Card Form */}
        {selectedMethod === 'card' && (
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            {/* Card Number */}
            <div>
              <label className="block text-sm font-outfit font-semibold text-slate-300 mb-2">
                Número do Cartão
              </label>
              <motion.input
                whileFocus={{ scale: 1.02 }}
                type="text"
                name="cardNumber"
                value={cardData.cardNumber}
                onChange={handleCardChange}
                placeholder="1234 5678 9012 3456"
                maxLength={19}
                className={`w-full px-4 py-3 bg-slate-800/50 border rounded-lg text-white font-outfit placeholder-slate-500 focus:outline-none focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300 ${
                  errors.cardNumber ? 'border-red-500' : 'border-slate-700/50'
                }`}
              />
              {errors.cardNumber && (
                <p className="text-red-400 text-sm font-outfit mt-1">{errors.cardNumber}</p>
              )}
            </div>

            {/* Cardholder Name */}
            <div>
              <label className="block text-sm font-outfit font-semibold text-slate-300 mb-2">
                Nome do Titular
              </label>
              <motion.input
                whileFocus={{ scale: 1.02 }}
                type="text"
                name="cardName"
                value={cardData.cardName}
                onChange={handleCardChange}
                placeholder="João Silva"
                className={`w-full px-4 py-3 bg-slate-800/50 border rounded-lg text-white font-outfit placeholder-slate-500 focus:outline-none focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300 ${
                  errors.cardName ? 'border-red-500' : 'border-slate-700/50'
                }`}
              />
              {errors.cardName && (
                <p className="text-red-400 text-sm font-outfit mt-1">{errors.cardName}</p>
              )}
            </div>

            {/* Expiry and CVV */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-outfit font-semibold text-slate-300 mb-2">
                  Validade
                </label>
                <motion.input
                  whileFocus={{ scale: 1.02 }}
                  type="text"
                  name="cardExpiry"
                  value={cardData.cardExpiry}
                  onChange={handleCardChange}
                  placeholder="MM/YY"
                  className={`w-full px-4 py-3 bg-slate-800/50 border rounded-lg text-white font-outfit placeholder-slate-500 focus:outline-none focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300 ${
                    errors.cardExpiry ? 'border-red-500' : 'border-slate-700/50'
                  }`}
                />
                {errors.cardExpiry && (
                  <p className="text-red-400 text-sm font-outfit mt-1">{errors.cardExpiry}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-outfit font-semibold text-slate-300 mb-2">
                  CVV
                </label>
                <motion.input
                  whileFocus={{ scale: 1.02 }}
                  type="text"
                  name="cardCvv"
                  value={cardData.cardCvv}
                  onChange={handleCardChange}
                  placeholder="123"
                  maxLength={3}
                  className={`w-full px-4 py-3 bg-slate-800/50 border rounded-lg text-white font-outfit placeholder-slate-500 focus:outline-none focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300 ${
                    errors.cardCvv ? 'border-red-500' : 'border-slate-700/50'
                  }`}
                />
                {errors.cardCvv && (
                  <p className="text-red-400 text-sm font-outfit mt-1">{errors.cardCvv}</p>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full px-6 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-outfit font-semibold rounded-lg hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300"
            >
              Continuar para Revisão
            </motion.button>
          </motion.form>
        )}

        {/* PIX Option */}
        {selectedMethod === 'pix' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <p className="text-slate-300 font-outfit">
              Você receberá um QR Code para escanear após confirmar o pedido.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSubmit}
              className="w-full px-6 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-outfit font-semibold rounded-lg hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300"
            >
              Continuar com PIX
            </motion.button>
          </motion.div>
        )}

        {/* Cash Option */}
        {selectedMethod === 'cash' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <p className="text-slate-300 font-outfit">
              Pague em dinheiro diretamente com o entregador.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSubmit}
              className="w-full px-6 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-outfit font-semibold rounded-lg hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300"
            >
              Continuar com Dinheiro
            </motion.button>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}
