import { forwardRef } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';

export const Searchbar = forwardRef<HTMLInputElement>(
  function Searchbar({ ...props }, ref) {
    return (
      <div className="p-2.5 flex items-center rounded-md px-4 duration-300  dark:bg-dark-primary  bg-white  text-black dark:text-white shadow-xl">
        <AiOutlineSearch size="1.5em" />
        <input
          placeholder="Suche"
          className="text-lg ml-4 w-full bg-transparent focus:outline-none"
          type="search"
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);
