import React, { useState } from 'react';
import './App.css';
import StartScreen from './components/StartScreen';
import ChoseScreen from './components/ChoseScreen';
import SimulatorScreen from './components/SimulatorScreen';
import SuccessScreen from './components/SuccessScreen';
import FailedScreen from './components/FailedScreen';
import { NajisTypeId } from './types';

type ScreenType = 'start' | 'chose' | 'simulator' | 'success' | 'failed';

function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('start');
  const [selectedNajis, setSelectedNajis] = useState<NajisTypeId>('mukhofafah');

  // Function to navigate between screens
  const navigateTo = (screen: ScreenType) => {
    setCurrentScreen(screen);
  };

  // Function to select a najis type
  const handleNajisSelect = (najisType: NajisTypeId) => {
    setSelectedNajis(najisType);
    navigateTo('simulator');
  };

  // Render the appropriate screen based on the current state
  const renderScreen = () => {
    switch (currentScreen) {
      case 'start':
        return <StartScreen onStart={() => navigateTo('chose')} />;
      case 'chose':
        return <ChoseScreen onSelect={handleNajisSelect} onBack={() => navigateTo('start')} />;
      case 'simulator':
        return <SimulatorScreen 
          najisType={selectedNajis || 'mutawasitho'} 
          onBack={() => navigateTo('chose')} 
          onSuccess={() => navigateTo('success')} 
          onFailed={() => navigateTo('failed')}
        />;
      case 'success':
        return <SuccessScreen onBackToChose={() => navigateTo('chose')} />;
      case 'failed':
        return <FailedScreen onBack={() => navigateTo('chose')} />;
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