import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, Sector, Area } from 'recharts';
import Card from '../components/Card';
import { outbreaks } from '../constants';
import ReportModal from '../components/ReportModal';
import QuestionMarkCircleIcon from '../components/icons/QuestionMarkCircleIcon';
import StatisticsHelpModal from '../components/StatisticsHelpModal';

const barData = [
    { name: 'USA', outbreaks: 40 }, { name: 'Brazil', outbreaks: 30 },
    { name: 'India', outbreaks: 20 }, { name: 'Vietnam', outbreaks: 27 },
    { name: 'Nigeria', outbreaks: 18 }, { name: 'Congo', outbreaks: 23 },
    { name: 'Mexico', outbreaks: 34 },
];
const lineData = [
    { name: 'Jan', outbreaks: 30 }, { name: 'Feb', outbreaks: 40 }, { name: 'Mar', outbreaks: 25 }, 
    { name: 'Apr', outbreaks: 50 }, { name: 'May', outbreaks: 45 }, { name: 'Jun', outbreaks: 60 },
];
const pieData = [
    { name: '호흡기', value: 400 }, { name: '수인성/식품매개', value: 300 },
    { name: '모기매개', value: 300 }, { name: '기타', value: 200 }
];
const COLORS = ['#0D47A1', '#1976D2', '#1E88E5', '#64B5F6'];

const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: any[]; label?: string | number; }) => {
    if (active && payload && payload.length) {
        const data = payload[0];
        const color = data.color || data.payload.fill;
        return (
            <div className="bg-white/80 backdrop-blur-sm p-3 rounded-xl shadow-lg border border-gray-200/50 animate-fadeInUp">
                <p className="font-bold text-secondary text-sm">{label || data.name}</p>
                <p className="text-sm" style={{ color: color }}>
                    {`${data.name}: `}<span className="font-semibold">{data.value.toLocaleString()}</span>
                </p>
            </div>
        );
    }
    return null;
};

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, outerRadius, percent, name, fill }: any) => {
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 8) * cos;
    const sy = cy + (outerRadius + 8) * sin;
    const mx = cx + (outerRadius + 25) * cos;
    const my = cy + (outerRadius + 25) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 20;
    const ey = my;
    const textAnchor = cos >= 0 ? 'start' : 'end';

    return (
        <g>
            <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" strokeOpacity={0.8} />
            <circle cx={sx} cy={sy} r={3} fill={fill} stroke="none" />
            <text x={ex + (cos >= 0 ? 1 : -1) * 6} y={ey} textAnchor={textAnchor} fill="#333" fontSize={12} fontWeight="bold">
                {name}
            </text>
            <text x={ex + (cos >= 0 ? 1 : -1) * 6} y={ey} dy={16} textAnchor={textAnchor} fill="#666" fontSize={11}>
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        </g>
    );
};


