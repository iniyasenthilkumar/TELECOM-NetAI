import { Radar } from 'lucide-react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

export function Logo({ size = 'md', showText = true }: LogoProps) {
  const iconSize = size === 'sm' ? 'h-7 w-7' : size === 'lg' ? 'h-10 w-10' : 'h-8 w-8';
  const textSize = size === 'sm' ? 'text-base' : size === 'lg' ? 'text-xl' : 'text-lg';
  const subSize = size === 'sm' ? 'text-[9px]' : 'text-[10px]';

  return (
    <div className="flex items-center gap-2.5">
      <div className={`${iconSize} flex items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 glow-brand`}>
        <Radar className="h-1/2 w-1/2 text-white" />
      </div>
      {showText && (
        <div className="flex flex-col leading-none">
          <span className={`${textSize} font-bold text-ink-50 tracking-tight`}>
            NetSentry <span className="text-brand-400">AI</span>
          </span>
          <span className={`${subSize} text-ink-400 font-medium tracking-wider uppercase`}>
            Network Triage
          </span>
        </div>
      )}
    </div>
  );
}
