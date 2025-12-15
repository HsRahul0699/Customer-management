import Realm from 'realm';
import {
  CustomerSchema,
  PaginationMetadataSchema,
  ZellerCustomer,
} from './models';

class DatabaseService {
  private realm: Realm | null = null;
  private readonly schemaVersion = 1;

  async initialize(): Promise<void> {
    try {
      this.realm = await Realm.open({
        schema: [CustomerSchema, PaginationMetadataSchema],
        schemaVersion: this.schemaVersion,
      });
    } catch (error) {
      console.error('Realm initialization error:', error);
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      throw new Error(`initialization failed: ${errorMessage}`);
    }
  }

  private getRealm(): Realm {
    if (!this.realm) {
      throw new Error('Database not initialized.');
    }
    return this.realm;
  }

  async saveCustomer(customer: ZellerCustomer): Promise<boolean> {
    try {
      const realm = this.getRealm();
      realm.write(() => {
        realm.create(
          'Customer',
          {
            id: customer.id,
            name: customer.name || null,
            email: customer.email || null,
            role: customer.role || null,
            updatedAt: new Date(),
          },
          Realm.UpdateMode.Modified,
        );
      });
      return true;
    } catch (error) {
      console.error('Error saving customer:', error);
      return false;
    }
  }

  async saveCustomers(customers: ZellerCustomer[]): Promise<void> {
    try {
      const realm = this.getRealm();
      realm.write(() => {
        customers.forEach(customer => {
          realm.create(
            'Customer',
            {
              id: customer.id,
              name: customer.name || null,
              email: customer.email || null,
              role: customer.role || null,
              updatedAt: new Date(),
            },
            Realm.UpdateMode.Modified,
          );
        });
      });
    } catch (error) {
      console.error('Error saving customers:', error);
      throw error;
    }
  }

  async getAllCustomers(): Promise<ZellerCustomer[]> {
    try {
      const realm = this.getRealm();
      const customers = realm.objects('Customer');
      const sortedCustomers = customers.sorted('name');

      return sortedCustomers.map((customer: any) => ({
        id: customer.id,
        name: customer.name || null,
        email: customer.email || null,
        role: customer.role || null,
      }));
    } catch (error) {
      console.error('Error getting all customers:', error);
      return [];
    }
  }

  async deleteAllCustomers(): Promise<void> {
    try {
      const realm = this.getRealm();
      realm.write(() => {
        const customers = realm.objects('Customer');
        realm.delete(customers);
      });
    } catch (error) {
      console.error('Error deleting all customers:', error);
      throw error;
    }
  }

  async deleteCustomerById(id: string): Promise<void> {
    try {
      const realm = this.getRealm();
      realm.write(() => {
        const customer = realm.objectForPrimaryKey('Customer', id);
        if (customer) {
          realm.delete(customer);
        }
      });
    } catch (error) {
      console.error('Error deleting customer:', error);
      throw error;
    }
  }

  async saveNextToken(nextToken: string | null): Promise<void> {
    try {
      const realm = this.getRealm();
      realm.write(() => {
        realm.create(
          'PaginationMetadata',
          {
            key: 'nextToken',
            value: nextToken || null,
            updatedAt: new Date(),
          },
          Realm.UpdateMode.Modified,
        );
      });
    } catch (error) {
      console.error('Error saving nextToken:', error);
      throw error;
    }
  }

  async getNextToken(): Promise<string | null> {
    try {
      const realm = this.getRealm();
      const metadata = realm.objectForPrimaryKey(
        'PaginationMetadata',
        'nextToken',
      );
      return (metadata as any)?.value || null;
    } catch (error) {
      console.error('Error getting nextToken:', error);
      return null;
    }
  }

  async clearNextToken(): Promise<void> {
    try {
      const realm = this.getRealm();
      realm.write(() => {
        const metadata = realm.objectForPrimaryKey(
          'PaginationMetadata',
          'nextToken',
        );
        if (metadata) {
          realm.delete(metadata);
        }
      });
    } catch (error) {
      console.error('Error clearing nextToken:', error);
      throw error;
    }
  }

  async close(): Promise<void> {
    if (this.realm) {
      this.realm.close();
      this.realm = null;
    }
  }
}

const databaseService = new DatabaseService();
export default databaseService;
export type { ZellerCustomer };
