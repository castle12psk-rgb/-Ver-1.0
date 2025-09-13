import React from 'react';
import DatabaseIcon from './icons/DatabaseIcon';
import ArrowLongRightIcon from './icons/ArrowLongRightIcon';
import StatsIcon from './icons/StatsIcon';
import ChartIcon from './icons/ChartIcon';
import DocumentTextIcon from './icons/DocumentTextIcon';
import Cog6ToothIcon from './icons/Cog6ToothIcon';
import UserGroupIcon from './icons/UserGroupIcon';


interface StatisticsHelpModalProps {
  onClose: () => void;
}

const InfoCard: React.FC<{ icon: React.ReactNode, title: string, children: React.ReactNode, className?: string }> = ({ icon, title, children, className }) => (
    <div className={`flex-1 flex flex-col items-center text-center p-3 bg-white rounded-lg border border-gray-200 shadow-sm ${className}`}>
        <div className="text-primary-light mb-2">{icon}</div>
        <h4 className="font-bold text-md text-secondary">{title}</h4>
        <p className="text-xs text-gray-600 mt-1">{children}</p>
    </div>
);

const StatisticsHelpModal: React.FC<StatisticsHelpModalProps> = ({ onClose }) => {
  return (
    <div 
        className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-[2000] animate-fadeIn" 
        onClick={onClose}
        aria-modal="true"
        role="dialog"
    >
      <div 
        className="bg-gray-50 rounded-xl shadow-2xl w-full max-w-6xl max-h-[90vh] flex flex-col overflow-hidden" 
        onClick={e => e.stopPropagation()}
      >
        <div className="p-4 border-b bg-white flex-shrink-0 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-primary-dark">데이터 통계 및 정리 도움말</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-800 text-3xl font-bold">&times;</button>
        </div>
        
        <div className="p-8 overflow-y-auto space-y-8">
            <div>
                <h3 className="text-xl font-semibold text-secondary mb-2">기능 설명</h3>
                <p className="text-gray-700">
                    '데이터 통계 및 정리' 페이지는 시스템에 축적된 모든 검증된 감염병 데이터를 기반으로 다양한 통계 분석 결과를 시각적으로 제공합니다. 사용자는 기간을 설정하여 데이터를 필터링하고, 주요 지표와 차트를 통해 인사이트를 얻을 수 있으며, 클릭 한 번으로 종합 보고서를 생성할 수 있습니다. 이 페이지는 데이터 기반의 신속하고 정확한 공중 보건 정책 결정을 지원하는 것을 목표로 합니다.
                </p>
            </div>

            <div>
                <h3 className="text-xl font-semibold text-secondary mb-4">데이터 분석 및 보고 과정</h3>
                <div className="flex items-center justify-between gap-2">
                    <InfoCard icon={<DatabaseIcon className="w-10 h-10" />} title="1. 검증된 데이터 집계">
                        AI 검증을 통과한 신뢰도 높은 정형 데이터(발생 국가, 감염병 종류, 위험 등급, 날짜 등)를 집계합니다.
                    </InfoCard>

                    <ArrowLongRightIcon className="w-10 h-10 text-gray-300 flex-shrink-0" />

                    <InfoCard icon={<Cog6ToothIcon className="w-10 h-10" />} title="2. 통계 처리 및 분석">
                        설정된 기간을 기준으로 데이터를 필터링하고, 국가별 발생 건수, 시간별 추이, 유형별 분포 등 의미 있는 통계 지표를 계산합니다.
                    </InfoCard>
                    
                    <ArrowLongRightIcon className="w-10 h-10 text-gray-300 flex-shrink-0" />

                     <InfoCard icon={
                        <div className="flex gap-2">
                            <ChartIcon className="w-8 h-8" /> 
                            <StatsIcon className="w-8 h-8" />
                            <DocumentTextIcon className="w-8 h-8" />
                        </div>
                     } title="3. 시각화 및 보고서 생성">
                        분석된 통계 데이터를 막대 차트, 꺾은선 그래프, 파이 차트 등 이해하기 쉬운 시각 자료로 변환하고, 생성 요청 시 PDF 보고서로 만듭니다.
                    </InfoCard>

                    <ArrowLongRightIcon className="w-10 h-10 text-gray-300 flex-shrink-0" />

                     <InfoCard icon={<UserGroupIcon className="w-10 h-10" />} title="4. 인사이트 및 정책 지원">
                        생성된 시각 자료와 보고서는 데이터에 숨겨진 패턴과 인사이트를 제공하여 효과적인 공중 보건 정책 수립을 지원합니다.
                    </InfoCard>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default StatisticsHelpModal;