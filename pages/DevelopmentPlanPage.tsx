import React, { useState } from 'react';
import Card from '../components/Card';
import DocumentTextIcon from '../components/icons/DocumentTextIcon';
import ArchitectureIcon from '../components/icons/ArchitectureIcon';
import BrainIcon from '../components/icons/BrainIcon';
import GeminiIcon from '../components/icons/GeminiIcon';
import KTIcon from '../components/icons/KTIcon';
import CheckCircleIcon from '../components/icons/CheckCircleIcon';
import QuestionMarkCircleIcon from '../components/icons/QuestionMarkCircleIcon';
import TechPlanModal from '../components/TechPlanModal';
import BoltIcon from '../components/icons/BoltIcon';
import LangchainIcon from '../components/icons/LangchainIcon';
import ChromaDbIcon from '../components/icons/ChromaDbIcon';
import KafkaIcon from '../components/icons/KafkaIcon';
import FastApiIcon from '../components/icons/FastApiIcon';
import PostGisIcon from '../components/icons/PostGisIcon';
import GlobeIcon from '../components/icons/GlobeIcon';
import UserShieldIcon from '../components/icons/UserShieldIcon';
import ArrowPathIcon from '../components/icons/ArrowPathIcon';
import DatabaseIcon from '../components/icons/DatabaseIcon';
import TechSelectionHelpModal from '../components/TechSelectionHelpModal';
import UIModuleHelpModal from '../components/UIModuleHelpModal';
import VisualizationModuleHelpModal from '../components/VisualizationModuleHelpModal';

const SectionCard: React.FC<{ title: string; icon: React.ReactNode; children: React.ReactNode, onHelpClick?: () => void }> = ({ title, icon, children, onHelpClick }) => (
    <Card className="mb-8">
        <div className="flex justify-between items-center mb-4 pb-3 border-b-2 border-blue-200">
            <h2 className="text-2xl font-bold text-primary-dark flex items-center gap-3">
                {icon}
                {title}
            </h2>
            {onHelpClick && (
                 <button onClick={onHelpClick} className="text-gray-400 hover:text-primary-light transition-colors" aria-label="도움말 보기">
                    <QuestionMarkCircleIcon className="h-7 w-7" />
                </button>
            )}
        </div>
        <div className="prose prose-lg max-w-none text-gray-800 leading-relaxed">
            {children}
        </div>
    </Card>
);

const TechStackPill: React.FC<{ name: string, icon: React.ReactNode, category: 'AI/ML' | 'Backend' | 'Frontend' | 'Database' | 'Infra' }> = ({ name, icon, category }) => {
    const categoryStyles = {
        'AI/ML': 'bg-purple-100 text-purple-800',
        'Backend': 'bg-blue-100 text-blue-800',
        'Frontend': 'bg-teal-100 text-teal-800',
        'Database': 'bg-green-100 text-green-800',
        'Infra': 'bg-gray-200 text-gray-800'
    };
    return (
        <div className={`flex items-center gap-2 p-2 rounded-lg shadow-sm ${categoryStyles[category]}`}>
            <div className="w-6 h-6">{icon}</div>
            <span className="font-semibold text-sm">{name}</span>
        </div>
    );
};


