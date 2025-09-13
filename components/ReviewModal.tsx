import React from 'react';
import { VerificationItem, VerificationStatus } from '../types';
import Card from './Card';
import AcademicCapIcon from './icons/AcademicCapIcon';
import CircleStackIcon from './icons/CircleStackIcon';
import ClipboardDocumentCheckIcon from './icons/ClipboardDocumentCheckIcon';

interface ReviewModalProps {
  item: VerificationItem;
  onClose: () => void;
  onUpdate: (id: number, status: VerificationStatus) => void;
}

const ReviewModal: React.FC<ReviewModalProps> = ({ item, onClose, onUpdate }) => {
  if (!item) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 animate-fadeIn" onClick={onClose}>
      <div className="bg-gray-50 rounded-xl shadow-2xl w-full max-w-5xl max-h-[90vh] flex flex-col overflow-hidden" onClick={e => e.stopPropagation()}>
        <div className="p-4 border-b bg-white flex-shrink-0 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-primary-dark">수동 정보 검증</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-800 text-3xl font-bold">&times;</button>
        </div>
        
        <div className="p-6 overflow-y-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-4">
            <Card title="원본 정보">
              <h3 className="text-lg font-bold">{item.title}</h3>
              <p className="text-sm text-gray-500 mb-2">{item.source} - <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">원본 링크</a></p>
              <div className="prose prose-sm max-w-none h-96 overflow-y-auto p-2 border bg-white rounded">
                <p>{item.fullText}</p>
              </div>
            </Card>
          </div>
          
          {/* Right Column */}
          <div className="space-y-4">
            <Card title="AI 1차 분석 결과" className="bg-blue-50 border-blue-200">
                <div className="flex items-start gap-3">
                    <AcademicCapIcon className="h-8 w-8 text-blue-500 flex-shrink-0 mt-1" />
                    <div>
                        <h4 className="font-bold text-blue-800">초기 분류</h4>
                        <p className="text-blue-700">{item.classificationResult} (신뢰도: {item.aiConfidence.toFixed(1)}%)</p>
                    </div>
                </div>
            </Card>
            <Card title="RAG 기반 판정 근거" className="bg-purple-50 border-purple-200">
                <div className="flex items-start gap-3">
                    <CircleStackIcon className="h-8 w-8 text-purple-500 flex-shrink-0 mt-1" />
                    <div>
                        <h4 className="font-bold text-purple-800">참조된 내부 데이터 요약</h4>
                        <p className="text-purple-700 text-sm">{item.evidence}</p>
                    </div>
                </div>
            </Card>
             <Card title="최종 판정" className="bg-green-50 border-green-200">
                <div className="flex items-start gap-3">
                    <ClipboardDocumentCheckIcon className="h-8 w-8 text-green-600 flex-shrink-0 mt-1" />
                    <div>
                        <h4 className="font-bold text-green-800">검토자 최종 판정</h4>
                        <p className="text-sm text-gray-600 mb-3">AI 분석 결과를 참고하여 최종적으로 이 정보의 신뢰도를 판정해주세요.</p>
                         <div className="flex gap-3">
                            <button onClick={() => onUpdate(item.id, VerificationStatus.Fact)} className="flex-1 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700">사실 (Fact)</button>
                            <button onClick={() => onUpdate(item.id, VerificationStatus.Fake)} className="flex-1 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700">허위 (Fake)</button>
                            <button onClick={() => onUpdate(item.id, VerificationStatus.Opinion)} className="flex-1 bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600">의견 (Opinion)</button>
                        </div>
                    </div>
                </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewModal;