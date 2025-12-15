import { StyleSheet } from 'react-native';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { colors } from '../utils/colors/colors';

export const customersStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white.white1,
  },
  filterContainer: {
    flexDirection: 'row',
  },

  filterButtons: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    backgroundColor: colors.grey.grey5,
    borderWidth: 1,
    borderColor: colors.blue.blue2,
    borderRadius: 20,
  },

  searchButtonContainer: {
    width: '15%',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  searchIcon: {
    fontSize: 20,
    color: colors.grey.grey2,
  },
  searchTextInput: {
    backgroundColor: colors.grey.grey5,

    marginTop: verticalScale(12),
    width: '100%',
    borderRadius: 20,
    height: verticalScale(30),
    paddingVertical: verticalScale(4),
    paddingHorizontal: scale(10),
    borderColor: 'red',
  },
  tabContainer: {
    paddingHorizontal: scale(20),
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  list: {
    flex: 1,
  },
  listContent: {
    paddingBottom: verticalScale(100),
  },
  sectionHeader: {
    backgroundColor: colors.white.white1,
    paddingHorizontal: scale(16),
    paddingVertical: verticalScale(8),
  },
  sectionHeaderText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.grey.grey2,
  },
  customerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scale(16),
    paddingVertical: verticalScale(12),
    backgroundColor: colors.white.white1,
    borderBottomWidth: 1,
    borderBottomColor: colors.grey.grey7,
  },
  avatar: {
    width: verticalScale(40),
    height: verticalScale(40),
    borderRadius: 8,
    backgroundColor: colors.grey.grey8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: scale(12),
  },
  avatarText: {
    fontSize: moderateScale(18),
    fontWeight: '600',
    color: colors.blue.blue4,
  },
  customerInfo: {
    flex: 1,
  },
  customerName: {
    fontSize: moderateScale(15),
    fontWeight: '500',
    color: colors.grey.grey6,
  },
  roleBadge: {
    paddingHorizontal: scale(10),
    paddingVertical: verticalScale(4),
    borderRadius: 12,
  },
  roleBadgeText: {
    fontSize: moderateScale(12),
    fontWeight: '400',
    color: colors.grey.grey2,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: verticalScale(100),
  },
  loadingText: {
    marginTop: verticalScale(10),
    fontSize: moderateScale(16),
    color: colors.grey.grey2,
  },
  errorContainer: {
    margin: 20,
    padding: 15,
    backgroundColor: colors.grey.grey9,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.grey.grey10,
  },
  errorText: {
    color: colors.red.red1,
    fontSize: 16,
    fontWeight: '600',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: verticalScale(100),
    paddingHorizontal: scale(20),
  },
  emptyText: {
    fontSize: moderateScale(16),
    color: colors.grey.grey12,
    textAlign: 'center',
  },
  fab: {
    position: 'absolute',
    right: scale(20),
    width: verticalScale(42),
    height: verticalScale(42),
    borderRadius: verticalScale(6),
    backgroundColor: colors.blue.blue3,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.black.black1,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 8,
  },
  fabIcon: {
    fontSize: moderateScale(28),
    color: colors.white.white1,
    fontWeight: '300',
    lineHeight: 28,
  },
  scrollView: {
    flex: 1,
  },
  sheetContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  sheetBackground: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 999,
  },
  sheetContent: {
    backgroundColor: colors.white.white1,
    zIndex: 1000,
  },
  content: {
    flex: 1,
  },
});
