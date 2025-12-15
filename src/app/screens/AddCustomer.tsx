import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import TabFilter from '../components/TabFilter';
import { useState, useEffect } from 'react';
import { RoleType, FormData, Customer } from '../utils/types/customerTypes';
import { addCustomerStyles } from '../styles/addCustomerStyles';
import { useAddCustomer } from '../utils/hooks/useAddCustomerHook';
import { colors } from '../utils/colors/colors';
import { DeleteConfirmationModal } from '../components/DeleteConfirmationModal';

const AddCustomer = ({
  handleClose,
  onAddCustomer,
  onUpdateCustomer,
  onDeleteCustomer,
  onDeleteSuccess,
  customerData,
  isSelectedItem = false,
}: {
  handleClose: () => void;
  onAddCustomer: (customer: Customer) => Promise<Customer | null>;
  onUpdateCustomer?: (customer: Customer) => Promise<Customer | null>;
  onDeleteCustomer?: (customerId: string) => Promise<boolean>;
  onDeleteSuccess?: () => void;
  customerData?: Customer | null;
  isSelectedItem?: boolean;
}) => {
  const safeAreaInsets = useSafeAreaInsets();
  const tabs: RoleType[] = ['Admin', 'Manager'];

  const getInitialFormData = (): FormData => {
    if (customerData?.name) {
      const nameParts = customerData.name.trim().split(' ');
      return {
        fName: nameParts[0] || '',
        lName: nameParts.slice(1).join(' ') || '',
        email: customerData.email || '',
      };
    }
    return {
      fName: '',
      lName: '',
      email: '',
    };
  };

  const [filter, setFilter] = useState<RoleType>(() => {
    if (customerData?.role) {
      return customerData.role.toUpperCase() === 'ADMIN' ? 'Admin' : 'Manager';
    }
    return 'Admin';
  });

  const [form, setForm] = useState<FormData>(getInitialFormData());
  const [fieldErrors, setFieldErrors] = useState<
    Partial<Record<keyof FormData, string | null>>
  >({});
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const validateName = (value: string, key: keyof FormData): string | null => {
    if (!value.trim())
      return `${key === 'fName' ? 'First Name' : 'Last Name'} is required`;
    if ((form['fName'] + form['lName'])?.length > 50)
      return 'Full name must be less than 50 characters';
    if (!/^[a-zA-Z ]+$/.test(value))
      return `${
        key === 'fName' ? 'First Name' : 'Last Name'
      } must contain only letters`;
    return null;
  };
  const validateEmail = (value: string) => {
    if (!value.trim()) return 'Email is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Invalid email';
    return null;
  };
  const fields = [
    {
      key: 'fName' as keyof FormData,
      placeholder: 'First Name',
      validationCheck: validateName,
    },
    {
      key: 'lName' as keyof FormData,
      placeholder: 'Last Name',
      validationCheck: validateName,
    },
    {
      key: 'email' as keyof FormData,
      placeholder: 'Email',
      validationCheck: validateEmail,
    },
  ];
  const handleInputChange = (key: keyof FormData, value: string) => {
    const inputField = fields.find(field => field.key === key);
    if (inputField?.validationCheck) {
      setFieldErrors(
        (prev: Partial<Record<keyof FormData, string | null>>) => ({
          ...prev,
          [key]: inputField.validationCheck?.(value, key),
        }),
      );
    }
    setForm(prev => ({
      ...prev,
      [key]: value,
    }));
  };
  const goToPage = (index: number) => {
    const selectedFilter = tabs[index];
    setFilter(selectedFilter);
  };

  useEffect(() => {
    if (customerData) {
      const nameParts = customerData.name?.trim().split(' ') || [];
      setForm({
        fName: nameParts[0] || '',
        lName: nameParts.slice(1).join(' ') || '',
        email: customerData.email || '',
      });
      if (customerData.role) {
        setFilter(
          customerData.role.toUpperCase() === 'ADMIN' ? 'Admin' : 'Manager',
        );
      }
    } else {
      setForm({
        fName: '',
        lName: '',
        email: '',
      });
      setFilter('Admin');
    }
  }, [customerData]);

  const handleCreateUser = useAddCustomer({
    form,
    filter,
    onAddCustomer,
    onUpdateCustomer,
    handleClose,
    setForm,
    setFieldErrors,
    isSelectedItem,
    customerData,
  });

  return (
    <View
      style={[
        {
          paddingTop: safeAreaInsets.top,
        },
        addCustomerStyles.container,
      ]}
    >
      <View style={addCustomerStyles.closeContainer}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <TouchableOpacity
            style={{ width: '10%', flex: 6 }}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            onPress={handleClose}
          >
            <Image source={require('../../assets/closeBlack.png')} />
          </TouchableOpacity>
          {isSelectedItem && (
            <TouchableOpacity
              onPress={() => setShowDeleteConfirmation(true)}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Image source={require('../../assets/trash.png')} />
            </TouchableOpacity>
          )}
        </View>
        <Text style={addCustomerStyles.title}>
          {isSelectedItem ? 'Edit User' : 'New User'}
        </Text>
        <View>
          {fields.map(field => (
            <View style={addCustomerStyles.textInputContainer} key={field.key}>
              <TextInput
                value={form[field.key]}
                placeholder={field.placeholder}
                onChangeText={value => handleInputChange(field.key, value)}
                style={addCustomerStyles.textInput}
              />
              {fieldErrors?.[field.key] && (
                <View style={addCustomerStyles.errorTextContainer}>
                  <Text style={addCustomerStyles.errorText}>
                    {fieldErrors?.[field.key]}
                  </Text>
                </View>
              )}
            </View>
          ))}
        </View>
        <View style={addCustomerStyles.useRoleContainer}>
          <Text style={addCustomerStyles.userRoleText}>User Role</Text>
          <TabFilter tabs={tabs} selectedTab={filter} onTabPress={goToPage} />
        </View>
      </View>
      <View style={addCustomerStyles.createUserButtonContainer}>
        <TouchableOpacity
          disabled={
            Object.values(fieldErrors).some(error => error !== null) ||
            Object.values(form).some(value => value === '')
          }
          onPress={handleCreateUser}
          style={[
            {
              backgroundColor:
                Object.values(fieldErrors).some(error => error !== null) ||
                Object.values(form).some(value => value === '')
                  ? colors.grey.grey4
                  : colors.blue.blue1,
            },
            addCustomerStyles.createUserButton,
          ]}
          activeOpacity={0.8}
        >
          <Text style={addCustomerStyles.createUserButtonText}>
            {isSelectedItem ? 'Update User' : 'Create User'}
          </Text>
        </TouchableOpacity>
      </View>
      <DeleteConfirmationModal
        visible={showDeleteConfirmation}
        onConfirm={async () => {
          if (onDeleteCustomer && customerData?.id) {
            const success = await onDeleteCustomer(customerData.id);
            if (success) {
              setShowDeleteConfirmation(false);
              handleClose();
              setTimeout(() => {
                if (onDeleteSuccess) {
                  onDeleteSuccess();
                }
              }, 350);
            }
          }
        }}
        onCancel={() => setShowDeleteConfirmation(false)}
      />
    </View>
  );
};

export default AddCustomer;
