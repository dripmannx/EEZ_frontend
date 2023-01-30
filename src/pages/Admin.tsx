import { Sidebar } from '@ui/Sidebar';
import Stat from '@ui/Stat';
import StatusBar from '@ui/StatusBar';
import { RiComputerLine } from 'react-icons/ri';
import { TfiVideoClapper } from 'react-icons/tfi';
import { Outlet, useLocation } from 'react-router-dom';
import { useDarkMode } from 'usehooks-ts';
export const Admin = () => {
  const location = useLocation();
  const { isDarkMode } = useDarkMode();

  const bg = isDarkMode ? 'bg-dark-primary' : 'bg-light-primary';
  return (
    <>
      <div className={`flex ${bg}`}>
        {' '}
        <Sidebar />
        <div className="flex flex-[1] h-min max-h-max flex-col  ">
          <StatusBar />
          {location.pathname === '/Admin' && (
            <>
              {' '}
              <div className="flex flex-col  lg:flex-row justify-center lg:justify-between lg:mx-44 mt-10">
                {' '}
                <Stat
                  to="/Admin/videos"
                  Count={10}
                  Icon={<TfiVideoClapper size={'2em'} />}
                  Title="Videos"
                />
                <Stat
                  to="/Admin/clients"
                  Count={10}
                  Icon={<RiComputerLine size={'2em'} />}
                  Title="Clients"
                />
              </div>
            </>
          )}

          <Outlet />
        </div>
      </div>
    </>
  );
};
