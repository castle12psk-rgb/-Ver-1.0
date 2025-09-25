import React from 'react';

const ChromaDbIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" {...props}>
        <circle cx="50" cy="50" r="45" fill="#f0f0f0" stroke="#ccc" strokeWidth="2" />
        <circle cx="50" cy="50" r="30" fill="none" stroke="#888" strokeWidth="4" strokeDasharray="10 5" />
        <circle cx="35" cy="35" r="8" fill="#ff6347" />
        <circle cx="65" cy="35" r="8" fill="#4682b4" />
        <circle cx="35" cy="65" r="8" fill="#32cd32" />
        <circle cx="65" cy="65" r="8" fill="#ffd700" />
    </svg>
);

export default ChromaDbIcon;
