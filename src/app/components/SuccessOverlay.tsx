import { Text, View, Dimensions, Image } from 'react-native';
import Modal from 'react-native-modal';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { colors } from '../utils/colors/colors';

export const SuccessOverlay = ({
  title,
  visible,
}: {
  title: string;
  visible: boolean;
}) => {
  return (
    <Modal
      backdropColor="rgba(0, 0, 0, 0.5)"
      isVisible={visible}
      presentationStyle="overFullScreen"
      animationIn="fadeIn"
    >
      <View
        style={{
          height: Dimensions.get('window').height * 0.25,
          marginHorizontal: scale(60),
          backgroundColor: colors.white.white1,
          borderRadius: 20,
          padding: scale(20),
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Image
          source={require('../../assets/success.png')}
          style={{ width: verticalScale(50), height: verticalScale(50) }}
        />
        <View style={{ marginTop: verticalScale(20) }}>
          <Text
            style={{
              fontSize: moderateScale(16),
              fontWeight: '500',
              textAlign: 'center',
            }}
          >
            {title}
          </Text>
        </View>
      </View>
    </Modal>
  );
};
