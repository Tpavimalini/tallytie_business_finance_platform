import React, { useState, forwardRef } from 'react';
import PropTypes from 'prop-types';

const EditText = forwardRef(({ 
  placeholder = '', 
  value = '', 
  onChange, 
  onFocus,
  onBlur,
  type = 'text',
  disabled = false,
  error = false,
  errorMessage = '',
  size = 'medium',
  fullWidth = false,
  className = '',
  ...props 
}, ref) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = (e) => {
    setIsFocused(true);
    if (onFocus) onFocus(e);
  };

  const handleBlur = (e) => {
    setIsFocused(false);
    if (onBlur) onBlur(e);
  };

  const baseClasses = 'font-inter transition-colors duration-200 focus:outline-none rounded-lg';
  
  const sizes = {
    small: 'px-4 py-2 text-sm',
    medium: 'px-5 py-3.5 text-lg',
    large: 'px-6 py-4 text-xl',
  };

  const inputClasses = `
    ${baseClasses}
    ${sizes[size]}
    ${fullWidth ? 'w-full' : 'w-auto'}
    ${error 
      ? 'border border-red-500 bg-red-50 text-red-900 focus:border-red-600' :'border border-edittext-1 bg-global-3 text-global-7 focus:border-header-text1 focus:bg-global-2'
    }
    ${disabled ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : ''}
    ${isFocused ? 'ring-2 ring-header-text1 ring-opacity-20' : ''}
    ${className}
  `.trim().replace(/\s+/g, ' ');

  return (
    <div className={fullWidth ? 'w-full' : 'w-auto'}>
      <input
        ref={ref}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        disabled={disabled}
        className={inputClasses}
        {...props}
      />
      {error && errorMessage && (
        <p className="mt-1 text-sm text-red-600">{errorMessage}</p>
      )}
    </div>
  );
});

EditText.displayName = 'EditText';

EditText.propTypes = {
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  type: PropTypes.string,
  disabled: PropTypes.bool,
  error: PropTypes.bool,
  errorMessage: PropTypes.string,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  fullWidth: PropTypes.bool,
  className: PropTypes.string,
};

export default EditText;