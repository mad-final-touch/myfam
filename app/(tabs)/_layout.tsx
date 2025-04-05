import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { View, StatusBar, Platform } from 'react-native';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { ParamListBase, RouteProp } from '@react-navigation/native';
import type { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';

import Header from '../../components/Header.js';
import ToggleButton from '../../components/ToggleButton';
import Menu from '../../components/Menu.js';

type TabParamList = {
  index: undefined;
  health: undefined;
  feed: undefined;
  calls: undefined;
};

const TAB_NAMES = ['index', 'health', 'feed', 'calls'] as const;
type TabName = typeof TAB_NAMES[number];

type TabScreenProps = BottomTabScreenProps<TabParamList>;

export default function TabLayout() {
  const [isIncognitoMode, setIsIncognitoMode] = useState(false);
  const [isStatusActive, setIsStatusActive] = useState(false);
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [currentTab, setCurrentTab] = useState<TabName>('index');

  const shouldShowIncognitoToggle = currentTab === 'health' || currentTab === 'feed';
  const shouldShowStatusToggle = currentTab === 'index' || currentTab === 'calls';

  const handleAddFamily = () => {
    // TODO: Implement add family navigation
    console.log('Add family pressed');
  };

  return (
    <View style={{ flex: 1 }}>
      <StatusBar 
        barStyle="dark-content" 
        backgroundColor="#fff" 
        translucent={true} 
      />
      <View style={{ 
        height: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        backgroundColor: '#fff'
      }} />
      <Tabs
        screenOptions={({ route }: { route: RouteProp<ParamListBase, string> }) => {
          const options: BottomTabNavigationOptions = {
            tabBarIcon: ({ focused, color, size }) => {
              let iconName: keyof typeof Ionicons.glyphMap;

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
                default:
                  iconName = 'chatbubbles-outline';
              }

              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: '#128C7E',
            tabBarInactiveTintColor: 'gray',
            header: () => <Header onMenuPress={() => setIsMenuVisible(true)} />,
            headerShown: true,
          };
          return options;
        }}
        screenListeners={{
          state: (e) => {
            const routes = e.data.state.routes;
            const currentRoute = routes[e.data.state.index];
            if (TAB_NAMES.includes(currentRoute.name as TabName)) {
              setCurrentTab(currentRoute.name as TabName);
            }
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
      {shouldShowIncognitoToggle && (
        <ToggleButton
          isActive={isIncognitoMode}
          onToggle={() => setIsIncognitoMode(!isIncognitoMode)}
          mode="incognito"
        />
      )}
      {shouldShowStatusToggle && (
        <ToggleButton
          isActive={isStatusActive}
          onToggle={() => setIsStatusActive(!isStatusActive)}
          mode="status"
        />
      )}
      <Menu
        visible={isMenuVisible}
        onClose={() => setIsMenuVisible(false)}
        onAddFamily={handleAddFamily}
      />
    </View>
  );
}
