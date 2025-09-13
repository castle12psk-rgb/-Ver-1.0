import React from 'react';
import GlobeIcon from './icons/GlobeIcon';
import NewspaperIcon from './icons/NewspaperIcon';
import UsersIcon from './icons/UsersIcon';
import ServerIcon from './icons/ServerIcon';
import DatabaseIcon from './icons/DatabaseIcon';
import BrainIcon from './icons/BrainIcon';
import ArrowLongRightIcon from './icons/ArrowLongRightIcon';

interface HelpModalProps {
  onClose: () => void;
}

const InfoCard: React.FC<{ icon: React.ReactNode, title: string, children: React.ReactNode }> = ({ icon, title, children }) => (
    <div className="flex-1 flex flex-col items-center text-center p-4 bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className="text-primary-light mb-3">{icon}</div>
        <h4 className="font-bold text-lg text-secondary">{title}</h4>
        <p className="text-sm text-gray-600 mt-1">{children}</p>
    </div>
);

const HelpModal: React.FC<HelpModalProps> = ({ onClose }) => {
  return (
    <div 
        className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 animate-fadeIn" 
        onClick={onClose}
        aria-modal="true"
        role="dialog"
    >
      <div 
        className="bg-gray-50 rounded-xl shadow-2xl w-full max-w-5xl max-h-[90vh] flex flex-col overflow-hidden" 
        onClick={e => e.stopPropagation()}
      >
        <div className="p-4 border-b bg-white flex-shrink-0 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-primary-dark">실시간 정보 수집 프로세스 도움말</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-800 text-3xl font-bold">&times;</button>
        </div>
        
        <div className="p-8 overflow-y-auto space-y-8">
            <div>
                <h3 className="text-xl font-semibold text-secondary mb-2">기능 설명</h3>
                <p className="text-gray-700">
                    본 '실시간 정보 수집 현황' 페이지는 전 세계 다양한 데이터 소스로부터 감염병 관련 정보를 자동으로 수집하는 지능형 크롤러 시스템의 작동 상태를 실시간으로 모니터링합니다. 각 데이터 소스의 상태, 최근 수집 시각, 신규 수집 문서 수를 확인할 수 있으며, '로그 보기' 버튼을 통해 상세 수집 로그를 조회할 수 있습니다.
                </p>
            </div>

            <div>
                <h3 className="text-xl font-semibold text-secondary mb-4">데이터 수집 및 처리 프로세스</h3>
                <div className="flex items-center justify-between gap-2">
                    {/* Step 1 */}
                    <div className="flex-1 flex flex-col items-center text-center p-4 bg-white rounded-lg border border-gray-200 shadow-sm">
                        <h4 className="font-bold text-lg text-secondary mb-3">1. 데이터 소스</h4>
                        <div className="space-y-3">
                            <div className="flex items-center gap-2 p-2 bg-gray-100 rounded-md">
                                <GlobeIcon className="w-8 h-8 text-blue-500" />
                                <span className="text-sm">공신력 있는 기관<br/>(WHO, CDC 등)</span>
                            </div>
                             <div className="flex items-center gap-2 p-2 bg-gray-100 rounded-md">
                                <NewspaperIcon className="w-8 h-8 text-gray-600" />
                                <span className="text-sm">주요 뉴스 피드<br/>(Reuters, AP 등)</span>
                            </div>
                             <div className="flex items-center gap-2 p-2 bg-gray-100 rounded-md">
                                <UsersIcon className="w-8 h-8 text-sky-500" />
                                <span className="text-sm">소셜 미디어<br/>(X, Facebook 등)</span>
                            </div>
                        </div>
                    </div>

                    <ArrowLongRightIcon className="w-12 h-12 text-gray-300 flex-shrink-0" />

                    {/* Step 2 */}
                    <InfoCard icon={<ServerIcon className="w-12 h-12" />} title="2. 지능형 크롤러">
                        키워드 및 패턴 분석 기반 24/7 자동 정보 수집. 동적 컨텐츠(JS 렌더링) 및 주요 기관 API 연동 수집을 지원합니다.
                    </InfoCard>

                    <ArrowLongRightIcon className="w-12 h-12 text-gray-300 flex-shrink-0" />

                    {/* Step 3 */}
                    <InfoCard icon={<DatabaseIcon className="w-12 h-12" />} title="3. 데이터 정제/저장">
                        수집된 원본 데이터(HTML, JSON, Text)에서 불필요한 정보 제거, 구조화 및 정규화. 비정형 데이터 레이크에 저장합니다.
                    </InfoCard>

                    <ArrowLongRightIcon className="w-12 h-12 text-gray-300 flex-shrink-0" />

                    {/* Step 4 */}
                    <InfoCard icon={<BrainIcon className="w-12 h-12" />} title="4. AI 검증 전달">
                        정제된 데이터를 AI 기반 정보 검증 파이프라인으로 전달하여 신뢰도 분석 및 사실 여부를 판정합니다.
                    </InfoCard>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default HelpModal;
