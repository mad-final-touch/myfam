export interface CallItem {
  id: string;
  name: string;
  avatar: string;
  time: string;
  type: 'incoming' | 'outgoing' | 'missed';
  duration?: string;
  video: boolean;
}

export const dummyCallsData: CallItem[] = [
  {
    id: '1',
    name: 'Mom',
    avatar: 'M',
    time: '10 min ago',
    type: 'incoming',
    duration: '5:23',
    video: false,
  },
  {
    id: '2',
    name: 'Dad',
    avatar: 'D',
    time: '2 hours ago',
    type: 'outgoing',
    duration: '12:05',
    video: true,
  },
  {
    id: '3',
    name: 'Sister',
    avatar: 'S',
    time: 'Yesterday',
    type: 'missed',
    video: false,
  },
]; 