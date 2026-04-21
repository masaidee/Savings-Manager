import { useState } from 'react';
import { useApp } from '../hooks/useApp';

export default function RoomForm() {
  const { createRoom, loading } = useApp();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
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
      setLocalError('กรุณาระบุชื่อห้องเรียน');
      return;
    }

    try {
      createRoom({
        name: formData.name.trim(),
        description: formData.description.trim(),
      });
      setSuccess('เพิ่มห้องเรียนสำเร็จ!');
      setFormData({ name: '', description: '' });
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setLocalError(err || 'เพิ่มห้องเรียนไม่สำเร็จ');
    }
  };

  return (
    <div className="card max-w-md">
      <h2 className="text-xl font-semibold mb-4">เพิ่มห้องเรียนใหม่</h2>

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
          <label className="form-label">ชื่อห้องเรียน *</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="เช่น ป.3/1"
            className="form-input"
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label className="form-label">รายละเอียด</label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="รายละเอียดเพิ่มเติม (ไม่บังคับ)"
            className="form-input"
            disabled={loading}
          />
        </div>

        <button
          type="submit"
          className="btn-primary w-full disabled:opacity-50"
          disabled={loading}
        >
          {loading ? 'กำลังเพิ่ม...' : 'เพิ่มห้องเรียน'}
        </button>
      </form>
    </div>
  );
}
