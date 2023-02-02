import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

type Props = {};

const StatusBar = (props: Props) => {
  const [headline, setHeadline] = useState('Dashboard');
  const location = useLocation();
  const loc = location.pathname.split('/');
  loc.map((path) => {
    return path.toUpperCase() + path.slice(1);
  });
  useEffect(() => {
    if (location.pathname.includes('/videos')) setHeadline('Videos');
    if (location.pathname.includes('/clients'))
      setHeadline('Clients');
    if (location.pathname === '/Admin') setHeadline('Dashboard');
  }, [location.pathname]);

  return (
    <div className="flex w-full bg-secondary overflow-hidden shadow dark:bg-dark-secondary h-20 text-light-text dark:text-dark-text-hover">
      <div className="flex relative items-center  w-full float-left">
        <div className="text-4xl float-left ">{headline}</div>
      </div>
    </div>
  );
};

export default StatusBar;
