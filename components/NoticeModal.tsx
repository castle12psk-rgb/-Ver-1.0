import React, { useState } from 'react';
import { FULL_NOTICES_DATA } from '../constants';
import MegaphoneIcon from './icons/MegaphoneIcon';
import SparklesIcon from './icons/SparklesIcon';
import WrenchScrewdriverIcon from './icons/WrenchScrewdriverIcon';
import ChevronDownIcon from './icons/ChevronDownIcon';
import MinusIcon from './icons/MinusIcon';
import WindowIcon from './icons/WindowIcon';
import Square2StackIcon from './icons/Square2StackIcon';
import XMarkIcon from './icons/XMarkIcon';

interface NoticeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const categoryStyles: { [key: string]: { icon: React.FC<any>, color: string, bg: string } } = {
    '공지': { icon: MegaphoneIcon, color: 'text-gray-800', bg: 'bg-gray-100' },
    '업데이트': { icon: SparklesIcon, color: 'text-blue-800', bg: 'bg-blue-100' },
    '점검': { icon: WrenchScrewdriverIcon, color: 'text-yellow-800', bg: 'bg-yellow-100' },
};

const NoticeModal: React.FC<NoticeModalProps> = ({ isOpen, onClose }) => {
  const [modalState, setModalState] = useState<'normal' | 'maximized' | 'minimized'>('normal');
  const [openNoticeId, setOpenNoticeId] = useState<number | null>(FULL_NOTICES_DATA[0]?.id || null);

  if (!isOpen) return null;
  
  const handleToggleMaximize = (e: React.MouseEvent) => {
    e.stopPropagation();
    setModalState(prev => (prev === 'maximized' ? 'normal' : 'maximized'));
  };

  const handleMinimize = (e: React.MouseEvent) => {
    e.stopPropagation();
    setModalState('minimized');
  };
  
  const handleInternalClose = (e: React.MouseEvent) => {
      e.stopPropagation();
      setModalState('normal'); // Reset state before closing
      onClose();
  }

  const handleRestore = () => {
    setModalState('normal');
  };
  
  const wrapperClasses = {
    normal: "w-full max-w-4xl h-[80vh]",
    maximized: "w-screen h-screen rounded-none",
    minimized: "w-96 fixed bottom-4 right-4 animate-fadeInUp cursor-pointer",
  };
  
  const modalRootClasses = `
    fixed inset-0 bg-black bg-opacity-60 z-[60]
    ${modalState === 'minimized' ? 'pointer-events-none flex items-end justify-end' : 'flex items-center justify-center'}
  `;

  return (
    <div 
        className={modalRootClasses}
        onClick={modalState !== 'minimized' ? handleInternalClose : undefined}
        aria-modal="true"
        role="dialog"
    >
      <div 
        className={`bg-white rounded-xl shadow-2xl flex flex-col overflow-hidden transition-all duration-300 ${wrapperClasses[modalState]} ${modalState === 'minimized' ? 'pointer-events-auto' : ''}`}
        onClick={modalState === 'minimized' ? handleRestore : e => e.stopPropagation()}
      >
        <div className="p-4 border-b bg-gray-50 flex justify-between items-center flex-shrink-0">
          <h2 className={`font-bold text-primary-dark truncate pr-4 ${modalState !== 'minimized' ? 'text-xl' : 'text-base'}`}>
            공지사항 전체보기
          </h2>
          <div className="flex items-center gap-1">
            {modalState !== 'minimized' ? (
              <>
                <button onClick={handleMinimize} className="p-2 rounded-full text-gray-500 hover:bg-gray-200"><MinusIcon className="w-5 h-5"/></button>
                <button onClick={handleToggleMaximize} className="p-2 rounded-full text-gray-500 hover:bg-gray-200">
                  {modalState === 'maximized' ? <Square2StackIcon className="w-5 h-5" /> : <WindowIcon className="w-5 h-5" />}
                </button>
                <button onClick={handleInternalClose} className="p-2 rounded-full text-gray-500 hover:bg-gray-200"><XMarkIcon className="w-5 h-5" /></button>
              </>
            ) : (
              <button onClick={handleInternalClose} className="p-1 rounded-full text-gray-500 hover:bg-gray-200"><XMarkIcon className="w-4 h-4" /></button>
            )}
          </div>
        </div>
        
        {modalState !== 'minimized' && (
          <div className="p-6 overflow-y-auto bg-white flex-grow">
            <div className="space-y-2">
              {FULL_NOTICES_DATA.map((notice) => {
                const CategoryIcon = categoryStyles[notice.category].icon;
                const isOpen = openNoticeId === notice.id;
                return (
                  <div key={notice.id} className="border rounded-lg overflow-hidden">
                    <button 
                      className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50"
                      onClick={() => setOpenNoticeId(isOpen ? null : notice.id)}
                    >
                      <div className="flex items-center gap-4">
                        <span className={`flex-shrink-0 inline-flex items-center gap-1.5 px-2 py-1 text-xs font-medium rounded-full ${categoryStyles[notice.category].bg} ${categoryStyles[notice.category].color}`}>
                          <CategoryIcon className="w-4 h-4" />
                          {notice.category}
                        </span>
                        <span className="font-semibold text-secondary">{notice.title}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-sm text-gray-500">{notice.date}</span>
                        <ChevronDownIcon className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${isOpen ? 'transform rotate-180' : ''}`} />
                      </div>
                    </button>
                    <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96' : 'max-h-0'}`}>
                      <div className="p-4 pt-0">
                        <div className="p-4 bg-gray-50 rounded-md border text-gray-700">
                            {notice.content}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NoticeModal;