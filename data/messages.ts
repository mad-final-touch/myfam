export interface MessageItem {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread: number;
}

export const dummyMessageData: MessageItem[] = [
  {
    id: '1',
    name: 'Mom',
    avatar: 'M',
    lastMessage: 'Dinner will be ready at 7!',
    time: '5 min ago',
    unread: 2,
  },
  {
    id: '2',
    name: 'Dad',
    avatar: 'D',
    lastMessage: 'On my way home',
    time: '30 min ago',
    unread: 0,
  },
  {
    id: '3',
    name: 'Sister',
    avatar: 'S',
    lastMessage: 'Can you help me with homework?',
    time: '2 hours ago',
    unread: 1,
  },
]; 