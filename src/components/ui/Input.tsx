import { ComponentProps, forwardRef } from 'react';
import { FieldError } from './Form';

interface Props extends ComponentProps<'input'> {
  label: string;
}

export const Input = forwardRef<HTMLInputElement, Props>(
  function Input({ label, type = 'text', ...props }, ref) {
    return (
      <label>
        <div className="font-medium text-base-light dark:text-base-dark mb-1 text-left">
          {label}
        </div>
        <input
          className="bg-white dark:bg-dark-secondary text-base dark:text-base-dark w-full mb-2 rounded-md px-4 py-2 border focus:border-brand-600 focus:ring-brand-500 disabled:opacity-60 disabled:bg-gray-500 disabled:bg-opacity-20"
          type={type}
          ref={ref}
          {...props}
        />

        <FieldError name={props.name} />
      </label>
    );
  }
);
