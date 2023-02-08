import { AiOutlineSearch } from "react-icons/ai";
interface Props {}
export const Searchbar = ({ ...props }) => {
  return (
    <div className="flex items-center rounded-md  bg-white p-2.5 px-4  text-black  shadow-xl  duration-300 dark:bg-dark-primary dark:text-white">
      <AiOutlineSearch size="1.5em" />
      <input
        placeholder="In Videos oder Clients suchen"
        className="ml-4 w-full bg-transparent text-lg focus:outline-none"
        type="search"
        {...props}
      />
    </div>
  );
};
