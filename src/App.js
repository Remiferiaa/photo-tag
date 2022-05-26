import React from 'react'
import './App.css';
import GameProvider from './Constant/Context';
import GameStage from './Components/GameStage';
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Home from './Components/Home';
import Header from './Components/Header'
import Leaderboard from './Components/Leaderboard';


function App() {
  return (
    <Router basename="/">
      <GameProvider>
        <Header/>
        <Routes>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/game" element={<GameStage/>}></Route>
          <Route path="/leaderboard" element={<Leaderboard/>}></Route>
        </Routes>
      </GameProvider>
    </Router>
  );
}

export default App;
