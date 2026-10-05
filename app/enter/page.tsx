import type { Metadata } from 'next';
import { GateExperience } from '@/components/enter/GateExperience';
import { SITE } from '@/config/site';

export const metadata: Metadata = {
  title: { absolute: `${SITE.brandName} — private` },
  description: 'AI orchestration and batch automation by Elliott Quashie. From a creative brief to a complete fashion storefront. Enter with a password to explore.',
  robots: { index: false, follow: false },
};

export default function EnterPage() {
  return <GateExperience />;
}
