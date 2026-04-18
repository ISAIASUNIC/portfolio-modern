import { motion } from 'framer-motion';
import { ArrowLeft, MapPin, CreditCard, Zap } from 'lucide-react';
import { useState } from 'react';
import { useCart } from '@/contexts/CartContext';
import { useOrder } from '@/contexts/OrderContext';
import AddressForm from '@/components/AddressForm';
import PaymentForm from '@/components/PaymentForm';

/**
 * Checkout Page
 * Complete checkout flow with address and payment selection
 * Design: Modern multi-step form with glassmorphism
 */
export default function Checkout() {
  const { items, total, clearCart } = useCart();
  const { setAddress, setPaymentMethod, createOrder } = useOrder();
  const [step, setStep] = useState<'address' | 'payment' | 'review'>('address');
  const [formData, setFormData] = useState<{
    address: any | null;
    paymentMethod: any | null;
  }>({
    address: null,
    paymentMethod: null,
  });

  const deliveryFee = 5.0;
  const finalTotal = total + deliveryFee;

  const handleAddressSubmit = (address: any) => {
    setFormData({ ...formData, address });
    setAddress(address);
    setStep('payment');
  };

  const handlePaymentSubmit = (paymentMethod: any) => {
    setFormData({ ...formData, paymentMethod });
    setPaymentMethod(paymentMethod);
    setStep('review');
  };

  const handleConfirmOrder = () => {
    if (formData.address && formData.paymentMethod) {
      createOrder(items, total, deliveryFee);
      clearCart();
      // Redirect to confirmation page
      window.location.href = '/order-confirmation';
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div className="min-h-screen bg-slate-900 pt-24 pb-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 flex items-center gap-4"
        >
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.history.back()}
            className="p-2 rounded-lg bg-slate-800/50 hover:bg-slate-700/50 transition-colors"
          >
            <ArrowLeft size={24} className="text-cyan-400" />
          </motion.button>
          <div>
            <h1 className="text-3xl font-poppins font-bold text-white">Finalizar Pedido</h1>
            <p className="text-slate-400 font-outfit">Passo {step === 'address' ? '1' : step === 'payment' ? '2' : '3'} de 3</p>
          </div>
        </motion.div>

        {/* Progress Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8 flex gap-2"
        >
          {(['address', 'payment', 'review'] as const).map((s, index) => (
            <motion.div
              key={s}
              className={`flex-1 h-2 rounded-full transition-all duration-300 ${
                step === s || (step === 'payment' && index < 2) || (step === 'review' && index < 3)
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600'
                  : 'bg-slate-700'
              }`}
            />
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-2"
          >
            {/* Address Step */}
            {step === 'address' && (
              <motion.div variants={itemVariants}>
                <AddressForm onSubmit={handleAddressSubmit} />
              </motion.div>
            )}

            {/* Payment Step */}
            {step === 'payment' && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <PaymentForm onSubmit={handlePaymentSubmit} />
              </motion.div>
            )}

            {/* Review Step */}
            {step === 'review' && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-6"
              >
                {/* Address Review */}
                <div className="glass-dark p-6 rounded-xl space-y-4">
                  <div className="flex items-center gap-3 mb-4">
                    <MapPin className="text-cyan-400" size={24} />
                    <h2 className="text-xl font-poppins font-bold text-white">Endereço de Entrega</h2>
                  </div>
                  {formData.address && (
                    <div className="text-slate-300 font-outfit space-y-2">
                      <p>
                        {formData.address.street}, {formData.address.number}
                      </p>
                      {formData.address.complement && <p>{formData.address.complement}</p>}
                      <p>
                        {formData.address.neighborhood}, {formData.address.city} - {formData.address.state}
                      </p>
                      <p>CEP: {formData.address.zipCode}</p>
                    </div>
                  )}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setStep('address')}
                    className="mt-4 text-cyan-400 hover:text-cyan-300 font-outfit font-semibold transition-colors"
                  >
                    Alterar Endereço
                  </motion.button>
                </div>

                {/* Payment Review */}
                <div className="glass-dark p-6 rounded-xl space-y-4">
                  <div className="flex items-center gap-3 mb-4">
                    <CreditCard className="text-cyan-400" size={24} />
                    <h2 className="text-xl font-poppins font-bold text-white">Forma de Pagamento</h2>
                  </div>
                  {formData.paymentMethod && (
                    <div className="text-slate-300 font-outfit">
                      <p className="capitalize">
                        {(formData.paymentMethod as any).type === 'card'
                          ? 'Cartão de Crédito'
                          : (formData.paymentMethod as any).type === 'pix'
                          ? 'PIX'
                          : 'Dinheiro'}
                      </p>
                      {(formData.paymentMethod as any).details?.cardNumber && (
                        <p className="text-sm">
                          Terminado em {(formData.paymentMethod as any).details.cardNumber.slice(-4)}
                        </p>
                      )}
                    </div>
                  )}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setStep('payment')}
                    className="mt-4 text-cyan-400 hover:text-cyan-300 font-outfit font-semibold transition-colors"
                  >
                    Alterar Pagamento
                  </motion.button>
                </div>

                {/* Confirm Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleConfirmOrder}
                  className="w-full px-6 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-outfit font-semibold rounded-lg hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300"
                >
                  Confirmar Pedido
                </motion.button>
              </motion.div>
            )}
          </motion.div>

          {/* Order Summary Sidebar */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-1"
          >
            <div className="glass-dark p-6 rounded-xl sticky top-32 space-y-6">
              <h2 className="text-xl font-poppins font-bold text-white">Resumo do Pedido</h2>

              {/* Items */}
              <div className="space-y-3 max-h-48 overflow-y-auto">
                {items.map((item) => (
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

              {/* Divider */}
              <div className="h-px bg-slate-700/50" />

              {/* Totals */}
              <div className="space-y-2 text-sm font-outfit">
                <div className="flex justify-between text-slate-400">
                  <span>Subtotal</span>
                  <span>R$ {total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Taxa de Entrega</span>
                  <span>R$ {deliveryFee.toFixed(2)}</span>
                </div>
                <div className="h-px bg-slate-700/50" />
                <div className="flex justify-between text-white font-poppins font-bold text-lg">
                  <span>Total</span>
                  <span className="text-cyan-400">R$ {finalTotal.toFixed(2)}</span>
                </div>
              </div>

              {/* Estimated Delivery */}
              <div className="flex items-center gap-2 p-3 bg-cyan-500/10 rounded-lg">
                <Zap size={16} className="text-cyan-400" />
                <div className="text-sm font-outfit">
                  <p className="text-slate-300">Entrega estimada</p>
                  <p className="text-cyan-400 font-semibold">45 minutos</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
