import React, { useState, useEffect } from 'react';
import { User } from '../types';
import EyeIcon from './icons/EyeIcon';
import EyeSlashIcon from './icons/EyeSlashIcon';

interface AddEditUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  userData?: User | null;
}

const AddEditUserModal: React.FC<AddEditUserModalProps> = ({ isOpen, onClose, userData }) => {
  const [user, setUser] = useState({ name: '', email: '', role: 'Viewer' });
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (userData) {
      setUser({ name: userData.name, email: userData.email, role: userData.role });
      setPassword('');
    } else {
      setUser({ name: '', email: '', role: 'Viewer' });
      setPassword('');
    }
  }, [userData, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitted data:', { ...user, password });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 animate-fadeIn" onClick={onClose}>
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg" onClick={e => e.stopPropagation()}>
        <div className="p-4 border-b">
          <h2 className="text-xl font-bold text-secondary">{userData ? '사용자 수정' : '신규 사용자 추가'}</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="p-6 space-y-4">
            <div>
              <label htmlFor="user-name" className="block text-sm font-medium text-gray-700">이름</label>
              <input type="text" id="user-name" value={user.name} onChange={e => setUser({ ...user, name: e.target.value })} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2" required />
            </div>
            <div>
              <label htmlFor="user-email" className="block text-sm font-medium text-gray-700">이메일</label>
              <input type="email" id="user-email" value={user.email} onChange={e => setUser({ ...user, email: e.target.value })} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2" required />
            </div>
             <div className="relative">
              <label htmlFor="user-password">{userData ? '새 비밀번호 (변경 시에만 입력)' : '비밀번호'}</label>
              <input 
                type={showPassword ? 'text' : 'password'} 
                id="user-password" 
                value={password} 
                onChange={e => setPassword(e.target.value)}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 pr-10" 
                required={!userData} 
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 top-6 pr-3 flex items-center text-sm leading-5">
                {showPassword ? <EyeSlashIcon className="h-5 w-5 text-gray-500" /> : <EyeIcon className="h-5 w-5 text-gray-500" />}
              </button>
            </div>
            <div>
              <label htmlFor="user-role" className="block text-sm font-medium text-gray-700">역할</label>
              <select id="user-role" value={user.role} onChange={e => setUser({ ...user, role: e.target.value as User['role'] })} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2">
                <option>Viewer</option>
                <option>Editor</option>
                <option>Admin</option>
              </select>
            </div>
          </div>
          <div className="p-4 bg-gray-50 flex justify-end gap-3">
            <button type="button" onClick={onClose} className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300">취소</button>
            <button type="submit" className="bg-primary-dark text-white px-4 py-2 rounded-md hover:bg-primary-light">저장</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEditUserModal;
