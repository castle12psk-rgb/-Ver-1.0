import React, { useState, useEffect } from 'react';
import { VerificationRule } from '../types';

interface AddEditRuleModalProps {
  isOpen: boolean;
  onClose: () => void;
  ruleData?: VerificationRule | null;
}

const AddEditRuleModal: React.FC<AddEditRuleModalProps> = ({ isOpen, onClose, ruleData }) => {
  const [rule, setRule] = useState({ name: '', description: '' });

  useEffect(() => {
    if (ruleData) {
      setRule({ name: ruleData.name, description: ruleData.description });
    } else {
      setRule({ name: '', description: '' });
    }
  }, [ruleData, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitted data:', rule);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 animate-fadeIn" onClick={onClose}>
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg" onClick={e => e.stopPropagation()}>
        <div className="p-4 border-b">
          <h2 className="text-xl font-bold text-secondary">{ruleData ? '규칙 수정' : '신규 규칙 추가'}</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="p-6 space-y-4">
            <div>
              <label htmlFor="rule-name" className="block text-sm font-medium text-gray-700">규칙 이름</label>
              <input type="text" id="rule-name" value={rule.name} onChange={e => setRule({ ...rule, name: e.target.value })} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2" required />
            </div>
            <div>
              <label htmlFor="rule-description" className="block text-sm font-medium text-gray-700">설명</label>
              <textarea id="rule-description" value={rule.description} onChange={e => setRule({ ...rule, description: e.target.value })} rows={3} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2" required />
            </div>
          </div>
          <div className="p-4 bg-gray-50 flex justify-end gap-3">
            <button type="button" onClick={onClose} className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300">취소</button>
            <button type="submit" className="bg-primary-dark text-white px-4 py-2 rounded-md hover:bg-primary-light">저장</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEditRuleModal;
