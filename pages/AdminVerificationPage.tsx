import React, { useState } from 'react';
import Card from '../components/Card';
import { REVIEW_DATA, KNOWLEDGE_BASE_DATA, RULES_DATA } from '../constants';
import { VerificationItem, VerificationStatus, KnowledgeBaseItem, VerificationRule } from '../types';
import ReviewModal from '../components/ReviewModal';
import PencilSquareIcon from '../components/icons/PencilSquareIcon';
import ClipboardDocumentCheckIcon from '../components/icons/ClipboardDocumentCheckIcon';
import AcademicCapIcon from '../components/icons/AcademicCapIcon';
import CircleStackIcon from '../components/icons/CircleStackIcon';
import ArrowPathIcon from '../components/icons/ArrowPathIcon';

const StatusTag: React.FC<{ status: VerificationStatus }> = ({ status }) => {
  const styles = {
    [VerificationStatus.Fact]: 'bg-green-100 text-green-800',
    [VerificationStatus.Fake]: 'bg-red-100 text-red-800',
    [VerificationStatus.Opinion]: 'bg-gray-100 text-gray-800',
    [VerificationStatus.Review]: 'bg-yellow-100 text-yellow-800',
  };
  return <span className={`px-2 py-1 text-xs font-medium rounded-full ${styles[status]}`}>{status}</span>;
};


