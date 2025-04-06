import React, { useState, useMemo } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import SearchBar from '../../components/SearchBar';
import { CallItem as CallItemType, dummyCallsData } from '../../data/calls';
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

const CallItem: React.FC<{ item: CallItemType }> = ({ item }) => {
  const familyMember = getFamilyMemberById(item.memberId);
  
  if (!familyMember) return null;

  const getCallIcon = (type: CallItemType['type']) => {
    switch (type) {
      case 'incoming':
        return 'arrow-down-circle';
      case 'outgoing':
        return 'arrow-up-circle';
      case 'missed':
        return 'close-circle';
      default:
        return 'call';
    }
  };

  return (
    <View style={styles.callItem}>
      <View style={[styles.avatarContainer, { backgroundColor: familyMember.color }]}>
        <Text style={styles.avatarText}>{familyMember.avatar}</Text>
      </View>
      <View style={styles.callInfo}>
        <Text style={styles.name}>{familyMember.name}</Text>
        <View style={styles.callDetails}>
          <Ionicons
            name={getCallIcon(item.type)}
            size={16}
            color={item.type === 'missed' ? '#FF3B30' : '#666'}
          />
          <Text style={styles.time}>{getRelativeTime(item.time)}</Text>
          {item.duration !== '0:00' && (
            <Text style={styles.duration}> • {item.duration}</Text>
          )}
        </View>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="call" size={24} color="#128C7E" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="videocam" size={24} color="#128C7E" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default function CallsScreen() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredData = useMemo(() => {
    const query = searchQuery.toLowerCase();
    return dummyCallsData.filter(item => {
      const familyMember = getFamilyMemberById(item.memberId);
      return familyMember && (
        familyMember.name.toLowerCase().includes(query) ||
        item.type.toLowerCase().includes(query)
      );
    });
  }, [searchQuery]);

  return (
    <View style={styles.container}>
      <SearchBar
        placeholder="Search calls..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <FlatList
        data={filteredData}
        renderItem={({ item }) => <CallItem item={item} />}
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
  callItem: {
    flexDirection: 'row',
    alignItems: 'center',
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
  callInfo: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  callDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  time: {
    fontSize: 14,
    color: '#666',
    marginLeft: 4,
  },
  duration: {
    fontSize: 14,
    color: '#666',
  },
  actions: {
    flexDirection: 'row',
  },
  actionButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
}); 