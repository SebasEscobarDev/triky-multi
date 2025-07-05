import React, { createContext, useContext, useState, useEffect } from 'react';

interface GameMatchContextProps {
  isSearchingMatch: boolean;
  startMatchSearch: () => void;
  cancelMatchSearch: () => void;
  elapsedTime: number;
  estimatedTime: number;
}

const GameMatchContext = createContext<GameMatchContextProps>({
  isSearchingMatch: false,
  startMatchSearch: () => {},
  cancelMatchSearch: () => {},
  elapsedTime: 0,
  estimatedTime: 104 // 1:44 en segundos (como se ve en la imagen)
});

export const useGameMatch = () => useContext(GameMatchContext);

export const GameMatchProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isSearchingMatch, setIsSearchingMatch] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [estimatedTime] = useState(104); // 1:44 en segundos
  const [timer, setTimer] = useState<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    // Limpiar el temporizador cuando el componente se desmonte
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [timer]);

  const startMatchSearch = () => {
    setIsSearchingMatch(true);
    setElapsedTime(0);
    
    // Iniciar temporizador para actualizar tiempo transcurrido
    const intervalId = setInterval(() => {
      setElapsedTime(prev => prev + 1);
    }, 1000);
    
    setTimer(intervalId);
  };

  const cancelMatchSearch = () => {
    setIsSearchingMatch(false);
    if (timer) {
      clearInterval(timer);
      setTimer(null);
    }
  };

  return (
    <GameMatchContext.Provider 
      value={{
        isSearchingMatch,
        startMatchSearch,
        cancelMatchSearch,
        elapsedTime,
        estimatedTime
      }}
    >
      {children}
    </GameMatchContext.Provider>
  );
};
