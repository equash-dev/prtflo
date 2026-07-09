import type { Metadata } from 'next';
import { CheckoutFunnel } from '@/components/checkout/CheckoutFunnel';

export const metadata: Metadata = { title: 'Checkout' };

export default function CheckoutPage() {
  return <CheckoutFunnel />;
}
