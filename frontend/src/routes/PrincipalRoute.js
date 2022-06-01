import { BrowserRouter, Route, Routes } from "react-router-dom";
import Index from "../pages/Index";

//router principal
const PrincipalRoute = () => {

  return (
    <BrowserRouter>
      <Routes>

        {/* página principal */}
        <Route path="/" element={<Index />} />
      </Routes>

    </BrowserRouter>
  );
}

export default PrincipalRoute;