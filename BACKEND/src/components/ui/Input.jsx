import React, { useState } from 'react';

const Input = ({ 
  label, 
  id, 
  type = 'text', 
  error, 
  icon: Icon,
  className = '',
  containerClassName = '',
  ...props 
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);

  // Check if value exists to keep label floating
  const handleBlur = (e) => {
    setIsFocused(false);
    setHasValue(e.target.value.length > 0);
    props.onBlur && props.onBlur(e);
  };

  const handleChange = (e) => {
    setHasValue(e.target.value.length > 0);
    props.onChange && props.onChange(e);
  };

  return (
    <div className={`relative ${containerClassName}`}>
      <div className={`
        relative group transition-all duration-300 rounded-xl
        border ${error ? 'border-red-500/50' : isFocused ? 'border-emerald-500' : 'border-slate-700'}
        bg-dark-card/50 backdrop-blur-sm
      `}>
        {Icon && (
          <div className={`
            absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-300
            ${isFocused ? 'text-emerald-400' : 'text-slate-500'}
          `}>
            <Icon size={20} />
          </div>
        )}
        
        <input
          id={id}
          type={type}
          className={`
            w-full bg-slate-50 text-slate-900 placeholder-transparent
            focus:outline-none transition-all duration-300
            py-3 ${Icon ? 'pl-12' : 'pl-4'} pr-4
            rounded-xl
          `}
          placeholder={label}
          onFocus={() => setIsFocused(true)}
          onBlur={handleBlur}
          onChange={handleChange}
          {...props}
        />
        
        <label
          htmlFor={id}
          className={`
            absolute pointer-events-none transition-all duration-300
            ${Icon ? 'left-12' : 'left-4'}
            ${hasValue 
              ? 'opacity-0 -translate-y-2' 
              : isFocused 
                ? '-top-2.5 bg-dark-BG px-2 text-xs text-emerald-400 font-medium' 
                : 'top-3.5 text-slate-400 text-sm'}
          `}
        >
          {label}
        </label>
      </div>
      
      {error && (
        <p className="mt-1 text-xs text-red-400 pl-1 flex items-center gap-1 animate-slide-up">
          <span className="w-1 h-1 rounded-full bg-red-400 inline-block"/>
          {error}
        </p>
      )}
    </div>
  );
};

export { Input };
export default Input;
