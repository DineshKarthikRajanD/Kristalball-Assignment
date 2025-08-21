// App.tsx
import { Routes, Route } from "react-router-dom";
import Login from "../src/pages/Login";
import Dashboard from "./pages/Dashboard";
import Layout from "./pages/Layout";
import Purchases from "./pages/Purchases";
import Transfers from "./pages/Transfers";
import Assignments from "./pages/Assignments";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route element={<Layout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/purchases" element={<Purchases />} />
        <Route path="/transfers" element={<Transfers />} />
        <Route path="/assignments" element={<Assignments />} />
      </Route>
    </Routes>
  );
}

export default App;
