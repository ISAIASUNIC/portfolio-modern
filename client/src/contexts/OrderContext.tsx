import React, { createContext, useContext, useState } from 'react';

export interface Address {
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
}

export interface PaymentMethod {
  type: 'card' | 'pix' | 'cash';
  details?: {
    cardNumber?: string;
    cardName?: string;
    cardExpiry?: string;
    cardCvv?: string;
  };
}

export interface Order {
  id: string;
  items: any[];
  address: Address;
  paymentMethod: PaymentMethod;
  subtotal: number;
  deliveryFee: number;
  total: number;
  status: 'pending' | 'confirmed' | 'preparing' | 'on_the_way' | 'delivered';
  createdAt: Date;
  estimatedDelivery: Date;
}

interface OrderContextType {
  currentOrder: Order | null;
  address: Address | null;
  paymentMethod: PaymentMethod | null;
  setAddress: (address: Address) => void;
  setPaymentMethod: (method: PaymentMethod) => void;
  createOrder: (items: any[], subtotal: number, deliveryFee: number) => Order;
  confirmOrder: () => void;
  orders: Order[];
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export function OrderProvider({ children }: { children: React.ReactNode }) {
  const [address, setAddress] = useState<Address | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | null>(null);
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);

  const createOrder = (items: any[], subtotal: number, deliveryFee: number) => {
    if (!address || !paymentMethod) {
      throw new Error('Address and payment method are required');
    }

    const order: Order = {
      id: `ORD-${Date.now()}`,
      items,
      address,
      paymentMethod,
      subtotal,
      deliveryFee,
      total: subtotal + deliveryFee,
      status: 'pending',
      createdAt: new Date(),
      estimatedDelivery: new Date(Date.now() + 45 * 60000), // 45 minutes
    };

    setCurrentOrder(order);
    return order;
  };

  const confirmOrder = () => {
    if (currentOrder) {
      setOrders([...orders, { ...currentOrder, status: 'confirmed' }]);
      setCurrentOrder(null);
      setAddress(null);
      setPaymentMethod(null);
    }
  };

  return (
    <OrderContext.Provider
      value={{
        currentOrder,
        address,
        paymentMethod,
        setAddress,
        setPaymentMethod,
        createOrder,
        confirmOrder,
        orders,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}

export function useOrder() {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error('useOrder must be used within an OrderProvider');
  }
  return context;
}
