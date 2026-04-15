import React, { useState, useEffect } from 'react';
import {
  ArrowLeft, Package, Clock, CheckCircle, XCircle,
  DollarSign, ChevronDown, ChevronUp, X, LayoutDashboard,
  Car, User, Phone, Mail, Calendar, Timer, Users,
} from 'lucide-react';
import { collection, onSnapshot, query, updateDoc, doc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { BOLT_LOGO_DARK } from '../data/assets';
import { VEHICLES } from '../data/vehicles';
import { ADMIN } from '../data/content';

const STATUS_LABELS = {
  pending:   'En attente',
  confirmed: 'Confirmée',
  cancelled: 'Annulée',
};

const STATUS_STYLES = {
  pending:   'bg-amber-50 text-amber-700 ring-1 ring-amber-200',
  confirmed: 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200',
  cancelled: 'bg-red-50 text-red-600 ring-1 ring-red-200',
};

const STATUS_DOT = {
  pending:   'bg-amber-400',
  confirmed: 'bg-emerald-500',
  cancelled: 'bg-red-500',
};

const STAT_CONFIG = [
  { key: 'total',     label: 'Total',      icon: Package,     accent: 'border-slate-400',   dot: 'bg-slate-400',   text: 'text-slate-600'  },
  { key: 'pending',   label: 'En attente', icon: Clock,       accent: 'border-amber-400',   dot: 'bg-amber-400',   text: 'text-amber-600'  },
  { key: 'confirmed', label: 'Confirmées', icon: CheckCircle, accent: 'border-emerald-500', dot: 'bg-emerald-500', text: 'text-emerald-700' },
  { key: 'cancelled', label: 'Annulées',   icon: XCircle,     accent: 'border-red-400',     dot: 'bg-red-400',     text: 'text-red-600'    },
  { key: 'revenue',   label: 'Revenus',    icon: DollarSign,  accent: 'border-bolt-green',  dot: 'bg-bolt-green',  text: 'text-bolt-green', prefix: '$' },
];

const VEHICLE_LABELS   = Object.fromEntries(VEHICLES.map(v => [v.id, v.name]));
const SLIDER_PAD = 4;
const VEHICLE_CATEGORY = Object.fromEntries(VEHICLES.map(v => [v.id, v.category]));

function initials(firstName, lastName) {
  return `${(firstName?.[0] ?? '').toUpperCase()}${(lastName?.[0] ?? '').toUpperCase()}` || '?';
}

function StatCard({ label, value, icon: Icon, accent, dot, text, prefix = '' }) {
  return (
    <div className={`bg-white rounded-2xl border border-gray-100 shadow-sm p-4 border-l-4 ${accent} flex items-center gap-3`}>
      <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-gray-50 shrink-0">
        <Icon size={16} className={text} />
      </div>
      <div className="min-w-0">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400 mb-0.5 truncate">{label}</p>
        <p className="text-xl font-bold text-bolt-dark leading-none">{prefix}{value}</p>
      </div>
    </div>
  );
}

function StatusBadge({ status }) {
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${STATUS_STYLES[status] ?? 'bg-gray-100 text-gray-500'}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${STATUS_DOT[status] ?? 'bg-gray-400'}`} />
      {STATUS_LABELS[status] ?? status}
    </span>
  );
}

function OrderDetailModal({ order, onClose, onStatusChange }) {
  const [loading, setLoading] = useState(false);

  const changeStatus = async (newStatus) => {
    setLoading(true);
    try {
      await onStatusChange(order.id, newStatus);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (d) => {
    if (!d) return '—';
    return new Date(`${d}T00:00:00`).toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' });
  };

  const fullName = `${order.driver?.firstName ?? ''} ${order.driver?.lastName ?? ''}`.trim() || '—';

  const STATUS_BTN = {
    confirmed: { label: 'Confirmer',   cls: 'bg-emerald-500 hover:bg-emerald-600 text-white' },
    pending:   { label: 'En attente',  cls: 'bg-amber-100 hover:bg-amber-200 text-amber-700' },
    cancelled: { label: 'Annuler',     cls: 'bg-red-100 hover:bg-red-200 text-red-600'       },
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white w-full sm:max-w-lg sm:rounded-3xl rounded-t-3xl shadow-2xl overflow-hidden">

        {/* Colored header */}
        <div className="bg-bolt-dark px-5 sm:px-7 pt-6 pb-5 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white transition"
          >
            <X size={16} />
          </button>
          <p className="text-xs text-gray-400 font-mono mb-1">Commande #{order.id.slice(0, 8).toUpperCase()}</p>
          <h2 className="text-lg font-bold text-white mb-3 pr-10">{fullName}</h2>
          <div className="flex items-center gap-3">
            <StatusBadge status={order.status} />
            <span className="text-bolt-green font-bold text-xl">${order.totalPrice ?? 0}</span>
          </div>
        </div>

        <div className="px-5 sm:px-7 py-5 space-y-5 max-h-[55vh] overflow-y-auto">

          {/* Booking info */}
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-3">Réservation</p>
            <div className="grid grid-cols-2 gap-2">
              <InfoTile icon={Calendar} label="Date"    value={formatDate(order.date)} />
              <InfoTile icon={Clock}    label="Heure"   value={order.time ?? '—'} />
              <InfoTile icon={Timer}    label="Durée"   value={`${order.hours ?? '—'} h`} />
              <InfoTile icon={Car}      label="Véhicule" value={VEHICLE_LABELS[order.vehicle] ?? order.vehicleName ?? order.vehicle ?? '—'} />
            </div>
          </div>

          {/* Driver info */}
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-3">Conducteur</p>
            <div className="bg-gray-50 rounded-2xl p-4 space-y-2.5">
              <InfoRow icon={User}  label="Nom"       value={fullName} />
              <InfoRow icon={Mail}  label="Email"     value={order.userEmail ?? '—'} />
              <InfoRow icon={Phone} label="Téléphone" value={order.driver?.phone ?? '—'} />
              <InfoRow icon={User}  label="Âge"       value={order.driver?.age ? `${order.driver.age} ans` : '—'} />
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="px-5 sm:px-7 py-4 border-t border-gray-100 flex gap-2">
          {Object.entries(STATUS_BTN)
            .filter(([key]) => key !== order.status)
            .map(([key, { label, cls }]) => (
              <button
                key={key}
                disabled={loading}
                onClick={() => changeStatus(key)}
                className={`flex-1 font-bold py-3 rounded-xl text-sm transition disabled:opacity-40 ${cls}`}
              >
                {loading ? '…' : label}
              </button>
            ))
          }
        </div>
      </div>
    </div>
  );
}

function InfoTile({ icon: Icon, label, value }) {
  return (
    <div className="bg-gray-50 rounded-xl p-3">
      <div className="flex items-center gap-1.5 mb-1">
        <Icon size={12} className="text-gray-400" />
        <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-400">{label}</p>
      </div>
      <p className="text-sm font-semibold text-bolt-dark">{value}</p>
    </div>
  );
}

function InfoRow({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center gap-2 text-sm">
      <Icon size={13} className="text-gray-400 shrink-0" />
      <span className="text-gray-400 w-20 shrink-0">{label}</span>
      <span className="font-medium text-bolt-dark truncate">{value}</span>
    </div>
  );
}

/* ─── Mobile order card ─── */
function OrderCard({ order, onSelect, formatDate, formatCreatedAt }) {
  const firstName = order.driver?.firstName ?? '';
  const lastName  = order.driver?.lastName  ?? '';
  const fullName  = `${firstName} ${lastName}`.trim() || '—';
  const vehicleName = VEHICLE_LABELS[order.vehicle] ?? order.vehicleName ?? order.vehicle ?? '—';
  const category = VEHICLE_CATEGORY[order.vehicle];

  return (
    <div
      onClick={() => onSelect(order)}
      className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex flex-col gap-3 active:bg-gray-50 transition cursor-pointer"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-9 h-9 rounded-full bg-bolt-green/10 flex items-center justify-center shrink-0">
            <span className="text-[11px] font-bold text-bolt-green">{initials(firstName, lastName)}</span>
          </div>
          <div className="min-w-0">
            <p className="font-semibold text-bolt-dark text-sm truncate">{fullName}</p>
            <p className="text-xs text-gray-400 truncate">{vehicleName}{category ? ` · ${category}` : ''}</p>
          </div>
        </div>
        <StatusBadge status={order.status} />
      </div>

      <div className="flex items-center justify-between text-xs text-gray-400">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1">
            <Calendar size={11} />
            {formatDate(order.date)}
          </span>
          <span>{order.time} · {order.hours}h</span>
        </div>
        <span className="font-bold text-bolt-dark text-sm">${order.totalPrice ?? 0}</span>
      </div>
    </div>
  );
}

/* ─── Mobile user card ─── */
function UserCard({ u, formatDate }) {
  const fullName = `${u.firstName} ${u.lastName}`.trim() || '—';
  const ini = ((u.firstName[0] ?? '') + (u.lastName[0] ?? '')).toUpperCase() || u.email[0]?.toUpperCase() || '?';

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex items-center gap-3">
      <div className="w-10 h-10 rounded-full bg-bolt-green/10 flex items-center justify-center shrink-0">
        <span className="text-xs font-bold text-bolt-green">{ini}</span>
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <p className="font-semibold text-bolt-dark text-sm truncate">{fullName}</p>
          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold shrink-0 ${
            u.count > 0 ? 'bg-bolt-green/10 text-bolt-green' : 'bg-gray-100 text-gray-400'
          }`}>
            {u.count} {u.count !== 1 ? ADMIN.users.orderPlural : ADMIN.users.orderSingular}
          </span>
        </div>
        <p className="text-xs text-gray-400 truncate">{u.email}</p>
        {u.registeredAt && (
          <p className="text-[11px] text-gray-300 mt-0.5">Inscrit le {formatDate(u.registeredAt?.seconds)}</p>
        )}
      </div>
    </div>
  );
}

