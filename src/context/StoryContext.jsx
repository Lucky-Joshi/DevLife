import React, { createContext, useContext, useState } from 'react';

const StoryContext = createContext({});

export const useStory = () => useContext(StoryContext);

export const StoryProvider = ({ children }) => {
  const [unlockedHero, setUnlockedHero] = useState(false);
  const [unlockedSkills, setUnlockedSkills] = useState(0);
  const [fixedBug, setFixedBug] = useState(false);

  return (
    <StoryContext.Provider value={{ unlockedHero, setUnlockedHero, unlockedSkills, setUnlockedSkills, fixedBug, setFixedBug }}>
      {children}
    </StoryContext.Provider>
  );
};
