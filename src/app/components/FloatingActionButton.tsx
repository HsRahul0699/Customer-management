import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { customersStyles } from '../styles/customers.styles';

interface FloatingActionButtonProps {
  onPress: () => void;
  bottom: number;
}

export const FloatingActionButton = ({
  onPress,
  bottom,
}: FloatingActionButtonProps) => {
  return (
    <TouchableOpacity
      style={[customersStyles.fab, { bottom }]}
      onPress={onPress}
    >
      <Text style={customersStyles.fabIcon}>+</Text>
    </TouchableOpacity>
  );
};

