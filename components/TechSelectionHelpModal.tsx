import React, { useState } from 'react';
import MinusIcon from './icons/MinusIcon';
import WindowIcon from './icons/WindowIcon';
import Square2StackIcon from './icons/Square2StackIcon';
import XMarkIcon from './icons/XMarkIcon';
import BrainIcon from './icons/BrainIcon';

interface TechSelectionHelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const HelpSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div>
        <h4 className="font-semibold text-lg mb-2 text-secondary">{title}</h4>
        <div className="pl-4 border-l-2 border-blue-200">{children}</div>
    </div>
);

const TechSelectionHelpModal: React.FC<TechSelectionHelpModalProps> = ({ isOpen, onClose }) => {
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
                        <BrainIcon className="w-6 h-6"/>
                        {modalState !== 'minimized' ? '핵심 기술 및 AI 모델 선정 상세 설명' : '기술/모델 선정'}
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
                        <div className="p-8 overflow-y-auto flex-grow">
                            <div className="prose max-w-none">
                                <h3>서론: AI Core, GIDS 성공의 핵심</h3>
                                <p>GIDS 시스템의 AI Core는 단순한 기능 모듈이 아닌, 전체 솔루션의 신뢰성과 가치를 결정하는 심장부입니다. AI 모델의 선정은 단순히 '가장 강력한 모델'을 선택하는 것을 넘어, GIDS의 고유한 요구사항인 ▲글로벌 다국어 처리 능력, ▲의료/보건 분야의 전문성, ▲실시간 정보 대응 능력, ▲정부 기관이 요구하는 데이터 보안 수준을 모두 만족시켜야 하는 복합적인 의사결정 과정입니다.</p>
                                
                                <HelpSection title="1. LLM 평가 기준 심층 분석">
                                    <ul className="list-disc space-y-2 text-gray-700">
                                        <li><strong>성능 (추론/정확도):</strong> 감염병 관련 텍스트는 의학 용어, 통계 데이터, 미묘한 뉘앙스를 포함합니다. 모델은 단순 키워드 매칭을 넘어, 문맥을 이해하고 논리적 오류나 과장된 표현을 식별하여 정보의 신뢰도를 정확히 추론해야 합니다.</li>
                                        <li><strong>다국어 능력:</strong> 감염병의 최초 발생 보고는 영어가 아닌 현지 언어로 나올 가능성이 매우 높습니다. 따라서, 전 세계 다양한 언어의 뉴스, 보고서, 소셜 미디어를 원문 그대로 높은 품질로 이해하고 분석하는 능력은 조기 경보의 핵심 전제 조건입니다.</li>
                                        <li><strong>RAG (검색 증강 생성) 및 Tool-Use:</strong> LLM이 가진 내부 지식만으로는 급변하는 최신 감염병 상황에 대응할 수 없습니다. RAG는 모델이 답변을 생성하기 전, 질병관리청의 내부 데이터베이스나 실시간 웹 검색(Tool-use)과 같은 '신뢰할 수 있는 외부 정보'를 먼저 참조하도록 하여, 환각(Hallucination)을 최소화하고 사실 기반의 정확한 답변을 생성하는 핵심 기술입니다.</li>
                                        <li><strong>데이터 주권 및 보안:</strong> 질병관리청의 민감한 내부 데이터나 국내 동향 분석 시, 데이터가 해외 클라우드 서버로 전송되는 것은 보안 및 규제 준수 측면에서 큰 위험이 될 수 있습니다. 따라서, 국내에 위치한 서버(On-premise) 또는 주권이 보장된 클라우드(Sovereign Cloud) 내에서 모델을 운영할 수 있는 옵션은 매우 중요한 평가 항목입니다.</li>
                                    </ul>
                                </HelpSection>
                                
                                <HelpSection title="2. 하이브리드 모델 전략 채택의 정당성">
                                    <p>위의 평가 기준을 종합적으로 고려할 때, 단일 모델로는 모든 요구사항을 완벽하게 충족하기 어렵습니다. 따라서 GIDS는 각 모델의 강점을 극대화하는 '하이브리드 모델 전략'을 채택합니다.</p>
                                    <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                                        <h5 className="font-bold text-blue-800">주력 모델 (Outward-Facing): Google Gemini 2.5</h5>
                                        <p className="text-sm text-blue-700">
                                            <strong>역할:</strong> 글로벌 정보 감시 및 팩트체크 엔진.
                                            <br/>
                                            <strong>선정 이유:</strong> 전 세계 공개된 웹 데이터를 대상으로 하는 외부 정보 수집 및 검증에 최적화되어 있습니다. 타의 추종을 불허하는 다국어 처리 능력으로 언어의 장벽 없이 정보를 수집하고, Google Search와의 네이티브 연동을 통해 가장 빠르고 정확하게 최신 정보를 RAG의 근거 자료로 활용할 수 있습니다. 이는 GIDS의 '조기 경보' 목표 달성을 위한 최고의 선택입니다.
                                        </p>
                                    </div>
                                     <div className="mt-4 p-4 bg-green-50 border border-green-300 rounded-lg">
                                        <h5 className="font-bold text-green-800">보조 모델 (Inward-Facing): KT Mi:dm 2.0 (믿음)</h5>
                                        <p className="text-sm text-green-700">
                                            <strong>역할:</strong> 국내 데이터 및 민감 정보 분석 엔진.
                                            <br/>
                                            <strong>선정 이유:</strong> 질병관리청 내부 보고서, 국내 언론 보도 등 한국어로 된 민감 데이터를 분석하는 데 사용됩니다. On-premise 배포를 지원하여 모든 데이터 처리 과정이 외부로 나가지 않고 완벽하게 통제된 내부망에서 이루어지도록 보장합니다. 이는 정부 기관의 엄격한 데이터 보안 요구사항과 데이터 주권을 준수하는 데 필수적입니다.
                                        </p>
                                    </div>
                                </HelpSection>

                                <HelpSection title="3. 기술 스택 시너지">
                                    <p>AI 모델의 성능을 100% 발휘하기 위해서는 주변 기술 스택과의 유기적인 결합이 필수적입니다. GIDS의 기술 스택은 AI Core와의 시너지를 극대화하도록 설계되었습니다.</p>
                                     <ul className="list-disc space-y-2 text-gray-700">
                                        <li><strong>Python & FastAPI:</strong> AI/ML 생태계의 표준 언어인 Python과 고성능 비동기 웹 프레임워크인 FastAPI를 백엔드로 채택하여, 무거운 AI 모델의 추론 작업을 블로킹 없이 효율적으로 처리하고, 다른 서비스들과 신속하게 통신합니다.</li>
                                        <li><strong>Vector DB (ChromaDB):</strong> RAG의 핵심인 '검색' 속도와 정확도를 보장합니다. 텍스트를 벡터로 변환하여 저장하고, 의미적으로 유사한 문서를 수백만 건의 데이터 속에서 밀리초 단위로 찾아내어 LLM에 제공하는 역할을 합니다.</li>
                                        <li><strong>Kafka:</strong> 수집 Layer에서 하루 수십만 건의 데이터가 쏟아져 들어오더라도 AI Core가 과부하에 걸리지 않도록 하는 '완충 장치'입니다. 데이터를 순서대로 큐에 쌓아두고, AI 서비스가 처리 가능한 만큼 순차적으로 가져가도록 하여 시스템 전체의 안정성을 보장합니다.</li>
                                    </ul>
                                </HelpSection>
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

export default TechSelectionHelpModal;