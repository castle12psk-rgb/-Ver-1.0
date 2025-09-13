import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import Card from './Card';
import { CrawlerStatus } from '../types';
import DocumentTextIcon from './icons/DocumentTextIcon';
import ClockIcon from './icons/ClockIcon';
import CheckCircleIcon from './icons/CheckCircleIcon';
import CalendarDaysIcon from './icons/CalendarDaysIcon';
import BoltIcon from './icons/BoltIcon';
import ClipboardDocumentListIcon from './icons/ClipboardDocumentListIcon';
import HourglassIcon from './icons/HourglassIcon';
import ContentDetailModal from './ContentDetailModal';

interface SourceDetailModalProps {
  crawler: any;
  onClose: () => void;
  onViewLogs: () => void;
}

const StatusIndicator: React.FC<{ status: CrawlerStatus, isLarge?: boolean }> = ({ status, isLarge = false }) => {
  const styles = {
    [CrawlerStatus.Active]: { bg: 'bg-green-100', text: 'text-green-800', dot: 'bg-green-500' },
    [CrawlerStatus.Warning]: { bg: 'bg-yellow-100', text: 'text-yellow-800', dot: 'bg-yellow-500' },
    [CrawlerStatus.Error]: { bg: 'bg-red-100', text: 'text-red-800', dot: 'bg-red-500' },
  };
  const size = isLarge ? 'px-3 py-1 text-base font-semibold' : 'px-2.5 py-0.5 text-sm font-medium';
  return (
    <span className={`inline-flex items-center rounded-full ${size} ${styles[status].bg} ${styles[status].text}`}>
      <div className={`h-2.5 w-2.5 rounded-full mr-2 ${styles[status].dot}`} />
      {status}
    </span>
  );
};

const activityLog = [
    { time: '10:35:02 AM', message: 'Crawl job finished successfully.', status: 'success' },
    { time: '10:35:01 AM', message: 'Found 5 new documents.', status: 'info' },
    { time: '10:34:58 AM', message: 'Parsing page 2...', status: 'info' },
    { time: '10:34:55 AM', message: 'Crawl job #8a2dce started.', status: 'info' },
    { time: '10:30:01 AM', message: 'Crawl job finished successfully.', status: 'success' },
]

