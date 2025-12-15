import { Customer, FormData, RoleType } from '../../src/app/utils/types/customerTypes';

const createCustomerFromForm = (
  form: FormData,
  filter: RoleType,
  isSelectedItem: boolean,
  customerData?: Customer | null,
): Customer => {
  return {
    id: isSelectedItem && customerData?.id ? customerData.id : `${Date.now()}`,
    name: `${form.fName.trim()} ${form.lName.trim()}`,
    email: form.email,
    role: filter.toUpperCase(),
  };
};

describe('createCustomerFromForm', () => {
  const form: FormData = {
    fName: 'Anand',
    lName: 'Kumar',
    email: 'anand@gmail.com',
  };

  it('creates a new customer', () => {
    const customer = createCustomerFromForm(form, 'Admin', false);

    expect(customer.name).toBe('Anand Kumar');
    expect(customer.email).toBe('anand@gmail.com');
    expect(customer.role).toBe('ADMIN');
    expect(customer.id).toBeTruthy();
  });

  it('updating existing customer', () => {
    const existing: Customer = {
      id: '123',
      name: 'Bhavan Rao',
      email: 'bhavan@gmail.com',
      role: 'MANAGER',
    };

    const customer = createCustomerFromForm(form, 'Admin', true, existing);

    expect(customer.id).toBe('123');
  });

  it('trims name values', () => {
    const customer = createCustomerFromForm(
      { fName: '  Anand ', lName: ' Kumar  ', email: 'anand@gmail.com' },
      'Admin',
      false,
    );

    expect(customer.name).toBe('Anand Kumar');
  });

  it('converts role to uppercase', () => {
    const customer = createCustomerFromForm(form, 'Manager', false);
    expect(customer.role).toBe('MANAGER');
  });
});
