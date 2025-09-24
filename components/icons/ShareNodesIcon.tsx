import React from 'react';

const ShareNodesIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 100-18 9 9 0 000 18z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 10.5L7.5 15l3 1.5 1.5-3-1.5-3z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 13.5L16.5 9l-3-1.5-1.5 3 1.5 3z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 10.5l3 3" />
  </svg>
);

export default ShareNodesIcon;
