import React from 'react';
import ArrowLeftOnRectangleIcon from './icons/ArrowLeftOnRectangleIcon';
import ArrowRightOnRectangleIcon from './icons/ArrowRightOnRectangleIcon';

interface AdminToggleProps {
  isAdmin: boolean;
  setIsAdmin: (isAdmin: boolean) => void;
}

const AdminToggle: React.FC<AdminToggleProps> = ({ isAdmin, setIsAdmin }) => {
  return (
    <div className="flex flex-col items-center">
      <label htmlFor="admin-toggle" className="flex items-center cursor-pointer">
        <div className="relative">
          <input 
            id="admin-toggle" 
            type="checkbox" 
            className="sr-only" 
            checked={isAdmin} 
            onChange={() => setIsAdmin(!isAdmin)} 
          />
          <div className="block bg-gray-600 w-14 h-8 rounded-full"></div>
          <div className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform ${isAdmin ? 'transform translate-x-6 bg-yellow-300' : ''}`}></div>
        </div>
      </label>
      <div className="mt-2 text-sm text-center">
        {isAdmin ? (
            <div className='flex items-center gap-2'>
                <ArrowLeftOnRectangleIcon className="w-5 h-5" />
                <span>사용자 모드로 전환</span>
            </div>
        ) : (
            <div className='flex items-center gap-2'>
                <ArrowRightOnRectangleIcon className="w-5 h-5" />
                <span>관리자 모드로 전환</span>
            </div>
        )}
      </div>
    </div>
  );
};

export default AdminToggle;
