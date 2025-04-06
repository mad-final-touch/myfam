import { FamilyMember } from './family';

export interface CallItem {
  id: string;
  memberId: string;
  time: string;
  type: 'incoming' | 'outgoing' | 'missed';
  duration: string;
  video: boolean;
}

export const dummyCallsData: CallItem[] = [
  {
    id: '1',
    memberId: '1',
    time: '2024-03-20T15:30:00Z',
    type: 'incoming',
    duration: '5:23',
    video: false
  },
  {
    id: '2',
    memberId: '2',
    time: '2024-03-20T14:15:00Z',
    type: 'outgoing',
    duration: '12:45',
    video: true
  },
  {
    id: '3',
    memberId: '3',
    time: '2024-03-19T10:00:00Z',
    type: 'missed',
    duration: '0:00',
    video: false
  },
  {
    id: '4',
    memberId: '4',
    time: '2024-03-19T09:30:00Z',
    type: 'incoming',
    duration: '8:15',
    video: true
  },
  {
    id: '5',
    memberId: '1',
    time: '2024-03-18T16:45:00Z',
    type: 'outgoing',
    duration: '3:20',
    video: false
  }
]; 