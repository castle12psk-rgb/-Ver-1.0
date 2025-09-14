import { Crawler, CrawlerStatus, VerificationItem, VerificationStatus, User, VerificationRule, AdminCrawler, KnowledgeBaseItem, UserActivity, NotificationRule, ApiKey } from './types';

export const RISK_LEVEL_COLORS: { [key: string]: string } = {
  '높음': '#C53030', // Dark Red
  '중간': '#D97706', // Dark Yellow
  '낮음': '#38A169', // Green
};

export const CRAWLER_DATA: Crawler[] = [
  { source: 'WHO (World Health Organization)', status: CrawlerStatus.Active, lastCrawled: '2 mins ago', newDocs: 5 },
  { source: 'CDC (Centers for Disease Control)', status: CrawlerStatus.Active, lastCrawled: '3 mins ago', newDocs: 2 },
  { source: 'Reuters Health', status: CrawlerStatus.Active, lastCrawled: '5 mins ago', newDocs: 8 },
  { source: 'Associated Press Health', status: CrawlerStatus.Active, lastCrawled: '5 mins ago', newDocs: 3 },
  { source: 'ECDC (European Centre for Disease Prevention)', status: CrawlerStatus.Warning, lastCrawled: '15 mins ago', newDocs: 0 },
  { source: 'BNO News', status: CrawlerStatus.Active, lastCrawled: '1 min ago', newDocs: 12 },
  { source: 'Local News Aggregator', status: CrawlerStatus.Error, lastCrawled: '1 hour ago', newDocs: 0 },
];

export const INCOMING_DATA: VerificationItem[] = [
  { id: 101, title: 'New Dengue Fever Strain Emerges in Southeast Asia', snippet: 'Health officials report a more virulent strain of dengue fever spreading...', source: 'Reuters Health', url: '#', status: VerificationStatus.Review, aiConfidence: 0 },
  { id: 102, title: 'Study finds link between coffee and reduced flu symptoms', snippet: 'A recent study published in the Journal of Medicine suggests daily coffee intake...', source: 'Associated Press', url: '#', status: VerificationStatus.Review, aiConfidence: 0 },
  { id: 103, title: 'Bird Flu Outbreak Contained in Vietnam Farm', snippet: 'Authorities in Vietnam confirmed they have successfully contained an H5N1 outbreak...', source: 'WHO', url: '#', status: VerificationStatus.Review, aiConfidence: 0 },
  { id: 104, title: 'Opinion: Are we prepared for the next pandemic?', snippet: 'The question is not if, but when the next global pandemic will strike...', source: 'New York Times', url: '#', status: VerificationStatus.Review, aiConfidence: 0 },
];

export const VERIFIED_DATA: VerificationItem[] = [
    { id: 201, title: 'Cholera cases rise in Nigeria amid heavy flooding', snippet: 'Floods have exacerbated a cholera outbreak in northern Nigeria...', source: 'CDC', finalResult: VerificationStatus.Fact, finalConfidence: 99.2, url: '#', status: VerificationStatus.Fact, aiConfidence: 99.2 },
    { id: 202, title: 'Claim of "airborne rabies" debunked by scientists', snippet: 'A viral social media post claimed a new strain of rabies could be transmitted through the air...', source: 'Snopes', finalResult: VerificationStatus.Fake, finalConfidence: 99.9, url: '#', status: VerificationStatus.Fake, aiConfidence: 99.9 },
    { id: 203, title: 'Experts debate the future of mRNA vaccines', snippet: 'At the Global Health Summit, leading immunologists discussed the potential...', source: 'The Lancet', finalResult: VerificationStatus.Opinion, finalConfidence: 95.0, url: '#', status: VerificationStatus.Opinion, aiConfidence: 95.0 },
];

