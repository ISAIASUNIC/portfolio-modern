import { motion } from 'framer-motion';
import { ArrowLeft, Star, Clock, Zap } from 'lucide-react';
import { useState } from 'react';
import { useCart } from '@/contexts/CartContext';

/**
 * Restaurants Page
 * Full list of restaurants with filters and search
 * Design: Modern grid with glassmorphism
 */
export default function Restaurants() {
  const { items } = useCart();
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const restaurants = [
    {
      id: 'sakura-sushi',
      name: 'Sakura Sushi',
      rating: 4.8,
      reviews: 342,
      deliveryTime: '30-45 min',
      deliveryFee: 'R$ 5,00',
      category: 'sushi',
      image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663573025369/Xyv9EonTUbeR6pycU65psv/sushi-platter-premium-9FsmqQUJsDFr9a9HWpCYMx.webp',
      isOpen: true,
    },
    {
      id: 'ramen-house',
      name: 'Ramen House',
      rating: 4.7,
      reviews: 287,
      deliveryTime: '25-35 min',
      deliveryFee: 'R$ 4,00',
      category: 'ramen',
      image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663573025369/Xyv9EonTUbeR6pycU65psv/ramen-bowl-steaming-2EJEWn5vH5Qe6PHLGbRMNC.webp',
      isOpen: true,
    },
    {
      id: 'tempura-premium',
      name: 'Tempura Premium',
      rating: 4.9,
      reviews: 156,
      deliveryTime: '40-50 min',
      deliveryFee: 'R$ 6,00',
      category: 'tempura',
      image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663573025369/Xyv9EonTUbeR6pycU65psv/tempura-assortment-7Wj8qZNvKL3mP9RsT2xY5b.webp',
      isOpen: true,
    },
    {
      id: 'gyoza-express',
      name: 'Gyoza Express',
      rating: 4.6,
      reviews: 198,
      deliveryTime: '20-30 min',
      deliveryFee: 'R$ 3,50',
      category: 'gyoza',
      image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663573025369/Xyv9EonTUbeR6pycU65psv/gyoza-dumplings-4Qw6eRtYpL2nM8sJ3vK1xZ.webp',
      isOpen: true,
    },
    {
      id: 'donburi-bowl',
      name: 'Donburi Bowl',
      rating: 4.5,
      reviews: 124,
      deliveryTime: '35-45 min',
      deliveryFee: 'R$ 5,50',
      category: 'donburi',
      image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663573025369/Xyv9EonTUbeR6pycU65psv/donburi-rice-bowl-6Hj9fKmNpQ4sL5uV7wX2yZ.webp',
      isOpen: true,
    },
  ];

  const filters = [
    { id: 'all', label: 'Todos' },
    { id: 'sushi', label: '🍣 Sushi' },
    { id: 'ramen', label: '🍜 Ramen' },
    { id: 'tempura', label: '🍤 Tempura' },
    { id: 'gyoza', label: '🥟 Gyoza' },
  ];

  const filteredRestaurants = restaurants.filter((restaurant) => {
    const matchesFilter = selectedFilter === 'all' || restaurant.category === selectedFilter;
    const matchesSearch = restaurant.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

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
            <h1 className="text-3xl font-poppins font-bold text-white">Restaurantes</h1>
            <p className="text-slate-400 font-outfit">Encontre seus restaurantes favoritos</p>
          </div>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <input
            type="text"
            placeholder="Buscar restaurante..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-6 py-3 bg-slate-800/50 border border-slate-700/50 rounded-lg text-white font-outfit placeholder-slate-500 focus:outline-none focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300"
          />
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8 flex gap-3 overflow-x-auto pb-2"
        >
          {filters.map((filter) => (
            <motion.button
              key={filter.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedFilter(filter.id)}
              className={`px-6 py-2 rounded-full font-outfit font-semibold whitespace-nowrap transition-all duration-300 ${
                selectedFilter === filter.id
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white'
                  : 'glass-dark text-slate-300 hover:text-cyan-400'
              }`}
            >
              {filter.label}
            </motion.button>
          ))}
        </motion.div>

        {/* Restaurants Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredRestaurants.map((restaurant) => (
            <motion.div
              key={restaurant.id}
              variants={itemVariants}
              whileHover={{ y: -8 }}
              onClick={() => (window.location.href = `/restaurant/${restaurant.id}`)}
              className="glass-dark rounded-xl overflow-hidden hover:border-cyan-400/50 transition-all duration-300 cursor-pointer"
            >
              {/* Restaurant Image */}
              <div className="relative h-48 overflow-hidden">
                <motion.img
                  src={restaurant.image}
                  alt={restaurant.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />

                {/* Status Badge */}
                {restaurant.isOpen && (
                  <div className="absolute top-4 right-4 flex items-center gap-1 px-3 py-1 bg-green-500/90 rounded-full">
                    <Zap size={14} className="text-white" />
                    <span className="text-xs font-outfit font-bold text-white">Aberto</span>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-4 space-y-3">
                <div>
                  <h3 className="text-lg font-poppins font-bold text-white">{restaurant.name}</h3>
                </div>

                {/* Rating & Reviews */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <Star size={16} className="text-yellow-400 fill-yellow-400" />
                    <span className="text-white font-outfit font-semibold">{restaurant.rating}</span>
                    <span className="text-slate-400 text-sm">({restaurant.reviews})</span>
                  </div>
                </div>

                {/* Delivery Info */}
                <div className="flex items-center justify-between text-xs text-slate-400 font-outfit pt-2 border-t border-slate-700/50">
                  <div className="flex items-center gap-1">
                    <Clock size={14} />
                    {restaurant.deliveryTime}
                  </div>
                  <div className="text-cyan-400 font-semibold">{restaurant.deliveryFee}</div>
                </div>

                {/* CTA Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => (window.location.href = `/restaurant/${restaurant.id}`)}
                  className="w-full mt-4 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-outfit font-semibold rounded-lg hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300"
                >
                  Ver Menu
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Empty State */}
        {filteredRestaurants.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-slate-400 font-outfit text-lg">Nenhum restaurante encontrado</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
