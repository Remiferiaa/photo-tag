import './App.css';
import GameProvider from './Components/Context';
import Image from './Components/Image';
import { HashRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router basename="/">
      <GameProvider>
        <Routes>
          <Route path="/" element={<Image />}></Route>
        </Routes>
      </GameProvider>
    </Router>
  );
}

export default App;
