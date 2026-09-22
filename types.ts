export interface FreeReadingApplication {
  id: string;
  name: string;
  phone: string;
  dob: string;
  email: string;
  guidanceNeed: string;
  submittedAt: string;
  status: 'Pending' | 'Selected for Draw' | 'Completed';
}