function UsersSection({ orders, users: rawUsers, usersLoading, usersError }) {
  const [search, setSearch] = useState('');

  const orderCountByUser = orders.reduce((acc, o) => {
    const key = o.userId || o.userEmail;
    if (!key) return acc;
    acc[key] = (acc[key] ?? 0) + 1;
    return acc;
  }, {});

  const usersMap = new Map();

  rawUsers.forEach(u => {
    const key = u.uid || u.email;
    if (!key) return;
    usersMap.set(key, {
      key,
      email: u.email ?? '—',
      firstName: u.displayName?.split(' ')[0] ?? '',
      lastName: u.displayName?.split(' ').slice(1).join(' ') ?? '',
      registeredAt: u.createdAt ?? null,
      count: orderCountByUser[u.uid] ?? orderCountByUser[u.email] ?? 0,
    });
  });

  orders.forEach(o => {
    const key = o.userId || o.userEmail;
    if (!key || usersMap.has(key)) return;
    usersMap.set(key, {
      key,
      email: o.userEmail ?? '—',
      firstName: o.driver?.firstName ?? '',
      lastName: o.driver?.lastName ?? '',
      registeredAt: null,
      count: orderCountByUser[key] ?? 0,
    });
  });

  const users = Array.from(usersMap.values()).sort((a, b) => {
    const ta = a.registeredAt?.seconds ?? 0;
    const tb = b.registeredAt?.seconds ?? 0;
    return tb - ta;
  });

  const formatDate = (seconds) => {
    if (!seconds || seconds === Infinity) return '—';
    return new Date(seconds * 1000).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: '2-digit' });
  };

  const filtered = users.filter(u =>
    !search ||
    `${u.firstName} ${u.lastName}`.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-4">
      {/* Header + search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-bolt-dark">{ADMIN.users.title}</h2>
          <p className="text-sm text-gray-400 mt-0.5">{users.length} {users.length !== 1 ? ADMIN.users.countPlural : ADMIN.users.countSingular}</p>
        </div>
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder={ADMIN.users.searchPlaceholder}
          className="border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-bolt-green w-full sm:w-64"
        />
      </div>

      {usersLoading ? (
        <div className="flex flex-col items-center justify-center py-24 gap-3 text-gray-300">
          <svg className="animate-spin" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeOpacity="0.3" />
            <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          </svg>
          <span className="text-sm">Chargement…</span>
        </div>
      ) : usersError ? (
        <div className="text-center py-16 px-6">
          <div className="w-14 h-14 rounded-2xl bg-red-50 flex items-center justify-center mx-auto mb-4">
            <XCircle size={28} className="text-red-400" />
          </div>
          <p className="font-bold text-bolt-dark mb-1">Erreur Firestore</p>
          <p className="text-sm text-gray-500 mb-4 max-w-sm mx-auto">
            {usersError.code === 'permission-denied'
              ? 'Accès refusé. Mettez à jour les règles de sécurité Firestore.'
              : `Code d'erreur : ${usersError.code}`}
          </p>
          <code className="text-xs text-red-400 bg-red-50 px-3 py-2 rounded-xl block max-w-md mx-auto break-all">
            {usersError.message}
          </code>
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 gap-3">
          <div className="w-14 h-14 rounded-2xl bg-gray-100 flex items-center justify-center">
            <Users size={24} className="text-gray-300" />
          </div>
          <p className="text-sm font-medium text-gray-400">
            {search ? ADMIN.users.noResults : ADMIN.users.empty}
          </p>
        </div>
      ) : (
        <>
          {/* Mobile cards */}
          <div className="md:hidden space-y-3">
            {filtered.map(u => (
              <UserCard key={u.key} u={u} formatDate={formatDate} />
            ))}
          </div>

          {/* Desktop table */}
          <div className="hidden md:block bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50/60">
                    {Object.values(ADMIN.users.columns).map(h => (
                      <th key={h} className="text-left px-4 py-3 text-[11px] font-bold uppercase tracking-wider text-gray-400">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {filtered.map(u => {
                    const fullName = `${u.firstName} ${u.lastName}`.trim() || '—';
                    const ini = ((u.firstName[0] ?? '') + (u.lastName[0] ?? '')).toUpperCase() || u.email[0]?.toUpperCase() || '?';
                    return (
                      <tr key={u.key} className="hover:bg-gray-50/80 transition">
                        <td className="px-4 py-3.5">
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-full bg-bolt-green/10 flex items-center justify-center shrink-0">
                              <span className="text-[11px] font-bold text-bolt-green">{ini}</span>
                            </div>
                            <span className="font-medium text-bolt-dark text-xs whitespace-nowrap">{fullName}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3.5 text-gray-500 text-xs whitespace-nowrap">{u.email}</td>
                        <td className="px-4 py-3.5 text-gray-400 text-xs whitespace-nowrap">{formatDate(u.registeredAt?.seconds)}</td>
                        <td className="px-4 py-3.5">
                          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold ${
                            u.count > 0 ? 'bg-bolt-green/10 text-bolt-green' : 'bg-gray-100 text-gray-400'
                          }`}>
                            {u.count} {u.count !== 1 ? ADMIN.users.orderPlural : ADMIN.users.orderSingular}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default function AdminDashboard({ onBack }) {
  const [activeTab, setActiveTab] = useState('orders');
  const [showRevenue, setShowRevenue] = useState(false);
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [usersLoading, setUsersLoading] = useState(true);
  const [usersError, setUsersError] = useState(null);
  const [selected, setSelected] = useState(null);
  const [sortField, setSortField] = useState('createdAt');
  const [sortAsc, setSortAsc] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    const q = query(collection(db, 'orders'));
    const unsub = onSnapshot(q, (snap) => {
      setOrders(snap.docs.map(d => ({ id: d.id, ...d.data() })));
      setLoading(false);
      setError(null);
    }, (err) => {
      console.error('Firestore onSnapshot error:', err);
      setError(err);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'users'), (snap) => {
      setUsers(snap.docs.map(d => ({ id: d.id, ...d.data() })));
      setUsersLoading(false);
      setUsersError(null);
    }, (err) => {
      console.error('Firestore users error:', err);
      setUsersError(err);
      setUsersLoading(false);
    });
    return () => unsub();
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await updateDoc(doc(db, 'orders', orderId), { status: newStatus });
      setSelected(prev => prev ? { ...prev, status: newStatus } : null);
    } catch (err) {
      console.error('Erreur mise à jour statut:', err);
    }
  };

  const toggleSort = (field) => {
    if (sortField === field) setSortAsc(a => !a);
    else { setSortField(field); setSortAsc(true); }
  };

  const counts = {
    all:       orders.length,
    pending:   orders.filter(o => o.status === 'pending').length,
    confirmed: orders.filter(o => o.status === 'confirmed').length,
    cancelled: orders.filter(o => o.status === 'cancelled').length,
  };

  const filtered = orders.filter(o => filterStatus === 'all' || o.status === filterStatus);

  const sorted = [...filtered].sort((a, b) => {
    let va = a[sortField], vb = b[sortField];
    if (sortField === 'createdAt') {
      va = a.createdAt?.seconds ?? 0;
      vb = b.createdAt?.seconds ?? 0;
    }
    if (va < vb) return sortAsc ? -1 : 1;
    if (va > vb) return sortAsc ? 1 : -1;
    return 0;
  });

  const stats = {
    total:     orders.length,
    pending:   counts.pending,
    confirmed: counts.confirmed,
    cancelled: counts.cancelled,
    revenue:   orders.filter(o => o.status !== 'cancelled').reduce((s, o) => s + (o.totalPrice ?? 0), 0),
  };

  const SortIcon = ({ field }) => {
    if (sortField !== field) return <ChevronDown size={12} className="text-gray-300" />;
    return sortAsc
      ? <ChevronUp size={12} className="text-bolt-green" />
      : <ChevronDown size={12} className="text-bolt-green" />;
  };

  const formatDate = (d) => {
    if (!d) return '—';
    return new Date(`${d}T00:00:00`).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: '2-digit' });
  };

  const formatCreatedAt = (ts) => {
    if (!ts?.seconds) return '—';
    return new Date(ts.seconds * 1000).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit' });
  };

  const FILTERS = [
    { key: 'all',       label: 'Toutes'    },
    { key: 'pending',   label: 'Attente'   },
    { key: 'confirmed', label: 'Confirmées' },
    { key: 'cancelled', label: 'Annulées'  },
  ];

  const COLUMNS = [
    { label: 'Créée le',   field: 'createdAt' },
    { label: 'Date',        field: 'date'      },
    { label: 'Véhicule',    field: null        },
    { label: 'Conducteur',  field: null        },
    { label: 'Téléphone',   field: null        },
    { label: 'Total',       field: 'totalPrice' },
    { label: 'Statut',      field: 'status'    },
  ];

  return (
    <div className="min-h-screen bg-[#f4f5f7]">

      {/* Top nav */}
      <header className="sticky top-0 z-10 bg-bolt-dark shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={onBack}
              aria-label="Retour"
              className="flex items-center gap-1.5 text-gray-400 hover:text-white transition text-sm font-medium"
            >
              <ArrowLeft size={15} aria-hidden="true" />
              <span className="hidden sm:inline">Retour</span>
            </button>
            <span className="text-gray-700 hidden sm:inline" aria-hidden="true">·</span>
            <div className="flex items-center gap-1.5 text-white" aria-label="Administration">
              <LayoutDashboard size={15} className="text-bolt-green" aria-hidden="true" />
              <span className="font-bold text-sm hidden sm:inline">Administration</span>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setActiveTab('orders')}
              aria-pressed={activeTab === 'orders'}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                activeTab === 'orders'
                  ? 'bg-white/10 text-white'
                  : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              <Package size={13} aria-hidden="true" />
              Commandes
            </button>
            <button
              onClick={() => setActiveTab('users')}
              aria-pressed={activeTab === 'users'}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                activeTab === 'users'
                  ? 'bg-white/10 text-white'
                  : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              <Users size={13} aria-hidden="true" />
              Utilisateurs
            </button>
          </div>

          <img src={BOLT_LOGO_DARK} alt="Bolt" className="h-5 brightness-0 invert opacity-70 shrink-0" />
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-5">

        {activeTab === 'users' ? (
          <UsersSection orders={orders} users={users} usersLoading={usersLoading} usersError={usersError} />
        ) : (<>

        {/* Page title */}
        <div>
          <h1 className="text-2xl font-bold text-bolt-dark">Tableau de bord</h1>
          <p className="text-sm text-gray-400 mt-0.5">{orders.length} commande{orders.length !== 1 ? 's' : ''} au total</p>
        </div>

        {/* Stats */}
        {/* Desktop: all 5 in a row */}
        <div className="hidden sm:grid sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {STAT_CONFIG.map(cfg => (
            <StatCard key={cfg.key} {...cfg} value={stats[cfg.key]} />
          ))}
        </div>
        {/* Mobile: 2x2 grid + revenus toggle */}
        <div className="sm:hidden space-y-3">
          <div className="grid grid-cols-2 gap-3">
            {STAT_CONFIG.filter(cfg => cfg.key !== 'revenue').map(cfg => (
              <StatCard key={cfg.key} {...cfg} value={stats[cfg.key]} />
            ))}
          </div>
          {showRevenue && (
            <StatCard {...STAT_CONFIG.find(c => c.key === 'revenue')} value={stats.revenue} />
          )}
          <button
            onClick={() => setShowRevenue(v => !v)}
            className="w-full text-xs font-semibold text-gray-400 hover:text-bolt-dark transition flex items-center justify-center gap-1.5 py-1"
          >
            {showRevenue ? (
              <><ChevronUp size={13} /> Masquer les revenus</>
            ) : (
              <><ChevronDown size={13} /> Voir les revenus</>
            )}
          </button>
        </div>

        {/* Orders */}
        <div className="space-y-3">

          {/* Toolbar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <h2 className="font-bold text-bolt-dark text-sm">
              Commandes <span className="text-gray-400 font-normal">({filtered.length})</span>
            </h2>
            {/* Segmented slider — scrollable on mobile */}
            <div className="overflow-x-auto pb-0.5 -mx-1 px-1">
              <div
                className="relative bg-gray-100 rounded-xl p-1 grid min-w-max"
                style={{ gridTemplateColumns: `repeat(${FILTERS.length}, 1fr)` }}
              >
                <div
                  className="absolute inset-y-1 rounded-lg bg-white shadow-sm pointer-events-none"
                  style={{
                    width: `calc((100% - ${SLIDER_PAD * 2}px) / ${FILTERS.length})`,
                    left: `calc(${SLIDER_PAD}px + ${FILTERS.findIndex(f => f.key === filterStatus)} * ((100% - ${SLIDER_PAD * 2}px) / ${FILTERS.length}))`,
                    transition: 'left 200ms cubic-bezier(0.4, 0, 0.2, 1)',
                  }}
                />
                {FILTERS.map(({ key, label }) => (
                  <button
                    key={key}
                    onClick={() => setFilterStatus(key)}
                    className={`relative z-10 flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-semibold whitespace-nowrap transition-colors duration-150 ${
                      filterStatus === key ? 'text-bolt-dark' : 'text-gray-400 hover:text-gray-600'
                    }`}
                  >
                    {label}
                    <span className={`text-[10px] font-bold transition-colors duration-150 ${
                      filterStatus === key ? 'text-bolt-green' : 'text-gray-400'
                    }`}>
                      {counts[key]}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {loading ? (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center justify-center py-24 gap-3 text-gray-300">
              <svg className="animate-spin" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeOpacity="0.3" />
                <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
              </svg>
              <span className="text-sm">Chargement…</span>
            </div>

          ) : error ? (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm text-center py-16 px-6">
              <div className="w-14 h-14 rounded-2xl bg-red-50 flex items-center justify-center mx-auto mb-4">
                <XCircle size={28} className="text-red-400" />
              </div>
              <p className="font-bold text-bolt-dark mb-1">Erreur Firestore</p>
              <p className="text-sm text-gray-500 mb-4 max-w-sm mx-auto">
                {error.code === 'permission-denied'
                  ? 'Accès refusé. Mettez à jour les règles de sécurité Firestore dans la console Firebase.'
                  : `Code d'erreur : ${error.code}`}
              </p>
              <code className="text-xs text-red-400 bg-red-50 px-3 py-2 rounded-xl block max-w-md mx-auto break-all">
                {error.message}
              </code>
            </div>

          ) : sorted.length === 0 ? (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center justify-center py-24 gap-3">
              <div className="w-14 h-14 rounded-2xl bg-gray-100 flex items-center justify-center">
                <Package size={24} className="text-gray-300" />
              </div>
              <p className="text-sm font-medium text-gray-400">Aucune commande trouvée</p>
            </div>

          ) : (
            <>
              {/* Mobile cards */}
              <div className="md:hidden space-y-3">
                {sorted.map(order => (
                  <OrderCard
                    key={order.id}
                    order={order}
                    onSelect={setSelected}
                    formatDate={formatDate}
                    formatCreatedAt={formatCreatedAt}
                  />
                ))}
              </div>

              {/* Desktop table */}
              <div className="hidden md:block bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-100 bg-gray-50/60">
                        {COLUMNS.map(({ label, field }) => (
                          <th key={label} className="text-left px-4 py-3 text-[11px] font-bold uppercase tracking-wider text-gray-400">
                            {field ? (
                              <button onClick={() => toggleSort(field)} className="flex items-center gap-1 hover:text-bolt-dark transition">
                                {label} <SortIcon field={field} />
                              </button>
                            ) : label}
                          </th>
                        ))}
                        <th className="px-4 py-3" />
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {sorted.map((order) => {
                        const firstName = order.driver?.firstName ?? '';
                        const lastName  = order.driver?.lastName  ?? '';
                        const fullName  = `${firstName} ${lastName}`.trim() || '—';
                        const category  = VEHICLE_CATEGORY[order.vehicle];
                        return (
                          <tr
                            key={order.id}
                            onClick={() => setSelected(order)}
                            className="hover:bg-gray-50/80 transition cursor-pointer group"
                          >
                            <td className="px-4 py-3.5 text-gray-400 text-xs whitespace-nowrap">
                              {formatCreatedAt(order.createdAt)}
                            </td>
                            <td className="px-4 py-3.5 whitespace-nowrap">
                              <p className="font-semibold text-bolt-dark text-xs">{formatDate(order.date)}</p>
                              <p className="text-gray-400 text-xs">{order.time} · {order.hours}h</p>
                            </td>
                            <td className="px-4 py-3.5">
                              <p className="font-medium text-bolt-dark text-xs whitespace-nowrap">
                                {VEHICLE_LABELS[order.vehicle] ?? order.vehicleName ?? order.vehicle}
                              </p>
                              {category && (
                                <span className="text-[10px] text-gray-400">{category}</span>
                              )}
                            </td>
                            <td className="px-4 py-3.5">
                              <div className="flex items-center gap-2">
                                <div className="w-7 h-7 rounded-full bg-bolt-green/10 flex items-center justify-center shrink-0">
                                  <span className="text-[10px] font-bold text-bolt-green">
                                    {initials(firstName, lastName)}
                                  </span>
                                </div>
                                <span className="font-medium text-bolt-dark text-xs whitespace-nowrap">{fullName}</span>
                              </div>
                            </td>
                            <td className="px-4 py-3.5 text-gray-500 text-xs whitespace-nowrap">
                              {order.driver?.phone ?? '—'}
                            </td>
                            <td className="px-4 py-3.5 font-bold text-bolt-dark text-xs whitespace-nowrap">
                              ${order.totalPrice ?? 0}
                            </td>
                            <td className="px-4 py-3.5">
                              <StatusBadge status={order.status} />
                            </td>
                            <td className="px-4 py-3.5">
                              <button
                                onClick={e => { e.stopPropagation(); setSelected(order); }}
                                className="text-[11px] font-bold text-gray-300 group-hover:text-bolt-green transition whitespace-nowrap"
                              >
                                Voir →
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}
        </div>
        </>)}
      </main>

      {selected && (
        <OrderDetailModal
          order={selected}
          onClose={() => setSelected(null)}
          onStatusChange={handleStatusChange}
        />
      )}
    </div>
  );
}
