import React from "react";
import './App.css';
import {Routes,Route} from "react-router-dom";
import Main from "./Pages/Main/Main";
import Authorization from "./Pages/Authorization/Authorization";
import Registration from "./Pages/Registration/Registration";
function App() {
  return (
    
    <Routes>
      <Route path='/' element={<Main />} />
      <Route path='/authorization' element={<Authorization/>}/>
      <Route path='/registration' element={<Registration/>}/>
      
    </Routes>
  );
}

export default App;
