// src/hooks/usePaystack.ts
import { usePaystackPayment } from 'react-paystack';

interface UsePaystackArgs {
  email: string;
  amount: number | null;
  onSuccess: () => void;
  onClose?: () => void;
}

export const usePaystack = ({ email, amount, onSuccess, onClose }: UsePaystackArgs) => {
  const config = {
    reference: `ref-${Date.now()}`,
    email,
    amount: (amount ?? 10000) * 100, // Paystack expects amount in kobo
    currency: 'KES',
    publicKey: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY,
  };

  const initializePayment = usePaystackPayment(config);

  return () =>
    initializePayment({
      onSuccess,
      onClose,
    });
};
