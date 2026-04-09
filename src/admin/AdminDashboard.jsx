import React, { useState, useEffect } from 'react';
import {
  ArrowLeft, Package, Clock, CheckCircle, XCircle,
  DollarSign, ChevronDown, ChevronUp, X, LayoutDashboard
} from 'lucide-react';
import { collection, onSnapshot, query, updateDoc, doc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { BOLT_LOGO_DARK } from '../data/assets';

const STATUS_LABELS = {
  pending:   'En attente',
  confirmed: 'Confirmée',
  cancelled: 'Annulée',
};

const STATUS_STYLES = {
  pending:   'bg-amber-100 text-amber-700',
  confirmed: 'bg-green-100 text-green-700',
  cancelled: 'bg-red-100 text-red-600',
};

const VEHICLE_LABELS = {
  prius:  'Toyota Prius',
  leaf:   'Nissan Leaf',
  civic:  'Honda Civic',
  lexus:  'Lexus ES',
};

function StatCard({ icon: Icon, label, value, accent }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex items-center gap-4">
      <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${accent}`}>
        <Icon size={20} className="text-white" />
      </div>
      <div>
        <p className="text-xs font-bold uppercase tracking-wide text-gray-400">{label}</p>
        <p className="text-2xl font-bold text-bolt-dark mt-0.5">{value}</p>
      </div>
    </div>
  );
}

function StatusBadge({ status }) {
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${STATUS_STYLES[status] ?? 'bg-gray-100 text-gray-500'}`}>
      {STATUS_LABELS[status] ?? status}
    </span>
  );
}

