# Web Ghost Coder Agency - Client Portal Architecture & Implementation Plan

A secure, high-performance client portal seamlessly integrated into the Web Ghost Coder Agency platform, enabling active clients to track real-time project milestones, access deliverables and shared documents, and collaborate directly with their designated lead engineer via in-portal chat and instant WhatsApp synchronization.

## User Review & Critical Decisions

> [!IMPORTANT]
> **Confirmed Choices from Phase 1 Interactive Clarifications**:
> - **Authentication Mechanism**: Secure client credentials (email + password) with an instant pre-configured demo account switcher (Oakwood Academy, Aethelred Health, Quantum Growth) for zero-friction evaluation.
> - **Core Dashboard Modules**: Live project milestone progress timeline, secure shared document vault with instant file previews & downloads, and an interactive project manager messaging workspace.
> - **Communication Flow**: Dual-channel communication featuring in-portal direct messaging with conversation persistence, plus a one-click WhatsApp sync bridge to the agency hotline (`+92 300 9464514`).

---

## 1. Overview & Core Concept

### What It Does
The Client Portal provides a dedicated, authenticated command center for organizations (businesses, schools, healthcare providers, and marketing teams) that have commissioned website development from **Web Ghost Coder Agency**. Clients can log in, view live progress across their 5 delivery phases, inspect pending action items, download signed specs, wireframes, and design deliverables, and message their assigned senior engineer with instant message history.

### Target Audience & Personas
- **School Administrators & Academic Heads** tracking admission portal rollouts and curriculum galleries.
- **Healthcare Directors & Clinic Managers** reviewing doctor booking integrations and HIPAA-conscious designs.
- **Corporate Founders & Growth Marketers** reviewing Google Ads landing page funnels and page speed metrics.
- **Prospective Clients & Evaluators** using the 1-click demo switcher to inspect how Web Ghost Coder Agency manages projects.

### Key Value Delivered
Eliminates communication black holes and anxious status check-ins by providing complete transparency, downloadable assets, and direct 2-way access to the engineering team.

---

## 2. User Experience & Visual Design

### Key User Flows
1. **Access & Authentication Flow**:
   - User clicks `"Client Portal"` link in the top navigation or banner.
   - A modal or dedicated portal view opens with a sleek dark login screen.
   - Quick Demo Switcher allows selecting one of three pre-loaded accounts:
     - *Prof. Sarah Munir (Oakwood Educational Academy)* — Active Development (Stage 3).
     - *Dr. Hamza Tariq (Aethelred Health Care)* — Quality Assurance & Testing (Stage 4).
     - *Bilal Khan (Quantum Growth Partners)* — Production Ready & Launched (Stage 5).
   - Alternatively, clients can sign in using their unique credentials or register their reference inquiry ID.

2. **Dashboard Overview Flow**:
   - **Header Bar**: Client company name, active project title, dedicated project manager badge (with photo, name, and WhatsApp status), and one-click `"Back to Agency Site"` or `"Sign Out"`.
   - **Project Health & KPI Strip**: Overall progress bar (e.g., `78% Completed`), Target Launch Date, Days in Sprint, Current Active Stage.
   - **3-Tab Navigation Bar**:
     1. `Milestones & Roadmap`: Interactive timeline of the 5 development steps with status indicators (Completed, In Progress, Upcoming), deliverable previews, and developer notes.
     2. `Shared Document Vault`: Categorized grid of project assets (Design System PDF, Requirement Spec, Staging Link, SSL & DNS Handover Guide) with download actions and metadata.
     3. `Project Manager Messenger`: Real-time chat interface with chat history, attachment mock support, message composer, and a `"Sync to WhatsApp"` button that formats the latest message thread directly for WhatsApp (`03009464514`).

### Visual Identity & Theme
- **Dominant Canvas**: Obsidian slate (`#090b10` and `#0d111a`), matching the premium agency dark theme.
- **Structural Surfaces**: Compact `#111622` card containers with hairline borders (`border-slate-800`).
- **Accent Hierarchy**: Warm amber (`#f59e0b`) for active milestones, emerald (`#10b981`) for completed tasks and WhatsApp sync, sky blue (`#38bdf8`) for document actions.
- **Typography**: Clean, readable `Plus Jakarta Sans` for labels and headers; tabular figures (`tabular-nums` / `font-mono`) for dates, percentages, and file sizes.

---

## 3. Key Product Decisions & Trade-Offs

