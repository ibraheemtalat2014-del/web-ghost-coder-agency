import React, { useState, useEffect } from 'react';
import {
  Inbox,
  X,
  MessageSquare,
  Phone,
  Mail,
  Calendar,
  Clock,
  ExternalLink,
  ShieldAlert,
  RefreshCw,
  Search,
  CheckCircle2,
  Copy,
  Check,
} from 'lucide-react';
import { AGENCY_CONFIG } from '../../data/agencyData';

interface OrderLead {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  whatsapp: string;
  serviceType: string;
  budget: string;
  message: string;
  createdAt: string;
  ip?: string;
  source?: string;
}

interface OrdersInboxModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OrdersInboxModal: React.FC<OrdersInboxModalProps> = ({ isOpen, onClose }) => {
  const [orders, setOrders] = useState<OrderLead[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/leads');
      const data = await res.json();
      if (data.success && Array.isArray(data.orders)) {
        setOrders(data.orders);
      }
    } catch (e) {
      console.error('Failed to load orders:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchOrders();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const filteredOrders = orders.filter((o) => {
    const q = searchTerm.toLowerCase();
    return (
      o.fullName.toLowerCase().includes(q) ||
      o.phone.includes(q) ||
      o.whatsapp.includes(q) ||
      o.email.toLowerCase().includes(q) ||
      o.serviceType.toLowerCase().includes(q) ||
      o.id.toLowerCase().includes(q)
    );
  });

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/70 backdrop-blur-md">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-white dark:bg-[#0c1322] border-2 border-sky-300 dark:border-cyan-500/40 rounded-3xl shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="px-6 py-5 bg-slate-50 dark:bg-[#080e1a] border-b border-slate-200 dark:border-cyan-500/20 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-sky-100 dark:bg-cyan-950/80 border border-sky-300 dark:border-cyan-500/40 flex items-center justify-center text-sky-600 dark:text-cyan-400">
              <Inbox className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-black text-slate-900 dark:text-white">
                  Owner Orders &amp; Inquiries Inbox
                </h3>
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-500/40">
                  {orders.length} Total
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                Receiving channels: <strong>WhatsApp ({AGENCY_CONFIG.phoneDisplay})</strong> &amp; <strong>Website Inquiries</strong>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={fetchOrders}
              className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              title="Refresh Orders"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Search & Notice Bar */}
        <div className="p-4 bg-sky-50/60 dark:bg-[#0a101d] border-b border-slate-200 dark:border-cyan-500/20 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by client name, phone, WhatsApp or service..."
              className="w-full pl-9 pr-4 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl text-xs font-mono text-slate-900 dark:text-slate-100 focus:outline-none focus:border-sky-500"
            />
          </div>

          <div className="text-xs font-mono text-emerald-700 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950/80 px-3 py-1.5 rounded-xl border border-emerald-300 dark:border-emerald-500/40 flex items-center gap-1.5 shrink-0">
            <Clock className="w-3.5 h-3.5" />
            <span>Active Orders Window: 4:00 PM – 8:00 PM PKT</span>
          </div>
        </div>

        {/* Orders List */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1">
          {loading ? (
            <div className="py-16 text-center text-slate-400 font-mono text-xs flex flex-col items-center gap-3">
              <RefreshCw className="w-6 h-6 animate-spin text-sky-500" />
              <span>Fetching latest client orders...</span>
            </div>
          ) : filteredOrders.length === 0 ? (
            <div className="py-16 text-center text-slate-400 font-mono text-xs">
              No orders found matching your search.
            </div>
          ) : (
            filteredOrders.map((order) => (
              <div
                key={order.id}
                className="p-5 bg-white dark:bg-[#090f1c] rounded-2xl border border-slate-200 dark:border-cyan-500/30 shadow-sm hover:border-sky-400 dark:hover:border-cyan-400 transition-all space-y-3"
              >
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-base font-black text-slate-900 dark:text-white">
                        {order.fullName}
                      </span>
                      <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-sky-100 dark:bg-cyan-950 text-sky-800 dark:text-cyan-300 border border-sky-300 dark:border-cyan-500/30">
                        {order.id}
                      </span>
                    </div>
                    <div className="text-xs text-sky-700 dark:text-cyan-400 font-bold font-mono mt-0.5">
                      {order.serviceType}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-emerald-800 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950 px-2.5 py-1 rounded-lg border border-emerald-300 dark:border-emerald-500/30">
                      Budget: {order.budget}
                    </span>
                    <span className="text-[11px] text-slate-400 font-mono">
                      {new Date(order.createdAt).toLocaleDateString()} {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>

                {/* Message Body */}
                <div className="p-3 bg-slate-50 dark:bg-slate-900/70 rounded-xl border border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 font-medium">
                  {order.message}
                </div>

                {/* Direct Contact Actions for CEO */}
                <div className="pt-2 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
                  <div className="flex flex-wrap items-center gap-4 text-slate-600 dark:text-slate-400">
                    <a
                      href={`tel:${order.phone}`}
                      className="flex items-center gap-1.5 hover:text-sky-600 dark:hover:text-cyan-300"
                    >
                      <Phone className="w-3.5 h-3.5 text-sky-500" />
                      <span>{order.phone}</span>
                    </a>
                    <span>·</span>
                    <a
                      href={`mailto:${order.email}`}
                      className="flex items-center gap-1.5 hover:text-sky-600 dark:hover:text-cyan-300"
                    >
                      <Mail className="w-3.5 h-3.5 text-sky-500" />
                      <span>{order.email}</span>
                    </a>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleCopy(`${order.fullName} - ${order.whatsapp} - ${order.serviceType}`, order.id)}
                      className="px-2.5 py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 rounded-lg border border-slate-300 dark:border-slate-700 transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      {copiedId === order.id ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedId === order.id ? 'Copied' : 'Copy'}</span>
                    </button>

                    <a
                      href={`https://wa.me/${order.whatsapp.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(order.fullName)},%20this%20is%20Ibraheem%20Talat%20(CEO%20at%20Web%20Ghost%20Coder%20Agency).%20I%20received%20your%20order%20for%20${encodeURIComponent(order.serviceType)}%20and%20am%20ready%20to%20begin%20your%201-2%20day%20sprint.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-1.5 px-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-bold flex items-center gap-1.5 shadow-sm"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>Reply on WhatsApp</span>
                    </a>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Note */}
        <div className="px-6 py-3.5 bg-slate-50 dark:bg-[#080e1a] border-t border-slate-200 dark:border-cyan-500/20 text-xs font-mono text-slate-500 dark:text-slate-400 flex flex-wrap items-center justify-between gap-3">
          <span>All orders are saved to <code>leads_inquiries.json</code> on your server.</span>
          <span>WhatsApp Hotline: <strong className="text-emerald-600 dark:text-emerald-400">{AGENCY_CONFIG.phoneDisplay}</strong></span>
        </div>
      </div>
    </div>
  );
};
