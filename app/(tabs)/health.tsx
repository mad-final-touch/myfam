import React, { useState, useMemo } from 'react';
import { StyleSheet, View, Text, FlatList, SectionList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import SearchBar from '../../components/SearchBar';
import { HealthItem as HealthItemType, dummyHealthData } from '../../data/health';
import { FamilyMember, getFamilyMemberById } from '../../data/family';

// Helper function to format date as relative time
const getRelativeTime = (dateString: string, isNextCheck: boolean = false) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (isNextCheck) {
    if (diffDays < 7) return `in ${diffDays} days`;
    if (diffDays < 30) {
      const weeks = Math.floor(diffDays / 7);
      return `in ${weeks} ${weeks === 1 ? 'week' : 'weeks'}`;
    }
    const months = Math.floor(diffDays / 30);
    return `in ${months} ${months === 1 ? 'month' : 'months'}`;
  } else {
    if (diffDays === 0) return 'today';
    if (diffDays === 1) return 'yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) {
      const weeks = Math.floor(diffDays / 7);
      return `${weeks} ${weeks === 1 ? 'week' : 'weeks'} ago`;
    }
    const months = Math.floor(diffDays / 30);
    return `${months} ${months === 1 ? 'month' : 'months'} ago`;
  }
};

const HealthItem: React.FC<{ item: HealthItemType }> = ({ item }) => {
  const familyMember = getFamilyMemberById(item.memberId);
  
  if (!familyMember) return null;
  
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
      <View style={[styles.avatarContainer, { backgroundColor: familyMember.color }]}>
        <Text style={styles.avatarText}>{familyMember.avatar}</Text>
      </View>
      <View style={styles.healthContent}>
        <View style={styles.healthHeader}>
          <Text style={styles.name}>{familyMember.name}</Text>
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
        {(item.lastCheck || item.nextCheck) && (
          <View style={styles.checkInfo}>
            {item.lastCheck && (
              <View style={styles.checkItem}>
                <Ionicons name="time-outline" size={16} color="#666" style={styles.checkIcon} />
                <Text style={styles.checkText} numberOfLines={1}>
                  {getRelativeTime(item.lastCheck)}
                </Text>
              </View>
            )}
            {item.nextCheck && (
              <View style={styles.checkItem}>
                <Ionicons name="calendar-outline" size={16} color="#666" style={styles.checkIcon} />
                <Text style={styles.checkText} numberOfLines={1}>
                  {getRelativeTime(item.nextCheck, true)}
                </Text>
              </View>
            )}
          </View>
        )}
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
      item => {
        const familyMember = getFamilyMemberById(item.memberId);
        return familyMember && (
          familyMember.name.toLowerCase().includes(query) ||
          item.condition.toLowerCase().includes(query) ||
          item.status.toLowerCase().includes(query)
        );
      }
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
  checkItem: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  checkIcon: {
    marginRight: 4,
  },
  checkText: {
    fontSize: 12,
    color: '#666',
    flex: 1,
  },
}); 