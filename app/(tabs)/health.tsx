import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { useState } from 'react';

// Dummy health data
const dummyHealthData = {
  physical: [
    { id: '1', title: 'Blood Pressure', value: '120/80', status: 'normal', date: 'Today' },
    { id: '2', title: 'Heart Rate', value: '72 bpm', status: 'normal', date: 'Today' },
    { id: '3', title: 'Steps', value: '8,547', status: 'good', date: 'Today' },
    { id: '4', title: 'Sleep', value: '7h 30m', status: 'good', date: 'Yesterday' },
    { id: '5', title: 'Weight', value: '70 kg', status: 'normal', date: '3 days ago' },
  ],
  emotional: [
    { id: '1', title: 'Mood', value: 'Happy', status: 'good', date: 'Today' },
    { id: '2', title: 'Stress Level', value: 'Low', status: 'good', date: 'Today' },
    { id: '3', title: 'Anxiety', value: 'Mild', status: 'normal', date: 'Yesterday' },
    { id: '4', title: 'Energy Level', value: 'High', status: 'good', date: 'Today' },
    { id: '5', title: 'Social Interaction', value: 'Good', status: 'good', date: 'Today' },
  ],
};

export default function HealthScreen() {
  const [healthData] = useState(dummyHealthData);

  const getStatusColor = (status) => {
    switch (status) {
      case 'good':
        return '#4CAF50';
      case 'normal':
        return '#2196F3';
      case 'warning':
        return '#FFC107';
      case 'danger':
        return '#F44336';
      default:
        return '#757575';
    }
  };

  const renderHealthItem = (item) => (
    <View key={item.id} style={styles.healthItem}>
      <View style={styles.healthItemHeader}>
        <Text style={styles.healthItemTitle}>{item.title}</Text>
        <View style={[styles.statusIndicator, { backgroundColor: getStatusColor(item.status) }]} />
      </View>
      <View style={styles.healthItemContent}>
        <Text style={styles.healthItemValue}>{item.value}</Text>
        <Text style={styles.healthItemDate}>{item.date}</Text>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Physical Health</Text>
        {healthData.physical.map(renderHealthItem)}
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Emotional Health</Text>
        {healthData.emotional.map(renderHealthItem)}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  section: {
    marginVertical: 12,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
  },
  healthItem: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  healthItemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  healthItemTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  statusIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  healthItemContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  healthItemValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#128C7E',
  },
  healthItemDate: {
    fontSize: 14,
    color: '#888',
  },
}); 