// StoryPlayingContext.js
// Checking if the story is playing or not
// use it to stop the sounds while the story is playing

import React, { createContext, useContext, useEffect, useState } from "react";

const StoryPlayingContext = createContext();

export function StoryProvider({ children }) {
  const [isStoryPlaying, setIsStoryPlaying] = useState(false);

  return (
    <StoryPlayingContext.Provider value={{ isStoryPlaying, setIsStoryPlaying }}>
      {children}
    </StoryPlayingContext.Provider>
  );
}

export function useStoryPlaying() {
  return useContext(StoryPlayingContext);
}
