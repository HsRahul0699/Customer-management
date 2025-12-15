export type FilterType = 'All' | 'Admin' | 'Manager';
export type RoleType = 'Admin' | 'Manager';
export type Customer = {
  id: string;
  name: string | null;
  email: string | null;
  role: string | null;
};

export type ZellerCustomersData = {
  items: Customer[];
  nextToken: string | null;
};

export type ListCustomersResponse = {
  listZellerCustomers: ZellerCustomersData;
};

export type FormData = {
  fName: string;
  lName: string;
  email: string;
};

export type CustomerSection = {
  title: string;
  data: Customer[];
};
