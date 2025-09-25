import React from 'react';

const PostGisIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" {...props}>
        <path fill="#6699CC" d="M50 10A40 40 0 1050 90A40 40 0 1050 10M50 2A48 48 0 1150 98A48 48 0 1150 2" />
        <path fill="#FFFFFF" d="M50 25c-8,0 -15,7 -15,15s7,15 15,15s15,-7 15,-15s-7,-15 -15,-15zm0 25c-5,0 -10,-5 -10,-10s5,-10 10,-10s10,5 10,10s-5,10 -10,10z" />
        <path fill="#FFFFFF" d="M30 60h40v10h-40z" />
        <path fill="#000000" d="M35 35h5v5h-5zm10 0h5v5h-5zm10 0h5v5h-5zM35 65h30v5h-30z" />
    </svg>
);

export default PostGisIcon;
