import React, { useState, useEffect } from 'react';
import './SimulatorScreen.css';
import { SimulatorScreenProps, NajisTypeId, CleaningMethod, NajisData } from '../types';

const SimulatorScreen = ({ najisType, onBack, onSuccess }: SimulatorScreenProps) => {
  // State for najis properties
  const [physicalForm, setPhysicalForm] = useState(100);
  const [smell, setSmell] = useState(100);
  const [color, setColor] = useState(100);
  const [cleaningMessage, setCleaningMessage] = useState('');
  const [isAiniyahClean, setIsAiniyahClean] = useState(false);
  
  // Define najis types data
  const najisData: Record<NajisTypeId, NajisData> = {
    mukhofafah: {
      name: 'Najis Mukhofafah',
      description: 'Najis ringan seperti air kencing bayi laki-laki yang belum makan apapun selain ASI.',
      image: '/images/najis-ringan.png',
      phase2Image: '/images/phase02-low.png',
      placeholder: 'https://via.placeholder.com/200x200/FFEB3B/333333?text=Najis+Mukhofafah',
      color: '#FFEB3B',
      tip: 'Tips: Cukup percikkan air pada area najis hingga bersih'
    },
    mutawasitho: {
      name: 'Najis Mutawasitho',
      description: 'Najis sedang seperti darah, nanah, kotoran hewan, dan sebagainya.',
      image: '/images/najis-sedang.png',
      phase2Image: '/images/phase02-med.png',
      placeholder: 'https://via.placeholder.com/200x200/A0522D/FFFFFF?text=Najis+Mutawasitho',
      color: '#A0522D',
      tip: 'Tips: Basuh air sampai hilang sifat bentuk fisik dan baunya'
    },
    mugholado: {
      name: 'Najis Mugholado',
      description: 'Najis berat seperti air liur anjing, babi, dan turunannya.',
      image: '/images/najis-heavy.png',
      phase2Image: '/images/phase02-high.png',
      placeholder: 'https://via.placeholder.com/200x200/333333/FFFFFF?text=Najis+Mugholado',
      color: '#333333',
      tip: 'Tips: Basuh 7 kali, salah satunya dengan tanah'
    },
    masyarakat: {
      name: 'Najis Masyarakat',
      description: 'Najis yang ada di masyarakat seperti korupsi, kolusi, dan nepotisme.',
      image: '/images/tikus-berdasi.png',
      phase2Image: '/images/phase02-med.png', // Default for masyarakat
      placeholder: 'https://via.placeholder.com/200x200/000000/FFFFFF?text=Najis+Masyarakat',
      color: '#000000',
      tip: 'Tips: Najis ini sulit dibersihkan karena sudah mengakar di masyarakat'
    }
  };
  
  // Get current najis data based on selected type
  const currentNajis = najisData[najisType] || najisData.mutawasitho;
  
  // Define cleaning methods for Ainiyah layer
  const ainiyahCleaningMethod: CleaningMethod = {
    id: 'remove_physical',
    name: 'Angkat/Buang kotoran yang nampak',
    icon: '/images/bersih-bar.png',
    effectiveness: {
      mukhofafah: { physical: 100, smell: 0, color: 0 },
      mutawasitho: { physical: 100, smell: 0, color: 0 },
      mugholado: { physical: 100, smell: 0, color: 0 },
      masyarakat: { physical: 100, smell: 0, color: 0 },
    }
  };

  // Define cleaning methods for Hukmiyah layer
  const hukmiyahCleaningMethods: CleaningMethod[] = [
    {
      id: 'water',
      name: najisType === 'mukhofafah' ? 'Percikkan Air' : 'Basuhan Air',
      icon: najisType === 'mukhofafah' ? '/images/percikan-icon.png' : '/images/basuhan-icon.png',
      effectiveness: {
        mukhofafah: { physical: 0, smell: 70, color: 70 },
        mutawasitho: { physical: 0, smell: 40, color: 40 },
        mugholado: { physical: 0, smell: 20, color: 20 },
        masyarakat: { physical: 0, smell: 10, color: 10 }
      }
    },
    {
      id: 'soap',
      name: 'Sabun',
      icon: '/images/sabun-icon.png',
      effectiveness: {
        mukhofafah: { physical: 0, smell: 60, color: 60 },
        mutawasitho: { physical: 0, smell: 50, color: 50 },
        mugholado: { physical: 0, smell: 30, color: 30 },
        masyarakat: { physical: 0, smell: 15, color: 15 }
      }
    },
    {
      id: 'earth',
      name: 'Tanah',
      icon: '/images/tanah-icon.png',
      effectiveness: {
        mukhofafah: { physical: 0, smell: 20, color: 20 },
        mutawasitho: { physical: 0, smell: 20, color: 20 },
        mugholado: { physical: 0, smell: 40, color: 40 },
        masyarakat: { physical: 0, smell: 1, color: 1 }
      }
    }
  ];

  // Apply cleaning method
  const applyCleaningMethod = (method: CleaningMethod) => {
    const effectiveness = method.effectiveness[najisType] || method.effectiveness.mutawasitho;
    
    if (method.id === 'remove_physical') {
      setPhysicalForm(0); // Remove physical form completely
      setCleaningMessage(`Menggunakan ${method.name}...`);
    } else {
      setSmell((prev) => Math.max(0, prev - effectiveness.smell));
      setColor((prev) => Math.max(0, prev - effectiveness.color));
      setCleaningMessage(`Menggunakan ${method.name}...`);
    }
    
    // Clear message after 2 seconds
    setTimeout(() => {
      setCleaningMessage('');
    }, 2000);
  };
  
  // Check if Ainiyah is clean
  useEffect(() => {
    if (physicalForm === 0 && !isAiniyahClean) {
      setIsAiniyahClean(true);
      setCleaningMessage('Bentuk fisik najis sudah hilang, lanjutkan ke tahap hukmiyah.');
      setTimeout(() => {
        setCleaningMessage('');
      }, 3000);
    }
  }, [physicalForm, isAiniyahClean]);

  // Check if najis is completely clean (Hukmiyah)
  useEffect(() => {
    if (isAiniyahClean && smell === 0 && color === 0) {
      onSuccess(); // Call onSuccess prop to navigate to SuccessScreen
    }
  }, [isAiniyahClean, smell, color, onSuccess]);
  
  return (
    <div className="screen simulator-screen">
      <button className="back-button" onClick={onBack}>
        <img src="/images/back-icon.svg" alt="Back" className="back-icon" />
      </button>
      
      <div className="simulator-header">
        <h2>{currentNajis.name}</h2>
      </div>
      
      <div className="najis-status">
        <h3>Status Najis</h3>
        
        {/* Layer 1: Ainiyah (Physical Form) */}
        {!isAiniyahClean && (
          <div className="status-indicator">
            <div className="indicator-label">
              <img src="/images/bentuk-indicator.png" alt="Bentuk" className="indicator-icon-img" />
              <span>Bentuk fisik</span>
            </div>
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${physicalForm}%`, backgroundColor: currentNajis.color }}
              ></div>
            </div>
            <span className="percentage">{physicalForm}%</span>
          </div>
        )}
        
        {/* Layer 2: Hukmiyah (Smell and Color) */}
        {isAiniyahClean && (
          <>
            <div className="status-indicator">
              <div className="indicator-label">
                <img src="/images/bau-indicator.png" alt="Bau" className="indicator-icon-img" />
                <span>Bau</span>
              </div>
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ width: `${smell}%`, backgroundColor: currentNajis.color }}
                ></div>
              </div>
              <span className="percentage">{smell}%</span>
            </div>
            
            <div className="status-indicator">
              <div className="indicator-label">
                <img src="/images/warna-indicator.png" alt="Warna" className="indicator-icon-img" />
                <span>Warna/Rasa</span>
              </div>
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ width: `${color}%`, backgroundColor: currentNajis.color }}
                ></div>
              </div>
              <span className="percentage">{color}%</span>
            </div>
          </>
        )}
      </div>
      
      <div className="najis-display-container">
        <img 
          src={isAiniyahClean ? currentNajis.phase2Image : currentNajis.image} 
          alt={currentNajis.name}
          className="najis-simulator-image"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.onerror = null;
            target.src = currentNajis.placeholder;
          }}
          style={{ 
            opacity: isAiniyahClean ? ((smell + color) / 200) : (physicalForm / 100),
            borderColor: currentNajis.color
          }}
        />
      </div>
      
      <div className="cleaning-tip">
        <p>{currentNajis.tip}</p>
      </div>
      
      <div className="cleaning-methods">
        {!isAiniyahClean ? (
          <button 
            className="cleaning-method-button full-width-button"
            onClick={() => applyCleaningMethod(ainiyahCleaningMethod)}
          >
            <img src={ainiyahCleaningMethod.icon} alt={ainiyahCleaningMethod.name} className="methodain-icon-img" />
          </button>
        ) : (
          hukmiyahCleaningMethods.map((method) => (
            <button 
              key={method.id}
              className="cleaning-method-button"
              onClick={() => applyCleaningMethod(method)}
            >
              <img src={method.icon} alt={method.name} className="method-icon-img" />
              <span className="method-name">{method.name}</span>
            </button>
          ))
        )}
      </div>
      
      {cleaningMessage && (
        <div className={`cleaning-message ${physicalForm === 0 && smell === 0 && color === 0 ? 'success' : ''}`}>
          {cleaningMessage}
        </div>
      )}
    </div>
  );
};

export default SimulatorScreen; 