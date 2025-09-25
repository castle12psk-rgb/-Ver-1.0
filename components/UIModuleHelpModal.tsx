import React, { useState } from 'react';
import MinusIcon from './icons/MinusIcon';
import WindowIcon from './icons/WindowIcon';
import Square2StackIcon from './icons/Square2StackIcon';
import XMarkIcon from './icons/XMarkIcon';
import ArchitectureIcon from './icons/ArchitectureIcon';
import ClipboardDocumentIcon from './icons/ClipboardDocumentIcon';
import AcademicCapIcon from './icons/AcademicCapIcon';
import CheckCircleIcon from './icons/CheckCircleIcon';
import ArrowPathIcon from './icons/ArrowPathIcon';
import MegaphoneIcon from './icons/MegaphoneIcon';
import BrainIcon from './icons/BrainIcon';
import UserShieldIcon from './icons/UserShieldIcon';
import SparklesIcon from './icons/SparklesIcon';


interface UIModuleHelpModalProps {
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


const UIModuleHelpModal: React.FC<UIModuleHelpModalProps> = ({ isOpen, onClose }) => {
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
                        <ArchitectureIcon className="w-6 h-6"/>
                        {modalState !== 'minimized' ? 'LLM UI 모듈 심층 분석: AI-Human 협업 인터페이스' : 'UI 모듈 상세'}
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
                                <h3>서론: 단순한 UI를 넘어, 신뢰를 구축하는 워크벤치</h3>
                                <p>GIDS의 LLM UI 모듈은 단순한 정보 표시 화면이 아닙니다. 이는 AI의 빠른 분석력과 인간 전문가의 깊이 있는 통찰력을 결합하여 시스템 전체의 신뢰도를 극대화하는 <strong>'검증 워크벤치(Verification Workbench)'</strong>입니다. 이 인터페이스는 AI의 판단 과정을 투명하게 공개하고, 전문가의 피드백을 시스템에 다시 주입하여 AI를 지속적으로 학습시키는 <strong>'지능의 선순환(Virtuous Cycle of Intelligence)'</strong>을 구현하는 핵심 요소입니다.</p>
                                
                                <HelpSection title="1. 핵심 기능: 전문가용 검증 워크벤치">
                                    <p className="mb-4">전문가가 AI의 판단을 검토하고 최종 결정을 내리는 데 필요한 모든 정보를 한 화면에 통합하여 제공합니다. 이를 통해 검증 작업의 효율성과 정확성을 극대화합니다.</p>
                                    <div className="not-prose grid grid-cols-1 lg:grid-cols-3 gap-4 p-4 bg-white rounded-lg border shadow-lg">
                                        <div className="p-4 bg-gray-100 rounded-lg text-center">
                                            <ClipboardDocumentIcon className="w-10 h-10 mx-auto text-gray-500"/>
                                            <h5 className="font-bold mt-2">1. 원본 정보</h5>
                                            <p className="text-sm text-gray-600 mt-1">수집된 원본 텍스트 전체와 출처 링크를 제공하여 맥락을 완전히 파악할 수 있도록 합니다.</p>
                                        </div>
                                         <div className="p-4 bg-blue-100 rounded-lg text-center border-2 border-blue-300">
                                            <AcademicCapIcon className="w-10 h-10 mx-auto text-blue-500"/>
                                            <h5 className="font-bold mt-2">2. AI 1차 분석</h5>
                                            <p className="text-sm text-blue-700 mt-1">AI의 초기 판정(사실/허위), 신뢰도 점수, 그리고 RAG를 통해 참조한 <strong>핵심 근거 데이터</strong>를 명확히 제시하여 판단의 투명성을 확보합니다.</p>
                                        </div>
                                         <div className="p-4 bg-green-100 rounded-lg text-center">
                                            <CheckCircleIcon className="w-10 h-10 mx-auto text-green-500"/>
                                            <h5 className="font-bold mt-2">3. 전문가 최종 판정</h5>
                                            <p className="text-sm text-green-700 mt-1">AI의 분석을 참고하여 전문가가 '사실', '허위', '의견'으로 최종 판정을 내립니다. 이 결정은 시스템의 최종 데이터로 기록됩니다.</p>
                                        </div>
                                    </div>
                                </HelpSection>
                                
                                <HelpSection title="2. 지능의 선순환: Human-in-the-Loop (HITL) 프로세스">
                                    <p className="mb-4">GIDS는 한 번 구축되고 끝나는 시스템이 아닙니다. 전문가의 피드백을 통해 스스로를 계속해서 발전시키는 살아있는 시스템입니다.</p>
                                    <div className="not-prose my-4 p-6 bg-white rounded-lg border shadow-lg relative flex flex-col items-center gap-4">
                                        <div className="flex items-center gap-4 w-full">
                                            <div className="flex-1 text-center p-3 bg-green-50 rounded-lg border border-green-200">
                                                <h6 className="font-semibold text-green-800">1. 전문가 판정</h6>
                                                <p className="text-xs">워크벤치에서 최종 결정</p>
                                            </div>
                                            <div className="text-2xl text-gray-400 font-mono">➡</div>
                                            <div className="flex-1 text-center p-3 bg-purple-50 rounded-lg border border-purple-200">
                                                 <h6 className="font-semibold text-purple-800">2. 고품질 데이터셋 구축</h6>
                                                 <p className="text-xs">전문가 판정을 '정답'으로 저장</p>
                                            </div>
                                        </div>
                                        <div className="text-3xl text-gray-400 animate-pulse">🔁</div>
                                         <div className="flex items-center gap-4 w-full">
                                            <div className="flex-1 text-center p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                                                <h6 className="font-semibold text-yellow-800">4. 더 똑똑해진 AI</h6>
                                                <p className="text-xs">더 정확한 1차 분석 제공</p>
                                            </div>
                                            <div className="text-2xl text-gray-400 font-mono">⬅</div>
                                            <div className="flex-1 text-center p-3 bg-blue-50 rounded-lg border border-blue-200">
                                                 <h6 className="font-semibold text-blue-800">3. AI 모델 미세조정</h6>
                                                 <p className="text-xs">축적된 데이터셋으로 주기적 재학습</p>
                                            </div>
                                        </div>
                                    </div>
                                </HelpSection>

                                <HelpSection title="3. 실제 운영 시나리오: 'X 지역 괴질 폐렴' 루머 검증">
                                    <p className="mb-4">GIDS의 AI-Human 협업 프로세스가 실제 상황에서 어떻게 작동하는지 보여주는 타임라인 예시입니다.</p>
                                    <div className="not-prose space-y-2">
                                        {/* Step 1 */}
                                        <div className="flex items-start gap-4 p-4 bg-white rounded-lg shadow border">
                                            <div className="flex flex-col items-center flex-shrink-0">
                                                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center"><MegaphoneIcon className="w-7 h-7 text-gray-600"/></div>
                                                <div className="font-bold text-sm text-gray-700 mt-1">14:30</div>
                                            </div>
                                            <div>
                                                <h5 className="font-bold text-gray-800">정보 포착 (Automated Ingestion)</h5>
                                                <p className="text-sm text-gray-600">GIDS 크롤러가 SNS에서 "X 지역에서 원인 불명의 폐렴이 유행하고 있다. 정부는 진실을 숨기고 있다!"는 내용의 게시물을 실시간으로 포착합니다.</p>
                                            </div>
                                        </div>
                                        {/* Step 2 */}
                                        <div className="flex items-start gap-4 p-4 bg-white rounded-lg shadow border">
                                            <div className="flex flex-col items-center flex-shrink-0">
                                                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center"><BrainIcon className="w-7 h-7 text-blue-600"/></div>
                                                <div className="font-bold text-sm text-blue-700 mt-1">14:32</div>
                                            </div>
                                            <div>
                                                <h5 className="font-bold text-blue-800">AI 1차 분석 및 경보 (AI Triage & Alert)</h5>
                                                <p className="text-sm text-blue-700">AI Core가 '원인 불명', '유행', '숨기고 있다' 등 위험 키워드와 공식 출처 부재, 선정적 언어 패턴을 근거로 '긴급 검토 필요(신뢰도 20.1%)' 항목으로 자동 분류하고, 담당 역학조사관에게 즉시 알림을 발송합니다. <strong>(소요 시간: 2분)</strong></p>
                                            </div>
                                        </div>
                                        {/* Step 3 */}
                                        <div className="flex items-start gap-4 p-4 bg-white rounded-lg shadow border-2 border-accent">
                                            <div className="flex flex-col items-center flex-shrink-0">
                                                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center"><UserShieldIcon className="w-7 h-7 text-yellow-700"/></div>
                                                <div className="font-bold text-sm text-yellow-800 mt-1">14:45</div>
                                            </div>
                                            <div className="w-full">
                                                <h5 className="font-bold text-yellow-800">전문가 심층 검증 (Expert Verification)</h5>
                                                <p className="text-sm text-yellow-700 mb-2">역학조사관이 '검증 워크벤치'에 접속. AI가 제공한 RAG 분석 결과(관련 공식 보고서 없음)와 원본 텍스트를 검토한 후, 최종적으로 '증거 불충분 허위 정보'로 판정합니다. <strong>(전문가 판단 소요 시간: 13분)</strong></p>
                                                {/* UI Mockup */}
                                                <div className="mt-2 p-2 bg-gray-100 rounded-lg shadow-inner">
                                                     <h6 className="font-semibold text-center text-sm text-secondary mb-2">검증 워크벤치 UI 프로토타입</h6>
                                                     <div className="grid grid-cols-3 gap-2">
                                                        <div className="p-2 border rounded bg-gray-50"><h6 className="font-semibold text-xs text-center">1. 원본 텍스트</h6><p className="text-xs bg-white p-1 mt-1 rounded border">"X 지역 원인불명 폐렴 유행..."</p></div>
                                                        <div className="p-2 border rounded bg-blue-50"><h6 className="font-semibold text-xs text-center">2. AI 분석</h6><p className="text-xs bg-white p-1 mt-1 rounded border"><strong>판정:</strong> 허위 의심 (20.1%)<br/><strong>근거:</strong> 공식 출처 없음</p></div>
                                                        <div className="p-2 border rounded bg-green-50"><h6 className="font-semibold text-xs text-center">3. 최종 판정</h6><div className="flex gap-1 mt-1"><button className="text-xs flex-1 bg-green-200 rounded p-1">사실</button><button className="text-xs flex-1 bg-red-300 ring-2 ring-red-500 rounded p-1">허위</button></div></div>
                                                     </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* Step 4 */}
                                        <div className="flex items-start gap-4 p-4 bg-white rounded-lg shadow border">
                                            <div className="flex flex-col items-center flex-shrink-0">
                                                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center"><SparklesIcon className="w-7 h-7 text-purple-600"/></div>
                                                <div className="font-bold text-sm text-purple-700 mt-1">15:00</div>
                                            </div>
                                            <div>
                                                <h5 className="font-bold text-purple-800">대응 및 시스템 학습 (Action & System Learning)</h5>
                                                <p className="text-sm text-purple-700">전문가의 판정은 즉시 유관 부서에 공유되어 대국민 안내 자료 준비에 활용됩니다. 동시에, 이 '허위 정보' 사례는 AI 모델의 재학습 데이터셋에 추가되어, 향후 유사한 패턴의 루머를 더 빠르고 정확하게 탐지하는 데 기여합니다.</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-6 p-4 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800">
                                        <p><strong>결론:</strong> GIDS는 단 <strong>30분</strong> 이내에 온라인상의 불확실한 위협을 탐지, 분석, 검증, 대응하는 전 과정을 완료합니다. 이는 AI의 신속성과 전문가의 신뢰성을 결합하여 국민의 안전을 지키는 가장 효과적인 방법론임을 증명합니다.</p>
                                    </div>
                                </HelpSection>

