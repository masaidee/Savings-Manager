import { useEffect } from 'react';
import { useApp } from '../hooks/useApp';
import TransactionForm from '../components/TransactionForm';

export default function ChildDetail({ childId, onBack }) {
  const { loadChildDetails, selectedChild, transactions, deleteTransaction } =
    useApp();

  useEffect(() => {
    loadChildDetails(childId);
  }, [childId]);

  if (!selectedChild) {
    return <div className="text-center py-8">Loading...</div>;
  }

  const handleDeleteTransaction = async (transactionId) => {
    if (confirm('Are you sure you want to delete this transaction?')) {
      try {
        await deleteTransaction(transactionId);
      } catch (error) {
        alert('Failed to delete transaction: ' + error);
      }
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <button
            onClick={onBack}
            className="text-blue-600 hover:text-blue-700 mb-4 font-medium"
          >
            ← Back to Dashboard
          </button>
          <h1 className="text-4xl font-bold text-gray-900">
            {selectedChild.name}
          </h1>
          {selectedChild.age > 0 && (
            <p className="text-gray-600 text-lg">Age: {selectedChild.age}</p>
          )}
        </div>
        <div className="card bg-gradient-to-br from-blue-50 to-blue-100 text-center">
          <p className="text-gray-600 text-sm">Current Balance</p>
          <p className="text-4xl font-bold text-blue-600 mt-2">
            {selectedChild.balance.toFixed(2)} ฿
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="card">
            <h2 className="text-2xl font-bold mb-6">Transaction History</h2>

            {transactions.length === 0 ? (
              <p className="text-gray-500 text-center py-8">
                No transactions yet
              </p>
            ) : (
              <div className="space-y-3">
                {transactions.map((transaction) => (
                  <div
                    key={transaction._id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <span
                          className={`badge ${
                            transaction.type === 'deposit'
                              ? 'badge-green'
                              : 'badge-red'
                          }`}
                        >
                          {transaction.type.charAt(0).toUpperCase() +
                            transaction.type.slice(1)}
                        </span>
                        <span className="font-medium">
                          {transaction.amount.toFixed(2)} ฿
                        </span>
                      </div>
                      {transaction.notes && (
                        <p className="text-sm text-gray-600">
                          {transaction.notes}
                        </p>
                      )}
                      <p className="text-xs text-gray-500">
                        {new Date(transaction.date).toLocaleDateString()} at{' '}
                        {new Date(transaction.date).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </p>
                    </div>
                    <button
                      onClick={() => handleDeleteTransaction(transaction._id)}
                      className="ml-4 text-red-600 hover:text-red-700 text-sm font-medium"
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-6">Record Transaction</h2>
          <TransactionForm childId={childId} onSuccess={() => {}} />

          {selectedChild.notes && (
            <div className="card mt-6">
              <h3 className="font-semibold mb-2">Notes</h3>
              <p className="text-gray-700">{selectedChild.notes}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
