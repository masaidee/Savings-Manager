import React, { createContext, useState, useCallback } from 'react';
import { childrenAPI, transactionsAPI, statisticsAPI } from '../services/api';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [children_data, setChildrenData] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [statistics, setStatistics] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedChild, setSelectedChild] = useState(null);

  // Load all children
  const loadChildren = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await childrenAPI.getAll();
      setChildrenData(response.data.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load children');
    } finally {
      setLoading(false);
    }
  }, []);

  // Load child details with transactions
  const loadChildDetails = useCallback(async (childId) => {
    try {
      setLoading(true);
      setError(null);
      const response = await childrenAPI.getById(childId);
      const childData = response.data.data;
      setSelectedChild(childData);
      setTransactions(childData.transactions || []);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load child details');
    } finally {
      setLoading(false);
    }
  }, []);

  // Load statistics
  const loadStatistics = useCallback(async () => {
    try {
      const response = await statisticsAPI.getAll();
      setStatistics(response.data.data);
    } catch (err) {
      console.error('Failed to load statistics:', err);
    }
  }, []);

  // Create child
  const createChild = useCallback(async (childData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await childrenAPI.create(childData);
      setChildrenData((prev) => [response.data.data, ...prev]);
      return response.data.data;
    } catch (err) {
      const errorMsg =
        err.response?.data?.message || 'Failed to create child';
      setError(errorMsg);
      throw errorMsg;
    } finally {
      setLoading(false);
    }
  }, []);

  // Update child
  const updateChild = useCallback(async (childId, childData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await childrenAPI.update(childId, childData);
      setChildrenData((prev) =>
        prev.map((c) => (c._id === childId ? response.data.data : c))
      );
      return response.data.data;
    } catch (err) {
      const errorMsg =
        err.response?.data?.message || 'Failed to update child';
      setError(errorMsg);
      throw errorMsg;
    } finally {
      setLoading(false);
    }
  }, []);

  // Delete child
  const deleteChild = useCallback(async (childId) => {
    try {
      setLoading(true);
      setError(null);
      await childrenAPI.delete(childId);
      setChildrenData((prev) => prev.filter((c) => c._id !== childId));
    } catch (err) {
      const errorMsg =
        err.response?.data?.message || 'Failed to delete child';
      setError(errorMsg);
      throw errorMsg;
    } finally {
      setLoading(false);
    }
  }, []);

  // Create transaction
  const createTransaction = useCallback(async (transactionData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await transactionsAPI.create(transactionData);

      // Update child balance in the list
      const childId = transactionData.childId;
      setChildrenData((prev) =>
        prev.map((c) =>
          c._id === childId ? { ...c, balance: response.data.data.childBalance } : c
        )
      );

      // Reload child details if viewing them
      if (selectedChild?._id === childId) {
        await loadChildDetails(childId);
      }

      return response.data.data;
    } catch (err) {
      const errorMsg =
        err.response?.data?.message || 'Failed to create transaction';
      setError(errorMsg);
      throw errorMsg;
    } finally {
      setLoading(false);
    }
  }, [selectedChild, loadChildDetails]);

  // Delete transaction
  const deleteTransaction = useCallback(async (transactionId) => {
    try {
      setLoading(true);
      setError(null);
      await transactionsAPI.delete(transactionId);

      // Reload transactions
      if (selectedChild) {
        await loadChildDetails(selectedChild._id);
      }
    } catch (err) {
      const errorMsg =
        err.response?.data?.message || 'Failed to delete transaction';
      setError(errorMsg);
      throw errorMsg;
    } finally {
      setLoading(false);
    }
  }, [selectedChild, loadChildDetails]);

  const value = {
    children: children_data,
    transactions,
    statistics,
    selectedChild,
    loading,
    error,
    setError,
    loadChildren,
    loadChildDetails,
    loadStatistics,
    createChild,
    updateChild,
    deleteChild,
    createTransaction,
    deleteTransaction,
    setSelectedChild,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
