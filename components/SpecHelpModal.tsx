import React, { useState } from 'react';
import MinusIcon from './icons/MinusIcon';
import WindowIcon from './icons/WindowIcon';
import Square2StackIcon from './icons/Square2StackIcon';
import XMarkIcon from './icons/XMarkIcon';
import Cog6ToothIcon from './icons/Cog6ToothIcon';

interface SpecHelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SpecHelpModal: React.FC<SpecHelpModalProps> = ({ isOpen, onClose }) => {
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
                        <Cog6ToothIcon className="w-6 h-6"/>
                        {modalState !== 'minimized' ? '기능별 상세 개발 명세서' : '상세 개발 명세'}
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
                            <div className="prose prose-blue max-w-none">
                                <h3>서론: 실행 가능한 청사진 (Actionable Blueprint)</h3>
                                <p>본 문서는 GIDS 시스템의 각 기능 모듈에 대한 상세 개발 명세서(Technical Specification)입니다. 단순한 기능 나열을 넘어, 개발팀이 실제 구현에 착수할 수 있도록 <strong>API 엔드포인트, 데이터베이스 스키마, 핵심 로직, 기술적 제약사항, 그리고 성능 목표치</strong>까지 구체적으로 정의합니다. 이 문서는 GIDS 아키텍처의 실행 계획이자, 프로젝트 성공을 위한 기술적 나침반 역할을 수행합니다.</p>
                                
                                <hr className="my-6" />

                                <h4>Module 1.0: 실시간 정보 수집 (Data Ingestion)</h4>
                                <h5>1.1. 목표 (Objective)</h5>
                                <p>전 세계 50개 이상의 이종(heterogeneous) 데이터 소스로부터 하루 10만 건 이상의 감염병 관련 문서를 5분 이내의 지연 시간(latency)으로 안정적으로 수집, 정규화(normalize)하여 실시간 데이터 파이프라인(Kafka)으로 전송한다.</p>

                                <h5>1.2. 핵심 컴포넌트 아키텍처</h5>
                                <div className="bg-gray-100 p-4 rounded-lg my-4 text-center font-mono text-sm shadow-inner">
                                  <p className="flex items-center justify-center"><strong>[Scheduler: Celery Beat]</strong> -- schedules task --&gt;</p>
                                  <p className="flex items-center justify-center ml-4"><strong>[Task Queue: Redis]</strong> -- dispatches job --&gt;</p>
                                  <p className="flex items-center justify-center ml-8"><strong>[Crawler Workers: Celery + Scrapy/Selenium]</strong> -- crawl & parse --&gt;</p>
                                  <p className="flex items-center justify-center ml-12"><strong>[Message Bus: Kafka Topic 'raw_articles']</strong></p>
                                </div>
                                
                                <h5>1.3. API 명세 (Admin Configuration)</h5>
                                <pre className="bg-gray-800 text-white p-4 rounded-md text-sm"><code>
{`// 데이터 소스(크롤러) 추가/수정
POST /api/v1/admin/crawlers
PUT /api/v1/admin/crawlers/{crawler_id}
Request Body: {
  "source_name": "WHO DONs",
  "source_url": "https://www.who.int/emergencies/disease-outbreak-news",
  "source_type": "WEB_PAGE", // WEB_PAGE, API, RSS
  "cron_schedule": "*/5 * * * *", // 5분마다
  "is_enabled": true
}

// 특정 크롤러 즉시 실행
POST /api/v1/admin/crawlers/{crawler_id}/run

// 크롤러 상태 및 통계 조회
GET /api/v1/admin/crawlers/{crawler_id}/stats`}
                                </code></pre>

                                <h5>1.4. 데이터베이스 스키마 (PostgreSQL)</h5>
                                <pre className="bg-gray-800 text-white p-4 rounded-md text-sm"><code>
{`-- Crawler configuration table
CREATE TABLE crawlers (
  id SERIAL PRIMARY KEY,
  source_name VARCHAR(255) NOT NULL UNIQUE,
  source_url TEXT NOT NULL,
  source_type VARCHAR(50) NOT NULL,
  cron_schedule VARCHAR(100) NOT NULL,
  is_enabled BOOLEAN DEFAULT true,
  last_run_at TIMESTAMPTZ,
  last_status VARCHAR(50),
  avg_runtime_seconds REAL
);`}
                                </code></pre>
                                
