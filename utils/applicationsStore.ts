import { FreeReadingApplication } from '../types';

const STORAGE_KEY = 'nandinii_free_reading_applications';

const INITIAL_APPLICATIONS: FreeReadingApplication[] = [
  {
    id: 'app-1',
    name: 'Aarti Sharma',
    phone: '9823011245',
    dob: '14/08/1994',
    email: 'aarti.sharma@example.com',
    guidanceNeed: 'Seeking clarity on career transition from corporate to starting my own venture.',
    submittedAt: '2026-09-18 10:30 AM',
    status: 'Selected for Draw'
  },
  {
    id: 'app-2',
    name: 'Vikram Joshi',
    phone: '9845012398',
    dob: '22/11/1989',
    email: 'vikram.j@example.com',
    guidanceNeed: 'Understanding relationship timing and recurring communication delays.',
    submittedAt: '2026-09-19 04:15 PM',
    status: 'Pending'
  },
  {
    id: 'app-3',
    name: 'Pooja Iyer',
    phone: '9769034821',
    dob: '05/03/1998',
    email: 'pooja.iyer@example.com',
    guidanceNeed: 'Life path number guidance for relocation and higher studies decision.',
    submittedAt: '2026-09-20 11:20 AM',
    status: 'Pending'
  },
  {
    id: 'app-4',
    name: 'Rohan Mehta',
    phone: '9920194820',
    dob: '30/06/1992',
    email: 'rohan.mehta@example.com',
    guidanceNeed: 'Clarity on financial blockages and identifying favorable months.',
    submittedAt: '2026-09-21 09:10 AM',
    status: 'Pending'
  }
];

export const getApplications = (): FreeReadingApplication[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_APPLICATIONS));
      return INITIAL_APPLICATIONS;
    }
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading applications:', error);
    return INITIAL_APPLICATIONS;
  }
};

export const saveApplications = (apps: FreeReadingApplication[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(apps));
    window.dispatchEvent(new Event('applications_updated'));
  } catch (error) {
    console.error('Error saving applications:', error);
  }
};

export const addApplication = (
  appData: Omit<FreeReadingApplication, 'id' | 'submittedAt' | 'status'>
): FreeReadingApplication => {
  const current = getApplications();
  const now = new Date();
  const formattedDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;

  const newApp: FreeReadingApplication = {
    id: 'app-' + Date.now(),
    name: appData.name.trim(),
    phone: appData.phone.trim(),
    dob: appData.dob.trim() || '—',
    email: appData.email.trim() || '—',
    guidanceNeed: appData.guidanceNeed.trim() || 'General guidance on life path and timing',
    submittedAt: formattedDate,
    status: 'Pending'
  };

  const updated = [newApp, ...current];
  saveApplications(updated);
  return newApp;
};

export const updateApplicationStatus = (
  id: string,
  status: 'Pending' | 'Selected for Draw' | 'Completed'
): void => {
  const current = getApplications();
  const updated = current.map(app => (app.id === id ? { ...app, status } : app));
  saveApplications(updated);
};

export const deleteApplication = (id: string): void => {
  const current = getApplications();
  const updated = current.filter(app => app.id !== id);
  saveApplications(updated);
};

export const exportToCSV = (apps: FreeReadingApplication[]): void => {
  const headers = [
    'ID',
    'Your Full Name',
    'WhatsApp Number',
    'Date of Birth',
    'Email Address',
    'The Guidance They Need',
    'Submitted Date & Time',
    'Status'
  ];

  const rows = apps.map(app => [
    app.id,
    `"${app.name.replace(/"/g, '""')}"`,
    `"${app.phone}"`,
    `"${app.dob}"`,
    `"${app.email}"`,
    `"${app.guidanceNeed.replace(/"/g, '""')}"`,
    `"${app.submittedAt}"`,
    `"${app.status}"`
  ]);

  const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', `Nandinii_Free_Reading_Applications_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
