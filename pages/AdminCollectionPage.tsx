import React, { useState } from 'react';
import Card from '../components/Card';
import { ADMIN_CRAWLER_DATA } from '../constants';
import PencilSquareIcon from '../components/icons/PencilSquareIcon';
import TrashIcon from '../components/icons/TrashIcon';
import ArrowPathIcon from '../components/icons/ArrowPathIcon';
import PlusCircleIcon from '../components/icons/PlusCircleIcon';
import ServerIcon from '../components/icons/ServerIcon';
import DocumentTextIcon from '../components/icons/DocumentTextIcon';
import ExclamationCircleIcon from '../components/icons/ExclamationCircleIcon';
import Sparkline from '../components/Sparkline';
import AddEditCrawlerModal from '../components/AddEditCrawlerModal';
import ConfirmationModal from '../components/ConfirmationModal';
import EllipsisVerticalIcon from '../components/icons/EllipsisVerticalIcon';

const AdminCollectionPage: React.FC = () => {
    const [sources, setSources] = useState(ADMIN_CRAWLER_DATA);
    const [isAddEditModalOpen, setAddEditModalOpen] = useState(false);
    const [isConfirmModalOpen, setConfirmModalOpen] = useState(false);
    const [selectedSource, setSelectedSource] = useState<any>(null);
    const [sourceToDelete, setSourceToDelete] = useState<number | null>(null);

    const handleToggle = (id: number) => {
        setSources(sources.map(s => s.id === id ? { ...s, isEnabled: !s.isEnabled } : s));
    };

    const handleRunNow = (id: number) => {
        setSources(sources.map(s => s.id === id ? { ...s, status: 'Running...' } : s));
        setTimeout(() => {
            setSources(prevSources => prevSources.map(s => {
                if (s.id === id) {
                    const errorOccurred = Math.random() < 0.1;
                    return { ...s, status: errorOccurred ? 'Error' : 'Active', lastRun: new Date().toISOString().slice(0, 19).replace('T', ' ') };
                }
                return s;
            }));
        }, 2000);
    };
    
    const openAddModal = () => {
        setSelectedSource(null);
        setAddEditModalOpen(true);
    };

    const openEditModal = (source: any) => {
        setSelectedSource(source);
        setAddEditModalOpen(true);
    };

    const openConfirmModal = (id: number) => {
        setSourceToDelete(id);
        setConfirmModalOpen(true);
    };

    const handleDelete = () => {
        if (sourceToDelete !== null) {
            setSources(sources.filter(s => s.id !== sourceToDelete));
            setSourceToDelete(null);
        }
        setConfirmModalOpen(false);
    };

    const totalDocs24h = sources.reduce((sum, s) => sum + s.docs24h, 0);
    const totalErrors = sources.filter(s => s.status === 'Error').length;

    return (
        <>
            <AddEditCrawlerModal
                isOpen={isAddEditModalOpen}
                onClose={() => setAddEditModalOpen(false)}
                sourceData={selectedSource}
            />
            <ConfirmationModal
                isOpen={isConfirmModalOpen}
                onClose={() => setConfirmModalOpen(false)}
                onConfirm={handleDelete}
                title="데이터 소스 삭제"
                message="정말로 이 데이터 소스를 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다."
            />
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <h1 className="text-3xl font-bold text-secondary">데이터 소스 관리</h1>
                    <button onClick={openAddModal} className="flex items-center gap-2 bg-primary-dark text-white px-4 py-2 rounded-md hover:bg-primary-light transition-colors">
                        <PlusCircleIcon className="h-6 w-6" />
                        신규 소스 추가
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <Card><h3 className="text-gray-500">총 데이터 소스</h3><div className="flex items-center justify-between"><p className="text-3xl font-bold mt-2">{sources.length}</p><ServerIcon className="h-8 w-8 text-gray-300"/></div></Card>
                    <Card><h3 className="text-gray-500">활성/활성화</h3><div className="flex items-center justify-between"><p className="text-3xl font-bold mt-2 text-green-600">{sources.filter(s => s.isEnabled).length}</p><div className="w-8 h-8 rounded-full bg-green-500 animate-pulse-glow-green"></div></div></Card>
                    <Card><h3 className="text-gray-500">24시간 내 수집량</h3><div className="flex items-center justify-between"><p className="text-3xl font-bold mt-2">{totalDocs24h.toLocaleString()}</p><DocumentTextIcon className="h-8 w-8 text-gray-300"/></div></Card>
                    <Card><h3 className="text-gray-500">오류 발생</h3><div className="flex items-center justify-between"><p className="text-3xl font-bold mt-2 text-red-600">{totalErrors}</p><ExclamationCircleIcon className="h-8 w-8 text-red-400"/></div></Card>
                </div>

                <Card bodyClassName="!p-0">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="p-4 w-24 text-center">활성화</th>
                                    <th className="p-4">데이터 소스</th>
                                    <th className="p-4">최근 7일 수집량</th>
                                    <th className="p-4">24시간 내 수집량</th>
                                    <th className="p-4">평균 실행 시간</th>
                                    <th className="p-4">최근 실행</th>
                                    <th className="p-4">상태</th>
                                    <th className="p-4 text-center">작업</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {sources.map(source => (
                                    <tr key={source.id} className="hover:bg-gray-50">
                                        <td className="p-4 text-center">
                                            <div className="relative inline-block w-10 align-middle select-none">
                                                <input type="checkbox" checked={source.isEnabled} onChange={() => handleToggle(source.id)} id={`toggle-${source.id}`} className={`toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer transition-all duration-200 ${source.isEnabled ? 'right-0 border-green-400' : 'border-gray-300'}`}/>
                                                <label htmlFor={`toggle-${source.id}`} className={`toggle-label block overflow-hidden h-6 rounded-full cursor-pointer ${source.isEnabled ? 'bg-green-400' : 'bg-gray-300'}`}></label>
                                            </div>
                                        </td>
                                        <td className="p-4 font-medium"><p>{source.source}</p><a href={source.url} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-500 hover:underline truncate">{source.url}</a></td>
                                        <td className="p-4 w-40"><Sparkline data={source.history.map(value => ({ value }))} color={source.status === 'Error' ? '#F44336' : '#1E88E5'} /></td>
                                        <td className="p-4 font-semibold text-blue-600">{source.docs24h}</td>
                                        <td className="p-4">{source.avgRuntime}s</td>
                                        <td className="p-4 text-gray-600">{source.lastRun}</td>
                                        <td className="p-4"><span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${source.status === 'Active' ? 'bg-green-100 text-green-800' : (source.status === 'Warning' ? 'bg-yellow-100 text-yellow-800' : (source.status === 'Error' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'))}`}>{source.status}</span></td>
                                        <td className="p-4 text-center">
                                            <div className="relative inline-block dropdown">
                                                <button className="p-1 rounded-full hover:bg-gray-200"><EllipsisVerticalIcon className="h-5 w-5"/></button>
                                                <div className="dropdown-menu absolute right-0 mt-2 w-32 bg-white rounded-md shadow-lg z-10 hidden">
                                                    <a href="#" onClick={(e) => { e.preventDefault(); handleRunNow(source.id); }} className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"><ArrowPathIcon className="h-4 w-4"/> 즉시 실행</a>
                                                    <a href="#" onClick={(e) => { e.preventDefault(); openEditModal(source); }} className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"><PencilSquareIcon className="h-4 w-4"/> 수정</a>
                                                    <a href="#" onClick={(e) => { e.preventDefault(); openConfirmModal(source.id); }} className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-gray-100"><TrashIcon className="h-4 w-4"/> 삭제</a>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Card>
            </div>
            <style>{`
                .toggle-checkbox:checked {
                    right: 0;
                    border-color: #48bb78;
                }
                .toggle-checkbox:checked + .toggle-label {
                    background-color: #48bb78;
                }
                .dropdown:hover .dropdown-menu {
                    display: block;
                }
            `}</style>
        </>
    );
};

export default AdminCollectionPage;
