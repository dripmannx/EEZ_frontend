import { QueryClient } from "@tanstack/react-query";
import NotFound from "@ui/NotFound";

import { createBrowserRouter } from "react-router-dom";
import { Admin } from "../pages/Admin";
import Clients, { NewClient } from "../pages/Client/Clients";
import Videos, { NewUpdateVideoHelper } from "../pages/Video/videos";
import { allClientsLoader, allVideosLoader, statsLoader } from "./Querys";

const queryClient = new QueryClient();
const router = createBrowserRouter([
  {
    path: "/",
    loader: statsLoader(queryClient),
    element: <Admin />,
    errorElement: (
      <div className="h-screen w-screen  dark:bg-dark-primary">
        <NotFound text="Fehler Beim Laden" />
      </div>
    ),
    children: [
      {
        path: "clients",

        children: [
          {
            index: true,
            loader: allClientsLoader(queryClient),
            element: <Clients />,
          },
          {
            path: "new",
            element: <NewClient />,

            // ⬇️ this is the loader for the detail route
            /*  loader: contactLoader, */
          },
          {
            path: ":id",
            element: <NewClient />,
            // ⬇️ this is the loader for the detail route
            /*  loader: contactLoader, */
          },
        ],
      },
      {
        path: "videos",

        children: [
          {
            index: true,
            loader: allVideosLoader(queryClient),
            errorElement: <NotFound text="Fehler beim Laden der Inhalte" />,
            element: <Videos />,
          },
          {
            path: "new",
            element: <NewUpdateVideoHelper />,
            // ⬇️ this is the loader for the detail route
            /*  loader: contactLoader, */
          },
          {
            path: ":id",
            element: <NewUpdateVideoHelper />,
            // ⬇️ this is the loader for the detail route
            /*  loader: contactLoader, */
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: (
      <div className="flex h-screen w-screen justify-center bg-dark-primary text-light-text dark:text-dark-text-hover">
        <NotFound text="Seite nicht gefunden" />
      </div>
    ),
  },
]);
export default router;
