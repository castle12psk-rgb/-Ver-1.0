import React from 'react';

const UsersIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m-7.5-2.962a3.75 3.75 0 015.25 0m-5.25 0a3.75 3.75 0 00-5.25 0m7.5-3.375c0-1.036.84-1.875 1.875-1.875h.375c1.036 0 1.875.84 1.875 1.875v.375c0 1.036-.84 1.875-1.875 1.875h-.375A1.875 1.875 0 0112 12.375v-.375z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.375 19.5a9 9 0 0115-5.25m-15 5.25a9 9 0 00-2.25-5.25m2.25 5.25c.334.58.743 1.114 1.185 1.603" />
  </svg>
);

export default UsersIcon;
