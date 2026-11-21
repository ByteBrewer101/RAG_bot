// Centralized demo/mock data for the dashboard UI.
// Update values here to change demo content across all dashboard pages.

export type DemoTenant = {
  id: string;
  name: string;
  slug: string;
  plan: string;
};

export type DemoUser = {
  id: string;
  name: string;
  email: string;
  initials: string;
  role: string;
  status?: "active" | "invited" | "suspended";
  lastActive?: string;
  tenantId: string;
};

export type DemoStat = {
  id: string;
  label: string;
  value: string;
  delta: string;
  trend: "up" | "down" | "neutral";
  hint: string;
};

export type DemoProject = {
  id: string;
  name: string;
  description: string;
  status: "active" | "paused" | "draft";
  documentCount: number;
  updatedAt: string;
  tags: string[];
};

export type DemoDocumentStatus = "ready" | "indexing" | "uploaded" | "failed";

export type DemoDocument = {
  id: string;
  projectId: string;
  projectName: string;
  name: string;
  type: "PDF" | "DOCX" | "Markdown" | "Web" | "TXT";
  size: string;
  status: DemoDocumentStatus;
  chunkCount: number;
  uploadedAt: string;
  updatedAt: string;
};

export type DemoChunk = {
  id: string;
  index: number;
  content: string;
  tokens: number;
  source: string;
};

export type DemoDocumentDetail = {
  id: string;
  title: string;
  summary: string;
  sourceLabel: string;
  chunks: DemoChunk[];
};

export type DemoCitation = {
  id: string;
  documentId: string;
  documentName: string;
  chunkIndex: number;
  snippet: string;
};

export type DemoMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
  createdAt: string;
  citations?: DemoCitation[];
};

export type DemoChatThread = {
  id: string;
  title: string;
  projectId: string;
  projectName: string;
  updatedAt: string;
  messages: DemoMessage[];
};

export type DemoActivity = {
  id: string;
  title: string;
  meta: string;
  time: string;
  tone: "success" | "info" | "warning";
};

export type DemoSettings = {
  workspaceName: string;
  supportEmail: string;
  defaultProjectId: string;
  retrievalTopK: number;
  chunkSize: number;
  chunkOverlap: number;
  answerStyle: "concise" | "balanced" | "detailed";
  citationsRequired: boolean;
  autoReindex: boolean;
  notifyOnFailure: boolean;
  apiKeyMasked: string;
  apiBaseUrl: string;
};

export const demoTenant: DemoTenant = {
  id: "ten_001",
  name: "Acme Robotics",
  slug: "acme-robotics",
  plan: "Pro Workspace",
};

export const demoCurrentUser: DemoUser = {
  id: "usr_001",
  name: "Palak Sharma",
  email: "palak@acmerobotics.com",
  initials: "PS",
  role: "Workspace Admin",
  status: "active",
  lastActive: "2 minutes ago",
  tenantId: demoTenant.id,
};

export const demoStats: DemoStat[] = [
  {
    id: "stat_projects",
    label: "Active projects",
    value: "4",
    delta: "+1 this week",
    trend: "up",
    hint: "2 with new uploads",
  },
  {
    id: "stat_docs",
    label: "Documents indexed",
    value: "28",
    delta: "6 processing",
    trend: "neutral",
    hint: "Across all projects",
  },
  {
    id: "stat_questions",
    label: "Questions answered",
    value: "142",
    delta: "+18% vs last week",
    trend: "up",
    hint: "Citations attached",
  },
  {
    id: "stat_chunks",
    label: "Searchable chunks",
    value: "3,482",
    delta: "+214 today",
    trend: "up",
    hint: "Ready for retrieval",
  },
];

export const demoProjects: DemoProject[] = [
  {
    id: "prj_001",
    name: "Product Knowledge Base",
    description: "Customer-facing docs, onboarding guides, and release notes for the core platform.",
    status: "active",
    documentCount: 12,
    updatedAt: "12 min ago",
    tags: ["support", "public"],
  },
  {
    id: "prj_002",
    name: "Engineering Runbooks",
    description: "Incident response, deployment procedures, and internal infrastructure notes.",
    status: "active",
    documentCount: 8,
    updatedAt: "1 hour ago",
    tags: ["internal", "ops"],
  },
  {
    id: "prj_003",
    name: "Sales Enablement",
    description: "Battlecards, pricing FAQs, and proposal templates for the GTM team.",
    status: "paused",
    documentCount: 5,
    updatedAt: "Yesterday",
    tags: ["gtm"],
  },
  {
    id: "prj_004",
    name: "Research Archive",
    description: "Market research PDFs and interview summaries waiting to be organized.",
    status: "draft",
    documentCount: 3,
    updatedAt: "3 days ago",
    tags: ["archive"],
  },
];

