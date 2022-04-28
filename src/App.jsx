import { BrowserRouter } from "react-router-dom";
import RouterWaiter from "react-router-waiter";
import AppRoutes from "./routes/index";
import onRouteBefore from "./routes/onRouteBefore";
// import 自定义模块名称 from ''

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
      {/* <RouterWaiter routes={AppRoutes} onRouteBefore={onRouteBefore} /> */}
    </BrowserRouter>
  );
}

export default App;
