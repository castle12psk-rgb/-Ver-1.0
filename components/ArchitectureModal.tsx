import React, { useState, useEffect } from 'react';
import MinusIcon from './icons/MinusIcon';
import WindowIcon from './icons/WindowIcon';
import Square2StackIcon from './icons/Square2StackIcon';
import XMarkIcon from './icons/XMarkIcon';
import GlobeIcon from './icons/GlobeIcon';
import ServerIcon from './icons/ServerIcon';
import DatabaseIcon from './icons/DatabaseIcon';
import BrainIcon from './icons/BrainIcon';
import HomeIcon from './icons/HomeIcon';
import ShieldCheckIcon from './icons/ShieldCheckIcon';
import QuestionMarkCircleIcon from './icons/QuestionMarkCircleIcon';
import LayerHelpModal from './LayerHelpModal';
import UsersIcon from './icons/UsersIcon';
import ArrowPathIcon from './icons/ArrowPathIcon';

interface ArchitectureModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TechIcon: React.FC<{ icon: string; name: string, small?: boolean }> = ({ icon, name, small }) => (
    <div className={`flex items-center gap-1.5 ${small ? 'bg-gray-200/60 py-0.5 px-1.5' : 'bg-gray-200/80 py-1 px-2'} rounded-md`}>
        <span className={`${small ? 'text-base' : 'text-lg'}`}>{icon}</span>
        <span className={`font-mono ${small ? 'text-[10px]' : 'text-xs'} font-semibold text-gray-800`}>{name}</span>
    </div>
);

const ArchCard: React.FC<{ title: string; onHelpClick: () => void; children: React.ReactNode; className?: string, icon?: React.ReactNode }> = ({ title, onHelpClick, children, className, icon }) => (
    <div className={`bg-white/80 backdrop-blur-sm p-4 rounded-xl border border-gray-200/80 shadow-lg animate-fadeInUp h-full flex flex-col ${className}`}>
        <div className="flex items-center justify-center gap-2 mb-3">
            <h3 className="text-sm font-bold text-center text-primary-dark tracking-wider uppercase flex items-center justify-center gap-2">{icon}{title}</h3>
            <button onClick={onHelpClick} className="text-gray-400 hover:text-primary-light transition-colors">
                <QuestionMarkCircleIcon className="w-4 h-4" />
            </button>
        </div>
        <div className="flex-grow">{children}</div>
    </div>
);

const Arrow: React.FC<{label: string, className: string, path: string, viewBox?: string, animated?: boolean}> = ({label, className, path, viewBox="0 0 100 100", animated = true}) => (
    <div className={`absolute ${className} flex items-center justify-center pointer-events-none`}>
        <svg width="100%" height="100%" viewBox={viewBox} preserveAspectRatio="none" className="absolute top-0 left-0 w-full h-full text-gray-400">
            <defs>
                <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="0" refY="3.5" orient="auto">
                    <polygon points="0 0, 10 3.5, 0 7" fill="currentColor" />
                </marker>
            </defs>
            <path d={path} stroke="currentColor" strokeWidth="1.5" fill="none" markerEnd="url(#arrowhead)" className={animated ? "animate-pulse-slow" : ""}/>
        </svg>
        <span className="relative text-[10px] font-semibold text-gray-700 bg-gray-100 px-1.5 py-0.5 rounded-md shadow-sm whitespace-nowrap pointer-events-auto">{label}</span>
    </div>
);

const FoundationPillar: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="flex flex-col items-center text-center p-2 rounded-lg bg-gray-50/50 h-full">
        <h4 className="text-xs font-bold text-gray-600 mb-2 uppercase tracking-wider">{title}</h4>
        <div className="space-y-1.5 flex flex-col items-center flex-grow justify-center">{children}</div>
    </div>
);

type HelpLayer = 'ingestion' | 'data' | 'ai' | 'application' | 'foundation' | 'dfd';

