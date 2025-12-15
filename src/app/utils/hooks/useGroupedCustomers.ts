import { useMemo } from 'react';
import { Customer } from '../types/customerTypes';

export const useGroupedCustomers = (customers: Customer[], search: string) => {
  return useMemo(() => {
    let filtered = customers;

    if (search.trim()) {
      const q = search.toLowerCase();
      filtered = filtered.filter(
        c =>
          c.name?.toLowerCase().includes(q) ||
          c.email?.toLowerCase().includes(q),
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
  }, [customers, search]);
};
