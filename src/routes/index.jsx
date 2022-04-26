import { useRoutes } from "react-router-dom";
import Layout from "../pages/Layout/index";
import Login from "../pages/Login/index";
import Dashboard from "../pages/Layout/components/Dashboard";
import Article from "../pages/Layout/components/Article";
import Publish from "../pages/Layout/components/Publish";

const routes = [
  // {
  //   path: "*",
  //  <Navigate to="'/>
  // },

  {
    path: `/home/*`,
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Dashboard />,
      },
      {
        path: `article`,
        element: <Article />,
      },
      {
        path: "publish/*",
        element: <Publish />,
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
