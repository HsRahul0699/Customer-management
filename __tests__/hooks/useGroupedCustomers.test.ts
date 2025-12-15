import { Customer } from '../../src/app/utils/types/customerTypes';

const groupCustomers = (customers: Customer[], search: string) => {
  let filtered = customers;

  if (search.trim()) {
    const q = search.toLowerCase();
    filtered = filtered.filter(
      c =>
        c.name?.toLowerCase().includes(q) || c.email?.toLowerCase().includes(q),
    );
  }

  const groups: { [key: string]: Customer[] } = {};

  filtered.forEach(c => {
    const name = c.name?.split(' ')[0] || '';
    const key = name.charAt(0).toUpperCase();
    groups[key] = groups[key] || [];
    groups[key].push(c);
  });

  return Object.keys(groups)
    .sort()
    .map(letter => ({
      title: letter,
      data: groups[letter].sort((a, b) =>
        (a.name || '').localeCompare(b.name || ''),
      ),
    }));
};

describe('groupCustomers', () => {
  const customers: Customer[] = [
    {
      id: '1',
      name: 'Anand Kumar',
      email: 'anand@gmail.com',
      role: 'Admin',
    },
    {
      id: '2',
      name: 'Bhavan Rao',
      email: 'bhavan@gmail.com',
      role: 'Manager',
    },
    {
      id: '3',
      name: 'Anish Patel',
      email: 'chandra@gmail.com',
      role: 'Admin',
    },
  ];

  it('groups customers by first letter of first name', () => {
    const result = groupCustomers(customers, '');

    expect(result.length).toBe(2);
    expect(result[0].title).toBe('A');
    expect(result[0].data.length).toBe(2);
  });

  it('sorts customers alphabetically inside a group', () => {
    const result = groupCustomers(customers, '');

    const aGroup = result.find(g => g.title === 'A');
    expect(aGroup?.data[0].name).toBe('Anand Kumar');
    expect(aGroup?.data[1].name).toBe('Anish Patel');
  });

  it('filters customers using search text', () => {
    const result = groupCustomers(customers, 'bhavan');

    expect(result.length).toBe(1);
    expect(result[0].title).toBe('B');
    expect(result[0].data[0].name).toBe('Bhavan Rao');
  });

  it('returns empty array when no customers match', () => {
    const result = groupCustomers(customers, 'xyz123');

    expect(result).toEqual([]);
  });
});
