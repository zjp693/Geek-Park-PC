import { useRoutes } from "react-router-dom";
import Layout from "../pages/Layout/index";
import Login from "../pages/Login/index";
import Dashboard from "../pages/Layout/components/Dashboard";
const routes = [
  {
    path: "/",
    element: <Layout />,
  },

  {
    path: "/home",
    element: <Layout />,
    children: [
      {
        path: "Dashboard",
        element: <Dashboard />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
];

function AppRoute() {
  let element = useRoutes(routes);
  return element;
}

export default AppRoute;