export const REVIEW_DATA: VerificationItem[] = [
    { id: 301, title: 'Unconfirmed reports of mysterious illness in Peruvian village', snippet: 'Local media are reporting several cases of an unidentified respiratory illness...', source: 'Local News Aggregator', url: 'https://example.com', status: VerificationStatus.Review, aiConfidence: 45.5, classificationResult: "Initial AI classification suggests this is likely Fact but requires human confirmation due to unverified sources.", ragSummary: "No official reports from Peruvian Ministry of Health or WHO found. Cross-referencing with local news shows 3 similar but unlinked reports in the last 48 hours.", evidence: "Retrieved 0 documents from trusted sources. Retrieved 3 documents from local news aggregators with low-to-medium trust scores. The content mentions 'breathing difficulties' and 'high fever' but does not identify a specific pathogen.", fullText: 'Full text of the article about the mysterious illness. It details symptoms and local response, but lacks official confirmation from health bodies.' },
    { id: 302, title: 'Social media rumor about contaminated water supply', snippet: '"Warning! Do not drink tap water in City X, it has been contaminated..."', source: 'Social Media', url: 'https://example.com', status: VerificationStatus.Review, aiConfidence: 20.1, classificationResult: "Initial AI classification suggests this is likely Fake News due to sensationalist language and lack of sources.", ragSummary: "No official reports from city water authorities or health departments found. Cross-referencing with local news shows no mention of water contamination issues.", evidence: "Retrieved 0 documents from any trusted or untrusted source matching the claim. The claim structure matches 98.7% with known misinformation templates (Template ID: #HW-004).", fullText: "A viral social media post claims the water supply is contaminated. The post urges residents to only drink bottled water. It has been shared over 10,000 times." },
    { id: 303, title: 'Malaria medication shows promise for treating Long COVID', snippet: 'An early-stage trial suggests an existing malaria drug may alleviate some Long COVID symptoms.', source: 'BioMed Central', url: 'https://example.com', status: VerificationStatus.Review, aiConfidence: 75.8, classificationResult: "Classified as Fact, but with moderate confidence as the study is preliminary.", ragSummary: "Found the referenced pre-print study. It is a small-scale, non-peer-reviewed trial. Major health organizations like the CDC and WHO have not yet commented on or validated these findings.", evidence: "Retrieved 1 document: the pre-print study 'Artemisinin effects on post-viral fatigue syndromes' (doi:10.1234/biorxiv.12345). The study is non-peer-reviewed and has a sample size of n=40.", fullText: "The full article discusses the methodology of the small trial, highlighting the statistical significance of its findings but also emphasizing the need for larger, controlled studies before any clinical recommendations can be made." },
];

export const KNOWLEDGE_BASE_DATA: KnowledgeBaseItem[] = [
    { id: 1, source: 'WHO Disease Outbreak News (DONs)', documents: 15280, lastUpdated: '2025-09-12 10:30', status: 'Active' },
    { id: 2, source: 'CDC Global Health Protection', documents: 8755, lastUpdated: '2025-09-12 10:28', status: 'Active' },
    { id: 3, source: 'ECDC Threat Reports', documents: 6210, lastUpdated: '2025-09-12 09:55', status: 'Active' },
    { id: 4, source: 'Internal Academic Paper DB', documents: 45982, lastUpdated: '2025-09-11 18:00', status: 'Active' },
];

