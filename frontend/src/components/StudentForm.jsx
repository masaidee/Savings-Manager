import { useState } from 'react';
import { useApp } from '../hooks/useApp';

export default function StudentForm({ roomId }) {
  const { createStudent, loading } = useApp();
  const [formData, setFormData] = useState({
    name: '',
    studentNumber: '',
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
        studentNumber: formData.studentNumber ? parseInt(formData.studentNumber) : undefined,
        age: formData.age ? parseInt(formData.age) : 0,
        notes: formData.notes.trim(),
      });
      setSuccess('เพิ่มนักเรียนสำเร็จ!');
      setFormData({ name: '', studentNumber: '', age: '', notes: '' });
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setLocalError(err || 'เพิ่มนักเรียนไม่สำเร็จ');
    }
  };

  return (
    <div className="card max-w-md shadow-lg border border-blue-50">
      <h2 className="text-xl font-bold mb-5 flex items-center gap-2">
        <span className="text-blue-600">📝</span> ข้อมูลนักเรียน
      </h2>

      {localError && (
        <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-xl text-sm font-medium border border-red-100 animate-in fade-in zoom-in duration-200">
          ⚠️ {localError}
        </div>
      )}

      {success && (
        <div className="mb-4 p-3 bg-green-50 text-green-700 rounded-xl text-sm font-medium border border-green-100 animate-in fade-in zoom-in duration-200">
          ✅ {success}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-1">
            <label className="form-label text-xs uppercase tracking-wider font-bold text-gray-400">เลขที่</label>
            <input
              type="number"
              name="studentNumber"
              value={formData.studentNumber}
              onChange={handleChange}
              placeholder="1"
              min="1"
              className="form-input rounded-xl bg-gray-50 border-gray-100 focus:bg-white focus:ring-blue-500 transition-all"
              disabled={loading}
            />
          </div>
          <div className="col-span-2">
            <label className="form-label text-xs uppercase tracking-wider font-bold text-gray-400">ชื่อ-นามสกุล *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="สมชาย ใจดี"
              className="form-input rounded-xl bg-gray-50 border-gray-100 focus:bg-white focus:ring-blue-500 transition-all"
              disabled={loading}
            />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label text-xs uppercase tracking-wider font-bold text-gray-400">อายุ (ไม่บังคับ)</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            placeholder="9"
            min="0"
            max="18"
            className="form-input rounded-xl bg-gray-50 border-gray-100 focus:bg-white focus:ring-blue-500 transition-all"
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label className="form-label text-xs uppercase tracking-wider font-bold text-gray-400">หมายเหตุ</label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            placeholder="เช่น เบอร์โทรผู้ปกครอง หรือข้อมูลเพิ่มเติม"
            rows="2"
            className="form-input rounded-xl bg-gray-50 border-gray-100 focus:bg-white focus:ring-blue-500 transition-all"
            disabled={loading}
          />
        </div>

        <button
          type="submit"
          className="btn-primary w-full py-3 rounded-xl font-bold text-lg shadow-blue-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all disabled:opacity-50 disabled:translate-y-0 disabled:shadow-none"
          disabled={loading}
        >
          {loading ? 'กำลังบันทึก...' : 'บันทึกข้อมูลนักเรียน'}
        </button>
      </form>
    </div>
  );
}
