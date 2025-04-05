import { StyleSheet, View, Text, FlatList, Image } from 'react-native';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';

// Dummy feed data
const dummyFeedData = [
  {
    id: '1',
    author: 'Mom',
    avatar: 'M',
    content: 'Just finished my daily walk. Feeling energized!',
    type: 'physical',
    likes: 5,
    comments: 2,
    time: '2 hours ago',
    image: null,
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
    image: null,
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
    image: null,
  },
  {
    id: '4',
    author: 'Brother',
    avatar: 'B',
    content: 'Just got my blood test results. Everything looks good!',
    type: 'physical',
    likes: 7,
    comments: 4,
    time: '2 days ago',
    image: null,
  },
  {
    id: '5',
    author: 'Grandma',
    avatar: 'G',
    content: 'Family dinner was wonderful. Good food and good company!',
    type: 'emotional',
    likes: 10,
    comments: 5,
    time: '3 days ago',
    image: null,
  },
];

export default function FeedScreen() {
  const [feedData] = useState(dummyFeedData);

  const renderFeedItem = ({ item }) => (
    <View style={styles.feedItem}>
      <View style={styles.feedHeader}>
        <View style={styles.avatarContainer}>
          <Text style={styles.avatarText}>{item.avatar}</Text>
        </View>
        <View style={styles.authorInfo}>
          <Text style={styles.authorName}>{item.author}</Text>
          <Text style={styles.postTime}>{item.time}</Text>
        </View>
        <View style={styles.typeIndicator}>
          <Ionicons
            name={item.type === 'physical' ? 'fitness' : 'heart'}
            size={16}
            color={item.type === 'physical' ? '#2196F3' : '#E91E63'}
          />
        </View>
      </View>
      <Text style={styles.content}>{item.content}</Text>
      {item.image && (
        <Image source={{ uri: item.image }} style={styles.postImage} />
      )}
      <View style={styles.feedFooter}>
        <View style={styles.actionButton}>
          <Ionicons name="heart-outline" size={20} color="#666" />
          <Text style={styles.actionText}>{item.likes}</Text>
        </View>
        <View style={styles.actionButton}>
          <Ionicons name="chatbubble-outline" size={20} color="#666" />
          <Text style={styles.actionText}>{item.comments}</Text>
        </View>
        <View style={styles.actionButton}>
          <Ionicons name="share-social-outline" size={20} color="#666" />
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={feedData}
        renderItem={renderFeedItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  listContainer: {
    paddingVertical: 8,
  },
  feedItem: {
    backgroundColor: '#fff',
    marginBottom: 12,
    padding: 16,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  feedHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatarContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#128C7E',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  authorInfo: {
    flex: 1,
  },
  authorName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  postTime: {
    fontSize: 12,
    color: '#888',
  },
  typeIndicator: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    fontSize: 16,
    color: '#333',
    marginBottom: 12,
    lineHeight: 22,
  },
  postImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 12,
  },
  feedFooter: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingTop: 12,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 24,
  },
  actionText: {
    marginLeft: 4,
    fontSize: 14,
    color: '#666',
  },
}); 