import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import Login from "./pages/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import { CookiesProvider } from 'react-cookie';
import AddMentee from "./pages/AddNewMentee";

function App() {
  const [count, setCount] = useState(0);

  return (
    
    
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/addnewmente" element={<AddMentee />} />
        </Routes>
      </BrowserRouter>
      

  );
}

export default App;
