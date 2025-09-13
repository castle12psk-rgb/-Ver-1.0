import React, { useState, useEffect, useMemo } from 'react';
import { INCOMING_DATA, VERIFIED_DATA } from '../constants';
import { VerificationItem, VerificationStatus } from '../types';
import Card from '../components/Card';
import BrainIcon from '../components/icons/BrainIcon';
import QuestionMarkCircleIcon from '../components/icons/QuestionMarkCircleIcon';
import AIVerificationHelpModal from '../components/AIVerificationHelpModal';
import ReportModal from '../components/ReportModal';

const VerificationResultTag: React.FC<{ result: VerificationStatus }> = ({ result }) => {
  const styles = {
    [VerificationStatus.Fact]: 'bg-green-100 text-green-800',
    [VerificationStatus.Fake]: 'bg-red-100 text-red-800',
    [VerificationStatus.Opinion]: 'bg-gray-100 text-gray-800',
  };
  return <span className={`px-2 py-1 text-sm font-medium rounded-full ${styles[result]}`}>{result}</span>;
};

const VerificationProgress: React.FC<{ item: VerificationItem, onComplete: (item: VerificationItem) => void }> = ({ item, onComplete }) => {
    const [step, setStep] = useState(0);

    const steps = useMemo(() => [
        { name: 'Step 1: 텍스트 분류', duration: 1500, resultKey: 'classificationResult' },
        { name: 'Step 2: RAG 기반 팩트체크', duration: 2000, resultKey: 'ragSummary' },
        { name: 'Step 3: 최종 판정', duration: 1000, resultKey: 'finalResult' },
    ], []);

    useEffect(() => {
        if (step < steps.length) {
            const timer = setTimeout(() => {
                setStep(s => s + 1);
            }, steps[step].duration);
            return () => clearTimeout(timer);
        } else {
            const completionTimer = setTimeout(() => onComplete(item), 1000);
            return () => clearTimeout(completionTimer);
        }
    }, [step, item, onComplete, steps]);

    return (
        <div className="w-full space-y-4">
            <div className="p-4 border border-blue-200 bg-blue-50 rounded-lg">
                <h3 className="font-bold text-blue-800">{item.title}</h3>
                <p className="text-sm text-blue-600 mt-1">{item.snippet}</p>
            </div>
            <div className="space-y-5 pt-2">
                {steps.map((s, index) => (
                    <div key={s.name}>
                        <div className="flex justify-between items-center mb-1">
                            <h4 className={`font-semibold ${step > index ? 'text-green-600' : 'text-gray-700'}`}>{s.name}</h4>
                            {step > index && <span className="text-sm text-green-600">✓ 완료</span>}
                            {step === index && <span className="text-sm text-blue-600 animate-pulse">처리 중...</span>}
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div className={`bg-blue-500 h-2.5 rounded-full ${step > index ? 'w-full' : ''} ${step === index ? 'animate-progress' : ''}`} style={{animationDuration: `${s.duration}ms`}}></div>
                        </div>
                        {step > index && item[s.resultKey as keyof VerificationItem] && (
                            <div className="mt-2 p-2 bg-gray-100 rounded text-sm text-gray-800 animate-fadeIn">
                                <p>{String(item[s.resultKey as keyof VerificationItem])}</p>
                                {s.name === 'Step 3: 최종 판정' && item.finalConfidence && (
                                    <p className="font-semibold text-primary-dark">신뢰도: {item.finalConfidence.toFixed(1)}%</p>
                                )}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

const AIVerificationPage: React.FC = () => {
    const [incoming, setIncoming] = useState<VerificationItem[]>(INCOMING_DATA);
    const [processing, setProcessing] = useState<VerificationItem | null>(null);
    const [verified, setVerified] = useState<VerificationItem[]>(VERIFIED_DATA);
    const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
    const [isReportModalOpen, setIsReportModalOpen] = useState(false);
    const [selectedItemForReport, setSelectedItemForReport] = useState<any | null>(null);


    useEffect(() => {
        if (!processing && incoming.length > 0) {
            const timer = setTimeout(() => {
                const nextItem = incoming[0];
                setIncoming(prev => prev.slice(1));

                // Simulate AI processing data
                nextItem.classificationResult = `분류 결과: 사실(Fact) (초기 신뢰도: 98.7%)`;
                nextItem.ragSummary = '질병청 DB 및 신뢰 기관 소스에서 3개의 근거 문서를 검색하여 교차 검증 완료.';
                nextItem.finalResult = VerificationStatus.Fact;
                nextItem.finalConfidence = 99.1;

                setProcessing(nextItem);
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [incoming, processing]);
    
    const handleVerificationComplete = (item: VerificationItem) => {
        setVerified(prev => [item, ...prev]);
        setProcessing(null);
    };
    
    const handleVerifiedItemClick = (item: VerificationItem) => {
        let risk = '낮음';
        let riskColor = '#D69E2E'; 
        if (item.finalResult === VerificationStatus.Fact) {
            if (item.finalConfidence && item.finalConfidence > 98) {
                risk = '높음';
                riskColor = '#E53E3E';
            } else {
                risk = '중간';
                riskColor = '#DD6B20';
            }
        }

        const reportData = {
            id: item.id,
            name: item.title,
            location: item.source,
            date: new Date().toISOString().slice(0, 10),
            risk: risk,
            riskColor: riskColor,
            summary: `${item.snippet} (AI 최종 신뢰도: ${item.finalConfidence?.toFixed(1)}%)`,
        };
        setSelectedItemForReport(reportData);
        setIsReportModalOpen(true);
    };

    const getRowStyle = (result?: VerificationStatus) => {
        if (!result) return 'bg-white';
        const styles = {
            [VerificationStatus.Fact]: 'bg-green-50 hover:bg-green-100',
            [VerificationStatus.Fake]: 'bg-red-50 hover:bg-red-100',
            [VerificationStatus.Opinion]: 'bg-gray-50 hover:bg-gray-100',
        };
        return styles[result];
    }

    return (
        <>
            {isReportModalOpen && selectedItemForReport && (
                <ReportModal 
                    outbreak={selectedItemForReport} 
                    onClose={() => setIsReportModalOpen(false)} 
                />
            )}
            {isHelpModalOpen && <AIVerificationHelpModal onClose={() => setIsHelpModalOpen(false)} />}
            <div className="space-y-6 h-full flex flex-col">
                <div className="flex items-center gap-3">
                    <h1 className="text-3xl font-bold text-secondary">AI 기반 정보 검증</h1>
                    <button onClick={() => setIsHelpModalOpen(true)} className="text-gray-400 hover:text-primary-light transition-colors" aria-label="도움말 보기">
                        <QuestionMarkCircleIcon className="h-7 w-7" />
                    </button>
                </div>
                <div className="flex-grow grid grid-cols-1 md:grid-cols-3 gap-6">
                    
                    <Card title={`수집된 정보 피드 (${incoming.length})`} bodyClassName="p-4" className="overflow-hidden">
                        <ul className="space-y-3 overflow-y-auto">
                            {incoming.map(item => (
                                <li key={item.id} className="p-3 bg-gray-50 rounded-md border border-gray-200">
                                    <p className="font-semibold text-gray-800">{item.title}</p>
                                    <p className="text-sm text-gray-500">{item.source}</p>
                                </li>
                            ))}
                            {incoming.length === 0 && <p className="text-center text-gray-400 pt-8">피드가 비어있습니다.</p>}
                        </ul>
                    </Card>

                    <Card title="AI 검증 프로세스" bodyClassName="p-6 flex items-center justify-center">
                        {processing ? (
                            <VerificationProgress item={processing} onComplete={handleVerificationComplete} />
                        ) : (
                            <div className="text-center text-gray-500">
                                <BrainIcon className="h-20 w-20 mx-auto text-gray-300 animate-pulse" />
                                <p className="text-lg mt-4">새로운 정보 검증 대기 중...</p>
                                <p className="text-sm">수집된 정보 피드에서 항목을 자동으로 가져옵니다.</p>
                            </div>
                        )}
                    </Card>

                    <Card title="검증 완료" bodyClassName="!p-0" className="overflow-hidden">
                        <div className="overflow-y-auto">
                            <table className="w-full text-sm">
                                <thead className="sticky top-0 bg-gray-50 z-10">
                                    <tr className="text-left text-gray-600">
                                        <th className="p-3">제목/소스</th>
                                        <th className="p-3">결과</th>
                                        <th className="p-3">신뢰도</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {verified.map(item => (
                                        <tr 
                                            key={item.id} 
                                            className={`border-t animate-fadeIn transition-colors duration-300 cursor-pointer ${getRowStyle(item.finalResult)}`}
                                            onClick={() => handleVerifiedItemClick(item)}
                                        >
                                            <td className="p-3 pr-2">
                                                <p className="font-semibold">{item.title}</p>
                                                <p className="text-xs text-gray-500">{item.source}</p>
                                            </td>
                                            <td className="p-3 pr-2">
                                                {item.finalResult && <VerificationResultTag result={item.finalResult} />}
                                            </td>
                                            <td className="p-3 font-medium">{item.finalConfidence?.toFixed(1)}%</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </Card>
                </div>
            </div>
        </>
    );
};

export default AIVerificationPage;