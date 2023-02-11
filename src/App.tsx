import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Loader } from "@ui/Loader";
import { RouterProvider } from "react-router-dom";
import { useDarkMode } from "usehooks-ts";
import router from "./services/Routing";
export function Fallback() {
  return <Loader text="Einen Moment Bitte..." />;
}
const queryClient = new QueryClient();
function App() {
  const { isDarkMode } = useDarkMode();

  return (
    <QueryClientProvider client={queryClient}>
      <div className={`${isDarkMode && "dark"} `}>
        <RouterProvider router={router} fallbackElement={<Fallback />} />
      </div>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
