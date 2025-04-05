import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type HealthStatus = 'Normal' | 'Under Control' | 'Stable';

interface HealthCardProps {
  name: string;
  status: HealthStatus;
  condition: string;
  lastCheck: string;
  nextCheck: string;
  initial: string;
}

const getRelativeTime = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) {
    const weeks = Math.floor(diffDays / 7);
    return `${weeks} ${weeks === 1 ? 'week' : 'weeks'} ago`;
  }
  const months = Math.floor(diffDays / 30);
  return `${months} ${months === 1 ? 'month' : 'months'} ago`;
};

const getNextCheckText = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(date.getTime() - now.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays < 7) return 'Next week';
  if (diffDays < 30) {
    const weeks = Math.floor(diffDays / 7);
    return `In ${weeks} ${weeks === 1 ? 'week' : 'weeks'}`;
  }
  const months = Math.floor(diffDays / 30);
  return `In ${months} ${months === 1 ? 'month' : 'months'}`;
};

const HealthCard: React.FC<HealthCardProps> = ({
  name,
  status,
  condition,
  lastCheck,
  nextCheck,
  initial,
}) => {
  const getStatusColor = (status: HealthStatus) => {
    switch (status) {
      case 'Normal':
        return '#4CAF50';
      case 'Under Control':
        return '#FFC107';
      case 'Stable':
        return '#2196F3';
      default:
        return '#757575';
    }
  };

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={[styles.avatar, { backgroundColor: '#128C7E' }]}>
          <Text style={styles.initial}>{initial}</Text>
        </View>
        <View style={styles.headerContent}>
          <View style={styles.nameRow}>
            <Text style={styles.name}>{name}</Text>
            <Text style={[styles.status, { color: getStatusColor(status) }]}>{status}</Text>
          </View>
          <View style={styles.conditionRow}>
            <Text style={styles.condition}>{condition}</Text>
          </View>
        </View>
      </View>
      
      <View style={styles.divider} />
      
      <View style={styles.footer}>
        <View style={styles.checkItem}>
          <Ionicons name="time-outline" size={16} color="#666" style={styles.icon} />
          <Text style={styles.checkText}>Last: {getRelativeTime(lastCheck)}</Text>
        </View>
        <View style={styles.checkItem}>
          <Ionicons name="calendar-outline" size={16} color="#666" style={styles.icon} />
          <Text style={styles.checkText}>Next: {getNextCheckText(nextCheck)}</Text>
        </View>
      </View>
    </View>
  );
};

const dummyHealthData: HealthCardProps[] = [
  {
    name: 'Mom',
    status: 'Normal',
    condition: 'Hypertension',
    lastCheck: '2024-03-15',
    nextCheck: '2024-06-15',
    initial: 'M',
  },
  {
    name: 'Dad',
    status: 'Under Control',
    condition: 'Type 2 Diabetes',
    lastCheck: '2024-03-10',
    nextCheck: '2024-04-10',
    initial: 'D',
  },
  {
    name: 'Sister',
    status: 'Stable',
    condition: 'Asthma',
    lastCheck: '2024-03-01',
    nextCheck: '2024-05-01',
    initial: 'S',
  },
];

export default function HealthScreen() {
  return (
    <ScrollView style={styles.container}>
      {dummyHealthData.map((data, index) => (
        <HealthCard key={index} {...data} />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  initial: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  headerContent: {
    flex: 1,
  },
  nameRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  status: {
    fontSize: 14,
    fontWeight: '600',
  },
  conditionRow: {
    marginBottom: 12,
  },
  condition: {
    fontSize: 15,
    color: '#666',
  },
  divider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginVertical: 12,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  checkItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 4,
  },
  checkText: {
    fontSize: 14,
    color: '#666',
  },
}); 