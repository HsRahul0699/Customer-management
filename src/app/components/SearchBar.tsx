import React from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Animated,
} from 'react-native';
import { scale, verticalScale } from 'react-native-size-matters';
import { customersStyles } from '../styles/customers.styles';

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  searchMode: boolean;
  onToggleSearch: () => void;
  searchInputWidth: Animated.Value;
}

export const SearchBar = ({
  searchQuery,
  onSearchChange,
  searchMode,
  onToggleSearch,
  searchInputWidth,
}: SearchBarProps) => {
  return (
    <>
      {searchMode ? (
        <Animated.View
          style={{
            width: '85%',
            transform: [
              {
                translateX: searchInputWidth?.interpolate({
                  inputRange: [0, 1],
                  outputRange: [scale(190), 0],
                }),
              },
            ],
          }}
        >
          <TextInput
            placeholder="Search by name or email"
            style={customersStyles.searchTextInput}
            value={searchQuery}
            onChangeText={onSearchChange}
          />
        </Animated.View>
      ) : null}
      <View style={customersStyles.searchButtonContainer}>
        <TouchableOpacity
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          onPress={onToggleSearch}
        >
          {searchMode ? (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: verticalScale(12),
                height: verticalScale(30),
              }}
            >
              <Image
                source={require('../../assets/closeBlack.png')}
                style={{
                  width: verticalScale(15),
                  height: verticalScale(15),
                }}
              />
            </View>
          ) : (
            <Image
              source={require('../../assets/search.png')}
              style={{
                width: verticalScale(20),
                height: verticalScale(20),
              }}
            />
          )}
        </TouchableOpacity>
      </View>
    </>
  );
};
