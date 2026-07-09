import type { Metadata } from 'next';
import { GateExperience } from '@/components/enter/GateExperience';
import { SITE } from '@/config/site';

export const metadata: Metadata = {
  title: { absolute: `${SITE.brandName} — private` },
  description: 'A private preview.',
  robots: { index: false, follow: false },
};

export default function EnterPage() {
  return <GateExperience />;
}
