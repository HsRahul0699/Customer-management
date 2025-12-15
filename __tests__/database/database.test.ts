import databaseService, {
  ZellerCustomer,
} from '../../src/app/database/database';
import Realm from 'realm';
jest.mock('realm', () => ({
  open: jest.fn(),
  UpdateMode: {
    Modified: 'modified',
    All: 'all',
    Never: 'never',
  },
}));

describe('DatabaseService - Customers', () => {
  let mockRealm: any;

  beforeEach(async () => {
    jest.clearAllMocks();

    mockRealm = {
      objects: jest.fn(),
      objectForPrimaryKey: jest.fn(),
      create: jest.fn(),
      delete: jest.fn(),
      write: jest.fn(cb => cb()),
      close: jest.fn(),
    };

    (Realm.open as jest.Mock).mockResolvedValue(mockRealm);
    await databaseService.initialize();
  });

  afterEach(async () => {
    await databaseService.close();
  });

  it('initializes Realm', async () => {
    expect(Realm.open).toHaveBeenCalled();
  });

  it('saves a single customer', async () => {
    const customer: ZellerCustomer = {
      id: '1',
      name: 'Anand Kumar',
      email: 'anand@gmail.com',
      role: 'Admin',
    };

    const result = await databaseService.saveCustomer(customer);

    expect(result).toBe(true);
    expect(mockRealm.create).toHaveBeenCalled();
  });

  it('saves multiple customers', async () => {
    const customers: ZellerCustomer[] = [
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
    ];

    await databaseService.saveCustomers(customers);

    expect(mockRealm.create).toHaveBeenCalledTimes(2);
  });

  it('returns all customers', async () => {
    const mockData = [
      { id: '1', name: 'Anand Kumar', email: 'anand@gmail.com', role: 'Admin' },
      {
        id: '2',
        name: 'Bhavan Rao',
        email: 'bhavan@gmail.com',
        role: 'Manager',
      },
    ];

    mockRealm.objects.mockReturnValue({
      sorted: () => ({
        map: (cb: any) => mockData.map(cb),
      }),
    });

    const result = await databaseService.getAllCustomers();

    expect(result.length).toBe(2);
    expect(result[0].name).toBe('Anand Kumar');
  });

  it('deletes customer by id', async () => {
    const customer = { id: '1', name: 'Anand Kumar' };
    mockRealm.objectForPrimaryKey.mockReturnValue(customer);

    await databaseService.deleteCustomerById('1');

    expect(mockRealm.delete).toHaveBeenCalledWith(customer);
  });

  it('deletes all customers', async () => {
    const customers = [
      { id: '1', name: 'Anand Kumar' },
      { id: '2', name: 'Bhavan Rao' },
    ];

    mockRealm.objects.mockReturnValue(customers);

    await databaseService.deleteAllCustomers();

    expect(mockRealm.delete).toHaveBeenCalledWith(customers);
  });
});