export const demoDocuments: DemoDocument[] = [
  {
    id: "doc_001",
    projectId: "prj_001",
    projectName: "Product Knowledge Base",
    name: "Getting Started Guide.pdf",
    type: "PDF",
    size: "2.4 MB",
    status: "ready",
    chunkCount: 186,
    uploadedAt: "Nov 10, 2026",
    updatedAt: "12 min ago",
  },
  {
    id: "doc_002",
    projectId: "prj_001",
    projectName: "Product Knowledge Base",
    name: "Release Notes v2.8.md",
    type: "Markdown",
    size: "84 KB",
    status: "indexing",
    chunkCount: 42,
    uploadedAt: "Nov 16, 2026",
    updatedAt: "Just now",
  },
  {
    id: "doc_003",
    projectId: "prj_002",
    projectName: "Engineering Runbooks",
    name: "Incident Response Playbook.docx",
    type: "DOCX",
    size: "1.1 MB",
    status: "ready",
    chunkCount: 97,
    uploadedAt: "Nov 08, 2026",
    updatedAt: "1 hour ago",
  },
  {
    id: "doc_004",
    projectId: "prj_002",
    projectName: "Engineering Runbooks",
    name: "Deployment Checklist.txt",
    type: "TXT",
    size: "18 KB",
    status: "uploaded",
    chunkCount: 0,
    uploadedAt: "Nov 16, 2026",
    updatedAt: "18 min ago",
  },
  {
    id: "doc_005",
    projectId: "prj_003",
    projectName: "Sales Enablement",
    name: "Pricing FAQ.pdf",
    type: "PDF",
    size: "640 KB",
    status: "failed",
    chunkCount: 0,
    uploadedAt: "Nov 12, 2026",
    updatedAt: "Yesterday",
  },
  {
    id: "doc_006",
    projectId: "prj_004",
    projectName: "Research Archive",
    name: "Customer Interviews Q3.web",
    type: "Web",
    size: "—",
    status: "ready",
    chunkCount: 58,
    uploadedAt: "Nov 02, 2026",
    updatedAt: "3 days ago",
  },
];

export const demoDocumentDetails: Record<string, DemoDocumentDetail> = {
  doc_001: {
    id: "doc_001",
    title: "Getting Started Guide.pdf",
    summary:
      "Introductory guide covering workspace setup, document ingestion, project organization, and asking your first cited question.",
    sourceLabel: "Uploaded PDF · Product Knowledge Base",
    chunks: [
      {
        id: "chk_001_01",
        index: 1,
        content:
          "Create a workspace, invite teammates, and configure your first project. Projects group related documents so retrieval can stay focused and answers remain relevant.",
        tokens: 28,
        source: "Page 2 · Overview",
      },
      {
        id: "chk_001_02",
        index: 2,
        content:
          "Upload PDFs, DOCX, Markdown, or web sources. Convox splits content into chunks, generates embeddings, and marks documents ready when they are searchable.",
        tokens: 31,
        source: "Page 5 · Ingestion",
      },
      {
        id: "chk_001_03",
        index: 3,
        content:
          "When you ask a question, the assistant retrieves the most relevant chunks and returns an answer with citations so users can verify the source.",
        tokens: 26,
        source: "Page 9 · Asking questions",
      },
    ],
  },
  doc_003: {
    id: "doc_003",
    title: "Incident Response Playbook.docx",
    summary:
      "Operational playbook describing severity levels, escalation paths, communication templates, and post-incident review steps.",
    sourceLabel: "Uploaded DOCX · Engineering Runbooks",
    chunks: [
      {
        id: "chk_003_01",
        index: 1,
        content:
          "Severity 1 incidents require immediate acknowledgement, an incident commander, and customer-facing status updates every 30 minutes until mitigation.",
        tokens: 24,
        source: "Section 1.2 · Severity",
      },
      {
        id: "chk_003_02",
        index: 2,
        content:
          "Escalate to the on-call platform lead if impact exceeds 15 minutes or affects authentication, ingestion, or chat retrieval for multiple tenants.",
        tokens: 27,
        source: "Section 2.1 · Escalation",
      },
    ],
  },
};