export const outbreaks = [
    { id: 1, name: '말라리아', location: '나이지리아, 라고스', date: '2025-09-12', risk: '높음', riskColor: RISK_LEVEL_COLORS['높음'], lat: 6.5244, lng: 3.3792, size: 18, pulse: true, summary: '라고스 지역에서 우기 이후 말라리아 환자가 급증하고 있으며, 보건 당국이 방역을 강화하고 있습니다.' },
    { id: 2, name: '지카 바이러스', location: '콜롬비아, 바랑키야', date: '2025-09-11', risk: '중간', riskColor: RISK_LEVEL_COLORS['중간'], lat: 10.9639, lng: -74.7964, size: 14, summary: '콜롬비아 북부 해안 지역에서 지카 바이러스 감염 사례가 소규모로 발생하여 임산부에게 주의보가 내려졌습니다.' },
    { id: 3, name: '뎅기열', location: '브라질, 리우데자네이루', date: '2025-09-10', risk: '높음', riskColor: RISK_LEVEL_COLORS['높음'], lat: -22.9068, lng: -43.1729, size: 20, summary: '브라질 보건부는 최근 폭우로 인해 모기 개체수가 급증하면서 뎅기열 사례가 30% 증가했다고 보고했습니다.' },
    { id: 4, name: '리슈만편모충증', location: '아프가니스탄, 카불', date: '2025-09-09', risk: '낮음', riskColor: RISK_LEVEL_COLORS['낮음'], lat: 34.5553, lng: 69.2075, size: 10, summary: '카불 외곽 난민 캠프에서 피부 리슈만편모충증이 산발적으로 보고되고 있습니다.' },
    { id: 5, name: '조류 인플루엔자', location: '베트남, 메콩 델타', date: '2025-09-08', risk: '중간', riskColor: RISK_LEVEL_COLORS['중간'], lat: 10.0452, lng: 105.7468, size: 16, summary: '메콩 델타 지역 가금류 농장에서 H5N1 조류 인플루엔자가 발생하여 당국이 긴급 방역 조치에 나섰습니다.'},
    { id: 6, name: '장티푸스', location: '파키스탄, 카라치', date: '2025-09-07', risk: '중간', riskColor: RISK_LEVEL_COLORS['중간'], lat: 24.8607, lng: 67.0011, size: 15, summary: '카라치의 일부 지역에서 오염된 물로 인한 장티푸스 집단 발병이 의심되어 역학 조사가 진행 중입니다.' },
    { id: 7, name: '콜레라', location: '나이지리아, 카노 주', date: '2025-09-05', risk: '높음', riskColor: RISK_LEVEL_COLORS['높음'], lat: 12.0022, lng: 8.5920, size: 16, summary: '나이지리아 북부 지역의 오염된 식수원으로 인해 콜레라가 확산되고 있습니다.'},
    { id: 8, name: '일본뇌염', location: '필리핀, 루손 섬', date: '2025-09-04', risk: '중간', riskColor: RISK_LEVEL_COLORS['중간'], lat: 16.0, lng: 121.0, size: 14, summary: '필리핀 루손 섬 농경 지역에서 일본뇌염 바이러스 매개 모기가 발견되어 예방 접종이 권고되었습니다.' },
    { id: 9, name: '웨스트나일열', location: '미국, 캘리포니아', date: '2025-09-02', risk: '낮음', riskColor: RISK_LEVEL_COLORS['낮음'], lat: 36.7783, lng: -119.4179, size: 12, summary: '캘리포니아 중부에서 웨스트나일열 감염 사례가 확인되었으나 확산세는 주춤한 상태입니다.' },
    { id: 10, name: '홍역', location: '영국, 런던', date: '2025-09-01', risk: '중간', riskColor: RISK_LEVEL_COLORS['중간'], lat: 51.5072, lng: -0.1276, size: 16, summary: '런던 일부 지역에서 예방 접종률 감소로 인해 홍역이 소규모로 유행하고 있습니다.' },
    { id: 11, name: '라임병', location: '독일, 바이에른', date: '2025-08-30', risk: '낮음', riskColor: RISK_LEVEL_COLORS['낮음'], lat: 48.7904, lng: 11.4979, size: 10, summary: '독일 남부 바이에른 주 산림 지역에서 진드기를 매개로 한 라임병 감염 위험이 보고되었습니다.' },
    { id: 12, name: '에볼라', location: '콩고, 북키부 주', date: '2025-08-28', risk: '중간', riskColor: RISK_LEVEL_COLORS['중간'], lat: -1.6753, lng: 29.2285, size: 16, summary: '콩고민주공화국 북동부에서 에볼라 재발 사례가 확인되었습니다. 접촉자 추적이 진행 중입니다.'},
    { id: 13, name: '크리미안-콩고 출혈열', location: '터키, 앙카라', date: '2025-08-27', risk: '중간', riskColor: RISK_LEVEL_COLORS['중간'], lat: 39.9334, lng: 32.8597, size: 15, summary: '터키 중부 농촌 지역에서 진드기에 물려 CCHF에 감염된 환자가 발생했습니다.' },
    { id: 14, name: 'MERS', location: '사우디아라비아, 리야드', date: '2025-08-25', risk: '높음', riskColor: RISK_LEVEL_COLORS['높음'], lat: 24.7136, lng: 46.6753, size: 17, summary: '리야드에서 낙타와 접촉한 후 MERS-CoV에 감염된 새로운 사례가 확인되어 보건 당국이 긴장하고 있습니다.' },
    { id: 15, name: '수족구병', location: '싱가포르', date: '2025-08-22', risk: '중간', riskColor: RISK_LEVEL_COLORS['중간'], lat: 1.3521, lng: 103.8198, size: 14, summary: '싱가포르 내 유치원에서 수족구병 집단 발병이 발생하여 일부 시설이 임시 폐쇄되었습니다.' },
    { id: 16, name: '황열', location: '페루, 이키토스', date: '2025-08-21', risk: '낮음', riskColor: RISK_LEVEL_COLORS['낮음'], lat: -3.7491, lng: -73.2538, size: 12, summary: '페루 아마존 지역에서 황열 사례가 보고되었습니다. 낮은 수준의 전파가 의심됩니다.'},
    { id: 17, name: '로타바이러스', location: '인도, 뭄바이', date: '2025-08-20', risk: '중간', riskColor: RISK_LEVEL_COLORS['중간'], lat: 19.0760, lng: 72.8777, size: 16, summary: '뭄바이 빈민가 지역에서 영유아를 중심으로 로타바이러스성 장염이 유행하고 있습니다.' },
    { id: 18, name: 'A형 간염', location: '이집트, 카이로', date: '2025-08-18', risk: '낮음', riskColor: RISK_LEVEL_COLORS['낮음'], lat: 30.0444, lng: 31.2357, size: 12, summary: '카이로의 특정 식당과 관련된 A형 간염 환자가 발생하여 위생 조사가 이루어지고 있습니다.' },
    { id: 19, name: '리프트밸리열', location: '케냐, 가리사', date: '2025-08-15', risk: '높음', riskColor: RISK_LEVEL_COLORS['높음'], lat: -0.4573, lng: 39.6461, size: 18, summary: '케냐 동부 지역에서 폭우 후 가축들 사이에서 리프트밸리열이 발생했으며, 인간 감염 사례도 보고되었습니다.' },
    { id: 20, name: '치쿤구니야열', location: '태국, 방콕', date: '2025-08-12', risk: '중간', riskColor: RISK_LEVEL_COLORS['중간'], lat: 13.7563, lng: 100.5018, size: 15, summary: '방콕 도심에서 치쿤구니야열을 옮기는 모기가 발견되어 방역 작업이 진행 중입니다.' }
];