                                <hr className="my-6" />

                                <h4>Module 2.0: AI 기반 정보 검증 (AI Verification)</h4>
                                <h5>2.1. 목표 (Objective)</h5>
                                <p>Kafka 토픽 'raw_articles'로부터 소비한(consume) 원본 텍스트를 3단계 검증 파이프라인을 통해 처리하여, 99% 이상의 정확도로 '사실', '허위', '의견'을 판별하고 최종 신뢰도 점수와 함께 Primary DB에 저장한다. 단일 건 처리 시간은 30초 이내를 목표로 한다.</p>

                                <h5>2.2. AI 파이프라인 아키텍처</h5>
                                <div className="bg-gray-100 p-4 rounded-lg my-4 text-center font-mono text-sm shadow-inner">
                                    <p><strong>[Kafka Topic 'raw_articles']</strong> --&gt; <strong>[Verification Service (Consumer)]</strong></p>
                                    <div className="ml-4 border-l-2 pl-4">
                                        <p><strong>Step 1: Classification</strong> (DeBERTa Model) --&gt; <em>(Initial verdict, confidence)</em></p>
                                        <p><strong>Step 2: RAG Fact-Checking</strong></p>
                                        <div className="ml-4 border-l-2 pl-4">
                                            <p>2a. Embedding (S-BERT) --&gt; <strong>[Vector DB]</strong> &lt;-- Retrieval</p>
                                            <p>2b. Augment & Generate (Gemini 2.5) --&gt; <em>(Summary, evidence)</em></p>
                                        </div>
                                        <p><strong>Step 3: Ensemble & Finalize</strong> --&gt; <em>(Final verdict, score)</em></p>
                                    </div>
                                    <p>--&gt; <strong>[Primary DB: 'articles' table]</strong></p>
                                </div>
                                
                                <h5>2.3. RAG 프롬프트 템플릿 예시 (Gemini 2.5)</h5>
                                <div className="p-3 bg-blue-50 border border-blue-200 rounded-md text-sm">
                                    <p><strong>System Instruction:</strong> "You are an expert fact-checker specializing in epidemiology and public health. Analyze the 'Original Text' based *only* on the provided 'Evidence Documents'. Do not use any prior knowledge."</p>
                                    <p className="mt-2"><strong>User Prompt:</strong></p>
                                    <p>```<br/>
                                    **Evidence Documents:**<br/>
                                    - [Document 1: WHO Report] "WHO confirms 12 cases of Ebola in North Kivu..."<br/>
                                    - [Document 2: Local News] "North Kivu provincial health ministry reports a cluster of hemorrhagic fever cases..."<br/>
                                    <br/>
                                    **Original Text:** "Sources say over 100 people have died from a new Ebola outbreak in Congo."<br/>
                                    <br/>
                                    **Task:**<br/>
                                    1. Classify the 'Original Text' as 'Fact', 'Fake', or 'Unverified' based on the evidence.<br/>
                                    2. Provide a confidence score (0.0 to 1.0).<br/>
                                    3. Write a brief justification for your classification.<br/>
                                    <br/>
                                    Respond in JSON format: {'{ "classification": "...", "confidence_score": ..., "justification": "..." }'}
                                    ```</p>
                                </div>

                                <h5>2.4. 데이터베이스 스키마 (PostgreSQL)</h5>
                                <pre className="bg-gray-800 text-white p-4 rounded-md text-sm"><code>
{`-- Verified articles table
CREATE TABLE articles (
  id SERIAL PRIMARY KEY,
  crawler_id INT REFERENCES crawlers(id),
  original_url TEXT,
  title TEXT NOT NULL,
  content TEXT,
  published_at TIMESTAMPTZ,
  -- AI Verification Results
  initial_class VARCHAR(50),
  initial_confidence REAL,
  rag_summary TEXT,
  final_verdict VARCHAR(50) NOT NULL, -- Fact, Fake, Opinion
  final_confidence REAL,
  verified_at TIMESTAMPTZ DEFAULT NOW()
);`}
                                </code></pre>

