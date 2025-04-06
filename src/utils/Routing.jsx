import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../components/Home';
import Animationtest from '../components/Animationtest.jsx';
import Clock from '../components/Clock.jsx';
import Projects from '../components/Projects.jsx';



const Routing = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/clock' element={<Projects />} />
      <Route path='/animation' element={<Animationtest />} />
    </Routes>
  );
};

export default Routing;
