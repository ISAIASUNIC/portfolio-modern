import { motion } from 'framer-motion';
import { Ticket, Copy, Clock, ShoppingCart } from 'lucide-react';
import { useCoupon } from '@/contexts/CouponContext';
import { useState } from 'react';

/**
 * Available Coupons Component
 * Display list of available discount coupons
 * Design: Modern card layout with copy-to-clipboard
 */
export default function AvailableCoupons() {
  const { availableCoupons, applyCoupon } = useCoupon();
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const handleQuickApply = (code: string) => {
    applyCoupon(code);
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
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  const activeCoupons = availableCoupons.filter(
    (c) => c.isActive && new Date() < c.expiresAt
  );

  if (activeCoupons.length === 0) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-4"
    >
      <div className="flex items-center gap-2 mb-4">
        <Ticket size={20} className="text-cyan-400" />
        <h3 className="text-lg font-poppins font-bold text-white">Cupons Disponíveis</h3>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-64 overflow-y-auto pr-2"
      >
        {activeCoupons.map((coupon) => {
          const daysLeft = Math.ceil(
            (coupon.expiresAt.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
          );
          const usagePercentage = coupon.usageLimit
            ? (coupon.usageCount / coupon.usageLimit) * 100
            : 0;

          return (
            <motion.div
              key={coupon.code}
              variants={itemVariants}
              className="glass-dark p-4 rounded-lg space-y-3 hover:border-cyan-400/50 transition-all duration-300 border border-slate-700/50"
            >
              {/* Header */}
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-outfit text-slate-400">Código</p>
                  <p className="text-lg font-poppins font-bold text-cyan-400">{coupon.code}</p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleCopyCode(coupon.code)}
                  className="p-2 hover:bg-slate-700/50 rounded transition-colors"
                  title="Copiar código"
                >
                  <Copy
                    size={16}
                    className={`transition-colors ${
                      copiedCode === coupon.code ? 'text-green-400' : 'text-slate-400'
                    }`}
                  />
                </motion.button>
              </div>

              {/* Description */}
              <p className="text-sm font-outfit text-slate-300">{coupon.description}</p>

              {/* Discount Value */}
              <div className="flex items-center gap-2">
                <div className="px-3 py-1 bg-cyan-500/20 rounded-full">
                  <p className="text-sm font-poppins font-bold text-cyan-400">
                    {coupon.discountType === 'percentage'
                      ? `${coupon.discountValue}%`
                      : `R$ ${coupon.discountValue}`}
                  </p>
                </div>
                {coupon.minPurchase > 0 && (
                  <p className="text-xs text-slate-400 font-outfit">
                    Mín: R$ {coupon.minPurchase}
                  </p>
                )}
              </div>

              {/* Usage Bar */}
              {coupon.usageLimit && (
                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <p className="text-xs text-slate-400 font-outfit flex items-center gap-1">
                      <ShoppingCart size={12} />
                      {coupon.usageCount} / {coupon.usageLimit}
                    </p>
                    <p className="text-xs text-slate-400 font-outfit">
                      {Math.round(usagePercentage)}%
                    </p>
                  </div>
                  <div className="w-full h-1 bg-slate-700 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${usagePercentage}%` }}
                      transition={{ duration: 0.8 }}
                      className="h-full bg-gradient-to-r from-cyan-500 to-blue-600"
                    />
                  </div>
                </div>
              )}

              {/* Expiry */}
              <div className="flex items-center gap-2 text-xs text-slate-400 font-outfit">
                <Clock size={12} />
                <span>Expira em {daysLeft} dias</span>
              </div>

              {/* Apply Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleQuickApply(coupon.code)}
                className="w-full px-3 py-2 bg-gradient-to-r from-cyan-500/20 to-blue-600/20 hover:from-cyan-500/30 hover:to-blue-600/30 text-cyan-400 font-outfit font-semibold rounded-lg transition-all duration-300 text-sm"
              >
                Aplicar Cupom
              </motion.button>
            </motion.div>
          );
        })}
      </motion.div>
    </motion.div>
  );
}
