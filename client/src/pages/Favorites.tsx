import { motion } from 'framer-motion';
import { ArrowLeft, Heart, Star, Clock } from 'lucide-react';
import { useState } from 'react';

/**
 * Favorites Page
 * View saved favorite restaurants
 * Design: Modern grid with glassmorphism
 */
export default function Favorites() {
  const [favorites, setFavorites] = useState([
    {
      id: 'sakura-sushi',
      name: 'Sakura Sushi',
      rating: 4.8,
      reviews: 342,
      deliveryTime: '30-45 min',
      deliveryFee: 'R$ 5,00',
      image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663573025369/Xyv9EonTUbeR6pycU65psv/sushi-platter-premium-9FsmqQUJsDFr9a9HWpCYMx.webp',
      isFavorite: true,
    },
    {
      id: 'ramen-house',
      name: 'Ramen House',
      rating: 4.7,
      reviews: 287,
      deliveryTime: '25-35 min',
      deliveryFee: 'R$ 4,00',
      image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663573025369/Xyv9EonTUbeR6pycU65psv/ramen-bowl-steaming-2EJEWn5vH5Qe6PHLGbRMNC.webp',
      isFavorite: true,
    },
  ]);

  const toggleFavorite = (id: string) => {
    setFavorites(favorites.filter((fav) => fav.id !== id));
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
            <h1 className="text-3xl font-poppins font-bold text-white">Favoritos</h1>
            <p className="text-slate-400 font-outfit">Seus restaurantes salvos</p>
          </div>
        </motion.div>

        {/* Favorites Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {favorites.map((restaurant) => (
            <motion.div
              key={restaurant.id}
              variants={itemVariants}
              whileHover={{ y: -8 }}
              className="glass-dark rounded-xl overflow-hidden hover:border-cyan-400/50 transition-all duration-300 relative group"
            >
              {/* Restaurant Image */}
              <div className="relative h-48 overflow-hidden">
                <motion.img
                  src={restaurant.image}
                  alt={restaurant.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />

                {/* Favorite Button */}
                <motion.button
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => toggleFavorite(restaurant.id)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-white/20 hover:bg-red-500/80 transition-all duration-300 backdrop-blur-sm"
                >
                  <Heart
                    size={20}
                    className="text-red-500 fill-red-500"
                  />
                </motion.button>
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
        {favorites.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <Heart size={48} className="mx-auto mb-4 text-slate-600" />
            <p className="text-slate-400 font-outfit text-lg">Nenhum favorito salvo</p>
            <p className="text-slate-500 font-outfit text-sm mt-2">
              Clique no ❤️ para salvar seus restaurantes favoritos
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
