import React, { useState, useEffect } from 'react';
import {
  ArrowLeft, Package, Clock, CheckCircle, XCircle,
  DollarSign, ChevronDown, ChevronUp, X, LayoutDashboard,
  Car, User, Phone, Mail, Calendar, Timer,
} from 'lucide-react';
import { collection, onSnapshot, query, updateDoc, doc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { BOLT_LOGO_DARK } from '../data/assets';
import { VEHICLES } from '../data/vehicles';

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

// Construit depuis vehicles.js — source unique de vérité
const VEHICLE_LABELS = Object.fromEntries(VEHICLES.map(v => [v.id, v.name]));
const VEHICLE_CATEGORY = Object.fromEntries(VEHICLES.map(v => [v.id, v.category]));

function initials(firstName, lastName) {
  return `${(firstName?.[0] ?? '').toUpperCase()}${(lastName?.[0] ?? '').toUpperCase()}` || '?';
}

function StatCard({ label, value, icon: Icon, accent, dot, text, prefix = '' }) {
  return (
    <div className={`bg-white rounded-2xl border border-gray-100 shadow-sm p-5 border-l-4 ${accent} flex items-center gap-4`}>
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center bg-gray-50`}>
        <Icon size={18} className={text} />
      </div>
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-0.5">{label}</p>
        <p className="text-2xl font-bold text-bolt-dark leading-none">{prefix}{value}</p>
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
        <div className="bg-bolt-dark px-7 pt-7 pb-6 relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center rounded-full bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white transition"
          >
            <X size={16} />
          </button>
          <p className="text-xs text-gray-400 font-mono mb-1">Commande #{order.id.slice(0, 8).toUpperCase()}</p>
          <h2 className="text-lg font-bold text-white mb-3">{fullName}</h2>
          <div className="flex items-center gap-3">
            <StatusBadge status={order.status} />
            <span className="text-bolt-green font-bold text-xl">${order.totalPrice ?? 0}</span>
          </div>
        </div>

        <div className="px-7 py-5 space-y-5 max-h-[60vh] overflow-y-auto">

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
        <div className="px-7 py-5 border-t border-gray-100 flex gap-2 flex-wrap">
          {Object.entries(STATUS_BTN)
            .filter(([key]) => key !== order.status)
            .map(([key, { label, cls }]) => (
              <button
                key={key}
                disabled={loading}
                onClick={() => changeStatus(key)}
                className={`flex-1 font-bold py-2.5 rounded-xl text-sm transition disabled:opacity-40 ${cls}`}
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
      <span className="font-medium text-bolt-dark">{value}</span>
    </div>
  );
}

export default function AdminDashboard({ onBack }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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
    { key: 'pending',   label: 'En attente' },
    { key: 'confirmed', label: 'Confirmées' },
    { key: 'cancelled', label: 'Annulées'   },
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="flex items-center gap-1.5 text-gray-400 hover:text-white transition text-sm font-medium"
            >
              <ArrowLeft size={15} />
              Retour
            </button>
            <span className="text-gray-700">·</span>
            <div className="flex items-center gap-1.5 text-white">
              <LayoutDashboard size={15} className="text-bolt-green" />
              <span className="font-bold text-sm">Administration</span>
            </div>
          </div>
          <img src={BOLT_LOGO_DARK} alt="Bolt" className="h-5 brightness-0 invert opacity-70" />
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-6">

        {/* Page title */}
        <div className="flex items-end justify-between">
          <div>
            <h1 className="text-2xl font-bold text-bolt-dark">Tableau de bord</h1>
            <p className="text-sm text-gray-400 mt-0.5">{orders.length} commande{orders.length !== 1 ? 's' : ''} au total</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
          {STAT_CONFIG.map(cfg => (
            <StatCard key={cfg.key} {...cfg} value={stats[cfg.key]} />
          ))}
        </div>

        {/* Orders table */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">

          {/* Toolbar */}
          <div className="px-5 py-4 border-b border-gray-100 flex flex-wrap items-center justify-between gap-3">
            <h2 className="font-bold text-bolt-dark text-sm">
              Commandes <span className="text-gray-400 font-normal">({filtered.length})</span>
            </h2>
            {/* Segmented slider */}
            <div
              className="relative bg-gray-100 rounded-xl p-1 grid"
              style={{ gridTemplateColumns: `repeat(${FILTERS.length}, 1fr)` }}
            >
              {/* Sliding indicator */}
              <div
                className="absolute inset-y-1 rounded-lg bg-white shadow-sm pointer-events-none"
                style={{
                  width: `calc((100% - 8px) / ${FILTERS.length})`,
                  left: `calc(4px + ${FILTERS.findIndex(f => f.key === filterStatus)} * ((100% - 8px) / ${FILTERS.length}))`,
                  transition: 'left 200ms cubic-bezier(0.4, 0, 0.2, 1)',
                }}
              />
              {FILTERS.map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => setFilterStatus(key)}
                  className={`relative z-10 flex items-center justify-center gap-1.5 py-1.5 px-3 text-xs font-semibold whitespace-nowrap transition-colors duration-150 ${
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

          {loading ? (
            <div className="flex flex-col items-center justify-center py-24 gap-3 text-gray-300">
              <svg className="animate-spin" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeOpacity="0.3" />
                <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
              </svg>
              <span className="text-sm">Chargement…</span>
            </div>

          ) : error ? (
            <div className="text-center py-16 px-6">
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
            <div className="flex flex-col items-center justify-center py-24 gap-3">
              <div className="w-14 h-14 rounded-2xl bg-gray-100 flex items-center justify-center">
                <Package size={24} className="text-gray-300" />
              </div>
              <p className="text-sm font-medium text-gray-400">Aucune commande trouvée</p>
            </div>

          ) : (
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
                        {/* Créée le */}
                        <td className="px-4 py-3.5 text-gray-400 text-xs whitespace-nowrap">
                          {formatCreatedAt(order.createdAt)}
                        </td>

                        {/* Date */}
                        <td className="px-4 py-3.5 whitespace-nowrap">
                          <p className="font-semibold text-bolt-dark text-xs">{formatDate(order.date)}</p>
                          <p className="text-gray-400 text-xs">{order.time} · {order.hours}h</p>
                        </td>

                        {/* Véhicule */}
                        <td className="px-4 py-3.5">
                          <p className="font-medium text-bolt-dark text-xs whitespace-nowrap">
                            {VEHICLE_LABELS[order.vehicle] ?? order.vehicleName ?? order.vehicle}
                          </p>
                          {category && (
                            <span className="text-[10px] text-gray-400">{category}</span>
                          )}
                        </td>

                        {/* Conducteur */}
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

                        {/* Téléphone */}
                        <td className="px-4 py-3.5 text-gray-500 text-xs whitespace-nowrap">
                          {order.driver?.phone ?? '—'}
                        </td>

                        {/* Total */}
                        <td className="px-4 py-3.5 font-bold text-bolt-dark text-xs whitespace-nowrap">
                          ${order.totalPrice ?? 0}
                        </td>

                        {/* Statut */}
                        <td className="px-4 py-3.5">
                          <StatusBadge status={order.status} />
                        </td>

                        {/* Action */}
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
          )}
        </div>
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
