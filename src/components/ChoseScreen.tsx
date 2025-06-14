import React, { useState, useRef, useEffect } from 'react';
import './ChoseScreen.css';
import { ChoseScreenProps, NajisType } from '../types';

const ChoseScreen = ({ onSelect, onBack }: ChoseScreenProps) => {
  const [currentNajisIndex, setCurrentNajisIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [startX, setStartX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [showSpecialMessage, setShowSpecialMessage] = useState(false);
  const [showCharacter, setShowCharacter] = useState(false);
  const [timerStarted, setTimerStarted] = useState(false);
  
  // Define the available najis types
  const najisTypes: NajisType[] = [
    {
      id: 'mukhofafah',
      name: 'Najis Mukhofafah',
      description: 'Najis ringan seperti air kencing bayi laki-laki yang belum makan apapun selain ASI.',
      image: '/images/najis-ringan.png',
      placeholder: 'https://via.placeholder.com/200x200/FFEB3B/333333?text=Najis+Mukhofafah'
    },
    {
      id: 'mutawasitho',
      name: 'Najis Mutawasitho',
      description: 'Najis sedang seperti darah, nanah, kotoran hewan, dan sebagainya.',
      image: '/images/najis-sedang.png',
      placeholder: 'https://via.placeholder.com/200x200/A0522D/FFFFFF?text=Najis+Mutawasitho'
    },
    {
      id: 'mugholado',
      name: 'Najis Mugholado',
      description: 'Najis berat seperti air liur anjing, babi, dan turunannya.',
      image: '/images/najis-heavy.png',
      placeholder: 'https://via.placeholder.com/200x200/333333/FFFFFF?text=Najis+Mugholado'
    },
    {
      id: 'masyarakat',
      name: 'Najis Masyarakat',
      description: 'Najis yang ada di masyarakat seperti korupsi, kolusi, dan nepotisme.',
      image: '/images/tikus-berdasi.png',
      placeholder: 'https://via.placeholder.com/200x200/000000/FFFFFF?text=Najis+Masyarakat'
    }
  ];
  
  const currentNajis = najisTypes[currentNajisIndex];
  
  // Start timer when Najis Masyarakat is selected
  useEffect(() => {
    if (currentNajis.id === 'masyarakat' && !timerStarted) {
      setTimerStarted(true);
      
      // After 7 seconds, hide the najis and show the character
      const timer = setTimeout(() => {
        setShowSpecialMessage(true);
        
        // Add a small delay before showing the character for better animation sequence
        setTimeout(() => {
          setShowCharacter(true);
        }, 300);
      }, 5000);
      
      return () => {
        clearTimeout(timer);
      };
    } else if (currentNajis.id !== 'masyarakat') {
      // Reset states when switching away from Najis Masyarakat
      setShowSpecialMessage(false);
      setShowCharacter(false);
      setTimerStarted(false);
    }
  }, [currentNajisIndex, currentNajis.id, timerStarted]);
  
  // Navigate to previous najis type
  const prevNajis = () => {
    setCurrentNajisIndex((prev) => 
      prev === 0 ? najisTypes.length - 1 : prev - 1
    );
  };
  
  // Navigate to next najis type
  const nextNajis = () => {
    setCurrentNajisIndex((prev) => 
      prev === najisTypes.length - 1 ? 0 : prev + 1
    );
  };

  // Handle touch/mouse events for swipe
  const handleTouchStart = (e: any) => {
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    setStartX(clientX);
    setIsDragging(true);
  };

  const handleTouchMove = (e: any) => {
    if (!isDragging) return;
    e.preventDefault();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const diff = startX - clientX;
    
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        nextNajis();
      } else {
        prevNajis();
      }
      setIsDragging(false);
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  // Add event listeners
  useEffect(() => {
    const carousel = carouselRef.current;
    if (carousel) {
      carousel.addEventListener('touchstart', handleTouchStart as unknown as EventListener);
      carousel.addEventListener('touchmove', handleTouchMove as unknown as EventListener);
      carousel.addEventListener('touchend', handleTouchEnd);
      carousel.addEventListener('mousedown', handleTouchStart as unknown as EventListener);
      carousel.addEventListener('mousemove', handleTouchMove as unknown as EventListener);
      carousel.addEventListener('mouseup', handleTouchEnd);
      carousel.addEventListener('mouseleave', handleTouchEnd);
    }

    return () => {
      if (carousel) {
        carousel.removeEventListener('touchstart', handleTouchStart as unknown as EventListener);
        carousel.removeEventListener('touchmove', handleTouchMove as unknown as EventListener);
        carousel.removeEventListener('touchend', handleTouchEnd);
        carousel.removeEventListener('mousedown', handleTouchStart as unknown as EventListener);
        carousel.removeEventListener('mousemove', handleTouchMove as unknown as EventListener);
        carousel.removeEventListener('mouseup', handleTouchEnd);
        carousel.removeEventListener('mouseleave', handleTouchEnd);
      }
    };
  }, [isDragging, startX]);
  
  return (
    <div className="screen chose-screen">
      <button className="back-button" onClick={onBack}>
        <img src="/images/back-icon.svg" alt="Back" className="back-icon" />
      </button>
      
      <h2 className="chose-title">Pilih Najis</h2>
      
      <div className="najis-carousel" ref={carouselRef}>
        <button className="nav-btn prev-btn" onClick={prevNajis}>
          <img src="/images/geser-kiri.svg" alt="Previous" className="nav-icon" />
        </button>
        
        <div className="najis-display">
          {currentNajis.id === 'masyarakat' && (
            <>
              {!showSpecialMessage ? (
                <img 
                  src={currentNajis.image} 
                  alt={currentNajis.name}
                  className="najis-image"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null;
                    target.src = currentNajis.placeholder;
                  }}
                />
              ) : (
                <div className="special-message-container">
                  {showCharacter && (
                    <img 
                      src="/images/character.png" 
                      alt="Character" 
                      className="character-special fade-in-up"
                    />
                  )}
                  {showCharacter && (
                    <div className="bubble-container">
                      <img 
                        src="/images/bubble-text.png" 
                        alt="Bubble text" 
                        className="bubble-text fade-in"
                      />
                      <p className="bubble-message fade-in">Ups maaf kurikulumnya nyasar</p>
                    </div>
                  )}
                </div>
              )}
            </>
          )}
          
          {currentNajis.id !== 'masyarakat' && (
            <img 
              src={currentNajis.image} 
              alt={currentNajis.name}
              className="najis-image"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.onerror = null;
                target.src = currentNajis.placeholder;
              }}
            />
          )}
          
          <h3 className="najis-name">{currentNajis.name}</h3>
          <p className="najis-description">{currentNajis.description}</p>
        </div>
        
        <button className="nav-btn next-btn" onClick={nextNajis}>
          <img src="/images/geser-kanan.svg" alt="Next" className="nav-icon" />
        </button>
      </div>
      
      <div className="carousel-indicators">
        {najisTypes.map((_, index) => (
          <span 
            key={index} 
            className={`indicator-dot ${index === currentNajisIndex ? 'active' : ''}`}
            onClick={() => setCurrentNajisIndex(index)}
          ></span>
        ))}
      </div>
      
      <button 
        className="simulate-button button" 
        onClick={() => onSelect(currentNajis.id)}
        disabled={currentNajis.id === 'masyarakat' && showSpecialMessage}
      >
        Simulasikan
      </button>
    </div>
  );
};

export default ChoseScreen; 