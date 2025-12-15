jest.mock('realm', () => {
  const mockRealmInstance = {
    objects: jest.fn(),
    objectForPrimaryKey: jest.fn(),
    create: jest.fn(),
    delete: jest.fn(),
    write: jest.fn(cb => cb()),
    close: jest.fn(),
  };

  return {
    __esModule: true,
    default: {
      open: jest.fn(() => Promise.resolve(mockRealmInstance)),
    },
    UpdateMode: {
      Modified: 'modified',
    },
  };
});
