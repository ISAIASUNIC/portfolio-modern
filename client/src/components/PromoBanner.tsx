import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Zap, Check } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useCoupon } from '@/contexts/CouponContext';
import { toast } from 'sonner';

/**
 * Promo Banner Carousel Component
 * Auto-rotating carousel with promotional banners
 * Design: Modern glassmorphism with smooth transitions
 */
interface PromoItem {
  id: number;
  title: string;
  description: string;
  discount: string;
  image: string;
  color: string;
  cta: string;
  couponCode?: string;
}

interface PromoBannerProps {
  items?: PromoItem[];
}

export default function PromoBanner({ items }: PromoBannerProps) {
  const { applyCoupon, appliedCoupon } = useCoupon();
  const [appliedPromoId, setAppliedPromoId] = useState<number | null>(null);
  
  const defaultItems: PromoItem[] = [
    {
      id: 1,
      title: 'Sushi Delight',
      description: 'Sushi Premium com 50% OFF',
      discount: '50%',
      image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663573025369/Xyv9EonTUbeR6pycU65psv/promo-banner-sushi-50off-itA3DeFo35mEjg9ftNbFdj.webp',
      color: 'from-cyan-500 to-blue-600',
      cta: 'Ver Oferta',
      couponCode: 'SUSHI50',
    },
    {
      id: 2,
      title: 'Ramen Combo Deal',
      description: 'Ramen + Acompanhamento + Bebida',
      discount: 'R$ 14,99',
      image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663573025369/Xyv9EonTUbeR6pycU65psv/promo-banner-ramen-combo-4AERYtn6TVCwm7EVbrn56f.webp',
      color: 'from-orange-500 to-red-600',
      cta: 'Pedir Agora',
      couponCode: 'RAMEN30',
    },
    {
      id: 3,
      title: 'Frete Grátis',
      description: 'Entrega Gratuita em Pedidos Acima de R$ 50',
      discount: 'Grátis',
      image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663573025369/Xyv9EonTUbeR6pycU65psv/promo-banner-frete-gratis-iMmEdcji6NLEen5c5QgRRw.webp',
      color: 'from-green-500 to-emerald-600',
      cta: 'Aproveitar',
      couponCode: 'FRETE10',
    },
  ];

  const promoItems = items || defaultItems;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  const handleApplyCoupon = (couponCode?: string) => {
    if (!couponCode) {
      toast.error('Cupom não disponível');
      return;
    }

    const result = applyCoupon(couponCode);
    if (result.success) {
      setAppliedPromoId(currentIndex);
      toast.success(`Cupom ${couponCode} aplicado com sucesso!`);
      setTimeout(() => setAppliedPromoId(null), 2000);
    } else {
      toast.error(result.message);
    }
  };

  useEffect(() => {
    if (!autoPlay) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % promoItems.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [autoPlay, promoItems.length]);

  const goToPrevious = () => {
    setAutoPlay(false);
    setCurrentIndex((prev) => (prev - 1 + promoItems.length) % promoItems.length);
    setTimeout(() => setAutoPlay(true), 3000);
  };

  const goToNext = () => {
    setAutoPlay(false);
    setCurrentIndex((prev) => (prev + 1) % promoItems.length);
    setTimeout(() => setAutoPlay(true), 3000);
  };

  const goToSlide = (index: number) => {
    setAutoPlay(false);
    setCurrentIndex(index);
    setTimeout(() => setAutoPlay(true), 3000);
  };

  const currentItem = promoItems[currentIndex];

  const slideVariants = {
    enter: { opacity: 0, x: 100 },
    center: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -100 },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative w-full mb-12"
    >
      {/* Main Carousel */}
      <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden glass-dark border border-slate-700/50">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentItem.id}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            {/* Background Image */}
            <img
              src={currentItem.image}
              alt={currentItem.title}
              className="w-full h-full object-cover"
            />

            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-slate-900/40 to-transparent" />

            {/* Content */}
            <div className="absolute inset-0 flex items-center justify-between px-6 md:px-12">
              <div className="flex-1 space-y-4">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="flex items-center gap-2"
                >
                  <Zap size={20} className="text-yellow-400" />
                  <span className="text-sm font-outfit font-bold text-yellow-400 uppercase">
                    Oferta do Dia
                  </span>
                </motion.div>

                <motion.h2
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-2xl md:text-4xl font-poppins font-bold text-white"
                >
                  {currentItem.title}
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-sm md:text-base text-slate-300 font-outfit max-w-md"
                >
                  {currentItem.description}
                </motion.p>

                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleApplyCoupon(currentItem.couponCode)}
                  className={`px-6 py-3 font-outfit font-semibold rounded-lg hover:shadow-lg transition-all duration-300 flex items-center gap-2 ${
                    appliedPromoId === currentIndex
                      ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white'
                      : `bg-gradient-to-r ${currentItem.color} text-white`
                  }`}
                >
                  {appliedPromoId === currentIndex ? (
                    <>
                      <Check size={18} />
                      Cupom Aplicado!
                    </>
                  ) : (
                    currentItem.cta
                  )}
                </motion.button>
              </div>

              {/* Discount Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                className={`hidden md:flex items-center justify-center w-32 h-32 rounded-full bg-gradient-to-r ${currentItem.color} shadow-2xl`}
              >
                <div className="text-center">
                  <p className="text-white text-sm font-outfit font-bold">Desconto</p>
                  <p className="text-white text-3xl font-poppins font-bold">
                    {currentItem.discount}
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={goToPrevious}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white/20 hover:bg-white/30 text-white transition-all duration-300 backdrop-blur-sm"
          aria-label="Previous slide"
        >
          <ChevronLeft size={24} />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={goToNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white/20 hover:bg-white/30 text-white transition-all duration-300 backdrop-blur-sm"
          aria-label="Next slide"
        >
          <ChevronRight size={24} />
        </motion.button>
      </div>

      {/* Dot Indicators */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="flex justify-center gap-3 mt-6"
      >
        {promoItems.map((_, index) => (
          <motion.button
            key={index}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-300 rounded-full ${
              index === currentIndex
                ? 'w-8 h-3 bg-gradient-to-r from-cyan-500 to-blue-600'
                : 'w-3 h-3 bg-slate-600 hover:bg-slate-500'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </motion.div>

      {/* Auto-play Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-center mt-4"
      >
        <p className="text-xs text-slate-500 font-outfit">
          {autoPlay ? '⏱️ Auto-rotacionando' : '⏸️ Pausado'}
        </p>
      </motion.div>
    </motion.div>
  );
}
