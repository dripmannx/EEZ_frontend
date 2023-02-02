import { BiHome } from 'react-icons/bi';
import {
  MdOutlineDashboard,
  MdOutlineSpaceDashboard,
} from 'react-icons/md';
import { RiComputerLine } from 'react-icons/ri';
import { TfiVideoClapper } from 'react-icons/tfi';
import { Link, useLocation } from 'react-router-dom';
import ec_logo from '../../Images/ec_logo.png';
import {
  LanguageSwitch,
  ThemeSwitch,
} from '../Language/LanguageSwitch';
export const Sidebar = () => {
  const location = useLocation();

  const size = '1.5em';
  return (
    <>
      {/** Sidebar Title */}
      <div className="flex flex-col w-64 h-screen px-4 py-8 sticky top-0 left-0 bg-white border-r dark:bg-dark-secondary dark:border-gray-700">
        <div className="flex items-center justify-start gap-2 ">
          <img width={32} height={'32'} src={ec_logo}></img>
          <h2 className="text-3xl font-semibold text-applied dark:text-dark-text-hover">
            ENERCON
          </h2>
        </div>

        <div className=" flex flex-col justify-between flex-1 mt-6">
          <nav>
            {/** Dashboard Button */}
            <Link
              className={`flex items-center px-4 py-2 mt-5 text-applied ${
                location.pathname === '/' &&
                'bg-gray-100 rounded-md text-applied dark:bg-gray-800 dark:text-dark-text-hover'
              } transition-colors duration-300 transform rounded-md hover:bg-gray-100 dark:hover:bg-gray-800  text-applied`}
              to="/"
            >
              <MdOutlineDashboard size={size} />

              <span className="mx-4 font-medium">Dashboard</span>
            </Link>

            {/** Video Button */}
            <Link
              className={`flex items-center px-4 py-2 mt-5 text-applied  ${
                location.pathname.includes('/videos') &&
                'bg-gray-100 rounded-md text-applied dark:bg-gray-800 dark:text-dark-text-hover'
              } transition-colors duration-300 transform rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 text-applied`}
              to="videos"
            >
              <TfiVideoClapper size={size} />

              <span className="mx-4 font-medium">Videos</span>
            </Link>
            {/** Client Button */}
            <Link
              className={`flex items-center px-4 py-2 mt-5 text-applied  ${
                location.pathname.includes('/clients') &&
                'bg-gray-100 rounded-md text-applied dark:bg-gray-800 dark:text-dark-text-hover'
              } transition-colors duration-300 transform rounded-md hover:bg-gray-100 dark:hover:bg-gray-800  text-applied`}
              to="clients"
            >
              <RiComputerLine size={size} />
              <span className="mx-4 font-medium">Clients</span>
            </Link>

            <hr className="my-6 border-gray-200 dark:border-gray-600" />
            {/** Language Switcher */}
            <div className="flex items-center w-full px-4 py-2 mt-5 text-applied cursor-pointer transition-colors duration-300 transform rounded-md hover:bg-gray-100 dark:hover:bg-gray-800  text-applied">
              <LanguageSwitch className="flex items-center flex-row gap-2  w-full" />
            </div>

            <hr className="my-6 border-gray-200 dark:border-gray-600" />
            {/** Theme Switcher */}
            <div className="flex items-center w-full px-4 py-2 mt-5 text-applied  cursor-pointer transition-colors duration-300 transform rounded-md hover:bg-gray-100 dark:hover:bg-gray-800  text-applied">
              <ThemeSwitch className="flex items-center flex-row gap-2  w-full" />
            </div>
          </nav>
        </div>
      </div>
    </>
  );
};
