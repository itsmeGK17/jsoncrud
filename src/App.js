import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Compo/Home";
import View from "./Compo/View";
import Edit from "./Compo/Edit";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/edit/:id" element={<Edit />} />
        <Route path="/view/:id" element={<View />} />
      </Routes>
    </div>
  );
}

export default App;