const AdminVerificationPage: React.FC = () => {
    const [reviewItems, setReviewItems] = useState<VerificationItem[]>(REVIEW_DATA);
    const [selectedItem, setSelectedItem] = useState<VerificationItem | null>(null);
    const [knowledgeBase, setKnowledgeBase] = useState<KnowledgeBaseItem[]>(KNOWLEDGE_BASE_DATA);
    const [rules, setRules] = useState<VerificationRule[]>(RULES_DATA);
    const [confidenceThreshold, setConfidenceThreshold] = useState(60);
    const [isIndexing, setIsIndexing] = useState(false);

    const handleUpdateStatus = (id: number, status: VerificationStatus) => {
        setReviewItems(prev => prev.filter(item => item.id !== id));
        setSelectedItem(null);
    };

    const handleReindex = () => {
        setIsIndexing(true);
        setKnowledgeBase(prev => prev.map(kb => ({ ...kb, status: 'Indexing...' })));
        setTimeout(() => {
            setKnowledgeBase(prev => prev.map(kb => ({ ...kb, status: 'Active', lastUpdated: new Date().toLocaleString() })));
            setIsIndexing(false);
        }, 5000);
    };
    
    const handleRuleToggle = (id: number) => {
        setRules(prev => prev.map(rule => rule.id === id ? { ...rule, isEnabled: !rule.isEnabled } : rule));
    };

    const needsReviewCount = reviewItems.length;
    const knowledgeBaseDocCount = knowledgeBase.reduce((sum, item) => sum + item.documents, 0);

    return (
        <>
        {selectedItem && (
            <ReviewModal 
                item={selectedItem}
                onClose={() => setSelectedItem(null)}
                onUpdate={handleUpdateStatus}
            />
        )}
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-secondary">AI 검증 관리</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card bodyClassName="flex items-center justify-between p-4">
                    <div>
                        <h3 className="text-gray-500">수동 검토 대기 건수</h3>
                        <p className="text-3xl font-bold mt-2 text-yellow-600">{needsReviewCount}</p>
                    </div>
                    <ClipboardDocumentCheckIcon className="h-10 w-10 text-yellow-400" />
                </Card>
                <Card bodyClassName="flex items-center justify-between p-4">
                    <div>
                        <h3 className="text-gray-500">AI 정확도 (24h)</h3>
                        <p className="text-3xl font-bold mt-2 text-green-600">99.2%</p>
                    </div>
                    <AcademicCapIcon className="h-10 w-10 text-green-400" />
                </Card>
                <Card bodyClassName="flex items-center justify-between p-4">
                    <div>
                        <h3 className="text-gray-500">지식 베이스 문서 수</h3>
                        <p className="text-3xl font-bold mt-2">{knowledgeBaseDocCount.toLocaleString()}</p>
                    </div>
                    <CircleStackIcon className="h-10 w-10 text-blue-400" />
                </Card>
            </div>
            
            <Card title="수동 검토 대기 목록" bodyClassName="!p-0">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="p-4">제목</th>
                                <th className="p-4">소스</th>
                                <th className="p-4">AI 신뢰도</th>
                                <th className="p-4">상태</th>
                                <th className="p-4 text-center">작업</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {reviewItems.map(item => (
                                <tr key={item.id} className="hover:bg-gray-50">
                                    <td className="p-4 font-medium max-w-sm truncate">{item.title}</td>
                                    <td className="p-4 text-gray-600">{item.source}</td>
                                    <td className="p-4">
                                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                                            <div 
                                                className={`h-2.5 rounded-full ${item.aiConfidence > 80 ? 'bg-green-500' : item.aiConfidence > 60 ? 'bg-yellow-400' : 'bg-red-500'}`} 
                                                style={{width: `${item.aiConfidence}%`}}>
                                            </div>
                                        </div>
                                        <span className="text-xs">{item.aiConfidence.toFixed(1)}%</span>
                                    </td>
                                    <td className="p-4"><StatusTag status={item.status} /></td>
                                    <td className="p-4 text-center">
                                        <button onClick={() => setSelectedItem(item)} className="flex items-center gap-2 mx-auto bg-blue-100 text-blue-700 px-3 py-1 rounded-md text-sm hover:bg-blue-200 transition-colors">
                                           <PencilSquareIcon className="h-4 w-4" /> 검토
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                    <div className="flex justify-between items-center mb-4 pb-4 border-b">
                        <h2 className="text-xl font-semibold text-secondary">지식 베이스 관리 (RAG 소스)</h2>
                        <button onClick={handleReindex} disabled={isIndexing} className="flex items-center gap-2 bg-indigo-100 text-indigo-700 px-3 py-1 rounded-md text-sm hover:bg-indigo-200 disabled:bg-gray-200 disabled:text-gray-500 transition-colors">
                            <ArrowPathIcon className={`h-4 w-4 ${isIndexing ? 'animate-spin' : ''}`} />
                            {isIndexing ? '인덱싱 중...' : '전체 재인덱싱'}
                        </button>
                    </div>
                    <ul className="space-y-3">
                        {knowledgeBase.map(kb => (
                            <li key={kb.id} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                                <div>
                                    <span className="font-medium">{kb.source}</span>
                                    <span className="text-xs text-gray-500 ml-2">({kb.documents.toLocaleString()} 문서)</span>
                                </div>
                                <div className="text-right">
                                     <span className={`flex items-center text-xs font-medium ${kb.status === 'Active' ? 'text-green-600' : 'text-blue-600'}`}>
                                        {kb.status === 'Active' ? <div className="w-2 h-2 bg-green-500 rounded-full mr-1.5"></div> : <div className="w-2 h-2 bg-blue-500 rounded-full mr-1.5 animate-pulse"></div>}
                                        {kb.status}
                                    </span>
                                    <span className="text-xs text-gray-400">최근 업데이트: {kb.lastUpdated}</span>
                                </div>
                            </li>
                        ))}
                    </ul>
                </Card>
                <Card>
                    <h2 className="text-xl font-semibold text-secondary mb-4 pb-4 border-b">AI 모델 및 규칙 설정</h2>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="confidence-slider" className="block text-sm font-medium text-gray-700 mb-1">수동 검토 신뢰도 임계값: <span className="font-bold text-blue-600">{confidenceThreshold}%</span></label>
                            <input id="confidence-slider" type="range" min="30" max="90" value={confidenceThreshold} onChange={(e) => setConfidenceThreshold(Number(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" />
                            <p className="text-xs text-gray-500 mt-1">AI 신뢰도가 이 값보다 낮으면 자동으로 '수동 검토' 목록으로 이동합니다.</p>
                        </div>
                        <div>
                             <h4 className="text-sm font-medium text-gray-700 mb-2">활성 검증 규칙</h4>
                             <ul className="space-y-2">
                                {rules.map(rule => (
                                    <li key={rule.id} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                                        <span className="text-sm">{rule.name}</span>
                                        <label className="flex items-center cursor-pointer">
                                            <div className="relative">
                                                <input type="checkbox" className="sr-only" checked={rule.isEnabled} onChange={() => handleRuleToggle(rule.id)} />
                                                <div className="block bg-gray-300 w-10 h-5 rounded-full"></div>
                                                <div className={`dot absolute left-1 top-0.5 bg-white w-4 h-4 rounded-full transition-transform ${rule.isEnabled ? 'transform translate-x-5' : ''}`}></div>
                                            </div>
                                        </label>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
        <style>{`
            input[type=checkbox]:checked + div > .dot {
                background-color: #48bb78; /* green-400 */
            }
            input[type=checkbox]:checked + div {
                background-color: #a7f3d0; /* green-200 */
            }
        `}</style>
        </>
    );
};

export default AdminVerificationPage;