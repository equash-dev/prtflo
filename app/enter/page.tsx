import type { Metadata } from 'next';
import { GateExperience } from '@/components/enter/GateExperience';
import { SITE } from '@/config/site';

export const metadata: Metadata = {
  title: { absolute: `${SITE.brandName} — private` },
  description: 'Elliott Quashie’s personal portfolio: motion, 3D, AI and a fictional fashion storefront. Enter with a password to explore.',
  robots: { index: false, follow: false },
};

export default function EnterPage() {
  return <GateExperience />;
}
