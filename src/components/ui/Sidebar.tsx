import { BiHome } from "react-icons/bi";
import { MdOutlineDashboard, MdOutlineSpaceDashboard } from "react-icons/md";
import { RiComputerLine } from "react-icons/ri";
import { TfiVideoClapper } from "react-icons/tfi";
import { Link, useLocation } from "react-router-dom";
import ec_logo from "../../Images/ec_logo.png";
import { LanguageSwitch, ThemeSwitch } from "../Language/LanguageSwitch";
export const Sidebar = () => {
  const location = useLocation();

  const size = "1.5em";
  return (
    <>
      {/** Sidebar Title */}
      <div className="sticky top-0 left-0 flex h-screen w-64 flex-col border-r bg-white px-4 py-8 dark:border-gray-700 dark:bg-dark-secondary">
        <div className="flex items-center justify-start gap-2 ">
          <img width={32} height={"32"} src={ec_logo}></img>
          <h2 className="text-applied text-3xl font-semibold dark:text-dark-text-hover">
            ENERCON
          </h2>
        </div>

        <div className=" mt-6 flex flex-1 flex-col justify-between">
          <nav>
            {/** Dashboard Button */}
            <Link
              className={`text-applied mt-5 flex items-center px-4 py-2 ${
                location.pathname === "/" &&
                "text-applied rounded-md bg-gray-100 dark:bg-gray-800 dark:text-dark-text-hover"
              } text-applied transform rounded-md transition-colors duration-300 hover:bg-gray-100  dark:hover:bg-gray-800`}
              to="/"
            >
              <MdOutlineDashboard size={size} />

              <span className="mx-4 font-medium">Dashboard</span>
            </Link>

            {/** Video Button */}
            <Link
              className={`text-applied mt-5 flex items-center px-4 py-2  ${
                location.pathname.includes("/videos") &&
                "text-applied rounded-md bg-gray-100 dark:bg-gray-800 dark:text-dark-text-hover"
              } text-applied transform rounded-md transition-colors duration-300 hover:bg-gray-100 dark:hover:bg-gray-800`}
              to="videos"
            >
              <TfiVideoClapper size={size} />

              <span className="mx-4 font-medium">Videos</span>
            </Link>
            {/** Client Button */}
            <Link
              className={`text-applied mt-5 flex items-center px-4 py-2  ${
                location.pathname.includes("/clients") &&
                "text-applied rounded-md bg-gray-100 dark:bg-gray-800 dark:text-dark-text-hover"
              } text-applied transform rounded-md transition-colors duration-300 hover:bg-gray-100  dark:hover:bg-gray-800`}
              to="clients"
            >
              <RiComputerLine size={size} />
              <span className="mx-4 font-medium">Clients</span>
            </Link>

            <hr className="my-6 border-gray-200 dark:border-gray-600" />
            {/** Language Switcher */}
            <div className="text-applied text-applied mt-5 flex w-full transform cursor-pointer items-center rounded-md px-4 py-2 transition-colors duration-300 hover:bg-gray-100  dark:hover:bg-gray-800">
              <LanguageSwitch className="flex w-full flex-row items-center  gap-2" />
            </div>

            <hr className="my-6 border-gray-200 dark:border-gray-600" />
            {/** Theme Switcher */}
            <div className="text-applied text-applied mt-5 flex w-full transform cursor-pointer  items-center rounded-md px-4 py-2 transition-colors duration-300 hover:bg-gray-100  dark:hover:bg-gray-800">
              <ThemeSwitch className="flex w-full flex-row items-center  gap-2" />
            </div>
          </nav>
        </div>
      </div>
    </>
  );
};
