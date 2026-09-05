export function ConfidenceIndicator({ value, size = 'md' }: { value: number; size?: 'sm' | 'md' | 'lg' }) {
  const getColor = (v: number) => {
    if (v >= 80) return { bar: 'bg-green-500', text: 'text-green-400', label: 'High' };
    if (v >= 60) return { bar: 'bg-yellow-500', text: 'text-yellow-400', label: 'Medium' };
    if (v >= 40) return { bar: 'bg-orange-500', text: 'text-orange-400', label: 'Low' };
    return { bar: 'bg-purple-500', text: 'text-purple-400', label: 'Insufficient' };
  };
  const c = getColor(value);
  const height = size === 'sm' ? 'h-1.5' : size === 'lg' ? 'h-3' : 'h-2';
  const textSize = size === 'sm' ? 'text-xs' : size === 'lg' ? 'text-base' : 'text-sm';

  return (
    <div className="flex items-center gap-2">
      <div className={`flex-1 ${height} rounded-full bg-ink-700 overflow-hidden`}>
        <div
          className={`${height} ${c.bar} rounded-full transition-all duration-700 ease-out`}
          style={{ width: `${value}%` }}
        />
      </div>
      <span className={`${textSize} font-semibold ${c.text} tabular-nums`}>{value}%</span>
    </div>
  );
}
