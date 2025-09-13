import React, { useState, useEffect } from 'react';

interface AddEditCrawlerModalProps {
  isOpen: boolean;
  onClose: () => void;
  sourceData?: any; // Pass source data for editing
}

const AddEditCrawlerModal: React.FC<AddEditCrawlerModalProps> = ({ isOpen, onClose, sourceData }) => {
  const [source, setSource] = useState({
    name: '',
    url: '',
    type: 'Web Page',
    frequency: '10 minutes',
  });

  useEffect(() => {
    if (sourceData) {
      setSource({
        name: sourceData.source,
        url: sourceData.url,
        type: sourceData.type,
        frequency: sourceData.frequency,
      });
    } else {
      setSource({ name: '', url: '', type: 'Web Page', frequency: '10 minutes' });
    }
  }, [sourceData, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically handle form submission (e.g., API call)
    console.log('Submitted data:', source);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 animate-fadeIn" onClick={onClose}>
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg" onClick={e => e.stopPropagation()}>
        <div className="p-4 border-b">
          <h2 className="text-xl font-bold text-secondary">{sourceData ? '데이터 소스 수정' : '신규 데이터 소스 추가'}</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="p-6 space-y-4">
            <div>
              <label htmlFor="source-name" className="block text-sm font-medium text-gray-700">소스 이름</label>
              <input type="text" id="source-name" value={source.name} onChange={e => setSource({ ...source, name: e.target.value })} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2" required />
            </div>
            <div>
              <label htmlFor="source-url" className="block text-sm font-medium text-gray-700">URL 또는 API 엔드포인트</label>
              <input type="url" id="source-url" value={source.url} onChange={e => setSource({ ...source, url: e.target.value })} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2" required />
            </div>
            <div>
              <label htmlFor="source-type" className="block text-sm font-medium text-gray-700">소스 타입</label>
              <select id="source-type" value={source.type} onChange={e => setSource({ ...source, type: e.target.value })} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2">
                <option>Web Page</option>
                <option>API</option>
                <option>RSS Feed</option>
                <option>Mailing List</option>
              </select>
            </div>
             <div>
              <label htmlFor="source-frequency" className="block text-sm font-medium text-gray-700">수집 주기</label>
              <select id="source-frequency" value={source.frequency} onChange={e => setSource({ ...source, frequency: e.target.value })} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2">
                <option>2 minutes</option>
                <option>5 minutes</option>
                <option>10 minutes</option>
                <option>15 minutes</option>
                <option>1 hour</option>
                <option>6 hours</option>
                <option>24 hours</option>
              </select>
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

export default AddEditCrawlerModal;