const collectedContent = [
    {
        id: 1,
        source: "Reuters Health",
        title: "Dengue Fever Cases Surge in Rio de Janeiro",
        snippet: "Health officials report a 30% increase in dengue cases following recent heavy rains which led to a spike in mosquito populations...",
        time: "Collected at 10:35:01 AM",
        status: "AI 검증 대기중",
        fullText: "RIO DE JANEIRO – Health officials in Rio de Janeiro have reported a significant surge in dengue fever cases, with a 30% increase compared to the same period last year. The spike is attributed to recent heavy rains that have created ideal breeding grounds for the Aedes aegypti mosquito, the primary vector for the disease. Dr. Patricia Almeida, a lead epidemiologist for the city, stated in a press conference, 'We are facing a critical situation. The combination of a warmer, wetter season has led to a population explosion of mosquitoes. We urge all citizens to take preventative measures by eliminating stagnant water in and around their homes.' Hospitals across the city are reporting increased patient loads, with many facilities nearing capacity. The government has initiated a large-scale public health campaign, including fumigation efforts in high-risk neighborhoods and educational programs to inform residents about symptoms and prevention."
    },
    {
        id: 2,
        source: "WHO",
        title: "WHO confirms new Ebola outbreak in Democratic Republic of Congo",
        snippet: "The World Health Organization has confirmed a new cluster of Ebola cases in the North Kivu province, initiating an emergency response...",
        time: "Collected at 10:35:01 AM",
        status: "AI 검증 대기중",
        fullText: "GENEVA – The World Health Organization (WHO) officially confirmed a new outbreak of the Ebola virus in the North Kivu province of the Democratic Republic of Congo (DRC) on Friday. This marks the third outbreak in the region in the past two years. So far, 12 cases have been confirmed, including four fatalities. 'The re-emergence of Ebola in this region is a grave concern,' said Dr. Michael Ryan, Executive Director of the WHO Health Emergencies Programme. 'However, our experience, the availability of vaccines, and improved local response capabilities give us a stronger footing than ever before.' The WHO is working closely with the DRC Ministry of Health to deploy rapid response teams, scale up contact tracing, and begin a ring vaccination campaign targeting healthcare workers and contacts of confirmed cases."
    },
    {
        id: 3,
        source: "Associated Press",
        title: "Avian Influenza (H5N1) detected in poultry farm in Vietnam",
        snippet: "Authorities have quarantined a large poultry farm in the Mekong Delta after detecting the H5N1 virus. Culling procedures are underway...",
        time: "Collected at 10:35:01 AM",
        status: "AI 검증 대기중",
        fullText: "HANOI – Vietnamese authorities have placed a large poultry farm in the Mekong Delta region under strict quarantine after detecting the highly pathogenic H5N1 avian influenza virus. The Ministry of Agriculture and Rural Development reported that over 50,000 birds are scheduled to be culled to prevent further spread. The virus was detected during routine surveillance after an unusual number of bird deaths were reported by the farm owner. Checkpoints have been established around the affected area to control the movement of poultry and related products. 'We are implementing swift and decisive measures to contain this outbreak at its source,' said a ministry spokesperson. There have been no reported human cases associated with this outbreak, but surveillance of farmworkers and nearby residents has been intensified as a precautionary measure."
    },
    {
        id: 4,
        source: "CDC",
        title: "CDC Issues Travel Advisory for Yellow Fever in Peru",
        snippet: "The Centers for Disease Control and Prevention has issued a Level 2 travel advisory for parts of Peru due to ongoing Yellow Fever transmission...",
        time: "Collected at 10:35:01 AM",
        status: "AI 검증 대기중",
        fullText: "ATLANTA – The U.S. Centers for Disease Control and Prevention (CDC) has issued a Level 2 'Practice Enhanced Precautions' travel advisory for several regions in Peru due to the risk of yellow fever. The advisory applies to all areas east of the Andes Mountains, including the popular tourist destinations of the Amazon basin. The CDC recommends that travelers aged 9 months or older who are heading to these areas should be vaccinated against yellow fever at least 10 days before their trip. 'Vaccination is the most effective way to prevent yellow fever,' the advisory states. Travelers are also advised to take measures to prevent mosquito bites, such as using insect repellent, wearing long-sleeved shirts and long pants, and staying in places with air conditioning or window and door screens."
    },
    {
        id: 5,
        source: "BNO News",
        title: "Cholera Spreading in Northern Nigeria Amid Floods",
        snippet: "Aid agencies are warning of a rapidly spreading cholera outbreak in flooded regions of northern Nigeria, with thousands of suspected cases...",
        time: "Collected at 10:35:01 AM",
        status: "AI 검증 대기중",
        fullText: "ABUJA – International aid agencies are sounding the alarm over a rapidly spreading cholera outbreak in the flood-ravaged regions of northern Nigeria. Contaminated water sources, a direct result of the worst flooding in a decade, have led to thousands of suspected cases. Doctors Without Borders (MSF) reported that their makeshift clinics are overwhelmed. 'The situation is dire. People are drinking from the same water that is contaminated with sewage,' said MSF field coordinator Aisha Bello. 'We are seeing entire families fall ill.' The Nigerian Centre for Disease Control (NCDC) has deployed emergency teams to distribute water purification tablets and set up oral rehydration points, but the scale of the disaster is hampering relief efforts. The UN has called for urgent international assistance to prevent a major humanitarian crisis."
    },
];


