import React, { useState } from 'react';
import MinusIcon from './icons/MinusIcon';
import WindowIcon from './icons/WindowIcon';
import Square2StackIcon from './icons/Square2StackIcon';
import XMarkIcon from './icons/XMarkIcon';
import ArrowPathIcon from './icons/ArrowPathIcon';

interface MethodologyHelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const HelpSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div>
        <h4 className="font-semibold text-lg mb-2 text-secondary">{title}</h4>
        <div className="pl-4 border-l-2 border-blue-200">{children}</div>
    </div>
);

const MethodologyHelpModal: React.FC<MethodologyHelpModalProps> = ({ isOpen, onClose }) => {
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
                        <ArrowPathIcon className="w-6 h-6"/>
                        {modalState !== 'minimized' ? '애자일 스크럼 심층 가이드' : '개발 방법론'}
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
                                <h3>서론: 왜 애자일 스크럼인가?</h3>
                                <p>GIDS와 같은 혁신적인 AI 기반 시스템 개발은 전통적인 폭포수(Waterfall) 모델로는 대응하기 어려운 불확실성을 내포합니다. 요구사항은 계속해서 진화하고, 기술은 빠르게 변하며, 사용자 피드백을 통한 신속한 개선이 프로젝트 성공의 관건입니다. 애자일 스크럼은 <strong>짧은 주기의 반복(Sprint)</strong>을 통해 <strong>실제로 동작하는 소프트웨어(Increment)</strong>를 지속적으로 제공함으로써, 이러한 불확실성에 효과적으로 대응하고 프로젝트의 가치를 조기에 극대화하는 최적의 방법론입니다.</p>
                                
                                <HelpSection title="1. GIDS 스크럼 프레임워크">
                                    <p>GIDS 프로젝트는 2주 단위의 스프린트를 기본 주기로 설정하여 속도와 안정성의 균형을 맞춥니다.</p>
                                    <div className="bg-gray-100 p-4 rounded-lg my-4 text-center font-mono text-sm shadow-inner">
                                        <p><strong>[Product Backlog]</strong> --&gt; <strong>[Sprint Planning]</strong> --&gt; <strong>[Sprint Backlog]</strong></p>
                                        <p className="ml-8">|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;^</p>
                                        <p className="ml-8">v&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|</p>
                                        <p><strong>[Sprint (2 weeks)]</strong> --- (Daily Scrums) ---&gt; <strong>[Increment]</strong></p>
                                        <p className="ml-8">|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;^</p>
                                        <p className="ml-8">v&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|</p>
                                        <p><strong>[Sprint Review]</strong> &lt;-- (Feedback) -- <strong>[Sprint Retrospective]</strong></p>
                                    </div>
                                    <ul className="list-disc space-y-2 text-gray-700">
                                        <li><strong>스프린트 플래닝 (Sprint Planning):</strong> 매 스프린트 시작일에 4시간 동안 진행. PO가 제시하는 우선순위 높은 백로그 항목을 기반으로, 개발팀이 이번 스프린트에서 달성할 수 있는 작업 범위를 산정하고 **스프린트 목표(Sprint Goal)**를 설정합니다. (예: "사용자는 지도에서 위험 등급별로 감염병 발생 현황을 필터링할 수 있다.")</li>
                                        <li><strong>데일리 스크럼 (Daily Scrum):</strong> 매일 아침 15분간 진행. 각 팀원은 어제 한 일, 오늘 할 일, 장애물(impediment)을 공유합니다. 단순한 보고가 아닌, 팀의 진행 상황을 동기화하고 협업을 촉진하는 시간입니다.</li>
                                        <li><strong>스프린트 리뷰 (Sprint Review):</strong> 스프린트 마지막 날, 2시간 동안 진행. 개발팀이 완성된 기능(Increment)을 PO와 실제 사용자(질병관리청 담당자 등)에게 시연하고 피드백을 받습니다. 이 피드백은 즉시 프로덕트 백로그에 반영됩니다.</li>
                                        <li><strong>스프린트 회고 (Sprint Retrospective):</strong> 스프린트 리뷰 후, 1.5시간 동안 개발팀과 스크럼 마스터만 참여하여 진행. 좋았던 점(Well), 아쉬웠던 점(Less Well), 다음 스프린트에서 시도할 것(Try)을 논의하며 팀의 프로세스를 스스로 개선합니다.</li>
                                    </ul>
                                </HelpSection>
                                
                                <HelpSection title="2. GIDS 프로덕트 백로그 관리">
                                    <p>모든 요구사항은 사용자 스토리(User Story) 형식으로 작성하여 '누가(Who)', '무엇을(What)', '왜(Why)' 원하는지를 명확히 합니다. 각 스토리는 INVEST 원칙(Independent, Negotiable, Valuable, Estimable, Small, Testable)을 따릅니다.</p>
                                     <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                                        <h5 className="font-bold text-blue-800">사용자 스토리 예시 (Jira)</h5>
                                        <p className="text-sm text-blue-700">
                                            <strong>Epic:</strong> 감염병 정보 시각화<br/>
                                            <strong>User Story (GIDS-123):</strong> "As a 방역 담당자, I want to 필터링된 감염병 발생 건수와 총 건수를 타임라인에 표시하여, so that I can 직관적으로 이벤트의 양적 변화를 파악할 수 있다."<br/>
                                            <strong>Acceptance Criteria:</strong>
                                            <ul>
                                                <li>- 타임라인 슬라이더를 조작하면, 지도 위의 마커와 숫자가 실시간으로 변경되어야 한다.</li>
                                                <li>- 숫자는 '현재 필터링된 건수 / 전체 건수' 형태로 표시되어야 한다.</li>
                                                <li>- 슬라이더 조작에 대한 UI 응답 시간은 200ms 이내여야 한다.</li>
                                            </ul>
                                            <strong>Story Points:</strong> 5
                                        </p>
                                    </div>
                                </HelpSection>

                                <HelpSection title="3. Git-flow 및 CI/CD 연동 전략">
                                    <p>코드의 안정성과 배포 자동화를 위해 Git-flow 브랜칭 전략을 CI/CD 파이프라인과 긴밀하게 연동합니다.</p>
                                    <pre className="bg-gray-800 text-white p-4 rounded-md text-sm"><code>
{`main: 현재 프로덕션(운영) 서버에 배포된 가장 안정적인 버전.
develop: 다음 릴리즈를 위해 개발 중인 최신 버전. 모든 기능 개발은 이 브랜치를 기준으로 함.
feature/{feature-name}: 개별 기능 개발을 위한 브랜치. (예: feature/map-filter)
  - 개발 완료 후 'develop'으로 Pull Request(PR) 생성.
  - CI: PR 생성 시 자동으로 Unit Test 및 코드 정적 분석 실행.
  - Code Review: 동료 개발자 2명 이상의 승인(Approve) 필수.
release/{version}: 'develop' 브랜치의 기능들을 프로덕션에 배포하기 위해 준비하는 브랜치.
hotfix/{issue-name}: 운영 서버의 긴급한 버그 수정을 위한 브랜치. 'main'에서 분기하여 수정 후 'main'과 'develop'에 모두 병합.`}
                                    </code></pre>
                                    <p className="mt-2">이러한 전략은 <strong>지속적 통합(Continuous Integration)</strong>을 보장하며, 모든 코드가 `develop` 브랜치에 병합되기 전에 자동으로 품질을 검증받게 합니다. 또한, `release` 브랜치를 활용하여 스프린트 리뷰가 끝난 안정적인 버전을 체계적으로 <strong>지속적 배포(Continuous Deployment)</strong>할 수 있는 기반을 마련합니다.</p>
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

export default MethodologyHelpModal;