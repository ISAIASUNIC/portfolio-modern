import { motion } from 'framer-motion';
import { Search, MapPin, Clock, Star, Flame } from 'lucide-react';
import { useState } from 'react';
import { useLocation } from 'wouter';
import PromoBanner from '@/components/PromoBanner';

/**
 * Delivery Home Page
 * Modern delivery app homepage with featured restaurants and search
 * Design: Dark mode with glassmorphism and premium interactions
 */
export default function DeliveryHome() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const restaurants = [
    {
      id: 1,
      name: 'Sakura Sushi',
      cuisine: 'Sushi & Japonês',
      rating: 4.8,
      reviews: 342,
      deliveryTime: '25-35 min',
      deliveryFee: 'Grátis',
      image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663573025369/Xyv9EonTUbeR6pycU65psv/sushi-platter-premium-9FsmqQUJsDFr9a9HWpCYMx.webp',
      isOpen: true,
      isPopular: true,
    },
    {
      id: 2,
      name: 'Ramen House',
      cuisine: 'Ramen & Noodles',
      rating: 4.6,
      reviews: 218,
      deliveryTime: '20-30 min',
      deliveryFee: 'R$ 5,00',
      image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663573025369/Xyv9EonTUbeR6pycU65psv/ramen-bowl-steaming-2EJEWn5vH5Qe6PHLGbRMNC.webp',
      isOpen: true,
      isPopular: false,
    },
    {
      id: 3,
      name: 'Tempura Deluxe',
      cuisine: 'Tempura & Fritos',
      rating: 4.7,
      reviews: 156,
      deliveryTime: '30-40 min',
      deliveryFee: 'Grátis',
      image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663573025369/Xyv9EonTUbeR6pycU65psv/tempura-assortment-KnLHJohDSHqyWh8gwxWk5V.webp',
      isOpen: true,
      isPopular: true,
    },
    {
      id: 4,
      name: 'Gyoza Master',
      cuisine: 'Gyoza & Dumplings',
      rating: 4.5,
      reviews: 289,
      deliveryTime: '25-35 min',
      deliveryFee: 'R$ 3,50',
      image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663573025369/Xyv9EonTUbeR6pycU65psv/gyoza-dumplings-8ZiBhq956z42qdbw8BH68i.webp',
      isOpen: true,
      isPopular: false,
    },
    {
      id: 5,
      name: 'Tonkatsu Premium',
      cuisine: 'Tonkatsu & Carnes',
      rating: 4.9,
      reviews: 412,
      deliveryTime: '35-45 min',
      deliveryFee: 'Grátis',
      image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663573025369/Xyv9EonTUbeR6pycU65psv/donburi-rice-bowl-Csk5G5SAogXusjwxuFfpbX.webp',
      isOpen: true,
      isPopular: true,
    },
    {
      id: 6,
      name: 'Matcha Café',
      cuisine: 'Café & Sobremesas',
      rating: 4.4,
      reviews: 178,
      deliveryTime: '15-25 min',
      deliveryFee: 'Grátis',
      image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663573025369/Xyv9EonTUbeR6pycU65psv/sushi-platter-premium-9FsmqQUJsDFr9a9HWpCYMx.webp',
      isOpen: true,
      isPopular: false,
    },
  ];

  const filters = ['all', 'popular', 'fast', 'rated'];

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
          className="mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-poppins font-bold mb-2">
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Delivery Moderno
            </span>
          </h1>
          <p className="text-slate-400 font-outfit">Comida fresca entregue rápido</p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8"
        >
          <div className="relative glass-dark p-4 rounded-xl flex items-center gap-3">
            <Search className="text-cyan-400" size={24} />
            <input
              type="text"
              placeholder="Buscar restaurantes ou pratos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent text-white font-outfit placeholder-slate-500 focus:outline-none"
            />
          </div>
        </motion.div>

        {/* Location Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8 flex items-center gap-2 text-slate-300 font-outfit"
        >
          <MapPin size={20} className="text-cyan-400" />
          <span>Entregando em: São Paulo, SP</span>
        </motion.div>

        {/* Promo Banner Carousel */}
        <PromoBanner />

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-12 flex gap-3 overflow-x-auto pb-2"
        >
          {filters.map((filter) => (
            <motion.button
              key={filter}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedFilter(filter)}
              className={`px-6 py-2 rounded-full font-outfit font-semibold whitespace-nowrap transition-all duration-300 ${
                selectedFilter === filter
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white'
                  : 'glass-dark text-slate-300 hover:text-cyan-400'
              }`}
            >
              {filter === 'all' && 'Todos'}
              {filter === 'popular' && '🔥 Popular'}
              {filter === 'fast' && '⚡ Rápido'}
              {filter === 'rated' && '⭐ Melhor Avaliado'}
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
          {restaurants.map((restaurant) => (
            <motion.div
              key={restaurant.id}
              variants={itemVariants}
              whileHover={{ y: -8 }}
              className="group cursor-pointer"
            >
              {/* Restaurant Card */}
              <div className="glass-dark rounded-xl overflow-hidden hover:border-cyan-400/50 transition-all duration-300">
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <motion.img
                    src={restaurant.image}
                    alt={restaurant.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />

                  {/* Badges */}
                  <div className="absolute top-3 right-3 flex gap-2">
                    {restaurant.isPopular && (
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        className="px-3 py-1 bg-red-500/80 text-white text-xs font-poppins font-bold rounded-full flex items-center gap-1"
                      >
                        <Flame size={14} /> Popular
                      </motion.div>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 space-y-3">
                  <div>
                    <h3 className="text-lg font-poppins font-bold text-white group-hover:text-cyan-400 transition-colors">
                      {restaurant.name}
                    </h3>
                    <p className="text-sm text-slate-400 font-outfit">{restaurant.cuisine}</p>
                  </div>

                  {/* Rating & Info */}
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-1">
                      <Star size={16} className="text-yellow-400 fill-yellow-400" />
                      <span className="font-outfit font-semibold text-white">
                        {restaurant.rating}
                      </span>
                      <span className="text-slate-500 font-outfit">
                        ({restaurant.reviews})
                      </span>
                    </div>
                  </div>

                  {/* Delivery Info */}
                  <div className="flex items-center justify-between text-xs text-slate-400 font-outfit">
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
                    onClick={() => window.location.href = `/restaurant/${restaurant.id}`}
                    className="w-full mt-4 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-outfit font-semibold rounded-lg hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300"
                  >
                    Ver Menu
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
