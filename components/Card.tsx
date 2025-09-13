import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  bodyClassName?: string;
}

const Card: React.FC<CardProps> = ({ children, className = '', title, bodyClassName = 'p-6' }) => {
  return (
    <div className={`bg-white rounded-lg shadow-md flex flex-col ${className}`}>
      {title && (
        <div className="p-4 border-b border-gray-200 flex-shrink-0">
          <h2 className="text-xl font-semibold text-secondary">{title}</h2>
        </div>
      )}
      <div className={`${bodyClassName} flex-grow`}>
        {children}
      </div>
    </div>
  );
};

export default Card;
