export interface HealthItem {
  id: string;
  name: string;
  avatar: string;
  condition: string;
  category: 'physical' | 'emotional';
  status: 'Normal' | 'Under Control' | 'Stable';
  lastCheck: string;
  nextCheck: string;
  metrics: {
    bloodPressure?: string;
    bloodSugar?: string;
    heartRate?: string;
    weight?: string;
    mood?: string;
    anxiety?: string;
    sleep?: string;
    stress?: string;
  };
}

export const dummyHealthData: HealthItem[] = [
  {
    id: '1',
    name: 'Mom',
    avatar: 'M',
    condition: 'Hypertension',
    category: 'physical',
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
    category: 'physical',
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
    category: 'physical',
    status: 'Stable',
    lastCheck: '2024-03-01',
    nextCheck: '2024-05-01',
    metrics: {
      heartRate: '68 bpm',
      weight: '55 kg',
    },
  },
  {
    id: '4',
    name: 'Mom',
    avatar: 'M',
    condition: 'Anxiety',
    category: 'emotional',
    status: 'Under Control',
    lastCheck: '2024-03-18',
    nextCheck: '2024-04-18',
    metrics: {
      mood: 'Good',
      anxiety: 'Low',
      sleep: '7 hours',
    },
  },
  {
    id: '5',
    name: 'Dad',
    avatar: 'D',
    condition: 'Stress Management',
    category: 'emotional',
    status: 'Normal',
    lastCheck: '2024-03-12',
    nextCheck: '2024-04-12',
    metrics: {
      mood: 'Stable',
      stress: 'Moderate',
      sleep: '6.5 hours',
    },
  },
  {
    id: '6',
    name: 'Sister',
    avatar: 'S',
    condition: 'Depression',
    category: 'emotional',
    status: 'Stable',
    lastCheck: '2024-03-05',
    nextCheck: '2024-04-05',
    metrics: {
      mood: 'Improving',
      anxiety: 'Low',
      sleep: '8 hours',
    },
  },
]; 