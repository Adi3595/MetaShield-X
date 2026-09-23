import React from 'react';

interface CardProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export function Card({ title, children, className = '' }: CardProps) {
  return (
    <div className={`editorial-panel ${className}`}>
      {title && (
        <div className="px-8 py-5 border-b border-border bg-white/[0.02]">
          <h3 className="tech-heading text-lg">
            {title}
          </h3>
        </div>
      )}
      <div className={title ? 'p-8' : 'p-0'}>{children}</div>
    </div>
  );
}
