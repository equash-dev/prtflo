import type { ButtonHTMLAttributes, ReactNode } from 'react';
import Link from 'next/link';

type Variant = 'primary' | 'secondary' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

const variantClasses: Record<Variant, string> = {
  primary:
    'bg-ink text-canvas hover:opacity-90 focus-visible:ring-ink',
  secondary:
    'bg-transparent text-ink border border-ink hover:bg-panel focus-visible:ring-ink',
  ghost:
    'bg-transparent text-ink hover:bg-panel focus-visible:ring-hairline',
};

const sizeClasses: Record<Size, string> = {
  sm: 'h-9 px-5 text-[11px] tracking-[0.04em] uppercase',
  md: 'h-11 px-7 text-[12px] tracking-[0.04em] uppercase',
  lg: 'h-12 px-9 text-[13px] tracking-[0.04em] uppercase',
};

const base =
  'inline-flex items-center justify-center rounded-none font-normal transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-canvas disabled:opacity-50 disabled:cursor-not-allowed';

interface ButtonAsButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  href?: undefined;
}

interface ButtonAsLinkProps {
  variant?: Variant;
  size?: Size;
  href: string;
  className?: string;
  children?: ReactNode;
  prefetch?: boolean;
}

export function Button(props: ButtonAsButtonProps | ButtonAsLinkProps) {
  const variant = props.variant ?? 'primary';
  const size = props.size ?? 'md';
  const className = [
    base,
    variantClasses[variant],
    sizeClasses[size],
    props.className ?? '',
  ].join(' ');

  if ('href' in props && props.href) {
    const { href, children, prefetch } = props;
    return (
      <Link href={href} prefetch={prefetch} className={className}>
        {children}
      </Link>
    );
  }
  const { children, variant: _v, size: _s, className: _c, ...rest } = props as ButtonAsButtonProps;
  return (
    <button className={className} {...rest}>
      {children}
    </button>
  );
}
