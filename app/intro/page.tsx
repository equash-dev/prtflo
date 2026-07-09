import type { Metadata } from 'next';
import { Arrival } from '@/components/intro/Arrival';
import { BeliefPlates } from '@/components/intro/BeliefPlates';
import { SignatureReveal } from '@/components/intro/SignatureReveal';
import { DisclosureExit } from '@/components/intro/DisclosureExit';

export const metadata: Metadata = {
  title: 'About the project',
  description:
    'Not a real shop. A portfolio piece: a fashion house that exists entirely as generated imagery.',
};

export default function IntroPage() {
  return (
    <div className="bg-ground text-canvas">
      <Arrival />
      <BeliefPlates />
      <SignatureReveal />
      <DisclosureExit />
    </div>
  );
}
