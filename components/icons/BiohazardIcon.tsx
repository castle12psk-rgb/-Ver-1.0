import React from 'react';

const BiohazardIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.83-5.83M11.42 15.17l2.496-3.03c.52.832 1.29 1.504 2.207 1.938a3.749 3.749 0 004.816-1.086 3.75 3.75 0 00-1.086-4.816 3.749 3.749 0 00-1.938-2.207c-.832-.52-1.504-1.29-1.938-2.207a3.75 3.75 0 00-4.816 1.086 3.75 3.75 0 001.086 4.816c.434.917 1.106 1.687 1.938 2.207l-3.03 2.496m-4.28 4.28a3.75 3.75 0 000-5.303 3.75 3.75 0 00-5.303 0 3.75 3.75 0 000 5.303 3.75 3.75 0 005.303 0z" />
  </svg>
);

export default BiohazardIcon;