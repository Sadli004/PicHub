import React from 'react';
import {Routes, Route} from 'react-router-dom'
import Home from '../../Pages/Home';
import Trending from '../../Pages/Trending';
import Profile from '../../Pages/Profil';
import Navbar from '../Navbar';

const Routeur = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/trending" element={<Trending />} />
      </Routes>
    </div>
  );
};

export default Routeur;