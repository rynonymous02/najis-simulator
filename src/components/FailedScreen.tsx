import React from 'react';
import './FailedScreen.css';

interface FailedScreenProps {
  onBack: () => void;
}

const FailedScreen: React.FC<FailedScreenProps> = ({ onBack }) => {
  return (
    <div className="screen failed-screen">
      <button className="back-button" onClick={onBack}>
        <img src="/images/back-icon.svg" alt="Back" className="back-icon" />
      </button>
      <div className="failed-content">
        <div className="failed-image-container">
          <img 
            src="/images/santri-failed.png" 
            alt="Failed" 
            className="failed-image"
          />
        </div>
        <div className="failed-message">
        </div>
        <button 
          className="retry-button"
          onClick={onBack}
        >
          Kembali
        </button>
      </div>
    </div>
  );
};

export default FailedScreen; 