export const demoChatThreads: DemoChatThread[] = [
  {
    id: "chat_001",
    title: "How does ingestion work?",
    projectId: "prj_001",
    projectName: "Product Knowledge Base",
    updatedAt: "10 min ago",
    messages: [
      {
        id: "msg_001",
        role: "user",
        content: "How does document ingestion work in Convox?",
        createdAt: "10:14 AM",
      },
      {
        id: "msg_002",
        role: "assistant",
        content:
          "Convox ingests your sources (PDF, DOCX, Markdown, web), splits them into searchable chunks, generates embeddings, and marks each document ready once indexing completes. When questions are asked, relevant chunks are retrieved and the answer is returned with citations to the original source.",
        createdAt: "10:14 AM",
        citations: [
          {
            id: "cit_001",
            documentId: "doc_001",
            documentName: "Getting Started Guide.pdf",
            chunkIndex: 2,
            snippet:
              "Upload PDFs, DOCX, Markdown, or web sources. Convox splits content into chunks, generates embeddings, and marks documents ready...",
          },
          {
            id: "cit_002",
            documentId: "doc_001",
            documentName: "Getting Started Guide.pdf",
            chunkIndex: 3,
            snippet:
              "When you ask a question, the assistant retrieves the most relevant chunks and returns an answer with citations...",
          },
        ],
      },
    ],
  },
  {
    id: "chat_002",
    title: "Who do we escalate SEV1 to?",
    projectId: "prj_002",
    projectName: "Engineering Runbooks",
    updatedAt: "1 hour ago",
    messages: [
      {
        id: "msg_003",
        role: "user",
        content: "What is the escalation path for a SEV1 incident?",
        createdAt: "9:02 AM",
      },
      {
        id: "msg_004",
        role: "assistant",
        content:
          "For Severity 1 incidents, acknowledge immediately, assign an incident commander, and provide customer-facing updates every 30 minutes until mitigation. Escalate to the on-call platform lead if impact lasts more than 15 minutes or affects authentication, ingestion, or chat retrieval across multiple tenants.",
        createdAt: "9:02 AM",
        citations: [
          {
            id: "cit_003",
            documentId: "doc_003",
            documentName: "Incident Response Playbook.docx",
            chunkIndex: 1,
            snippet:
              "Severity 1 incidents require immediate acknowledgement, an incident commander, and customer-facing status updates every 30 minutes...",
          },
          {
            id: "cit_004",
            documentId: "doc_003",
            documentName: "Incident Response Playbook.docx",
            chunkIndex: 2,
            snippet:
              "Escalate to the on-call platform lead if impact exceeds 15 minutes or affects authentication, ingestion, or chat retrieval...",
          },
        ],
      },
    ],
  },
];

export const demoUsers: DemoUser[] = [
  demoCurrentUser,
  {
    id: "usr_002",
    name: "Rohan Mehta",
    email: "rohan@acmerobotics.com",
    initials: "RM",
    role: "Member",
    status: "active",
    lastActive: "1 hour ago",
    tenantId: demoTenant.id,
  },
  {
    id: "usr_003",
    name: "Aisha Khan",
    email: "aisha@acmerobotics.com",
    initials: "AK",
    role: "Member",
    status: "invited",
    lastActive: "Invite sent",
    tenantId: demoTenant.id,
  },
  {
    id: "usr_004",
    name: "Diego Alvarez",
    email: "diego@acmerobotics.com",
    initials: "DA",
    role: "Viewer",
    status: "suspended",
    lastActive: "5 days ago",
    tenantId: demoTenant.id,
  },
];

export const demoActivity: DemoActivity[] = [
  {
    id: "act_001",
    title: "Release Notes v2.8.md is indexing",
    meta: "Product Knowledge Base · 42 chunks detected",
    time: "Just now",
    tone: "info",
  },
  {
    id: "act_002",
    title: "Incident Response Playbook.docx ready",
    meta: "Engineering Runbooks · 97 chunks searchable",
    time: "1 hour ago",
    tone: "success",
  },
  {
    id: "act_003",
    title: "Pricing FAQ.pdf failed to process",
    meta: "Sales Enablement · unsupported encoding",
    time: "Yesterday",
    tone: "warning",
  },
];

export const demoSettings: DemoSettings = {
  workspaceName: demoTenant.name,
  supportEmail: "support@acmerobotics.com",
  defaultProjectId: "prj_001",
  retrievalTopK: 6,
  chunkSize: 800,
  chunkOverlap: 120,
  answerStyle: "balanced",
  citationsRequired: true,
  autoReindex: true,
  notifyOnFailure: true,
  apiKeyMasked: "cvx_live_************************8f2a",
  apiBaseUrl: "https://api.convox.local/v1",
};

// Convenience selectors
export function getProjectById(id: string) {
  return demoProjects.find((p) => p.id === id);
}

export function getDocumentsByProject(projectId: string) {
  return demoDocuments.filter((d) => d.projectId === projectId);
}

export function getDocumentById(id: string) {
  return demoDocuments.find((d) => d.id === id);
}

export function getDocumentDetailById(id: string) {
  return demoDocumentDetails[id];
}

// Examples for demonstrating empty UI states in demo screens/components.
export const demoEmptyProjects: DemoProject[] = [];
export const demoEmptyDocuments: DemoDocument[] = [];
export const demoEmptyMessages: DemoMessage[] = [];