export const FULL_NOTICES_DATA = [
    { id: 1, category: '점검', title: '시스템 정기 점검 안내 (10/25 02:00 ~ 04:00)', date: '2025.10.23', content: '보다 안정적인 서비스 제공을 위해 GIDS 시스템 전체에 대한 정기 점검을 실시합니다. 점검 시간 동안 서비스 이용이 일시적으로 중단될 수 있으니 양해 부탁드립니다. (예상 소요시간: 2시간)' },
    { id: 2, category: '업데이트', title: 'AI 검증 모델 v1.2 업데이트 완료', date: '2025.10.20', content: 'AI 검증 모델이 v1.2로 업데이트되었습니다. 이번 업데이트로 RAG 기반 팩트체크의 정확도가 0.5% 향상되었으며, 허위 정보 탐지 패턴 12종이 추가되었습니다.' },
    { id: 3, category: '공지', title: '모바일 대시보드 지원 시작 안내', date: '2025.10.15', content: '이제 모바일 환경에서도 GIDS의 핵심 대시보드를 확인하실 수 있습니다. 반응형 웹 디자인 적용으로 스마트폰 및 태블릿에서의 사용성이 개선되었습니다.' },
    { id: 4, category: '업데이트', title: '데이터 소스 추가 (유럽 ECDC 보고서)', date: '2025.10.11', content: '실시간 정보 수집 대상에 유럽 질병예방통제센터(ECDC)의 공식 주간 보고서가 추가되었습니다. 이를 통해 유럽 지역의 감염병 동향을 더욱 신속하게 파악할 수 있습니다.' },
    { id: 5, category: '공지', title: '개인정보처리방침 개정 안내', date: '2025.10.01', content: '2025년 10월 1일부터 개정된 개인정보처리방침이 적용됩니다. 자세한 내용은 설정 페이지에서 확인하실 수 있습니다.' },
];

export const USERS_DATA: User[] = [
    { id: 1, name: 'Alice Kim', email: 'alice@gids.or.kr', role: 'Admin', lastLogin: '2025-09-12 10:30 AM' },
    { id: 2, name: 'Bob Lee', email: 'bob@gids.or.kr', role: 'Editor', lastLogin: '2025-09-12 09:15 AM' },
    { id: 3, name: 'Charlie Park', email: 'charlie@gids.or.kr', role: 'Viewer', lastLogin: '2025-09-11 04:55 PM' },
    { id: 4, name: 'David Jung', email: 'david@gids.or.kr', role: 'Editor', lastLogin: '2025-09-12 11:05 AM' },
];

