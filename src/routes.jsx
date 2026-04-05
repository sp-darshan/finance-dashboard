import { Navigate, createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import Transactions from './pages/Transactions';
import Insights from './pages/Insights';

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { index: true, element: <Navigate to="/dashboard" replace /> },
      { path: '/dashboard', element: <Dashboard /> },
      { path: '/transactions', element: <Transactions /> },
      { path: '/insights', element: <Insights /> },
    ],
  },
]);

export default function AppRoutes() {
  return <RouterProvider router={router} />;
}