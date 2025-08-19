import React from 'react';

export type InputVariant = 'filled' | 'outlined' | 'ghost';
export type InputSize = 'sm' | 'md' | 'lg';

/**
 * Omit the native 'size' from InputHTMLAttributes because it is a number there.
 * Then add our custom props on top (including our string-based `size`).
 */
export interface InputFieldProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  helperText?: string;
  errorMessage?: string;
  invalid?: boolean;
  variant?: InputVariant;
  size?: InputSize;
  clearable?: boolean;
  passwordToggle?: boolean;
  loading?: boolean;
  className?: string;
}

const sizeClasses: Record<InputSize, string> = {
  sm: 'h-9 text-sm px-3 rounded-lg',
  md: 'h-10 text-base px-3.5 rounded-xl',
  lg: 'h-12 text-base px-4 rounded-2xl',
};

const variantClasses: Record<InputVariant, string> = {
  filled:
    'bg-gray-100 dark:bg-gray-800 border border-transparent focus:border-gray-400 dark:focus:border-gray-500',
  outlined:
    'bg-transparent border border-gray-300 dark:border-gray-700 focus:border-gray-500',
  ghost:
    'bg-transparent border border-transparent focus:border-gray-400 dark:focus:border-gray-500',
};

const labelSize: Record<InputSize, string> = { sm: 'text-xs', md: 'text-sm', lg: 'text-sm' };
const helperSize: Record<InputSize, string> = { sm: 'text-xs', md: 'text-xs', lg: 'text-sm' };

export const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>((props, ref) => {
  // destructure props
  const {
    id,
    label,
    helperText,
    errorMessage,
    invalid,
    variant = 'outlined',
    size = 'md',
    clearable,
    passwordToggle,
    loading,
    className,
    type = 'text',
    onChange,
    value,
    disabled,
    ...rest
  } = props;

  // ALWAYS call hook unconditionally
  const generatedId = React.useId();
  const inputId = id ?? generatedId;
  const helpId = `${inputId}-help`;
  const errorId = `${inputId}-error`;

  const [showPassword, setShowPassword] = React.useState(false);

  const computedType =
    type === 'password' && passwordToggle ? (showPassword ? 'text' : 'password') : type;

  const baseClasses = [
    'w-full outline-none placeholder:text-gray-400 dark:placeholder:text-gray-500',
    'transition-colors',
    sizeClasses[size],
    variantClasses[variant],
    disabled ? 'opacity-60 cursor-not-allowed' : 'focus:ring-2 focus:ring-offset-0 focus:ring-gray-300 dark:focus:ring-gray-600',
    invalid || !!errorMessage ? 'border-red-500 focus:border-red-500 focus:ring-red-300 dark:focus:ring-red-600' : '',
    (loading || clearable || (type === 'password' && passwordToggle)) ? 'pr-10' : '',
    className || '',
  ]
    .filter(Boolean)
    .join(' ');

  const handleClear = (inputElem?: HTMLInputElement | null) => {
    if (disabled) return;
    const synthetic = {
      target: { value: '' },
    } as unknown as React.ChangeEvent<HTMLInputElement>;
    onChange?.(synthetic);
    inputElem?.focus();
  };

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={inputId} className={`mb-1 inline-block text-gray-700 dark:text-gray-200 ${labelSize[size]}`}>
          {label}
        </label>
      )}

      <div className="relative">
        <input
          id={inputId}
          ref={ref}
          className={baseClasses}
          type={computedType}
          aria-disabled={disabled}
          aria-invalid={invalid || !!errorMessage}
          aria-describedby={(helperText ? helpId : '') + (errorMessage ? ` ${errorId}` : '')}
          value={value}
          onChange={onChange}
          disabled={disabled}
          {...rest}
        />

        {loading && (
          <span aria-hidden className="pointer-events-none absolute inset-y-0 right-2 flex items-center">
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden>
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
            </svg>
          </span>
        )}

        {clearable && !!value && !disabled && (
          <button
            type="button"
            aria-label="Clear input"
            className="absolute inset-y-0 right-2 flex items-center"
            onClick={(e) => {
              const inputElem = (e.currentTarget.previousElementSibling ?? null) as HTMLInputElement | null;
              handleClear(inputElem);
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        )}

        {type === 'password' && passwordToggle && (
          <button
            type="button"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            className="absolute inset-y-0 right-2 flex items-center mr-8"
            onClick={() => setShowPassword((s) => !s)}
          >
            {showPassword ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M3 3l18 18M10.58 10.58A3 3 0 0115 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z" stroke="currentColor" strokeWidth="2" />
                <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
              </svg>
            )}
          </button>
        )}
      </div>

      {helperText && !errorMessage && (
        <p id={helpId} className={`mt-1 text-gray-500 dark:text-gray-400 ${helperSize[size]}`}>
          {helperText}
        </p>
      )}
      {errorMessage && (
        <p id={errorId} className={`mt-1 text-red-600 dark:text-red-400 ${helperSize[size]}`}>
          {errorMessage}
        </p>
      )}
    </div>
  );
});

InputField.displayName = 'InputField';
export default InputField;
