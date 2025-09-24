import React, { useState } from 'react';
import Card from '../components/Card';
import DocumentTextIcon from '../components/icons/DocumentTextIcon';
import ArchitectureIcon from '../components/icons/ArchitectureIcon';
import BrainIcon from '../components/icons/BrainIcon';
import GeminiIcon from '../components/icons/GeminiIcon';
import OpenAIIcon from '../components/icons/OpenAIIcon';
import KTIcon from '../components/icons/KTIcon';
import SKTIcon from '../components/icons/SKTIcon';
import CheckCircleIcon from '../components/icons/CheckCircleIcon';
import CollectionIcon from '../components/icons/CollectionIcon';
import VerifyIcon from '../components/icons/VerifyIcon';
import VisualizeIcon from '../components/icons/VisualizeIcon';
import StatsIcon from '../components/icons/StatsIcon';
import Cog6ToothIcon from '../components/icons/Cog6ToothIcon';
import BeakerIcon from '../components/icons/BeakerIcon';
import UserGroupIcon from '../components/icons/UserGroupIcon';
import ArrowPathIcon from '../components/icons/ArrowPathIcon';
import CloudArrowUpIcon from '../components/icons/CloudArrowUpIcon';
import QuestionMarkCircleIcon from '../components/icons/QuestionMarkCircleIcon';
import TechSelectionHelpModal from '../components/TechSelectionHelpModal';
import ArchitectureHelpModal from '../components/ArchitectureModal';
import SpecHelpModal from '../components/SpecHelpModal';
import MethodologyHelpModal from '../components/MethodologyHelpModal';
import TeamHelpModal from '../components/TeamHelpModal';
import QAHelpModal from '../components/QAHelpModal';
import DeployHelpModal from '../components/DeployHelpModal';
import TechPlanModal from '../components/TechPlanModal';
import BoltIcon from '../components/icons/BoltIcon';

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

