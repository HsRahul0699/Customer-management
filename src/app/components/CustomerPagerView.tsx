import React, { RefObject } from 'react';
import PagerView from 'react-native-pager-view';
import { FilterType } from '../utils/types/customerTypes';
import { CustomerList } from './CustomerList';
import { CustomerSection } from '../utils/types/customerTypes';

interface CustomerPagerViewProps {
  pagerRef: RefObject<PagerView | null>;
  tabs: FilterType[];
  sections: CustomerSection[];
  loadingInitial: boolean;
  loadingMore: boolean;
  onPageScroll: (e: any) => void;
  onPageSelected: (e: any) => void;
  onRefresh: () => void;
  onLoadMore: () => void;
  onCustomerPress: (customer: any) => void;
}

export const CustomerPagerView = ({
  pagerRef,
  tabs,
  sections,
  loadingInitial,
  loadingMore,
  onPageScroll,
  onPageSelected,
  onRefresh,
  onLoadMore,
  onCustomerPress,
}: CustomerPagerViewProps) => {
  return (
    <PagerView
      ref={pagerRef}
      style={{ flex: 1 }}
      initialPage={0}
      onPageScroll={onPageScroll}
      onPageSelected={onPageSelected}
    >
      {tabs.map((tab, index) => (
        <CustomerList
          tab={tab}
          key={`${index}`}
          sections={sections}
          loadingInitial={loadingInitial}
          loadingMore={loadingMore}
          onRefresh={onRefresh}
          onLoadMore={onLoadMore}
          onCustomerPress={onCustomerPress}
        />
      ))}
    </PagerView>
  );
};
