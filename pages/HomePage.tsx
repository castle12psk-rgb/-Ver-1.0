import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import GlobeIcon from '../components/icons/GlobeIcon';
import BrainIcon from '../components/icons/BrainIcon';
import MapIcon from '../components/icons/MapIcon';
import ChartIcon from '../components/icons/ChartIcon';
import Card from '../components/Card';
import MegaphoneIcon from '../components/icons/MegaphoneIcon';
import QuestionMarkCircleIcon from '../components/icons/QuestionMarkCircleIcon';
import ChevronDownIcon from '../components/icons/ChevronDownIcon';
import { FULL_NOTICES_DATA } from '../constants';
import NoticeModal from '../components/NoticeModal';
import NoticeDetailModal from '../components/NoticeDetailModal';

// FIX: Define placeholder image URLs to resolve undefined variable errors.
const collectionCardBackgroundImage = 'https://images.unsplash.com/photo-1581093458791-9a7ca5a625b3?auto=format&fit=crop&q=80';
const verificationCardBackgroundImage = 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80';
const visualizationCardBackgroundImage = 'https://images.unsplash.com/photo-1534294643649-9831a2c5625c?auto=format&fit=crop&q=80';
const statisticsCardBackgroundImage = 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80';


const features = [
  {
    icon: GlobeIcon,
    title: '실시간 정보 수집 자동화',
    to: '/collection'
  },
  {
    icon: BrainIcon,
    title: 'AI 기반 정보 검증',
    to: '/verification'
  },
  {
    icon: MapIcon,
    title: '직관적 시각화 플랫폼',
    to: '/visualization'
  },
  {
    icon: ChartIcon,
    title: '데이터 통계 및 정리',
    to: '/statistics'
  }
];

const faqs = [
    { 
        question: 'GIDS는 어떤 데이터를 수집하나요?', 
        answer: 'GIDS는 WHO, CDC 등 전 세계 공신력 있는 기관의 공식 발표 자료, 주요 뉴스 피드, 관련 소셜 미디어 데이터를 실시간으로 수집하여 종합적인 분석을 제공합니다.' 
    },
    { 
        question: 'AI 정보 검증의 정확도는 어느 정도인가요?', 
        answer: '저희 AI 모델은 RAG(검색 증강 생성) 기술을 기반으로 99% 이상의 높은 정확도를 유지하고 있으며, 지속적인 학습을 통해 성능이 향상되고 있습니다.' 
    },
    { 
        question: '데이터 시각화는 어떻게 활용할 수 있나요?', 
        answer: '지도 기반 시각화 플랫폼을 통해 감염병의 전 세계적 분포와 확산 경로를 직관적으로 파악하고, 필터 기능을 사용하여 특정 지역이나 감염병에 대한 심층 분석을 수행할 수 있습니다.' 
    },
];

const AccordionItem: React.FC<{
    item: { question: string, answer: string };
    isOpen: boolean;
    onClick: () => void;
}> = ({ item, isOpen, onClick }) => {
    return (
        <div className="border-b border-gray-200">
            <button
                className="w-full flex justify-between items-center text-left p-4 hover:bg-gray-100 focus:outline-none"
                onClick={onClick}
                aria-expanded={isOpen}
            >
                <span className="font-semibold text-secondary">{item.question}</span>
                <ChevronDownIcon className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${isOpen ? 'transform rotate-180' : ''}`} />
            </button>
            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-40' : 'max-h-0'}`}>
                <div className="p-4 pt-0 text-gray-600">
                    {item.answer}
                </div>
            </div>
        </div>
    );
};


