import React, { useState } from 'react';
import GlobeAltIcon from './icons/GlobeAltIcon';
import ClockIcon from './icons/ClockIcon';
import HourglassIcon from './icons/HourglassIcon';
import BrainIcon from './icons/BrainIcon';
import ExclamationTriangleIcon from './icons/ExclamationTriangleIcon';
import MinusIcon from './icons/MinusIcon';
import WindowIcon from './icons/WindowIcon';
import Square2StackIcon from './icons/Square2StackIcon';
import XMarkIcon from './icons/XMarkIcon';

interface ContentDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  content: any | null;
}

const ContentDetailModal: React.FC<ContentDetailModalProps> = ({ isOpen, onClose, content }) => {
  const [modalState, setModalState] = useState<'normal' | 'maximized' | 'minimized'>('normal');
  const [preMinimizeState, setPreMinimizeState] = useState<'normal' | 'maximized'>('maximized');

  if (!isOpen || !content) return null;

  const handleToggleMaximize = (e: React.MouseEvent) => {
    e.stopPropagation();
    setModalState(prev => (prev === 'maximized' ? 'normal' : 'maximized'));
  };

  const handleMinimize = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (modalState !== 'minimized') {
        setPreMinimizeState(modalState);
    }
    setModalState('minimized');
  };
  
  const handleInternalClose = (e: React.MouseEvent) => {
      e.stopPropagation();
      onClose();
  }

  const handleRestore = () => {
    setModalState(preMinimizeState);
  };

  const wrapperClasses = {
    normal: "w-full max-w-4xl h-[95vh]",
    maximized: "w-screen h-screen rounded-none",
    minimized: "w-96 fixed bottom-4 right-4 animate-fadeInUp cursor-pointer",
  };
  
  const modalRootClasses = `
    fixed inset-0 bg-black bg-opacity-70 z-[60]
    ${modalState === 'minimized' ? 'pointer-events-none flex items-end justify-end' : 'flex items-center justify-center'}
  `;

  return (
    <div 
        className={modalRootClasses}
        onClick={modalState !== 'minimized' ? onClose : undefined}
        aria-modal="true"
        role="dialog"
    >
      <div 
        className={`bg-white rounded-xl shadow-2xl flex flex-col overflow-hidden transition-all duration-300 ${wrapperClasses[modalState]} ${modalState === 'minimized' ? 'pointer-events-auto' : ''}`}
        onClick={modalState === 'minimized' ? handleRestore : e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b bg-gray-50 flex-shrink-0">
          <div className="flex justify-between items-start">
            <h2 className={`font-bold text-primary-dark pr-4 truncate ${modalState !== 'minimized' ? 'text-2xl' : 'text-lg'}`}>{content.title}</h2>
            <div className="flex items-center gap-1 flex-shrink-0">
              {modalState !== 'minimized' ? (
                <>
                  <button onClick={handleMinimize} className="p-2 rounded-full text-gray-500 hover:bg-gray-200 hover:text-gray-900 transition-colors"><MinusIcon className="w-5 h-5"/></button>
                  <button onClick={handleToggleMaximize} className="p-2 rounded-full text-gray-500 hover:bg-gray-200 hover:text-gray-900 transition-colors">
                    {modalState === 'maximized' ? <Square2StackIcon className="w-5 h-5" /> : <WindowIcon className="w-5 h-5" />}
                  </button>
                  <button onClick={handleInternalClose} className="p-2 rounded-full text-gray-500 hover:bg-gray-200 hover:text-gray-900 transition-colors"><XMarkIcon className="w-5 h-5" /></button>
                </>
              ) : (
                <button onClick={handleInternalClose} className="p-1 rounded-full text-gray-500 hover:bg-gray-200 hover:text-gray-900 transition-colors"><XMarkIcon className="w-4 h-4" /></button>
              )}
            </div>
          </div>
          {modalState !== 'minimized' && (
            <div className="flex items-center flex-wrap gap-x-6 gap-y-2 mt-3 text-sm text-gray-500">
             <div className="flex items-center gap-2">
                <GlobeAltIcon className="w-5 h-5" />
                <span>{content.source}</span>
             </div>
             <div className="flex items-center gap-2">
                <ClockIcon className="w-5 h-5" />
                <span>{content.time}</span>
             </div>
             <div className="flex items-center gap-2 text-purple-800">
                <HourglassIcon className="w-5 h-5" />
                <span className="font-medium">{content.status}</span>
             </div>
          </div>
          )}
        </div>
        
        {modalState !== 'minimized' && (
          <>
            <div className="p-8 overflow-y-auto flex-grow">
                <div className="prose max-w-none">
                    <p>{content.fullText}</p>
                </div>
            </div>

            <div className="p-4 border-t bg-gray-50 flex-shrink-0 flex justify-end gap-3">
                <button className="flex items-center gap-2 bg-red-100 text-red-700 px-4 py-2 rounded-md hover:bg-red-200 transition-colors">
                    <ExclamationTriangleIcon className="h-5 w-5" />
                    오보로 신고
                </button>
                <button className="flex items-center gap-2 bg-primary-dark text-white px-4 py-2 rounded-md hover:bg-primary-light transition-colors">
                    <BrainIcon className="h-5 h-5" />
                    즉시 AI 검증 요청
                </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ContentDetailModal;