const DevelopmentPlanPage: React.FC = () => {
    const [isTechPlanModalOpen, setIsTechPlanModalOpen] = useState(false);
    const [isTechSelectionHelpModalOpen, setIsTechSelectionHelpModalOpen] = useState(false);
    const [isUIModuleHelpModalOpen, setIsUIModuleHelpModalOpen] = useState(false);
    const [isVisualizationModuleHelpModalOpen, setIsVisualizationModuleHelpModalOpen] = useState(false);


  return (
    <>
    <TechPlanModal isOpen={isTechPlanModalOpen} onClose={() => setIsTechPlanModalOpen(false)} />
    <TechSelectionHelpModal isOpen={isTechSelectionHelpModalOpen} onClose={() => setIsTechSelectionHelpModalOpen(false)} />
    <UIModuleHelpModal isOpen={isUIModuleHelpModalOpen} onClose={() => setIsUIModuleHelpModalOpen(false)} />
    <VisualizationModuleHelpModal isOpen={isVisualizationModuleHelpModalOpen} onClose={() => setIsVisualizationModuleHelpModalOpen(false)} />


    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold text-secondary flex items-center gap-3"><DocumentTextIcon className="w-10 h-10 text-primary-light"/> GIDS 기술개발 세부 추진계획</h1>
        <button
            onClick={() => setIsTechPlanModalOpen(true)}
            className="inline-flex items-center gap-3 px-6 py-3 bg-primary-dark text-white font-bold text-base rounded-lg shadow-lg hover:bg-primary-light transform hover:-translate-y-1 transition-all duration-300"
        >
            <BoltIcon className="w-6 h-6"/>
            전체 로드맵 보기
        </button>
      </div>
      
      {/* Section 1: Infectious Disease Verification LLM Construction */}
      <SectionCard title="감염병 검증 LLM 구축" icon={<BrainIcon className="w-7 h-7" />} onHelpClick={() => setIsTechSelectionHelpModalOpen(true)}>
        <h4>1.1. 개요</h4>
        <p>
            단일 LLM의 한계를 넘어, 각기 다른 강점을 가진 두 개의 최첨단 LLM을 결합한 <strong>'하이브리드 LLM 코어'</strong>를 구축합니다. 이는 GIDS가 전 세계 정보를 대상으로 하는 '탐지 능력'과 정부 기관으로서 요구되는 '데이터 보안'이라는 두 마리 토끼를 모두 잡기 위한 핵심 전략입니다. "최고의 창(Gemini)과 최고의 방패(Mi:dm)를 모두 갖춘다"는 개념으로, 데이터의 종류와 보안 등급에 따라 최적의 LLM을 자동으로 선택하여 처리 효율성과 신뢰성을 극대화합니다.
        </p>

        <h4>1.2. 하이브리드 LLM 아키텍처</h4>
        <div className="my-6 p-6 bg-gray-100 rounded-2xl shadow-inner relative">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                {/* Input Data */}
                <div className="text-center p-4 bg-white rounded-lg shadow">
                    <h5 className="font-bold text-secondary">입력 데이터</h5>
                    <p className="text-xs mt-1">실시간 수집된 감염병 정보 (다국어 텍스트)</p>
                    <div className="mt-2 text-left space-y-1">
                        <div className="p-1 bg-blue-50 border border-blue-200 rounded text-xs truncate">{"{source: 'Reuters', lang: 'en', ...}"}</div>
                        <div className="p-1 bg-green-50 border border-green-200 rounded text-xs truncate">{"{source: 'KDCA_internal', lang: 'ko', ...}"}</div>
                    </div>
                </div>

                {/* Intelligent Data Router */}
                <div className="text-center p-4 bg-white rounded-lg shadow border-2 border-accent">
                    <h5 className="font-bold text-accent">지능형 데이터 라우터</h5>
                    <p className="text-xs mt-1">데이터 출처, 언어, 민감도 분석 후 최적 LLM으로 자동 분배</p>
                    <ArrowPathIcon className="w-8 h-8 mx-auto mt-2 text-accent animate-spin" style={{ animationDuration: '3s' }}/>
                </div>
                
                {/* Unified Output */}
                <div className="text-center p-4 bg-white rounded-lg shadow">
                    <h5 className="font-bold text-secondary">통합 검증 결과</h5>
                    <p className="text-xs mt-1">구조화된 검증 결과 데이터 (JSON)</p>
                     <div className="mt-2 p-2 bg-purple-50 border border-purple-200 rounded text-xs text-left font-mono">
                        <p>{"{"}</p>
                        <p className="pl-2">"verdict": "Fact",</p>
                        <p className="pl-2">"confidence": 99.2,</p>
                        <p className="pl-2">"evidence_source": "WHO"</p>
                        <p>{"}"}</p>
                    </div>
                </div>
            </div>

            {/* LLM Engines */}
            <div className="grid grid-cols-2 gap-6 mt-6">
                <div className="p-4 bg-blue-50 border-2 border-blue-300 rounded-xl">
                    <h6 className="font-bold text-blue-800 text-center flex items-center justify-center gap-2"><GlobeIcon className="w-5 h-5" />글로벌 감시 엔진 (Outward-facing)</h6>
                    <div className="flex justify-center my-2"><GeminiIcon className="w-12 h-12" /></div>
                    <ul className="text-xs list-disc list-inside space-y-1">
                        <li><strong>역할:</strong> 해외 뉴스, WHO/CDC 발표 등 공개 정보 검증</li>
                        <li><strong>강점:</strong> 압도적인 다국어 처리 능력, Google Search 연동을 통한 실시간 팩트체크</li>
                    </ul>
                </div>
                 <div className="p-4 bg-green-50 border-2 border-green-300 rounded-xl">
                    <h6 className="font-bold text-green-800 text-center flex items-center justify-center gap-2"><UserShieldIcon className="w-5 h-5" />보안 분석 엔진 (Inward-facing)</h6>
                    <div className="flex justify-center my-2"><KTIcon className="w-12 h-12" /></div>
                     <ul className="text-xs list-disc list-inside space-y-1">
                        <li><strong>역할:</strong> 질병청 내부 문서, 국내 민감 데이터 분석</li>
                        <li><strong>강점:</strong> On-premise(구축형) 배포 지원, 데이터 주권 확보 및 최고 수준의 보안</li>
                    </ul>
                </div>
            </div>
            
             {/* Arrows */}
             <div className="absolute top-1/4 left-1/4 w-1/12 h-1/4 pointer-events-none">
                <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none"><path d="M100 50 C 50 50, 50 100, 0 100" stroke="#9ca3af" stroke-width="2" fill="none" stroke-dasharray="4"></path></svg>
            </div>
             <div className="absolute top-1/4 right-1/4 w-1/12 h-1/4 pointer-events-none">
                 <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none"><path d="M0 50 C 50 50, 50 100, 100 100" stroke="#9ca3af" stroke-width="2" fill="none" stroke-dasharray="4"></path></svg>
            </div>
        </div>

        <h4>1.3. 적용 기술 스택</h4>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 not-prose mt-4">
            <TechStackPill name="Gemini 2.5" icon={<GeminiIcon/>} category="AI/ML" />
            <TechStackPill name="KT Mi:dm 2.0" icon={<KTIcon/>} category="AI/ML" />
            <TechStackPill name="LangChain" icon={<LangchainIcon/>} category="AI/ML" />
            <TechStackPill name="ChromaDB" icon={<ChromaDbIcon/>} category="Database" />
            <TechStackPill name="FastAPI" icon={<FastApiIcon/>} category="Backend" />
            <TechStackPill name="Kafka" icon={<KafkaIcon/>} category="Infra" />
        </div>
      </SectionCard>

      {/* Section 2: LLM UI Module Construction */}
      <SectionCard title="LLM UI 모듈 구축" icon={<ArchitectureIcon className="w-7 h-7" />} onHelpClick={() => setIsUIModuleHelpModalOpen(true)}>
        <h4>2.1. 개요</h4>
        <p>
           단순한 정보 조회를 넘어, AI의 판단 과정을 투명하게 공개하고 전문가의 개입을 통해 시스템의 신뢰도를 지속적으로 향상시키는 <strong>'AI-Human 협업 인터페이스'</strong>를 구축합니다. 전문 검토자는 이 '검증 워크벤치'를 통해 AI가 어떤 근거로 판단을 내렸는지 확인하고, 최종 결정을 내리며, 이 피드백은 다시 AI 모델을 교육시키는 선순환 구조(Human-in-the-Loop)를 만듭니다.
        </p>
        
        <h4>2.2. Human-in-the-Loop (HITL) 프로세스</h4>
        <div className="my-6 p-6 bg-gray-100 rounded-2xl shadow-inner flex flex-col items-center">
            <div className="w-full p-4 bg-white rounded-lg shadow-md border">
                <h5 className="font-bold text-center text-secondary mb-2">전문가용 검증 워크벤치 UI</h5>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-2 border rounded bg-gray-50">
                        <h6 className="font-semibold text-sm">1. 원본 텍스트</h6>
                        <p className="text-xs bg-white p-1 mt-1 rounded border">"나이지리아에서 콜레라 확산..."</p>
                    </div>
                     <div className="p-2 border rounded bg-gray-50">
                        <h6 className="font-semibold text-sm">2. AI 분석 결과</h6>
                        <p className="text-xs bg-white p-1 mt-1 rounded border"><strong>판정:</strong> 사실 (99.2%)<br/><strong>근거:</strong> WHO DONs #291 문서</p>
                    </div>
                     <div className="p-2 border rounded bg-gray-50">
                        <h6 className="font-semibold text-sm">3. 전문가 최종 판정</h6>
                        <div className="flex gap-1 mt-1">
                            <button className="text-xs flex-1 bg-green-200 text-green-800 rounded p-1">사실</button>
                            <button className="text-xs flex-1 bg-red-100 text-red-800 rounded p-1">허위</button>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="my-4 text-2xl animate-pulse">⬇️</div>

            <div className="w-full p-4 bg-purple-50 rounded-lg shadow-md border border-purple-300">
                <h5 className="font-bold text-center text-purple-800">피드백 데이터 저장 및 모델 재학습</h5>
                <p className="text-xs text-center mt-1">전문가의 판정 데이터를 '정답'으로 간주하여 별도 데이터셋으로 구축.<br/>이 데이터셋을 이용하여 주기적으로 LLM을 미세조정(Fine-tuning)하여 성능을 지속적으로 향상.</p>
            </div>
        </div>

        <h4>2.3. 적용 기술 스택</h4>
         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 not-prose mt-4">
            <TechStackPill name="React" icon={<div className="text-2xl">⚛️</div>} category="Frontend" />
            <TechStackPill name="TypeScript" icon={<div className="font-bold text-lg">TS</div>} category="Frontend" />
            <TechStackPill name="React Query" icon={<div className="text-2xl">🔄</div>} category="Frontend" />
            <TechStackPill name="FastAPI" icon={<FastApiIcon/>} category="Backend" />
        </div>
      </SectionCard>

      {/* Section 3: Infectious Disease Map Visualization Module Construction */}
       <SectionCard title="감염병 지도 시각화 모듈 구축" icon={<GlobeIcon className="w-7 h-7" />} onHelpClick={() => setIsVisualizationModuleHelpModalOpen(true)}>
        <h4>3.1. 개요</h4>
        <p>
            AI가 검증한 데이터를 단순 텍스트가 아닌, 사용자가 한눈에 상황을 파악할 수 있는 <strong>'지리 공간적 인텔리전스(Geospatial Intelligence)'</strong>로 변환합니다. 수만 건의 발생 정보를 빠르고 부드럽게 인터랙티브 지도 위에 시각화하고, 다양한 필터와 분석 도구를 제공하여 데이터 기반의 신속한 의사결정을 지원하는 고성능 GIS 플랫폼을 구축합니다.
        </p>

        <h4>3.2. 데이터 시각화 아키텍처 및 파이프라인</h4>
        <div className="my-6 p-6 bg-gray-100 rounded-2xl shadow-inner">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center">
                {/* 1. DB */}
                <div className="flex-1 p-3 bg-white rounded-lg shadow border">
                     <DatabaseIcon className="w-8 h-8 text-green-600 mx-auto mb-1" />
                    <h6 className="font-bold text-sm">1. 데이터 저장소</h6>
                    <p className="text-xs">위경도 좌표가 포함된 검증 완료 데이터</p>
                    <div className="mt-1"><TechStackPill name="PostgreSQL + PostGIS" icon={<PostGisIcon/>} category="Database" /></div>
                </div>
                
                 <div className="text-2xl text-gray-400 font-mono">&gt;&gt;</div>
                
                {/* 2. Backend */}
                <div className="flex-1 p-3 bg-white rounded-lg shadow border">
                     <div className="text-2xl text-blue-600 mx-auto mb-1">🚀</div>
                    <h6 className="font-bold text-sm">2. 백엔드 API</h6>
                    <p className="text-xs">PostGIS 공간 쿼리 실행 후 GeoJSON으로 데이터 변환</p>
                    <div className="mt-1"><TechStackPill name="FastAPI" icon={<FastApiIcon/>} category="Backend" /></div>
                </div>

                <div className="text-2xl text-gray-400 font-mono">&gt;&gt;</div>

                {/* 3. Frontend */}
                <div className="flex-1 p-3 bg-white rounded-lg shadow border">
                     <div className="text-2xl text-teal-600 mx-auto mb-1">🗺️</div>
                    <h6 className="font-bold text-sm">3. 프론트엔드</h6>
                    <p className="text-xs">GeoJSON 데이터를 받아 지도 위에 마커/히트맵 렌더링</p>
                     <div className="mt-1"><TechStackPill name="React + Leaflet" icon={<div className="text-xl">⚛️</div>} category="Frontend" /></div>
                </div>
            </div>
            <div className="mt-4 p-3 bg-yellow-50 border border-yellow-300 rounded-lg text-center">
                <p className="font-semibold text-yellow-800 text-sm">💡 핵심 최적화 기술</p>
                <p className="text-xs text-yellow-700">대량의 데이터를 부드럽게 처리하기 위해, 지도 확대 수준에 따라 자동으로 데이터를 집계하여 보여주는 <strong>마커 클러스터링(Marker Clustering)</strong>과 <strong>서버사이드 렌더링(SSR)</strong> 기법을 적용합니다.</p>
            </div>
        </div>

        <h4>3.3. 적용 기술 스택</h4>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 not-prose mt-4">
            <TechStackPill name="React" icon={<div className="text-2xl">⚛️</div>} category="Frontend" />
            <TechStackPill name="Leaflet.js" icon={<div className="text-2xl">🗺️</div>} category="Frontend" />
            <TechStackPill name="PostGIS" icon={<PostGisIcon/>} category="Database" />
            <TechStackPill name="FastAPI" icon={<FastApiIcon/>} category="Backend" />
            <TechStackPill name="GeoJSON" icon={<div className="text-2xl">🌐</div>} category="Backend" />
        </div>
      </SectionCard>
    </div>
    </>
  );
};

export default DevelopmentPlanPage;