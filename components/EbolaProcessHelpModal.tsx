import React from 'react';
import XMarkIcon from './icons/XMarkIcon';
import BoltIcon from './icons/BoltIcon';
import GlobeIcon from './icons/GlobeIcon';
import ClockIcon from './icons/ClockIcon';
import SpiderIcon from './icons/SpiderIcon';
import PipelineIcon from './icons/PipelineIcon';
import Cog6ToothIcon from './icons/Cog6ToothIcon';
import DatabaseIcon from './icons/DatabaseIcon';
import VisualizeIcon from './icons/VisualizeIcon';
import CheckCircleIcon from './icons/CheckCircleIcon';

interface EbolaProcessHelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const StepDetail: React.FC<{ icon: React.ReactNode; title: string; children: React.ReactNode; tech: string[] }> = ({ icon, title, children, tech }) => (
    <div className="flex items-start gap-4 p-4 rounded-lg transition-all duration-300 hover:bg-white hover:shadow-lg">
        <div className="flex-shrink-0 w-16 text-center">
            <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mx-auto">
                {icon}
            </div>
        </div>
        <div>
            <h5 className="font-bold text-lg text-secondary">{title}</h5>
            <p className="text-sm text-gray-600 mt-1">{children}</p>
            <div className="mt-3 flex flex-wrap gap-2">
                {tech.map(t => (
                    <span key={t} className="text-xs font-semibold px-2 py-1 rounded-full bg-gray-200 text-gray-700">{t}</span>
                ))}
            </div>
        </div>
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


const EbolaProcessHelpModal: React.FC<EbolaProcessHelpModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div 
        className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-[3000] animate-fadeIn" 
        onClick={onClose}
        aria-modal="true"
        role="dialog"
    >
      <div 
        className="bg-gray-50 rounded-xl shadow-2xl w-full max-w-5xl h-[95vh] flex flex-col overflow-hidden" 
        onClick={e => e.stopPropagation()}
      >
        <div className="p-4 border-b bg-white flex-shrink-0 flex justify-between items-center">
            <h2 className="text-xl font-bold text-primary-dark flex items-center gap-3">
                <BoltIcon className="w-6 h-6"/>
                GIDS 데이터 수집 파이프라인 심층 분석: WHO 에볼라 공지 수집 사례
            </h2>
          <button onClick={onClose} className="p-2 rounded-full text-gray-400 hover:text-gray-800 hover:bg-gray-100 transition-colors">
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>
        
        <div className="p-8 overflow-y-auto flex-grow custom-scrollbar">
            <div className="prose max-w-none">
                <h3 className="text-center">인간의 한계를 넘어, 데이터로 감염병에 맞서는 GIDS의 심장부</h3>
                <p className="text-center text-lg text-gray-600 leading-relaxed">
                    전 세계에서 발생하는 감염병 정보는 분초를 다투어 정확하게 확보해야 합니다. GIDS의 완전 자동화된 데이터 수집 파이프라인은 <strong>인간 연구원의 수동 검색보다 95% 더 빠르고, 24시간 365일 지치지 않고</strong> 작동하여 골든타임을 확보합니다. 아래는 WHO의 에볼라 발병 공지를 실시간으로 수집하여 AI 검증 단계로 전달하기까지의 정교한 7단계 프로세스입니다.
                </p>

                <hr className="my-8" />
                
                <h3 className="!mb-6">7-Step Automated Data Pipeline</h3>
                <div className="not-prose space-y-4">
                    {/* FIX: Moved ClockIcon to the 'icon' prop as required by StepDetail component. */}
                    <StepDetail icon={<ClockIcon className="w-8 h-8 text-blue-500"/>} title="1단계: 지능형 타겟팅 및 스케줄링" tech={['Targeting', 'Celery Beat']}>
                        시스템은 단순히 웹사이트를 방문하는 것을 넘어, 'WHO 질병 발병 뉴스(DONs)'라는 특정 정보 소스를 명확히 인지하고, <strong>5분 주기</strong>로 새로운 정보가 있는지 확인할 것을 스스로 계획(스케줄링)합니다. 이는 불필요한 트래픽을 줄이고 핵심 정보에 집중하는 효율성의 시작입니다.
                    </StepDetail>

                    {/* FIX: Moved SpiderIcon to the 'icon' prop as required by StepDetail component. */}
                    <StepDetail icon={<SpiderIcon className="w-8 h-8 text-blue-500"/>} title="2단계: 로봇 에이전트 실행 (Crawling)" tech={['Scrapy', 'Selenium']}>
                        예약된 시간이 되면, 고성능 크롤러(Scrapy)가 WHO 서버에 접속하여 웹페이지의 전체 HTML 코드를 신속하게 가져옵니다. 만약 정보가 동적으로 생성되는(Javascript) 복잡한 구조라면, 가상 브라우저(Selenium)가 직접 페이지를 렌더링하여 인간과 동일한 화면에서 데이터를 추출합니다.
                    </StepDetail>
                    
                    {/* FIX: Moved PipelineIcon to the 'icon' prop as required by StepDetail component. */}
                    <StepDetail icon={<PipelineIcon className="w-8 h-8 text-blue-500"/>} title="3단계: 원시 데이터 스트림화" tech={['Kafka', 'Message Queue']}>
                        추출된 원본 데이터(HTML 덩어리)는 시스템 장애 상황에서도 유실되지 않도록, 즉시 대용량 데이터 파이프라인(Kafka)에 '이벤트' 형태로 적재됩니다. 이는 마치 택배 집하장처럼, 대량의 정보가 들어와도 순서대로 안전하게 다음 단계로 전달되도록 보장하는 핵심 기술입니다.
                    </StepDetail>

                    {/* FIX: Moved Cog6ToothIcon to the 'icon' prop as required by StepDetail component. */}
                    <StepDetail icon={<Cog6ToothIcon className="w-8 h-8 text-blue-500"/>} title="4단계: 의미 단위 추출 및 정제 (Parsing & Preprocessing)" tech={['Python', 'NLP', 'BeautifulSoup']}>
                        데이터 처리 전문 모듈이 Kafka로부터 원본 데이터를 받아, 복잡한 HTML 코드 속에서 제목, 본문, 날짜, 위치와 같은 <strong>의미있는 정보(Semantic Data)</strong>만을 정확히 분리하고 추출합니다. 불필요한 광고, 메뉴 등을 제거하고 AI가 분석하기 가장 좋은 형태로 데이터를 정제합니다.
                    </StepDetail>

                    {/* FIX: Moved DatabaseIcon to the 'icon' prop as required by StepDetail component. */}
                    <StepDetail icon={<DatabaseIcon className="w-8 h-8 text-blue-500"/>} title="5단계: 구조화 및 저장 (Structuring & Storage)" tech={['PostgreSQL', 'AWS S3']}>
                        정제된 데이터는 '제목: ...', '본문: ...' 과 같이 명확한 구조를 가진 정형 데이터(Structured Data)로 변환됩니다. 원본 데이터는 만일의 사태를 대비해 데이터 레이크(AWS S3)에 영구 보관되며, 구조화된 데이터는 AI 검증 모듈로 전달되기 위해 데이터베이스에 임시 저장됩니다.
                    </StepDetail>
                    
                    {/* FIX: Moved BoltIcon to the 'icon' prop as required by StepDetail component. */}
                    <StepDetail icon={<BoltIcon className="w-8 h-8 text-blue-500"/>} title="6단계: 후속 프로세스 트리거링" tech={['Event-Driven Architecture']}>
                        데이터 저장이 완료되는 즉시, 시스템은 "새로운 감염병 정보 수집 완료"라는 신호를 다음 단계인 <strong>AI 검증 파이프라인</strong>으로 보냅니다. 이는 각 모듈이 독립적으로 작동하면서도 유기적으로 연결되는 이벤트 기반 아키텍처(Event-Driven Architecture)의 핵심입니다.
                    </StepDetail>
                    
                     {/* FIX: Moved VisualizeIcon to the 'icon' prop as required by StepDetail component. */}
                     <StepDetail icon={<VisualizeIcon className="w-8 h-8 text-blue-500"/>} title="7단계: 최종 산출 및 활용" tech={['AI Verification', 'GIS Module']}>
                        수집된 구조화된 데이터는 AI의 검증을 거쳐 신뢰도 높은 정보로 재탄생하며, 위치 정보가 포함된 경우 지도 시각화 모듈로 전달되어 사용자가 직관적으로 상황을 파악할 수 있는 최종 결과물로 완성됩니다.
                    </StepDetail>
                </div>

                <hr className="my-8" />

                <h3>GIDS 파이프라인의 핵심 경쟁력</h3>
                <div className="not-prose grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                    <AdvantageCard title="신뢰성 및 무손실 (Reliability)">
                        Kafka 메시지 큐를 통해 네트워크 장애나 특정 모듈의 일시적 오류가 발생하더라도 데이터가 유실되지 않고 안전하게 대기열에 보관되어, 시스템이 복구된 후 순차적으로 처리됩니다.
                    </AdvantageCard>
                    <AdvantageCard title="실시간 처리 (Real-time)">
                        이벤트 기반 아키텍처를 통해 데이터 수집부터 AI 검증까지 전 과정이 파이프라인처럼 막힘없이 흘러가며, 정보 발생과 분석 사이의 지연 시간을 분 단위로 최소화합니다.
                    </AdvantageCard>
                    <AdvantageCard title="확장성 (Scalability)">
                        수집 대상 소스가 수백, 수천 개로 늘어나더라도, 크롤러 워커(Worker)와 처리 모듈을 수평적으로 손쉽게 확장(Scale-out)하여 성능 저하 없이 대규모 데이터를 처리할 수 있습니다.
                    </AdvantageCard>
                     <AdvantageCard title="유연성 및 유지보수 (Flexibility)">
                        각 단계가 독립적인 모듈(마이크로서비스)로 분리되어 있어, 특정 크롤러의 로직이 변경되거나 새로운 데이터 처리 기술을 도입할 때 전체 시스템에 영향을 주지 않고 해당 모듈만 신속하게 수정 및 배포가 가능합니다.
                    </AdvantageCard>
                </div>

            </div>
        </div>
      </div>
    </div>
  );
};

export default EbolaProcessHelpModal;