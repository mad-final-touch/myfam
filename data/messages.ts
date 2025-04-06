import { FamilyMember } from './family';

export interface MessageItem {
  id: string;
  memberId: string;
  lastMessage: string;
  time: string;
  unread: number;
}

export const dummyMessageData: MessageItem[] = [
  {
    id: '1',
    memberId: '1',
    lastMessage: 'How are you feeling today?',
    time: '2024-03-20T15:30:00Z',
    unread: 2
  },
  {
    id: '2',
    memberId: '2',
    lastMessage: 'Don\'t forget to take your medicine!',
    time: '2024-03-20T14:15:00Z',
    unread: 0
  },
  {
    id: '3',
    memberId: '3',
    lastMessage: 'I\'ve completed my daily exercise routine 💪',
    time: '2024-03-19T10:00:00Z',
    unread: 1
  },
  {
    id: '4',
    memberId: '4',
    lastMessage: 'Let\'s schedule a family video call this weekend',
    time: '2024-03-19T09:30:00Z',
    unread: 0
  },
  {
    id: '5',
    memberId: '1',
    lastMessage: 'Remember to drink plenty of water today!',
    time: '2024-03-18T16:45:00Z',
    unread: 0
  }
]; 