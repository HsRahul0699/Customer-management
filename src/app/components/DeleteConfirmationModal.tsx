import React from 'react';
import { View, Text, TouchableOpacity, Image, Dimensions } from 'react-native';
import Modal from 'react-native-modal';
import { addCustomerStyles } from '../styles/addCustomerStyles';

interface DeleteConfirmationModalProps {
  visible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export const DeleteConfirmationModal = ({
  visible,
  onConfirm,
  onCancel,
}: DeleteConfirmationModalProps) => {
  return (
    <Modal
      backdropColor="rgba(0, 0, 0, 0.5)"
      isVisible={visible}
      presentationStyle="overFullScreen"
      animationIn="fadeIn"
      animationOut="fadeOut"
    >
      <View style={addCustomerStyles.deleteConfirmationModalContainer}>
        <View style={addCustomerStyles.warningImageContainer}>
          <Image
            source={require('../../assets/warning.png')}
            style={addCustomerStyles.warningImage}
          />
          <Text style={addCustomerStyles.deleteConfirmationModalText}>
            Are you sure you want to delete this customer?
          </Text>
        </View>

        <View style={addCustomerStyles.cancelConfirmationContainer}>
          <TouchableOpacity
            onPress={onCancel}
            style={addCustomerStyles.cancelTextContainer}
          >
            <Text style={addCustomerStyles.cancelText}>Cancel</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={onConfirm}
            style={addCustomerStyles.confirmTextContainer}
          >
            <Text style={addCustomerStyles.confirmText}>Confirm</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};
