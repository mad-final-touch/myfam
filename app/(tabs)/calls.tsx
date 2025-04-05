import { StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';

// Dummy calls data
const dummyCallsData = [
  {
    id: '1',
    name: 'Mom',
    avatar: 'M',
    time: 'Today, 10:30 AM',
    type: 'incoming',
    duration: '5:23',
    video: false,
  },
  {
    id: '2',
    name: 'Dad',
    avatar: 'D',
    time: 'Today, 9:15 AM',
    type: 'outgoing',
    duration: '2:45',
    video: true,
  },
  {
    id: '3',
    name: 'Sister',
    avatar: 'S',
    time: 'Yesterday, 3:20 PM',
    type: 'missed',
    duration: null,
    video: false,
  },
  {
    id: '4',
    name: 'Brother',
    avatar: 'B',
    time: 'Yesterday, 11:05 AM',
    type: 'incoming',
    duration: '8:12',
    video: true,
  },
  {
    id: '5',
    name: 'Grandma',
    avatar: 'G',
    time: '2 days ago, 4:30 PM',
    type: 'outgoing',
    duration: '3:45',
    video: false,
  },
];

export default function CallsScreen() {
  const [callsData] = useState(dummyCallsData);

  const getCallIcon = (type, video) => {
    if (type === 'missed') {
      return <Ionicons name="call" size={24} color="#F44336" />;
    } else if (type === 'incoming') {
      return <Ionicons name="call-received" size={24} color="#4CAF50" />;
    } else if (type === 'outgoing') {
      return <Ionicons name="call-made" size={24} color="#4CAF50" />;
    }
  };

  const renderCallItem = ({ item }) => (
    <TouchableOpacity style={styles.callItem}>
      <View style={styles.avatarContainer}>
        <Text style={styles.avatarText}>{item.avatar}</Text>
      </View>
      <View style={styles.callInfo}>
        <Text style={styles.name}>{item.name}</Text>
        <View style={styles.callDetails}>
          {getCallIcon(item.type, item.video)}
          <Text style={styles.time}>{item.time}</Text>
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

  return (
    <View style={styles.container}>
      <FlatList
        data={callsData}
        renderItem={renderCallItem}
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
  callItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  avatarContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#128C7E',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  avatarText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  callInfo: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  callDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  time: {
    fontSize: 14,
    color: '#888',
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