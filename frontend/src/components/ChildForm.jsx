import { useState } from 'react';
import { useApp } from '../hooks/useApp';

export default function ChildForm({ onSuccess }) {
  const { createChild, loading, error } = useApp();
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    notes: '',
  });
  const [localError, setLocalError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setLocalError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError('');
    setSuccess('');

    if (!formData.name.trim()) {
      setLocalError('Child name is required');
      return;
    }

    try {
      await createChild({
        name: formData.name.trim(),
        age: formData.age ? parseInt(formData.age) : 0,
        notes: formData.notes.trim(),
      });
      setSuccess('Child added successfully!');
      setFormData({ name: '', age: '', notes: '' });
      setTimeout(() => setSuccess(''), 3000);
      if (onSuccess) onSuccess();
    } catch (err) {
      setLocalError(err || 'Failed to create child');
    }
  };

  const displayError = error || localError;

  return (
    <div className="card max-w-md">
      <h2 className="text-xl font-semibold mb-4">Add New Child</h2>

      {displayError && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
          {displayError}
        </div>
      )}

      {success && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg text-sm">
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="form-group">
          <label className="form-label">Child Name *</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g., John Doe"
            className="form-input"
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Age</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            placeholder="e.g., 8"
            min="0"
            max="18"
            className="form-input"
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Notes</label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            placeholder="Optional notes..."
            rows="3"
            className="form-input"
            disabled={loading}
          />
        </div>

        <button
          type="submit"
          className="btn-primary w-full disabled:opacity-50"
          disabled={loading}
        >
          {loading ? 'Adding...' : 'Add Child'}
        </button>
      </form>
    </div>
  );
}
