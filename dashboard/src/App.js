import Share from "./Share";
import Uploader from "./Uploader";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./uploader.scss";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Uploader />} />
        <Route path="/share/:id" element={<Share />} />
      </Routes>
    </Router>
  );
}

export default App;