const ArchitectureModal: React.FC<ArchitectureModalProps> = ({ isOpen, onClose }) => {
    const [modalState, setModalState] = useState<'normal' | 'maximized' | 'minimized'>('maximized');
    const [preMinimizeState, setPreMinimizeState] = useState<'normal' | 'maximized'>('maximized');
    const [activeHelpLayer, setActiveHelpLayer] = useState<HelpLayer | null>(null);

    useEffect(() => {
        if (isOpen) {
            setModalState('maximized');
        } else {
            // Reset state when closed from outside, after animation
            setTimeout(() => setModalState('maximized'), 300);
        }
    }, [isOpen]);

    if (!isOpen) return null;
    
    const handleToggleMaximize = (e: React.MouseEvent) => {
        e.stopPropagation();
        setModalState(prev => (prev === 'maximized' ? 'normal' : 'maximized'));
    };

    const handleMinimize = (e: React.MouseEvent) => {
        e.stopPropagation();
        setPreMinimizeState(modalState === 'maximized' ? 'maximized' : 'normal');
        setModalState('minimized');
    };
    
    const handleInternalClose = (e: React.MouseEvent) => {
        e.stopPropagation();
        onClose();
    }

    const handleRestore = () => {
        setModalState(preMinimizeState);
    };

    const wrapperClasses = {
        normal: "w-full max-w-7xl h-[95vh]",
        maximized: "w-screen h-screen rounded-none",
        minimized: "w-96 fixed bottom-4 right-4 animate-fadeInUp cursor-pointer",
    };
    
    const modalRootClasses = `
        fixed inset-0 bg-black bg-opacity-60 z-[1001]
        ${modalState === 'minimized' ? 'pointer-events-none flex items-end justify-end' : 'flex items-center justify-center'}
    `;

    const DFDBox: React.FC<{type: 'entity' | 'process' | 'store', title: string, description?: string, icon?: React.ReactNode, tech?: React.ReactNode, className?: string}> = ({type, title, description, icon, tech, className}) => {
        const baseClasses = "p-3 rounded-lg border-2 shadow-md flex flex-col items-center text-center h-full justify-center";
        const typeClasses = {
            entity: "bg-amber-50 border-amber-300",
            process: "bg-blue-50 border-blue-300",
            store: "bg-green-50 border-green-300 border-dashed",
        };

        return (
            <div className={`${baseClasses} ${typeClasses[type]} ${className}`}>
                <div className="flex items-center gap-2 font-bold text-sm text-gray-800">{icon}{title}</div>
                {description && <p className="text-xs text-gray-600 mt-1">{description}</p>}
                {tech && <div className="flex gap-1 mt-2 flex-wrap justify-center">{tech}</div>}
            </div>
        )
    }

    return (
        <>
            <LayerHelpModal 
                isOpen={activeHelpLayer === 'ingestion'} 
                onClose={() => setActiveHelpLayer(null)}
                layerTitle="Ingestion Layer 상세 설명"
            >
                <h4 className="font-semibold text-lg mb-2 text-secondary">역할: 데이터의 시작점</h4>
                <p className="text-gray-700 mb-4">
                    Ingestion Layer는 GIDS 시스템의 가장 첫 단계로, 전 세계에 흩어져 있는 다양한 형태의 감염병 관련 원본 데이터를 수집(Crawling)하고 시스템 내부로 가져오는(Ingestion) 역할을 담당합니다. 24/7 중단 없이 작동하여 최신 정보를 놓치지 않는 것이 핵심 목표입니다.
                </p>
                <h4 className="font-semibold text-lg mb-2 text-secondary">주요 기능 및 기술</h4>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                    <li><strong>다양한 데이터 소스 지원:</strong> WHO, CDC와 같은 공식 기관의 정적 웹 페이지, Reuters와 같은 언론사의 API, 실시간 뉴스 피드(RSS), 학술 논문 데이터베이스 등 정형/비정형 데이터를 모두 수집합니다.</li>
                    <li><strong>지능형 크롤러 (Crawler):</strong> Python 기반의 Scrapy, Selenium 등의 전문 라이브러리를 사용하여 개발된 자동화 봇입니다. JavaScript로 동적으로 생성되는 콘텐츠까지 수집 가능하며, 각 소스의 구조에 맞춰 필요한 정보를 정확하게 추출합니다.</li>
                    <li><strong>분산 작업 스케줄링:</strong> Celery Beat와 같은 스케줄러를 통해 각 크롤러의 수집 주기를 '5분', '1시간' 등으로 유연하게 설정하고, 여러 서버에 작업을 분산시켜 안정적이고 효율적인 대규모 수집을 수행합니다.</li>
                    <li><strong>데이터 스트림 생성:</strong> 수집된 원본 데이터는 정제되기 전, 실시간 데이터 파이프라인의 입구인 Kafka와 같은 메시지 큐로 즉시 전송되어 다음 단계로 전달됩니다.</li>
                </ul>
            </LayerHelpModal>
            
            <LayerHelpModal 
                isOpen={activeHelpLayer === 'data'} 
                onClose={() => setActiveHelpLayer(null)}
                layerTitle="Data Layer 상세 설명"
            >
                <h4 className="font-semibold text-lg mb-2 text-secondary">역할: 데이터의 가공 및 저장소</h4>
                <p className="text-gray-700 mb-4">
                    Data Layer는 수집된 원본 데이터를 목적에 맞게 가공(Processing), 분류(Classification), 저장(Storage)하는 시스템의 중앙 허브입니다. 데이터의 흐름을 관리하고, 안정성과 확장성을 보장하며, 각 서비스가 필요로 하는 데이터를 신속하게 제공하는 역할을 수행합니다.
                </p>
                <h4 className="font-semibold text-lg mb-2 text-secondary">핵심 구성 요소</h4>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                    <li><strong>이벤트 버스 (Kafka):</strong> 시스템의 모든 데이터가 거쳐 가는 '중앙 고속도로'입니다. 각 서비스(마이크로서비스)가 서로 직접 통신하지 않고 Kafka를 통해 데이터를 주고받게 함으로써, 시스템의 결합도를 낮추고 유연성과 확장성을 극대화합니다.</li>
                    <li><strong>스트림 프로세서 (Spark Streaming):</strong> Kafka를 통해 실시간으로 들어오는 대용량 데이터를 즉시 처리하고 분석하여, 이상 징후 감지나 실시간 집계 등의 작업을 수행합니다.</li>
                    <li><strong>목적별 데이터 저장소 (Polyglot Persistence):</strong>
                        <ul className="list-inside list-[circle] ml-4 mt-1">
                            <li><strong>Data Lake (AWS S3):</strong> 수집된 모든 원본 데이터를 가공하지 않은 상태로 저장하여, 향후 새로운 분석 모델 개발 등에 활용할 수 있도록 보관합니다.</li>
                            <li><strong>Primary DB (PostgreSQL + PostGIS):</strong> AI 검증을 마친 정형 데이터를 저장합니다. PostGIS 확장을 통해 지리정보(위경도)를 효율적으로 처리하여 지도 시각화에 사용됩니다.</li>
                            <li><strong>Vector DB (ChromaDB, Pinecone):</strong> AI가 텍스트의 의미를 이해하고 비교할 수 있도록, 문서를 벡터(숫자 배열) 형태로 변환하여 저장하는 특수 데이터베이스입니다. RAG 기술의 핵심 요소입니다.</li>
                             <li><strong>Cache (Redis):</strong> 자주 사용되는 데이터나 사용자 세션 정보를 메모리에 저장하여, 시스템의 응답 속도를 폭발적으로 향상시킵니다.</li>
                        </ul>
                    </li>
                </ul>
            </LayerHelpModal>
            
            <LayerHelpModal 
                isOpen={activeHelpLayer === 'ai'} 
                onClose={() => setActiveHelpLayer(null)}
                layerTitle="AI Core 상세 설명"
            >
                 <h4 className="font-semibold text-lg mb-2 text-secondary">역할: 정보의 신뢰도를 부여하는 두뇌</h4>
                <p className="text-gray-700 mb-4">
                    AI Core는 GIDS 시스템의 핵심 지능으로, 무분별하게 수집된 정보를 '신뢰할 수 있는 정보'로 변환하는 역할을 담당합니다. 자연어 처리(NLP)와 대규모 언어 모델(LLM)을 기반으로 다단계 검증 프로세스를 수행하여, 정보의 사실 여부를 판별하고 객관적인 신뢰도 점수를 부여합니다.
                </p>
                <h4 className="font-semibold text-lg mb-2 text-secondary">AI 검증 프로세스 (3-Step)</h4>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                    <li><strong>1. 텍스트 분류 (Classification):</strong> 사전 학습된 AI 모델(DeBERTa, XLM-RoBERTa 등)이 입력된 텍스트의 문맥과 뉘앙스를 분석하여 '사실성 정보', '주장/의견', '허위 정보' 등으로 1차 분류하고 초기 신뢰도를 산출합니다.</li>
                    <li><strong>2. RAG 기반 팩트체크 (Fact-Checking with RAG):</strong>
                        <ul className="list-inside list-[circle] ml-4 mt-1">
                            <li><strong>Retrieval (검색):</strong> 텍스트의 핵심 주장을 벡터로 변환하여, 시스템이 보유한 신뢰도 높은 지식 베이스(Vector DB)에서 가장 관련 있는 근거 문서를 수 초 내에 검색합니다.</li>
                            <li><strong>Augmented Generation (증강 생성):</strong> 검색된 근거 문서와 원본 텍스트를 최신 LLM(Google Gemini 2.5)에 함께 제공합니다. LLM은 이 근거를 바탕으로 원본 텍스트의 사실 여부를 교차 검증하고, 그 판단의 이유를 상세히 설명하는 요약 보고서를 생성합니다.</li>
                        </ul>
                    </li>
                    <li><strong>3. 최종 판정 (Ensemble):</strong> 1단계의 분류 결과와 2단계의 RAG 검증 결과를 종합(Ensemble)하여 최종적으로 '사실', '허위', '의견'을 판정하고, 최종 신뢰도 점수(%)를 계산합니다. 이 결과는 Primary DB에 저장되어 시각화 및 통계 분석에 사용됩니다.</li>
                </ul>
            </LayerHelpModal>

            <LayerHelpModal 
                isOpen={activeHelpLayer === 'application'} 
                onClose={() => setActiveHelpLayer(null)}
                layerTitle="Application Layer 상세 설명"
            >
                <h4 className="font-semibold text-lg mb-2 text-secondary">역할: 사용자와 시스템의 소통 창구</h4>
                <p className="text-gray-700 mb-4">
                    Application Layer는 GIDS 시스템의 모든 처리 결과를 사용자가 직접 보고 상호작용할 수 있도록 만드는 최종 단계입니다. 복잡한 데이터와 AI 분석 결과를 사용자가 이해하기 쉬운 인터페이스(UI)와 기능으로 제공하여, 데이터 기반의 신속한 의사결정을 가능하게 합니다.
                </p>
                <h4 className="font-semibold text-lg mb-2 text-secondary">주요 구성 요소</h4>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                    <li><strong>Backend API (FastAPI):</strong> 프론트엔드(사용자 화면)의 요청에 따라 데이터베이스에서 필요한 정보를 조회하고, 적절한 형식(JSON, GeoJSON)으로 가공하여 전달하는 역할을 합니다. Python의 FastAPI를 사용하여 높은 처리 성능과 안정성을 보장하며, 실시간 데이터 피드를 위한 WebSocket 통신도 지원합니다.</li>
                    <li><strong>Frontend (React):</strong> 사용자가 직접 마주하는 웹 애플리케이션 화면 전체를 의미합니다. TypeScript 기반의 React를 사용하여 컴포넌트 단위로 개발되어 유지보수성이 높고, 사용자 경험(UX)이 뛰어난 동적인 인터페이스를 구축합니다.
                        <ul className="list-inside list-[circle] ml-4 mt-1">
                            <li><strong>대시보드:</strong> 실시간 수집 현황, AI 검증 과정 등을 시각적으로 보여줍니다.</li>
                            <li><strong>GIS 시각화 (Leaflet):</strong> 검증된 데이터를 지도 위에 표시하여 지리적 분포와 확산 경로를 직관적으로 파악하게 합니다.</li>
                            <li><strong>통계 분석 (Recharts):</strong> 축적된 데이터를 다양한 차트와 그래프로 분석하여 인사이트를 제공합니다.</li>
                            <li><strong>관리자 모드 (Admin UI):</strong> 데이터 소스, AI 규칙, 사용자 계정 등 시스템의 핵심 요소를 관리하는 전문가용 인터페이스를 제공합니다.</li>
                        </ul>
                    </li>
                     <li><strong>사용자 인증/인가:</strong> JWT(JSON Web Token) 기반의 보안 시스템을 통해 허가된 사용자만이 시스템에 접근할 수 있도록 제어하며, 역할(Admin, Editor, Viewer)에 따라 접근 가능한 메뉴와 기능을 차등적으로 부여합니다.</li>
                </ul>
            </LayerHelpModal>

             <LayerHelpModal 
                isOpen={activeHelpLayer === 'foundation'} 
                onClose={() => setActiveHelpLayer(null)}
                layerTitle="Foundation Layer 상세 설명"
            >
                <h4 className="font-semibold text-lg mb-2 text-secondary">역할: 전체 시스템을 지탱하는 기반</h4>
                <p className="text-gray-700 mb-4">
                    Foundation Layer는 GIDS 시스템의 모든 상위 Layer들이 안정적이고 효율적으로 작동할 수 있도록 지탱하는 핵심 기반 인프라와 DevOps(개발-운영 통합) 환경을 의미합니다. 눈에 직접 보이지는 않지만, 시스템의 확장성, 안정성, 보안, 배포 자동화 등 품질을 결정하는 가장 중요한 부분입니다.
                </p>
                <h4 className="font-semibold text-lg mb-2 text-secondary">핵심 구성 요소</h4>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                    <li><strong>Cloud Infrastructure (AWS/GCP):</strong> 필요에 따라 컴퓨팅 자원(서버, 스토리지)을 유연하게 확장하거나 축소할 수 있는 클라우드 환경입니다. AWS의 EC2, S3, RDS나 GCP의 GKE, Cloud Storage와 같은 관리형 서비스를 활용하여 인프라 관리 부담을 최소화합니다.</li>
                    <li><strong>Containerization (Docker, Kubernetes):</strong> 각 마이크로서비스를 '도커'라는 격리된 컨테이너 환경으로 패키징하여, 개발 및 배포 환경의 일관성을 유지합니다. '쿠버네티스'를 통해 수많은 컨테이너들을 자동으로 관리, 배포, 확장하며, 장애 발생 시 자동으로 복구하여 시스템의 무중단을 보장합니다.</li>
                    <li><strong>IaC (Infrastructure as Code - Terraform):</strong> 서버, 네트워크, 데이터베이스 등 모든 인프라 구성을 코드로 관리합니다. 이를 통해 인프라를 빠르고 일관되게 구축하고, 변경 이력을 추적하며, 재해 발생 시 신속하게 복구할 수 있습니다.</li>
                    <li><strong>CI/CD & GitOps (GitHub Actions, ArgoCD):</strong> 개발자가 코드를 변경하면, GitHub Actions가 자동으로 테스트, 빌드, 도커 이미지 생성을 수행(CI)하고, ArgoCD가 이 이미지를 쿠버네티스 클러스터에 자동으로 배포(CD)하는 파이프라인입니다. 이를 통해 빠르고 안정적인 업데이트가 가능해집니다.</li>
                    <li><strong>Observability (관측 가능성 - Prometheus, Grafana, ELK):</strong> 시스템의 모든 상태(CPU, 메모리, API 응답 시간 등)를 실시간으로 모니터링(Prometheus)하고, 시각적인 대시보드(Grafana)로 보여주며, 모든 로그(ELK Stack)와 서비스 간 호출 흐름(Jaeger)을 추적하여 장애 발생 시 원인을 신속하게 분석하고 해결할 수 있도록 지원합니다.</li>
                </ul>
            </LayerHelpModal>
            
            <LayerHelpModal 
                isOpen={activeHelpLayer === 'dfd'} 
                onClose={() => setActiveHelpLayer(null)}
                layerTitle="데이터 흐름도 (DFD) 상세 설명"
            >
                <h4 className="font-semibold text-lg mb-2 text-secondary">DFD란?</h4>
                <p className="text-gray-700 mb-4">
                    데이터 흐름도(Data Flow Diagram)는 시스템의 구성 요소(프로세스, 데이터 저장소)와 그 사이의 데이터 이동 및 변환 과정을 시각적으로 표현하는 다이어그램입니다. '데이터가 어디서 와서, 어떻게 변환되고, 어디로 가는가'를 명확하게 보여줍니다.
                </p>
                <h4 className="font-semibold text-lg mb-2 text-secondary">GIDS 데이터 흐름 해석</h4>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                    <li><strong>외부 소스 & 데이터 수집:</strong> 전 세계 웹(외부 소스)에서 '수집된 원본 데이터'가 <code>1.0 데이터 수집</code> 프로세스로 들어옵니다.</li>
                    <li><strong>정제 및 저장:</strong> 수집된 데이터는 <code>2.0 데이터 정제/저장</code> 프로세스에서 가공됩니다. 원본은 <code>Data Lake</code>에 보관되고, 처리된 데이터는 AI 검증을 위해 전달됩니다.</li>
                    <li><strong>AI 검증:</strong> <code>3.0 AI 검증</code> 프로세스는 <code>Vector DB</code>에서 근거 데이터를 참조하여 텍스트를 분석하고, '검증 결과'를 <code>Primary DB</code>에 저장합니다.</li>
                    <li><strong>데이터 제공:</strong> <code>4.0 데이터 제공 API</code>는 사용자의 요청에 따라 <code>Primary DB</code>와 <code>Cache</code>에서 데이터를 조회합니다.</li>
                    <li><strong>사용자 상호작용:</strong> <code>5.0 프론트엔드</code>는 API로부터 받은 '시각화/통계 데이터'를 사용자에게 보여주고, 사용자의 '데이터 요청'을 다시 API로 전달하는 순환 구조를 가집니다.</li>
                </ul>
            </LayerHelpModal>

            <div 
                className={`${modalRootClasses} animate-fadeIn`}
                onClick={modalState !== 'minimized' ? handleInternalClose : undefined}
                aria-modal="true"
                role="dialog"
            >
                <div 
                    className={`bg-gray-100 dark:bg-gray-900 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] rounded-xl shadow-2xl flex flex-col overflow-hidden transition-all duration-300 ${wrapperClasses[modalState]} ${modalState === 'minimized' ? 'pointer-events-auto' : ''}`}
                    onClick={modalState === 'minimized' ? handleRestore : e => e.stopPropagation()}
                >
                    <div className="p-4 border-b border-black/10 bg-white/30 backdrop-blur-md flex justify-between items-center flex-shrink-0">
                        <h2 className={`font-bold text-primary-dark truncate pr-4 ${modalState !== 'minimized' ? 'text-xl' : 'text-base'}`}>
                            GIDS System Architecture
                        </h2>
                        <div className="flex items-center gap-1">
                            {modalState !== 'minimized' ? (
                                <>
                                    <button onClick={handleMinimize} className="p-2 rounded-full text-gray-500 hover:bg-black/10"><MinusIcon className="w-5 h-5"/></button>
                                    <button onClick={handleToggleMaximize} className="p-2 rounded-full text-gray-500 hover:bg-black/10">
                                        {modalState === 'maximized' ? <Square2StackIcon className="w-5 h-5" /> : <WindowIcon className="w-5 h-5" />}
                                    </button>
                                    <button onClick={handleInternalClose} className="p-2 rounded-full text-gray-500 hover:bg-black/10"><XMarkIcon className="w-5 h-5" /></button>
                                </>
                            ) : (
                                <button onClick={handleInternalClose} className="p-1 rounded-full text-gray-500 hover:bg-black/10"><XMarkIcon className="w-4 h-4" /></button>
                            )}
                        </div>
                    </div>

                    {modalState !== 'minimized' && (
                        <div className="p-4 lg:p-6 overflow-auto flex-grow">
                            <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 items-stretch">
                                {/* Layers */}
                                <div className="xl:col-span-2"><ArchCard title="Ingestion Layer" icon={<GlobeIcon className="w-5 h-5" />} onHelpClick={() => setActiveHelpLayer('ingestion')}><div className="space-y-2"><div className="p-2 bg-gray-100 rounded-md text-sm"><strong>Data Sources</strong><p className="text-xs text-gray-600">WHO, CDC, Reuters API, News Feeds, Academic Journals</p></div><div className="p-2 bg-indigo-100 rounded-lg text-center"><p className="font-bold text-indigo-800 text-sm">Crawler Microservices</p><p className="text-xs text-indigo-600 mb-2">Scheduler (Celery Beat)</p><div className="flex justify-center gap-1.5 flex-wrap"><TechIcon icon="🐍" name="Python" small /><TechIcon icon="🕷️" name="Scrapy" small /><TechIcon icon="🤖" name="Selenium" small /></div></div></div></ArchCard></div>
                                <div className="xl:col-span-1 hidden xl:flex items-center justify-center"><svg className="w-12 h-12 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg></div>
                                <div className="xl:col-span-2"><ArchCard title="Data Layer" icon={<DatabaseIcon className="w-5 h-5" />} onHelpClick={() => setActiveHelpLayer('data')}><div className="p-2 bg-gray-100 rounded-lg text-center mb-2"><p className="font-semibold text-gray-800 text-sm">Event Bus / Message Queue</p><div className="flex justify-center gap-2 mt-1"><TechIcon icon="🚦" name="Kafka" small /></div></div><div className="p-2 bg-gray-100 rounded-lg text-center"><p className="font-semibold text-gray-800 text-sm">Stream Processor</p><div className="flex justify-center gap-2 mt-1"><TechIcon icon="🌊" name="Spark Streaming" small /></div></div><div className="grid grid-cols-2 gap-2 mt-2"><div className="p-2 bg-red-50 rounded-lg text-center"><p className="font-bold text-red-800 text-sm">Data Lake</p><p className="text-[10px] mb-1">Raw Archives</p><TechIcon icon="📦" name="S3" small /></div><div className="p-2 bg-green-50 rounded-lg text-center"><p className="font-bold text-green-800 text-sm">Log Storage</p><p className="text-[10px] mb-1">System Logs</p><TechIcon icon="🔍" name="Elasticsearch" small /></div></div><div className="grid grid-cols-3 gap-2 mt-2"><div className="p-2 bg-blue-50 rounded-lg text-center"><p className="font-bold text-blue-800 text-sm">Primary DB</p><p className="text-[10px] mb-1">Verified Data</p><TechIcon icon="🐘" name="PostGIS" small /></div><div className="p-2 bg-purple-50 rounded-lg text-center"><p className="font-bold text-purple-800 text-sm">Vector DB</p><p className="text-[10px] mb-1">Embeddings</p><TechIcon icon="📚" name="ChromaDB" small /></div><div className="p-2 bg-yellow-50 rounded-lg text-center"><p className="font-bold text-yellow-800 text-sm">Cache</p><p className="text-[10px] mb-1">Sessions</p><TechIcon icon="⚡" name="Redis" small /></div></div></ArchCard></div>
                                <div className="xl:col-span-1 hidden xl:flex items-center justify-center"><svg className="w-12 h-12 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg></div>
                                <div className="xl:col-span-3"><ArchCard title="AI Core" icon={<BrainIcon className="w-5 h-5" />} className="border-2 border-accent shadow-accent/20" onHelpClick={() => setActiveHelpLayer('ai')}><div className="p-2 bg-blue-100 rounded-lg text-center"><p className="font-bold text-blue-900 text-sm">AI Verification Microservices</p><p className="text-xs text-blue-600 mb-2">Orchestrator (FastAPI)</p><div className="space-y-2 text-left p-2 bg-white/50 rounded-md text-xs"><strong>1. Classification:</strong> Fact/Fake/Opinion (DeBERTa)<br/><strong>2. RAG Fact-Checking:</strong> Embedding & Retrieval → Synthesis (Gemini 2.5)<br/><strong>3. Ensemble:</strong> Final Decision & Confidence Score</div><div className="flex justify-center gap-1.5 mt-2 flex-wrap"><TechIcon icon="🧠" name="Gemini" small /><TechIcon icon="🔗" name="LangChain" small /><TechIcon icon="🤗" name="Transformers" small /></div></div></ArchCard></div>
                                <div className="xl:col-span-1 hidden xl:flex items-center justify-center"><svg className="w-12 h-12 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg></div>
                                <div className="xl:col-span-2"><ArchCard title="Application Layer" icon={<HomeIcon className="w-5 h-5" />} onHelpClick={() => setActiveHelpLayer('application')}><div className="p-2 bg-teal-100 rounded-lg text-center mb-2"><p className="font-bold text-teal-800 text-sm">Backend API (REST & WebSocket)</p><div className="flex justify-center gap-2 mt-1"><TechIcon icon="🚀" name="FastAPI" small /></div></div><div className="p-2 bg-gray-800 rounded-lg text-center"><p className="font-bold text-white text-sm">GIDS Frontend</p><div className="flex justify-center gap-2 mt-1"><TechIcon icon="⚛️" name="React" small /><TechIcon icon="🗺️" name="Leaflet" small /></div></div><div className="mt-2 space-y-1.5 text-xs bg-gray-100 rounded-md p-2">• User/Admin Dashboards<br/>• GIS Visualization<br/>• Statistical Reports</div></ArchCard></div>
                            </div>

                            {/* Foundation Layer */}
                            <div className="mt-4"><div className="bg-white/80 backdrop-blur-sm p-4 rounded-xl border border-gray-200/80 shadow-lg animate-fadeInUp"><div className="flex items-center justify-center gap-2 mb-4"><h3 className="text-sm font-bold text-center text-primary-dark tracking-wider uppercase flex items-center justify-center gap-2"><ShieldCheckIcon className="w-5 h-5" />Foundation: Infrastructure & DevOps</h3><button onClick={() => setActiveHelpLayer('foundation')} className="text-gray-400 hover:text-primary-light transition-colors"><QuestionMarkCircleIcon className="w-4 h-4" /></button></div><div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4"><FoundationPillar title="Cloud Infrastructure"><TechIcon icon="☁️" name="AWS (EC2, S3, RDS)" small /><TechIcon icon="☁️" name="GCP (GKE, Storage)" small /></FoundationPillar><FoundationPillar title="Containerization"><TechIcon icon="🐳" name="Docker" small /><TechIcon icon="☸️" name="Kubernetes" small /></FoundationPillar><FoundationPillar title="IaC"><TechIcon icon="🏗️" name="Terraform" small /></FoundationPillar><FoundationPillar title="CI/CD & GitOps"><TechIcon icon="🐙" name="GitHub Actions" small /><TechIcon icon="🔄" name="ArgoCD" small /></FoundationPillar><FoundationPillar title="Observability"><TechIcon icon="📈" name="Prometheus" small /><TechIcon icon="📊" name="Grafana" small /><TechIcon icon="🪵" name="ELK Stack" small /><TechIcon icon="🔬" name="Jaeger" small /></FoundationPillar></div></div></div>
                            
                            {/* DFD Section */}
                            <div className="mt-4">
                                <div className="bg-white/80 backdrop-blur-sm p-4 rounded-xl border border-gray-200/80 shadow-lg animate-fadeInUp">
                                    <div className="flex items-center justify-center gap-2 mb-4">
                                        <h3 className="text-sm font-bold text-center text-primary-dark tracking-wider uppercase flex items-center justify-center gap-2">
                                            <ArrowPathIcon className="w-5 h-5" />
                                            데이터 흐름도 (Data Flow Diagram, DFD)
                                        </h3>
                                        <button onClick={() => setActiveHelpLayer('dfd')} className="text-gray-400 hover:text-primary-light transition-colors">
                                            <QuestionMarkCircleIcon className="w-4 h-4" />
                                        </button>
                                    </div>
                                    <div className="relative p-4 bg-slate-50/50 rounded-lg min-h-[550px] grid grid-cols-4 gap-x-12 gap-y-8 items-center">
                                        {/* Row 1 */}
                                        <DFDBox type="entity" title="외부 소스" icon={<GlobeIcon className="w-6 h-6"/>} description="WHO, CDC, News API 등"/>
                                        <DFDBox type="process" title="1.0 데이터 수집" icon={<ServerIcon className="w-6 h-6"/>} tech={<><TechIcon icon="🕷️" name="Crawler" small/></>}/>
                                        <DFDBox type="process" title="2.0 데이터 정제/저장" icon={<DatabaseIcon className="w-6 h-6"/>} tech={<><TechIcon icon="🚦" name="Kafka" small/><TechIcon icon="🌊" name="Spark" small/></>}/>
                                        <DFDBox type="store" title="A. Data Lake" icon={<DatabaseIcon className="w-6 h-6"/>} description="원본 데이터 아카이브" tech={<TechIcon icon="📦" name="S3" small/>}/>

                                        {/* Row 2 */}
                                        <div />
                                        <DFDBox type="process" title="3.0 AI 검증" className="row-span-2" icon={<BrainIcon className="w-6 h-6"/>} tech={<><TechIcon icon="🧠" name="Gemini" small/><TechIcon icon="🔗" name="RAG" small/></>}/>
                                        <DFDBox type="store" title="C. Vector DB" icon={<DatabaseIcon className="w-6 h-6"/>} description="임베딩 벡터 저장"/>
                                        <DFDBox type="store" title="B. Primary DB" icon={<DatabaseIcon className="w-6 h-6"/>} description="검증된 정형 데이터" tech={<TechIcon icon="🐘" name="PostGIS" small/>}/>
                                        
                                        {/* Row 3 */}
                                        <div />
                                        <DFDBox type="store" title="D. Cache" icon={<DatabaseIcon className="w-6 h-6"/>} tech={<TechIcon icon="⚡" name="Redis" small/>}/>
                                        <DFDBox type="process" title="4.0 데이터 제공 API" icon={<ServerIcon className="w-6 h-6"/>} tech={<TechIcon icon="🚀" name="FastAPI" small/>}/>
                                        
                                        {/* Row 4 */}
                                        <div />
                                        <div />
                                        <DFDBox type="process" title="5.0 프론트엔드" icon={<HomeIcon className="w-6 h-6"/>} tech={<TechIcon icon="⚛️" name="React" small/>}/>
                                        <DFDBox type="entity" title="사용자 / 관리자" icon={<UsersIcon className="w-6 h-6"/>} />


                                        {/* Arrows */}
                                        <Arrow label="수집된 원본" className="left-[21%] top-[9%] w-[8%]" path="M 0 50 L 95 50" />
                                        <Arrow label="정제 요청" className="left-[46%] top-[9%] w-[8%]" path="M 0 50 L 95 50" />
                                        <Arrow label="원본 데이터 저장" className="left-[68%] top-[19%] h-[12%]" path="M 50 0 V 95" />
                                        <Arrow label="정제된 텍스트" className="left-[42%] top-[33%] h-[18%]" path="M 50 0 V 95" />
                                        <Arrow label="근거 데이터 검색" className="left-[54%] top-[41.5%] w-[8%]" path="M 0 50 L 95 50" />
                                        <Arrow label="임베딩 벡터 저장" className="left-[54%] top-[45.5%] w-[8%]" path="M 100 50 L 5 50" />
                                        <Arrow label="검증 결과" className="left-[68%] top-[43%] h-[12%]" path="M 50 0 V 95" />
                                        <Arrow label="데이터 조회" className="left-[68%] top-[67%] h-[12%]" path="M 50 95 V 5" />
                                        <Arrow label="캐시 데이터" className="left-[54%] top-[69.5%] w-[8%]" path="M 100 50 L 5 50" />
                                        <Arrow label="API 요청" className="left-[68%] top-[80%] h-[12%]" path="M 50 95 V 5" />
                                        <Arrow label="시각화/통계 데이터" className="left-[68%] top-[84%] h-[12%]" path="M 50 0 V 95" />
                                        <Arrow label="데이터 요청" className="left-[80%] top-[86.5%] w-[8%]" path="M 100 50 L 5 50" />
                                        <Arrow label="시각화된 정보" className="left-[80%] top-[82.5%] w-[8%]" path="M 0 50 L 95 50" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default ArchitectureModal;