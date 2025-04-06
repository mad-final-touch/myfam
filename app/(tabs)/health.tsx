import React, { useState, useMemo } from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import SearchBar from '../../components/SearchBar';
import { HealthItem as HealthItemType, dummyHealthData } from '../../data/health';

const HealthItem: React.FC<{ item: HealthItemType }> = ({ item }) => {
  const getStatusColor = (status: HealthItemType['status']) => {
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
    <View style={styles.healthItem}>
      <View style={styles.avatarContainer}>
        <Text style={styles.avatarText}>{item.avatar}</Text>
      </View>
      <View style={styles.healthContent}>
        <View style={styles.healthHeader}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={[styles.status, { color: getStatusColor(item.status) }]}>
            {item.status}
          </Text>
        </View>
        <Text style={styles.condition}>{item.condition}</Text>
        <View style={styles.metricsContainer}>
          {Object.entries(item.metrics).map(([key, value]) => (
            <View key={key} style={styles.metricItem}>
              <Text style={styles.metricLabel}>
                {key.replace(/([A-Z])/g, ' $1').trim()}:
              </Text>
              <Text style={styles.metricValue}>{value}</Text>
            </View>
          ))}
        </View>
        <View style={styles.checkInfo}>
          <Text style={styles.checkText}>Last check: {item.lastCheck}</Text>
          <Text style={styles.checkText}>Next check: {item.nextCheck}</Text>
        </View>
      </View>
    </View>
  );
};

export default function HealthScreen() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredData = useMemo(() => {
    const query = searchQuery.toLowerCase();
    return dummyHealthData.filter(
      item =>
        item.name.toLowerCase().includes(query) ||
        item.condition.toLowerCase().includes(query) ||
        item.status.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  return (
    <View style={styles.container}>
      <SearchBar
        placeholder="Search health records..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <FlatList
        data={filteredData}
        renderItem={({ item }) => <HealthItem item={item} />}
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
  scrollView: {
    flex: 1,
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
  healthItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  avatarContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  healthContent: {
    flex: 1,
  },
  healthHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  metricsContainer: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  metricItem: {
    marginRight: 8,
  },
  metricLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  metricValue: {
    fontSize: 14,
    color: '#666',
  },
  checkInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  listContent: {
    padding: 16,
  },
}); 