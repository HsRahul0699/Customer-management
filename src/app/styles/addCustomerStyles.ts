import { Dimensions, StyleSheet } from 'react-native';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { colors } from '../utils/colors/colors';

export const addCustomerStyles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: colors.white.white1,
  },
  textInput: {
    borderBottomWidth: 1,
    fontSize: moderateScale(16),
    color: colors.black.black2,
    fontWeight: '400',
    borderColor: colors.grey.grey11,
    paddingVertical: verticalScale(10),
  },
  closeContainer: { paddingHorizontal: scale(20) },
  title: {
    fontSize: moderateScale(20),
    marginTop: verticalScale(40),
    fontWeight: '500',
  },
  textInputContainer: { marginTop: verticalScale(30) },
  errorTextContainer: { marginTop: verticalScale(5) },
  errorText: { color: 'red', fontSize: moderateScale(12) },
  useRoleContainer: { marginTop: verticalScale(40) },
  userRoleText: { fontSize: moderateScale(16), fontWeight: '500' },
  createUserButtonContainer: {
    position: 'absolute',
    bottom: verticalScale(20),
    paddingHorizontal: scale(20),
    width: '100%',
  },
  createUserButton: {
    borderRadius: 30,
    paddingVertical: verticalScale(12),
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  createUserButtonText: {
    color: colors.white.white1,
    fontSize: moderateScale(16),
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  deleteConfirmationModalContainer: {
    height: Dimensions.get('window').height * 0.3,
    marginHorizontal: scale(20),
    backgroundColor: colors.white.white1,
    borderRadius: 20,
    padding: scale(20),
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  warningImageContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  warningImage: {
    width: verticalScale(50),
    height: verticalScale(50),
    marginBottom: verticalScale(20),
  },
  deleteConfirmationModalText: {
    fontSize: moderateScale(16),
    fontWeight: '500',
    textAlign: 'center',
    color: colors.black.black1,
  },
  cancelConfirmationContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    marginTop: verticalScale(20),
  },
  cancelTextContainer: {
    flex: 1,
    paddingVertical: verticalScale(12),
    paddingHorizontal: scale(20),
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.grey.grey2,
    marginRight: scale(10),
    alignItems: 'center',
  },
  confirmTextContainer: {
    flex: 1,
    paddingVertical: verticalScale(12),
    paddingHorizontal: scale(20),
    borderRadius: 10,
    backgroundColor: colors.red.red1,
    marginLeft: scale(10),
    alignItems: 'center',
  },
  cancelText: {
    fontSize: moderateScale(14),
    fontWeight: '600',
    color: colors.black.black1,
  },
  confirmText: {
    fontSize: moderateScale(14),
    fontWeight: '600',
    color: colors.white.white1,
  },
});
