import { useRoutes } from "react-router-dom";
import Layout from "../pages/Layout/index";
import Login from "../pages/Login/index";

const routes = [
  {
    path: "/",
    element: <Layout />,
  },

  { path: "/home", element: <Layout /> },
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
