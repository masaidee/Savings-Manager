import { useState } from 'react';
import { useApp } from '../hooks/useApp';

export default function RoomForm({ onClose }) {
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
      setTimeout(() => {
        setSuccess('');
        onClose && onClose();
      }, 1500);
    } catch (err) {
      setLocalError(err || 'เพิ่มห้องเรียนไม่สำเร็จ');
    }
  };

  return (
    <div className="card bg-gradient-to-br from-blue-50 to-white border border-blue-100 sticky top-6">
      <div className="flex items-center justify-between mb-4 md:mb-5">
        <h2 className="text-base md:text-lg font-bold text-gray-900">📝 เพิ่มห้องเรียน</h2>
        {onClose && (
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
          >
            ×
          </button>
        )}
      </div>

      {localError && (
        <div className="mb-3 md:mb-4 p-2.5 md:p-3 bg-red-100 text-red-700 rounded-lg text-xs md:text-sm border border-red-200">
          {localError}
        </div>
      )}

      {success && (
        <div className="mb-3 md:mb-4 p-2.5 md:p-3 bg-green-100 text-green-700 rounded-lg text-xs md:text-sm border border-green-200">
          ✓ {success}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-3 md:space-y-4">
        <div>
          <label className="block text-xs md:text-sm font-semibold text-gray-700 mb-1.5 md:mb-2">
            ชื่อห้องเรียน <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="เช่น ป.3/1"
            className="w-full px-3 md:px-4 py-2 md:py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
            disabled={loading}
          />
        </div>

        <div>
          <label className="block text-xs md:text-sm font-semibold text-gray-700 mb-1.5 md:mb-2">
            รายละเอียด
          </label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="รายละเอียดเพิ่มเติม (ไม่บังคับ)"
            className="w-full px-3 md:px-4 py-2 md:py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
            disabled={loading}
          />
        </div>

        <div className="flex flex-col md:flex-row gap-2 md:gap-3 pt-1 md:pt-2">
          <button
            type="submit"
            className="flex-1 px-3 md:px-4 py-2.5 md:py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors duration-200 disabled:opacity-50 text-sm md:text-base"
            disabled={loading}
          >
            {loading ? 'กำลังเพิ่ม...' : 'เพิ่มห้องเรียน'}
          </button>
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="w-full md:w-auto px-3 md:px-4 py-2.5 md:py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold rounded-lg transition-colors duration-200 text-sm md:text-base"
              disabled={loading}
            >
              ยกเลิก
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
