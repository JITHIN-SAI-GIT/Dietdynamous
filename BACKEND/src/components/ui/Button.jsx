import React from 'react';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  isLoading = false, 
  icon: Icon,
  loading, // Filter out if passed accidentally
  ...props 
}) => {
  const baseStyles = "relative inline-flex items-center justify-center font-medium transition-all duration-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-dark-BG disabled:opacity-50 disabled:cursor-not-allowed group overflow-hidden";
  
  const variants = {
    primary: "bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:shadow-[0_0_20px_rgba(52,211,153,0.4)] border border-transparent",
    secondary: "bg-dark-card border border-slate-700 text-slate-200 hover:border-emerald-500/50 hover:text-emerald-400 hover:bg-dark-card/80",
    outline: "bg-transparent border-2 border-emerald-500/50 text-emerald-400 hover:bg-emerald-500/10",
    ghost: "bg-transparent text-slate-400 hover:text-emerald-400 hover:bg-white/5",
    danger: "bg-gradient-to-r from-red-500 to-pink-600 text-white hover:shadow-[0_0_20px_rgba(239,68,68,0.4)]",
    glow: "bg-emerald-500/20 text-emerald-300 border border-emerald-500/50 shadow-[0_0_15px_rgba(52,211,153,0.2)] hover:bg-emerald-500/30 hover:shadow-[0_0_25px_rgba(52,211,153,0.4)]"
  };

  const sizes = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-5 py-2.5 text-sm",
    lg: "px-8 py-3.5 text-base",
    xl: "px-10 py-4 text-lg"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={isLoading}
      {...props}
    >
      {isLoading && (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      {!isLoading && Icon && <Icon className="w-5 h-5 mr-2 transition-transform group-hover:scale-110" />}
      <span className="relative z-10 font-bold tracking-wide">{children}</span>
      
      {/* Shine effect for primary buttons */}
      {variant === 'primary' && !isLoading && (
        <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent z-0" />
      )}
    </button>
  );
};

export { Button };
export default Button;
