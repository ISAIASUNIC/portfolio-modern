import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, Star, Check } from 'lucide-react';
import { useState } from 'react';
import { useCart } from '@/contexts/CartContext';
import { toast } from 'sonner';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  rating: number;
  image: string;
}

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  restaurantName: string;
}

export default function ProductModal({
  product,
  isOpen,
  onClose,
  restaurantName,
}: ProductModalProps) {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  if (!product) return null;

  const handleAddToCart = () => {
    if (quantity === 0) {
      toast.error('Selecione uma quantidade');
      return;
    }

    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity,
      image: product.image,
      restaurantId: restaurantName,
    });

    setIsAdded(true);
    toast.success(`${product.name} adicionado ao carrinho!`);

    setTimeout(() => {
      setQuantity(1);
      setIsAdded(false);
      onClose();
    }, 1500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-40"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="glass-dark rounded-2xl max-w-md w-full overflow-hidden max-h-[90vh] overflow-y-auto">
              {/* Close Button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={onClose}
                className="absolute top-4 right-4 z-10 p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 transition-colors"
              >
                <X size={24} className="text-slate-400" />
              </motion.button>

              {/* Product Image */}
              <div className="relative h-64 overflow-hidden">
                <motion.img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  layoutId={`product-image-${product.id}`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                {/* Header */}
                <div>
                  <h2 className="text-2xl font-poppins font-bold text-white mb-2">
                    {product.name}
                  </h2>
                  <p className="text-slate-400 font-outfit">{product.description}</p>
                </div>

                {/* Rating & Price */}
                <div className="flex items-center justify-between py-3 border-y border-slate-700/50">
                  <div className="flex items-center gap-2">
                    <Star size={18} className="text-yellow-400 fill-yellow-400" />
                    <span className="text-white font-poppins font-semibold">{product.rating}</span>
                  </div>
                  <div className="text-right">
                    <p className="text-slate-400 text-sm font-outfit">Preço unitário</p>
                    <p className="text-2xl font-poppins font-bold text-cyan-400">
                      R$ {product.price.toFixed(2)}
                    </p>
                  </div>
                </div>

                {/* Quantity Selector */}
                <div className="space-y-3">
                  <p className="text-sm font-outfit font-semibold text-slate-300">Quantidade</p>
                  <div className="flex items-center justify-between bg-slate-800/50 rounded-lg p-3">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-2 hover:bg-slate-700 rounded transition-colors"
                    >
                      <Minus size={18} className="text-cyan-400" />
                    </motion.button>

                    <div className="flex-1 text-center">
                      <p className="text-2xl font-poppins font-bold text-white">{quantity}</p>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-2 hover:bg-slate-700 rounded transition-colors"
                    >
                      <Plus size={18} className="text-cyan-400" />
                    </motion.button>
                  </div>
                </div>

                {/* Total */}
                <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-4">
                  <p className="text-slate-400 text-sm font-outfit mb-1">Total</p>
                  <p className="text-3xl font-poppins font-bold text-cyan-400">
                    R$ {(product.price * quantity).toFixed(2)}
                  </p>
                </div>

                {/* Add to Cart Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAddToCart}
                  disabled={isAdded}
                  className={`w-full py-4 font-outfit font-semibold rounded-lg transition-all duration-300 flex items-center justify-center gap-2 ${
                    isAdded
                      ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white'
                      : 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:shadow-lg hover:shadow-cyan-500/50'
                  }`}
                >
                  {isAdded ? (
                    <>
                      <Check size={20} />
                      Adicionado ao Carrinho!
                    </>
                  ) : (
                    'Adicionar ao Carrinho'
                  )}
                </motion.button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
