import React, { createContext, useContext, useState } from 'react';

export interface Coupon {
  code: string;
  description: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  minPurchase: number;
  maxDiscount?: number;
  expiresAt: Date;
  isActive: boolean;
  usageLimit?: number;
  usageCount: number;
}

interface CouponContextType {
  availableCoupons: Coupon[];
  appliedCoupon: Coupon | null;
  discountAmount: number;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  calculateDiscount: (subtotal: number) => number;
}

const CouponContext = createContext<CouponContextType | undefined>(undefined);

// Mock coupons database
const mockCoupons: Coupon[] = [
  {
    code: 'SUSHI50',
    description: '50% de desconto em Sushi',
    discountType: 'percentage',
    discountValue: 50,
    minPurchase: 0,
    maxDiscount: 50,
    expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    isActive: true,
    usageLimit: 100,
    usageCount: 23,
  },
  {
    code: 'RAMEN30',
    description: '30% de desconto em Ramen',
    discountType: 'percentage',
    discountValue: 30,
    minPurchase: 20,
    maxDiscount: 40,
    expiresAt: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
    isActive: true,
    usageLimit: 50,
    usageCount: 12,
  },
  {
    code: 'FRETE10',
    description: 'R$ 10 de desconto no frete',
    discountType: 'fixed',
    discountValue: 10,
    minPurchase: 30,
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    isActive: true,
    usageLimit: 200,
    usageCount: 87,
  },
  {
    code: 'BEMVINDO20',
    description: 'R$ 20 de desconto para novos clientes',
    discountType: 'fixed',
    discountValue: 20,
    minPurchase: 50,
    expiresAt: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
    isActive: true,
    usageLimit: 500,
    usageCount: 234,
  },
  {
    code: 'COMBO25',
    description: '25% de desconto em combos',
    discountType: 'percentage',
    discountValue: 25,
    minPurchase: 0,
    maxDiscount: 60,
    expiresAt: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000),
    isActive: true,
    usageLimit: 150,
    usageCount: 45,
  },
];

export function CouponProvider({ children }: { children: React.ReactNode }) {
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [discountAmount, setDiscountAmount] = useState(0);

  const applyCoupon = (code: string): { success: boolean; message: string } => {
    const coupon = mockCoupons.find((c) => c.code.toUpperCase() === code.toUpperCase());

    if (!coupon) {
      return { success: false, message: 'Cupom não encontrado' };
    }

    if (!coupon.isActive) {
      return { success: false, message: 'Cupom inativo' };
    }

    if (new Date() > coupon.expiresAt) {
      return { success: false, message: 'Cupom expirado' };
    }

    if (coupon.usageLimit && coupon.usageCount >= coupon.usageLimit) {
      return { success: false, message: 'Cupom atingiu o limite de uso' };
    }

    setAppliedCoupon(coupon);
    return { success: true, message: `Cupom "${code}" aplicado com sucesso!` };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setDiscountAmount(0);
  };

  const calculateDiscount = (subtotal: number): number => {
    if (!appliedCoupon) return 0;

    if (subtotal < appliedCoupon.minPurchase) {
      removeCoupon();
      return 0;
    }

    let discount = 0;

    if (appliedCoupon.discountType === 'percentage') {
      discount = (subtotal * appliedCoupon.discountValue) / 100;
      if (appliedCoupon.maxDiscount && discount > appliedCoupon.maxDiscount) {
        discount = appliedCoupon.maxDiscount;
      }
    } else {
      discount = appliedCoupon.discountValue;
    }

    setDiscountAmount(discount);
    return discount;
  };

  return (
    <CouponContext.Provider
      value={{
        availableCoupons: mockCoupons,
        appliedCoupon,
        discountAmount,
        applyCoupon,
        removeCoupon,
        calculateDiscount,
      }}
    >
      {children}
    </CouponContext.Provider>
  );
}

export function useCoupon() {
  const context = useContext(CouponContext);
  if (context === undefined) {
    throw new Error('useCoupon must be used within a CouponProvider');
  }
  return context;
}