const HomePage: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [isNoticeModalOpen, setIsNoticeModalOpen] = useState(false);
  const [selectedNotice, setSelectedNotice] = useState<any | null>(null);

  const notices = FULL_NOTICES_DATA.slice(0, 4);

  return (
    <>
      <NoticeModal 
        isOpen={isNoticeModalOpen}
        onClose={() => setIsNoticeModalOpen(false)}
      />
      <NoticeDetailModal
        isOpen={!!selectedNotice}
        onClose={() => setSelectedNotice(null)}
        notice={selectedNotice}
      />
      <div className="text-center text-secondary">
        <div className="bg-white p-12 rounded-lg shadow-xl max-w-5xl mx-auto">
          <h1 className="text-5xl font-bold text-primary-dark">해외감염병 감시 솔루션</h1>
          <p className="mt-2 text-xl text-gray-500">AI-Powered Platform for Global Infectious Disease Surveillance and Analysis</p>
          <p className="mt-8 text-lg max-w-3xl mx-auto">
            본 시스템은 전 세계의 감염병 발생 정보를 실시간으로 수집하고 AI를 통해 정확성을 검증하여, 지도 기반으로 시각화하고 통계 데이터를 제공하는 차세대 지능형 방역 정보 지원 플랫폼입니다. 이를 통해 대한민국 질병관리청의 신속하고 정확한 정책 결정을 지원합니다.
          </p>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => {
              const Icon = feature.icon;
              const isCollectionCard = feature.title === '실시간 정보 수집 자동화';
              const isVerificationCard = feature.title === 'AI 기반 정보 검증';
              const isVisualizationCard = feature.title === '직관적 시각화 플랫폼';
              const isStatisticsCard = feature.title === '데이터 통계 및 정리';

              let bgImage = '';
              if (isCollectionCard) bgImage = collectionCardBackgroundImage;
              if (isVerificationCard) bgImage = verificationCardBackgroundImage;
              if (isVisualizationCard) bgImage = visualizationCardBackgroundImage;
              if (isStatisticsCard) bgImage = statisticsCardBackgroundImage;
              
              if (bgImage) {
                  return (
                      <Link
                        key={feature.title}
                        to={feature.to}
                        className="group p-6 rounded-lg shadow-md transition-all duration-300 transform hover:-translate-y-1 text-white flex flex-col items-center justify-center text-center relative overflow-hidden h-40"
                        style={{
                          backgroundImage: `url("${bgImage}")`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                        }}
                      >
                        <div className="absolute inset-0 bg-primary-dark opacity-70 group-hover:opacity-60 transition-opacity duration-300 rounded-lg"></div>
                        <div className="relative z-10 flex flex-col items-center text-center">
                          <Icon className="h-12 w-12 mx-auto text-white" />
                          <h3 className="mt-4 text-lg font-semibold">{feature.title}</h3>
                        </div>
                      </Link>
                  );
              }

              return (
                <Link
                  key={feature.title}
                  to={feature.to}
                  className="group bg-gray-50 hover:bg-accent hover:text-white p-6 rounded-lg shadow-md transition-all duration-300 transform hover:-translate-y-1 h-40 flex flex-col justify-center items-center"
                >
                  <Icon className="h-12 w-12 mx-auto text-accent group-hover:text-white transition-colors duration-300" />
                  <h3 className="mt-4 text-lg font-semibold">{feature.title}</h3>
                </Link>
              );
            })}
          </div>
        </div>

        <div className="mt-8 max-w-5xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="text-left">
            <div className="p-4 border-b flex justify-between items-center">
              <div className="flex items-center gap-3">
                <MegaphoneIcon className="w-6 h-6 text-primary-light" />
                <h2 className="text-xl font-semibold text-secondary">공지사항</h2>
              </div>
              <button onClick={() => setIsNoticeModalOpen(true)} className="text-sm text-blue-500 hover:underline">더보기</button>
            </div>
            <ul className="p-6 space-y-3">
              {notices.map(notice => (
                <li key={notice.id} 
                    className="flex justify-between items-baseline hover:bg-blue-50 p-2 rounded-md cursor-pointer transition-colors"
                    onClick={() => setSelectedNotice(notice)}
                >
                  <span className="truncate pr-4 text-gray-800">{notice.title}</span>
                  <span className="text-sm text-gray-400 flex-shrink-0">{notice.date}</span>
                </li>
              ))}
            </ul>
          </Card>

          <Card className="text-left">
            <div className="p-4 border-b flex justify-between items-center">
              <div className="flex items-center gap-3">
                <QuestionMarkCircleIcon className="w-6 h-6 text-primary-light" />
                <h2 className="text-xl font-semibold text-secondary">이용안내</h2>
              </div>
            </div>
            <div className="p-2">
              {faqs.map((faq, index) => (
                  <AccordionItem 
                      key={index}
                      item={faq}
                      isOpen={openFaq === index}
                      onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  />
              ))}
            </div>
          </Card>
        </div>

      </div>
    </>
  );
};

export default HomePage;