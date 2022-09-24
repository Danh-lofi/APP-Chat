import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";

function App() {
  return (
    <div className="App">
      {/* App dùng cho router */}
      <Routes>
        <Route path="/" element={<Home />}></Route>
      </Routes>
    </div>
  );
}

export default App;
