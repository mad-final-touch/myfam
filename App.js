import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { View, Text, StyleSheet } from 'react-native';

import Header from './components/Header';
import ToggleButton from './components/ToggleButton';
import Menu from './components/Menu';

// Placeholder screens with dummy data
const MessageScreen = () => (
  <View style={styles.screen}>
    <Text>Messages Screen</Text>
    {/* Add dummy messages here */}
  </View>
);

const HealthScreen = () => (
  <View style={styles.screen}>
    <Text>Health Screen</Text>
    {/* Add health tracking UI here */}
  </View>
);

const FeedScreen = () => (
  <View style={styles.screen}>
    <Text>Feed Screen</Text>
    {/* Add family feed UI here */}
  </View>
);

const CallsScreen = () => (
  <View style={styles.screen}>
    <Text>Calls Screen</Text>
    {/* Add calls UI here */}
  </View>
);

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const TabNavigator = () => {
  const [isStatusActive, setIsStatusActive] = useState(false);
  const [isHealthTypeActive, setIsHealthTypeActive] = useState(false);
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [currentTab, setCurrentTab] = useState('Messages');

  const handleAddFamily = () => {
    // TODO: Implement add family navigation
    console.log('Add family pressed');
  };

  const getToggleButtonProps = () => {
    if (currentTab === 'Messages' || currentTab === 'Calls') {
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
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            switch (route.name) {
              case 'Messages':
                iconName = focused ? 'chatbubbles' : 'chatbubbles-outline';
                break;
              case 'Health':
                iconName = focused ? 'heart' : 'heart-outline';
                break;
              case 'Feed':
                iconName = focused ? 'newspaper' : 'newspaper-outline';
                break;
              case 'Calls':
                iconName = focused ? 'call' : 'call-outline';
                break;
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#128C7E',
          tabBarInactiveTintColor: 'gray',
        })}
        screenListeners={{
          state: (e) => {
            const currentRoute = e.data.state.routes[e.data.state.index];
            setCurrentTab(currentRoute.name);
          },
        }}
      >
        <Tab.Screen 
          name="Messages" 
          component={MessageScreen}
          options={{
            header: () => (
              <Header onMenuPress={() => setIsMenuVisible(true)} />
            ),
          }}
        />
        <Tab.Screen 
          name="Health" 
          component={HealthScreen}
          options={{
            header: () => (
              <Header onMenuPress={() => setIsMenuVisible(true)} />
            ),
          }}
        />
        <Tab.Screen 
          name="Feed" 
          component={FeedScreen}
          options={{
            header: () => (
              <Header onMenuPress={() => setIsMenuVisible(true)} />
            ),
          }}
        />
        <Tab.Screen 
          name="Calls" 
          component={CallsScreen}
          options={{
            header: () => (
              <Header onMenuPress={() => setIsMenuVisible(true)} />
            ),
          }}
        />
      </Tab.Navigator>
      <ToggleButton {...getToggleButtonProps()} />
      <Menu
        visible={isMenuVisible}
        onClose={() => setIsMenuVisible(false)}
        onAddFamily={handleAddFamily}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Main"
          component={TabNavigator}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
} 