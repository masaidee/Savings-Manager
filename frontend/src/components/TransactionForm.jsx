import { useState } from 'react';
import { useApp } from '../hooks/useApp';

export default function TransactionForm({ childId, onSuccess }) {
  const { createTransaction, loading, selectedChild } = useApp();
  const [formData, setFormData] = useState({
    type: 'deposit',
    amount: '',
    notes: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      setError('Please enter a valid amount');
      return;
    }

    try {
      await createTransaction({
        childId,
        type: formData.type,
        amount: parseFloat(formData.amount),
        notes: formData.notes.trim(),
      });

      setSuccess(`${formData.type === 'deposit' ? 'Deposit' : 'Withdrawal'} recorded successfully!`);
      setFormData({ type: 'deposit', amount: '', notes: '' });
      setTimeout(() => setSuccess(''), 3000);
      if (onSuccess) onSuccess();
    } catch (err) {
      setError(err || 'Failed to record transaction');
    }
  };

  return (
    <div className="card max-w-md">
      <h2 className="text-xl font-semibold mb-4">Record Transaction</h2>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
          {error}
        </div>
      )}

      {success && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg text-sm">
          {success}
        </div>
      )}

      {selectedChild && (
        <div className="mb-4 p-3 bg-blue-50 text-blue-900 rounded-lg text-sm">
          Current Balance: <span className="font-semibold">{selectedChild.balance.toFixed(2)} ฿</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="form-group">
          <label className="form-label">Transaction Type</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="form-select"
            disabled={loading}
          >
            <option value="deposit">Deposit (Add Money)</option>
            <option value="withdrawal">Withdrawal (Take Out)</option>
          </select>
        </div>

        <div className="form-group">
          <label className="form-label">Amount (฿) *</label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            placeholder="e.g., 100"
            step="0.01"
            min="0"
            className="form-input"
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Notes</label>
          <input
            type="text"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            placeholder="e.g., Weekly allowance"
            className="form-input"
            disabled={loading}
          />
        </div>

        <button
          type="submit"
          className={`w-full py-2 rounded-lg font-medium transition-colors text-white disabled:opacity-50 ${
            formData.type === 'deposit'
              ? 'bg-green-600 hover:bg-green-700'
              : 'bg-orange-600 hover:bg-orange-700'
          }`}
          disabled={loading}
        >
          {loading ? 'Recording...' : 'Record Transaction'}
        </button>
      </form>
    </div>
  );
}
