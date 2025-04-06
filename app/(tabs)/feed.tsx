import React, { useState, useMemo } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import SearchBar from '../../components/SearchBar';
import { FeedItem as FeedItemType, dummyFeedData } from '../../data/feed';
import { FamilyMember, getFamilyMemberById } from '../../data/family';

// Helper function to format date as relative time
const getRelativeTime = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffMinutes = Math.floor(diffTime / (1000 * 60));
  const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffMinutes < 60) {
    return `${diffMinutes} ${diffMinutes === 1 ? 'minute' : 'minutes'} ago`;
  } else if (diffHours < 24) {
    return `${diffHours} ${diffHours === 1 ? 'hour' : 'hours'} ago`;
  } else {
    return `${diffDays} ${diffDays === 1 ? 'day' : 'days'} ago`;
  }
};

const FeedItem: React.FC<{ item: FeedItemType }> = ({ item }) => {
  const familyMember = getFamilyMemberById(item.memberId);
  
  if (!familyMember) return null;

  const getTypeIcon = (type: FeedItemType['type']) => {
    switch (type) {
      case 'health':
        return 'fitness';
      case 'activity':
        return 'walk';
      case 'milestone':
        return 'trophy';
      default:
        return 'information-circle';
    }
  };

  return (
    <View style={styles.feedItem}>
      <View style={[styles.avatarContainer, { backgroundColor: familyMember.color }]}>
        <Text style={styles.avatarText}>{familyMember.avatar}</Text>
      </View>
      <View style={styles.feedContent}>
        <View style={styles.feedHeader}>
          <Text style={styles.name}>{familyMember.name}</Text>
          <View style={styles.typeContainer}>
            <Ionicons name={getTypeIcon(item.type)} size={16} color="#666" />
            <Text style={styles.typeText}>{item.type}</Text>
          </View>
        </View>
        <Text style={styles.content}>{item.content}</Text>
        <Text style={styles.time}>{getRelativeTime(item.time)}</Text>
        <View style={styles.actions}>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="heart-outline" size={20} color="#666" />
            <Text style={styles.actionText}>{item.likes}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="chatbubble-outline" size={20} color="#666" />
            <Text style={styles.actionText}>{item.comments}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default function FeedScreen() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredData = useMemo(() => {
    const query = searchQuery.toLowerCase();
    return dummyFeedData.filter(item => {
      const familyMember = getFamilyMemberById(item.memberId);
      return familyMember && (
        familyMember.name.toLowerCase().includes(query) ||
        item.content.toLowerCase().includes(query) ||
        item.type.toLowerCase().includes(query)
      );
    });
  }, [searchQuery]);

  return (
    <View style={styles.container}>
      <SearchBar
        placeholder="Search feed..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <FlatList
        data={filteredData}
        renderItem={({ item }) => <FeedItem item={item} />}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  listContent: {
    padding: 16,
  },
  feedItem: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  avatarContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  feedContent: {
    flex: 1,
  },
  feedHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  typeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  typeText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
    textTransform: 'capitalize',
  },
  content: {
    fontSize: 14,
    color: '#333',
    marginBottom: 8,
    lineHeight: 20,
  },
  time: {
    fontSize: 12,
    color: '#666',
    marginBottom: 8,
  },
  actions: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingTop: 8,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  actionText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 4,
  },
}); 