const StatisticsPage: React.FC = () => {
    const [isGenerating, setIsGenerating] = useState(false);
    const [reportGenerated, setReportGenerated] = useState(false);
    const [barIndex, setBarIndex] = useState<number | null>(null);
    const [activePieIndex, setActivePieIndex] = useState<number | null>(null);
    const [isReportModalOpen, setIsReportModalOpen] = useState(false);
    const [selectedOutbreak, setSelectedOutbreak] = useState<any | null>(null);
    const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);

    const handleGenerateReport = () => {
        setIsGenerating(true);
        setReportGenerated(false);
        setTimeout(() => {
            setIsGenerating(false);
            setReportGenerated(true);
            setTimeout(() => setReportGenerated(false), 4000);
        }, 2000);
    };

    const onPieEnter = (_: any, index: number) => {
        setActivePieIndex(index);
    };

    const onPieLeave = () => {
        setActivePieIndex(null);
    }

    const handleRowClick = (outbreak: any) => {
        setSelectedOutbreak(outbreak);
        setIsReportModalOpen(true);
    };
    
    const hexToRgba = (hex: string, alpha: number) => {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    };

    return (
        <>
            {isHelpModalOpen && <StatisticsHelpModal onClose={() => setIsHelpModalOpen(false)} />}
            {isReportModalOpen && selectedOutbreak && (
                <ReportModal 
                    outbreak={selectedOutbreak} 
                    onClose={() => {
                        setIsReportModalOpen(false);
                        setSelectedOutbreak(null);
                    }} 
                />
            )}
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <h1 className="text-3xl font-bold text-secondary">데이터 통계 및 정리</h1>
                        <button onClick={() => setIsHelpModalOpen(true)} className="text-gray-400 hover:text-primary-light transition-colors" aria-label="도움말 보기">
                            <QuestionMarkCircleIcon className="h-7 w-7" />
                        </button>
                    </div>
                    <div className="flex gap-2">
                        <input type="date" className="border-gray-300 rounded-md shadow-sm p-2" defaultValue="2025-01-01"/>
                        <input type="date" className="border-gray-300 rounded-md shadow-sm p-2" defaultValue="2025-06-30"/>
                        <button onClick={handleGenerateReport} disabled={isGenerating} className="bg-primary-dark text-white px-4 py-2 rounded-md hover:bg-primary-light disabled:bg-gray-400 transition-colors">
                            {isGenerating ? '생성 중...' : '보고서 생성'}
                        </button>
                    </div>
                </div>
                
                {reportGenerated && (
                    <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-md animate-fadeIn" role="alert">
                        <p className="font-bold">성공!</p>
                        <p>보고서가 성공적으로 생성되었습니다. (report_2025-H1.pdf)</p>
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <Card><h3 className="text-gray-500">총 발생 건수 (6개월)</h3><p className="text-3xl font-bold mt-2">250</p></Card>
                    <Card><h3 className="text-gray-500">영향 받은 국가</h3><p className="text-3xl font-bold mt-2">23</p></Card>
                    <Card><h3 className="text-gray-500">최다 발생 감염병</h3><p className="text-2xl font-bold mt-2">뎅기열</p></Card>
                    <Card><h3 className="text-gray-500">고위험 발생 건수</h3><p className="text-3xl font-bold mt-2 text-red-600">42</p></Card>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Card title="국가별 신규 발생 현황">
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={barData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }} onMouseLeave={() => setBarIndex(null)}>
                                <defs>
                                    <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#1E88E5" stopOpacity={0.8}/>
                                        <stop offset="95%" stopColor="#64B5F6" stopOpacity={0.2}/>
                                    </linearGradient>
                                </defs>
                                <CartesianGrid stroke="#f3f4f6" vertical={false} />
                                <XAxis dataKey="name" tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} />
                                <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} />
                                <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(239, 246, 255, 0.7)' }} />
                                <Bar dataKey="outbreaks" name="발생 건수" radius={[4, 4, 0, 0]}>
                                {barData.map((entry, index) => (
                                    <Cell 
                                        cursor="pointer" 
                                        fill={barIndex === index ? '#0D47A1' : 'url(#barGradient)'}
                                        onMouseEnter={() => setBarIndex(index)}
                                        key={`cell-${index}`}
                                        className="transition-all duration-300"
                                        />
                                ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </Card>
                    <Card title="전 세계 감염병 발생 추이">
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={lineData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                                <defs>
                                    <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#0D47A1" stopOpacity={0.4}/>
                                        <stop offset="95%" stopColor="#0D47A1" stopOpacity={0}/>
                                    </linearGradient>
                                    <filter id="lineShadow" x="-50%" y="-50%" width="200%" height="200%">
                                        <feDropShadow dx="0" dy="3" stdDeviation="4" floodColor="#0D47A1" floodOpacity="0.3"/>
                                    </filter>
                                </defs>
                                <CartesianGrid stroke="#f3f4f6" />
                                <XAxis dataKey="name" tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} />
                                <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} />
                                <Tooltip content={<CustomTooltip />} />
                                {/* FIX: The 'stroke' prop for the Area component expects a color string, not a boolean. Changed to "none" to disable the stroke. */}
                                <Area type="monotone" dataKey="outbreaks" stroke="none" fill="url(#areaGradient)" />
                                <Line type="monotone" dataKey="outbreaks" stroke="#0D47A1" strokeWidth={3} name="발생 건수" dot={{ r: 4, stroke: '#0D47A1', fill: '#fff', strokeWidth: 2 }} activeDot={{ r: 8, stroke: '#fff', strokeWidth: 2, fill: '#0D47A1' }} filter="url(#lineShadow)"/>
                            </LineChart>
                        </ResponsiveContainer>
                    </Card>
                    <Card title="감염병 유형별 분포">
                        <ResponsiveContainer width="100%" height={300}>
                        <PieChart margin={{ top: 30, right: 50, bottom: 30, left: 50 }}>
                                <Tooltip content={<CustomTooltip />} />
                                <Pie 
                                    data={pieData} 
                                    cx="50%" 
                                    cy="50%" 
                                    innerRadius={60}
                                    outerRadius={85}
                                    fill="#8884d8"
                                    paddingAngle={5}
                                    dataKey="value"
                                    nameKey="name"
                                    onMouseEnter={onPieEnter}
                                    onMouseLeave={onPieLeave}
                                    labelLine={false}
                                    label={renderCustomizedLabel}
                                >
                                    {pieData.map((entry, index) => (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={COLORS[index % COLORS.length]}
                                            stroke="#fff"
                                            strokeWidth={2}
                                            style={{
                                                transition: 'all 0.3s ease',
                                                transform: activePieIndex === index ? 'scale(1.05)' : 'scale(1)',
                                                transformOrigin: 'center center',
                                                filter: activePieIndex === index ? `drop-shadow(0 0 6px ${COLORS[index % COLORS.length]})` : 'none',
                                                cursor: 'pointer',
                                            }}
                                        />
                                    ))}
                                </Pie>
                                <Legend iconType="circle" onMouseEnter={onPieEnter} onMouseLeave={onPieLeave}/>
                            </PieChart>
                        </ResponsiveContainer>
                    </Card>
                    <Card title="최신 주요 감염병 정보" bodyClassName="!p-0">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="p-3">감염병</th><th className="p-3">위치</th><th className="p-3">보고일</th><th className="p-3">위험도</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {[...outbreaks].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 5).map((item) => (
                                        <tr key={item.id} className="border-b hover:bg-blue-50 cursor-pointer transition-colors" onClick={() => handleRowClick(item)}>
                                            <td className="p-3 font-semibold">{item.name}</td>
                                            <td className="p-3">{item.location}</td>
                                            <td className="p-3">{item.date}</td>
                                            <td className="p-3">
                                                <span 
                                                    className={`px-2 py-1 text-xs rounded-full font-medium`}
                                                    style={{
                                                        backgroundColor: hexToRgba(item.riskColor, 0.15),
                                                        color: item.riskColor
                                                    }}
                                                >
                                                    {item.risk}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </Card>
                </div>
            </div>
        </>
    );
};

export default StatisticsPage;