import React, { useState } from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import Card from './Card';
import UserGroupIcon from './icons/UserGroupIcon';
import BiohazardIcon from './icons/BiohazardIcon';
import TrendingUpIcon from './icons/TrendingUpIcon';
import LightBulbIcon from './icons/LightBulbIcon';
import DownloadIcon from './icons/DownloadIcon';
import ShareIcon from './icons/ShareIcon';
import MinusIcon from './icons/MinusIcon';
import WindowIcon from './icons/WindowIcon';
import Square2StackIcon from './icons/Square2StackIcon';
import XMarkIcon from './icons/XMarkIcon';

interface ReportModalProps {
  outbreak: any;
  onClose: () => void;
}

const trendData = [
    { name: 'Week 1', cases: 120 },
    { name: 'Week 2', cases: 250 },
    { name: 'Week 3', cases: 480 },
    { name: 'Week 4', cases: 990 },
    { name: 'Current', cases: 1287 },
];

const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: any[]; label?: string | number; }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 rounded-md shadow-lg border border-gray-200">
          <p className="font-semibold">{`${label}`}</p>
          <p className="text-sm text-blue-600">{`New Cases: ${payload[0].value}`}</p>
        </div>
      );
    }
    return null;
  };

const ReportModal: React.FC<ReportModalProps> = ({ outbreak, onClose }) => {
  const [modalState, setModalState] = useState<'normal' | 'maximized' | 'minimized'>('normal');

  if (!outbreak) return null;

  const handleToggleMaximize = (e: React.MouseEvent) => {
    e.stopPropagation();
    setModalState(prev => (prev === 'maximized' ? 'normal' : 'maximized'));
  };

  const handleMinimize = (e: React.MouseEvent) => {
    e.stopPropagation();
    setModalState('minimized');
  };

  const handleInternalClose = (e: React.MouseEvent) => {
      e.stopPropagation();
      setModalState('normal'); // Reset state before closing
      onClose();
  }

  const handleRestore = () => {
    setModalState('normal');
  };
  
  const wrapperClasses = {
    normal: "w-full max-w-4xl max-h-[90vh]",
    maximized: "w-screen h-screen rounded-none",
    minimized: "w-96 fixed bottom-4 right-4 animate-fadeInUp cursor-pointer",
  };
  
  const modalRootClasses = `
    fixed inset-0 bg-black bg-opacity-60 z-[1001]
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
        {/* Header */}
        <div className="p-4 border-b bg-white flex-shrink-0 flex justify-between items-center">
          <h2 className={`font-bold text-primary-dark pr-4 truncate ${modalState !== 'minimized' ? 'text-2xl' : 'text-lg'}`}>
            {modalState !== 'minimized' ? `${outbreak.name} 상세 보고서` : outbreak.name}
          </h2>
           <div className="flex items-center gap-1 flex-shrink-0">
              {modalState !== 'minimized' ? (
                <>
                  <button onClick={handleMinimize} className="p-2 rounded-full text-gray-500 hover:bg-gray-200 hover:text-gray-900 transition-colors"><MinusIcon className="w-5 h-5"/></button>
                  <button onClick={handleToggleMaximize} className="p-2 rounded-full text-gray-500 hover:bg-gray-200 hover:text-gray-900 transition-colors">
                    {modalState === 'maximized' ? <Square2StackIcon className="w-5 h-5" /> : <WindowIcon className="w-5 h-5" />}
                  </button>
                  <button onClick={handleInternalClose} className="p-2 rounded-full text-gray-500 hover:bg-gray-200 hover:text-gray-900 transition-colors"><XMarkIcon className="w-5 h-5" /></button>
                </>
              ) : (
                <button onClick={handleInternalClose} className="p-1 rounded-full text-gray-500 hover:bg-gray-200 hover:text-gray-900 transition-colors"><XMarkIcon className="w-4 h-4" /></button>
              )}
            </div>
        </div>
        
        {modalState !== 'minimized' && (
          <>
            {/* Content */}
            <div className="p-6 overflow-y-auto space-y-6">
                {/* Summary Card */}
                <Card>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <ul className="text-base space-y-3">
                                <li><strong>위치:</strong> {outbreak.location}</li>
                                <li><strong>최초 보고일:</strong> {outbreak.date}</li>
                                <li><strong>위험 등급:</strong> <span className="font-bold px-2 py-0.5 rounded-full text-white" style={{backgroundColor: outbreak.riskColor}}>{outbreak.risk}</span></li>
                                <li><strong>정보 출처:</strong> <a href="#" className="text-blue-500 hover:underline">WHO</a>, <a href="#" className="text-blue-500 hover:underline">Local CDC</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-2">개요</h4>
                            <p className="text-gray-700">{outbreak.summary}</p>
                        </div>
                    </div>
                </Card>

                {/* Key Metrics */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <Card bodyClassName="!p-4 text-center"><UserGroupIcon className="h-8 w-8 mx-auto text-blue-500"/><h4 className="text-gray-500 text-sm mt-2">확진자</h4><p className="text-2xl font-bold">1,287</p></Card>
                    <Card bodyClassName="!p-4 text-center"><BiohazardIcon className="h-8 w-8 mx-auto text-red-500"/><h4 className="text-gray-500 text-sm mt-2">사망자</h4><p className="text-2xl font-bold">42</p></Card>
                    <Card bodyClassName="!p-4 text-center"><span className="text-3xl font-bold text-yellow-600">%</span><h4 className="text-gray-500 text-sm">치명률</h4><p className="text-2xl font-bold">3.26%</p></Card>
                    <Card bodyClassName="!p-4 text-center"><TrendingUpIcon className="h-8 w-8 mx-auto text-green-500"/><h4 className="text-gray-500 text-sm mt-2">전파율 (R0)</h4><p className="text-2xl font-bold">1.8</p></Card>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Trend Chart */}
                    <Card title="시간별 발생 추이">
                        <ResponsiveContainer width="100%" height={250}>
                            <LineChart data={trendData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip content={<CustomTooltip />} />
                                <Line type="monotone" dataKey="cases" stroke="#0D47A1" strokeWidth={3} name="신규 확진" dot={{ r: 5 }} activeDot={{ r: 8 }}/>
                            </LineChart>
                        </ResponsiveContainer>
                    </Card>
                    
                    {/* AI Analysis */}
                    <Card title="AI 분석 및 권고 사항" className="bg-blue-50 border border-blue-200">
                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <LightBulbIcon className="h-8 w-8 text-yellow-500 flex-shrink-0 mt-1" />
                                <div>
                                    <h4 className="font-bold text-blue-800">AI 예측</h4>
                                    <p className="text-blue-700">2주 내 인접 지역(상파울루, 미나스제라이스)으로 확산될 가능성 <strong>75%</strong>.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-green-600 flex-shrink-0 mt-1">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <div>
                                    <h4 className="font-bold text-green-800">권고 사항</h4>
                                    <ul className="list-disc list-inside text-green-700">
                                        <li>리우데자네이루 지역 여행 경보 <strong>'경고'</strong> 단계로 상향.</li>
                                        <li>모기 방제 및 위생 캠페인 강화 필요.</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>

            {/* Footer */}
            <div className="p-4 border-t bg-white flex-shrink-0 flex justify-end gap-3">
                <button className="flex items-center gap-2 bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 transition-colors">
                    <ShareIcon className="h-5 w-5" />
                    공유
                </button>
                <button className="flex items-center gap-2 bg-primary-dark text-white px-4 py-2 rounded-md hover:bg-primary-light transition-colors">
                    <DownloadIcon className="h-5 w-5" />
                    보고서 다운로드 (PDF)
                </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ReportModal;