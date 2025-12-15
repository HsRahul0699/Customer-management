import Realm from 'realm';

export const CustomerSchema: Realm.ObjectSchema = {
  name: 'Customer',
  primaryKey: 'id',
  properties: {
    id: 'string',
    name: 'string?',
    email: 'string?',
    role: 'string?',
    createdAt: { type: 'date', default: () => new Date() },
    updatedAt: { type: 'date', default: () => new Date() },
  },
};

export const PaginationMetadataSchema: Realm.ObjectSchema = {
  name: 'PaginationMetadata',
  primaryKey: 'key',
  properties: {
    key: 'string',
    value: 'string?',
    updatedAt: { type: 'date', default: () => new Date() },
  },
};

export type ZellerCustomer = {
  id: string;
  name: string | null;
  email: string | null;
  role: string | null;
};
