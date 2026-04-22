import { useState } from 'react';
import { useApp } from '../hooks/useApp';

export default function SavingForm({ studentId }) {
   const { createSaving, loading, selectedStudent } = useApp();
   const [formData, setFormData] = useState({
      type: 'deposit',
      amount: '',
      notes: '',
   });
   const [error, setError] = useState('');
   const [success, setSuccess] = useState('');

   const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
      setError('');
   };

   const handleSubmit = (e) => {
      e.preventDefault();
      setError('');
      setSuccess('');

      if (!formData.amount || parseFloat(formData.amount) <= 0) {
         setError('กรุณาระบุจำนวนเงินที่ถูกต้อง');
         return;
      }

      try {
         createSaving({
            studentId,
            type: formData.type,
            amount: parseFloat(formData.amount),
            notes: formData.notes.trim(),
         });

         setSuccess(`${formData.type === 'deposit' ? 'ฝากเงิน' : 'ถอนเงิน'}สำเร็จ!`);
         setFormData({ type: 'deposit', amount: '', notes: '' });
         setTimeout(() => setSuccess(''), 3000);
      } catch (err) {
         setError(err || 'บันทึกรายการไม่สำเร็จ');
      }
   };

   return (
      <div className="card max-w-md w-full mx-auto md:mx-0">
         <h2 className="text-lg md:text-xl font-semibold mb-3 md:mb-4">บันทึกรายการ</h2>

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

         {selectedStudent && (
            <div className="mb-4 p-3 bg-blue-50 text-blue-900 rounded-lg text-sm">
               ยอดเงินคงเหลือ: <span className="font-semibold">{selectedStudent.balance.toFixed(2)} ฿</span>
            </div>
         )}

         <form onSubmit={handleSubmit} className="space-y-4">
            <div className="form-group">
               <label className="form-label">ประเภท</label>
               <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="form-select"
                  disabled={loading}
               >
                  <option value="deposit">💰 ฝากเงิน</option>
                  <option value="withdrawal">💸 ถอนเงิน</option>
               </select>
            </div>

            <div className="form-group">
               <label className="form-label">จำนวนเงิน (฿) *</label>
               <input
                  type="number"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  placeholder="เช่น 100"
                  step="0.01"
                  min="0"
                  className="form-input"
                  disabled={loading}
               />
            </div>

            <div className="form-group">
               <label className="form-label">หมายเหตุ</label>
               <input
                  type="text"
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  placeholder="เช่น ออมเงินประจำสัปดาห์"
                  className="form-input"
                  disabled={loading}
               />
            </div>

            <button
               type="submit"
               className={`w-full py-2 rounded-lg font-medium transition-colors text-white disabled:opacity-50 ${formData.type === 'deposit'
                     ? 'bg-green-600 hover:bg-green-700'
                     : 'bg-orange-600 hover:bg-orange-700'
                  }`}
               disabled={loading}
            >
               {loading ? 'กำลังบันทึก...' : 'บันทึกรายการ'}
            </button>
         </form>
      </div>
   );
}
