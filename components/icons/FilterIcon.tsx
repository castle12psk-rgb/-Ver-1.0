import React from 'react';

const FilterIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c-1.1 0-2.05.5-2.65 1.25L4 11h16l-5.35-6.75A3.003 3.003 0 0012 3zm-2.82 8l-1.97 2.47A1 1 0 008 15h8a1 1 0 00.79-1.53L14.82 11H9.18z" />
  </svg>
);

export default FilterIcon;
