import React, { createContext, useContext, useState, ReactNode } from 'react';

interface FeatureValues {
  seasonalDemand: number;
  marketingSpend: number;
  inventoryLevels: number;
  economicIndex: number;
  competitionPrice: number;
}

interface FeatureImportanceContextType {
  featureValues: FeatureValues;
  updateFeatureValue: (feature: keyof FeatureValues, value: number) => void;
}

const defaultValues: FeatureValues = {
  seasonalDemand: 85,
  marketingSpend: 72,
  inventoryLevels: 68,
  economicIndex: 54,
  competitionPrice: 41,
};

const FeatureImportanceContext = createContext<FeatureImportanceContextType | undefined>(undefined);

export const FeatureImportanceProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [featureValues, setFeatureValues] = useState<FeatureValues>(defaultValues);

  const updateFeatureValue = (feature: keyof FeatureValues, value: number) => {
    setFeatureValues(prev => ({
      ...prev,
      [feature]: value
    }));
  };

  return (
    <FeatureImportanceContext.Provider value={{ featureValues, updateFeatureValue }}>
      {children}
    </FeatureImportanceContext.Provider>
  );
};

export const useFeatureImportance = () => {
  const context = useContext(FeatureImportanceContext);
  if (context === undefined) {
    throw new Error('useFeatureImportance must be used within a FeatureImportanceProvider');
  }
  return context;
};