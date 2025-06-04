import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CatsPage from "./pages/CatsPage";
import AddCatPage from "./pages/AddCatPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/cats" element={<CatsPage />} />
        <Route path="/cats/add" element={<AddCatPage />} />
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </Router>
  );
}

export default App;
