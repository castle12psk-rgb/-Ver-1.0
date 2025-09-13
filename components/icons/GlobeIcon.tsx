
import React from 'react';

const GlobeIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 100-18 9 9 0 000 18z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 100-18 9 9 0 000 18zM3.75 9h16.5m-16.5 6h16.5M9 3.75c.5-1 1.5-1.5 2.25-1.5s1.75.5 2.25 1.5M9 20.25c.5 1 1.5 1.5 2.25 1.5s1.75-.5 2.25-1.5" />
  </svg>
);

export default GlobeIcon;