                                <hr className="my-8" />

                                <h3>UI 모듈의 핵심 경쟁력</h3>
                                <div className="not-prose grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                                    <AdvantageCard title="신뢰도 극대화 (Maximum Reliability)">
                                        AI의 속도와 규모, 인간 전문가의 정밀함과 맥락 이해 능력을 결합하여 기계적 오류나 편향을 최소화하고 가장 신뢰도 높은 최종 결과를 도출합니다.
                                    </AdvantageCard>
                                    <AdvantageCard title="지속적 성능 향상 (Continuous Improvement)">
                                        Human-in-the-Loop 메커니즘을 통해 시스템이 운영될수록 더 많은 고품질 데이터를 축적하고, 이를 통해 AI 모델이 스스로 똑똑해지는 자기 강화 학습 생태계를 구축합니다.
                                    </AdvantageCard>
                                    <AdvantageCard title="AI 투명성 및 설명가능성 (XAI)">
                                        AI가 어떤 근거(Evidence)를 바탕으로 판단했는지 명확히 보여줌으로써, '블랙박스'와 같은 AI의 의사결정 과정을 투명하게 만들어 사용자의 신뢰를 확보합니다.
                                    </AdvantageCard>
                                     <AdvantageCard title="효율적인 워크플로우 (Efficient Workflow)">
                                        정보 검증에 필요한 모든 요소를 단일 인터페이스에 통합하여 전문가가 여러 시스템을 오갈 필요 없이 신속하고 일관된 기준으로 업무를 처리할 수 있도록 지원합니다.
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

export default UIModuleHelpModal;