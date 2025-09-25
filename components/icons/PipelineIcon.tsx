import React from 'react';

const PipelineIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a7.5 7.5 0 100 12h3a7.5 7.5 0 100-12h-3z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 9a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 12H21m-3-3v6" />
  </svg>
);

export default PipelineIcon;