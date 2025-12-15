import React from 'react';
import { View, Animated } from 'react-native';
import { SharedValue } from 'react-native-reanimated';
import TabFilter from './TabFilter';
import { SearchBar } from './SearchBar';
import { FilterType } from '../utils/types/customerTypes';

interface FilterTabsWithSearchProps {
  tabs: FilterType[];
  selectedTab: FilterType;
  onTabPress: (index: number) => void;
  scrollPosition?: SharedValue<number>;
  searchMode: boolean;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onToggleSearch: () => void;
  searchInputWidth: Animated.Value;
}

export const FilterTabsWithSearch = ({
  tabs,
  selectedTab,
  onTabPress,
  scrollPosition,
  searchMode,
  searchQuery,
  onSearchChange,
  onToggleSearch,
  searchInputWidth,
}: FilterTabsWithSearchProps) => {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%' }}>
      {!searchMode && (
        <View style={{ width: '85%' }}>
          <TabFilter
            tabs={tabs}
            selectedTab={selectedTab}
            onTabPress={onTabPress}
            scrollPosition={scrollPosition}
          />
        </View>
      )}
      <SearchBar
        searchQuery={searchQuery}
        onSearchChange={onSearchChange}
        searchMode={searchMode}
        onToggleSearch={onToggleSearch}
        searchInputWidth={searchInputWidth}
      />
    </View>
  );
};
