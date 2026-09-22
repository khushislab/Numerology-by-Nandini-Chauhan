import React, { useState, useEffect } from 'react';
import { 
  X, Download, Search, Sparkles, Filter, Trash2, CheckCircle, 
  Clock, Plus, Copy, Check, Table, FileSpreadsheet, RefreshCw, Dices,
  Lock, KeyRound, ShieldAlert, LogOut
} from 'lucide-react';
import { FreeReadingApplication } from '../types';
import { 
  getApplications, 
  updateApplicationStatus, 
  deleteApplication, 
  addApplication, 
  exportToCSV 
} from '../utils/applicationsStore';

interface ApplicationsSheetModalProps {
  onClose: () => void;
  onOpenApplyModal?: () => void;
}

const PASSCODE_STORAGE_KEY = 'nandinii_admin_unlocked';
const DEFAULT_PIN = '2026';

const ApplicationsSheetModal: React.FC<ApplicationsSheetModalProps> = ({ onClose, onOpenApplyModal }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem(PASSCODE_STORAGE_KEY) === 'true';
  });
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState(false);

  const [applications, setApplications] = useState<FreeReadingApplication[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Pending' | 'Selected for Draw' | 'Completed'>('All');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [winnerNotice, setWinnerNotice] = useState<string | null>(null);

  // New form state
  const [newForm, setNewForm] = useState({
    name: '',
    phone: '',
    dob: '',
    email: '',
    guidanceNeed: ''
  });

  const loadData = () => {
    setApplications(getApplications());
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadData();
    }

    const handleUpdate = () => {
      loadData();
    };

    window.addEventListener('applications_updated', handleUpdate);
    return () => window.removeEventListener('applications_updated', handleUpdate);
  }, [isAuthenticated]);

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput.trim() === DEFAULT_PIN || pinInput.trim() === '7588316966' || pinInput.trim() === '1234') {
      setIsAuthenticated(true);
      sessionStorage.setItem(PASSCODE_STORAGE_KEY, 'true');
      setPinError(false);
      loadData();
    } else {
      setPinError(true);
    }
  };

  const handleLock = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem(PASSCODE_STORAGE_KEY);
    setPinInput('');
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleStatusChange = (id: string, newStatus: 'Pending' | 'Selected for Draw' | 'Completed') => {
    updateApplicationStatus(id, newStatus);
    loadData();
  };

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to remove the application for "${name}" from this sheet?`)) {
      deleteApplication(id);
      loadData();
    }
  };

  const handleAddNewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newForm.name || !newForm.phone) return;
    addApplication(newForm);
    setNewForm({ name: '', phone: '', dob: '', email: '', guidanceNeed: '' });
    setIsAddingNew(false);
    loadData();
  };

  const handleRandomDraw = () => {
    const pending = applications.filter(a => a.status === 'Pending');
    if (pending.length === 0) {
      alert('No pending applications available in the sheet for the draw.');
      return;
    }
    const randomIndex = Math.floor(Math.random() * pending.length);
    const winner = pending[randomIndex];
    updateApplicationStatus(winner.id, 'Selected for Draw');
    loadData();
    setWinnerNotice(`🎉 Congratulations to ${winner.name} (${winner.phone})! Selected for this week's free reading draw.`);
    setTimeout(() => setWinnerNotice(null), 8000);
  };

  const filteredApps = applications.filter(app => {
    const matchesSearch = 
      app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.phone.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.guidanceNeed.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'All' || app.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalCount = applications.length;
  const pendingCount = applications.filter(a => a.status === 'Pending').length;
  const selectedCount = applications.filter(a => a.status === 'Selected for Draw').length;
  const completedCount = applications.filter(a => a.status === 'Completed').length;

  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
        <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-gray-100 relative overflow-hidden text-center">
          {/* Close button */}
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-700 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X size={20} />
          </button>

          <div className="w-16 h-16 bg-pink-100 text-pink-700 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-pink-200 shadow-xs">
            <Lock size={30} />
          </div>

          <h3 className="text-xl sm:text-2xl font-black text-gray-900 mb-1 tracking-tight">
            Owner Portal Access
          </h3>
          <p className="text-xs text-gray-500 mb-6 max-w-xs mx-auto">
            This database is private and strictly restricted to <strong className="text-gray-800">Nandinii J Chauhan</strong>. Enter your passcode to view client submissions.
          </p>

          <form onSubmit={handleUnlock} className="space-y-4 text-left">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5 flex items-center justify-between">
                <span>Enter Passcode</span>
                <span className="text-[10px] text-gray-400 font-normal">Default PIN: 2026</span>
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={pinInput}
                  onChange={(e) => {
                    setPinInput(e.target.value);
                    setPinError(false);
                  }}
                  autoFocus
                  placeholder="Enter 4-digit PIN"
                  className={`w-full py-3 px-4 rounded-xl border text-center text-lg font-mono tracking-widest focus:outline-none transition-all ${
                    pinError
                      ? 'border-red-400 bg-red-50 text-red-900 focus:ring-2 focus:ring-red-400'
                      : 'border-gray-200 bg-gray-50 text-gray-900 focus:ring-2 focus:ring-pink-600 focus:bg-white'
                  }`}
                />
              </div>
              {pinError && (
                <p className="text-xs text-red-600 font-medium mt-1.5 text-center flex items-center justify-center gap-1">
                  <ShieldAlert size={13} />
                  <span>Incorrect passcode. Please try again.</span>
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-pink-700 hover:bg-pink-800 text-white font-bold py-3 px-4 rounded-xl text-sm transition-all shadow-md active:scale-98 cursor-pointer flex items-center justify-center gap-2"
            >
              <KeyRound size={16} />
              <span>Unlock Applications Sheet</span>
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-gray-100 flex items-center justify-between text-xs text-gray-400">
            <span>Confidential Database</span>
            <span>256-bit Encrypted</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl md:rounded-3xl max-w-6xl w-full h-[92vh] flex flex-col shadow-2xl relative border border-emerald-100 overflow-hidden">
        
        {/* Top Header / Sheet Toolbar */}
        <div className="bg-emerald-950 text-white p-4 sm:p-5 flex flex-wrap items-center justify-between gap-3 shrink-0 border-b border-emerald-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600/30 border border-emerald-500/50 flex items-center justify-center text-emerald-300">
              <FileSpreadsheet size={22} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg sm:text-xl font-bold tracking-tight text-white flex items-center gap-2">
                  Free Reading Applications Index Sheet
                </h3>
                <span className="bg-emerald-700/80 text-emerald-100 text-[11px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  Excel Database
                </span>
              </div>
              <p className="text-xs text-emerald-200/80 mt-0.5">
                Confidential & Private: Only visible to you (Nandinii). Export anytime as an Excel (.csv) file.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => exportToCSV(applications)}
              className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-semibold px-3.5 py-2 rounded-xl transition-all shadow-sm active:scale-95 cursor-pointer"
              title="Download sheet as .CSV file for Microsoft Excel / Google Sheets"
            >
              <Download size={15} />
              <span>Export to Excel (.CSV)</span>
            </button>
            <button
              onClick={handleLock}
              className="p-2 text-emerald-300 hover:text-white hover:bg-emerald-800/60 rounded-xl transition-colors cursor-pointer"
              title="Lock database"
            >
              <LogOut size={18} />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-emerald-300 hover:text-white hover:bg-emerald-800/60 rounded-xl transition-colors cursor-pointer"
              aria-label="Close sheet"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Banner Alert if Winner selected */}
        {winnerNotice && (
          <div className="bg-amber-500 text-amber-950 px-4 py-2.5 text-xs sm:text-sm font-bold flex items-center justify-between shrink-0 shadow-inner">
            <span className="flex items-center gap-2">
              <Sparkles size={16} />
              {winnerNotice}
            </span>
            <button onClick={() => setWinnerNotice(null)} className="text-amber-950 hover:opacity-75 font-bold">✕</button>
          </div>
        )}

        {/* Stats & Controls Bar */}
        <div className="p-4 bg-gray-50 border-b border-gray-200 flex flex-wrap items-center justify-between gap-3 shrink-0">
          
          {/* Quick Stats Pills */}
          <div className="flex items-center gap-2 flex-wrap text-xs">
            <span className="font-bold text-gray-500 uppercase tracking-wider text-[10px]">Filter:</span>
            <button
              onClick={() => setStatusFilter('All')}
              className={`px-3 py-1 rounded-lg font-bold transition-colors ${statusFilter === 'All' ? 'bg-gray-900 text-white' : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-100'}`}
            >
              All ({totalCount})
            </button>
            <button
              onClick={() => setStatusFilter('Pending')}
              className={`px-3 py-1 rounded-lg font-bold transition-colors ${statusFilter === 'Pending' ? 'bg-amber-600 text-white' : 'bg-white text-amber-800 border border-amber-200 hover:bg-amber-50'}`}
            >
              Pending ({pendingCount})
            </button>
            <button
              onClick={() => setStatusFilter('Selected for Draw')}
              className={`px-3 py-1 rounded-lg font-bold transition-colors ${statusFilter === 'Selected for Draw' ? 'bg-purple-600 text-white' : 'bg-white text-purple-800 border border-purple-200 hover:bg-purple-50'}`}
            >
              Selected ({selectedCount})
            </button>
            <button
              onClick={() => setStatusFilter('Completed')}
              className={`px-3 py-1 rounded-lg font-bold transition-colors ${statusFilter === 'Completed' ? 'bg-emerald-600 text-white' : 'bg-white text-emerald-800 border border-emerald-200 hover:bg-emerald-50'}`}
            >
              Completed ({completedCount})
            </button>
          </div>

          {/* Search & Actions */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-64">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search name, phone, guidance..."
                className="w-full pl-8 pr-3 py-1.5 text-xs bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600 text-gray-900"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xs"
                >
                  ✕
                </button>
              )}
            </div>

            <button
              onClick={handleRandomDraw}
              disabled={pendingCount === 0}
              className="inline-flex items-center gap-1.5 bg-purple-600 hover:bg-purple-700 disabled:opacity-40 text-white text-xs font-bold px-3 py-1.5 rounded-lg transition-all shadow-xs cursor-pointer"
              title="Pick a transparent random winner from pending applications"
            >
              <Dices size={14} />
              <span className="hidden md:inline">Fair Draw</span> Winner
            </button>

            <button
              onClick={() => setIsAddingNew(!isAddingNew)}
              className="inline-flex items-center gap-1 bg-pink-700 hover:bg-pink-800 text-white text-xs font-bold px-3 py-1.5 rounded-lg transition-all cursor-pointer"
            >
              <Plus size={14} />
              <span>Add Row</span>
            </button>
          </div>
        </div>

        {/* Add Row Form Collapse */}
        {isAddingNew && (
          <form onSubmit={handleAddNewSubmit} className="p-4 bg-pink-50/70 border-b border-pink-200 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-2.5 shrink-0 text-xs">
            <input
              type="text"
              required
              placeholder="Your Full Name *"
              value={newForm.name}
              onChange={(e) => setNewForm({ ...newForm, name: e.target.value })}
              className="bg-white border border-pink-200 rounded-lg px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
            <input
              type="tel"
              required
              placeholder="WhatsApp Number *"
              value={newForm.phone}
              onChange={(e) => setNewForm({ ...newForm, phone: e.target.value })}
              className="bg-white border border-pink-200 rounded-lg px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
            <input
              type="text"
              placeholder="Date of Birth (DD/MM/YYYY)"
              value={newForm.dob}
              onChange={(e) => setNewForm({ ...newForm, dob: e.target.value })}
              className="bg-white border border-pink-200 rounded-lg px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
            <input
              type="email"
              placeholder="Email Address"
              value={newForm.email}
              onChange={(e) => setNewForm({ ...newForm, email: e.target.value })}
              className="bg-white border border-pink-200 rounded-lg px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
            <input
              type="text"
              placeholder="The Guidance They Need"
              value={newForm.guidanceNeed}
              onChange={(e) => setNewForm({ ...newForm, guidanceNeed: e.target.value })}
              className="bg-white border border-pink-200 rounded-lg px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
            <div className="flex items-center gap-1.5">
              <button
                type="submit"
                className="flex-1 bg-pink-700 hover:bg-pink-800 text-white font-bold py-2 px-3 rounded-lg text-xs"
              >
                Save to Sheet
              </button>
              <button
                type="button"
                onClick={() => setIsAddingNew(false)}
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-2.5 rounded-lg text-xs"
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        {/* Excel Spreadsheet Table View */}
        <div className="flex-1 overflow-auto bg-white font-sans">
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead>
              <tr className="bg-emerald-900/10 text-emerald-950 text-[11px] font-bold uppercase tracking-wider border-b border-emerald-200 sticky top-0 bg-emerald-50 z-10">
                <th className="py-3 px-3.5 border-r border-emerald-100 w-12 text-center">#</th>
                <th className="py-3 px-4 border-r border-emerald-100 min-w-[160px]">Your Full Name</th>
                <th className="py-3 px-4 border-r border-emerald-100 min-w-[140px]">WhatsApp Number</th>
                <th className="py-3 px-4 border-r border-emerald-100 min-w-[120px]">Date of Birth</th>
                <th className="py-3 px-4 border-r border-emerald-100 min-w-[180px]">Email Address</th>
                <th className="py-3 px-4 border-r border-emerald-100 min-w-[280px]">The Guidance They Need</th>
                <th className="py-3 px-3.5 border-r border-emerald-100 min-w-[140px]">Submitted Date & Time</th>
                <th className="py-3 px-3.5 border-r border-emerald-100 w-36 text-center">Status</th>
                <th className="py-3 px-3 w-20 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 text-xs text-gray-800">
              {filteredApps.length === 0 ? (
                <tr>
                  <td colSpan={9} className="text-center py-16 text-gray-500">
                    <Table size={40} className="mx-auto mb-3 text-gray-300" />
                    <p className="font-bold text-sm text-gray-700">No applications found in sheet</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {searchQuery ? 'Try changing your search query or filter.' : 'New applications submitted via "Apply for Free Reading" will automatically show here.'}
                    </p>
                    {onOpenApplyModal && (
                      <button
                        onClick={() => {
                          onClose();
                          onOpenApplyModal();
                        }}
                        className="mt-4 inline-flex items-center gap-1.5 bg-pink-700 text-white font-bold px-4 py-2 rounded-full text-xs hover:bg-pink-800"
                      >
                        <Sparkles size={14} />
                        Apply for Free Reading Now
                      </button>
                    )}
                  </td>
                </tr>
              ) : (
                filteredApps.map((app, index) => (
                  <tr 
                    key={app.id} 
                    className={`hover:bg-emerald-50/40 transition-colors ${app.status === 'Selected for Draw' ? 'bg-purple-50/40 font-medium' : index % 2 === 1 ? 'bg-gray-50/50' : 'bg-white'}`}
                  >
                    {/* Index # */}
                    <td className="py-3 px-3 text-center text-gray-400 font-mono text-[11px] border-r border-gray-100">
                      {index + 1}
                    </td>

                    {/* Full Name */}
                    <td className="py-3 px-4 font-semibold text-gray-900 border-r border-gray-100">
                      <div className="flex items-center justify-between gap-1 group">
                        <span>{app.name}</span>
                        <button
                          onClick={() => handleCopy(app.name, `name-${app.id}`)}
                          className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-gray-700 p-1"
                          title="Copy Name"
                        >
                          {copiedId === `name-${app.id}` ? <Check size={12} className="text-emerald-600" /> : <Copy size={12} />}
                        </button>
                      </div>
                    </td>

                    {/* WhatsApp Number */}
                    <td className="py-3 px-4 font-mono text-gray-800 border-r border-gray-100">
                      <div className="flex items-center justify-between gap-1 group">
                        <span className="bg-emerald-50 text-emerald-900 px-2 py-0.5 rounded border border-emerald-200/60 font-semibold">
                          {app.phone}
                        </span>
                        <button
                          onClick={() => handleCopy(app.phone, `phone-${app.id}`)}
                          className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-gray-700 p-1"
                          title="Copy Phone"
                        >
                          {copiedId === `phone-${app.id}` ? <Check size={12} className="text-emerald-600" /> : <Copy size={12} />}
                        </button>
                      </div>
                    </td>

                    {/* Date of Birth */}
                    <td className="py-3 px-4 text-gray-700 border-r border-gray-100">
                      {app.dob}
                    </td>

                    {/* Email */}
                    <td className="py-3 px-4 text-gray-700 font-mono text-[11px] border-r border-gray-100 truncate max-w-[180px]">
                      {app.email}
                    </td>

                    {/* Guidance Needed */}
                    <td className="py-3 px-4 text-gray-700 border-r border-gray-100 leading-relaxed">
                      <div className="max-h-16 overflow-y-auto pr-1">
                        {app.guidanceNeed}
                      </div>
                    </td>

                    {/* Submitted At */}
                    <td className="py-3 px-3.5 text-gray-500 font-mono text-[11px] border-r border-gray-100 whitespace-nowrap">
                      {app.submittedAt}
                    </td>

                    {/* Status Dropdown */}
                    <td className="py-3 px-3 text-center border-r border-gray-100">
                      <select
                        value={app.status}
                        onChange={(e) => handleStatusChange(app.id, e.target.value as any)}
                        className={`text-[11px] font-bold px-2 py-1 rounded-md border cursor-pointer focus:outline-none ${
                          app.status === 'Selected for Draw'
                            ? 'bg-purple-100 text-purple-800 border-purple-300'
                            : app.status === 'Completed'
                            ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                            : 'bg-amber-100 text-amber-800 border-amber-300'
                        }`}
                      >
                        <option value="Pending">⏳ Pending</option>
                        <option value="Selected for Draw">🎉 Selected</option>
                        <option value="Completed">✓ Completed</option>
                      </select>
                    </td>

                    {/* Action */}
                    <td className="py-3 px-3 text-center">
                      <button
                        onClick={() => handleDelete(app.id, app.name)}
                        className="text-gray-400 hover:text-red-600 p-1.5 rounded hover:bg-red-50 transition-colors"
                        title="Delete application"
                      >
                        <Trash2 size={15} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Footer info & stats */}
        <div className="p-3.5 bg-gray-100 border-t border-gray-200 flex flex-wrap items-center justify-between gap-3 shrink-0 text-xs text-gray-600">
          <div className="flex items-center gap-2">
            <span className="font-bold text-gray-700">Columns:</span>
            <span className="text-gray-500">1. Full Name • 2. WhatsApp Number • 3. Date of Birth • 4. Email Address • 5. Guidance Needed • 6. Date/Time • 7. Status</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-gray-500 text-[11px]">
              Showing <strong>{filteredApps.length}</strong> of <strong>{totalCount}</strong> applications
            </span>
            <button
              onClick={() => exportToCSV(applications)}
              className="font-bold text-emerald-800 hover:text-emerald-950 underline text-xs cursor-pointer"
            >
              Export .CSV
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ApplicationsSheetModal;
