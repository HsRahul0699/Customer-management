import React from 'react';
import { TouchableOpacity } from 'react-native';
import Animated, {
  useAnimatedStyle,
  SharedValue,
} from 'react-native-reanimated';
import { Customer } from '../utils/types/customerTypes';
import { customersStyles } from '../styles/customers.styles';
import AddCustomer from '../screens/AddCustomer';

interface AddCustomerModalProps {
  visible: boolean;
  selectedCustomer: Customer | null;
  sheetTranslateY: SharedValue<number>;
  onClose: () => void;
  onAddCustomer: (customer: Customer) => Promise<Customer | null>;
  onUpdateCustomer?: (customer: Customer) => Promise<Customer | null>;
  onDeleteCustomer?: (customerId: string) => Promise<boolean>;
  onSuccess: (isUpdate: boolean, isDelete?: boolean) => void;
}

export const AddCustomerModal = ({
  visible,
  selectedCustomer,
  sheetTranslateY,
  onClose,
  onAddCustomer,
  onUpdateCustomer,
  onDeleteCustomer,
  onSuccess,
}: AddCustomerModalProps) => {
  const sheetStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: sheetTranslateY.value }],
    };
  });

  if (!visible) return null;

  return (
    <>
      <TouchableOpacity
        activeOpacity={1}
        onPress={onClose}
        style={[
          customersStyles.sheetContainer,
          customersStyles.sheetBackground,
        ]}
      />
      <Animated.View
        style={[
          customersStyles.sheetContent,
          customersStyles.sheetContainer,
          sheetStyle,
        ]}
      >
        <AddCustomer
          handleClose={onClose}
          customerData={selectedCustomer}
          isSelectedItem={!!selectedCustomer}
          onAddCustomer={async (customer: Customer) => {
            const result = await onAddCustomer(customer);
            if (result) {
              onSuccess(false);
            }
            return result;
          }}
          onUpdateCustomer={
            selectedCustomer && onUpdateCustomer
              ? async (customer: Customer) => {
                  const result = await onUpdateCustomer(customer);
                  if (result) {
                    onSuccess(true);
                  }
                  return result;
                }
              : undefined
          }
          onDeleteCustomer={
            selectedCustomer && onDeleteCustomer
              ? async (customerId: string) => {
                  const result = await onDeleteCustomer(customerId);
                  return result;
                }
              : undefined
          }
          onDeleteSuccess={() => {
            onSuccess(false, true);
          }}
        />
      </Animated.View>
    </>
  );
};
