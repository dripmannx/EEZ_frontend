import { QueryClient } from '@tanstack/react-query';
import { Checklist } from '@ui/Checklist';
import NotFound from '@ui/NotFound';
import axios from 'axios';

import { createBrowserRouter } from 'react-router-dom';
import { Admin } from '../pages/Admin';
import Clients, { NewClient } from '../pages/Client/Clients';
import Videos from '../pages/Video/Videos';
import { Client, Video, VideoInterface } from './types';
export const allVideosQuery = () => ({
  queryKey: ['all', 'videos'],
  queryFn: async (): Promise<Video[]> => {
    const res = axios
      .get('http://127.0.0.1:8000/api/all-videos')
      .then((res) => res.data);
    return res;
  },
});
export const loader = (queryClient: QueryClient) => async () => {
  const query = allVideosQuery();
  // ⬇️ return data or fetch it
  return (
    queryClient.getQueryData(query.queryKey) ??
    (await queryClient.fetchQuery(query))
  );
};

const queryClient = new QueryClient();
const router = createBrowserRouter([
  {
    path: '/',
    loader: async (): Promise<Client[]> => {
      return axios
        .get('http://127.0.0.1:8000/api/all-pcs')
        .then((res) => res.data);
    },
    element: <Admin />,
    children: [
      {
        path: 'clients',

        element: <Clients />,
        loader: async (): Promise<Client[]> => {
          return axios
            .get('http://127.0.0.1:8000/api/all-pcs')
            .then((res) => res.data);
        },

        children: [
          {
            path: 'new',
            element: <NewClient />,
            // ⬇️ this is the loader for the detail route
            /*  loader: contactLoader, */
          },
          {
            path: ':id',
            element: <div>ID</div>,
            // ⬇️ this is the loader for the detail route
            /*  loader: contactLoader, */
          },
        ],
      },
      {
        path: 'videos',
        loader: loader(queryClient),
        errorElement: (
          <NotFound text="Fehler beim Laden der Inhalte" />
        ),
        element: (
          <>
            <Videos />
          </>
        ),
        children: [
          {
            path: 'new',
            element: <>New Video</>,
            // ⬇️ this is the loader for the detail route
            /*  loader: contactLoader, */
          },
          {
            path: ':id',
            element: <div>ID</div>,
            // ⬇️ this is the loader for the detail route
            /*  loader: contactLoader, */
          },
        ],
      },
    ],
  },
  {
    path: '*',
    element: (
      <div className="w-screen bg-dark-primary h-screen flex justify-center text-light-text dark:text-dark-text-hover">
        <NotFound text="Seite nicht gefunden" />
      </div>
    ),
  },
]);
export default router;
