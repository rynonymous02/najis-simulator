import React from 'react';
import './StartScreen.css';
import { StartScreenProps } from '../types';

const StartScreen = ({ onStart }: StartScreenProps) => {
  return (
    <div className="screen start-screen">
      <div className="start-content">
        <h1 className="app-title">
          <span>Najis</span>
          <span>Simulator</span>
        </h1>
        
        <div className="character-container">
          <img 
            src="/images/character.png" 
            alt="Character with bucket" 
            className="character-image"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.onerror = null;
              target.src = "https://via.placeholder.com/300x350/6AC5E8/333333?text=Character";
            }}
          />
        </div>
        
        <button className="start-button button" onClick={onStart}>
          Start
        </button>
        
        <div className="developer">
          <p>Ryz-Dev</p>
        </div>
      </div>
    </div>
  );
};

export default StartScreen; 