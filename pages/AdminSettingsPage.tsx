import React, { useState } from 'react';
import Card from '../components/Card';
import { USERS_DATA, RULES_DATA } from '../constants';
import { User, VerificationRule } from '../types';
import PencilSquareIcon from '../components/icons/PencilSquareIcon';
import TrashIcon from '../components/icons/TrashIcon';
import UserPlusIcon from '../components/icons/UserPlusIcon';
import PlusCircleIcon from '../components/icons/PlusCircleIcon';
import KeyIcon from '../components/icons/KeyIcon';
import BookOpenIcon from '../components/icons/BookOpenIcon';
import BellAlertIcon from '../components/icons/BellAlertIcon';
import AddEditUserModal from '../components/AddEditUserModal';
import AddEditRuleModal from '../components/AddEditRuleModal';
import ConfirmationModal from '../components/ConfirmationModal';

const AdminSettingsPage: React.FC = () => {
    const [users, setUsers] = useState<User[]>(USERS_DATA);
    const [rules, setRules] = useState<VerificationRule[]>(RULES_DATA);
    
    // Modal states
    const [isUserModalOpen, setUserModalOpen] = useState(false);
    const [isRuleModalOpen, setRuleModalOpen] = useState(false);
    const [isConfirmModalOpen, setConfirmModalOpen] = useState(false);
    
    // Data for modals
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [selectedRule, setSelectedRule] = useState<VerificationRule | null>(null);
    const [itemToDelete, setItemToDelete] = useState<{ type: 'user' | 'rule', id: number } | null>(null);

    const openUserModal = (user: User | null = null) => {
        setSelectedUser(user);
        setUserModalOpen(true);
    };

    const openRuleModal = (rule: VerificationRule | null = null) => {
        setSelectedRule(rule);
        setRuleModalOpen(true);
    };

    const openConfirmModal = (type: 'user' | 'rule', id: number) => {
        setItemToDelete({ type, id });
        setConfirmModalOpen(true);
    };
    
    const handleDelete = () => {
        if (!itemToDelete) return;
        if (itemToDelete.type === 'user') {
            setUsers(users.filter(u => u.id !== itemToDelete.id));
        } else {
            setRules(rules.filter(r => r.id !== itemToDelete.id));
        }
        setConfirmModalOpen(false);
        setItemToDelete(null);
    };

    return (
        <>
            <AddEditUserModal isOpen={isUserModalOpen} onClose={() => setUserModalOpen(false)} userData={selectedUser} />
            <AddEditRuleModal isOpen={isRuleModalOpen} onClose={() => setRuleModalOpen(false)} ruleData={selectedRule} />
            <ConfirmationModal 
                isOpen={isConfirmModalOpen}
                onClose={() => setConfirmModalOpen(false)}
                onConfirm={handleDelete}
                title={`${itemToDelete?.type === 'user' ? '사용자' : '규칙'} 삭제`}
                message={`정말로 이 ${itemToDelete?.type === 'user' ? '사용자' : '규칙'}을(를) 삭제하시겠습니까?`}
            />

            <div className="space-y-8">
                <h1 className="text-3xl font-bold text-secondary">시스템 설정</h1>

                {/* User Management */}
                <Card>
                    <div className="flex justify-between items-center mb-4 pb-4 border-b">
                        <h2 className="text-xl font-semibold text-secondary flex items-center gap-2"><UserPlusIcon className="w-6 h-6" /> 사용자 관리</h2>
                        <button onClick={() => openUserModal()} className="flex items-center gap-2 bg-blue-100 text-blue-700 px-3 py-1 rounded-md text-sm hover:bg-blue-200">
                            <UserPlusIcon className="w-5 h-5" /> 사용자 추가
                        </button>
                    </div>
                    <table className="w-full text-left text-sm">
                        {/* table content */}
                         <thead className="bg-gray-50">
                            <tr>
                                <th className="p-3">이름</th><th className="p-3">이메일</th><th className="p-3">역할</th><th className="p-3">최근 로그인</th><th className="p-3 text-center">작업</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {users.map(user => (
                                <tr key={user.id}>
                                    <td className="p-3 font-medium">{user.name}</td>
                                    <td className="p-3">{user.email}</td>
                                    <td className="p-3"><span className={`px-2 py-1 text-xs rounded-full font-medium ${user.role === 'Admin' ? 'bg-red-100 text-red-800' : (user.role === 'Editor' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800')}`}>{user.role}</span></td>
                                    <td className="p-3">{user.lastLogin}</td>
                                    <td className="p-3 text-center flex justify-center gap-2">
                                        <button onClick={() => openUserModal(user)} className="p-1 text-gray-500 hover:text-blue-600"><PencilSquareIcon className="w-5 h-5" /></button>
                                        <button onClick={() => openConfirmModal('user', user.id)} className="p-1 text-gray-500 hover:text-red-600"><TrashIcon className="w-5 h-5" /></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </Card>

                {/* AI Verification Rules */}
                <Card>
                    <div className="flex justify-between items-center mb-4 pb-4 border-b">
                        <h2 className="text-xl font-semibold text-secondary flex items-center gap-2"><BookOpenIcon className="w-6 h-6" /> AI 검증 규칙 관리</h2>
                         <button onClick={() => openRuleModal()} className="flex items-center gap-2 bg-blue-100 text-blue-700 px-3 py-1 rounded-md text-sm hover:bg-blue-200">
                            <PlusCircleIcon className="w-5 h-5" /> 규칙 추가
                        </button>
                    </div>
                   {/* Rule list */}
                    <div className="space-y-3">
                        {rules.map(rule => (
                            <div key={rule.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
                                <div>
                                    <p className="font-semibold">{rule.name}</p>
                                    <p className="text-xs text-gray-600">{rule.description}</p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <label className="flex items-center cursor-pointer">
                                        <div className="relative">
                                            <input type="checkbox" className="sr-only" checked={rule.isEnabled} onChange={() => setRules(rules.map(r => r.id === rule.id ? {...r, isEnabled: !r.isEnabled} : r))} />
                                            <div className="block bg-gray-300 w-12 h-6 rounded-full"></div>
                                            <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${rule.isEnabled ? 'transform translate-x-6 bg-green-400' : 'bg-gray-500'}`}></div>
                                        </div>
                                    </label>
                                    <button onClick={() => openRuleModal(rule)} className="p-1 text-gray-500 hover:text-blue-600"><PencilSquareIcon className="w-5 h-5" /></button>
                                    <button onClick={() => openConfirmModal('rule', rule.id)} className="p-1 text-gray-500 hover:text-red-600"><TrashIcon className="w-5 h-5" /></button>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>
                
                {/* Other Settings */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                        <h2 className="text-xl font-semibold text-secondary flex items-center gap-2 mb-4"><KeyIcon className="w-6 h-6" /> API 키 관리</h2>
                        <div className="space-y-2">
                             <p className="text-sm text-gray-500">시스템에서 사용하는 외부 API 키를 관리합니다.</p>
                             <div className="flex items-center gap-2">
                                <input type="text" className="flex-grow p-2 border rounded-md bg-gray-100" value="GDS_************************_PROD" readOnly />
                                <button className="p-2 text-gray-500 hover:text-blue-600"><PencilSquareIcon className="w-5 h-5" /></button>
                             </div>
                        </div>
                    </Card>
                    <Card>
                        <h2 className="text-xl font-semibold text-secondary flex items-center gap-2 mb-4"><BellAlertIcon className="w-6 h-6" /> 알림 설정</h2>
                        <p className="text-sm text-gray-500">시스템 오류 및 중요 이벤트 발생 시 알림을 받을 이메일을 설정합니다.</p>
                        <div className="flex items-center gap-2 mt-2">
                            <input type="email" className="flex-grow p-2 border rounded-md" defaultValue="admin-group@gids.or.kr" />
                            <button className="bg-primary-dark text-white px-3 py-2 rounded-md hover:bg-primary-light text-sm">저장</button>
                        </div>
                    </Card>
                </div>

            </div>
        </>
    );
};

export default AdminSettingsPage;
