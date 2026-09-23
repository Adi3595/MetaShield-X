import React from 'react';

interface MetricBoxProps {
  label: string;
  value: string | number;
  trend?: string;
  isAlert?: boolean;
}

export function MetricBox({ label, value, trend, isAlert }: MetricBoxProps) {
  return (
    <div className={`p-6 border-b border-r border-white/20 flex flex-col justify-between hover:bg-white/[0.02] transition-colors ${isAlert ? 'bg-brand-alert/10' : ''}`}>
      <span className="font-space text-text-secondary text-[10px] font-bold uppercase tracking-[0.2em]">{label}</span>
      <div className="flex items-end justify-between mt-8">
        <span className={`font-inter font-black tracking-tighter text-3xl ${isAlert ? 'text-brand-alert' : 'text-white'}`}>
          {value}
        </span>
        {trend && (
          <span className={`font-space text-[10px] tracking-wider ${trend.startsWith('+') ? 'text-brand-accent' : 'text-white'}`}>
            {trend}
          </span>
        )}
      </div>
    </div>
  );
}
