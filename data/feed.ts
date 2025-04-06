export interface FeedItem {
  id: string;
  author: string;
  avatar: string;
  content: string;
  type: 'physical' | 'emotional';
  likes: number;
  comments: number;
  time: string;
  image?: string;
}

export const dummyFeedData: FeedItem[] = [
  {
    id: '1',
    author: 'Mom',
    avatar: 'M',
    content: 'Just finished my daily walk. Feeling energized!',
    type: 'physical',
    likes: 5,
    comments: 2,
    time: '2 hours ago',
  },
  {
    id: '2',
    author: 'Dad',
    avatar: 'D',
    content: 'Had a great therapy session today. Learning to manage stress better.',
    type: 'emotional',
    likes: 8,
    comments: 3,
    time: '5 hours ago',
  },
  {
    id: '3',
    author: 'Sister',
    avatar: 'S',
    content: 'Completed my meditation session. Feeling calm and centered.',
    type: 'emotional',
    likes: 4,
    comments: 1,
    time: 'Yesterday',
  },
]; 