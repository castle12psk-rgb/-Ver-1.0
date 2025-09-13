import React, { useState, useRef, useEffect } from 'react';
import Card from '../components/Card';
import RefreshIcon from '../components/icons/RefreshIcon';
import ReportModal from '../components/ReportModal';
import QuestionMarkCircleIcon from '../components/icons/QuestionMarkCircleIcon';
import VisualizationHelpModal from '../components/VisualizationHelpModal';
import { outbreaks } from '../constants';
import LeafletMap from '../components/LeafletMap';

const diseaseTypes = ['전체', ...Array.from(new Set(outbreaks.map(o => o.name)))];

type RiskLevel = '높음' | '중간' | '낮음';

const VisualizationPage: React.FC = () => {
    const [selectedOutbreak, setSelectedOutbreak] = useState<any>(outbreaks.find(o => o.pulse) || outbreaks[0]);
    const [timelineValue, setTimelineValue] = useState(100);
    const [riskFilters, setRiskFilters] = useState<Record<RiskLevel, boolean>>({
        '높음': true,
        '중간': true,
        '낮음': true,
    });
    const [diseaseFilter, setDiseaseFilter] = useState('전체');
    const [startDate, setStartDate] = useState('2025-08-01');
    const [endDate, setEndDate] = useState('2025-09-13');
    const [isReportModalOpen, setIsReportModalOpen] = useState(false);
    const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
    
    const mapRef = useRef<any>(null);

    useEffect(() => {
        if (mapRef.current && selectedOutbreak) {
            mapRef.current.flyTo([selectedOutbreak.lat, selectedOutbreak.lng], 6);
        }
    }, [selectedOutbreak]);


    const handleRiskFilterChange = (risk: RiskLevel) => {
        setRiskFilters(prev => ({ ...prev, [risk]: !prev[risk] }));
    };

    const baseFilteredOutbreaks = outbreaks
        .filter(o => o.date >= startDate && o.date <= endDate)
        .filter(o => riskFilters[o.risk as RiskLevel])
        .filter(o => diseaseFilter === '전체' || o.name === diseaseFilter);

    const filteredOutbreaks = baseFilteredOutbreaks.slice(0, Math.ceil(baseFilteredOutbreaks.length * (timelineValue / 100)));

    const handleZoom = (direction: 'in' | 'out') => {
        if (mapRef.current) {
            direction === 'in' ? mapRef.current.zoomIn() : mapRef.current.zoomOut();
        }
    };

    const handleReset = () => {
        if (mapRef.current) {
            mapRef.current.setView([20, 30], 2);
        }
    };

    return (
        <>
            {isHelpModalOpen && <VisualizationHelpModal onClose={() => setIsHelpModalOpen(false)} />}
            {isReportModalOpen && selectedOutbreak && (
                <ReportModal outbreak={selectedOutbreak} onClose={() => setIsReportModalOpen(false)} />
            )}
            <div className="h-full flex flex-col">
                <div className="flex items-center gap-3 mb-6">
                    <h1 className="text-3xl font-bold text-secondary">직관적 시각화 플랫폼</h1>
                    <button onClick={() => setIsHelpModalOpen(true)} className="text-gray-400 hover:text-primary-light transition-colors" aria-label="도움말 보기">
                        <QuestionMarkCircleIcon className="h-7 w-7" />
                    </button>
                </div>
                <div className="flex-grow flex gap-6">
                    {/* Side Panel */}
                    <div className="w-1/4 flex flex-col gap-6">
                        <Card title="필터 및 옵션">
                            <form className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">기간</label>
                                    <div className="grid grid-cols-2 gap-2 mt-1">
                                        <input type="date" className="w-full border-gray-300 rounded-md shadow-sm p-2" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                                        <input type="date" className="w-full border-gray-300 rounded-md shadow-sm p-2" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">감염병 종류</label>
                                    <select 
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2"
                                        value={diseaseFilter}
                                        onChange={(e) => setDiseaseFilter(e.target.value)}
                                    >
                                        {diseaseTypes.map(type => (
                                            <option key={type} value={type}>{type}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                   <label className="block text-sm font-medium text-gray-700">위험 등급</label>
                                   <div className="flex space-x-4 mt-2">
                                       {(['높음', '중간', '낮음'] as RiskLevel[]).map(risk => (
                                           <label key={risk} className="flex items-center">
                                               <input 
                                                   type="checkbox" 
                                                   className="h-4 w-4 rounded border-gray-300 text-accent focus:ring-accent mr-2" 
                                                   checked={riskFilters[risk]}
                                                   onChange={() => handleRiskFilterChange(risk)}
                                               /> 
                                               {risk}
                                           </label>
                                       ))}
                                   </div>
                                </div>
                            </form>
                        </Card>
                        <Card title="최근 이벤트" bodyClassName="p-4">
                             <ul className="space-y-2 overflow-y-auto">
                                {[...outbreaks].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).map(o => (
                                    <li key={o.id} onClick={() => setSelectedOutbreak(o)} className={`p-2 rounded cursor-pointer border-l-4 transition-colors ${selectedOutbreak?.id === o.id ? 'bg-blue-100 border-blue-500' : 'bg-gray-50 hover:bg-blue-100 border-transparent hover:border-blue-500'}`}>
                                        <p className="font-semibold">{o.name} - <span style={{color: o.riskColor}}>{o.risk}</span></p>
                                        <p className="text-sm text-gray-600">{o.location}</p>
                                    </li>
                                ))}
                             </ul>
                        </Card>
                    </div>

                    {/* Main Map View */}
                    <div className="w-3/4">
                        <Card className="h-full" bodyClassName="!p-0 relative overflow-hidden">
                             <LeafletMap
                                outbreaks={filteredOutbreaks}
                                onMarkerClick={setSelectedOutbreak}
                                selectedOutbreak={selectedOutbreak}
                                onMapReady={(map) => { mapRef.current = map; }}
                                center={[20, 30]}
                                zoom={2}
                            />

                            {/* Overlays */}
                            <div className="absolute top-4 right-4 z-10 flex flex-col items-center gap-1 bg-white/80 backdrop-blur-sm p-1.5 rounded-lg shadow-lg" style={{ zIndex: 1000 }}>
                                <button onClick={() => handleZoom('in')} className="w-8 h-8 flex items-center justify-center text-xl font-bold rounded bg-gray-100 hover:bg-gray-200 transition-colors" aria-label="Zoom In">+</button>
                                <button onClick={() => handleZoom('out')} className="w-8 h-8 flex items-center justify-center text-xl font-bold rounded bg-gray-100 hover:bg-gray-200 transition-colors" aria-label="Zoom Out">-</button>
                                <button onClick={handleReset} className="w-8 h-8 flex items-center justify-center rounded bg-gray-100 hover:bg-gray-200 transition-colors mt-1" aria-label="Reset View"><RefreshIcon className="w-5 h-5"/></button>
                            </div>
                            
                            <div className="absolute bottom-4 right-4 bg-white/80 backdrop-blur-sm p-3 rounded-lg shadow-lg" style={{ zIndex: 1000 }}>
                                <h4 className="font-semibold mb-2">위험 등급</h4>
                                <ul className="space-y-1 text-sm">
                                    <li className="flex items-center"><div className="w-4 h-4 rounded-full" style={{backgroundColor: '#E53E3E'}}></div><span className="ml-2">높음</span></li>
                                    <li className="flex items-center"><div className="w-4 h-4 rounded-full" style={{backgroundColor: '#DD6B20'}}></div><span className="ml-2">중간</span></li>
                                    <li className="flex items-center"><div className="w-4 h-4 rounded-full" style={{backgroundColor: '#D69E2E'}}></div><span className="ml-2">낮음</span></li>
                                </ul>
                            </div>
                            
                            {selectedOutbreak && (
                                 <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow-2xl w-96 animate-fadeIn" style={{ zIndex: 1000 }}
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <div className="flex justify-between items-center mb-2 border-b pb-2">
                                         <h3 className="text-lg font-bold">{selectedOutbreak.name}</h3>
                                         <button onClick={() => setSelectedOutbreak(null)} className="text-gray-400 hover:text-gray-800 text-2xl font-bold">&times;</button>
                                    </div>
                                    <ul className="text-sm space-y-2">
                                        <li><strong>위치:</strong> {selectedOutbreak.location}</li>
                                        <li><strong>최초 보고일:</strong> {selectedOutbreak.date}</li>
                                        <li><strong>위험 등급:</strong> <span className="font-bold" style={{color: selectedOutbreak.riskColor}}>{selectedOutbreak.risk}</span></li>
                                        <li><strong>개요:</strong> {selectedOutbreak.summary}</li>
                                        <li><strong>정보 출처:</strong> <a href="#" className="text-blue-500 hover:underline">WHO</a>, <a href="#" className="text-blue-500 hover:underline">Local CDC</a></li>
                                    </ul>
                                    <button onClick={() => setIsReportModalOpen(true)} className="mt-4 w-full bg-primary-dark text-white py-2 rounded-md hover:bg-primary-light transition-colors">상세 보고서 보기</button>
                                </div>
                            )}
                            
                            <div className="absolute bottom-4 left-4 right-1/3 bg-white/80 backdrop-blur-sm p-3 rounded-lg shadow-lg" style={{ zIndex: 1000 }}>
                                <label htmlFor="timeline" className="block text-sm font-medium text-gray-700 mb-1">이벤트 타임라인 ({filteredOutbreaks.length}/{baseFilteredOutbreaks.length})</label>
                                <input id="timeline" type="range" min="1" max="100" value={timelineValue} onChange={(e) => setTimelineValue(parseInt(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" />
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </>
    );
};

export default VisualizationPage;