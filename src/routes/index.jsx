import { useRoutes, Navigate, useNavigate } from "react-router-dom";
import Layout from "../pages/Layout/index";
import Login from "../pages/Login/index";
import Dashboard from "../pages/Layout/components/Dashboard";
import Article from "../pages/Layout/components/Article";
import Publish from "../pages/Layout/components/Publish";
let token = localStorage.getItem("Token");
const routes = [
  {
    path: "/",
    element: <Navigate to="/login" />,
  },

  {
    path: `/home`,
    element: <Layout />,
    meta: {
      title: "首页",
      needLogin: true,
    },
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
        path: "publish",
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
  // const navigate = useNavigate();
  // // navigate("/login");
  // let token = localStorage.getItem("Token");
  // console.log(token);
  // if (token) {
  //   let element = useRoutes(routes);
  //   return element;
  //   console.log("没有拦截");
  // } else {
  //   console.log("拦截了");
  //   let element = useRoutes(routes);
  //   // navigate("/login");
  //   return element;
  // }
  let element = useRoutes(routes);
  return element;
}

export default AppRoute;
