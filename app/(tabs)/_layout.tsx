import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { View } from 'react-native';

import Header from '../../components/Header';
import ToggleButton from '../../components/ToggleButton';
import Menu from '../../components/Menu';

export default function TabLayout() {
  const [isStatusActive, setIsStatusActive] = useState(false);
  const [isHealthTypeActive, setIsHealthTypeActive] = useState(false);
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [currentTab, setCurrentTab] = useState('index');

  const handleAddFamily = () => {
    // TODO: Implement add family navigation
    console.log('Add family pressed');
  };

  const getToggleButtonProps = () => {
    if (currentTab === 'index' || currentTab === 'calls') {
      return {
        isActive: isStatusActive,
        onToggle: () => setIsStatusActive(!isStatusActive),
        type: 'status',
      };
    } else {
      return {
        isActive: isHealthTypeActive,
        onToggle: () => setIsHealthTypeActive(!isHealthTypeActive),
        type: 'health',
      };
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Tabs
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            switch (route.name) {
              case 'index':
                iconName = focused ? 'chatbubbles' : 'chatbubbles-outline';
                break;
              case 'health':
                iconName = focused ? 'heart' : 'heart-outline';
                break;
              case 'feed':
                iconName = focused ? 'newspaper' : 'newspaper-outline';
                break;
              case 'calls':
                iconName = focused ? 'call' : 'call-outline';
                break;
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#128C7E',
          tabBarInactiveTintColor: 'gray',
          header: () => <Header onMenuPress={() => setIsMenuVisible(true)} />,
        })}
        screenListeners={{
          state: (e) => {
            const currentRoute = e.data.state.routes[e.data.state.index];
            setCurrentTab(currentRoute.name);
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Messages',
          }}
        />
        <Tabs.Screen
          name="health"
          options={{
            title: 'Health',
          }}
        />
        <Tabs.Screen
          name="feed"
          options={{
            title: 'Feed',
          }}
        />
        <Tabs.Screen
          name="calls"
          options={{
            title: 'Calls',
          }}
        />
      </Tabs>
      <ToggleButton {...getToggleButtonProps()} />
      <Menu
        visible={isMenuVisible}
        onClose={() => setIsMenuVisible(false)}
        onAddFamily={handleAddFamily}
      />
    </View>
  );
}