### Decision 1: Authentication Architecture & Demo Access
- **Chosen Approach**: Server-backed session state with token/cookie support on Express (`/api/portal/login`, `/api/portal/logout`, `/api/portal/me`), coupled with a client-side Demo Persona Switcher.
- **Why**: Allows prospective Google Ads visitors and reviewing clients to test the portal immediately without needing an actual pre-existing project, while supporting real credentials and secure session persistence.
- **Alternative Considered**: Heavy external OAuth/Firebase setup. Rejected to avoid requiring external sign-in credentials from clients who simply want to inspect their project status.

### Decision 2: In-Portal Messaging with WhatsApp Sync Bridge
- **Chosen Approach**: Persistent in-app chat thread stored in server memory & JSON storage, supplemented by a `"Sync to WhatsApp"` action that encodes the conversation context directly into a pre-filled WhatsApp message to `+92 300 9464514`.
- **Why**: Solves the dual need for formal project documentation inside the agency portal while honoring the user's explicit preference for WhatsApp hotline communication.

### Decision 3: Document Vault Storage
- **Chosen Approach**: Structured document records with download action triggers, file type icons, size, version history, and direct external staging URL links.
- **Why**: Keeps the application ultra-fast and self-contained without risking broken external file host URLs.

---

## 4. Technical Architecture & Data Strategy

### System & Component Hierarchy

```
┌────────────────────────────────────────────────────────────────────────┐
│                        App.tsx (Root Layout)                           │
│  ├── Navbar (with "Client Portal" trigger button)                      │
│  ├── Main Agency Sections (Hero, Services, Advantages, Portfolio...)   │
│  └── ClientPortalModal / ClientPortalView                              │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
           ┌────────────────────────┴────────────────────────┐
           ▼                                                 ▼
┌──────────────────────────────┐              ┌──────────────────────────────┐
│       PortalAuthModal        │              │     PortalDashboardView      │
│  - Email & Password form     │              │  ├── PortalHeader & PM Card  │
│  - Quick Demo Account Chips  │  ──(Auth)──► │  ├── ProjectStatusBanner     │
│  - Error handling & submit   │              │  ├── Tab: MilestonesTimeline │
└──────────────┬───────────────┘              │  ├── Tab: DocumentVault      │
               │                              │  └── Tab: MessageCenter      │
               ▼                              └──────────────┬───────────────┘
┌────────────────────────────────────────────────────────────┴───────────────┐
│                     Express Backend (server.ts)                            │
│  ├── POST /api/portal/login       -> Validates credentials, returns session│
│  ├── GET  /api/portal/projects    -> Returns active project milestones     │
│  ├── GET  /api/portal/documents   -> Returns shared project deliverables   │
│  ├── GET  /api/portal/messages    -> Returns message history with PM       │
│  └── POST /api/portal/messages    -> Adds message & updates thread state   │
└────────────────────────────────────────────────────────────────────────────┘
```

### Data Models & State Structure

```typescript
interface ClientUser {
  id: string;
  name: string;
  email: string;
  organization: string;
  avatar?: string;
  projectId: string;
}

interface ProjectMilestone {
  id: string;
  stepNumber: string;
  title: string;
  description: string;
  status: 'completed' | 'in_progress' | 'upcoming';
  estimatedDate: string;
  completedDate?: string;
  deliverables?: string[];
}

interface SharedDocument {
  id: string;
  title: string;
  category: 'contract' | 'design' | 'specification' | 'deliverable';
  fileType: 'pdf' | 'figma' | 'zip' | 'link';
  fileSize: string;
  updatedAt: string;
  url: string;
}

interface PortalMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderRole: 'client' | 'project_manager';
  text: string;
  timestamp: string;
  syncedToWhatsApp?: boolean;
}
```

### Implementation Steps
1. **Backend Integration (`server.ts`)**: Add secure portal endpoints for authentication, project milestone status, document retrieval, and message posting with persistent JSON storage.
2. **Component Creation (`src/components/portal/`)**:
   - `PortalLoginModal.tsx`: Login dialog with demo credentials selector and form validation.
   - `PortalDashboard.tsx`: Comprehensive client view with status banner, PM card, and tab switcher.
   - `MilestoneTimeline.tsx`: Detailed phase-by-phase progress visualization.
   - `DocumentVault.tsx`: Filterable list of project assets, wireframes, and live staging URLs.
   - `ProjectChat.tsx`: Real-time messaging interface with PM and WhatsApp export.
3. **Agency Site Integration**: Add `"Client Portal"` button in the top navigation and footer, connecting state transitions seamlessly.
4. **Build & Lint Verification**: Co-execute `compile_applet` and `lint_applet` to ensure zero compilation or runtime errors.
