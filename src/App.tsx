import { RouterProvider } from '@tanstack/react-router';
import { router } from './routes/__root';

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
