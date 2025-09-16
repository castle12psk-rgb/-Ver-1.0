import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import { CRAWLER_DATA, ADMIN_CRAWLER_DATA } from '../constants';
import { Crawler, CrawlerStatus } from '../types';
import ServerIcon from '../components/icons/ServerIcon';
import DocumentTextIcon from '../components/icons/DocumentTextIcon';
import ClockIcon from '../components/icons/ClockIcon';
import { useCountUp } from '../hooks/useCountUp';
import QuestionMarkCircleIcon from '../components/icons/QuestionMarkCircleIcon';
import HelpModal from '../components/HelpModal';
import SourceDetailModal from '../components/SourceDetailModal';

const StatusIndicator: React.FC<{ status: CrawlerStatus }> = ({ status }) => {
  const styles = {
    [CrawlerStatus.Active]: { bg: 'bg-green-100', text: 'text-green-800', dot: 'bg-green-500' },
    [CrawlerStatus.Warning]: { bg: 'bg-yellow-100', text: 'text-yellow-800', dot: 'bg-yellow-500' },
    [CrawlerStatus.Error]: { bg: 'bg-red-100', text: 'text-red-800', dot: 'bg-red-500' },
  };
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium ${styles[status].bg} ${styles[status].text}`}>
      <div className={`h-2 w-2 rounded-full mr-2 ${styles[status].dot}`} />
      {status}
    </span>
  );
};

const LogModal: React.FC<{ source: string, onClose: () => void }> = ({ source, onClose }) => (
  <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50" onClick={onClose}>
    <div className="bg-gray-800 text-white rounded-lg shadow-xl w-1/2 h-2/3 flex flex-col font-mono" onClick={e => e.stopPropagation()}>
      <div className="p-4 border-b border-gray-600 flex justify-between items-center">
        <h3 className="text-lg font-semibold">Logs: {source}</h3>
        <button onClick={onClose} className="text-gray-300 hover:text-white text-2xl">&times;</button>
      </div>
      <div className="p-4 overflow-y-auto text-sm space-y-1">
          <p><span className="text-gray-400">{new Date(Date.now() - 6000).toLocaleTimeString()}</span> <span className="text-green-400">[INFO]</span> Initializing connection...</p>
          <p><span className="text-gray-400">{new Date(Date.now() - 5950).toLocaleTimeString()}</span> <span className="text-green-400">[INFO]</span> Connection established to {source}.</p>
          <p><span className="text-gray-400">{new Date(Date.now() - 5900).toLocaleTimeString()}</span> <span className="text-green-400">[INFO]</span> Starting new crawl job ID: <span className="text-cyan-400">#8a2dce</span>.</p>
          <p><span className="text-gray-400">{new Date(Date.now() - 5500).toLocaleTimeString()}</span> <span className="text-blue-400">[DEBUG]</span> Found 32 potential new articles.</p>
          <p><span className="text-gray-400">{new Date(Date.now() - 4800).toLocaleTimeString()}</span> <span className="text-green-400">[INFO]</span> Parsing document ID: 11023...</p>
          <p><span className="text-gray-400">{new Date(Date.now() - 4700).toLocaleTimeString()}</span> <span className="text-green-400">[INFO]</span> Parsing document ID: 11024...</p>
          <p><span className="text-gray-400">{new Date(Date.now() - 4500).toLocaleTimeString()}</span> <span className="text-yellow-400">[WARN]</span> Document ID: 11025 has irregular format. Retrying with legacy parser.</p>
          <p><span className="text-gray-400">{new Date(Date.now() - 3500).toLocaleTimeString()}</span> <span className="text-green-400">[INFO]</span> Successfully parsed document ID: 11025.</p>
          <p><span className="text-gray-400">{new Date(Date.now() - 2000).toLocaleTimeString()}</span> <span className="text-red-400">[ERROR]</span> Failed to fetch document ID: 11029. Server responded with 503.</p>
          <p><span className="text-gray-400">{new Date(Date.now() - 1000).toLocaleTimeString()}</span> <span className="text-green-400">[INFO]</span> Successfully parsed 31 documents.</p>
          <p><span className="text-gray-400">{new Date(Date.now() - 800).toLocaleTimeString()}</span> <span className="text-green-400">[INFO]</span> Sending documents to verification queue.</p>
          <p><span className="text-gray-400">{new Date(Date.now()).toLocaleTimeString()}</span> <span className="text-green-400">[INFO]</span> Crawl complete. Next run scheduled in 5 minutes.</p>
      </div>
    </div>
  </div>
);


const CrawlerDashboardPage: React.FC = () => {
  const [crawlers, setCrawlers] = useState<Crawler[]>(CRAWLER_DATA);
  const [docsCollectedTarget, setDocsCollectedTarget] = useState(1283);
  const countedDocs = useCountUp(docsCollectedTarget);
  const [liveFeed, setLiveFeed] = useState<string[]>([]);
  const [isLogModalOpen, setIsLogModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedCrawlerForDetail, setSelectedCrawlerForDetail] = useState<any | null>(null);
  const [selectedSourceForLog, setSelectedSourceForLog] = useState('');
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate new docs being found
      setCrawlers(prev => prev.map(c => c.status === CrawlerStatus.Active && Math.random() > 0.7 ? { ...c, newDocs: c.newDocs + 1 } : c));
      setDocsCollectedTarget(prev => prev + Math.floor(Math.random() * 3));

      // Simulate new article appearing in feed
      if (Math.random() > 0.5) {
        const randomCrawler = CRAWLER_DATA[Math.floor(Math.random() * CRAWLER_DATA.length)];
        const newItem = `[${new Date().toLocaleTimeString()}] [${randomCrawler.source}] New article detected.`;
        setLiveFeed(prev => [newItem, ...prev.slice(0, 10)]);
      }
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleViewLogs = (source: string) => {
    setSelectedSourceForLog(source);
    setIsLogModalOpen(true);
  };

  const handleShowDetails = (crawler: Crawler) => {
    const detailData = ADMIN_CRAWLER_DATA.find(d => crawler.source.includes(d.source));
    const fullCrawlerData = {
      ...crawler,
      ...detailData,
      successRate: 99.8 - Math.random() * 2,
      nextRun: `in ${Math.floor(Math.random() * 5) + 1} minutes`,
      history: detailData?.history || Array.from({length: 7}, () => Math.floor(Math.random() * 10))
    };
    setSelectedCrawlerForDetail(fullCrawlerData);
    setIsDetailModalOpen(true);
  }

  const activeCrawlers = crawlers.filter(c => c.status === CrawlerStatus.Active).length;

  return (
    <>
      {isHelpModalOpen && <HelpModal onClose={() => setIsHelpModalOpen(false)} />}
      {isLogModalOpen && <LogModal source={selectedSourceForLog} onClose={() => setIsLogModalOpen(false)} />}
      {isDetailModalOpen && selectedCrawlerForDetail && 
        <SourceDetailModal 
            crawler={selectedCrawlerForDetail} 
            onClose={() => setIsDetailModalOpen(false)}
            onViewLogs={() => handleViewLogs(selectedCrawlerForDetail.source)}
        />}
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-bold text-secondary">실시간 정보 수집 현황</h1>
          <button onClick={() => setIsHelpModalOpen(true)} className="text-gray-400 hover:text-primary-light transition-colors" aria-label="도움말 보기">
            <QuestionMarkCircleIcon className="h-7 w-7" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="flex-row items-center justify-between">
            <div>
              <h3 className="text-gray-500">총 데이터 소스</h3>
              <p className="text-4xl font-bold mt-2">{crawlers.length}</p>
            </div>
            <ServerIcon className="h-12 w-12 text-blue-300" />
          </Card>
          <Card className="flex-row items-center justify-between animate-pulse-glow-green rounded-xl">
            <div>
              <h3 className="text-gray-500">활성 크롤러</h3>
              <p className="text-4xl font-bold mt-2">{activeCrawlers}/{crawlers.length}</p>
            </div>
            <div className="relative">
              <ClockIcon className="h-12 w-12 text-green-400" />
              <div className="absolute top-0 right-0 h-3 w-3 rounded-full bg-green-500 animate-ping"></div>
            </div>
          </Card>
          <Card className="flex-row items-center justify-between">
            <div>
              <h3 className="text-gray-500">24시간 내 수집된 정보</h3>
              <p className="text-4xl font-bold mt-2">{countedDocs.toLocaleString()}</p>
            </div>
            <DocumentTextIcon className="h-12 w-12 text-yellow-300" />
          </Card>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card title="데이터 소스 상세 현황" className="lg:col-span-2" bodyClassName="!p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="p-4">상태</th>
                    <th className="p-4">데이터 소스</th>
                    <th className="p-4">최근 수집 시각</th>
                    <th className="p-4 text-right">신규 문서</th>
                    <th className="p-4 text-center">로그</th>
                  </tr>
                </thead>
                <tbody>
                  {crawlers.map((crawler) => (
                    <tr key={crawler.source} className="border-b hover:bg-gray-50 cursor-pointer" onClick={() => handleShowDetails(crawler)}>
                      <td className="p-4"><StatusIndicator status={crawler.status} /></td>
                      <td className="p-4 font-medium">{crawler.source}</td>
                      <td className="p-4 text-gray-600">{crawler.lastCrawled}</td>
                      <td className="p-4 text-right font-semibold text-blue-600">{crawler.newDocs}</td>
                      <td className="p-4 text-center">
                        <button 
                          onClick={(e) => { e.stopPropagation(); handleViewLogs(crawler.source); }} 
                          className="bg-blue-100 text-blue-700 px-3 py-1 rounded-md text-sm hover:bg-blue-200 transition-colors">
                          보기
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          <Card className="bg-gray-800" bodyClassName="p-4 flex flex-col">
              <h2 className="text-xl font-semibold text-white border-b border-gray-600 pb-3 mb-3">실시간 수집 피드</h2>
              <div className="bg-black rounded-md p-4 h-96 overflow-y-auto font-mono text-xs flex-grow custom-scrollbar">
                  <ul className="space-y-2">
                      {liveFeed.map((item, index) => {
                          const parts = item.match(/(\[.*?\])\s(\[.*?\])\s(.*)/);
                          if (!parts) {
                              return (
                                  <li key={index} className="text-gray-300 animate-fadeIn">
                                  {item}
                                  </li>
                              );
                          }
                          const [, timestamp, source, message] = parts;
                          return (
                              <li key={index} className="animate-fadeIn">
                                  <span className="text-gray-500">{timestamp}</span>{' '}
                                  <span className="text-cyan-400">{source}</span>{' '}
                                  <span className="text-gray-200">{message}</span>
                              </li>
                          );
                      })}
                      {liveFeed.length === 0 && <li className="text-gray-500">실시간 피드 대기 중...</li>}
                  </ul>
              </div>
          </Card>
        </div>
      </div>
    </>
  );
};

export default CrawlerDashboardPage;