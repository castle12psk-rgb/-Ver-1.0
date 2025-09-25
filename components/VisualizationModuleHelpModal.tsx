import React, { useState } from 'react';
import MinusIcon from './icons/MinusIcon';
import WindowIcon from './icons/WindowIcon';
import Square2StackIcon from './icons/Square2StackIcon';
import XMarkIcon from './icons/XMarkIcon';
import GlobeIcon from './icons/GlobeIcon';
import DatabaseIcon from './icons/DatabaseIcon';
import ServerIcon from './icons/ServerIcon';
import CheckCircleIcon from './icons/CheckCircleIcon';
import ClockIcon from './icons/ClockIcon';

interface VisualizationModuleHelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const HelpSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div>
        <h3 className="font-semibold text-xl mb-3 text-secondary">{title}</h3>
        <div className="pl-4 border-l-2 border-blue-200">{children}</div>
    </div>
);

const AdvantageCard: React.FC<{ title: string, children: React.ReactNode }> = ({ title, children }) => (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <h5 className="font-semibold text-green-700 flex items-center gap-2">
            <CheckCircleIcon className="w-5 h-5 text-green-500" />
            {title}
        </h5>
        <p className="text-sm text-gray-600 mt-1">{children}</p>
    </div>
);


const VisualizationModuleHelpModal: React.FC<VisualizationModuleHelpModalProps> = ({ isOpen, onClose }) => {
    const [modalState, setModalState] = useState<'normal' | 'maximized' | 'minimized'>('maximized');
    const [preMinimizeState, setPreMinimizeState] = useState<'normal' | 'maximized'>('maximized');
  
    if (!isOpen) return null;

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
        setModalState('maximized'); // Reset state before closing
        onClose();
    }

    const handleRestore = () => {
        setModalState(preMinimizeState);
    };
    
    const wrapperClasses = {
        normal: "w-full max-w-5xl h-[90vh]",
        maximized: "w-screen h-screen rounded-none",
        minimized: "w-96 fixed bottom-4 right-4 animate-fadeInUp cursor-pointer",
    };
    
    const modalRootClasses = `
        fixed inset-0 bg-black bg-opacity-60 z-[2000]
        ${modalState === 'minimized' ? 'pointer-events-none flex items-end justify-end' : 'flex items-center justify-center'}
    `;

    return (
        <div 
            className={`${modalRootClasses} animate-fadeIn`}
            onClick={modalState !== 'minimized' ? handleInternalClose : undefined}
            aria-modal="true"
            role="dialog"
        >
            <div 
                className={`bg-gray-50 rounded-xl shadow-2xl flex flex-col overflow-hidden transition-all duration-300 ${wrapperClasses[modalState]} ${modalState === 'minimized' ? 'pointer-events-auto' : ''}`}
                onClick={modalState === 'minimized' ? handleRestore : e => e.stopPropagation()}
            >
                <div className="p-4 border-b bg-white flex-shrink-0 flex justify-between items-center">
                    <h2 className={`font-bold text-primary-dark truncate pr-4 flex items-center gap-3 ${modalState !== 'minimized' ? 'text-xl' : 'text-base'}`}>
                        <GlobeIcon className="w-6 h-6"/>
                        {modalState !== 'minimized' ? 'GIS 시각화 모듈 심층 분석: 데이터를 살아있는 인텔리전스로' : 'GIS 모듈 상세'}
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
                    <>
                        <div className="p-8 overflow-y-auto flex-grow custom-scrollbar">
                            <div className="prose max-w-none">
                                <h3>서론: 단순한 지도를 넘어, 상황 인식을 위한 '디지털 트윈' 구축</h3>
                                <p>GIDS의 지도 시각화 모듈은 단순히 AI가 검증한 데이터를 지도 위에 표시하는 것을 넘어, 현실 세계의 감염병 상황을 디지털 공간에 재현하는 <strong>'지리 공간적 인텔리전스 플랫폼(Geospatial Intelligence Platform)'</strong>입니다. 이 플랫폼은 수백만 건의 데이터를 실시간으로 처리하고, 다차원적인 분석 레이어를 제공하여, 정책 결정자가 복잡한 상황을 한눈에 파악하고 미래의 확산 경로까지 예측할 수 있도록 지원하는 것을 목표로 합니다.</p>
                                
                                <HelpSection title="1. 데이터 시각화 파이프라인">
                                    <p className="mb-4">최적화된 파이프라인을 통해 데이터베이스의 정보가 사용자 화면에 빠르고 정확하게 렌더링됩니다.</p>
                                    <div className="not-prose my-4 p-6 bg-white rounded-lg border shadow-lg flex flex-col md:flex-row items-center justify-around gap-4">
                                        <div className="text-center">
                                            <DatabaseIcon className="w-12 h-12 mx-auto text-green-600"/>
                                            <h6 className="font-bold mt-2">1. 데이터 저장소</h6>
                                            <p className="text-xs">PostGIS에 저장된<br/>검증된 지리정보 데이터</p>
                                        </div>
                                        <div className="text-3xl text-gray-300 font-mono hidden md:block">➔</div>
                                        <div className="text-3xl text-gray-300 font-mono md:hidden">⬇</div>
                                        <div className="text-center">
                                            <ServerIcon className="w-12 h-12 mx-auto text-blue-600"/>
                                            <h6 className="font-bold mt-2">2. 백엔드 API</h6>
                                            <p className="text-xs">FastAPI의 고성능 공간 쿼리<br/>& GeoJSON 변환</p>
                                        </div>
                                         <div className="text-3xl text-gray-300 font-mono hidden md:block">➔</div>
                                         <div className="text-3xl text-gray-300 font-mono md:hidden">⬇</div>
                                        <div className="text-center">
                                            <div className="text-3xl text-teal-600 mx-auto mb-1">🗺️</div>
                                            <h6 className="font-bold">3. 프론트엔드</h6>
                                            <p className="text-xs">React & Leaflet 기반<br/>실시간 인터랙티브 렌더링</p>
                                        </div>
                                    </div>
                                </HelpSection>
                                
                                <HelpSection title="2. 핵심 기능 및 인터랙티브 프로토타입">
                                    <p className="mb-4">GIDS는 단순 마커 표시를 넘어, 깊이 있는 분석을 위한 강력한 인터랙티브 기능을 제공합니다.</p>
                                    <div className="not-prose grid grid-cols-1 lg:grid-cols-2 gap-6 p-4 bg-white rounded-lg border shadow-lg">
                                        <div className="p-4 bg-gray-100 rounded-lg">
                                            <h5 className="font-bold text-center text-secondary mb-2">다층 레이어 제어 (Multi-Layer Control)</h5>
                                            <p className="text-xs text-center text-gray-600 mb-4">다양한 지리 정보를 겹쳐보며 숨겨진 상관관계를 발견합니다.</p>
                                            <div className="space-y-2 p-3 bg-white rounded-md shadow-inner">
                                                <label className="flex items-center justify-between text-sm"><span className="font-semibold">감염병 발생 밀도 (Heatmap)</span><input type="checkbox" className="toggle" defaultChecked /></label>
                                                <label className="flex items-center justify-between text-sm"><span className="font-semibold">발생 건수 (Cluster)</span><input type="checkbox" className="toggle" defaultChecked /></label>
                                                <label className="flex items-center justify-between text-sm"><span>주요 교통망 (항공/철도)</span><input type="checkbox" className="toggle" /></label>
                                                <label className="flex items-center justify-between text-sm"><span>인구 밀도</span><input type="checkbox" className="toggle" /></label>
                                            </div>
                                        </div>
                                        <div className="p-4 bg-gray-100 rounded-lg">
                                            <h5 className="font-bold text-center text-secondary mb-2">시계열 분석 (Time-Series Analysis)</h5>
                                            <p className="text-xs text-center text-gray-600 mb-4">시간의 흐름에 따른 감염병 확산 추이를 시각적으로 추적합니다.</p>
                                            <div className="p-3 bg-white rounded-md shadow-inner">
                                                <div className="flex justify-between text-xs font-mono"><span>2025-08-01</span><span>2025-09-13</span></div>
                                                <input type="range" min="0" max="100" defaultValue="75" className="w-full mt-2" />
                                                <div className="text-center mt-3">
                                                    <button className="flex items-center justify-center gap-2 mx-auto bg-blue-500 text-white px-3 py-1 rounded-md text-sm hover:bg-blue-600">
                                                        <ClockIcon className="w-4 h-4" />
                                                        확산 애니메이션 재생
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <style>{`.toggle { accent-color: #1E88E5; }`}</style>
                                </HelpSection>

                                <hr className="my-8" />

                                <h3>GIS 모듈의 핵심 경쟁력</h3>
                                <div className="not-prose grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                                    <AdvantageCard title="초고속 렌더링 성능 (High-Performance)">
                                        최적화된 공간 쿼리(PostGIS)와 벡터 타일 기술을 통해 수백만 건의 데이터 포인트도 1초 이내에 부드럽게 렌더링하여 최상의 사용자 경험을 제공합니다.
                                    </AdvantageCard>
                                    <AdvantageCard title="다차원 심층 분석 (Multi-Dimensional)">
                                        감염병 데이터뿐만 아니라 교통망, 인구 밀도, 기후 데이터 등 다양한 외부 데이터를 융합하여, 단일 데이터로는 발견할 수 없는 복합적인 확산 요인을 분석합니다.
                                    </AdvantageCard>
                                    <AdvantageCard title="미래 예측 및 의사결정 지원">
                                        시계열 분석과 축적된 확산 패턴 데이터를 기반으로, 향후 감염병 확산 경로와 속도를 예측하는 AI 모델(SIR 모델 등)의 기반 데이터를 제공하여 선제적 방역 조치를 지원합니다.
                                    </AdvantageCard>
                                     <AdvantageCard title="높은 확장성 및 상호운용성">
                                        표준 GeoJSON 및 OGC 표준을 준수하여, 질병관리청이 보유한 타 GIS 시스템이나 외부 데이터 플랫폼과 손쉽게 데이터를 연동하고 확장할 수 있습니다.
                                    </AdvantageCard>
                                </div>
                            </div>
                        </div>
                        <div className="p-4 border-t bg-white flex-shrink-0 flex justify-end gap-3">
                            <button onClick={handleInternalClose} className="bg-primary-dark text-white px-4 py-2 rounded-md hover:bg-primary-light transition-colors">닫기</button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default VisualizationModuleHelpModal;