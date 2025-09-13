import React from 'react';

const LightBulbIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.311V21m-3.75 0h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5c0-.621.504-1.125 1.125-1.125H9.75M12 15.75c-1.336 0-2.917.348-4.5 1.018m7.5 0c.982-.324 1.934-.744 2.823-1.25M12 15.75a3 3 0 01-3-3V4.5a3 3 0 013-3h.008c1.657 0 3.008 1.343 3.008 3v8.25a3 3 0 01-3 3z" />
  </svg>
);

export default LightBulbIcon;