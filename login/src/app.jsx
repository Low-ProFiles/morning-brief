// src/app.jsx
import React from 'react';
import { Route, Routes } from 'react-router-dom'; // 'Switch' 대신 'Routes' 사용
import Login from './components/login';
import Contact from './components/contact';

const App = ({ auth }) => {  
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login auth={auth} />} />
        <Route 
          path="/contact" 
          element={<Contact auth={auth} />} 
        />
      </Routes>
    </div>
  );
};

export default App;
