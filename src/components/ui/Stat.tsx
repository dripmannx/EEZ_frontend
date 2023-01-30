import { ReactNode } from 'react';
import { Link } from 'react-router-dom';

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
      className="transition-animation flex items-center w-[90%] lg:w-fit lg:px-16 py-6  bg-light-primary  shadow-lg dark:bg-dark-secondary rounded-lg border dark:border-gray-700"
    >
      <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-purple-600 bg-purple-100 rounded-full mr-6">
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