const DevelopmentPlanPage: React.FC = () => {
    const [isTechHelpModalOpen, setIsTechHelpModalOpen] = useState(false);
    const [isArchHelpModalOpen, setIsArchHelpModalOpen] = useState(false);
    const [isSpecHelpModalOpen, setIsSpecHelpModalOpen] = useState(false);
    const [isMethodologyHelpModalOpen, setMethodologyHelpModalOpen] = useState(false);
    const [isTeamHelpModalOpen, setTeamHelpModalOpen] = useState(false);
    const [isQAHelpModalOpen, setQAHelpModalOpen] = useState(false);
    const [isDeployHelpModalOpen, setDeployHelpModalOpen] = useState(false);
    const [isTechPlanModalOpen, setIsTechPlanModalOpen] = useState(false);

  return (
    <>
    <TechSelectionHelpModal isOpen={isTechHelpModalOpen} onClose={() => setIsTechHelpModalOpen(false)} />
    <ArchitectureHelpModal isOpen={isArchHelpModalOpen} onClose={() => setIsArchHelpModalOpen(false)} />
    <SpecHelpModal isOpen={isSpecHelpModalOpen} onClose={() => setIsSpecHelpModalOpen(false)} />
    <MethodologyHelpModal isOpen={isMethodologyHelpModalOpen} onClose={() => setMethodologyHelpModalOpen(false)} />
    <TeamHelpModal isOpen={isTeamHelpModalOpen} onClose={() => setTeamHelpModalOpen(false)} />
    <QAHelpModal isOpen={isQAHelpModalOpen} onClose={() => setQAHelpModalOpen(false)} />
    <DeployHelpModal isOpen={isDeployHelpModalOpen} onClose={() => setDeployHelpModalOpen(false)} />
    <TechPlanModal isOpen={isTechPlanModalOpen} onClose={() => setIsTechPlanModalOpen(false)} />


    <div className="space-y-6">
      <h1 className="text-4xl font-bold text-secondary flex items-center gap-3"><DocumentTextIcon className="w-10 h-10 text-primary-light"/> GIDS 개발 계획 및 사업 제안서</h1>
      
      <SectionCard title="1. 프로젝트 개요 (Project Overview)" icon={<DocumentTextIcon className="w-7 h-7" />}>
        <h4>1.1. 프로젝트 명</h4>
        <p>AI 기반 차세대 해외감염병 감시 솔루션 (GIDS: Global Infectious Disease Surveillance Solution) 개발</p>
        
        <h4>1.2. 추진 배경 및 목표</h4>
        <p>
            코로나19 팬데믹을 통해 확인되었듯이, 신종 및 해외 유입 감염병의 신속한 탐지와 초기 대응은 국가 공중 보건 및 사회/경제적 안정에 지대한 영향을 미칩니다. 현재의 감시 체계는 분산된 정보 소스, 수동적 정보 취합, 정보의 신뢰도 검증 지연 등의 한계를 가지고 있습니다.
            <br/>
            본 프로젝트는 최신 AI 및 대규모 언어 모델(LLM) 기술을 활용하여, 전 세계 감염병 정보를 24/7 실시간으로 자동 수집하고, 정보의 신뢰도를 지능적으로 검증하며, 직관적인 시각화 및 통계 분석을 통해 대한민국 질병관리청(KDCA) 및 관련 기관의 선제적이고 데이터 기반의 정책 결정을 지원하는 것을 최종 목표로 합니다.
        </p>
        
        <h4>1.3. 기대 효과</h4>
        <ul>
            <li><strong>조기 경보 능력 강화:</strong> 해외 감염병 발생 징후를 평균 12~24시간 단축하여 탐지 (현행 대비)</li>
            <li><strong>정책 결정의 정확성 향상:</strong> AI가 검증한 신뢰도 높은 데이터를 기반으로 정책 수립</li>
            <li><strong>업무 효율성 증대:</strong> 정보 수집 및 분석에 소요되는 인적 자원 및 시간 80% 이상 절감</li>
            <li><strong>국가 방역 체계 고도화:</strong> 데이터 기반의 선진 방역 인프라 구축을 통한 국가 경쟁력 제고</li>
        </ul>
      </SectionCard>

      <SectionCard 
        title="2. 시스템 아키텍처 (System Architecture)" 
        icon={<ArchitectureIcon className="w-7 h-7" />}
        onHelpClick={() => setIsArchHelpModalOpen(true)}
      >
        <p>본 시스템은 확장성, 유연성, 안정성을 극대화하기 위해 MSA(마이크로서비스 아키텍처)를 기반으로 설계하며, 각 기능 Layer는 독립적으로 개발, 배포, 확장이 가능합니다.</p>
        <img src="https://i.imgur.com/8aZ3E2G.png" alt="GIDS System Architecture Diagram" className="rounded-lg shadow-lg my-4" />
        <ol>
            <li><strong>Ingestion Layer:</strong> 전 세계 웹/API로부터 비정형/정형 데이터를 수집하는 지능형 크롤러 계층.</li>
            <li><strong>Data Layer:</strong> 수집된 데이터를 실시간으로 처리, 가공하고 목적에 따라 다양한 DB에 저장하는 데이터 허브 계층.</li>
            <li><strong>AI Core:</strong> 수집된 정보의 신뢰도를 검증하고 인사이트를 도출하는 시스템의 두뇌.</li>
            <li><strong>Application Layer:</strong> 최종 사용자와 관리자에게 서비스 인터페이스(UI/UX)를 제공하는 계층.</li>
            <li><strong>Foundation Layer:</strong> 전체 시스템을 안정적으로 운영하기 위한 클라우드 인프라 및 DevOps 환경.</li>
        </ol>
      </SectionCard>

      <SectionCard title="3. 핵심 기술 및 AI 모델 선정" icon={<BrainIcon className="w-7 h-7" />} onHelpClick={() => setIsTechHelpModalOpen(true)}>
        <h4>3.1. 대규모 언어 모델(LLM) 비교 및 선정</h4>
        <p>본 시스템의 핵심인 'AI 기반 정보 검증' 기능의 성공은 LLM의 성능에 달려있습니다. 특히 RAG(검색 증강 생성) 기반의 팩트체크, 다국어 처리 능력, 최신 정보 반영 능력이 중요합니다. 아래는 주요 LLM 후보군에 대한 비교 분석입니다.</p>
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-100">
                    <tr>
                        <th scope="col">평가 항목</th>
                        <th scope="col"><div className="flex items-center gap-2"><GeminiIcon className="w-5 h-5"/>Gemini 2.5</div></th>
                        <th scope="col"><div className="flex items-center gap-2"><OpenAIIcon className="w-5 h-5"/>GPT-5 (예상)</div></th>
                        <th scope="col"><div className="flex items-center gap-2"><KTIcon className="w-5 h-5"/>KT Mi:dm 2.0</div></th>
                        <th scope="col"><div className="flex items-center gap-2"><SKTIcon className="w-5 h-5"/>SKT A.X 4.0</div></th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                    <tr>
                        <td><strong>성능 (추론/정확도)</strong></td>
                        <td>최상 (최신 정보, 논리적 추론)</td>
                        <td>최상 (강력한 추론 능력)</td>
                        <td>우수 (한국어 특화)</td>
                        <td>우수 (통신 데이터 결합)</td>
                    </tr>
                    <tr>
                        <td><strong>다국어 능력</strong></td>
                        <td className="text-green-600 font-bold">최우수 (100개+ 언어)</td>
                        <td>최우수</td>
                        <td>제한적 (한국어 중심)</td>
                        <td>제한적 (한국어 중심)</td>
                    </tr>
                    <tr>
                        <td><strong>RAG/Tool-use</strong></td>
                        <td className="text-green-600 font-bold">최우수 (Google Search 연동)</td>
                        <td>최우수</td>
                        <td>우수</td>
                        <td>우수</td>
                    </tr>
                    <tr>
                        <td><strong>데이터 주권/보안</strong></td>
                        <td>Public Cloud 기반</td>
                        <td>Public Cloud 기반</td>
                        <td className="text-green-600 font-bold">On-premise/Sovereign Cloud 지원</td>
                        <td className="text-green-600 font-bold">On-premise/Sovereign Cloud 지원</td>
                    </tr>
                    <tr>
                        <td><strong>개발 생태계/비용</strong></td>
                        <td>우수 / 경쟁력 있는 가격</td>
                        <td>최우수 / 상대적 고가</td>
                        <td>성장 중 / 별도 협의</td>
                        <td>성장 중 / 별도 협의</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div className="mt-4 p-4 bg-blue-50 border-l-4 border-blue-500 rounded-r-lg">
            <h5 className="font-bold flex items-center gap-2"><CheckCircleIcon className="w-6 h-6 text-blue-600"/> 최종 선정 방안</h5>
            <p>
                <strong>주력 모델: Google Gemini 2.5</strong><br/>
                전 세계의 다양한 언어로 된 정보를 처리해야 하는 본 시스템의 특성상, <strong>압도적인 다국어 능력</strong>과 <strong>Google Search를 통한 실시간 정보 접근성</strong>을 갖춘 Gemini 2.5를 핵심 RAG 및 분석 모델로 선정합니다. 이는 최신 감염병 정보에 대한 팩트체크 정확도를 극대화할 수 있는 최적의 선택입니다.
            </p>
            <p className="mt-2">
                <strong>보조 모델: KT Mi:dm 2.0 (믿음)</strong><br/>
                질병관리청 내부 보고서 등 한국어로 된 민감 데이터를 처리하거나, 국내 법규 및 데이터 주권이 중요한 특정 기능에 한해서는 On-premise(구축형) 배포가 가능한 KT Mi:dm 모델을 보조적으로 활용하는 <strong>하이브리드 전략</strong>을 채택합니다.
            </p>
        </div>
        
        <h4>3.2. 전체 기술 스택 (Tech Stack)</h4>
        <div className="overflow-x-auto">
            <table className="min-w-full">
                {/* Table content from MANUAL.md */}
                 <thead>
                    <tr><th>구분</th><th>기술</th><th>사유</th></tr>
                </thead>
                <tbody>
                    <tr><td><strong>프론트엔드</strong></td><td>React, TypeScript, Tailwind CSS</td><td>컴포넌트 기반 개발, 타입 안정성, 신속한 UI 프로토타이핑</td></tr>
                    <tr><td><strong>백엔드</strong></td><td>Python, FastAPI</td><td>AI/ML 생태계 호환성, 고성능 비동기 API 서버 구축</td></tr>
                    <tr><td><strong>데이터베이스</strong></td><td>PostgreSQL+PostGIS, Vector DB, Elasticsearch</td><td>정형/지리정보, AI 임베딩, 로그 및 검색 등 목적별 최적 DB 사용</td></tr>
                    <tr><td><strong>메시지 큐</strong></td><td>Kafka</td><td>대용량 데이터 스트림의 안정적 처리를 위한 비동기 파이프라인 구축</td></tr>
                    <tr><td><strong>인프라</strong></td><td>Docker, Kubernetes, AWS/GCP</td><td>MSA 기반의 안정적인 배포, 확장, 관리 및 클라우드 네이티브 환경</td></tr>
                </tbody>
            </table>
        </div>
      </SectionCard>

      <SectionCard title="4. 기능별 상세 개발 명세" icon={<Cog6ToothIcon className="w-7 h-7" />} onHelpClick={() => setIsSpecHelpModalOpen(true)}>
        {/* Collection */}
        <div className="mb-6 p-4 border rounded-lg">
            <h4 className="font-bold flex items-center gap-2 text-lg"><CollectionIcon className="w-6 h-6"/> 4.1. 실시간 정보 수집</h4>
            <p><strong>목표:</strong> 전 세계 주요 데이터 소스로부터 감염병 관련 정보를 24/7 자동 수집.</p>
            <p><strong>주요 기능:</strong> 크롤러 현황 대시보드, 데이터 소스 CRUD, 실시간 수집 피드, 상세 로그 조회.</p>
            <p><strong>개발 명세:</strong>
                <ul>
                    <li><strong>Backend:</strong> Scrapy/Selenium 기반 크롤러 개발 (소스별 Parser 포함), Celery Beat 이용 스케줄링, 수집 현황/통계 API (FastAPI), 수집 데이터를 Kafka로 전송.</li>
                    <li><strong>Frontend:</strong> 크롤러 상태 실시간 업데이트(WebSocket), 통계 카드, 데이터 소스 테이블, 로그 뷰어 컴포넌트(React).</li>
                </ul>
            </p>
        </div>
        {/* Verification */}
        <div className="mb-6 p-4 border rounded-lg">
            <h4 className="font-bold flex items-center gap-2 text-lg"><VerifyIcon className="w-6 h-6"/> 4.2. AI 기반 정보 검증</h4>
            <p><strong>목표:</strong> 수집된 정보의 사실/허위/의견을 판별하고 객관적 신뢰도 점수 부여.</p>
            <p><strong>주요 기능:</strong> 3단계 검증 프로세스 시각화, 수동 검토 인터페이스, 지식 베이스 관리, AI 규칙 설정.</p>
            <p><strong>개발 명세:</strong>
                <ul>
                    <li><strong>AI/Backend:</strong> LangChain 기반 RAG 파이프라인 구축 (Gemini 2.5 연동), Vector DB(ChromaDB) 구축 및 임베딩 파이프라인, 검증 결과 처리 및 저장 API, 수동 검토 결과 모델 재학습(Fine-tuning) 파이프라인.</li>
                    <li><strong>Frontend:</strong> 검증 단계별 진행 애니메이션, 수동 검증용 Modal UI(원본-AI분석-최종판정), 지식베이스/규칙 관리 UI(React).</li>
                </ul>
            </p>
        </div>
         {/* Visualization */}
        <div className="mb-6 p-4 border rounded-lg">
            <h4 className="font-bold flex items-center gap-2 text-lg"><VisualizeIcon className="w-6 h-6"/> 4.3. 직관적 시각화</h4>
            <p><strong>목표:</strong> 검증된 데이터를 지도 기반으로 시각화하여 직관적인 상황 분석 지원.</p>
            <p><strong>주요 기능:</strong> 인터랙티브 지도, 기간/종류/위험 등급 필터, 이벤트 상세 정보 팝업, 상세 보고서 연동.</p>
            <p><strong>개발 명세:</strong>
                <ul>
                    <li><strong>Backend:</strong> PostGIS를 활용한 공간 쿼리(Geo-spatial Query) API 개발, 필터링 조건에 따른 GeoJSON 데이터 생성.</li>
                    <li><strong>Frontend:</strong> Leaflet/Mapbox 기반 지도 컴포넌트, 필터링 UI, 마커 커스터마이징(위험 등급별 색상/크기), 정보 팝업 및 상세 보고서 Modal 연동(React).</li>
                </ul>
            </p>
        </div>
        {/* Statistics */}
        <div className="p-4 border rounded-lg">
            <h4 className="font-bold flex items-center gap-2 text-lg"><StatsIcon className="w-6 h-6"/> 4.4. 데이터 통계 및 정리</h4>
            <p><strong>목표:</strong> 축적된 데이터를 기반으로 통계 분석 및 보고서 자동 생성.</p>
            <p><strong>주요 기능:</strong> 기간별 통계 대시보드, 국가별/유형별/추이별 차트, PDF 보고서 생성.</p>
            <p><strong>개발 명세:</strong>
                <ul>
                    <li><strong>Backend:</strong> 통계 데이터 집계(Aggregation) 쿼리 최적화, PDF 생성을 위한 ReportLab/WeasyPrint 연동, 보고서 생성 비동기 처리(Celery).</li>
                    <li><strong>Frontend:</strong> Recharts 기반 인터랙티브 차트(Bar, Line, Pie) 구현, 보고서 생성 요청 및 다운로드 UI(React).</li>
                </ul>
            </p>
        </div>
      </SectionCard>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <SectionCard title="5. 개발 방법론" icon={<ArrowPathIcon className="w-7 h-7" />} onHelpClick={() => setMethodologyHelpModalOpen(true)}>
            <h4 className="font-bold">Agile (Scrum)</h4>
            <p>빠른 프로토타이핑과 지속적인 피드백 반영이 중요한 본 프로젝트의 특성에 맞춰 애자일 스크럼 방법론을 채택합니다.</p>
            <ul>
                <li><strong>Sprint:</strong> 2주 단위로 개발 주기 설정</li>
                <li><strong>Ceremonies:</strong> Sprint Planning, Daily Stand-up, Sprint Review, Retrospective 진행</li>
                <li><strong>Tools:</strong> Jira (이슈 관리), Confluence (문서 협업), Git/GitHub (버전 관리)</li>
                <li><strong>CI/CD:</strong> GitHub Actions를 통한 빌드/테스트/배포 자동화 파이프라인 구축</li>
            </ul>
        </SectionCard>
        
        <SectionCard title="6. 팀 구성 및 역할 (R&R)" icon={<UserGroupIcon className="w-7 h-7" />} onHelpClick={() => setTeamHelpModalOpen(true)}>
            <p>최적의 프로젝트 수행을 위해 아래와 같이 전문 인력으로 팀을 구성합니다. (총 8명)</p>
            <ul>
                <li><strong>PM (1명):</strong> 프로젝트 총괄, 요구사항 분석, 일정 및 리스크 관리</li>
                <li><strong>Tech Lead (1명):</strong> 기술 아키텍처 설계, 코드 리뷰, 개발팀 리딩</li>
                <li><strong>AI/ML Engineer (1명):</strong> LLM 파이프라인 구축, 모델 튜닝 및 평가</li>
                <li><strong>Backend Engineer (2명):</strong> API 서버, 크롤러, 데이터베이스 설계 및 개발</li>
                <li><strong>Frontend Engineer (2명):</strong> UI/UX 구현, 데이터 시각화 개발</li>
                <li><strong>DevOps/Infra Engineer (1명):</strong> 클라우드 인프라 구축, CI/CD, 모니터링 환경 구축</li>
            </ul>
        </SectionCard>
      </div>

       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <SectionCard title="7. 테스트 및 품질 보증(QA)" icon={<BeakerIcon className="w-7 h-7" />} onHelpClick={() => setQAHelpModalOpen(true)}>
            <p>안정적이고 신뢰도 높은 시스템을 위해 다단계 테스트 전략을 수행합니다.</p>
            <ul>
                <li><strong>Unit Test:</strong> 함수/모듈 단위 테스트 (Pytest, Jest) - Code Coverage 80% 목표</li>
                <li><strong>Integration Test:</strong> 마이크로서비스 간 API 연동 테스트</li>
                <li><strong>E2E Test:</strong> 사용자 시나리오 기반 сквозное тестирование (Cypress/Playwright)</li>
                <li><strong>AI Model Evaluation:</strong> 정확도, 재현율, F1 Score 등 지표를 이용한 모델 성능 정기 평가</li>
                <li><strong>Security Testing:</strong> 정기적 보안 취약점 스캐닝 및 모의 해킹 (OWASP Top 10 기준)</li>
            </ul>
        </SectionCard>

        <SectionCard title="8. 배포 및 운영 계획" icon={<CloudArrowUpIcon className="w-7 h-7" />} onHelpClick={() => setDeployHelpModalOpen(true)}>
            <p>무중단 배포 및 안정적인 운영을 위한 체계를 구축합니다.</p>
            <ul>
                <li><strong>배포 전략:</strong> Kubernetes 기반 Blue/Green 또는 Canary 배포를 통한 무중단 업데이트</li>
                <li><strong>인프라:</strong> Terraform을 이용한 코드 기반 인프라(IaC) 관리로 일관성 및 재현성 확보</li>
                <li><strong>모니터링:</strong> Prometheus(메트릭), Grafana(대시보드), ELK(로그) 스택을 활용한 24/7 시스템 모니터링 및 이상 징후 자동 알림(Slack 연동)</li>
                <li><strong>백업 및 복구:</strong> 데이터베이스 정기 백업 및 재해 복구(DR) 계획 수립</li>
            </ul>
        </SectionCard>
       </div>

       <div className="mt-8 text-center">
            <button
                onClick={() => setIsTechPlanModalOpen(true)}
                className="inline-flex items-center gap-3 px-8 py-4 bg-primary-dark text-white font-bold text-lg rounded-lg shadow-lg hover:bg-primary-light transform hover:-translate-y-1 transition-all duration-300"
            >
                <BoltIcon className="w-6 h-6"/>
                기술개발 세부 추진계획 보기
            </button>
       </div>

    </div>
    </>
  );
};

export default DevelopmentPlanPage;