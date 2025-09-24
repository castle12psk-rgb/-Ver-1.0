import React from 'react';

const KTIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" {...props}>
    <path fill="#d9242d" d="M0 0h100v100H0z" />
    <path fill="#fff" d="M25 35h10v30H25zM40 35h10v30H40zM55 50h20v15H55z" />
  </svg>
);

export default KTIcon;