export const RULES_DATA: VerificationRule[] = [
    { id: 1, name: 'Low Confidence Threshold', description: 'AI confidence below 60% automatically flags for manual review.', isEnabled: true },
    { id: 2, name: 'Source Whitelisting', description: 'Content from WHO, CDC, ECDC is given a higher initial trust score.', isEnabled: true },
    { id: 3, name: 'Sensational Language Detection', description: 'Detects and flags content with excessive exclamation marks, all-caps, or urgent, unverified calls to action.', isEnabled: false },
];

export const ADMIN_CRAWLER_DATA: AdminCrawler[] = [
    { id: 1, source: 'WHO', url: 'https://www.who.int/emergencies/disease-outbreak-news', type: 'Web Page', frequency: '15 minutes', isEnabled: true, history: [2, 3, 5, 4, 6, 5, 8], docs24h: 33, avgRuntime: 4.5, lastRun: '2025-09-12 10:30:15', status: 'Active' },
    { id: 2, source: 'CDC', url: 'https://www.cdc.gov/outbreaks/index.html', type: 'Web Page', frequency: '15 minutes', isEnabled: true, history: [1, 2, 1, 3, 2, 4, 3], docs24h: 16, avgRuntime: 3.2, lastRun: '2025-09-12 10:28:44', status: 'Active' },
    { id: 3, source: 'Reuters Health API', url: 'https://api.reuters.com/v1/health', type: 'API', frequency: '5 minutes', isEnabled: true, history: [10, 15, 12, 18, 14, 22, 16], docs24h: 107, avgRuntime: 0.8, lastRun: '2025-09-12 10:32:01', status: 'Active' },
    { id: 4, source: 'BNO News', url: 'https://bnonews.com/channel/health/', type: 'Web Page', frequency: '10 minutes', isEnabled: false, history: [5, 6, 4, 7, 8, 5, 9], docs24h: 53, avgRuntime: 6.1, lastRun: '2025-09-12 08:15:10', status: 'Warning' },
    { id: 5, source: 'Old Health Blog', url: 'http://oldhealth.blogspot.com', type: 'RSS Feed', frequency: '24 hours', isEnabled: true, history: [0, 1, 0, 0, 1, 0, 0], docs24h: 1, avgRuntime: 2.5, lastRun: '2025-09-12 01:00:00', status: 'Error' },
];

export const USER_ACTIVITY_DATA: UserActivity[] = [
    { id: 1, user: 'Alice Kim', activity: 'Logged in', timestamp: '2025-09-12 10:30 AM' },
    { id: 2, user: 'Bob Lee', activity: 'Verified item #299', timestamp: '2025-09-12 10:25 AM' },
    { id: 3, user: 'Alice Kim', activity: 'Updated crawler "BNO News"', timestamp: '2025-09-12 10:15 AM' },
    { id: 4, user: 'Charlie Park', activity: 'Generated report for Q3', timestamp: '2025-09-12 09:50 AM' },
];

export const NOTIFICATION_RULES_DATA: NotificationRule[] = [
    { id: 1, condition: { disease: 'Ebola', risk: 'High' }, action: { channel: 'Email', recipient: 'emergency-response@gids.or.kr' }, isEnabled: true },
    { id: 2, condition: { disease: 'Any', risk: 'High' }, action: { channel: 'Slack', recipient: '#general-alerts' }, isEnabled: true },
    { id: 3, condition: { disease: 'Avian Influenza', risk: 'Any' }, action: { channel: 'Email', recipient: 'zoonotic-team@gids.or.kr' }, isEnabled: false },
];

export const API_KEYS_DATA: ApiKey[] = [
    { id: 1, key: 'GDS_PROD_******************_XYZ1', createdAt: '2024-01-15', lastUsed: '2025-09-12 11:00 AM', usage: [120, 150, 130, 180, 160, 220, 190] },
    { id: 2, key: 'GDS_DEV_******************_ABC2', createdAt: '2024-05-20', lastUsed: '2025-09-11 03:30 PM', usage: [10, 5, 12, 18, 4, 2, 6] },
];