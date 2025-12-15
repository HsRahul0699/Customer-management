import { Customer, FilterType } from '../../src/app/utils/types/customerTypes';

export const filterCustomersByRole = (
  customers: Customer[],
  filter: FilterType,
): Customer[] => {
  if (filter === 'All') {
    return customers;
  }
  return customers.filter(
    customer => customer.role?.toLowerCase() === filter.toLowerCase(),
  );
};

describe('Customer Filtering', () => {
  describe('filterCustomersByRole', () => {
    const customers: Customer[] = [
      { id: '1', name: 'Anand Kumar', email: 'anand@gmail.com', role: 'Admin' },
      {
        id: '2',
        name: 'Bhavan Rao',
        email: 'bhavan@gmail.com',
        role: 'Manager',
      },
      {
        id: '3',
        name: 'Chandra Sekhar',
        email: 'chandra@gmail.com',
        role: 'Admin',
      },
    ];

    it('returns all customers when filter is All', () => {
      const result = filterCustomersByRole(customers, 'All');

      expect(result).toEqual(customers);
    });

    it('filters customers by role', () => {
      const result = filterCustomersByRole(customers, 'Admin');

      expect(result.length).toBe(2);
      expect(result[0].name).toBe('Anand Kumar');
      expect(result[1].name).toBe('Chandra Sekhar');
    });

    it('returns empty array when no customer matches', () => {
      const result = filterCustomersByRole(customers, 'ManagerX' as any);

      expect(result).toEqual([]);
    });
  });
});
