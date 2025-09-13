import React from 'react';

const ShieldCheckIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    {/* FIX: Corrected the broken SVG path data for the icon. */}
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m0 0l-2.25 2.25M12 21.75l5.13-2.222a12.022 12.022 0 002.63-3.181 12.022 12.022 0 000-6.68l-2.63-3.181a12.022 12.022 0 00-5.13-2.222L12 2.25l-5.13 2.222a12.022 12.022 0 00-2.63 3.181 12.022 12.022 0 000 6.68l2.63 3.181a12.022 12.022 0 005.13 2.222z" />
  </svg>
);

export default ShieldCheckIcon;
