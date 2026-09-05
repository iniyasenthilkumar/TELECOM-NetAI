import { Link } from 'react-router-dom';
import type { ReactNode } from 'react';

interface ButtonLinkProps {
  to: string;
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  className?: string;
}

export function ButtonLink({ to, children, variant = 'primary', className = '' }: ButtonLinkProps) {
  const base = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    ghost: 'btn-ghost',
  }[variant];

  return (
    <Link to={to} className={`${base} ${className}`}>
      {children}
    </Link>
  );
}
