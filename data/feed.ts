import { FamilyMember } from './family';

export interface FeedItem {
  id: string;
  memberId: string;
  content: string;
  type: 'health' | 'activity' | 'milestone';
  likes: number;
  comments: number;
  time: string;
}

export const dummyFeedData: FeedItem[] = [
  {
    id: '1',
    memberId: '1',
    content: 'Completed 10,000 steps today! 🚶‍♀️',
    type: 'activity',
    likes: 12,
    comments: 3,
    time: '2024-03-20T10:30:00Z'
  },
  {
    id: '2',
    memberId: '2',
    content: 'Blood pressure reading: 120/80 - All good! 💪',
    type: 'health',
    likes: 8,
    comments: 2,
    time: '2024-03-20T09:15:00Z'
  },
  {
    id: '3',
    memberId: '3',
    content: 'Started new meditation routine - feeling more focused! 🧘‍♂️',
    type: 'health',
    likes: 15,
    comments: 5,
    time: '2024-03-19T18:45:00Z'
  },
  {
    id: '4',
    memberId: '4',
    content: 'Achieved personal best in morning walk! 🌅',
    type: 'milestone',
    likes: 20,
    comments: 7,
    time: '2024-03-19T07:30:00Z'
  },
  {
    id: '5',
    memberId: '1',
    content: 'Monthly health checkup completed - all parameters normal! 🏥',
    type: 'health',
    likes: 25,
    comments: 10,
    time: '2024-03-18T14:20:00Z'
  }
]; 