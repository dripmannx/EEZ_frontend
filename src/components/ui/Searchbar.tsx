import { ComponentProps, forwardRef } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';

export const Searchbar = forwardRef<HTMLInputElement>(
  function Searchbar({ ...props }, ref) {
    return (
      <div className="p-2.5 flex items-center rounded-md px-4 duration-300 cursor-pointer bg-gray-700 text-white">
        <AiOutlineSearch size="1.5em" />
        <input
          placeholder="Suche"
          className="text-lg ml-4 w-full bg-transparent focus:outline-none"
          type={'text'}
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);
