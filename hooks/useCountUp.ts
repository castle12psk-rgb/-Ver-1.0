import React, { useState, useEffect, useRef } from 'react';

const easeOutExpo = (t: number) => {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
};

export const useCountUp = (end: number, duration = 1500) => {
  const [count, setCount] = useState(0);
  const startValue = useRef(0);
  const frameRate = 1000 / 60;
  const totalFrames = Math.round(duration / frameRate);
  
  useEffect(() => {
    startValue.current = count; 
    let frame = 0;

    const counter = setInterval(() => {
      frame++;
      const progress = easeOutExpo(frame / totalFrames);
      const currentCount = Math.round(startValue.current + (end - startValue.current) * progress);
      setCount(currentCount);

      if (frame === totalFrames) {
        clearInterval(counter);
        setCount(end);
      }
    }, frameRate);

    return () => clearInterval(counter);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [end, duration, frameRate, totalFrames]);

  return count;
};