function OrderDetailModal({ order, onClose, onStatusChange }) {
  const [loading, setLoading] = useState(false);

  const changeStatus = async (newStatus) => {
    setLoading(true);
    await onStatusChange(order.id, newStatus);
    setLoading(false);
  };

  const formatDate = (d) => {
    if (!d) return '—';
    return new Date(d).toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg p-8 relative animate-[fadeIn_0.15s_ease]">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-gray-400 hover:text-bolt-dark transition"
        >
          <X size={22} />
        </button>

        <h2 className="text-xl font-bold text-bolt-dark mb-1">Détails de la commande</h2>
        <p className="text-xs text-gray-400 mb-6 font-mono">#{order.id.slice(0, 8).toUpperCase()}</p>

        <div className="space-y-3 mb-6">
          <Row label="Statut" value={<StatusBadge status={order.status} />} />
          <Row label="Date" value={formatDate(order.date)} />
          <Row label="Heure" value={order.time} />
          <Row label="Durée" value={`${order.hours} h`} />
          <Row label="Véhicule" value={VEHICLE_LABELS[order.vehicle] ?? order.vehicleName ?? order.vehicle} />
          <Row label="Prix total" value={<span className="font-bold text-bolt-green">${order.totalPrice}</span>} />
        </div>

        <div className="border-t border-gray-100 pt-4 mb-6 space-y-3">
          <p className="text-xs font-bold uppercase tracking-wide text-gray-400 mb-2">Conducteur</p>
          <Row label="Prénom" value={order.driver?.firstName} />
          <Row label="Nom" value={order.driver?.lastName} />
          <Row label="Âge" value={`${order.driver?.age} ans`} />
          <Row label="Téléphone" value={order.driver?.phone} />
          <Row label="Email" value={order.userEmail} />
        </div>

        <div className="flex gap-2 flex-wrap">
          {order.status !== 'confirmed' && (
            <button
              disabled={loading}
              onClick={() => changeStatus('confirmed')}
              className="flex-1 bg-bolt-green text-white font-bold py-2.5 rounded-xl text-sm hover:bg-[#29a366] transition disabled:opacity-50"
            >
              Confirmer
            </button>
          )}
          {order.status !== 'pending' && (
            <button
              disabled={loading}
              onClick={() => changeStatus('pending')}
              className="flex-1 bg-amber-100 text-amber-700 font-bold py-2.5 rounded-xl text-sm hover:bg-amber-200 transition disabled:opacity-50"
            >
              En attente
            </button>
          )}
          {order.status !== 'cancelled' && (
            <button
              disabled={loading}
              onClick={() => changeStatus('cancelled')}
              className="flex-1 bg-red-100 text-red-600 font-bold py-2.5 rounded-xl text-sm hover:bg-red-200 transition disabled:opacity-50"
            >
              Annuler
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function Row({ label, value }) {
  return (
    <div className="flex justify-between items-center text-sm">
      <span className="text-gray-500">{label}</span>
      <span className="font-medium text-bolt-dark text-right">{value ?? '—'}</span>
    </div>
  );
}

const SORT_FIELDS = ['createdAt', 'date', 'totalPrice', 'status'];

export default function AdminDashboard({ onBack }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selected, setSelected] = useState(null);
  const [sortField, setSortField] = useState('createdAt');
  const [sortAsc, setSortAsc] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    // Sans orderBy côté Firestore — tri fait côté client pour éviter l'erreur d'index manquant
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
    await updateDoc(doc(db, 'orders', orderId), { status: newStatus });
    setSelected(prev => prev ? { ...prev, status: newStatus } : null);
  };

  const toggleSort = (field) => {
    if (sortField === field) setSortAsc(a => !a);
    else { setSortField(field); setSortAsc(true); }
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
    pending:   orders.filter(o => o.status === 'pending').length,
    confirmed: orders.filter(o => o.status === 'confirmed').length,
    cancelled: orders.filter(o => o.status === 'cancelled').length,
    revenue:   orders.filter(o => o.status !== 'cancelled').reduce((s, o) => s + (o.totalPrice ?? 0), 0),
  };

  const SortIcon = ({ field }) => {
    if (sortField !== field) return <ChevronDown size={13} className="text-gray-300" />;
    return sortAsc
      ? <ChevronUp size={13} className="text-bolt-green" />
      : <ChevronDown size={13} className="text-bolt-green" />;
  };

  const formatDate = (d) => {
    if (!d) return '—';
    return new Date(d).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: '2-digit' });
  };

  const formatCreatedAt = (ts) => {
    if (!ts?.seconds) return '—';
    return new Date(ts.seconds * 1000).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-bolt-dark border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-gray-300 hover:text-white transition font-medium text-sm"
            >
              <ArrowLeft size={16} />
              Retour au site
            </button>
            <div className="w-px h-5 bg-gray-700" />
            <div className="flex items-center gap-2 text-white">
              <LayoutDashboard size={18} className="text-bolt-green" />
              <span className="font-bold text-sm">Tableau de bord admin</span>
            </div>
          </div>
          <img src={BOLT_LOGO_DARK} alt="Bolt" className="h-5 brightness-0 invert" />
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-6">

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <StatCard icon={Package}     label="Total"      value={stats.total}     accent="bg-bolt-dark" />
          <StatCard icon={Clock}       label="En attente" value={stats.pending}   accent="bg-amber-500" />
          <StatCard icon={CheckCircle} label="Confirmées" value={stats.confirmed} accent="bg-bolt-green" />
          <StatCard icon={XCircle}     label="Annulées"   value={stats.cancelled} accent="bg-red-500" />
          <StatCard icon={DollarSign}  label="Revenus"    value={`$${stats.revenue}`} accent="bg-indigo-500" />
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          {/* Toolbar */}
          <div className="px-6 py-4 border-b border-gray-100 flex flex-wrap items-center justify-between gap-3">
            <h2 className="font-bold text-bolt-dark">Commandes ({filtered.length})</h2>
            <div className="flex gap-2 flex-wrap">
              {['all', 'pending', 'confirmed', 'cancelled'].map(s => (
                <button
                  key={s}
                  onClick={() => setFilterStatus(s)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                    filterStatus === s
                      ? 'bg-bolt-dark text-white'
                      : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                  }`}
                >
                  {s === 'all' ? 'Toutes' : STATUS_LABELS[s]}
                </button>
              ))}
            </div>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20 text-gray-400">
              <svg className="animate-spin mr-3" width="20" height="20" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeOpacity="0.3" />
                <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
              </svg>
              Chargement...
            </div>
          ) : error ? (
            <div className="text-center py-20 px-6">
              <XCircle size={40} className="mx-auto mb-3 text-red-400" />
              <p className="font-bold text-bolt-dark mb-2">Erreur de connexion à Firestore</p>
              <p className="text-sm text-gray-500 mb-4">
                {error.code === 'permission-denied'
                  ? 'Accès refusé par les règles de sécurité Firestore. Activez le mode test dans la console Firebase.'
                  : error.code === 'unavailable' || error.code === 'not-found'
                  ? 'Firestore n\'est pas activé sur ce projet. Allez dans Firebase Console → Firestore Database → Créer une base de données.'
                  : `Code d'erreur : ${error.code}`}
              </p>
              <code className="text-xs text-red-500 bg-red-50 px-3 py-1.5 rounded-lg block max-w-md mx-auto break-all">
                {error.message}
              </code>
            </div>
          ) : sorted.length === 0 ? (
            <div className="text-center py-20 text-gray-400">
              <Package size={40} className="mx-auto mb-3 opacity-30" />
              <p className="font-medium">Aucune commande trouvée</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100 text-xs uppercase tracking-wide text-gray-400">
                    {[
                      { label: 'Créée le',  field: 'createdAt' },
                      { label: 'Date',       field: 'date' },
                      { label: 'Heure',      field: null },
                      { label: 'Durée',      field: null },
                      { label: 'Véhicule',   field: null },
                      { label: 'Conducteur', field: null },
                      { label: 'Téléphone',  field: null },
                      { label: 'Total',      field: 'totalPrice' },
                      { label: 'Statut',     field: 'status' },
                    ].map(({ label, field }) => (
                      <th key={label} className="text-left px-4 py-3 font-bold">
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
                <tbody>
                  {sorted.map((order, i) => (
                    <tr
                      key={order.id}
                      className={`border-b border-gray-50 hover:bg-gray-50 transition cursor-pointer ${i % 2 === 0 ? '' : 'bg-gray-50/30'}`}
                      onClick={() => setSelected(order)}
                    >
                      <td className="px-4 py-3 text-gray-400 text-xs whitespace-nowrap">{formatCreatedAt(order.createdAt)}</td>
                      <td className="px-4 py-3 font-medium text-bolt-dark whitespace-nowrap">{formatDate(order.date)}</td>
                      <td className="px-4 py-3 text-gray-600">{order.time}</td>
                      <td className="px-4 py-3 text-gray-600">{order.hours}h</td>
                      <td className="px-4 py-3 font-medium text-bolt-dark">{VEHICLE_LABELS[order.vehicle] ?? order.vehicleName ?? order.vehicle}</td>
                      <td className="px-4 py-3 text-gray-600 whitespace-nowrap">
                        {order.driver?.firstName} {order.driver?.lastName}
                      </td>
                      <td className="px-4 py-3 text-gray-600 whitespace-nowrap">{order.driver?.phone}</td>
                      <td className="px-4 py-3 font-bold text-bolt-dark">${order.totalPrice}</td>
                      <td className="px-4 py-3"><StatusBadge status={order.status} /></td>
                      <td className="px-4 py-3">
                        <button
                          onClick={e => { e.stopPropagation(); setSelected(order); }}
                          className="text-xs text-bolt-green font-bold hover:underline whitespace-nowrap"
                        >
                          Voir →
                        </button>
                      </td>
                    </tr>
                  ))}
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
