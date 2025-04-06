import React, { useState, useMemo } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import SearchBar from '../../components/SearchBar';
import { CallItem as CallItemType, dummyCallsData } from '../../data/calls';

const CallItem: React.FC<{ item: CallItemType }> = ({ item }) => {
  const getCallIcon = () => {
    const iconProps = {
      size: 16,
      style: styles.callTypeIcon,
    };

    switch (item.type) {
      case 'incoming':
        return <Ionicons name="arrow-down-circle" color="#4CAF50" {...iconProps} />;
      case 'outgoing':
        return <Ionicons name="arrow-up-circle" color="#2196F3" {...iconProps} />;
      case 'missed':
        return <Ionicons name="close-circle" color="#F44336" {...iconProps} />;
    }
  };

  return (
    <TouchableOpacity style={styles.callItem}>
      <View style={styles.avatarContainer}>
        <Text style={styles.avatarText}>{item.avatar}</Text>
      </View>
      <View style={styles.callContent}>
        <View style={styles.callHeader}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.time}>{item.time}</Text>
        </View>
        <View style={styles.callDetails}>
          {getCallIcon()}
          <Text style={[
            styles.callInfo,
            item.type === 'missed' && styles.missedCall
          ]}>
            {item.type === 'missed' ? 'Missed Call' : item.duration}
          </Text>
          {item.video && (
            <Ionicons name="videocam" size={16} color="#666" style={styles.videoIcon} />
          )}
        </View>
      </View>
      <View style={styles.callActions}>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="call" size={24} color="#128C7E" />
        </TouchableOpacity>
        {item.video && (
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="videocam" size={24} color="#128C7E" />
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default function CallsScreen() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredData = useMemo(() => {
    const query = searchQuery.toLowerCase();
    return dummyCallsData.filter(
      item =>
        item.name.toLowerCase().includes(query) ||
        item.type.toLowerCase().includes(query)
    );
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
    backgroundColor: '#f5f5f5',
  },
  listContent: {
    padding: 16,
  },
  callItem: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  avatarContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#128C7E',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  callContent: {
    flex: 1,
  },
  callHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  time: {
    fontSize: 14,
    color: '#666',
  },
  callDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  callTypeIcon: {
    marginRight: 6,
  },
  callInfo: {
    fontSize: 14,
    color: '#666',
  },
  missedCall: {
    color: '#F44336',
  },
  videoIcon: {
    marginLeft: 8,
  },
  callActions: {
    flexDirection: 'row',
  },
  actionButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
}); 