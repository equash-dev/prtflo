import type { Metadata } from 'next';
import { Arrival } from '@/components/intro/Arrival';

export const metadata: Metadata = {
  title: 'About the project',
  description:
    'How creative direction, AI generation and batch automation connect a creative brief to a complete fashion storefront.',
};

export default function IntroPage() {
  return (
    <div className="bg-ground text-canvas">
      <Arrival />
    </div>
  );
}
