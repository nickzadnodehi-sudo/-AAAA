export interface LetterData {
  id: string;
  title: string; // Internal title for saved drafts
  letterNumber: string;
  letterDate: string;
  attachment: string;
  
  recipientTo: string; // به: ...
  recipientGreeting: string; // با سلام و احترام
  subject: string; // موضوع: ...
  
  bodyContent: string;
  
  senderTitle: string; // با تشکر و تجدید احترام / مدیرعامل
  senderName: string; // مهندس ...
  
  showStamp: boolean;
  stampImage: string | null;
  stampScale: number;
  
  showSignature: boolean;
  signatureImage: string | null;
  signatureScale: number;
  
  updatedAt: string;
}

export interface Settings {
  fontFamily: string;
  fontSize: number; // in pt or px (e.g. 14)
  lineHeight: number; // e.g. 1.8
  
  // Padding in mm for letter body
  marginTopMM: number; // e.g. 52mm from top to clear header
  marginBottomMM: number; // e.g. 35mm from bottom to clear footer
  marginRightMM: number; // e.g. 28mm right margin
  marginLeftMM: number; // e.g. 22mm left margin
  
  // Header fields offset adjustments (in px)
  headerNumberOffset: { x: number; y: number };
  headerDateOffset: { x: number; y: number };
  headerAttachmentOffset: { x: number; y: number };
  
  // Letterhead mode
  showBackgroundLetterhead: boolean; // false if printing on physical pre-printed letterhead
  customBackgroundImage: string | null; // User can upload custom scan if needed
  
  usePersianDigits: boolean;
}

export interface LetterTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  subject: string;
  recipientTo: string;
  bodyContent: string;
  senderTitle: string;
  senderName: string;
}

// User & Role Types (RBAC)
export type UserRole = 
  | 'admin'           // مدیر ارشد / مجری
  | 'site_manager'    // سرپرست کارگاه / مهندس مقیم
  | 'accountant'      // مسئول تنخواه / حسابدار
  | 'secretariat';    // پرسنل اداری / دبیرخانه

export interface UserProfile {
  id: string;
  name: string;
  role: UserRole;
  roleLabel: string;
  title: string;
  avatar?: string;
  projectAccess: string[]; // e.g. ['653', '184', 'ALL']
}

// Public Page Views
export type PublicTab = 
  | 'home'
  | 'about'
  | 'services'
  | 'portfolio'
  | 'os_standards'
  | 'blog'
  | 'contact'
  | 'verify';

// Portal Page Modules
export type PortalModule = 
  | 'dashboard'
  | 'os_book'
  | 'file_naming'
  | 'letter_generator'
  | 'daily_report'
  | 'petty_cash';

// Portfolio Project Type
export interface PortfolioProject {
  id: string;
  title: string;
  category: 'ongoing' | 'completed';
  type: string; // e.g. تجاری-اداری، مسکونی، صنعتی
  area: string; // e.g. ۴۵,۰۰۰ مترمربع
  structure: string; // e.g. اسکلت فلزی پیچ و مهره‌ای
  location: string;
  client: string;
  year: string;
  progress: number;
  image: string;
  description: string;
  features: string[];
}

// OS Book Standard Regulation Item
export interface OSChapter {
  id: string;
  chapterNumber: number;
  title: string;
  version: string;
  lastUpdated: string;
  description: string;
  articles: {
    code: string;
    title: string;
    content: string;
    importance: 'critical' | 'high' | 'normal';
    tags: string[];
  }[];
}

// Petty Cash Expense Item
export interface PettyCashExpense {
  id: string;
  projectCode: string;
  title: string;
  amount: number; // Toman
  category: string; // e.g. خرید مصالح خرد، سوخت، پذیرایی، حمل و نقل
  date: string;
  submittedBy: string;
  status: 'pending' | 'verified_accountant' | 'approved' | 'rejected';
  receiptImage?: string;
  notes?: string;
}

// Daily Site Report Item
export interface DailySiteReport {
  id: string;
  projectCode: string;
  date: string;
  weather: string;
  temperature: string;
  siteManager: string;
  contractorStaffCount: number;
  laborersCount: number;
  machineryCount: number;
  workExecuted: string;
  issuesAndObstacles: string;
  safetyNote: string;
  status: 'draft' | 'submitted' | 'approved';
  photos: string[];
  verificationCode: string;
}

// Document Verification Item
export interface VerifiedDocument {
  code: string;
  title: string;
  docType: string;
  issueDate: string;
  issuer: string;
  projectCode: string;
  status: 'valid' | 'revoked';
  summary: string;
  securityHash: string;
}

