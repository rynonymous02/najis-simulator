// Define types for the application

// Najis types
export type NajisTypeId = 'mukhofafah' | 'mutawasitho' | 'mugholado' | 'masyarakat';

// Interface for najis data
export interface NajisData {
  name: string;
  description: string;
  image: string;
  phase2Image?: string;
  placeholder: string;
  color: string;
  tip: string;
}

// Interface for najis types in ChoseScreen
export interface NajisType {
  id: NajisTypeId;
  name: string;
  description: string;
  image: string;
  placeholder: string;
}

// Interface for cleaning method effectiveness
export interface CleaningEffectiveness {
  physical: number;
  smell: number;
  color: number;
}

// Interface for cleaning methods
export interface CleaningMethod {
  id: string;
  name: string;
  icon: string;
  effectiveness: {
    [key in NajisTypeId]: CleaningEffectiveness;
  };
}

// Props interfaces for components
export interface StartScreenProps {
  onStart: () => void;
}

export interface ChoseScreenProps {
  onSelect: (najisType: NajisTypeId) => void;
  onBack: () => void;
}

export interface SimulatorScreenProps {
  najisType: NajisTypeId;
  onBack: () => void;
  onSuccess: () => void;
}

export interface SuccessScreenProps {
  onBackToChose: () => void;
} 