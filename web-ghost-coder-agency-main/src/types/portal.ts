export interface PortalUser {
  id: string;
  name: string;
  email: string;
  organization: string;
  role: string;
  projectId: string;
}

export interface ProjectManagerInfo {
  name: string;
  role: string;
  email: string;
  phone: string;
  whatsapp: string;
  status: string;
}

export interface MilestoneItem {
  id: string;
  stepNumber: string;
  title: string;
  description: string;
  status: 'completed' | 'in_progress' | 'upcoming';
  date: string;
  deliverables: string[];
}

export interface ProjectData {
  id: string;
  title: string;
  category: string;
  organization: string;
  clientName: string;
  progressPercent: number;
  currentPhase: string;
  startDate: string;
  targetLaunchDate: string;
  projectManager: ProjectManagerInfo;
  milestones: MilestoneItem[];
}

export interface SharedDocumentItem {
  id: string;
  projectId: string;
  title: string;
  category: 'Specification' | 'Design & Wireframe' | 'Deliverable' | 'Security & Handover';
  fileType: 'pdf' | 'doc' | 'link' | 'zip';
  fileSize: string;
  updatedAt: string;
  url: string;
  description: string;
}

export interface ChatMessage {
  id: string;
  projectId: string;
  senderId: string;
  senderName: string;
  senderRole: 'client' | 'project_manager';
  text: string;
  timestamp: string;
}
