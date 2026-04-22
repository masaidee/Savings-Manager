import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import StudentForm from '../components/StudentForm';

export default function AddStudent() {
  const navigate = useNavigate();
  const { roomId } = useParams();
  const [showTips, setShowTips] = useState(false);

  return (
    <div className="space-y-6 md:space-y-8 animate-in slide-in-from-right duration-300">
      {/* Header Section */}
      <div className="space-y-2 md:space-y-3">
        <button
          onClick={() => navigate(`/room/${roomId}`)}
          className="group flex items-center text-blue-600 hover:text-blue-700 mb-3 font-medium transition-all text-sm md:text-base"
        >
          <span className="mr-1 group-hover:-translate-x-1 transition-transform">←</span> กลับห้องเรียน
        </button>
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-gray-900 tracking-tight">
          📝 เพิ่มนักเรียนใหม่
        </h1>
        <p className="text-sm md:text-base text-gray-600">
          กรุณากรอกข้อมูลของนักเรียน
        </p>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        {/* Form Section */}
        <div className="lg:col-span-2">
          <div className="card border-0 shadow-md">
            <StudentForm roomId={roomId} onClose={() => navigate(`/room/${roomId}`)} />
          </div>
        </div>

        {/* Tips Section - Desktop Only */}
        <div className="hidden lg:block">
          <div className="card bg-gradient-to-br from-green-50 to-white border border-green-100 sticky top-24">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="text-2xl">💡</span> เคล็ดลับ
            </h3>
            <ul className="space-y-3 text-sm text-gray-600">
              <li className="flex gap-2">
                <span className="text-green-600 font-bold">•</span>
                <span>ระบุเลขที่ให้ถูกต้องเพื่อง่ายต่อการจัดเรียง</span>
              </li>
              <li className="flex gap-2">
                <span className="text-green-600 font-bold">•</span>
                <span>สามารถใส่เบอร์ติดต่อผู้ปกครองในช่องหมายเหตุ</span>
              </li>
              <li className="flex gap-2">
                <span className="text-green-600 font-bold">•</span>
                <span>เพิ่มเสร็จแล้วสามารถบันทึกรายการออมได้ทันที</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Mobile Tips Section - Below Form */}
      <div className="lg:hidden">
        <button
          onClick={() => setShowTips(!showTips)}
          className="w-full px-4 py-3 bg-green-50 hover:bg-green-100 border border-green-200 rounded-lg font-semibold text-green-600 transition-colors flex items-center justify-between"
        >
          <span className="flex items-center gap-2">
            <span>💡</span> เคล็ดลับ
          </span>
          <span className={`text-xl transition-transform ${showTips ? 'rotate-180' : ''}`}>
            ▼
          </span>
        </button>

        {showTips && (
          <div className="mt-3 p-4 bg-gradient-to-br from-green-50 to-white border border-green-100 rounded-lg animate-in fade-in slide-in-from-top duration-200">
            <ul className="space-y-3 text-sm text-gray-600">
              <li className="flex gap-2">
                <span className="text-green-600 font-bold">•</span>
                <span>ระบุเลขที่ให้ถูกต้องเพื่อง่ายต่อการจัดเรียง</span>
              </li>
              <li className="flex gap-2">
                <span className="text-green-600 font-bold">•</span>
                <span>สามารถใส่เบอร์ติดต่อผู้ปกครองในช่องหมายเหตุ</span>
              </li>
              <li className="flex gap-2">
                <span className="text-green-600 font-bold">•</span>
                <span>เพิ่มเสร็จแล้วสามารถบันทึกรายการออมได้ทันที</span>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