                                <hr className="my-6" />

                                <h4>Module 3.0: 직관적 시각화 (GIS Visualization)</h4>
                                <h5>3.1. 목표 (Objective)</h5>
                                <p>Primary DB에 저장된 검증 완료 데이터 중 위치 정보가 포함된 건들을 지도 위에 시각화한다. 100만 건 이상의 데이터를 렌더링할 수 있어야 하며, 필터링 및 확대/축소 시 500ms 이내의 응답 속도를 보장한다.</p>

                                <h5>3.2. API 명세</h5>
                                <pre className="bg-gray-800 text-white p-4 rounded-md text-sm"><code>
{`// 지도에 표시할 감염병 데이터 조회
GET /api/v1/outbreaks/map
Query Params:
  - start_date (YYYY-MM-DD)
  - end_date (YYYY-MM-DD)
  - disease_name (string)
  - risk_level (HIGH, MEDIUM, LOW)
  - bbox (min_lng,min_lat,max_lng,max_lat)
Response: GeoJSON FeatureCollection`}
                                </code></pre>
                                <h5>3.3. 기술적 고려사항</h5>
                                <ul>
                                    <li><strong>DB:</strong> `articles` 테이블에 `location GEOMETRY(Point, 4326)` 컬럼을 추가하고, PostGIS의 공간 인덱스(Spatial Index)를 생성하여 Bbox(Bounding Box) 쿼리 성능을 최적화한다.</li>
                                    <li><strong>Backend:</strong> FastAPI에서 PostGIS 쿼리 결과를 GeoJSON 형식으로 직접 반환하여 데이터 변환 오버헤드를 최소화한다.</li>
                                    <li><strong>Frontend:</strong> Leaflet의 마커 클러스터링 플러그인을 사용하여 대량의 포인트 데이터를 효율적으로 시각화하고, 벡터 타일(Vector Tiles) 도입을 검토하여 클라이언트 측 렌더링 성능을 극대화한다.</li>
                                </ul>

                                <hr className="my-6" />

                                <h4>Module 4.0: 데이터 통계 및 보고 (Statistics & Reporting)</h4>
                                <h5>4.1. 목표 (Objective)</h5>
                                <p>사용자가 지정한 기간 및 조건에 따라 축적된 데이터를 동적으로 집계하여 통계 차트를 제공하고, 1분 이내에 PDF 형식의 종합 보고서를 생성하여 다운로드할 수 있도록 한다.</p>
                                <h5>4.2. API 명세</h5>
                                <pre className="bg-gray-800 text-white p-4 rounded-md text-sm"><code>
{`// 통계 차트 데이터 조회
GET /api/v1/stats/timeseries?start_date=...&group_by=...
GET /api/v1/stats/by_country?start_date=...

// 보고서 생성 요청 (비동기)
POST /api/v1/reports
Request Body: { "start_date": "...", "end_date": "..." }
Response: { "task_id": "..." }

// 보고서 생성 상태 확인 및 다운로드 링크 GET
GET /api/v1/reports/{task_id}`}
                                </code></pre>
                                <h5>4.3. 비동기 보고서 생성 프로세스</h5>
                                <div className="bg-gray-100 p-4 rounded-lg my-4 text-center font-mono text-sm shadow-inner">
                                    <p><strong>[User Request]</strong> --&gt; <strong>[API Server]</strong> -- creates task --&gt; <strong>[Celery Queue]</strong></p>
                                    <p className="ml-4">--&gt; <strong>[Report Worker]</strong></p>
                                    <div className="ml-8 border-l-2 pl-4 text-left">
                                        <p>1. Fetch data from PostgreSQL</p>
                                        <p>2. Generate charts (Matplotlib)</p>
                                        <p>3. Populate HTML template (Jinja2)</p>
                                        <p>4. Convert HTML to PDF (WeasyPrint)</p>
                                        <p>5. Upload PDF to S3</p>
                                        <p>6. Update task status with S3 URL</p>
                                    </div>
                                    <p><strong>[Frontend]</strong> -- polls task status --&gt; <strong>[Download from S3]</strong></p>
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

export default SpecHelpModal;