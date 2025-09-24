import React, { useState } from 'react';
import MinusIcon from './icons/MinusIcon';
import WindowIcon from './icons/WindowIcon';
import Square2StackIcon from './icons/Square2StackIcon';
import XMarkIcon from './icons/XMarkIcon';
import CloudArrowUpIcon from './icons/CloudArrowUpIcon';

interface DeployHelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const HelpSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div>
        <h4 className="font-semibold text-lg mb-2 text-secondary">{title}</h4>
        <div className="pl-4 border-l-2 border-blue-200">{children}</div>
    </div>
);

const DeployHelpModal: React.FC<DeployHelpModalProps> = ({ isOpen, onClose }) => {
    const [modalState, setModalState] = useState<'normal' | 'maximized' | 'minimized'>('maximized');
    const [preMinimizeState, setPreMinimizeState] = useState<'normal' | 'maximized'>('maximized');
  
    if (!isOpen) return null;

    const handleToggleMaximize = (e: React.MouseEvent) => {
        e.stopPropagation();
        setModalState(prev => (prev === 'maximized' ? 'normal' : 'maximized'));
    };

    const handleMinimize = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (modalState !== 'minimized') {
            setPreMinimizeState(modalState);
        }
        setModalState('minimized');
    };
    
    const handleInternalClose = (e: React.MouseEvent) => {
        e.stopPropagation();
        setModalState('maximized'); 
        onClose();
    }

    const handleRestore = () => {
        setModalState(preMinimizeState);
    };
    
    const wrapperClasses = {
        normal: "w-full max-w-5xl h-[90vh]",
        maximized: "w-screen h-screen rounded-none",
        minimized: "w-96 fixed bottom-4 right-4 animate-fadeInUp cursor-pointer",
    };
    
    const modalRootClasses = `
        fixed inset-0 bg-black bg-opacity-60 z-[2000]
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
                className={`bg-gray-50 rounded-xl shadow-2xl flex flex-col overflow-hidden transition-all duration-300 ${wrapperClasses[modalState]} ${modalState === 'minimized' ? 'pointer-events-auto' : ''}`}
                onClick={modalState === 'minimized' ? handleRestore : e => e.stopPropagation()}
            >
                <div className="p-4 border-b bg-white flex-shrink-0 flex justify-between items-center">
                    <h2 className={`font-bold text-primary-dark truncate pr-4 flex items-center gap-3 ${modalState !== 'minimized' ? 'text-xl' : 'text-base'}`}>
                        <CloudArrowUpIcon className="w-6 h-6"/>
                        {modalState !== 'minimized' ? '배포 및 운영(DevOps/SRE) 아키텍처' : '배포/운영 계획'}
                    </h2>
                    <div className="flex items-center gap-1">
                        {modalState !== 'minimized' ? (
                            <>
                                <button onClick={handleMinimize} className="p-2 rounded-full text-gray-500 hover:bg-gray-200"><MinusIcon className="w-5 h-5"/></button>
                                <button onClick={handleToggleMaximize} className="p-2 rounded-full text-gray-500 hover:bg-gray-200">
                                    {modalState === 'maximized' ? <Square2StackIcon className="w-5 h-5" /> : <WindowIcon className="w-5 h-5" />}
                                </button>
                                <button onClick={handleInternalClose} className="p-2 rounded-full text-gray-500 hover:bg-gray-200"><XMarkIcon className="w-5 h-5" /></button>
                            </>
                        ) : (
                            <button onClick={handleInternalClose} className="p-1 rounded-full text-gray-500 hover:bg-gray-200"><XMarkIcon className="w-4 h-4" /></button>
                        )}
                    </div>
                </div>
                
                {modalState !== 'minimized' && (
                    <>
                        <div className="p-8 overflow-y-auto flex-grow">
                            <div className="prose max-w-none">
                                <h3>서론: SRE 원칙에 기반한 안정적인 서비스 제공</h3>
                                <p>GIDS 시스템의 운영 목표는 단순히 '서버가 다운되지 않는 것'을 넘어, <strong>사이트 신뢰성 엔지니어링(Site Reliability Engineering, SRE)</strong> 원칙에 따라 사전에 정의된 서비스 수준 목표(SLO)를 데이터 기반으로 달성하는 것입니다. 이를 위해 우리는 배포, 모니터링, 장애 대응의 모든 과정을 자동화하고, 반복적인 수작업(Toil)을 제거하여 엔지니어가 시스템 개선에 더 많은 시간을 할애할 수 있는 환경을 구축합니다.</p>
                                
                                <HelpSection title="1. 무중단 배포(Zero-Downtime Deployment) 전략">
                                    <p>사용자에게 영향을 주지 않고 시스템을 안전하게 업데이트하기 위해 GitOps 기반의 Blue/Green 배포 전략을 채택합니다.</p>
                                     <div className="bg-white p-4 my-4 rounded-lg shadow border">
                                        <h5 className="font-bold text-center">Blue/Green Deployment Flow</h5>
                                        <pre className="bg-gray-100 p-2 rounded-md text-xs font-mono shadow-inner">
{`
1. Current State:
   - [Load Balancer] ---> [Service (Blue)] ---> [v1.0 Pods] (Live Traffic)
   - [Service (Green)] --> [Empty]

