import { QueryClient } from "@tanstack/react-query";
import NotFound from "@ui/NotFound";

import { createBrowserRouter } from "react-router-dom";
import { Admin } from "../pages/Admin";
import Clients, { NewClient } from "../pages/Client/Clients";
import Landing from "../pages/Landing/Landing";
import Videos, { NewUpdateVideoHelper } from "../pages/Video/videos";
import { VideoPage } from "../pages/VideoPage";
import {
  allClientsLoader,
  allVideosLoader,
  statsLoader,
  videoLoader,
} from "./Querys";

const queryClient = new QueryClient();
const router = createBrowserRouter([
  {
    path: "/admin",
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
            /*  loader: allVideosLoader, */
            loader: allVideosLoader(queryClient),
          },
          {
            path: ":id",
            element: <NewClient />,
            // ⬇️ this is the loader for the detail route
            /*  loader: allVideosLoader, */
            loader: allVideosLoader(queryClient),
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
            //This Route is for a new Video
            path: "new",
            element: <NewUpdateVideoHelper />,
          },
          {
            path: ":id",
            element: <NewUpdateVideoHelper />,
            // ⬇️ this is the loader for the detail route
            /*  loader: videoLoader, */
            loader: ({ params }) => videoLoader(queryClient),
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
  { path: "/", element: <Landing /> },
  { path: "/video", element: <VideoPage /> },
]);
export default router;
