import { RouterProvider } from 'react-router-dom';
import { useDarkMode } from 'usehooks-ts';
import router from './services/Routing';
export function Fallback() {
  return <p>Performing initial data load</p>;
}

function App() {
  const { isDarkMode } = useDarkMode();

  return (
    <div className={`${isDarkMode && 'dark'} `}>
      <RouterProvider
        router={router}
        fallbackElement={<Fallback />}
      />
    </div>
  );
}

export default App;
