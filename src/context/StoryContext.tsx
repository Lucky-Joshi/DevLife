import React, { createContext, useContext, useState } from 'react';

interface StoryContextType {
  unlockedHero: boolean;
  setUnlockedHero: (v: boolean) => void;
  unlockedSkills: number;
  setUnlockedSkills: (v: number) => void;
  fixedBug: boolean;
  setFixedBug: (v: boolean) => void;
}

const StoryContext = createContext<StoryContextType>({} as StoryContextType);

export const useStory = () => useContext(StoryContext);

export const StoryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [unlockedHero, setUnlockedHero] = useState(false);
  const [unlockedSkills, setUnlockedSkills] = useState(0);
  const [fixedBug, setFixedBug] = useState(false);

  return (
    <StoryContext.Provider value={{ unlockedHero, setUnlockedHero, unlockedSkills, setUnlockedSkills, fixedBug, setFixedBug }}>
      {children}
    </StoryContext.Provider>
  );
};
