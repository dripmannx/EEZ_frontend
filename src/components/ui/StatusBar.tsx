import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

type Props = {};

const StatusBar = (props: Props) => {
  const [headline, setHeadline] = useState("Dashboard");
  const location = useLocation();
  const loc = location.pathname.split("/");
  loc.map((path) => {
    return path.toUpperCase() + path.slice(1);
  });
  useEffect(() => {
    if (location.pathname.includes("/videos")) setHeadline("Videos");
    if (location.pathname.includes("/clients")) setHeadline("Clients");
    if (location.pathname === "/Admin") setHeadline("Dashboard");
  }, [location.pathname]);

  return (
    <div className="flex h-20 w-full overflow-hidden bg-secondary text-light-text shadow dark:bg-dark-secondary dark:text-dark-text-hover">
      <div className="relative float-left flex  w-full items-center">
        <div className="float-left text-4xl ">{headline}</div>
      </div>
    </div>
  );
};

export default StatusBar;
