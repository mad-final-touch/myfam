import React, { useState, useMemo } from 'react';
import { StyleSheet, View, Text, FlatList, SectionList } from 'react-native';
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

const renderSectionHeader = ({ section: { title } }: { section: { title: string } }) => (
  <View style={styles.sectionHeader}>
    <Text style={styles.sectionTitle}>{title}</Text>
  </View>
);

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

  const sections = useMemo(() => {
    const physicalHealth = filteredData.filter(item => item.category === 'physical');
    const emotionalHealth = filteredData.filter(item => item.category === 'emotional');

    return [
      { title: 'Physical Health', data: physicalHealth },
      { title: 'Emotional Health', data: emotionalHealth },
    ];
  }, [filteredData]);

  return (
    <View style={styles.container}>
      <SearchBar
        placeholder="Search health records..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <SectionList
        sections={sections}
        renderItem={({ item }) => <HealthItem item={item} />}
        renderSectionHeader={renderSectionHeader}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        stickySectionHeadersEnabled={true}
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
  sectionHeader: {
    backgroundColor: '#f5f5f5',
    paddingVertical: 8,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  healthItem: {
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
  healthContent: {
    flex: 1,
  },
  healthHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  status: {
    fontSize: 14,
    fontWeight: '600',
  },
  condition: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  metricsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 8,
  },
  metricItem: {
    flexDirection: 'row',
    marginRight: 8,
    marginBottom: 4,
  },
  metricLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginRight: 4,
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
  checkText: {
    fontSize: 12,
    color: '#666',
  },
}); 