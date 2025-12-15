import { useApolloClient } from '@apollo/client/react';
import {
  FilterType,
  Customer,
  ListCustomersResponse,
} from '../types/customerTypes';
import { useEffect, useState, useCallback, useRef } from 'react';
import databaseService, { ZellerCustomer } from '../../database/database';
import { gql } from '@apollo/client';
import { LIST_ZELLER_CUSTOMERS } from '../../graphql/queries';

export const useCustomers = (filter: FilterType, searchQuery: string) => {
  const client = useApolloClient();
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [nextToken, setNextToken] = useState<string | null>(null);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [loadingInitial, setLoadingInitial] = useState<boolean>(false);
  const isFetchingMore = useRef<boolean>(false);
  const isFilterChanging = useRef<boolean>(false);
  const [isFirstTime, setIsFirstTime] = useState<boolean>(true);
  const [isDbInitialized, setIsDbInitialized] = useState<boolean>(false);
  useEffect(() => {
    setLoadingInitial(true);
    initializeDatabase();
  }, []);

  useEffect(() => {
    if (!isDbInitialized) return;

    isFilterChanging.current = true;

    const filterCustomers = async () => {
      if (filter === 'All') {
        const dbCustomers = await databaseService.getAllCustomers();
        const savedNextToken = await databaseService.getNextToken();

        if (dbCustomers.length === 0 || isFirstTime) {
          setLoadingInitial(true);
          setCustomers([]);
          setNextToken(null);
          fetchCustomers(false);
        } else {
          setCustomers(dbCustomers as Customer[]);
          setNextToken(savedNextToken);
        }
      } else {
        const dbCustomers = await databaseService.getAllCustomers();
        const filteredCustomers = dbCustomers.filter(
          customer => customer.role?.toLowerCase() === filter.toLowerCase(),
        );
        setCustomers(filteredCustomers);
      }

      setTimeout(() => {
        isFilterChanging.current = false;
      }, 500);
    };

    filterCustomers();
  }, [filter, isDbInitialized]);
  const initializeDatabase = async () => {
    await databaseService.initialize();
    const dbCustomers = await databaseService.getAllCustomers();
    setCustomers(dbCustomers);
    const savedNextToken = await databaseService.getNextToken();
    setNextToken(savedNextToken);
    setIsDbInitialized(true);
    setLoadingInitial(false);
  };

  const fetchCustomers = async (loadMore: boolean = false) => {
    if (loadMore) {
      setLoadingMore(true);
    } else {
      setLoadingInitial(true);
    }

    try {
      const customerResponse = await client.query<ListCustomersResponse>({
        query: gql(LIST_ZELLER_CUSTOMERS),
        variables: {
          filter: undefined,
          limit: 2,
          nextToken: loadMore ? nextToken : undefined,
        },
      });
      console.log('customerResponse', customerResponse, filter, searchQuery);
      const items = customerResponse?.data?.listZellerCustomers.items || [];
      const token = customerResponse?.data?.listZellerCustomers.nextToken;

      if (items.length > 0) {
        if (!loadMore) {
          await databaseService.deleteAllCustomers();
          await databaseService.saveCustomers(items as ZellerCustomer[]);
          const localCustomers = await databaseService.getAllCustomers();

          if (filter !== 'All') {
            const filteredCustomers = localCustomers.filter(
              customer => customer.role?.toLowerCase() === filter.toLowerCase(),
            );
            setCustomers(filteredCustomers as Customer[]);
          } else {
            setCustomers(localCustomers as Customer[]);
          }
          setLoadingInitial(false);
        } else {
          const updatedCustomerList = [...customers, ...(items as Customer[])];
          await databaseService.saveCustomers(
            updatedCustomerList as ZellerCustomer[],
          );
          const localCustomers = await databaseService.getAllCustomers();
          if (filter !== 'All') {
            const filteredCustomers = localCustomers.filter(
              customer => customer.role?.toLowerCase() === filter.toLowerCase(),
            );
            setCustomers(filteredCustomers as Customer[]);
          } else {
            setCustomers(localCustomers as Customer[]);
          }
        }
      }

      if (token) {
        setNextToken(token);
        await databaseService.saveNextToken(token);
      } else {
        setNextToken(null);
      }
      setLoadingMore(false);
      setLoadingInitial(false);
    } catch (error) {
      console.error('Error fetching customers:', error);
    } finally {
      setIsFirstTime(false);
      setLoadingInitial(false);
      setLoadingMore(false);
    }
  };

  const loadMoreCustomers = () => {
    console.log('loadMoreCustomers!!!', nextToken, loadingMore, loadingInitial);
    if (!nextToken) return;
    if (loadingMore || loadingInitial) return;
    if (isFetchingMore.current) return;
    if (isFilterChanging.current) {
      return;
    }

    isFetchingMore.current = true;

    fetchCustomers(true).finally(() => {
      isFetchingMore.current = false;
    });
  };

  const handleRefresh = () => {
    setLoadingInitial(true);
    setCustomers([]);
    setNextToken(null);
    fetchCustomers(false);
  };
  const addCustomer = useCallback(
    async (customer: Customer): Promise<Customer | null> => {
      try {
        const addedSuccessfully = await databaseService.saveCustomer(
          customer as ZellerCustomer,
        );
        if (!addedSuccessfully) {
          console.error('Failed to save customer to database');
          return null;
        }

        if (
          filter === 'All' ||
          customer.role?.toUpperCase() === filter.toUpperCase()
        ) {
          setCustomers(prev => {
            const updatedCustomers = [customer, ...prev];
            return updatedCustomers;
          });
        } else {
          console.log('Customer added but not visible in current filter');
        }

        return customer;
      } catch (error) {
        console.error('Error adding customer:', error);
        return null;
      }
    },
    [filter],
  );

  const updateCustomer = useCallback(
    async (customer: Customer): Promise<Customer | null> => {
      try {
        const updatedSuccessfully = await databaseService.saveCustomer(
          customer as ZellerCustomer,
        );
        if (!updatedSuccessfully) {
          console.error('Failed to update customer in database');
          return null;
        }

        setCustomers(prev => {
          const updatedCustomers = prev.map(c =>
            c.id === customer.id ? customer : c,
          );
          return updatedCustomers;
        });

        const dbCustomers = await databaseService.getAllCustomers();
        if (filter === 'All') {
          setCustomers(dbCustomers as Customer[]);
        } else {
          const filteredCustomers = dbCustomers.filter(
            c => c.role?.toLowerCase() === filter.toLowerCase(),
          );
          setCustomers(filteredCustomers as Customer[]);
        }

        return customer;
      } catch (error) {
        console.error('Error updating customer:', error);
        return null;
      }
    },
    [filter],
  );

  const deleteCustomer = useCallback(
    async (customerId: string): Promise<boolean> => {
      try {
        await databaseService.deleteCustomerById(customerId);

        setCustomers(prev => prev.filter(c => c.id !== customerId));

        const dbCustomers = await databaseService.getAllCustomers();
        if (filter === 'All') {
          setCustomers(dbCustomers as Customer[]);
        } else {
          const filteredCustomers = dbCustomers.filter(
            c => c.role?.toLowerCase() === filter.toLowerCase(),
          );
          setCustomers(filteredCustomers as Customer[]);
        }

        return true;
      } catch (error) {
        console.error('Error deleting customer:', error);
        return false;
      }
    },
    [filter],
  );

  return {
    customers,
    loadingMore,
    loadMoreCustomers,
    loadingInitial,
    addCustomer,
    updateCustomer,
    deleteCustomer,
    handleRefresh,
  };
};
