


// hooks/useIntersectionObserver.js
import { useEffect, useState } from 'react';

const useIntersectionObserver = (ref, isEnabled = true, options = { threshold: 0.1 }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!isEnabled) return;

    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting);
    }, options);

    const current = ref?.current;
    if (current) observer.observe(current);

    return () => observer.disconnect();
  }, [ref, isEnabled, options]);

  return isVisible;
};

export default useIntersectionObserver;
