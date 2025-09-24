import React, { useState } from 'react';
import MinusIcon from './icons/MinusIcon';
import WindowIcon from './icons/WindowIcon';
import Square2StackIcon from './icons/Square2StackIcon';
import XMarkIcon from './icons/XMarkIcon';
import UserGroupIcon from './icons/UserGroupIcon';

interface TeamHelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const HelpSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div>
        <h4 className="font-semibold text-lg mb-2 text-secondary">{title}</h4>
        <div className="pl-4 border-l-2 border-blue-200">{children}</div>
    </div>
);

const RoleDetail: React.FC<{ title: string; count: number; children: React.ReactNode }> = ({ title, count, children }) => (
    <div className="p-4 bg-gray-100 rounded-lg shadow-inner">
        <h5 className="font-bold text-md text-blue-800">{title} ({count}명)</h5>
        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1 mt-2">
            {children}
        </ul>
    </div>
);

const TeamHelpModal: React.FC<TeamHelpModalProps> = ({ isOpen, onClose }) => {
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
                        <UserGroupIcon className="w-6 h-6"/>
                        {modalState !== 'minimized' ? '팀 구성 및 운영 전략 (R&R)' : '팀 구성 (R&R)'}
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
                                <h3>서론: 'Two-Pizza' 팀 철학</h3>
                                <p>GIDS 프로젝트는 '피자 두 판으로 식사를 해결할 수 있는' 규모의 작고 응집력 있는 팀을 지향합니다. 이는 아마존의 성공 사례에서 증명되었듯이, 팀원 간의 커뮤니케이션 비용을 최소화하고, 의사결정 속도를 극대화하며, 각 팀원이 자신의 역할에 대한 강력한 주인의식(Ownership)을 갖게 하는 가장 효과적인 조직 구조입니다. 우리는 각 분야의 최고 전문가로 구성된 Cross-functional 팀을 통해 사일로(silo)를 제거하고 공동의 목표를 향해 시너지를 창출할 것입니다.</p>
                                
                                <HelpSection title="1. 상세 역할 및 책임 (Roles & Responsibilities)">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
                                        <RoleDetail title="Project Manager (PM)" count={1}>
                                            <li>프로젝트 목표(OKR) 설정 및 전파, 이해관계자(질병관리청) 커뮤니케이션 채널 단일화</li>
                                            <li>프로덕트 백로그 관리 및 우선순위 결정 (비즈니스 가치, 긴급도 기반)</li>
                                            <li>프로젝트 일정, 예산, 리스크(RAID Log) 관리 및 정기 보고</li>
                                        </RoleDetail>
                                        <RoleDetail title="Tech Lead (TL)" count={1}>
                                            <li>전체 시스템 아키텍처 설계 및 기술적 의사결정 최종 책임</li>
                                            <li>코드 품질 표준 수립(코딩 컨벤션, 린팅 규칙) 및 Pull Request 리뷰 주도</li>
                                            <li>기술적 부채(Technical Debt) 관리 및 리팩토링 계획 수립, 개발팀 멘토링</li>
                                        </RoleDetail>
                                        <RoleDetail title="AI/ML Engineer" count={1}>
                                            <li>LLM 기반 RAG 파이프라인 설계, 구축 및 최적화 (Prompt Engineering 포함)</li>
                                            <li>모델 서빙 아키텍처 구축 (FastAPI, TorchServe) 및 MLOps 파이프라인(MLflow) 관리</li>
                                            <li>AI 모델 성능(정확도, 지연 시간) 모니터링 및 지속적인 개선(Fine-tuning)</li>
                                        </RoleDetail>
                                        <RoleDetail title="Backend Engineer" count={2}>
                                            <li>마이크로서비스 API(FastAPI) 설계(OpenAPI Spec) 및 개발</li>
                                            <li>데이터베이스 스키마 설계, 쿼리 최적화, 데이터 파이프라인(Kafka) 구축</li>
                                            <li>인증/인가(JWT), 시스템 보안 및 성능 최적화 담당</li>
                                        </RoleDetail>
                                        <RoleDetail title="Frontend Engineer" count={2}>
                                            <li>재사용 가능한 컴포넌트 아키텍처(Atomic Design) 설계 및 UI 라이브러리 구축</li>
                                            <li>상태 관리(React Query, Zustand) 및 클라이언트 성능 최적화(Code Splitting, Caching)</li>
                                            <li>데이터 시각화(Leaflet, Recharts) 구현 및 웹 접근성(WCAG) 표준 준수</li>
                                        </RoleDetail>
                                        <RoleDetail title="DevOps/Infra Engineer" count={1}>
                                            <li>클라우드 인프라(AWS/GCP)를 코드로 관리(IaC with Terraform)</li>
                                            <li>Kubernetes(EKS/GKE) 클러스터 구축 및 운영, CI/CD 파이프라인(GitHub Actions) 구축</li>
                                            <li>모니터링(Prometheus, Grafana) 및 로깅(ELK) 시스템 구축, 시스템 안정성(SRE) 책임</li>
                                        </RoleDetail>
                                    </div>
                                </HelpSection>
                                
                                <HelpSection title="2. 협업 및 의사소통 프로토콜">
                                    <p>명확하고 효율적인 의사소통은 프로젝트 성공의 핵심입니다. 우리는 다음과 같은 프로토콜을 준수합니다.</p>
                                    <div className="overflow-x-auto">
                                        <table className="min-w-full divide-y divide-gray-300">
                                            <thead className="bg-gray-100">
                                                <tr>
                                                    <th>소통 채널</th>
                                                    <th>목적</th>
                                                    <th>주기 / 시점</th>
                                                    <th>핵심 참석자</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-200 bg-white">
                                                <tr>
                                                    <td><strong>Slack</strong></td>
                                                    <td>실시간 비동기 소통, 긴급 알림, 기술 토론</td>
                                                    <td>상시</td>
                                                    <td>팀 전체</td>
                                                </tr>
                                                <tr>
                                                    <td><strong>Daily Scrum</strong></td>
                                                    <td>진행 상황 동기화 및 장애물 식별</td>
                                                    <td>매일 (15분)</td>
                                                    <td>개발팀, SM</td>
                                                </tr>
                                                <tr>
                                                    <td><strong>Jira</strong></td>
                                                    <td>업무 할당 및 진행 상태 추적 (Single Source of Truth)</td>
                                                    <td>상시</td>
                                                    <td>팀 전체</td>
                                                </tr>
                                                 <tr>
                                                    <td><strong>Confluence</strong></td>
                                                    <td>요구사항, 아키텍처 설계, 회의록 등 영구적 지식 관리</td>
                                                    <td>상시</td>
                                                    <td>팀 전체</td>
                                                </tr>
                                                <tr>
                                                    <td><strong>GitHub Pull Request</strong></td>
                                                    <td>코드 변경 사항에 대한 비동기적 리뷰 및 토론</td>
                                                    <td>코드 변경 시</td>
                                                    <td>개발팀</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <p className="mt-2"><strong>Slack 채널 운영 규칙:</strong> <code>#general</code>(공지), <code>#development</code>(전체 개발), <code>#ai-core</code>(AI), <code>#alerts-prod</code>(자동화된 시스템 경고) 등 목적에 따라 채널을 명확히 분리하여 정보의 혼선을 방지합니다.</p>
                                </HelpSection>
                                
                                <HelpSection title="3. 지식 공유 및 성장 계획">
                                    <p>팀의 성장은 곧 프로젝트의 성장입니다. 우리는 다음과 같은 활동을 통해 지속적인 학습과 지식 공유 문화를 장려합니다.</p>
                                     <ul className="list-disc space-y-2 text-gray-700">
                                        <li><strong>기술 부채 회고 (Tech Debt Retrospective):</strong> 2 스프린트(1개월)에 한 번씩, 현재 아키텍처의 문제점이나 개선이 필요한 부분을 논의하고, 다음 스프린트 백로그에 리팩토링 작업을 할당합니다.</li>
                                        <li><strong>주간 기술 공유 세션 (Weekly Tech Share):</strong> 매주 금요일 1시간, 팀원들이 돌아가며 최근에 학습한 신기술, 유용한 라이브러리, 문제 해결 경험 등을 자유롭게 공유합니다.</li>
                                        <li><strong>문서화 문화 (Documentation Culture):</strong> "코드는 어떻게(How)를 설명하지만, 문서는 왜(Why)를 설명한다."는 원칙 하에, 모든 주요 아키텍처 결정과 기능 개발 배경은 Confluence에 반드시 기록하여 지식의 자산화를 추구합니다.</li>
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

export default TeamHelpModal;