import React, { useState } from 'react';
import MinusIcon from './icons/MinusIcon';
import WindowIcon from './icons/WindowIcon';
import Square2StackIcon from './icons/Square2StackIcon';
import XMarkIcon from './icons/XMarkIcon';
import BeakerIcon from './icons/BeakerIcon';

interface QAHelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const HelpSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div>
        <h4 className="font-semibold text-lg mb-2 text-secondary">{title}</h4>
        <div className="pl-4 border-l-2 border-blue-200">{children}</div>
    </div>
);

const QAHelpModal: React.FC<QAHelpModalProps> = ({ isOpen, onClose }) => {
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
        setModalState('maximized'); 
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
                        <BeakerIcon className="w-6 h-6"/>
                        {modalState !== 'minimized' ? '품질 보증(QA) 전략 및 실행 계획' : 'QA 전략'}
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
                                <h3>서론: 품질은 마지막에 확인하는 것이 아니라, 개발 과정에 내재되는 것이다.</h3>
                                <p>GIDS의 품질 보증(QA) 철학은 'Shift-Left Testing'에 기반합니다. 이는 버그를 개발 주기 후반에 발견하여 수정하는 고비용의 방식을 지양하고, 개발 초기 단계부터 품질 검증 활동을 시작하여 잠재적 결함을 조기에 예방하는 접근법입니다. 우리는 개발자가 작성하는 코드 한 줄부터 최종 배포까지, 모든 단계에 자동화된 품질 게이트를 구축하여 안정적이고 신뢰성 높은 시스템을 제공할 것입니다.</p>
                                
                                <HelpSection title="1. GIDS 테스트 자동화 전략: 테스트 피라미드">
                                    <p>효율적이고 안정적인 테스트 포트폴리오를 구축하기 위해 '테스트 피라미드' 모델을 채택합니다. 이는 빠르고 비용이 저렴한 테스트를 기반으로 넓게 구성하고, 느리고 비용이 비싼 테스트는 상위 레벨에서 최소한으로 수행하는 전략입니다.</p>
                                    <div className="bg-white p-4 my-4 rounded-lg shadow border text-center">
                                        <div className="border-b-2 border-dashed border-red-400 p-2 text-red-600 font-bold">E2E Tests (Cypress) - 5%</div>
                                        <div className="border-b-2 border-dashed border-yellow-400 p-4 text-yellow-600 font-bold">Integration Tests - 20%</div>
                                        <div className="p-6 text-green-600 font-bold">Unit Tests (Jest / Pytest) - 75%</div>
                                        <p className="text-sm text-gray-500 mt-2">▲ 실행 속도 느림 / 비용 높음<br/>▼ 실행 속도 빠름 / 비용 낮음</p>
                                    </div>
                                    <ul className="list-disc space-y-2 text-gray-700">
                                        <li><strong>단위 테스트 (Unit Tests):</strong> 개발자가 작성한 개별 함수, 클래스, 컴포넌트가 의도대로 정확히 동작하는지 검증합니다. CI 파이프라인의 첫 번째 관문으로, 모든 Pull Request에 대해 실행되어 코드 커버리지 80% 이상을 유지하는 것을 목표로 합니다.</li>
                                        <li><strong>통합 테스트 (Integration Tests):</strong> 여러 컴포넌트나 마이크로서비스가 함께 동작할 때 발생하는 문제를 검증합니다. 예를 들어, 'API 서비스가 DB로부터 데이터를 정확히 조회하여 올바른 JSON 형식으로 반환하는가'를 테스트합니다. 실제 DB나 외부 API 대신 Mocking을 활용하여 테스트 환경을 격리하고 속도를 높입니다.</li>
                                        <li><strong>E2E 테스트 (End-to-End Tests):</strong> 실제 사용자의 시나리오를 시뮬레이션하여 전체 시스템이 올바르게 동작하는지 검증하는 최종 단계입니다. (예: "로그인 → 지도 페이지 이동 → 특정 질병 필터링 → 마커 클릭 → 상세 보고서 확인") Cypress와 같은 도구를 사용하여 브라우저에서 직접 테스트를 수행하며, 핵심 비즈니스 로직의 무결성을 보장합니다.</li>
                                    </ul>
                                </HelpSection>
                                
                                <HelpSection title="2. 특수 테스트 영역 (Specialized Testing)">
                                    <p>GIDS 시스템의 특수성을 고려하여, 일반적인 웹 애플리케이션 테스트 외에 다음과 같은 전문적인 테스트를 수행합니다.</p>
                                    <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                                        <h5 className="font-bold text-blue-800">2.1. AI 모델 품질 보증</h5>
                                        <p className="text-sm text-blue-700">
                                            AI 모델은 '정답'이 정해져 있지 않으므로, 다각적인 평가가 필수적입니다.
                                            <ul>
                                                <li><strong>오프라인 평가:</strong> 사전에 구축된 평가 데이터셋(Evaluation Dataset)을 이용하여 모델의 정확도(Precision), 재현율(Recall), F1-Score를 측정합니다. 모델이 업데이트될 때마다 이 평가를 수행하여 성능 저하(Regression)가 없는지 확인합니다.</li>
                                                <li><strong>온라인 A/B 테스트:</strong> 새로운 버전의 AI 모델을 일부 사용자 그룹에게만 배포하고, 기존 모델과 성능(예: 수동 검토율 감소, 사용자 만족도)을 비교하여 실제 환경에서의 효과를 검증합니다.</li>
                                                <li><strong>적대적 테스트 (Adversarial Testing):</strong> 의도적으로 모호하거나 잘못된 정보를 입력하여 모델이 얼마나 강건하게(robust) 대처하는지, 환각(Hallucination) 현상을 얼마나 잘 제어하는지 테스트합니다.</li>
                                            </ul>
                                        </p>
                                    </div>
                                    <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                                        <h5 className="font-bold text-red-800">2.2. 보안 및 취약점 테스트</h5>
                                        <p className="text-sm text-red-700">
                                            정부 기관에서 사용하는 시스템인 만큼, 보안은 최우선 순위입니다.
                                            <ul>
                                                <li><strong>정적/동적 분석 (SAST/DAST):</strong> CI 파이프라인에 Snyk, SonarQube와 같은 도구를 통합하여 코드를 작성하는 단계에서부터 잠재적인 보안 취약점을 자동으로 탐지합니다.</li>
                                                <li><strong>의존성 스캐닝 (Dependency Scanning):</strong> 사용하는 모든 오픈소스 라이브러리에 대해 알려진 보안 취약점(CVE)이 있는지 자동으로 검사하고, 발견 시 즉시 알림을 받습니다.</li>
                                                <li><strong>정기 모의 해킹:</strong> 분기별로 외부 보안 전문가를 통해 OWASP Top 10과 같은 표준적인 웹 취약점 점검을 수행합니다.</li>
                                            </ul>
                                        </p>
                                    </div>
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

export default QAHelpModal;