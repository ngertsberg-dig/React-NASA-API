import React from 'react';
import './App.css';
import MarsRover from './Components/MarsRover';
import './index.sass';
import Particles from 'react-particles-js';
function App() {
  return (
    <div className="App" id = "App">
      <div className = 'pages-container'>
        <MarsRover />
      </div>
      <Particles className = "particles-background"/>
    </div>
  );
}

export default App;
