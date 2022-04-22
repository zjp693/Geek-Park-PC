import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/index";
console.log(AppRoutes);
function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
