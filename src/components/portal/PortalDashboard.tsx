import React, { useState, useEffect } from 'react';
import { PortalUser, ProjectData, SharedDocumentItem, ChatMessage } from '../../types/portal';
import {
  CheckCircle2,
  Clock,
  FileText,
  MessageSquare,
  Phone,
  LogOut,
  ArrowLeft,
  Download,
  Send,
  ExternalLink,
  ShieldCheck,
  Sparkles,
  Calendar,
  Layers,
  ChevronRight,
} from 'lucide-react';

interface PortalDashboardProps {
  user: PortalUser;
  initialProject: ProjectData;
  onLogout: () => void;
  onBackToAgency: () => void;
}

export const PortalDashboard: React.FC<PortalDashboardProps> = ({
  user,
  initialProject,
  onLogout,
  onBackToAgency,
}) => {
  const [activeTab, setActiveTab] = useState<'milestones' | 'documents' | 'messages'>('milestones');
  const [project, setProject] = useState<ProjectData>(initialProject);
  const [documents, setDocuments] = useState<SharedDocumentItem[]>([]);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessageText, setNewMessageText] = useState('');
  const [isSendingMessage, setIsSendingMessage] = useState(false);
  const [docFilter, setDocFilter] = useState<string>('all');
  const [downloadToast, setDownloadToast] = useState<string | null>(null);

  // Fetch documents and messages for this project
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [docsRes, msgsRes] = await Promise.all([
          fetch(`/api/portal/documents/${project.id}`),
          fetch(`/api/portal/messages/${project.id}`),
        ]);

        if (docsRes.ok) {
          const docsData = await docsRes.json();
          if (docsData.documents) setDocuments(docsData.documents);
        }

        if (msgsRes.ok) {
          const msgsData = await msgsRes.json();
          if (msgsData.messages) setMessages(msgsData.messages);
        }
      } catch (err) {
        console.error('Error fetching portal data:', err);
      }
    };

    fetchData();
  }, [project.id]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessageText.trim() || isSendingMessage) return;

    setIsSendingMessage(true);
    try {
      const res = await fetch('/api/portal/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          projectId: project.id,
          senderId: user.id,
          senderName: user.name,
          senderRole: 'client',
          text: newMessageText.trim(),
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setMessages((prev) => [...prev, data.message]);
        setNewMessageText('');
      }
    } catch (err) {
      console.error('Failed to send message:', err);
    } finally {
      setIsSendingMessage(false);
    }
  };

  const handleDownloadDoc = (doc: SharedDocumentItem) => {
    setDownloadToast(`Initiating download for: ${doc.title}`);
    setTimeout(() => {
      setDownloadToast(null);
    }, 3500);
  };

  const handleWhatsAppSync = () => {
    const latestMsgs = messages.slice(-3).map((m) => `${m.senderName}: "${m.text}"`).join('\n');
    const waText = encodeURIComponent(
      `[Web Ghost Coder Client Portal - ${project.organization}]\nClient: ${user.name} (${user.role})\nActive Phase: ${project.currentPhase}\n\nRecent Notes:\n${latestMsgs}\n\nHi Ibraheem, sending this from my client portal dashboard.`
    );
    window.open(`https://wa.me/${project.projectManager.whatsapp}?text=${waText}`, '_blank');
  };

  const filteredDocs = docFilter === 'all'
    ? documents
    : documents.filter((d) => d.category.toLowerCase().includes(docFilter.toLowerCase()));

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 flex flex-col">
      {/* Download toast notification */}
      {downloadToast && (
        <div className="fixed top-5 right-5 z-50 py-3 px-5 bg-emerald-500 text-slate-950 font-bold text-xs rounded-xl shadow-2xl flex items-center gap-2 animate-in slide-in-from-top-4">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{downloadToast}</span>
        </div>
      )}

      {/* Portal Top Bar */}
      <header className="bg-[#0b0e14] border-b border-slate-800/90 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <button
              onClick={onBackToAgency}
              className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Agency Site</span>
            </button>

            <div className="h-4 w-px bg-slate-800 hidden sm:block" />

            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-white tracking-tight">
                  {project.organization}
                </span>
                <span className="text-[10px] font-mono text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/20">
                  Client Portal
                </span>
              </div>
              <div className="text-[11px] text-slate-400">
                {user.name} · {user.role}
              </div>
            </div>
          </div>

          {/* Assigned Project Manager Card */}
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-3 p-2 px-3 rounded-xl bg-slate-900/90 border border-slate-800 text-xs">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-slate-950 font-bold text-xs">
                IT
              </div>
              <div>
                <div className="font-semibold text-white flex items-center gap-1.5">
                  <span>{project.projectManager.name}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                </div>
                <div className="text-[10px] text-slate-400">
                  Assigned Lead Engineer ({project.projectManager.phone})
                </div>
              </div>
            </div>

            <button
              onClick={onLogout}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-400 hover:text-rose-300 hover:bg-rose-500/10 rounded-lg border border-slate-800 transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Workspace Body */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-8 flex-1 w-full space-y-8">
        {/* Project Status KPI Banner */}
        <div className="p-6 sm:p-8 bg-gradient-to-br from-slate-900 via-[#0f1422] to-slate-900 rounded-2xl border border-slate-800 shadow-xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Title & Stage Details (8 cols) */}
            <div className="lg:col-span-8 space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono text-amber-400">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Active Project Overview</span>
              </div>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                {project.title}
              </h1>
              <div className="text-xs sm:text-sm text-slate-300 flex flex-wrap items-center gap-3">
                <span>Category: <strong className="text-white">{project.category}</strong></span>
                <span className="text-slate-600">·</span>
                <span>Target Launch: <strong className="text-amber-400 font-mono">{project.targetLaunchDate}</strong></span>
                <span className="text-slate-600">·</span>
                <span>Started: <span className="text-slate-400 font-mono">{project.startDate}</span></span>
              </div>

              {/* Progress bar */}
              <div className="pt-2 max-w-xl">
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="font-semibold text-slate-300">{project.currentPhase}</span>
                  <span className="font-mono font-bold text-amber-400 tabular-nums">
                    {project.progressPercent}% Completed
                  </span>
                </div>
                <div className="w-full bg-slate-950 rounded-full h-3 border border-slate-800 overflow-hidden p-0.5">
                  <div
                    className="bg-gradient-to-r from-amber-400 to-amber-500 h-full rounded-full transition-all duration-500 shadow-sm shadow-amber-400/50"
                    style={{ width: `${project.progressPercent}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Quick Actions (4 cols) */}
            <div className="lg:col-span-4 flex flex-col gap-3 justify-center border-t lg:border-t-0 lg:border-l border-slate-800 pt-6 lg:pt-0 lg:pl-8">
              <button
                onClick={handleWhatsAppSync}
                className="w-full py-3 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-md shadow-emerald-500/20 cursor-pointer"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Message PM on WhatsApp</span>
              </button>

              <a
                href={`tel:${project.projectManager.phone}`}
                className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-amber-400" />
                <span>Call PM ({project.projectManager.phone})</span>
              </a>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 border-b border-cyan-500/20 pb-2">
          <button
            onClick={() => setActiveTab('milestones')}
            className={`px-4 py-2.5 text-xs sm:text-sm font-mono font-semibold rounded-xl transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'milestones'
                ? 'bg-gradient-to-r from-cyan-400 to-emerald-400 text-slate-950 shadow-md shadow-cyan-400/20'
                : 'text-slate-400 hover:text-white bg-[#0b101e] border border-cyan-500/20'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Milestones &amp; Progress ({project.milestones.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('documents')}
            className={`px-4 py-2.5 text-xs sm:text-sm font-mono font-semibold rounded-xl transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'documents'
                ? 'bg-gradient-to-r from-cyan-400 to-emerald-400 text-slate-950 shadow-md shadow-cyan-400/20'
                : 'text-slate-400 hover:text-white bg-[#0b101e] border border-cyan-500/20'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Shared Document Vault ({documents.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('messages')}
            className={`px-4 py-2.5 text-xs sm:text-sm font-mono font-semibold rounded-xl transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'messages'
                ? 'bg-gradient-to-r from-cyan-400 to-emerald-400 text-slate-950 shadow-md shadow-cyan-400/20'
                : 'text-slate-400 hover:text-white bg-[#0b101e] border border-cyan-500/20'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>Project Manager Chat ({messages.length})</span>
          </button>
        </div>

        {/* TAB 1: MILESTONES & ROADMAP */}
        {activeTab === 'milestones' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-white tracking-tight">
                  Project Delivery Roadmap
                </h2>
                <p className="text-xs text-slate-400">
                  Track real-time engineering milestones, completed deliverables, and upcoming phases.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {project.milestones.map((milestone) => {
                const isCompleted = milestone.status === 'completed';
                const isInProgress = milestone.status === 'in_progress';

                return (
                  <div
                    key={milestone.id}
                    className={`p-6 rounded-2xl border transition-all ${
                      isInProgress
                        ? 'bg-slate-900/90 border-amber-400/60 shadow-lg shadow-amber-500/5 ring-1 ring-amber-400/30'
                        : isCompleted
                        ? 'bg-slate-900/50 border-slate-800/90'
                        : 'bg-slate-950/40 border-slate-900 opacity-70'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-3">
                      <div className="flex items-start gap-3.5">
                        <div
                          className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
                            isCompleted
                              ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400'
                              : isInProgress
                              ? 'bg-amber-400/10 border border-amber-400/40 text-amber-400'
                              : 'bg-slate-800 border border-slate-700 text-slate-500'
                          }`}
                        >
                          {isCompleted ? (
                            <CheckCircle2 className="w-5 h-5" />
                          ) : isInProgress ? (
                            <Clock className="w-5 h-5 animate-spin" />
                          ) : (
                            <span className="font-mono text-xs font-bold">{milestone.stepNumber}</span>
                          )}
                        </div>

                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-mono font-bold text-slate-500">
                              Phase {milestone.stepNumber}
                            </span>
                            <span
                              className={`text-[10px] font-mono px-2 py-0.5 rounded font-semibold ${
                                isCompleted
                                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                                  : isInProgress
                                  ? 'bg-amber-400/10 text-amber-400 border border-amber-400/30'
                                  : 'bg-slate-800 text-slate-400'
                              }`}
                            >
                              {isCompleted ? 'Completed' : isInProgress ? 'Active Sprint' : 'Upcoming'}
                            </span>
                          </div>

                          <h3 className="text-base font-bold text-white mt-1">
                            {milestone.title}
                          </h3>
                        </div>
                      </div>

                      <div className="text-xs font-mono text-slate-400 shrink-0">
                        {milestone.date}
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pl-0 sm:pl-12 mb-4">
                      {milestone.description}
                    </p>

                    {/* Deliverables tags */}
                    {milestone.deliverables && milestone.deliverables.length > 0 && (
                      <div className="pl-0 sm:pl-12 flex flex-wrap items-center gap-2 pt-2 border-t border-slate-800/60">
                        <span className="text-[11px] font-semibold text-slate-400">Deliverables:</span>
                        {milestone.deliverables.map((del, dIdx) => (
                          <span
                            key={dIdx}
                            className="text-[11px] font-mono text-slate-300 bg-slate-950 px-2.5 py-1 rounded-md border border-slate-800"
                          >
                            {del}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 2: SHARED DOCUMENT VAULT */}
        {activeTab === 'documents' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-bold text-white tracking-tight">
                  Shared Project Documents &amp; Deliverables
                </h2>
                <p className="text-xs text-slate-400">
                  Access official specifications, UI/UX design wireframes, live staging links, and deployment assets.
                </p>
              </div>

              {/* Category Filter */}
              <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-900 rounded-xl border border-slate-800">
                {['all', 'specification', 'design', 'deliverable'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setDocFilter(cat)}
                    className={`px-3 py-1 text-xs font-medium rounded-lg capitalize transition-colors cursor-pointer ${
                      docFilter === cat
                        ? 'bg-amber-400 text-slate-950 font-bold'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredDocs.map((doc) => (
                <div
                  key={doc.id}
                  className="p-5 bg-slate-900/60 hover:bg-slate-900/90 rounded-2xl border border-slate-800 flex flex-col justify-between transition-colors group"
                >
                  <div>
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-amber-400 shrink-0">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] font-mono bg-slate-800 text-slate-300 px-2 py-0.5 rounded">
                          {doc.category}
                        </span>
                        <div className="text-[11px] font-mono text-slate-500 mt-1">
                          {doc.fileSize} · {doc.updatedAt}
                        </div>
                      </div>
                    </div>

                    <h3 className="text-sm font-bold text-white mb-1.5 group-hover:text-amber-300 transition-colors">
                      {doc.title}
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed mb-4">
                      {doc.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                    <span className="text-[11px] text-emerald-400 font-mono">Verified by Lead Engineer</span>
                    <button
                      onClick={() => handleDownloadDoc(doc)}
                      className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5 text-amber-400" />
                      <span>Download</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: PROJECT MANAGER CHAT */}
        {activeTab === 'messages' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Chat Thread (8 cols) */}
            <div className="lg:col-span-8 bg-slate-900/60 rounded-2xl border border-slate-800 flex flex-col h-[520px]">
              {/* Chat Header */}
              <div className="p-4 border-b border-slate-800 bg-slate-950/60 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-amber-400 font-bold text-xs">
                    IT
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white flex items-center gap-2">
                      <span>{project.projectManager.name}</span>
                      <span className="text-[10px] text-emerald-400 font-mono">● {project.projectManager.status}</span>
                    </div>
                    <div className="text-[11px] text-slate-400">
                      Direct consultation thread for {project.organization}
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleWhatsAppSync}
                  className="px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-medium hover:bg-emerald-500/20 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Sync to WhatsApp</span>
                </button>
              </div>

              {/* Message List */}
              <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4">
                {messages.map((msg) => {
                  const isMe = msg.senderRole === 'client';
                  return (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
                    >
                      <div className="flex items-center gap-2 text-[10px] font-mono text-slate-500 mb-1">
                        <span className="font-semibold text-slate-400">{msg.senderName}</span>
                        <span>·</span>
                        <span>{msg.timestamp}</span>
                      </div>
                      <div
                        className={`max-w-[85%] sm:max-w-[75%] p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                          isMe
                            ? 'bg-amber-400 text-slate-950 font-medium rounded-tr-none'
                            : 'bg-slate-800 text-slate-100 rounded-tl-none border border-slate-700/60'
                        }`}
                      >
                        {msg.text}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Message Input Composer */}
              <form onSubmit={handleSendMessage} className="p-3 border-t border-slate-800 bg-slate-950/80 flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Type a message or question for your Project Manager..."
                  value={newMessageText}
                  onChange={(e) => setNewMessageText(e.target.value)}
                  className="flex-1 px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs sm:text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-amber-400 transition-all"
                />
                <button
                  type="submit"
                  disabled={!newMessageText.trim() || isSendingMessage}
                  className="px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs sm:text-sm flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-50"
                >
                  <span>Send</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>

            {/* PM Contact & Working Details Sidebar (4 cols) */}
            <div className="lg:col-span-4 space-y-4">
              <div className="p-6 bg-slate-900/60 rounded-2xl border border-slate-800 space-y-4">
                <div className="text-xs font-semibold uppercase tracking-wider text-amber-400">
                  Assigned Project Architect
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-slate-950 font-extrabold text-sm shadow-md">
                    IT
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">{project.projectManager.name}</h4>
                    <div className="text-xs text-slate-400">{project.projectManager.role}</div>
                  </div>
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-800/80 text-xs text-slate-300">
                  <div>
                    <span className="text-slate-500 block">Phone:</span>
                    <a href={`tel:${project.projectManager.phone}`} className="text-amber-400 hover:underline">
                      {project.projectManager.phone}
                    </a>
                  </div>
                  <div>
                    <span className="text-slate-500 block">WhatsApp:</span>
                    <a
                      href={`https://wa.me/${project.projectManager.whatsapp}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-400 hover:underline"
                    >
                      +92 300 9464514 (24/7 Available)
                    </a>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Email:</span>
                    <a href={`mailto:${project.projectManager.email}`} className="text-slate-300 hover:underline">
                      {project.projectManager.email}
                    </a>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={handleWhatsAppSync}
                    className="w-full py-2.5 px-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Open Direct WhatsApp Thread</span>
                  </button>
                </div>
              </div>

              <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800 text-xs text-slate-400 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>All communication logs and shared files are protected under your agency service contract.</span>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
