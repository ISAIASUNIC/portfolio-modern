import { motion } from 'framer-motion';
import { CheckCircle, MapPin, Clock, Zap, Package } from 'lucide-react';
import { useOrder } from '@/contexts/OrderContext';
import { useEffect } from 'react';

/**
 * Order Confirmation Page
 * Success page showing order details and tracking info
 * Design: Celebratory animations with glassmorphism
 */
export default function OrderConfirmation() {
  const { orders } = useOrder();
  const lastOrder = orders[orders.length - 1];

  useEffect(() => {
    if (!lastOrder) {
      window.location.href = '/';
    }
  }, [lastOrder]);

  if (!lastOrder) {
    return null;
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const checkmarkVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: { damping: 10, delay: 0.2 },
    },
  };

  return (
    <div className="min-h-screen bg-slate-900 pt-24 pb-12">
      <div className="container mx-auto px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-2xl mx-auto"
        >
          {/* Success Animation */}
          <motion.div
            variants={itemVariants}
            className="text-center mb-12"
          >
            <motion.div
              variants={checkmarkVariants}
              className="flex justify-center mb-6"
            >
              <CheckCircle size={80} className="text-green-400" />
            </motion.div>

            <h1 className="text-4xl md:text-5xl font-poppins font-bold text-white mb-4">
              Pedido Confirmado!
            </h1>
            <p className="text-slate-400 font-outfit text-lg">
              Seu pedido foi recebido e está sendo preparado
            </p>
          </motion.div>

          {/* Order ID */}
          <motion.div
            variants={itemVariants}
            className="glass-dark p-6 rounded-xl text-center mb-8"
          >
            <p className="text-slate-400 font-outfit mb-2">Número do Pedido</p>
            <p className="text-3xl font-poppins font-bold text-cyan-400">{lastOrder.id}</p>
          </motion.div>

          {/* Order Details */}
          <motion.div
            variants={itemVariants}
            className="glass-dark p-8 rounded-xl space-y-6 mb-8"
          >
            {/* Delivery Address */}
            <div className="flex gap-4">
              <MapPin className="text-cyan-400 flex-shrink-0" size={24} />
              <div>
                <h3 className="font-poppins font-bold text-white mb-2">Endereço de Entrega</h3>
                <p className="text-slate-300 font-outfit">
                  {lastOrder.address.street}, {lastOrder.address.number}
                </p>
                {lastOrder.address.complement && (
                  <p className="text-slate-300 font-outfit">{lastOrder.address.complement}</p>
                )}
                <p className="text-slate-300 font-outfit">
                  {lastOrder.address.neighborhood}, {lastOrder.address.city} - {lastOrder.address.state}
                </p>
              </div>
            </div>

            {/* Estimated Delivery */}
            <div className="h-px bg-slate-700/50" />

            <div className="flex gap-4">
              <Clock className="text-cyan-400 flex-shrink-0" size={24} />
              <div>
                <h3 className="font-poppins font-bold text-white mb-2">Tempo Estimado</h3>
                <p className="text-slate-300 font-outfit">
                  Entrega em aproximadamente 45 minutos
                </p>
                <p className="text-sm text-slate-400 font-outfit">
                  Chega por volta das{' '}
                  {new Date(lastOrder.estimatedDelivery).toLocaleTimeString('pt-BR', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              </div>
            </div>

            {/* Payment Method */}
            <div className="h-px bg-slate-700/50" />

            <div className="flex gap-4">
              <Zap className="text-cyan-400 flex-shrink-0" size={24} />
              <div>
                <h3 className="font-poppins font-bold text-white mb-2">Forma de Pagamento</h3>
                <p className="text-slate-300 font-outfit capitalize">
                  {lastOrder.paymentMethod.type === 'card'
                    ? 'Cartão de Crédito'
                    : lastOrder.paymentMethod.type === 'pix'
                    ? 'PIX'
                    : 'Dinheiro'}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Order Summary */}
          <motion.div
            variants={itemVariants}
            className="glass-dark p-8 rounded-xl space-y-4 mb-8"
          >
            <div className="flex items-center gap-3 mb-4">
              <Package className="text-cyan-400" size={24} />
              <h3 className="text-xl font-poppins font-bold text-white">Resumo do Pedido</h3>
            </div>

            <div className="space-y-3 max-h-48 overflow-y-auto">
              {lastOrder.items.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <div>
                    <p className="text-white font-outfit">{item.name}</p>
                    <p className="text-slate-400 text-xs">Qtd: {item.quantity}</p>
                  </div>
                  <p className="text-cyan-400 font-semibold">
                    R$ {(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>

            <div className="h-px bg-slate-700/50" />

            <div className="space-y-2 text-sm font-outfit">
              <div className="flex justify-between text-slate-400">
                <span>Subtotal</span>
                <span>R$ {lastOrder.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Taxa de Entrega</span>
                <span>R$ {lastOrder.deliveryFee.toFixed(2)}</span>
              </div>
              <div className="h-px bg-slate-700/50" />
              <div className="flex justify-between text-white font-poppins font-bold text-lg">
                <span>Total</span>
                <span className="text-cyan-400">R$ {lastOrder.total.toFixed(2)}</span>
              </div>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex gap-4"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => (window.location.href = '/')}
              className="flex-1 px-6 py-4 bg-slate-800/50 hover:bg-slate-700/50 text-white font-outfit font-semibold rounded-lg transition-all duration-300"
            >
              Voltar ao Home
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex-1 px-6 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-outfit font-semibold rounded-lg hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300"
            >
              Rastrear Pedido
            </motion.button>
          </motion.div>

          {/* Support Info */}
          <motion.div
            variants={itemVariants}
            className="mt-12 p-6 bg-cyan-500/10 border border-cyan-400/30 rounded-xl text-center"
          >
            <p className="text-slate-300 font-outfit mb-2">
              Precisa de ajuda? Entre em contato com nosso suporte
            </p>
            <p className="text-cyan-400 font-poppins font-bold">
              📞 (11) 3000-0000 | 💬 Chat ao vivo
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
