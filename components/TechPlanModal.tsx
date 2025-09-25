import React, { useState } from 'react';
import MinusIcon from './icons/MinusIcon';
import WindowIcon from './icons/WindowIcon';
import Square2StackIcon from './icons/Square2StackIcon';
import XMarkIcon from './icons/XMarkIcon';
import BoltIcon from './icons/BoltIcon';
import CodeBracketIcon from './icons/CodeBracketIcon';
import DatabaseIcon from './icons/DatabaseIcon';
import BrainIcon from './icons/BrainIcon';
import BeakerIcon from './icons/BeakerIcon';
import CloudArrowUpIcon from './icons/CloudArrowUpIcon';
import CheckCircleIcon from './icons/CheckCircleIcon';
import UserShieldIcon from './icons/UserShieldIcon';
import PipelineIcon from './icons/PipelineIcon';
import VisualizeIcon from './icons/VisualizeIcon';

interface TechPlanModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PhaseCard: React.FC<{ phase: string; title: string; period: string; children: React.ReactNode }> = ({ phase, title, period, children }) => (
    <div className="relative pl-8 py-4 border-l-2 border-blue-300">
        <div className="absolute -left-4 top-4 w-8 h-8 bg-primary-dark text-white rounded-full flex items-center justify-center font-bold text-sm shadow-md">{phase}</div>
        <h4 className="font-bold text-xl text-secondary">{title}</h4>
        <p className="text-sm font-semibold text-gray-500 mb-3">{period}</p>
        <div className="space-y-3">{children}</div>
    </div>
);

const Milestone: React.FC<{ icon: React.ReactNode; title: string; deliverables: string[] }> = ({ icon, title, deliverables }) => (
    <div className="p-4 bg-white rounded-lg border border-gray-200 shadow-sm">
        <h5 className="font-semibold text-md text-blue-800 flex items-center gap-2">{icon} {title}</h5>
        <ul className="list-disc list-inside text-sm text-gray-700 mt-2 space-y-1 pl-2">
            {deliverables.map((item, index) => <li key={index}>{item}</li>)}
        </ul>
    </div>
);

const TechPlanModal: React.FC<TechPlanModalProps> = ({ isOpen, onClose }) => {
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
        normal: "w-full max-w-6xl h-[95vh]",
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
                        <BoltIcon className="w-6 h-6"/>
                        {modalState !== 'minimized' ? '기술개발 세부 추진계획 (Roadmap)' : '기술개발 로드맵'}
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
                                <p className="text-center text-lg text-gray-600 leading-relaxed">
                                    본 로드맵은 GIDS 프로젝트를 4개의 핵심 단계로 나누어, 각 단계별 목표와 주요 산출물을 명확히 정의합니다. 애자일 스크럼 방법론에 따라 2주 단위의 스프린트로 세부 과업을 수행하며, 각 단계 종료 시점에는 가시적인 성과물 시연을 목표로 합니다.
                                </p>
                            </div>
                            <div className="mt-8">
                                <PhaseCard phase="1" title="Phase 1: Foundation & Core Service Development" period="~2025년 2분기 (6개월)">
                                    <Milestone icon={<CloudArrowUpIcon className="w-5 h-5"/>} title="Infra & DevOps" deliverables={['Terraform 기반 AWS/GCP 인프라 구축 완료 (VPC, EKS/GKE)', 'GitHub Actions 연동 CI/CD 파이프라인 v1.0 구축 (Docker 빌드, K8s 배포 자동화)', '기본 모니터링 대시보드 구축 (Prometheus, Grafana)']}/>
                                    <Milestone icon={<DatabaseIcon className="w-5 h-5"/>} title="Data & Ingestion" deliverables={['주요 10개 데이터 소스(WHO, CDC 등) 크롤러 개발 완료', 'Kafka 클러스터 구축 및 데이터 수집-저장 파이프라인 v1.0 완성', 'PostgreSQL(PostGIS), S3 Data Lake 스키마 설계 및 구축']}/>
                                    <Milestone icon={<CodeBracketIcon className="w-5 h-5"/>} title="Application" deliverables={['사용자 인증/인가(JWT) 기능 개발', '정보 수집/검증 현황 대시보드 UI 프로토타입 개발', '관리자 페이지 v1.0 (사용자, 크롤러 관리)']}/>
                                </PhaseCard>
                                <PhaseCard phase="2" title="Phase 2: AI Model Integration & Feature Expansion" period="~2025년 3분기 (3개월)">
                                    <Milestone icon={<BrainIcon className="w-5 h-5"/>} title="AI Core" deliverables={['Gemini 2.5 연동 RAG 팩트체크 파이프라인 v1.0 개발', 'Vector DB 구축 및 임베딩 자동화 파이프라인 완성', '수동 검증 UI 및 결과 피드백 시스템 개발']}/>
                                    <Milestone icon={<PipelineIcon className="w-5 h-5"/>} title="Data Pipeline" deliverables={['개인정보 비식별화 모듈 개발 및 파이프라인 통합', '수집 대상 데이터 소스 30개 이상으로 확장', '데이터 품질 검증 및 정제 로직 고도화']}/>
                                    <Milestone icon={<UserShieldIcon className="w-5 h-5"/>} title="Security" deliverables={['OWASP Top 10 기반 보안 취약점 1차 점검 및 조치', '민감 정보 암호화 및 접근 제어 정책 수립']}/>
                                </PhaseCard>
                                 <PhaseCard phase="3" title="Phase 3: Advanced Features & Optimization" period="~2025년 4분기 (3개월)">
                                    <Milestone icon={<VisualizeIcon className="w-5 h-5"/>} title="Visualization & Statistics" deliverables={['GIS 기반 지도 시각화 기능 v1.0 완성 (Leaflet)', '통계 분석 대시보드 및 인터랙티브 차트 개발', 'PDF 보고서 자동 생성 기능 구현']}/>
                                    <Milestone icon={<BrainIcon className="w-5 h-5"/>} title="AI Core" deliverables={['KT Mi:dm 모델 연동 하이브리드 아키텍처 구축', '수동 검증 피드백 기반 모델 성능 개선(Fine-tuning) v1.0', 'AI 모델 서빙 성능 최적화 (응답 시간 30초 -> 15초 단축 목표)']}/>
                                    <Milestone icon={<BeakerIcon className="w-5 h-5"/>} title="QA" deliverables={['E2E 테스트 시나리오 20개 이상 자동화 (Cypress)', '부하 테스트(k6)를 통한 시스템 성능 병목 구간 식별 및 개선']}/>
                                </PhaseCard>
                                <PhaseCard phase="4" title="Phase 4: Beta Testing & Official Launch" period="~2026년 1분기 (3개월)">
                                    <Milestone icon={<CheckCircleIcon className="w-5 h-5"/>} title="Stabilization & Launch" deliverables={['질병관리청 담당자 대상 비공개 베타 테스트(CBT) 진행 및 피드백 반영', '최종 보안 감사 및 모의 해킹 수행', 'GIDS v1.0 공식 런칭 및 운영 메뉴얼 전달']}/>
                                    <Milestone icon={<CloudArrowUpIcon className="w-5 h-5"/>} title="Operation" deliverables={['운영 인력 기술 이전 및 교육 완료', '장애 대응 및 재해 복구(DR) 계획 최종 수립 및 모의 훈련', 'SLA 99.9% 목표 설정 및 모니터링 체계 고도화']}/>
                                </PhaseCard>
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

export default TechPlanModal;
