import React from 'react';
import './SuccessScreen.css';
import { SuccessScreenProps } from '../types';

const SuccessScreen = ({ onBackToChose }: SuccessScreenProps) => {
  return (
    <div className="screen success-screen">
      <div className="success-content">
        <img src="/images/character-thumbup.png" alt="Success Character" className="success-character-image" />
        <button className="back-to-chose-button button" onClick={onBackToChose}>
          Kembali
        </button>
      </div>
    </div>
  );
};

export default SuccessScreen; 