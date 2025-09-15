import React from 'react';
import XMarkIcon from './icons/XMarkIcon';
import InformationCircleIcon from './icons/InformationCircleIcon';

interface LayerHelpModalProps {
  isOpen: boolean;
  onClose: () => void;
  layerTitle: string;
  children: React.ReactNode;
}

const LayerHelpModal: React.FC<LayerHelpModalProps> = ({ isOpen, onClose, layerTitle, children }) => {
  if (!isOpen) return null;

  return (
    <div 
        className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-[2000] animate-fadeIn" 
        onClick={onClose}
        aria-modal="true"
        role="dialog"
    >
      <div 
        className="bg-gray-50 rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden" 
        onClick={e => e.stopPropagation()}
      >
        <div className="p-4 border-b bg-white flex-shrink-0 flex justify-between items-center">
            <h2 className="text-xl font-bold text-primary-dark flex items-center gap-3">
                <InformationCircleIcon className="w-7 h-7" />
                {layerTitle}
            </h2>
          <button onClick={onClose} className="p-2 rounded-full text-gray-400 hover:text-gray-800 hover:bg-gray-100 transition-colors">
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>
        
        <div className="p-8 overflow-y-auto space-y-4">
            {children}
        </div>

        <div className="p-4 border-t bg-white flex-shrink-0 flex justify-end">
            <button onClick={onClose} className="bg-primary-dark text-white px-4 py-2 rounded-md hover:bg-primary-light transition-colors">
                닫기
            </button>
        </div>
      </div>
    </div>
  );
};

export default LayerHelpModal;