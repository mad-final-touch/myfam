import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface ToggleButtonProps {
  isActive: boolean;
  onToggle: () => void;
  mode?: 'status' | 'incognito';
}

const ToggleButton: React.FC<ToggleButtonProps> = ({ 
  isActive, 
  onToggle, 
  mode = 'incognito' 
}) => {
  const renderContent = () => {
    if (mode === 'status') {
      return (
        <Text style={[styles.text, { color: isActive ? '#fff' : '#128C7E' }]}>
          {isActive ? 'Busy' : 'Free'}
        </Text>
      );
    }
    return (
      <Ionicons
        name="glasses-outline"
        size={24}
        color={isActive ? '#fff' : '#128C7E'}
      />
    );
  };

  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor: isActive ? '#128C7E' : '#fff' }
      ]}
      onPress={onToggle}
    >
      {renderContent()}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    bottom: 80,
    right: 16,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    zIndex: 1000,
  },
  text: {
    fontSize: 14,
    fontWeight: '600',
  },
});

export default ToggleButton; 