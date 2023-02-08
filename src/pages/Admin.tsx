import { Menu } from "@headlessui/react";
import { Button } from "@ui/Button";
import { Container } from "@ui/Container";
import Dropdown from "@ui/Dropdown";
import { Searchbar } from "@ui/Searchbar";
import { Sidebar } from "@ui/Sidebar";
import { useState } from "react";
import { BiBook, BiPlus } from "react-icons/bi";
import { RiComputerLine } from "react-icons/ri";
import { TfiVideoClapper } from "react-icons/tfi";
import { Link, Outlet, useLoaderData, useLocation } from "react-router-dom";
import { useDarkMode } from "usehooks-ts";
import { Client } from "../services/types";
export const Admin = () => {
  const data = useLoaderData() as Client[];
  const location = useLocation();
  const { isDarkMode } = useDarkMode();
  //State for SearchQuery for child components
  const [query, setQuery] = useState("");
  const bg = isDarkMode ? "bg-dark-primary" : "bg-light-primary";
  return (
    <>
      <div className={` table h-screen ${bg}`}>
        {" "}
        <Sidebar />
        <div className="justiy-center table-cell w-full  align-top">
          <div className="flex w-full justify-center">
            <div className="w-[80%]">
              <Container
                title="Dashboard"
                action={
                  location.pathname == "/" ? (
                    <Dropdown />
                  ) : (
                    <Menu as="div" className="relative inline-block text-left">
                      <div>
                        <Menu.Button className="inline-flex w-full justify-center gap-2  rounded-md border border-gray-700 bg-white px-4 py-2 text-sm font-medium shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100  dark:bg-dark-primary dark:text-dark-text-hover">
                          <Link
                            className="flex flex-row items-center gap-2"
                            to={`${location.pathname.split("/")[1]}/new`}
                          >
                            Hinzufügen
                            <BiPlus size={"1.5em"} aria-hidden="true" />
                          </Link>
                        </Menu.Button>
                      </div>
                    </Menu>
                  )
                }
              >
                {location.pathname !== "/" && (
                  <Searchbar
                    value={query}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setQuery(e.target.value)
                    }
                  />
                )}
              </Container>

              {location.pathname.toLowerCase() === "/" && (
                <>
                  <Container title="Handbuch">
                    <div className="flex flex-col gap-5">
                      <span className="text-light-text dark:text-dark-text-base">
                        Das Handbuch zur Bendienung finden Sie unter folgendem
                        Link, als PDF zum angucken oder runterladen.
                        <br />
                      </span>
                      <Button fullWidth={false} icon>
                        <BiBook size="1.5em" />
                        Zum Handbuch
                      </Button>
                    </div>
                  </Container>{" "}
                  <div className="flex   flex-col justify-between gap-5 lg:flex-row lg:gap-24">
                    <Container>
                      <div className="flex gap-6">
                        <div className="flex w-16 items-center justify-center rounded-full bg-green-100 lg:h-16">
                          <RiComputerLine size={"2em"} />
                        </div>
                        <div className="flex-1">
                          <span className="block text-2xl font-bold text-light-text dark:text-dark-text-hover">
                            12
                          </span>
                          <span className="block text-light-text dark:text-dark-text-base">
                            Clients
                          </span>
                        </div>
                      </div>
                    </Container>
                    <Container>
                      <div className="flex gap-6">
                        <div className="flex h-auto w-16 items-center justify-center rounded-full bg-green-100 lg:h-16">
                          <TfiVideoClapper size={"2em"} />
                        </div>
                        <div className="flex-1">
                          <span className="block text-2xl font-bold text-light-text dark:text-dark-text-hover">
                            {data.length}
                          </span>
                          <span className="block text-light-text dark:text-dark-text-base">
                            Videos
                          </span>
                        </div>
                      </div>
                    </Container>
                  </div>
                </>
              )}
              {/**query state gets passed to childs with context */}
              <Outlet context={query} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
