import { motion } from 'framer-motion';
import { ArrowLeft, ShoppingCart, Plus, Minus, Star } from 'lucide-react';
import { useState } from 'react';
import { useCart } from '@/contexts/CartContext';

/**
 * Restaurant Menu Page
 * Product catalog with categories, filters and add to cart functionality
 * Design: Modern menu with glassmorphism and smooth interactions
 */
export default function RestaurantMenu() {
  const { addItem } = useCart();
  const [selectedCategory, setSelectedCategory] = useState('sushi');
  const [quantities, setQuantities] = useState<Record<string, number>>({});

  const restaurant = {
    name: 'Sakura Sushi',
    rating: 4.8,
    reviews: 342,
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663573025369/Xyv9EonTUbeR6pycU65psv/code-abstract-tech-hTR927RogMnvsjDysRdUF6.webp',
  };

  const categories = [
    { id: 'sushi', name: '🍣 Sushi', count: 12 },
    { id: 'rolls', name: '🌯 Rolls', count: 8 },
    { id: 'combos', name: '🍱 Combos', count: 6 },
    { id: 'drinks', name: '🥤 Bebidas', count: 5 },
  ];

  const products: Record<string, any[]> = {
    sushi: [
      {
        id: 's1',
        name: 'Sushi Salmão Premium',
        description: '6 peças de sushi com salmão fresco',
        price: 45.90,
        rating: 4.9,
        image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663573025369/Xyv9EonTUbeR6pycU65psv/code-abstract-tech-hTR927RogMnvsjDysRdUF6.webp',
      },
      {
        id: 's2',
        name: 'Sushi Atum',
        description: '6 peças de sushi com atum fresco',
        price: 42.90,
        rating: 4.8,
        image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663573025369/Xyv9EonTUbeR6pycU65psv/code-abstract-tech-hTR927RogMnvsjDysRdUF6.webp',
      },
      {
        id: 's3',
        name: 'Sushi Misto',
        description: '8 peças variadas com salmão, atum e peixe branco',
        price: 52.90,
        rating: 4.7,
        image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663573025369/Xyv9EonTUbeR6pycU65psv/code-abstract-tech-hTR927RogMnvsjDysRdUF6.webp',
      },
    ],
    rolls: [
      {
        id: 'r1',
        name: 'Philadelphia Roll',
        description: 'Salmão, cream cheese, pepino e abacate',
        price: 38.90,
        rating: 4.9,
        image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663573025369/Xyv9EonTUbeR6pycU65psv/code-abstract-tech-hTR927RogMnvsjDysRdUF6.webp',
      },
      {
        id: 'r2',
        name: 'Dragon Roll',
        description: 'Atum, abacate, pepino e gergelim',
        price: 42.90,
        rating: 4.8,
        image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663573025369/Xyv9EonTUbeR6pycU65psv/code-abstract-tech-hTR927RogMnvsjDysRdUF6.webp',
      },
    ],
    combos: [
      {
        id: 'c1',
        name: 'Combo Sakura',
        description: '12 sushi + 8 rolls + 2 bebidas',
        price: 89.90,
        rating: 4.9,
        image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663573025369/Xyv9EonTUbeR6pycU65psv/code-abstract-tech-hTR927RogMnvsjDysRdUF6.webp',
      },
    ],
    drinks: [
      {
        id: 'd1',
        name: 'Chá Gelado',
        description: 'Chá verde gelado',
        price: 8.90,
        rating: 4.6,
        image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663573025369/Xyv9EonTUbeR6pycU65psv/code-abstract-tech-hTR927RogMnvsjDysRdUF6.webp',
      },
    ],
  };

  const handleAddToCart = (product: any) => {
    const quantity = quantities[product.id] || 1;
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity,
      image: product.image,
      restaurantId: restaurant.name,
    });
    setQuantities({ ...quantities, [product.id]: 0 });
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
    <div className="min-h-screen bg-slate-900 pt-24 pb-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8 flex items-center justify-between"
        >
          <div className="flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-lg bg-slate-800/50 hover:bg-slate-700/50 transition-colors"
            >
              <ArrowLeft size={24} className="text-cyan-400" />
            </motion.button>
            <div>
              <h1 className="text-3xl font-poppins font-bold text-white">{restaurant.name}</h1>
              <div className="flex items-center gap-2 text-slate-400 font-outfit">
                <Star size={16} className="text-yellow-400 fill-yellow-400" />
                <span>{restaurant.rating}</span>
                <span>({restaurant.reviews} avaliações)</span>
              </div>
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="p-3 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-white relative"
          >
            <ShoppingCart size={24} />
            <span className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
              0
            </span>
          </motion.button>
        </motion.div>

        {/* Categories */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8 flex gap-3 overflow-x-auto pb-2"
        >
          {categories.map((category) => (
            <motion.button
              key={category.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-2 rounded-full font-outfit font-semibold whitespace-nowrap transition-all duration-300 ${
                selectedCategory === category.id
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white'
                  : 'glass-dark text-slate-300 hover:text-cyan-400'
              }`}
            >
              {category.name}
            </motion.button>
          ))}
        </motion.div>

        {/* Products Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {products[selectedCategory]?.map((product) => (
            <motion.div
              key={product.id}
              variants={itemVariants}
              whileHover={{ y: -8 }}
              className="glass-dark rounded-xl overflow-hidden hover:border-cyan-400/50 transition-all duration-300"
            >
              {/* Product Image */}
              <div className="relative h-48 overflow-hidden">
                <motion.img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
              </div>

              {/* Content */}
              <div className="p-4 space-y-3">
                <div>
                  <h3 className="text-lg font-poppins font-bold text-white">{product.name}</h3>
                  <p className="text-sm text-slate-400 font-outfit">{product.description}</p>
                </div>

                {/* Rating & Price */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <Star size={16} className="text-yellow-400 fill-yellow-400" />
                    <span className="text-white font-outfit font-semibold">{product.rating}</span>
                  </div>
                  <span className="text-cyan-400 font-poppins font-bold text-lg">
                    R$ {product.price.toFixed(2)}
                  </span>
                </div>

                {/* Quantity & Add Button */}
                <div className="flex items-center gap-2 pt-2">
                  <div className="flex items-center gap-2 bg-slate-800/50 rounded-lg p-1">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() =>
                        setQuantities({
                          ...quantities,
                          [product.id]: Math.max(0, (quantities[product.id] || 1) - 1),
                        })
                      }
                      className="p-1 hover:bg-slate-700 rounded transition-colors"
                    >
                      <Minus size={16} className="text-cyan-400" />
                    </motion.button>
                    <span className="w-8 text-center text-white font-outfit font-semibold">
                      {quantities[product.id] || 1}
                    </span>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() =>
                        setQuantities({
                          ...quantities,
                          [product.id]: (quantities[product.id] || 1) + 1,
                        })
                      }
                      className="p-1 hover:bg-slate-700 rounded transition-colors"
                    >
                      <Plus size={16} className="text-cyan-400" />
                    </motion.button>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAddToCart(product)}
                    className="flex-1 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-outfit font-semibold rounded-lg hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300"
                  >
                    Adicionar
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
