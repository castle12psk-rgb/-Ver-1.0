import React, { useState } from 'react';
import MinusIcon from './icons/MinusIcon';
import WindowIcon from './icons/WindowIcon';
import Square2StackIcon from './icons/Square2StackIcon';
import XMarkIcon from './icons/XMarkIcon';
import BoltIcon from './icons/BoltIcon';
import CodeBracketIcon from './icons/CodeBracketIcon';
import GlobeIcon from './icons/GlobeIcon';
import UserShieldIcon from './icons/UserShieldIcon';
import GeminiIcon from './icons/GeminiIcon';
import EyeIcon from './icons/EyeIcon';
import MapIcon from './icons/MapIcon';
import ServerIcon from './icons/ServerIcon';
import DatabaseIcon from './icons/DatabaseIcon';
import BrainIcon from './icons/BrainIcon';
import UsersIcon from './icons/UsersIcon';
import SpiderIcon from './icons/SpiderIcon';
import CalendarDaysIcon from './icons/CalendarDaysIcon';
import ShareNodesIcon from './icons/ShareNodesIcon';
import PipelineIcon from './icons/PipelineIcon';
import FilterIcon from './icons/FilterIcon';
import LinkIcon from './icons/LinkIcon';

interface TechPlanModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PlanSection: React.FC<{ icon: React.ReactNode; title: string; children: React.ReactNode }> = ({ icon, title, children }) => (
    <div className="mb-12">
        <h3 className="text-2xl font-bold text-primary-dark border-b-2 border-blue-300 pb-3 mb-6 flex items-center gap-3">
            {icon}
            {title}
        </h3>
        <div className="space-y-6">
            {children}
        </div>
    </div>
);

const SubSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div>
        <h4 className="text-lg font-semibold text-secondary mb-3">{title}</h4>
        <div className="prose prose-blue max-w-none text-gray-700 leading-relaxed pl-4 border-l-4 border-gray-200">
            {children}
        </div>
    </div>
);

const TechBox: React.FC<{ title: string; icon: string; items: string[] }> = ({ title, icon, items }) => (
    <div className="bg-white p-4 rounded-lg shadow border border-gray-200 h-full">
        <p className="font-bold text-center text-sm mb-2">{icon} {title}</p>
        <div className="flex flex-wrap justify-center gap-2">
            {items.map(item => <span key={item} className="bg-gray-200 text-gray-800 text-xs font-mono px-2 py-0.5 rounded-full">{item}</span>)}
        </div>
    </div>
);

