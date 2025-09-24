import React from 'react';

const BeakerIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 6.087c0-.355.186-.676.401-.959.221-.29.349-.634.349-1.003 0-1.036-1.007-1.875-2.25-1.875s-2.25.84-2.25 1.875c0 .369.128.713.349 1.003.215.283.401.604.401.959v.344c0 .355-.186.676-.401.959a2.238 2.238 0 0 1-.349 1.003c-.215.283-.401.604-.401.959v4.661a1.125 1.125 0 0 0 .375 2.625l.169.305c.414.746 1.569.746 1.983 0l.169-.305a1.125 1.125 0 0 0 .375-2.625v-4.661c0-.355-.186-.676-.401-.959a2.238 2.238 0 0 1-.349-1.003c-.215-.283-.401-.604-.401-.959v-.344ZM16.5 21a1.5 1.5 0 0 0 1.5-1.5v-3.375h-9v3.375a1.5 1.5 0 0 0 1.5 1.5h6Z" />
  </svg>
);

export default BeakerIcon;
