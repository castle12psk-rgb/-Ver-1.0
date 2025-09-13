import React from 'react';
import DatabaseIcon from './icons/DatabaseIcon';
import ArrowLongRightIcon from './icons/ArrowLongRightIcon';
import MapIcon from './icons/MapIcon';
import CogIcon from './icons/CogIcon';
import CursorArrowRaysIcon from './icons/CursorArrowRaysIcon';
import { WorldMap } from './WorldMap';

interface VisualizationHelpModalProps {
  onClose: () => void;
}

const InfoCard: React.FC<{ icon: React.ReactNode, title: string, children: React.ReactNode, className?: string }> = ({ icon, title, children, className }) => (
    <div className={`flex-1 flex flex-col items-center text-center p-3 bg-white rounded-lg border border-gray-200 shadow-sm ${className}`}>
        <div className="text-primary-light mb-2">{icon}</div>
        <h4 className="font-bold text-md text-secondary">{title}</h4>
        <p className="text-xs text-gray-600 mt-1">{children}</p>
    </div>
);

const VisualizationHelpModal: React.FC<VisualizationHelpModalProps> = ({ onClose }) => {
  return (
    <div 
        className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-[2000] animate-fadeIn" 
        onClick={onClose}
        aria-modal="true"
        role="dialog"
    >
      <div 
        className="bg-gray-50 rounded-xl shadow-2xl w-full max-w-6xl max-h-[90vh] flex flex-col overflow-hidden" 
        onClick={e => e.stopPropagation()}
      >
        <div className="p-4 border-b bg-white flex-shrink-0 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-primary-dark">직관적 시각화 플랫폼 도움말</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-800 text-3xl font-bold">&times;</button>
        </div>
        
        <div className="p-8 overflow-y-auto space-y-8">
            <div>
                <h3 className="text-xl font-semibold text-secondary mb-2">기능 설명</h3>
                <p className="text-gray-700">
                    '직관적 시각화 플랫폼'은 전 세계에서 발생한 감염병 정보를 인터랙티브 지도 위에 표시하여 상황을 한눈에 파악할 수 있도록 돕습니다. 사용자는 기간, 감염병 종류, 위험 등급 등 다양한 필터를 적용하여 원하는 정보를 선별적으로 볼 수 있습니다. 지도 위의 마커를 클릭하면 해당 발생 건의 요약 정보를 확인하고, '상세 보고서 보기'를 통해 심층 분석 자료를 열람할 수 있습니다.
                </p>
            </div>

            <div>
                <h3 className="text-xl font-semibold text-secondary mb-4">데이터 시각화 프로세스</h3>
                <div className="flex items-center justify-between gap-2">
                    <InfoCard icon={<DatabaseIcon className="w-10 h-10" />} title="1. 검증된 데이터 입력">
                        AI가 검증을 완료한 구조화된 데이터(위치, 감염병명, 위험 등급 등)를 입력받습니다.
                    </InfoCard>

                    <ArrowLongRightIcon className="w-10 h-10 text-gray-300 flex-shrink-0" />

                    <InfoCard icon={<MapIcon className="w-10 h-10" />} title="2. 지오코딩 & 좌표 변환">
                        텍스트로 된 위치 정보를 지오코딩 API를 통해 지도에 표시할 수 있는 정확한 위경도 좌표로 변환합니다.
                    </InfoCard>
                    
                    <ArrowLongRightIcon className="w-10 h-10 text-gray-300 flex-shrink-0" />

                    <InfoCard icon={<CogIcon className="w-10 h-10" />} title="3. 데이터 시각화 렌더링">
                        변환된 좌표와 데이터 속성(위험 등급에 따른 색상, 발생 규모 등)을 기반으로 지도 위에 시각적 마커(SVG)를 생성합니다.
                    </InfoCard>

                    <ArrowLongRightIcon className="w-10 h-10 text-gray-300 flex-shrink-0" />
                    
                     <InfoCard icon={<CursorArrowRaysIcon className="w-10 h-10" />} title="4. 인터랙티브 UI 제공">
                        사용자는 필터링, 확대/축소 등 지도와 상호작용할 수 있으며, 마커를 클릭하여 상세 정보를 조회할 수 있습니다.
                    </InfoCard>

                     <ArrowLongRightIcon className="w-10 h-10 text-gray-300 flex-shrink-0" />
                    
                    <div className="flex-1 flex flex-col items-center text-center p-3 bg-white rounded-lg border border-gray-200 shadow-sm relative">
                        <div className="absolute inset-0 overflow-hidden rounded-lg">
                           <WorldMap className="w-full h-full object-cover text-blue-100" />
                           <div className="absolute top-1/2 left-1/2 w-4 h-4 bg-red-500 rounded-full border-2 border-white -translate-x-1/2 -translate-y-1/2"></div>
                        </div>
                        <div className="relative z-10 bg-white/70 backdrop-blur-sm p-2 rounded">
                            <h4 className="font-bold text-md text-secondary">5. 최종 결과</h4>
                            <p className="text-xs text-gray-600 mt-1">최종적으로 정보가 시각화된 인터랙티브 맵이 사용자에게 제공됩니다.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default VisualizationHelpModal;