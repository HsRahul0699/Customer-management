import { useCallback } from 'react';
import { Customer, FormData, RoleType } from '../types/customerTypes';

export const useAddCustomer = ({
  form,
  filter,
  onAddCustomer,
  onUpdateCustomer,
  handleClose,
  setForm,
  setFieldErrors,
  isSelectedItem = false,
  customerData,
}: {
  form: FormData;
  filter: RoleType;
  onAddCustomer: (customer: Customer) => Promise<Customer | null>;
  onUpdateCustomer?: (customer: Customer) => Promise<Customer | null>;
  handleClose: () => void;
  setForm: (form: FormData) => void;
  setFieldErrors: (
    fieldErrors: Partial<Record<keyof FormData, string | null>>,
  ) => void;
  isSelectedItem?: boolean;
  customerData?: Customer | null;
}) => {
  const handleCreateUser = useCallback(async () => {
    const updatedCustomer: Customer = {
      id:
        isSelectedItem && customerData?.id ? customerData.id : `${Date.now()}`,
      name: `${form.fName?.trim()} ${form.lName?.trim()}`,
      email: form.email,
      role: filter.toUpperCase(),
    };

    try {
      let result: Customer | null = null;

      if (isSelectedItem && onUpdateCustomer) {
        result = await onUpdateCustomer(updatedCustomer);
      } else {
        result = await onAddCustomer(updatedCustomer);
      }

      if (result) {
        handleClose();
        setForm({
          fName: '',
          lName: '',
          email: '',
        });
        setFieldErrors({});
        return result;
      } else {
        console.error(
          isSelectedItem
            ? 'Failed to update customer'
            : 'Failed to add customer',
        );
        return null;
      }
    } catch (error) {
      console.error(
        isSelectedItem ? 'Error updating user:' : 'Error creating user:',
        error,
      );
      return null;
    }
  }, [
    form,
    filter,
    onAddCustomer,
    onUpdateCustomer,
    handleClose,
    setForm,
    setFieldErrors,
    isSelectedItem,
    customerData,
  ]);

  return handleCreateUser;
};
