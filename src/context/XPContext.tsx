import React, { createContext, useContext, useState } from 'react';

interface XPContextType {
  xp: number;
  addXP: (amount: number) => void;
  unlockedHero: boolean;
  setUnlockedHero: (v: boolean) => void;
  unlockedSkills: number;
  setUnlockedSkills: (v: number) => void;
  fixedBug: boolean;
  setFixedBug: (v: boolean) => void;
}

const XPContext = createContext<XPContextType>({} as XPContextType);

export const useXP = () => useContext(XPContext);

export const XPProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [xp, setXp] = useState(0);
  const [unlockedHero, setUnlockedHero] = useState(false);
  const [unlockedSkills, setUnlockedSkills] = useState(0);
  const [fixedBug, setFixedBug] = useState(false);

  const addXP = (amount: number) => {
    setXp(prev => prev + amount);
  };

  return (
    <XPContext.Provider value={{ xp, addXP, unlockedHero, setUnlockedHero, unlockedSkills, setUnlockedSkills, fixedBug, setFixedBug }}>
      {children}
    </XPContext.Provider>
  );
};