2. Deploy New Version (v1.1):
   - CI/CD pipeline deploys v1.1 to Green environment.
   - [Load Balancer] ---> [Service (Blue)] ---> [v1.0 Pods] (Live Traffic)
   - [Service (Green)] --> [v1.1 Pods] (Idle, Smoke Tests Run)

3. Traffic Switch:
   - After Green passes tests, update Load Balancer to point to Green.
   - [Load Balancer] ---> [Service (Green)] --> [v1.1 Pods] (Live Traffic)
   - [Service (Blue)] ---> [v1.0 Pods] (Idle, Standby for rollback)

4. Final State (after stabilization):
   - Decommission Blue environment.
   - [Load Balancer] ---> [Service (Green)] --> [v1.1 Pods] (Live Traffic)
`}
                                        </pre>
                                    </div>
                                    <ul className="list-disc space-y-2 text-gray-700">
                                        <li><strong>GitOps (with ArgoCD):</strong> 모든 배포 정보(어떤 버전의 컨테이너를, 몇 개나 실행할지 등)는 Git 리포지토리에서 관리됩니다. 개발자가 Git에 변경 사항을 푸시하면, ArgoCD가 이를 감지하여 자동으로 쿠버네티스 클러스터에 반영합니다. 이는 모든 배포가 추적 가능하고, 클릭 한 번으로 이전 버전으로 롤백(rollback)할 수 있게 해줍니다.</li>
                                        <li><strong>Blue/Green 배포:</strong> 현재 운영 중인 환경(Blue)과 동일한 복제 환경(Green)을 준비합니다. 새 버전을 Green 환경에 먼저 배포하고, 자동화된 테스트를 통해 안정성을 완벽하게 검증한 후, 로드 밸런서의 트래픽을 Blue에서 Green으로 한 번에 전환합니다. 만약 문제가 발생하면 즉시 트래픽을 다시 Blue로 돌려 장애 시간을 '0'에 가깝게 만듭니다.</li>
                                    </ul>
                                </HelpSection>
                                
                                <HelpSection title="2. 코드로서의 인프라 (Infrastructure as Code, IaC)">
                                    <p>모든 클라우드 인프라(서버, 네트워크, 데이터베이스 등)를 수동으로 구성하는 대신, <strong>Terraform</strong> 코드를 사용하여 자동으로 구축하고 관리합니다. 이는 다음과 같은 장점을 가집니다.</p>
                                    <ul className="list-disc space-y-2 text-gray-700">
                                        <li><strong>재현성 및 일관성:</strong> 개발, 스테이징, 운영 환경을 항상 동일한 구성으로 유지하여 '내 컴퓨터에서는 됐는데...'와 같은 문제를 원천적으로 차단합니다.</li>
                                        <li><strong>변경 관리 및 감사:</strong> 인프라의 모든 변경 사항이 Git에 코드로 기록되므로, 누가, 언제, 무엇을 변경했는지 명확하게 추적할 수 있습니다.</li>
                                        <li><strong>신속한 재해 복구 (DR):</strong> 심각한 장애로 전체 인프라가 손상되더라도, Terraform 코드를 실행하여 수 분 내에 모든 시스템을 원래 상태로 복구할 수 있습니다.</li>
                                    </ul>
                                </HelpSection>

                                <HelpSection title="3. 관측 가능성 (Observability) 구축">
                                    <p>시스템에 문제가 발생했을 때 "왜?"라고 질문하고 답을 찾을 수 있는 능력을 확보하기 위해, 우리는 '관측 가능성의 세 기둥'을 구축합니다.</p>
                                    <div className="overflow-x-auto my-4">
                                        <table className="min-w-full divide-y divide-gray-300">
                                            <thead className="bg-gray-100">
                                                <tr>
                                                    <th>Pillar</th>
                                                    <th>Tool</th>
                                                    <th>What it answers</th>
                                                    <th>Example</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-200 bg-white">
                                                <tr>
                                                    <td><strong>Metrics</strong></td>
                                                    <td>Prometheus & Grafana</td>
                                                    <td>"What is happening?" (시스템 상태)</td>
                                                    <td>API 요청의 99%가 200ms 이내에 처리되고 있는가?</td>
                                                </tr>
                                                <tr>
                                                    <td><strong>Logging</strong></td>
                                                    <td>ELK Stack</td>
                                                    <td>"Why is it happening?" (이벤트의 원인)</td>
                                                    <td>특정 API 요청이 실패한 이유는 무엇인가? (에러 로그 확인)</td>
                                                </tr>
                                                <tr>
                                                    <td><strong>Tracing</strong></td>
                                                    <td>Jaeger</td>
                                                    <td>"Where is it happening?" (문제 발생 위치)</td>
                                                    <td>API 요청이 느릴 때, DB 쿼리, 외부 API 호출 중 어디서 시간이 오래 걸리는가?</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <p>이 세 가지 시스템을 통해 우리는 장애가 발생하기 전에 이상 징후를 미리 감지(Proactive Monitoring)하고, 장애 발생 시에는 근본 원인을 신속하게 분석하여 평균 복구 시간(MTTR)을 최소화합니다.</p>
                                </HelpSection>
                            </div>
                        </div>
                        <div className="p-4 border-t bg-white flex-shrink-0 flex justify-end gap-3">
                            <button onClick={handleInternalClose} className="bg-primary-dark text-white px-4 py-2 rounded-md hover:bg-primary-light transition-colors">닫기</button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default DeployHelpModal;