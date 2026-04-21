import { useState } from 'react';
import { useApp } from '../hooks/useApp';

export default function StudentForm({ roomId }) {
  const { createStudent, loading } = useApp();
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    notes: '',
  });
  const [localError, setLocalError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setLocalError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLocalError('');
    setSuccess('');

    if (!formData.name.trim()) {
      setLocalError('กรุณาระบุชื่อนักเรียน');
      return;
    }

    try {
      createStudent({
        roomId,
        name: formData.name.trim(),
        age: formData.age ? parseInt(formData.age) : 0,
        notes: formData.notes.trim(),
      });
      setSuccess('เพิ่มนักเรียนสำเร็จ!');
      setFormData({ name: '', age: '', notes: '' });
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setLocalError(err || 'เพิ่มนักเรียนไม่สำเร็จ');
    }
  };

  return (
    <div className="card max-w-md">
      <h2 className="text-xl font-semibold mb-4">เพิ่มนักเรียนใหม่</h2>

      {localError && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
          {localError}
        </div>
      )}

      {success && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg text-sm">
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="form-group">
          <label className="form-label">ชื่อ-นามสกุล *</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="เช่น สมชาย ใจดี"
            className="form-input"
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label className="form-label">อายุ</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            placeholder="เช่น 9"
            min="0"
            max="18"
            className="form-input"
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label className="form-label">หมายเหตุ</label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            placeholder="หมายเหตุ (ไม่บังคับ)"
            rows="2"
            className="form-input"
            disabled={loading}
          />
        </div>

        <button
          type="submit"
          className="btn-primary w-full disabled:opacity-50"
          disabled={loading}
        >
          {loading ? 'กำลังเพิ่ม...' : 'เพิ่มนักเรียน'}
        </button>
      </form>
    </div>
  );
}
