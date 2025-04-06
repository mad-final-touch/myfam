export interface HealthItem {
  id: string;
  name: string;
  avatar: string;
  condition: string;
  status: 'Normal' | 'Under Control' | 'Stable';
  lastCheck: string;
  nextCheck: string;
  metrics: {
    bloodPressure?: string;
    bloodSugar?: string;
    heartRate?: string;
    weight?: string;
  };
}

export const dummyHealthData: HealthItem[] = [
  {
    id: '1',
    name: 'Mom',
    avatar: 'M',
    condition: 'Hypertension',
    status: 'Normal',
    lastCheck: '2024-03-15',
    nextCheck: '2024-06-15',
    metrics: {
      bloodPressure: '120/80',
      heartRate: '72 bpm',
    },
  },
  {
    id: '2',
    name: 'Dad',
    avatar: 'D',
    condition: 'Type 2 Diabetes',
    status: 'Under Control',
    lastCheck: '2024-03-10',
    nextCheck: '2024-04-10',
    metrics: {
      bloodSugar: '95 mg/dL',
      weight: '75 kg',
    },
  },
  {
    id: '3',
    name: 'Sister',
    avatar: 'S',
    condition: 'Asthma',
    status: 'Stable',
    lastCheck: '2024-03-01',
    nextCheck: '2024-05-01',
    metrics: {
      heartRate: '68 bpm',
      weight: '55 kg',
    },
  },
]; 