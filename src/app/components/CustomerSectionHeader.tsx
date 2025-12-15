import React from 'react';
import { View, Text } from 'react-native';
import { customersStyles } from '../styles/customers.styles';

interface CustomerSectionHeaderProps {
  title: string;
}

export const CustomerSectionHeader = ({
  title,
}: CustomerSectionHeaderProps) => (
  <View style={customersStyles.sectionHeader}>
    <Text style={customersStyles.sectionHeaderText}>{title}</Text>
  </View>
);

