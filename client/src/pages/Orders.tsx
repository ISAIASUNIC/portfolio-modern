import { motion } from 'framer-motion';
import { ArrowLeft, Clock, MapPin, CheckCircle, Truck } from 'lucide-react';

/**
 * Orders Page
 * View all user orders and their status
 * Design: Modern list with glassmorphism
 */
export default function Orders() {
  const orders = [
    {
      id: 'ORD-001',
      restaurant: 'Sakura Sushi',
      date: '19 de Abril, 2026',
      time: '14:30',
      total: 'R$ 89,90',
      status: 'delivered',
      items: 3,
      rating: 4.8,
    },
    {
      id: 'ORD-002',
      restaurant: 'Ramen House',
      date: '18 de Abril, 2026',
      time: '19:45',
      total: 'R$ 54,50',
      status: 'delivered',
      items: 2,
      rating: 4.7,
    },
    {
      id: 'ORD-003',
      restaurant: 'Tempura Premium',
      date: '17 de Abril, 2026',
      time: '12:15',
      total: 'R$ 125,00',
      status: 'delivered',
      items: 5,
      rating: 4.9,
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered':
        return <CheckCircle size={20} className="text-green-400" />;
      case 'on_the_way':
        return <Truck size={20} className="text-cyan-400" />;
      case 'preparing':
        return <Clock size={20} className="text-yellow-400" />;
      default:
        return <Clock size={20} className="text-slate-400" />;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'Entregue';
      case 'on_the_way':
        return 'A caminho';
      case 'preparing':
        return 'Preparando';
      default:
        return 'Pendente';
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
          className="mb-8 flex items-center gap-4"
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
            <h1 className="text-3xl font-poppins font-bold text-white">Meus Pedidos</h1>
            <p className="text-slate-400 font-outfit">Histórico de pedidos e status</p>
          </div>
        </motion.div>

        {/* Orders List */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-4"
        >
          {orders.map((order) => (
            <motion.div
              key={order.id}
              variants={itemVariants}
              whileHover={{ x: 4 }}
              className="glass-dark rounded-xl p-6 hover:border-cyan-400/50 transition-all duration-300 cursor-pointer"
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-poppins font-bold text-white">{order.restaurant}</h3>
                  <p className="text-sm text-slate-400 font-outfit">{order.id}</p>
                </div>
                <div className="flex items-center gap-2">
                  {getStatusIcon(order.status)}
                  <span className="text-sm font-outfit font-semibold text-slate-300">
                    {getStatusLabel(order.status)}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-4 border-y border-slate-700/50">
                <div>
                  <p className="text-xs text-slate-500 font-outfit mb-1">Data</p>
                  <p className="text-sm font-outfit font-semibold text-white">{order.date}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-outfit mb-1">Horário</p>
                  <p className="text-sm font-outfit font-semibold text-white">{order.time}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-outfit mb-1">Itens</p>
                  <p className="text-sm font-outfit font-semibold text-white">{order.items} itens</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-outfit mb-1">Total</p>
                  <p className="text-sm font-outfit font-semibold text-cyan-400">{order.total}</p>
                </div>
              </div>

              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className={`text-lg ${i < Math.floor(order.rating) ? '⭐' : '☆'}`}
                    >
                      {i < Math.floor(order.rating) ? '⭐' : '☆'}
                    </span>
                  ))}
                  <span className="text-sm text-slate-400 font-outfit ml-2">{order.rating}</span>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-outfit font-semibold rounded-lg hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300"
                >
                  Repetir Pedido
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Empty State */}
        {orders.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-slate-400 font-outfit text-lg">Nenhum pedido encontrado</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
