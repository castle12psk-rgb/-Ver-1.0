import React, { useState, useEffect } from 'react';
import XMarkIcon from './icons/XMarkIcon';
import BoltIcon from './icons/BoltIcon';
import BrainIcon from './icons/BrainIcon';
import FilterIcon from './icons/FilterIcon';
import UserShieldIcon from './icons/UserShieldIcon';
import CheckCircleIcon from './icons/CheckCircleIcon';
// FIX: Add missing import for Cog6ToothIcon
import Cog6ToothIcon from './icons/Cog6ToothIcon';

interface DeidentificationHelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AdvantageCard: React.FC<{ title: string, children: React.ReactNode }> = ({ title, children }) => (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <h5 className="font-semibold text-green-700 flex items-center gap-2">
            <CheckCircleIcon className="w-5 h-5 text-green-500" />
            {title}
        </h5>
        <p className="text-sm text-gray-600 mt-1">{children}</p>
    </div>
);

const DeidentificationHelpModal: React.FC<DeidentificationHelpModalProps> = ({ isOpen, onClose }) => {
    const sampleText = "담당자 홍길동(주민번호: 850101-1234567)은 010-1234-5678 번호로 연락 바랍니다. 이메일은 gildong@gids.or.kr 입니다. The lead researcher is John Smith.";
    const [inputText, setInputText] = useState(sampleText);
    const [outputText, setOutputText] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);

    useEffect(() => {
        if (!isOpen) {
            setInputText(sampleText);
            setOutputText('');
        }
    }, [isOpen, sampleText]);

    const handleDeidentify = () => {
        setIsProcessing(true);
        setOutputText('');
        
        // Simulate processing delay
        setTimeout(() => {
            let processed = inputText;
            // Simple regex for demo purposes
            processed = processed.replace(/홍길동/g, '[PERSON]');
            processed = processed.replace(/John Smith/g, '[PERSON]');
            processed = processed.replace(/\d{6}-\d{7}/g, '[RRN]');
            processed = processed.replace(/\d{3}-\d{4}-\d{4}/g, '[PHONE]');
            processed = processed.replace(/[\w\.-]+@[\w\.-]+\.\w+/g, '[EMAIL]');
            
            setOutputText(processed);
            setIsProcessing(false);
        }, 1500);
    };

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
                <UserShieldIcon className="w-6 h-6"/>
                GIDS 개인정보보호 기술 심층 분석
            </h2>
          <button onClick={onClose} className="p-2 rounded-full text-gray-400 hover:text-gray-800 hover:bg-gray-100 transition-colors">
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>
        
        <div className="p-8 overflow-y-auto flex-grow custom-scrollbar">
            <div className="prose max-w-none">
                <h3 className="text-center">AI의 눈을 가려 핵심 정보만 학습시키다</h3>
                <p className="text-center text-lg text-gray-600 leading-relaxed">
                    GIDS는 AI의 강력한 분석 능력을 활용하는 동시에, <strong>개인정보보호법(PIPA) 준수와 윤리적 데이터 처리</strong>를 최우선 가치로 삼습니다. 개인정보 비식별화 모듈은 수집된 원본 텍스트에서 이름, 연락처 등 민감 정보를 AI 모델에 전달하기 전에 완벽하게 제거하고 마스킹하는 GIDS의 핵심 보안 게이트웨이입니다.
                </p>

                <div className="not-prose mt-8 p-6 bg-white rounded-xl border shadow-lg">
                    <h4 className="text-lg font-semibold text-center text-secondary mb-4">비식별화 프로토타입 체험</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                        <div>
                            <label htmlFor="inputText" className="text-sm font-medium text-gray-700">1. 원본 텍스트 입력</label>
                            <textarea
                                id="inputText"
                                rows={5}
                                value={inputText}
                                onChange={(e) => setInputText(e.target.value)}
                                className="w-full mt-1 p-2 border rounded-md font-mono text-sm shadow-inner"
                            />
                        </div>
                        <div className="flex flex-col items-center justify-center h-full">
                             <button onClick={handleDeidentify} disabled={isProcessing} className="flex items-center gap-2 bg-primary-dark text-white px-4 py-2 rounded-md hover:bg-primary-light disabled:bg-gray-400 transition-all duration-300 transform hover:scale-105">
                                <BoltIcon className={`w-5 h-5 ${isProcessing ? 'animate-spin' : ''}`} />
                                {isProcessing ? '처리 중...' : '비식별화 실행'}
                            </button>
                        </div>
                    </div>
                    <div className="mt-4">
                        <label className="text-sm font-medium text-gray-700">2. 비식별화 처리 결과</label>
                        <div className="w-full mt-1 p-2 border rounded-md bg-gray-100 min-h-[110px] font-mono text-sm text-red-600 shadow-inner">
                            {isProcessing ? (
                                <div className="flex items-center justify-center h-full text-gray-500">
                                    <Cog6ToothIcon className="w-6 h-6 animate-spin mr-2"/> 처리 중입니다...
                                </div>
                            ) : (
                                outputText.split(/(\[.*?\])/).map((part, index) => 
                                    part.startsWith('[') && part.endsWith(']') ? 
                                    <strong key={index} className="bg-yellow-200 px-1 py-0.5 rounded">{part}</strong> : 
                                    <span key={index} className="text-gray-800">{part}</span>
                                )
                            )}
                        </div>
                    </div>
                </div>

                <hr className="my-8" />
                
                <h3>하이브리드 비식별화 프로세스 (Hybrid Process)</h3>
                <p>GIDS는 단일 기술의 한계를 극복하고 99.9% 이상의 탐지 정확도를 달성하기 위해, AI 모델과 규칙 기반 필터를 결합한 하이브리드 방식을 사용합니다.</p>
                <div className="not-prose grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 text-center">
                    <div className="p-4 bg-white rounded-lg shadow-md border">
                        <BrainIcon className="w-10 h-10 mx-auto text-blue-500"/>
                        <h5 className="font-bold mt-2">1단계: AI 기반 다국어 개체명 인식 (Multilingual NER)</h5>
                        <p className="text-xs text-gray-600 mt-1">100개 이상의 언어에 대해 사전 학습된 <strong>XLM-RoBERTa 모델</strong>이 문맥을 이해하여 'John Smith', '홍길동', '田中 太郎' 등 전 세계 다양한 언어의 인명, 기관명 등을 정확하게 탐지합니다.</p>
                    </div>
                     <div className="p-4 bg-white rounded-lg shadow-md border">
                        <FilterIcon className="w-10 h-10 mx-auto text-teal-500"/>
                        <h5 className="font-bold mt-2">2단계: 패턴 기반 필터링 (Regex)</h5>
                        <p className="text-xs text-gray-600 mt-1">주민등록번호, 전화번호, 이메일 등 국가별로 상이한 형식을 가진 개인정보는 <strong>정규표현식(Regex)</strong>으로 한 번 더 필터링하여 AI가 놓칠 수 있는 부분을 보완합니다.</p>
                    </div>
                     <div className="p-4 bg-white rounded-lg shadow-md border">
                        <UserShieldIcon className="w-10 h-10 mx-auto text-green-500"/>
                        <h5 className="font-bold mt-2">3단계: 안전한 마스킹 및 감사</h5>
                        <p className="text-xs text-gray-600 mt-1">탐지된 모든 개인정보는 `[PERSON]`, `[PHONE]` 등 안전한 태그로 대체(마스킹)되며, 모든 비식별화 과정은 <strong>보안 감사 로그</strong>로 기록되어 추적 가능성을 보장합니다.</p>
                    </div>
                </div>

                <hr className="my-8" />

                <h3>GIDS 비식별화 기술의 핵심 경쟁력</h3>
                <div className="not-prose grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                    <AdvantageCard title="법규 준수 및 데이터 주권 확보">
                        개인정보보호법(PIPA) 및 GDPR 등 국내외 주요 데이터 규제를 완벽하게 준수하여 법적 리스크를 원천 차단하고, 기관의 데이터 주권을 보호합니다.
                    </AdvantageCard>
                    <AdvantageCard title="탐지 정확도 극대화">
                        강력한 다국어 AI 모델의 문맥 이해 능력과 정규표현식의 정밀함을 결합한 하이브리드 방식으로, 글로벌 데이터 소스 전반에 걸쳐 높은 신뢰도를 보장합니다.
                    </AdvantageCard>
                    <AdvantageCard title="윤리적 AI 모델 개발">
                        AI 모델 학습 데이터에서 개인정보를 사전에 완벽히 제거함으로써, 모델이 민감 정보를 학습하거나 실수로 외부에 노출할 가능성을 원천적으로 차단하는 윤리적 AI를 실현합니다.
                    </AdvantageCard>
                     <AdvantageCard title="실시간 파이프라인 통합">
                        경량화된 모델과 최적화된 코드를 통해, 전체 데이터 처리 파이프라인의 성능 저하 없이 실시간으로 대용량 데이터에 대한 비식별화 작업 수행이 가능합니다.
                    </AdvantageCard>
                </div>

            </div>
        </div>
      </div>
    </div>
  );
};

export default DeidentificationHelpModal;