const SourceDetailModal: React.FC<SourceDetailModalProps> = ({ crawler, onClose, onViewLogs }) => {
  const [isContentModalOpen, setIsContentModalOpen] = useState(false);
  const [selectedContent, setSelectedContent] = useState<any | null>(null);

  if (!crawler) return null;

  const handleContentClick = (content: any) => {
    setSelectedContent(content);
    setIsContentModalOpen(true);
  };
    
  const chartData = crawler.history.map((value: number, index: number) => ({
    name: `Day ${index + 1}`,
    docs: value,
  }));

  return (
    <>
      <ContentDetailModal 
        isOpen={isContentModalOpen}
        onClose={() => setIsContentModalOpen(false)}
        content={selectedContent}
      />
      <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 animate-fadeIn" onClick={onClose}>
        <div className="bg-gray-50 rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden" onClick={e => e.stopPropagation()}>
          <div className="p-4 border-b bg-white flex-shrink-0 flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-primary-dark">{crawler.source}</h2>
              <a href={crawler.url} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-500 hover:underline">{crawler.url}</a>
            </div>
            <div className="flex items-center gap-4">
              <StatusIndicator status={crawler.status} isLarge={true} />
              <button onClick={onClose} className="text-gray-400 hover:text-gray-800 text-3xl font-bold">&times;</button>
            </div>
          </div>

          <div className="p-6 overflow-y-auto space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Card bodyClassName="!p-4 text-center"><DocumentTextIcon className="h-8 w-8 mx-auto text-blue-500"/><h4 className="text-gray-500 text-sm mt-2">24시간 내 수집량</h4><p className="text-2xl font-bold">{crawler.docs24h || crawler.newDocs}</p></Card>
                  <Card bodyClassName="!p-4 text-center"><ClockIcon className="h-8 w-8 mx-auto text-teal-500"/><h4 className="text-gray-500 text-sm mt-2">평균 실행 시간</h4><p className="text-2xl font-bold">{crawler.avgRuntime || 'N/A'}s</p></Card>
                  <Card bodyClassName="!p-4 text-center"><CheckCircleIcon className="h-8 w-8 mx-auto text-green-500"/><h4 className="text-gray-500 text-sm mt-2">성공률</h4><p className="text-2xl font-bold">{crawler.successRate.toFixed(1)}%</p></Card>
                  <Card bodyClassName="!p-4 text-center"><CalendarDaysIcon className="h-8 w-8 mx-auto text-purple-500"/><h4 className="text-gray-500 text-sm mt-2">다음 실행 예정</h4><p className="text-2xl font-bold">{crawler.nextRun}</p></Card>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card title="지난 7일간 수집량 추이">
                      <ResponsiveContainer width="100%" height={250}>
                          <BarChart data={chartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                              <CartesianGrid strokeDasharray="3 3" vertical={false}/>
                              <XAxis dataKey="name" fontSize={12} />
                              <YAxis fontSize={12} />
                              <Tooltip cursor={{fill: 'rgba(239, 246, 255, 0.7)'}} contentStyle={{ backgroundColor: '#fff', border: '1px solid #ddd', fontSize: '14px' }}/>
                              <Bar dataKey="docs" name="수집 문서" radius={[4, 4, 0, 0]}>
                                {chartData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={'#1E88E5'} />
                                ))}
                              </Bar>
                          </BarChart>
                      </ResponsiveContainer>
                  </Card>

                  <Card title="최근 활동">
                      <ul className="space-y-2 text-sm font-mono h-full overflow-y-auto">
                          {activityLog.map((log, index) => (
                              <li key={index} className="flex items-center gap-3">
                                  <span className="text-gray-400">{log.time}</span>
                                  <span className={`flex-shrink-0 px-2 py-0.5 text-xs rounded-full ${log.status === 'success' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>{log.status.toUpperCase()}</span>
                                  <span className="truncate">{log.message}</span>
                              </li>
                          ))}
                      </ul>
                  </Card>
              </div>

              <Card title="수집된 실제 내용 (최근 5건)">
                  <div className="space-y-3 h-48 overflow-y-auto pr-2">
                      {collectedContent.map((item, index) => (
                          <div key={index} className="bg-white p-3 rounded-md border hover:border-blue-300 transition-colors cursor-pointer" onClick={() => handleContentClick(item)}>
                              <div className="flex justify-between items-start">
                                  <div className="flex-grow">
                                      <p className="font-semibold text-gray-800">{item.title}</p>
                                      <p className="text-xs text-gray-500 mt-1">{item.snippet}</p>
                                  </div>
                                  <span className="flex items-center flex-shrink-0 ml-4 text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full font-medium">
                                      <HourglassIcon className="w-3 h-3 mr-1.5" />
                                      {item.status}
                                  </span>
                              </div>
                              <p className="text-right text-xs text-gray-400 mt-2">{item.time}</p>
                          </div>
                      ))}
                  </div>
              </Card>

          </div>

          <div className="p-4 border-t bg-white flex-shrink-0 flex justify-end gap-3">
              <button className="flex items-center gap-2 bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 transition-colors">
                  <BoltIcon className="h-5 w-5" />
                  즉시 실행
              </button>
              <button onClick={onViewLogs} className="flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-md hover:bg-blue-200 transition-colors">
                  <ClipboardDocumentListIcon className="h-5 w-5" />
                  상세 로그 보기
              </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SourceDetailModal;