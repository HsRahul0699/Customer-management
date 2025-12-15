import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  SharedValue,
} from 'react-native-reanimated';
import { tabStyles } from '../styles/tabStyles';

export interface TabFilterProps {
  tabs: string[];
  selectedTab: string;
  onTabPress: (index: number) => void;
  scrollPosition?: SharedValue<number>;
}
const styles = tabStyles;
const TabFilter = ({
  tabs,
  selectedTab,
  onTabPress,
  scrollPosition,
}: TabFilterProps) => {
  const containerWidth = useSharedValue(0);
  const animatedPosition = useSharedValue(0);
  const isSwipe = useSharedValue(false);

  useEffect(() => {
    if (!scrollPosition) return;
    isSwipe.value = true;
  }, [selectedTab]);

  const onContainerLayout = (event: any) => {
    const { width } = event.nativeEvent.layout;
    containerWidth.value = width;

    const index = tabs.indexOf(selectedTab);
    animatedPosition.value = index * (width / tabs.length);
  };

  const indicatorStyle = useAnimatedStyle(() => {
    if (containerWidth.value === 0) return {};

    const tabWidth = containerWidth.value / tabs.length;

    let translateX;

    if (isSwipe.value && scrollPosition) {
      translateX = scrollPosition.value * tabWidth;
    } else {
      translateX = animatedPosition.value;
    }

    return {
      transform: [{ translateX }],
    };
  });

  const handleTabPress = (index: number) => {
    const tabWidth = containerWidth.value / tabs.length;

    isSwipe.value = false;
    animatedPosition.value = withTiming(index * tabWidth, {
      duration: 350,
    });

    onTabPress(index);
  };

  return (
    <View style={styles.container} onLayout={onContainerLayout}>
      <Animated.View
        style={[
          styles.animatedBackground,
          { width: `${100 / tabs.length}%` },
          indicatorStyle,
        ]}
      />

      {tabs.map((label, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => handleTabPress(index)}
          style={[styles.tab, { width: `${100 / tabs.length}%` }]}
        >
          <Text
            style={
              selectedTab === label ? styles.activeText : styles.inactiveText
            }
          >
            {label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default TabFilter;
