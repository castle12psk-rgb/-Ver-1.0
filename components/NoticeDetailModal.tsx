import React, { useState } from 'react';
import MinusIcon from './icons/MinusIcon';
import WindowIcon from './icons/WindowIcon';
import Square2StackIcon from './icons/Square2StackIcon';
import XMarkIcon from './icons/XMarkIcon';
import MegaphoneIcon from './icons/MegaphoneIcon';
import SparklesIcon from './icons/SparklesIcon';
import WrenchScrewdriverIcon from './icons/WrenchScrewdriverIcon';

interface NoticeDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  notice: any | null;
}

const categoryStyles: { [key: string]: { icon: React.FC<any>, color: string, bg: string } } = {
    '공지': { icon: MegaphoneIcon, color: 'text-gray-800', bg: 'bg-gray-100' },
    '업데이트': { icon: SparklesIcon, color: 'text-blue-800', bg: 'bg-blue-100' },
    '점검': { icon: WrenchScrewdriverIcon, color: 'text-yellow-800', bg: 'bg-yellow-100' },
};

const NoticeDetailModal: React.FC<NoticeDetailModalProps> = ({ isOpen, onClose, notice }) => {
    const [modalState, setModalState] = useState<'normal' | 'maximized' | 'minimized'>('normal');

    if (!isOpen || !notice) return null;

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
        setModalState('normal');
        onClose();
    };

    const handleRestore = () => {
        setModalState('normal');
    };

    const wrapperClasses = {
        normal: "w-full max-w-3xl h-[70vh]",
        maximized: "w-screen h-screen rounded-none",
        minimized: "w-96 fixed bottom-4 right-4 animate-fadeInUp cursor-pointer",
    };
    
    const modalRootClasses = `
        fixed inset-0 bg-black bg-opacity-60 z-[60]
        ${modalState === 'minimized' ? 'pointer-events-none flex items-end justify-end' : 'flex items-center justify-center'}
    `;

    const CategoryIcon = categoryStyles[notice.category].icon;

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
                {/* Header */}
                <div className="p-4 border-b bg-gray-50 flex justify-between items-center flex-shrink-0">
                    <h2 className={`font-bold text-primary-dark truncate pr-4 ${modalState !== 'minimized' ? 'text-xl' : 'text-base'}`}>
                        {modalState !== 'minimized' ? '공지사항 상세' : notice.title}
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

                {/* Body (only if not minimized) */}
                {modalState !== 'minimized' && (
                    <>
                        <div className="p-8 overflow-y-auto flex-grow">
                            <div className="flex justify-between items-start mb-4">
                                <h3 className="text-2xl font-bold text-secondary">{notice.title}</h3>
                                <span className={`flex-shrink-0 inline-flex items-center gap-1.5 px-3 py-1 text-sm font-medium rounded-full ${categoryStyles[notice.category].bg} ${categoryStyles[notice.category].color}`}>
                                    <CategoryIcon className="w-4 h-4" />
                                    {notice.category}
                                </span>
                            </div>
                            <p className="text-sm text-gray-500 mb-6 border-b pb-4">{notice.date}</p>
                            <div className="text-gray-700 leading-relaxed space-y-4">
                                {notice.content.split('\n').map((paragraph: string, index: number) => (
                                    <p key={index}>{paragraph}</p>
                                ))}
                            </div>
                        </div>
                        
                        <div className="p-4 border-t bg-gray-50 flex-shrink-0 flex justify-end gap-3">
                            <button onClick={handleInternalClose} className="bg-primary-dark text-white px-4 py-2 rounded-md hover:bg-primary-light transition-colors">
                                닫기
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default NoticeDetailModal;