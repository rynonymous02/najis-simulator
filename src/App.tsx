import React, { useState } from 'react';
import './App.css';
import StartScreen from './components/StartScreen';
import ChoseScreen from './components/ChoseScreen';
import SimulatorScreen from './components/SimulatorScreen';
import SuccessScreen from './components/SuccessScreen';
import { NajisTypeId } from './types';

type ScreenType = 'start' | 'chose' | 'simulator' | 'success';

function App() {
  const [currentScreen, setCurrentScreen] = useState('start');
  const [selectedNajis, setSelectedNajis] = useState(null as NajisTypeId | null);

  // Function to navigate between screens
  const navigateTo = (screen: ScreenType) => {
    setCurrentScreen(screen);
  };

  // Function to select a najis type
  const selectNajis = (najisType: NajisTypeId) => {
    setSelectedNajis(najisType);
    navigateTo('simulator');
  };

  // Render the appropriate screen based on the current state
  const renderScreen = () => {
    switch (currentScreen) {
      case 'start':
        return <StartScreen onStart={() => navigateTo('chose')} />;
      case 'chose':
        return <ChoseScreen onSelect={selectNajis} onBack={() => navigateTo('start')} />;
      case 'simulator':
        return <SimulatorScreen 
          najisType={selectedNajis || 'mutawasitho'} 
          onBack={() => navigateTo('chose')} 
          onSuccess={() => navigateTo('success')} 
        />;
      case 'success':
        return <SuccessScreen onBackToChose={() => navigateTo('chose')} />;
      default:
        return <StartScreen onStart={() => navigateTo('chose')} />;
    }
  };

  return (
    <div className="app-container">
      {renderScreen()}
    </div>
  );
}

export default App; 