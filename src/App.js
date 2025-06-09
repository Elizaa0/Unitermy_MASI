import React from 'react';
import UnitermApp from './UnitermApp';
import UnitermParallel from './UnitermParallel';
import './UnitermApp.css';

const App = () => {
  return (
    <div className="app-container">
      {/* Sekcja formularza */}
      <div className="form-section">
        <h1>Unitermy</h1>
        <UnitermApp />
      </div>
      
    </div>
  );
};

export default App;
