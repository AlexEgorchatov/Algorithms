import { createContext } from 'react';

interface animationProps {
  startAlgorithm: () => Promise<void>;
  stopAlgorithm: () => Promise<void>;
  completeAlgorithm: () => Promise<void>;
}

export const animationContext = createContext<animationProps>({
  startAlgorithm: () => Promise.resolve(),
  stopAlgorithm: () => Promise.resolve(),
  completeAlgorithm: () => Promise.resolve(),
});