const processSteps = [
    {
        step: "①",
        title: "데이터 소스 확보",
        icon: <GlobeIcon className="w-6 h-6" />,
        example: "WHO Disease Outbreak News (DONs), CDC 코로나19 대시보드, 일본 후생성 보도자료, New York Times 감염병 기사 RSS",
        tech: "API 호출, RSS 피드, HTML 페이지",
        features: "다원적 소스로부터 감염병 관련 데이터 접근 (정적·동적·API 혼합)",
    },
    {
        step: "②",
        title: "수집 스케줄링",
        icon: <CalendarDaysIcon className="w-6 h-6" />,
        example: "매일 오전 9시 WHO 사이트 확인, 10분마다 주요 뉴스 RSS 확인",
        tech: "Celery Beat (스케줄러)",
        features: "소스별 크롤링 주기 자동화, 병렬 워크로드 등록",
    },
    {
        step: "③",
        title: "데이터 크롤링",
        icon: <SpiderIcon className="w-6 h-6" />,
        example: "WHO 사이트 HTML → 에볼라 발병 공지 수집, CDC 대시보드 → Selenium으로 자바스크립트 렌더링 후 데이터 추출",
        tech: "Scrapy, Selenium, BeautifulSoup",
        features: "정적 HTML, 동적 JS 렌더링 페이지 크롤링, 본문·표·이미지 데이터 추출",
    },
    {
        step: "④",
        title: "분산 처리",
        icon: <ShareNodesIcon className="w-6 h-6" />,
        example: "아시아 50개 보건부 사이트 동시 수집",
        tech: "Celery Workers + Redis",
        features: "수천 개 요청을 병렬 분산 처리, 재시도·오류 처리 관리",
    },
    {
        step: "⑤",
        title: "메시지 큐 적재",
        icon: <PipelineIcon className="w-6 h-6" />,
        example: "“에볼라 발병(콩고)” 이벤트를 JSON으로 변환 후 Kafka 토픽 게시",
        tech: "Apache Kafka",
        features: "실시간 데이터 스트리밍, 순서 보장, 장애 시 재처리 가능",
    },
    {
        step: "⑥",
        title: "데이터 전처리 및 품질관리",
        icon: <FilterIcon className="w-6 h-6" />,
        example: "중복된 “에볼라 발병” 뉴스 기사 제거, 수집시간 표준화(UTC), 언어 감지 후 영어/한국어 병기",
        tech: "Python 전처리 파이프라인, NLP 언어감지 라이브러리",
        features: "중복 제거, 시간/위치 표준화, 언어 식별, 품질지수(DQ) 관리",
    },
    {
        step: "⑦",
        title: "데이터 저장 및 전달",
        icon: <DatabaseIcon className="w-6 h-6" />,
        example: "원본 데이터: AWS S3 저장 / 정제 데이터: PostgreSQL 이벤트 테이블 저장",
        tech: "AWS S3(Data Lake), RDB(PostgreSQL)",
        features: "원본 장기 보관(Data Lake), 정제 데이터는 AI 검증·GIS 시각화 단계로 전달",
    },
    {
        step: "⑧",
        title: "후속 처리 연계",
        icon: <LinkIcon className="w-6 h-6" />,
        example: "Kafka → AI 검증 모듈로 스트리밍 / PostgreSQL → GIS 서비스와 연동",
        tech: "Kafka Connect, API Gateway (OSE-API Generator)",
        features: "AI 모델 검증, 지도 시각화 및 통계 서비스와 연동, 24시간 이내 반영 목표 달성",
    }
];

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
        setModalState('maximized'); 
        onClose();
    }

    const handleRestore = () => {
        setModalState(preMinimizeState);
    };
    
    const wrapperClasses = {
        normal: "w-full max-w-6xl h-[90vh]",
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
                        {modalState !== 'minimized' ? '기술개발 세부 추진계획' : '기술개발 로드맵'}
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
                            <PlanSection icon={<CodeBracketIcon className="w-7 h-7"/>} title="API 게이트웨이 구축 (OSE-API Generator 도입)">
                                <SubSection title="개요">
                                    <p>모든 클라이언트의 요청이 시스템 내부로 들어오는 단일 진입점(Single Entry Point) 역할을 수행합니다. 마이크로서비스 아키텍처의 복잡성을 외부로부터 숨기고, 인증, 라우팅, 보안, 로깅 등 공통 기능을 중앙에서 처리하여 시스템 전체의 안정성과 개발 효율성을 향상시킵니다.</p>
                                </SubSection>
                                <SubSection title="프로세스 구성도">
                                    <div className="p-6 bg-slate-800 text-white rounded-xl border border-slate-700 font-sans shadow-lg">
                                        <div className="grid grid-cols-12 gap-4 items-center">
                                            <div className="col-span-3 space-y-3"><div className="p-3 bg-indigo-500/20 border border-indigo-400 rounded-lg text-center"><p className="font-bold">GIDS Web/App</p></div><div className="p-3 bg-teal-500/20 border border-teal-400 rounded-lg text-center"><p className="font-bold">외부 연동 시스템</p></div></div>
                                            <div className="col-span-1 text-center text-slate-400 font-mono text-xs">HTTPS</div>
                                            <div className="col-span-4 p-4 bg-sky-600/30 border-2 border-sky-400 rounded-2xl text-center shadow-lg shadow-sky-500/20"><h4 className="text-lg font-bold">OSE-API Generator</h4><p className="text-xs text-sky-300 mb-3">(API Gateway)</p><div className="grid grid-cols-2 gap-2 text-xs"><div className="bg-sky-900/50 p-1.5 rounded">🔑 통합 인증</div><div className="bg-sky-900/50 p-1.5 rounded">🔀 동적 라우팅</div><div className="bg-sky-900/50 p-1.5 rounded">🛡️ 보안/Rate Limit</div><div className="bg-sky-900/50 p-1.5 rounded">📜 중앙 로깅</div></div></div>
                                            <div className="col-span-1 text-center text-slate-400 font-mono text-xs">gRPC</div>
                                            <div className="col-span-3 p-4 bg-slate-700/50 border border-slate-600 rounded-lg"><p className="text-center font-bold mb-2">Backend Microservices</p><div className="space-y-2"><div className="p-2 bg-purple-500/20 text-xs rounded-md">GIS 서비스</div><div className="p-2 bg-green-500/20 text-xs rounded-md">통계 서비스</div><div className="p-2 bg-yellow-500/20 text-xs rounded-md">AI 검증 서비스</div></div></div>
                                        </div>
                                    </div>
                                </SubSection>
                                <SubSection title="S/W 및 핵심 기술">
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <TechBox title="Gateway" icon="GATEWAY" items={["OSE-API Generator", "Spring Cloud Gateway"]} />
                                        <TechBox title="인증/인가" icon="AUTH" items={["JWT", "OAuth 2.0"]} />
                                        <TechBox title="인프라" icon="INFRA" items={["Kubernetes", "Docker", "Istio"]} />
                                    </div>
                                </SubSection>
                            </PlanSection>

                             <PlanSection icon={<GlobeIcon className="w-7 h-7"/>} title="웹크롤링 모듈 구축">
                                <SubSection title="개요">
                                    <p>전 세계 300개 이상의 WHO, CDC, 주요 언론사 등 지정된 데이터 소스로부터 감염병 관련 정보를 24/7 자동으로 수집하는 분산 크롤링 시스템입니다. 정적/동적 페이지, API 등 다양한 형태의 데이터를 수집하고, 수집된 정보는 메시지 큐(Kafka)를 통해 다음 단계로 전달됩니다.</p>
                                </SubSection>
                                <SubSection title="프로세스 구성도">
                                     <div className="p-6 bg-gray-100 rounded-xl border border-gray-300 font-sans shadow-lg grid grid-cols-11 gap-2 items-center text-center">
                                        <div className="col-span-2 space-y-2"><div className="p-2 border bg-white rounded">🌐 WHO/CDC</div><div className="p-2 border bg-white rounded">📰 News API</div><div className="p-2 border bg-white rounded">📄 RSS Feeds</div></div>
                                        <div className="col-span-1">→</div>
                                        <div className="col-span-2 p-3 bg-red-100 border border-red-300 rounded-lg"><strong>Scheduler</strong><p className="text-xs">(Celery Beat)</p></div>
                                        <div className="col-span-1">→</div>
                                        <div className="col-span-2 p-3 bg-yellow-100 border border-yellow-300 rounded-lg"><strong>Crawler Workers</strong><p className="text-xs">(Scrapy/Selenium)</p></div>
                                        <div className="col-span-1">→</div>
                                        <div className="col-span-2 p-3 bg-blue-100 border border-blue-300 rounded-lg"><strong>Message Queue</strong><p className="text-xs">(Kafka)</p></div>
                                    </div>
                                </SubSection>
                                <SubSection title="웹크롤링 모듈 구축 프로세스 (실제 운영 예시 포함)">
                                    <div className="relative p-4">
                                        <div className="absolute left-8 top-4 h-full w-0.5 bg-blue-200" aria-hidden="true"></div>
                                        {processSteps.map((step, index) => (
                                            <div key={index} className="relative pl-16 pb-8">
                                                <div className="absolute left-0 top-0">
                                                    <div className="w-16 h-16 rounded-full bg-primary-dark border-4 border-gray-50 text-white flex flex-col items-center justify-center shadow-lg">
                                                        <span className="font-bold text-lg">{step.step}</span>
                                                    </div>
                                                </div>
                                                <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200 ml-4">
                                                    <h5 className="font-bold text-lg text-primary-dark mb-3 flex items-center gap-2">{step.icon} {step.title}</h5>
                                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-3 text-sm">
                                                        <div className="bg-gray-100 p-3 rounded-md">
                                                            <p className="font-semibold text-gray-600 mb-1">예시 데이터 소스</p>
                                                            <p className="text-xs text-gray-800">{step.example}</p>
                                                        </div>
                                                        <div className="bg-gray-100 p-3 rounded-md">
                                                            <p className="font-semibold text-gray-600 mb-1">적용 S/W 및 기술</p>
                                                            <p className="text-xs text-gray-800 font-mono">{step.tech}</p>
                                                        </div>
                                                        <div className="bg-gray-100 p-3 rounded-md">
                                                            <p className="font-semibold text-gray-600 mb-1">주요 기능</p>
                                                            <p className="text-xs text-gray-800">{step.features}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </SubSection>
                                <SubSection title="S/W 및 핵심 기술">
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <TechBox title="Crawling" icon="CRAWL" items={["Python", "Scrapy", "Selenium", "BeautifulSoup"]} />
                                        <TechBox title="분산 처리" icon="DIST" items={["Celery", "Redis"]} />
                                        <TechBox title="데이터 파이프라인" icon="PIPE" items={["Kafka", "AWS S3 (Data Lake)"]} />
                                    </div>
                                </SubSection>
                            </PlanSection>

                             <PlanSection icon={<UserShieldIcon className="w-7 h-7"/>} title="개인정보 비식별화 모듈 구축">
                                <SubSection title="개요">
                                    <p>수집된 원본 텍스트에서 개인정보보호법(PIPA) 등 규제 준수를 위해 이름, 연락처, 주민번호 등 개인식별정보(PII)를 자동으로 탐지하고 안전하게 비식별 조치(마스킹, 익명화)하는 모듈입니다. AI 기반의 NER(개체명 인식) 기술을 활용하여 높은 정확도를 보장합니다.</p>
                                </SubSection>
                                <SubSection title="프로세스 구성도">
                                    <div className="p-6 bg-gray-100 rounded-xl border border-gray-300 font-sans shadow-lg grid grid-cols-11 gap-2 items-center text-center">
                                        <div className="col-span-3 p-3 bg-blue-100 border border-blue-300 rounded-lg"><strong>Kafka Topic</strong><p className="text-xs">raw_documents</p></div>
                                        <div className="col-span-1">→</div>
                                        <div className="col-span-3 p-3 bg-green-100 border border-green-300 rounded-lg"><strong>비식별화 서비스</strong><p className="text-xs">NER 모델 기반 PII 탐지/마스킹</p></div>
                                        <div className="col-span-1">→</div>
                                        <div className="col-span-3 p-3 bg-blue-100 border border-blue-300 rounded-lg"><strong>Kafka Topic</strong><p className="text-xs">anonymized_documents</p></div>
                                    </div>
                                </SubSection>
                                <SubSection title="S/W 및 AI 모델">
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <TechBox title="Backend" icon="BACKEND" items={["Python", "FastAPI"]} />
                                        <TechBox title="자연어 처리" icon="NLP" items={["spaCy", "KoNLPy", "Scikit-learn"]} />
                                        <TechBox title="AI 모델" icon="AI" items={["Pre-trained NER", "Fine-tuned BERT"]} />
                                    </div>
                                </SubSection>
                            </PlanSection>

                            <PlanSection icon={<GeminiIcon className="w-7 h-7"/>} title="감염병 검증 LLM 구축">
                                <SubSection title="개요">
                                    <p>비식별화 처리된 텍스트의 사실 여부를 판별하는 GIDS의 핵심 두뇌입니다. 최신 LLM인 Google Gemini 2.5를 기반으로, RAG(검색 증강 생성) 기술을 활용하여 시스템 내부의 신뢰도 높은 지식 베이스와 교차 검증을 수행함으로써 환각(Hallucination)을 최소화하고 높은 정확도의 검증 결과를 도출합니다.</p>
                                </SubSection>
                                <SubSection title="RAG 기반 검증 아키텍처">
                                    <div className="p-6 bg-gray-800 text-white rounded-xl border border-gray-700 font-sans shadow-lg text-center">
                                        <p className="mb-4"><strong>[Anonymized Text]</strong></p>
                                        <p>↓ <span className="text-xs bg-gray-600 p-1 rounded">Embedding (Sentence-BERT)</span></p>
                                        <div className="grid grid-cols-2 gap-4 my-4">
                                            <div className="p-3 bg-purple-500/20 border border-purple-400 rounded-lg"><strong>Vector DB</strong><p className="text-xs">유사도 기반 근거 문서 검색</p></div>
                                            <p className="flex items-center justify-center">→ <span className="text-xs bg-gray-600 p-1 rounded mx-2">Retrieved Context</span> →</p>
                                        </div>
                                        <div className="p-4 bg-blue-500/30 border border-blue-400 rounded-lg">
                                            <p><strong>LLM (Gemini 2.5)</strong></p>
                                            <p className="text-xs">Context + Original Text를 함께 입력하여<br/>증강 생성 (Fact-Checking & Summarization)</p>
                                        </div>
                                        <p className="mt-4">↓ <span className="text-xs bg-gray-600 p-1 rounded">Verified Data (Fact/Fake/Opinion + Confidence)</span></p>
                                        <p className="mt-4"><strong>[Primary DB (PostgreSQL)]</strong></p>
                                    </div>
                                </SubSection>
                                <SubSection title="S/W 및 AI 모델">
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <TechBox title="LLM" icon="LLM" items={["Google Gemini 2.5", "@google/genai"]} />
                                        <TechBox title="AI 프레임워크" icon="AI" items={["LangChain", "PyTorch", "Hugging Face"]} />
                                        <TechBox title="Vector DB" icon="DB" items={["ChromaDB", "Pinecone"]} />
                                    </div>
                                </SubSection>
                            </PlanSection>
                            
                            <PlanSection icon={<EyeIcon className="w-7 h-7"/>} title="LLM UI 모듈 구축">
                                <SubSection title="개요">
                                    <p>AI가 판별하기 어려운 모호한 정보에 대해 전문가(사용자)가 개입하여 최종 판정을 내리는 'Human-in-the-loop' 인터페이스입니다. 원본 텍스트, AI의 1차 분석 결과, RAG가 찾은 근거 자료를 한 화면에 제공하여 사용자의 빠르고 정확한 의사결정을 지원합니다.</p>
                                </SubSection>
                                <SubSection title="UI 데이터 흐름도">
                                     <div className="p-6 bg-gray-100 rounded-xl border border-gray-300 font-sans shadow-lg grid grid-cols-11 gap-2 items-center text-center">
                                        <div className="col-span-2 p-3 bg-yellow-100 border rounded-lg"><strong>DB</strong><p className="text-xs">Low-Confidence Items</p></div>
                                        <div className="col-span-1">→</div>
                                        <div className="col-span-2 p-3 bg-blue-100 border rounded-lg"><strong>Backend API</strong><p className="text-xs">/api/review-queue</p></div>
                                        <div className="col-span-1">→</div>
                                        <div className="col-span-2 p-3 bg-green-100 border rounded-lg"><strong>Frontend UI</strong><p className="text-xs">수동 검증 모달</p></div>
                                        <div className="col-span-1">↔</div>
                                        <div className="col-span-2 p-3 bg-purple-100 border rounded-lg"><UsersIcon className="w-6 h-6 mx-auto"/><p className="text-xs">Human Reviewer</p></div>
                                    </div>
                                </SubSection>
                                <SubSection title="S/W 및 핵심 기술">
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <TechBox title="Frontend" icon="FE" items={["React", "TypeScript"]} />
                                        <TechBox title="Styling" icon="CSS" items={["Tailwind CSS"]} />
                                        <TechBox title="상태 관리" icon="STATE" items={["React Query", "Zustand"]} />
                                    </div>
                                </SubSection>
                            </PlanSection>

                            <PlanSection icon={<MapIcon className="w-7 h-7"/>} title="감염병 지도 시각화 모듈 구축">
                                <SubSection title="개요">
                                    <p>AI가 최종 검증을 완료한 데이터 중 위치 정보가 포함된 건들을 인터랙티브 지도 위에 시각화하는 모듈입니다. 발생 지역, 위험 등급, 확산 경로 등을 직관적으로 파악할 수 있도록 다양한 시각화 기법(마커 클러스터링, 히트맵 등)을 제공합니다.</p>
                                </SubSection>
                                <SubSection title="데이터 시각화 아키텍처">
                                      <div className="p-6 bg-gray-100 rounded-xl border border-gray-300 font-sans shadow-lg grid grid-cols-11 gap-2 items-center text-center">
                                        <div className="col-span-2 p-3 bg-purple-100 border rounded-lg"><UsersIcon className="w-6 h-6 mx-auto"/><p className="text-xs">User</p></div>
                                        <div className="col-span-1">↔</div>
                                        <div className="col-span-2 p-3 bg-green-100 border rounded-lg"><strong>Frontend</strong><p className="text-xs">(React + Leaflet)</p></div>
                                        <div className="col-span-1">↔</div>
                                        <div className="col-span-2 p-3 bg-blue-100 border rounded-lg"><strong>Backend API</strong><p className="text-xs">(FastAPI)</p></div>
                                        <div className="col-span-1">↔</div>
                                        <div className="col-span-2 p-3 bg-yellow-100 border rounded-lg"><strong>Database</strong><p className="text-xs">(PostgreSQL + PostGIS)</p></div>
                                    </div>
                                </SubSection>
                                <SubSection title="S/W 및 핵심 기술">
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <TechBox title="GIS DB" icon="DB" items={["PostgreSQL + PostGIS"]} />
                                        <TechBox title="지도 라이브러리" icon="MAP" items={["Leaflet.js", "Mapbox"]} />
                                        <TechBox title="데이터 형식" icon="DATA" items={["GeoJSON", "Vector Tiles"]} />
                                    </div>
                                </SubSection>
                            </PlanSection>
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