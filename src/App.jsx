
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Navbar/Navbar';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import Player from './pages/player/Player';
import { useState } from 'react';
export default function App() {
  const [sidebar,setsidebar]=useState(true)
  return (
    <>
    <Navbar setsidebar={setsidebar}/>
    <Routes>
      <Route path='/' element={<Home sidebar={sidebar}/>}/>
      <Route path='/Player/:videoId/:categoryId' element={<Player/>}/>
    </Routes>
    </>
  )
}