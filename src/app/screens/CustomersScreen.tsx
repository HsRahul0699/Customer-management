import React, { useState, useRef } from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSharedValue, withTiming } from 'react-native-reanimated';
import { Animated as RNAnimated } from 'react-native';
import { customersStyles } from '../styles/customers.styles';
import { useCustomers } from '../utils/hooks/useCustomersHook';
import { useGroupedCustomers } from '../utils/hooks/useGroupedCustomers';
import { FilterType, Customer } from '../utils/types/customerTypes';
import { FilterTabsWithSearch } from '../components/FilterTabsWithSearch';
import { CustomerPagerView } from '../components/CustomerPagerView';
import { FloatingActionButton } from '../components/FloatingActionButton';
import { SuccessOverlay } from '../components/SuccessOverlay';
import { AddCustomerModal } from '../components/AddCustomerModal';
import PagerView from 'react-native-pager-view';

const CustomersScreen = () => {
  const safeAreaInsets = useSafeAreaInsets();
  const [filter, setFilter] = useState<FilterType>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const pagerRef = useRef<PagerView>(null);
  const pageScroll = useSharedValue(0);
  const tabs: FilterType[] = ['All', 'Admin', 'Manager'];
  const [showSuccessOverlay, setShowSuccessOverlay] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>(
    'Customer added successfully',
  );

  const {
    customers,
    loadingMore,
    loadingInitial,
    loadMoreCustomers,
    addCustomer,
    updateCustomer,
    deleteCustomer,
    handleRefresh,
  } = useCustomers(filter, searchQuery);

  const sheetTranslateY = useSharedValue(800);
  const [showAddCustomer, setShowAddCustomer] = useState<boolean>(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null,
  );
  const searchInputWidth = useRef(new RNAnimated.Value(0))?.current;
  const [searchMode, setSearchMode] = useState<boolean>(false);
  const groupedCustomers = useGroupedCustomers(customers, searchQuery);

  const onPageScroll = (e: any) => {
    const { position, offset } = e.nativeEvent;
    pageScroll.value = position + offset;
  };

  const onPageSelected = (e: any) => {
    const { position } = e.nativeEvent;
    setFilter(tabs[position]);
  };

  const goToPage = (index: number) => {
    if (pagerRef.current) {
      pagerRef.current.setPage(index);
    }
  };

  const closeSheet = () => {
    sheetTranslateY.value = withTiming(800, { duration: 300 });
    setTimeout(() => {
      setShowAddCustomer(false);
      setSelectedCustomer(null);
    }, 300);
  };

  const toggleSearchMode = () => {
    searchInputWidth.stopAnimation();

    if (!searchMode) {
      searchInputWidth.setValue(0);
      RNAnimated.timing(searchInputWidth, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    } else {
      searchInputWidth.setValue(1);
      RNAnimated.timing(searchInputWidth, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start(() => {
        setSearchQuery('');
      });
    }
    setSearchMode(prev => !prev);
  };

  const handleCustomerPress = (customer: Customer) => {
    setSelectedCustomer(customer);
    setShowAddCustomer(true);
    sheetTranslateY.value = withTiming(0, { duration: 300 });
  };

  const handleFabPress = () => {
    setSelectedCustomer(null);
    setShowAddCustomer(true);
    sheetTranslateY.value = withTiming(0, { duration: 300 });
  };

  const handleSuccess = (isUpdate: boolean, isDelete?: boolean) => {
    if (isDelete) {
      setSuccessMessage('Customer deleted successfully');
    } else if (isUpdate) {
      setSuccessMessage('Customer updated successfully');
    } else {
      setSuccessMessage('Customer added successfully');
    }
    setShowSuccessOverlay(true);
    setTimeout(() => {
      setShowSuccessOverlay(false);
    }, 2000);
  };

  return (
    <View
      style={[customersStyles.container, { paddingTop: safeAreaInsets.top }]}
    >
      <View style={customersStyles.tabContainer}>
        <View style={customersStyles.filterContainer}>
          <FilterTabsWithSearch
            tabs={tabs}
            selectedTab={filter}
            onTabPress={goToPage}
            scrollPosition={pageScroll}
            searchMode={searchMode}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onToggleSearch={toggleSearchMode}
            searchInputWidth={searchInputWidth}
          />
        </View>
      </View>

      <CustomerPagerView
        pagerRef={pagerRef}
        tabs={tabs}
        sections={groupedCustomers}
        loadingInitial={loadingInitial}
        loadingMore={loadingMore}
        onPageScroll={onPageScroll}
        onPageSelected={onPageSelected}
        onRefresh={handleRefresh}
        onLoadMore={loadMoreCustomers}
        onCustomerPress={handleCustomerPress}
      />

      <FloatingActionButton
        onPress={handleFabPress}
        bottom={safeAreaInsets.bottom + 20}
      />

      <SuccessOverlay title={successMessage} visible={showSuccessOverlay} />

      <AddCustomerModal
        visible={showAddCustomer}
        selectedCustomer={selectedCustomer}
        sheetTranslateY={sheetTranslateY}
        onClose={closeSheet}
        onAddCustomer={addCustomer}
        onUpdateCustomer={updateCustomer}
        onDeleteCustomer={deleteCustomer}
        onSuccess={handleSuccess}
      />
    </View>
  );
};

export default CustomersScreen;
