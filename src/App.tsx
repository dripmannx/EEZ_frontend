import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { RouterProvider } from 'react-router-dom';
import { useDarkMode } from 'usehooks-ts';
import router from './services/Routing';
export function Fallback() {
  return (
    <progress className="relative appearance-none overflow-hidden h-2 rounded-md"></progress>
  );
}
const queryClient = new QueryClient();
function App() {
  const { isDarkMode } = useDarkMode();

  return (
    <QueryClientProvider client={queryClient}>
      <div className={`${isDarkMode && 'dark'} `}>
        <RouterProvider
          router={router}
          fallbackElement={<Fallback />}
        />
      </div>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
