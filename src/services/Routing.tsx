import { QueryClient } from "@tanstack/react-query";
import NotFound from "@ui/NotFound";
import axios from "axios";

import { createBrowserRouter } from "react-router-dom";
import { Admin } from "../pages/Admin";
import Clients, { NewClient } from "../pages/Client/Clients";
import Videos from "../pages/Video/videos";

import { Client, Video } from "./types";
export const allVideosQuery = () => ({
  queryKey: ["all", "videos"],
  queryFn: async (): Promise<Video[]> => {
    const res = axios
      .get("http://127.0.0.1:8000/api/all-videos")
      .then((res) => res.data);
    return res;
  },
});
export const allClientsQuery = () => ({
  queryKey: ["all", "videos"],
  queryFn: async (): Promise<Client[]> => {
    const res = axios
      .get("http://127.0.0.1:8000/api/all-pcs")
      .then((res) => res.data);
    return res;
  },
});
export const allVideosLoader = (queryClient: QueryClient) => async () => {
  const query = allVideosQuery();
  // ⬇️ return data or fetch it
  return (
    queryClient.getQueryData(query.queryKey) ??
    (await queryClient.fetchQuery(query))
  );
};
export const allClientsLoader = (queryClient: QueryClient) => async () => {
  const query = allClientsQuery();
  // ⬇️ return data or fetch it
  return (
    queryClient.getQueryData(query.queryKey) ??
    (await queryClient.fetchQuery(query))
  );
};

const queryClient = new QueryClient();
const router = createBrowserRouter([
  {
    path: "/",
    loader: async (): Promise<Client[]> => {
      return axios
        .get("http://127.0.0.1:8000/api/all-pcs")
        .then((res) => res.data);
    },
    element: <Admin />,
    errorElement: <NotFound text="Fehler Beim Laden" />,
    children: [
      {
        path: "clients",

        element: <Clients />,
        loader: allClientsLoader(queryClient),
        children: [
          {
            path: "new",
            element: <NewClient />,
            // ⬇️ this is the loader for the detail route
            /*  loader: contactLoader, */
          },
          {
            path: ":id",
            element: <div>ID</div>,
            // ⬇️ this is the loader for the detail route
            /*  loader: contactLoader, */
          },
        ],
      },
      {
        path: "videos",
        loader: allVideosLoader(queryClient),
        errorElement: <NotFound text="Fehler beim Laden der Inhalte" />,
        element: (
          <>
            <Videos />
          </>
        ),
        children: [
          {
            path: "new",
            element: <>New Video</>,
            // ⬇️ this is the loader for the detail route
            /*  loader: contactLoader, */
          },
          {
            path: ":id",
            element: <div>ID</div>,
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
