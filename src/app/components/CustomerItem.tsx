import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Customer } from '../utils/types/customerTypes';
import { customersStyles } from '../styles/customers.styles';

interface CustomerItemProps {
  item: Customer;
  onPress: (customer: Customer) => void;
}

const getInitial = (name: string | null): string => {
  if (!name) return '?';
  return name.charAt(0).toUpperCase();
};

export const CustomerItem = ({ item, onPress }: CustomerItemProps) => {
  const initial = getInitial(item.name);
  const isAdmin = item.role === 'ADMIN';
  const displayName = item.name || '';

  return (
    <TouchableOpacity
      style={customersStyles.customerItem}
      onPress={() => onPress(item)}
    >
      <View style={customersStyles.avatar}>
        <Text style={customersStyles.avatarText}>{initial}</Text>
      </View>
      <View style={customersStyles.customerInfo}>
        <Text style={customersStyles.customerName}>{displayName}</Text>
      </View>
      {isAdmin && (
        <View style={customersStyles.roleBadge}>
          <Text style={customersStyles.roleBadgeText}>Admin</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};
