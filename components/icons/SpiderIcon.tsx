import React from 'react';

const SpiderIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 12.75a.75.75 0 100-1.5.75.75 0 000 1.5z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a8.25 8.25 0 100-16.5 8.25 8.25 0 000 16.5zM12 21v1.5m0-19.5V1.5m8.25 9.75h1.5m-19.5 0h1.5" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75l-1.5 1.5m-10.5 7.5l-1.5 1.5m1.5-10.5l-1.5-1.5m10.5 7.5l1.5-1.5" />
  </svg>
);

export default SpiderIcon;