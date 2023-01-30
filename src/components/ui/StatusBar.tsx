import { useLocation } from 'react-router-dom';
import { Searchbar } from './Searchbar';

type Props = {};

const StatusBar = (props: Props) => {
  const location = useLocation();
  const loc = location.pathname.split('/');
  loc.map((path) => {
    return path.toUpperCase() + path.slice(1);
  });
  const headline = () => {
    if (location.pathname.includes('/videos')) return 'Videos';
    if (location.pathname.includes('/clients')) return 'Clients';
    return 'Dashboard';
  };
  return (
    <div className="flex w-full bg-secondary overflow-hidden shadow dark:bg-dark-secondary h-20 text-light-text dark:text-dark-text-hover">
      <div className="flex relative items-center mx-44 w-full float-left">
        <div className="text-4xl float-left ">{headline()}</div>
        <div className="middle">
          <Searchbar />
        </div>
      </div>
    </div>
  );
};

export default StatusBar;
