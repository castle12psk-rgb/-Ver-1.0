import React from 'react';
import DatabaseIcon from './icons/DatabaseIcon';
import ArrowLongRightIcon from './icons/ArrowLongRightIcon';
import ChatBubbleLeftRightIcon from './icons/ChatBubbleLeftRightIcon';
import MagnifyingGlassIcon from './icons/MagnifyingGlassIcon';
import DocumentDuplicateIcon from './icons/DocumentDuplicateIcon';
import VerifyIcon from './icons/VerifyIcon';
import VisualizeIcon from './icons/VisualizeIcon';
import StatsIcon from './icons/StatsIcon';


interface AIVerificationHelpModalProps {
  onClose: () => void;
}

const InfoCard: React.FC<{ icon: React.ReactNode, title: string, children: React.ReactNode, className?: string }> = ({ icon, title, children, className }) => (
    <div className={`flex-1 flex flex-col items-center text-center p-3 bg-white rounded-lg border border-gray-200 shadow-sm ${className}`}>
        <div className="text-primary-light mb-2">{icon}</div>
        <h4 className="font-bold text-md text-secondary">{title}</h4>
        <p className="text-xs text-gray-600 mt-1">{children}</p>
    </div>
);

const AIVerificationHelpModal: React.FC<AIVerificationHelpModalProps> = ({ onClose }) => {
  return (
    <div 
        className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 animate-fadeIn" 
        onClick={onClose}
        aria-modal="true"
        role="dialog"
    >
      <div 
        className="bg-gray-50 rounded-xl shadow-2xl w-full max-w-6xl max-h-[90vh] flex flex-col overflow-hidden" 
        onClick={e => e.stopPropagation()}
      >
        <div className="p-4 border-b bg-white flex-shrink-0 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-primary-dark">AI 기반 정보 검증 프로세스 도움말</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-800 text-3xl font-bold">&times;</button>
        </div>
        
        <div className="p-8 overflow-y-auto space-y-8">
            <div>
                <h3 className="text-xl font-semibold text-secondary mb-2">기능 설명</h3>
                <p className="text-gray-700">
                    'AI 기반 정보 검증' 페이지는 수집된 감염병 관련 정보가 사실인지, 허위 정보인지, 또는 단순 의견인지를 판별하는 AI 시스템의 작업 흐름을 보여줍니다. 시스템은 3단계의 검증 프로세스를 거치며, 각 단계가 완료될 때마다 진행 상황과 중간 결과가 표시됩니다. 최종적으로 검증이 완료된 정보는 신뢰도 점수와 함께 '검증 완료' 목록으로 이동합니다.
                </p>
            </div>

            <div>
                <h3 className="text-xl font-semibold text-secondary mb-4">AI 검증 및 표현 기술 프로세스</h3>
                <div className="flex items-center justify-between gap-2">
                    <InfoCard icon={<DatabaseIcon className="w-10 h-10" />} title="1. 데이터 입력">
                        실시간으로 수집 및 정제된 구조화된 데이터를 입력받습니다.
                    </InfoCard>

                    <ArrowLongRightIcon className="w-10 h-10 text-gray-300 flex-shrink-0" />

                    <InfoCard icon={<ChatBubbleLeftRightIcon className="w-10 h-10" />} title="2. 텍스트 분류 (NLP)">
                        자연어 처리(NLP) 모델이 텍스트를 분석하여 '사실', '허위', '의견'으로 1차 분류하고 초기 신뢰도를 평가합니다.
                    </InfoCard>
                    
                    <ArrowLongRightIcon className="w-10 h-10 text-gray-300 flex-shrink-0" />

                    <div className="flex-1 flex flex-col items-center text-center p-3 bg-white rounded-lg border border-gray-200 shadow-sm">
                        <div className="flex items-center justify-center text-primary-light mb-2">
                            <MagnifyingGlassIcon className="w-8 h-8" />
                            <DocumentDuplicateIcon className="w-8 h-8 -ml-2" />
                        </div>
                        <h4 className="font-bold text-md text-secondary">3. RAG 팩트체크</h4>
                        <p className="text-xs text-gray-600 mt-1">
                            Retrieval-Augmented Generation 기술을 사용합니다. 질병청 및 WHO 등 신뢰성 있는 내부 데이터베이스에서 관련 근거를 검색(Retrieval)하고, 이를 바탕으로 AI가 사실 여부를 교차 확인하여 요약 보고서를 생성(Generation)합니다.
                        </p>
                    </div>

                    <ArrowLongRightIcon className="w-10 h-10 text-gray-300 flex-shrink-0" />

                     <InfoCard icon={<VerifyIcon className="w-10 h-10" />} title="4. 최종 판정">
                        분류 결과와 RAG 팩트체크 결과를 종합하여 최종 판단을 내리고, 객관적인 신뢰도 점수를 산출합니다.
                    </InfoCard>

                    <ArrowLongRightIcon className="w-10 h-10 text-gray-300 flex-shrink-0" />

                     <InfoCard icon={
                        <div className="flex gap-2">
                            <VisualizeIcon className="w-8 h-8" /> 
                            <StatsIcon className="w-8 h-8" />
                        </div>
                     } title="5. 결과 활용">
                        검증 완료된 데이터는 '직관적 시각화' 및 '데이터 통계' 페이지로 전달되어 시각 자료 및 통계 보고서 생성에 활용됩니다.
                    </InfoCard>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default AIVerificationHelpModal;
