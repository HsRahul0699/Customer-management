import { StyleSheet } from 'react-native';
import { colors } from '../utils/colors/colors';

export const tabStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    position: 'relative',
    maxWidth: '100%',
    borderRadius: 20,
    backgroundColor: colors.grey.grey3,
    marginVertical: 12,
  },
  tab: {
    paddingVertical: 12,
    alignItems: 'center',
    zIndex: 1,
  },
  animatedBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    backgroundColor: colors.grey.grey5,
    borderWidth: 1,
    borderColor: colors.blue.blue2,
    borderRadius: 20,
  },
  activeText: {
    color: colors.blue.blue2,
    fontWeight: '600',
  },
  inactiveText: {
    color: colors.black.black1,
    fontWeight: '500',
  },
});
