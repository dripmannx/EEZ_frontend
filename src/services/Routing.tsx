import { Checklist } from '@ui/Checklist';
import NotFound from '@ui/NotFound';
import { createBrowserRouter } from 'react-router-dom';
import { Admin } from '../pages/Admin';
import Clients, { NewClient } from '../pages/Client/Clients';
const router = createBrowserRouter([
  {
    path: '/',
    element: <Checklist />,
    /* children: [
        {
          path: 'contacts',
          element: <Contacts />,
          children: [
            {
              path: 'contacts/:contactId',
              element: <Contact />,
              // ⬇️ this is the loader for the detail route
              loader: contactLoader,
            },
          ],
        },
      ], */
  },
  {
    path: 'Admin',
    element: <Admin />,
    children: [
      {
        path: 'clients',
        element: <Clients />,
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
        element: <>Videos</>,
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
      { path: '*', element: <NotFound /> },
    ],
  },
]);
export default router;
