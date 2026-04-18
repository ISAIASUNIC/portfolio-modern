import { motion } from 'framer-motion';
import { Ticket, X, Check, AlertCircle } from 'lucide-react';
import { useState } from 'react';
import { useCoupon } from '@/contexts/CouponContext';

/**
 * Coupon Input Component
 * Form to apply discount coupons with validation feedback
 * Design: Modern input with glassmorphism
 */
export default function CouponInput() {
  const { appliedCoupon, applyCoupon, removeCoupon } = useCoupon();
  const [couponCode, setCouponCode] = useState('');
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleApplyCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!couponCode.trim()) {
      setFeedback({ type: 'error', message: 'Digite um código de cupom' });
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const result = applyCoupon(couponCode.toUpperCase());
      setFeedback({ type: result.success ? 'success' : 'error', message: result.message });
      
      if (result.success) {
        setCouponCode('');
      }
      
      setIsLoading(false);
    }, 500);
  };

  const handleRemoveCoupon = () => {
    removeCoupon();
    setCouponCode('');
    setFeedback(null);
  };

  if (appliedCoupon) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg space-y-3"
      >
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="mt-1"
            >
              <Check size={20} className="text-green-400" />
            </motion.div>
            <div>
              <p className="text-sm font-outfit font-bold text-green-400">Cupom Aplicado</p>
              <p className="text-white font-poppins font-semibold">{appliedCoupon.code}</p>
              <p className="text-sm text-slate-300 font-outfit">{appliedCoupon.description}</p>
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleRemoveCoupon}
            className="p-1 hover:bg-red-500/20 rounded transition-colors"
          >
            <X size={18} className="text-red-400" />
          </motion.button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-3"
    >
      <form onSubmit={handleApplyCoupon} className="flex gap-2">
        <div className="flex-1 relative">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-cyan-400">
            <Ticket size={18} />
          </div>
          <motion.input
            whileFocus={{ scale: 1.02 }}
            type="text"
            value={couponCode}
            onChange={(e) => {
              setCouponCode(e.target.value.toUpperCase());
              setFeedback(null);
            }}
            placeholder="Digite o código do cupom"
            disabled={isLoading}
            className="w-full pl-10 pr-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-lg text-white font-outfit placeholder-slate-500 focus:outline-none focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300 disabled:opacity-50"
          />
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          disabled={isLoading}
          className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-outfit font-semibold rounded-lg hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 disabled:opacity-50"
        >
          {isLoading ? 'Verificando...' : 'Aplicar'}
        </motion.button>
      </form>

      {/* Feedback Message */}
      {feedback && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className={`flex items-center gap-2 p-3 rounded-lg ${
            feedback.type === 'success'
              ? 'bg-green-500/10 border border-green-500/30'
              : 'bg-red-500/10 border border-red-500/30'
          }`}
        >
          {feedback.type === 'success' ? (
            <Check size={18} className="text-green-400" />
          ) : (
            <AlertCircle size={18} className="text-red-400" />
          )}
          <p
            className={`text-sm font-outfit ${
              feedback.type === 'success' ? 'text-green-400' : 'text-red-400'
            }`}
          >
            {feedback.message}
          </p>
        </motion.div>
      )}
    </motion.div>
  );
}
