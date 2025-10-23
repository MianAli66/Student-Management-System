import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Stulogin from "./components/Stulogin";
import Tealogin from "./components/Tealogin";
import Stusignup from "./components/Stusignup";
import Teasignup from "./components/Teasignup";
import Stuotp from "./components/Stuotp";
import Teaotp from "./components/Teaotp";
import Studashbord from "./components/Studashbord";
import Teadashbord from "./components/Teadashbord";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        
        <Route path="/" element={<Home />} />
        <Route path="/loginasstudent" element={<Stulogin />} />
        <Route path="/loginasteacher" element={<Tealogin />} />
        <Route path="/signupasstudent" element={<Stusignup />} />
        <Route path="/signupasteacher" element={<Teasignup />} />
       <Route path="/stuotp" element={<Stuotp />} />
       <Route path="/teaotp" element={<Teaotp />} />
       <Route path="/studashbord" element={<Studashbord />} />
       <Route path="/teadashbord" element={<Teadashbord />} />
    
      </Routes>
    </BrowserRouter>
  );
}

export default App;
