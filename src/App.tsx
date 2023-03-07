import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import Login from "./pages/Login";
import UserList from "./pages/UserList";
import Dashboard from "./pages/Dashboard";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
          <Route path="/userlist" element={<UserList />} />
        </Routes>
      </BrowserRouter>
      

  );
}

export default App;
