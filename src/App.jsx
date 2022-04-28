import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/index";
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
