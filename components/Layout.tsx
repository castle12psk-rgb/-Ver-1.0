import React, { useState } from 'react';
import { NavLink, Outlet, useLocation, Navigate } from 'react-router-dom';
import HomeIcon from './icons/HomeIcon';
import CollectionIcon from './icons/CollectionIcon';
import VerifyIcon from './icons/VerifyIcon';
import VisualizeIcon from './icons/VisualizeIcon';
import StatsIcon from './icons/StatsIcon';
import AdminToggle from './AdminToggle';
import TableCellsIcon from './icons/TableCellsIcon';
import ShieldCheckIcon from './icons/ShieldCheckIcon';
import Cog6ToothIcon from './icons/Cog6ToothIcon';
import MapViewModal from './MapViewModal';
import ArchitectureHelpModal from './ArchitectureModal';
import ArchitectureIcon from './icons/ArchitectureIcon';
import PencilSquareIcon from './icons/PencilSquareIcon';

const userNavigation = [
  { name: 'GIDS HOME', href: '/', icon: HomeIcon },
  { name: '실시간 정보 수집', href: '/collection', icon: CollectionIcon },
  { name: 'AI 기반 정보 검증', href: '/verification', icon: VerifyIcon },
  { name: '직관적 시각화', href: '/visualization', icon: VisualizeIcon },
  { name: '데이터 통계 및 정리', href: '/statistics', icon: StatsIcon },
  { name: '개발 계획서 작성', href: '/development-plan', icon: PencilSquareIcon },
];

const adminNavigation = [
  { name: '관리자 대시보드', href: '/admin/dashboard', icon: HomeIcon },
  { name: '데이터 소스 관리', href: '/admin/collection', icon: CollectionIcon },
  { name: 'AI 검증 관리', href: '/admin/verification', icon: ShieldCheckIcon },
  { name: '시스템 설정', href: '/admin/settings', icon: Cog6ToothIcon },
];

const Layout: React.FC = () => {
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [isMapViewModalOpen, setIsMapViewModalOpen] = useState(false);
  const [isArchitectureModalOpen, setIsArchitectureModalOpen] = useState(false);
  const location = useLocation();

  const navigation = isAdminMode ? adminNavigation : userNavigation;
  const isUserPage = userNavigation.some(item => item.href === location.pathname);
  const isAdminPage = adminNavigation.some(item => item.href === location.pathname);

  // Redirect if mode and path don't match
  if (isAdminMode && isUserPage) {
    return <Navigate to="/admin/dashboard" replace />;
  }
  if (!isAdminMode && isAdminPage) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <MapViewModal isOpen={isMapViewModalOpen} onClose={() => setIsMapViewModalOpen(false)} />
      {/* FIX: Updated component to ArchitectureHelpModal after renaming */}
      <ArchitectureHelpModal isOpen={isArchitectureModalOpen} onClose={() => setIsArchitectureModalOpen(false)} />
      <div className={`flex h-screen bg-gray-100 font-sans transition-colors duration-300 ${isAdminMode ? 'bg-gray-200' : 'bg-gray-100'}`}>
        <aside className={`w-64 flex-shrink-0 text-white flex flex-col transition-all duration-300 ${isAdminMode ? 'bg-secondary' : 'bg-primary-dark'}`}>
          <div className={`p-4 border-b transition-colors duration-300 ${isAdminMode ? 'border-gray-600' : 'border-blue-800'}`}>
            <h1 className="text-xl font-bold text-center">해외감염병 감시</h1>
            <h2 className={`text-xs text-center transition-colors duration-300 ${isAdminMode ? 'text-yellow-300' : 'text-blue-200'}`}>
              {isAdminMode ? '관리자 모드' : 'GIDS Solution v1.1'}
            </h2>
          </div>
          <nav className="mt-4 flex-grow flex flex-col">
            <ul>
              {navigation.map((item) => (
                <li key={item.name}>
                  <NavLink
                    to={item.href}
                    className={({ isActive }) =>
                      `flex items-center px-4 py-3 transition-colors duration-200 ${
                        isActive 
                          ? (isAdminMode ? 'bg-gray-700' : 'bg-primary-light')
                          : (isAdminMode ? 'hover:bg-gray-700' : 'hover:bg-primary-light')
                      }`
                    }
                  >
                    <item.icon className="h-6 w-6 mr-3" />
                    <span>{item.name}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
             {!isAdminMode && (
              <div className="mt-auto p-4 space-y-2">
                <button 
                  onClick={() => setIsMapViewModalOpen(true)}
                  className="group flex items-center justify-center w-full px-4 py-3 rounded-lg text-center transition-all duration-300 bg-white/10 hover:bg-white/20"
                >
                  <VisualizeIcon className="h-6 w-6 mr-3 text-white" />
                  <span className="text-lg font-semibold text-white">Map View</span>
                </button>
                 <button 
                  onClick={() => setIsArchitectureModalOpen(true)}
                  className="group flex items-center justify-center w-full px-4 py-3 rounded-lg text-center transition-all duration-300 bg-white/10 hover:bg-white/20"
                >
                  <ArchitectureIcon className="h-6 w-6 mr-3 text-white" />
                  <span className="text-lg font-semibold text-white">GIDS Architecture</span>
                </button>
              </div>
            )}
          </nav>
          <div className="p-4 border-t border-gray-600">
              <AdminToggle isAdmin={isAdminMode} setIsAdmin={setIsAdminMode} />
          </div>
        </aside>
        <main className="flex-1 overflow-y-auto p-8">
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default Layout;