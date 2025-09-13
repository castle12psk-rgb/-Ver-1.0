import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/Card';
import ServerIcon from '../components/icons/ServerIcon';
import ShieldCheckIcon from '../components/icons/ShieldCheckIcon';
import UsersIcon from '../components/icons/UsersIcon';
import CpuChipIcon from '../components/icons/CpuChipIcon';
import ExclamationTriangleIcon from '../components/icons/ExclamationTriangleIcon';
import CheckCircleIcon from '../components/icons/CheckCircleIcon';
import XCircleIcon from '../components/icons/XCircleIcon';
import InformationCircleIcon from '../components/icons/InformationCircleIcon';
import ArrowUpRightIcon from '../components/icons/ArrowUpRightIcon';
import Sparkline from '../components/Sparkline';
import { ADMIN_CRAWLER_DATA, REVIEW_DATA } from '../constants';

const CrawlerStatusBadge: React.FC<{ status: string }> = ({ status }) => {
    const styles: { [key: string]: string } = {
        'Active': 'bg-green-100 text-green-800',
        'Warning': 'bg-yellow-100 text-yellow-800',
        'Error': 'bg-red-100 text-red-800',
        'Running...': 'bg-blue-100 text-blue-800 animate-pulse',
    };
    const style = styles[status] || 'bg-gray-100 text-gray-800';
    return <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${style}`}>{status}</span>;
};


const AdminDashboardPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-secondary">관리자 대시보드</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <div className="flex items-center">
            <ServerIcon className="h-8 w-8 text-blue-500 mr-4" />
            <div>
              <h3 className="text-gray-500">시스템 상태</h3>
              <p className="text-2xl font-bold text-green-600">정상</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center">
            <UsersIcon className="h-8 w-8 text-indigo-500 mr-4" />
            <div>
              <h3 className="text-gray-500">활성 사용자</h3>
              <p className="text-2xl font-bold">3</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center">
            <CpuChipIcon className="h-8 w-8 text-teal-500 mr-4" />
            <div>
              <h3 className="text-gray-500">CPU 사용량</h3>
              <p className="text-2xl font-bold">34%</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center">
            <ShieldCheckIcon className="h-8 w-8 text-yellow-500 mr-4" />
            <div>
              <h3 className="text-gray-500">보안 이벤트 (24h)</h3>
              <p className="text-2xl font-bold">0</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card title="AI 검증 시스템 현황" className="lg:col-span-2">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div>
                    <CheckCircleIcon className="h-10 w-10 mx-auto text-green-500" />
                    <p className="text-3xl font-bold mt-2">1,204</p>
                    <p className="text-sm text-gray-500">사실 (Fact)</p>
                </div>
                 <div>
                    <XCircleIcon className="h-10 w-10 mx-auto text-red-500" />
                    <p className="text-3xl font-bold mt-2">88</p>
                    <p className="text-sm text-gray-500">허위 (Fake)</p>
                </div>
                 <div>
                    <InformationCircleIcon className="h-10 w-10 mx-auto text-gray-500" />
                    <p className="text-3xl font-bold mt-2">312</p>
                    <p className="text-sm text-gray-500">의견 (Opinion)</p>
                </div>
                 <div>
                    <ExclamationTriangleIcon className="h-10 w-10 mx-auto text-yellow-500" />
                    <p className="text-3xl font-bold mt-2">15</p>
                    <p className="text-sm text-gray-500">수동 검토 필요</p>
                </div>
            </div>
        </Card>

        <Card title="최근 시스템 로그">
            <ul className="space-y-2 text-xs font-mono h-48 overflow-y-auto">
                <li><span className="text-green-500">[INFO]</span> User 'admin' logged in from 192.168.1.10</li>
                <li><span className="text-green-500">[INFO]</span> Crawler 'WHO' completed a run. 5 new documents.</li>
                <li><span className="text-yellow-500">[WARN]</span> High CPU usage detected (85%).</li>
                <li><span className="text-blue-500">[DEBUG]</span> AI model cache cleared.</li>
                <li><span className="text-green-500">[INFO]</span> Daily report generated successfully.</li>
                <li><span className="text-red-500">[ERROR]</span> Failed to connect to news source 'BNO News'.</li>
                 <li><span className="text-green-500">[INFO]</span> User 'editor' updated verification rule #3.</li>
            </ul>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card bodyClassName="!p-0">
          <div className="p-4 border-b flex justify-between items-center">
            <h2 className="text-xl font-semibold text-secondary">데이터 소스 크롤링 현황</h2>
            <Link to="/admin/collection" className="flex items-center text-sm text-primary-light hover:underline">
              전체 보기 <ArrowUpRightIcon className="w-4 h-4 ml-1" />
            </Link>
          </div>
          <div className="p-4 space-y-3">
            {ADMIN_CRAWLER_DATA.slice(0, 4).map(crawler => (
              <div key={crawler.id} className="grid grid-cols-10 gap-4 items-center">
                <div className="font-medium truncate col-span-3">{crawler.source}</div>
                <div className="col-span-2"><CrawlerStatusBadge status={crawler.status} /></div>
                <div className="text-right text-blue-600 font-semibold col-span-2">{crawler.docs24h} docs</div>
                <div className="w-full col-span-3"><Sparkline data={crawler.history.map(value => ({ value }))} color={crawler.status === 'Error' ? '#ef4444' : '#3b82f6'} /></div>
              </div>
            ))}
          </div>
        </Card>

        <Card bodyClassName="!p-0">
           <div className="p-4 border-b flex justify-between items-center">
             <h2 className="text-xl font-semibold text-secondary">AI 검증 대기 목록</h2>
             <Link to="/admin/verification" className="flex items-center text-sm text-primary-light hover:underline">
               전체 보기 <ArrowUpRightIcon className="w-4 h-4 ml-1" />
             </Link>
           </div>
           <div className="p-4 space-y-4">
            {REVIEW_DATA.slice(0,3).map(item => (
              <div key={item.id}>
                <div className="flex justify-between items-baseline">
                   <p className="font-semibold text-sm truncate pr-4">{item.title}</p>
                   <p className="text-xs text-gray-500 flex-shrink-0">{item.source}</p>
                </div>
                <div className="flex items-center gap-2 mt-1">
                   <div className="w-full bg-gray-200 rounded-full h-2">
                       <div 
                           className={`h-2 rounded-full ${item.aiConfidence > 60 ? 'bg-yellow-400' : 'bg-red-500'}`} 
                           style={{width: `${item.aiConfidence}%`}}>
                       </div>
                   </div>
                   <span className="text-sm font-bold w-12 text-right">{item.aiConfidence.toFixed(1)}%</span>
                </div>
              </div>
            ))}
           </div>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
