import React from 'react';

const Card = ({ 
  children, 
  className = '', 
  gradient = false,
  hover = true,
  variant = 'glass', // glass, solid, outlined
  ...props 
}) => {
  const baseStyles = "relative transition-all duration-300 overflow-hidden";
  
  const variants = {
    glass: "bg-dark-card/40 backdrop-blur-xl border border-white/5 shadow-xl",
    solid: "bg-dark-card border border-slate-800 shadow-lg",
    outlined: "bg-transparent border border-slate-700",
    gradient: "bg-gradient-to-br from-dark-card via-dark-card to-emerald-900/20 border border-white/5"
  };

  const hoverEffects = hover 
    ? "hover:shadow-[0_0_30px_rgba(52,211,153,0.1)] hover:border-emerald-500/30 hover:-translate-y-1" 
    : "";

  return (
    <div 
      className={`
        ${baseStyles} 
        ${variants[variant]} 
        ${hoverEffects}
        rounded-2xl
        ${className}
      `}
      {...props}
    >
      {gradient && (
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      )}
      {children}
    </div>
  );
};

export { Card };
export default Card;
