import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const ToggleButton = ({ isActive, onToggle, type }) => {
  const getButtonText = () => {
    if (type === 'status') {
      return isActive ? 'Busy' : 'Free';
    } else {
      return isActive ? 'Emotional' : 'Physical';
    }
  };

  return (
    <TouchableOpacity
      style={[styles.button, isActive && styles.activeButton]}
      onPress={onToggle}
    >
      <Text style={[styles.text, isActive && styles.activeText]}>
        {getButtonText()}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    right: 20,
    bottom: 80,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  activeButton: {
    backgroundColor: '#128C7E',
  },
  text: {
    fontSize: 12,
    color: '#000',
    textAlign: 'center',
  },
  activeText: {
    color: '#fff',
  },
});

export default ToggleButton; 