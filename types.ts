export enum CrawlerStatus {
  Active = 'Active',
  Warning = 'Warning',
  Error = 'Error',
}

export interface Crawler {
  source: string;
  status: CrawlerStatus;
  lastCrawled: string;
  newDocs: number;
}

export enum VerificationStatus {
  Fact = 'Fact',
  Fake = 'Fake',
  Opinion = 'Opinion',
  Review = 'Needs Review',
}

export interface VerificationItem {
  id: number;
  title: string;
  snippet: string;
  source: string;
  url: string;
  fullText?: string;
  classificationResult?: string;
  ragSummary?: string;
  evidence?: string;
  finalResult?: VerificationStatus;
  status: VerificationStatus;
  finalConfidence?: number;
  aiConfidence: number;
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: 'Admin' | 'Editor' | 'Viewer';
  lastLogin: string;
}

export interface VerificationRule {
  id: number;
  name: string;
  description: string;
  isEnabled: boolean;
}

export interface AdminCrawler {
    id: number;
    source: string;
    url: string;
    type: string;
    frequency: string;
    isEnabled: boolean;
    history: number[];
    docs24h: number;
    avgRuntime: number;
    lastRun: string;
    status: 'Active' | 'Warning' | 'Error' | 'Running...';
}

export interface KnowledgeBaseItem {
    id: number;
    source: string;
    documents: number;
    lastUpdated: string;
    status: 'Active' | 'Indexing...';
}

export interface UserActivity {
  id: number;
  user: string;
  activity: string;
  timestamp: string;
}

export interface NotificationRule {
    id: number;
    condition: {
        disease: string;
        risk: 'Any' | 'High' | 'Medium' | 'Low';
    };
    action: {
        channel: 'Email' | 'Slack';
        recipient: string;
    };
    isEnabled: boolean;
}

export interface ApiKey {
    id: number;
    key: string;
    createdAt: string;
    lastUsed: string;
    usage: number[];
}