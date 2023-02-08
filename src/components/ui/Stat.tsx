import { ReactNode } from "react";
import { Link } from "react-router-dom";

interface Props {
  Count: number;
  Title: string;
  Icon: ReactNode;
  to: string;
}
export const Stat = ({ Count, Title, Icon, to }: Props) => {
  return (
    <Link
      to={to}
      className="transition-animation flex w-[90%] items-center rounded-lg border bg-light-primary  py-6  shadow-lg dark:border-gray-700 dark:bg-dark-secondary lg:w-fit lg:px-16"
    >
      <div className="mr-6 inline-flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-purple-100 text-purple-600">
        {Icon}
      </div>
      <div>
        <span className="block text-2xl font-bold text-light-text dark:text-dark-text-hover">
          {Count}
        </span>
        <span className="block text-light-text dark:text-dark-text-base">
          {Title}
        </span>
      </div>
    </Link>
  );
};
export default Stat;
