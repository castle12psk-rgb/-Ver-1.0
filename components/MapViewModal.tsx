import React, { useState, useRef, useEffect } from 'react';
import RefreshIcon from './icons/RefreshIcon';
import XMarkIcon from './icons/XMarkIcon';
import { outbreaks, RISK_LEVEL_COLORS } from '../constants';
import LeafletMap from './LeafletMap';
import MinusIcon from './icons/MinusIcon';
import WindowIcon from './icons/WindowIcon';
import Square2StackIcon from './icons/Square2StackIcon';

interface MapViewModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const diseaseTypes = ['전체', ...Array.from(new Set(outbreaks.map(o => o.name)))];
type RiskLevel = '높음' | '중간' | '낮음';
const riskLevels: RiskLevel[] = ['높음', '중간', '낮음'];

const MapViewModal: React.FC<MapViewModalProps> = ({ isOpen, onClose }) => {
    const [modalState, setModalState] = useState<'normal' | 'maximized' | 'minimized'>('maximized');
    const [preMinimizeState, setPreMinimizeState] = useState<'normal' | 'maximized'>('maximized');

    const [selectedOutbreak, setSelectedOutbreak] = useState<any>(null);
    const mapRef = useRef<any>(null);

    // Filter states
    const [riskFilters, setRiskFilters] = useState<Record<RiskLevel, boolean>>({
        '높음': true,
        '중간': true,
        '낮음': true,
    });
    const [diseaseFilter, setDiseaseFilter] = useState('전체');

    // Logic to apply filters
    const filteredOutbreaks = outbreaks
        .filter(o => riskFilters[o.risk as RiskLevel])
        .filter(o => diseaseFilter === '전체' || o.name === diseaseFilter);
    
    const handleRiskFilterChange = (risk: RiskLevel) => {
        setRiskFilters(prev => ({ ...prev, [risk]: !prev[risk] }));
    };

    useEffect(() => {
        if (isOpen && mapRef.current && modalState !== 'minimized') {
            // A short delay to allow the map to properly initialize and resize after modal animation
            setTimeout(() => {
                mapRef.current.invalidateSize();
                if (selectedOutbreak) {
                    mapRef.current.flyTo([selectedOutbreak.lat, selectedOutbreak.lng], 7);
                } else {
                    mapRef.current.setView([20, 30], 2);
                }
            }, 350);
        }
    }, [selectedOutbreak, isOpen, modalState]);

    useEffect(() => {
        if (!isOpen) {
            // Reset modal state when it's closed from the outside
            setTimeout(() => {
                setModalState('maximized');
                setPreMinimizeState('maximized');
                setSelectedOutbreak(null); // Reset selection on close
            }, 300); // delay to allow closing animation
        }
    }, [isOpen]);

    if (!isOpen) {
        return null;
    }

    const handleToggleMaximize = (e: React.MouseEvent) => {
        e.stopPropagation();
        setModalState(prev => (prev === 'maximized' ? 'normal' : 'maximized'));
        setTimeout(() => mapRef.current?.invalidateSize(), 350);
    };

    const handleMinimize = (e: React.MouseEvent) => {
        e.stopPropagation();
        setPreMinimizeState(modalState === 'maximized' ? 'maximized' : 'normal');
        setModalState('minimized');
    };

    const handleInternalClose = (e: React.MouseEvent) => {
        e.stopPropagation();
        onClose();
    };

    const handleRestore = () => {
        setModalState(preMinimizeState);
        setTimeout(() => mapRef.current?.invalidateSize(), 350);
    };

    const handleZoom = (direction: 'in' | 'out') => {
        if (mapRef.current) {
            direction === 'in' ? mapRef.current.zoomIn() : mapRef.current.zoomOut();
        }
    };

    const handleReset = () => {
        if (mapRef.current) {
            setSelectedOutbreak(null);
            mapRef.current.setView([20, 30], 2);
        }
    };

    const wrapperClasses = {
        normal: "w-full max-w-6xl h-[90vh]",
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
                className={`bg-gray-100 rounded-xl shadow-2xl flex flex-col overflow-hidden transition-all duration-300 ${wrapperClasses[modalState]} ${modalState === 'minimized' ? 'pointer-events-auto' : ''}`} 
                onClick={modalState === 'minimized' ? handleRestore : e => e.stopPropagation()}
            >
                {/* Header */}
                <div className="p-4 border-b bg-white flex-shrink-0 flex justify-between items-center">
                    <h2 className={`font-bold text-primary-dark pr-4 truncate ${modalState !== 'minimized' ? 'text-2xl' : 'text-lg'}`}>
                       {modalState !== 'minimized' ? '실시간 감염병 지도 현황 (Map View)' : 'Map View'}
                    </h2>
                    <div className="flex items-center gap-1 flex-shrink-0">
                        {modalState !== 'minimized' ? (
                            <>
                                <button onClick={handleMinimize} className="p-2 rounded-full text-gray-500 hover:bg-gray-200 hover:text-gray-900 transition-colors" aria-label="최소화"><MinusIcon className="w-5 h-5"/></button>
                                <button onClick={handleToggleMaximize} className="p-2 rounded-full text-gray-500 hover:bg-gray-200 hover:text-gray-900 transition-colors" aria-label={modalState === 'maximized' ? '이전 크기로' : '최대화'}>
                                    {modalState === 'maximized' ? <Square2StackIcon className="w-5 h-5" /> : <WindowIcon className="w-5 h-5" />}
                                </button>
                                <button onClick={handleInternalClose} className="p-2 rounded-full text-gray-500 hover:bg-gray-200 hover:text-gray-900 transition-colors" aria-label="닫기"><XMarkIcon className="w-6 h-6" /></button>
                            </>
                        ) : (
                            <button onClick={handleInternalClose} className="p-1 rounded-full text-gray-500 hover:bg-gray-200 hover:text-gray-900 transition-colors" aria-label="닫기"><XMarkIcon className="w-4 h-4" /></button>
                        )}
                    </div>
                </div>
                
                {/* Content */}
                {modalState !== 'minimized' && (
                    <div className="flex-grow p-4 flex flex-col gap-4 overflow-hidden">
                        <div className="flex-grow min-h-0 relative overflow-hidden rounded-lg shadow-md">
                            <LeafletMap
                                outbreaks={filteredOutbreaks}
                                onMarkerClick={setSelectedOutbreak}
                                selectedOutbreak={selectedOutbreak}
                                onMapReady={(map) => { mapRef.current = map; }}
                                center={[20, 30]}
                                zoom={2}
                            />
                            <div className="absolute top-4 right-4 flex flex-col items-center gap-1 bg-white/80 backdrop-blur-sm p-1.5 rounded-lg shadow-lg" style={{ zIndex: 1000 }}>
                                <button onClick={() => handleZoom('in')} className="w-8 h-8 flex items-center justify-center text-xl font-bold rounded bg-gray-100 hover:bg-gray-200 transition-colors" aria-label="Zoom In">+</button>
                                <button onClick={() => handleZoom('out')} className="w-8 h-8 flex items-center justify-center text-xl font-bold rounded bg-gray-100 hover:bg-gray-200 transition-colors" aria-label="Zoom Out">-</button>
                                <button onClick={handleReset} className="w-8 h-8 flex items-center justify-center rounded bg-gray-100 hover:bg-gray-200 transition-colors mt-1" aria-label="Reset View"><RefreshIcon className="w-5 h-5"/></button>
                            </div>
                            <div className="absolute bottom-4 right-4 bg-white/80 backdrop-blur-sm p-3 rounded-lg shadow-lg" style={{ zIndex: 1000 }}>
                                <h4 className="font-semibold mb-2">위험 등급</h4>
                                <ul className="space-y-1 text-sm">
                                    {riskLevels.map(level => (
                                        <li key={level} className="flex items-center">
                                            <div className="w-4 h-4 rounded-full" style={{backgroundColor: RISK_LEVEL_COLORS[level]}}></div>
                                            <span className="ml-2">{level}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            {selectedOutbreak && (
                                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow-2xl w-96 animate-fadeIn" style={{ zIndex: 1000 }} onClick={(e) => e.stopPropagation()}>
                                    <div className="flex justify-between items-center mb-2 border-b pb-2">
                                        <h3 className="text-lg font-bold">{selectedOutbreak.name}</h3>
                                        <button onClick={() => setSelectedOutbreak(null)} className="text-gray-400 hover:text-gray-800 text-2xl font-bold" aria-label="정보창 닫기">&times;</button>
                                    </div>
                                    <ul className="text-sm space-y-2">
                                        <li><strong>위치:</strong> {selectedOutbreak.location}</li>
                                        <li><strong>최초 보고일:</strong> {selectedOutbreak.date}</li>
                                        <li><strong>위험 등급:</strong> <span className="font-bold" style={{color: selectedOutbreak.riskColor}}>{selectedOutbreak.risk}</span></li>
                                        <li><strong>개요:</strong> {selectedOutbreak.summary}</li>
                                    </ul>
                                </div>
                            )}
                        </div>

                        <div className="flex-shrink-0 grid grid-cols-1 lg:grid-cols-2 gap-4" style={{ height: '220px' }}>
                            <div className="bg-white rounded-lg shadow p-4 flex flex-col overflow-hidden">
                                <h3 className="text-lg font-semibold text-secondary mb-3 border-b pb-2 flex-shrink-0">필터 및 옵션</h3>
                                <div className="space-y-4 overflow-y-auto pr-2">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">감염병 종류</label>
                                        <select value={diseaseFilter} onChange={(e) => setDiseaseFilter(e.target.value)} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 text-sm">
                                            {diseaseTypes.map(type => <option key={type} value={type}>{type}</option>)}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">위험 등급</label>
                                        <div className="flex space-x-4 mt-2">
                                            {(['높음', '중간', '낮음'] as RiskLevel[]).map(risk => (
                                                <label key={risk} className="flex items-center text-sm">
                                                    <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-accent focus:ring-accent mr-1.5" checked={riskFilters[risk]} onChange={() => handleRiskFilterChange(risk)}/> 
                                                    {risk}
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white rounded-lg shadow p-4 flex flex-col overflow-hidden">
                                <h3 className="text-lg font-semibold text-secondary mb-3 border-b pb-2 flex-shrink-0">최근 이벤트</h3>
                                <ul className="space-y-2 overflow-y-auto pr-2">
                                    {[...outbreaks].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).map(o => (
                                        <li key={o.id} onClick={() => setSelectedOutbreak(o)} className={`p-2 rounded cursor-pointer border-l-4 transition-colors ${selectedOutbreak?.id === o.id ? 'bg-blue-100 border-blue-500' : 'bg-gray-50 hover:bg-blue-100 border-transparent hover:border-blue-500'}`}>
                                            <p className="font-semibold text-sm">{o.name} - <span style={{color: o.riskColor}}>{o.risk}</span></p>
                                            <p className="text-xs text-gray-600">{o.location}</p>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MapViewModal;