import { useState, useEffect } from 'react';

/**
 * Custom hook to detect if a specific media query matches.
 * Useful for Mobile-First or responsive conditional rendering.
 * 
 * @param query CSS Media Query (e.g., "(max-width: 768px)")
 * @returns boolean
 */
export const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    
    const listener = () => setMatches(media.matches);
    media.addEventListener('change', listener);
    
    return () => media.removeEventListener('change', listener);
  }, [matches, query]);

  return matches;
};
