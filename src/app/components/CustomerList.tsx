import React from 'react';
import {
  SectionList,
  RefreshControl,
  ActivityIndicator,
  View,
  Text,
} from 'react-native';
import {
  Customer,
  CustomerSection,
  FilterType,
} from '../utils/types/customerTypes';
import { customersStyles } from '../styles/customers.styles';
import { colors } from '../utils/colors/colors';
import { CustomerItem } from './CustomerItem';
import { CustomerSectionHeader } from './CustomerSectionHeader';

interface CustomerListProps {
  tab: FilterType;
  sections: CustomerSection[];
  loadingInitial: boolean;
  loadingMore: boolean;
  onRefresh: () => void;
  onLoadMore: () => void;
  onCustomerPress: (customer: Customer) => void;
}

export const CustomerList = ({
  tab,
  sections,
  loadingInitial,
  loadingMore,
  onRefresh,
  onLoadMore,
  onCustomerPress,
}: CustomerListProps) => {
  return (
    <SectionList<Customer, CustomerSection>
      key={`${loadingInitial}`}
      nestedScrollEnabled={true}
      refreshControl={
        <RefreshControl
          tintColor={colors.blue.blue1}
          colors={[colors.blue.blue1]}
          refreshing={loadingInitial}
          onRefresh={onRefresh}
        />
      }
      bounces={true}
      overScrollMode="never"
      sections={sections}
      renderItem={({ item }) =>
        loadingInitial ? (
          <></>
        ) : (
          <CustomerItem
            key={`${tab}-${item.id}`}
            item={item}
            onPress={onCustomerPress}
          />
        )
      }
      renderSectionHeader={({ section }) =>
        loadingInitial ? <></> : <CustomerSectionHeader title={section.title} />
      }
      initialNumToRender={1}
      keyExtractor={(item, index) => item.id || `customer-${index}`}
      style={customersStyles.list}
      contentContainerStyle={customersStyles.listContent}
      onEndReached={onLoadMore}
      onEndReachedThreshold={0.3}
      removeClippedSubviews={false}
      ListFooterComponent={
        loadingMore ? (
          <View style={{ padding: 20, alignItems: 'center' }}>
            <ActivityIndicator size="small" color={colors.blue.blue1} />
          </View>
        ) : null
      }
      ListEmptyComponent={
        loadingInitial ? (
          <></>
        ) : (
          <View style={customersStyles.emptyContainer}>
            <Text style={customersStyles.emptyText}>
              No customers found matching your criteria.
            </Text>
          </View>
        )
      }
    />
  );
};
