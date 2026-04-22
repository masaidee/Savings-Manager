import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import RoomForm from '../components/RoomForm';

export default function AddRoom() {
  const navigate = useNavigate();
  const [showTips, setShowTips] = useState(false);

  return (
    <div className="space-y-6 md:space-y-8 animate-in slide-in-from-right duration-300">
      {/* Header Section */}
      <div className="space-y-2 md:space-y-3">
        <button
          onClick={() => navigate('/')}
          className="group flex items-center text-blue-600 hover:text-blue-700 mb-3 font-medium transition-all text-sm md:text-base"
        >
          <span className="mr-1 group-hover:-translate-x-1 transition-transform">←</span> กลับ Dashboard
        </button>
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-gray-900 tracking-tight">
          📝 เพิ่มห้องเรียนใหม่
        </h1>
        <p className="text-sm md:text-base text-gray-600">
          กรุณากรอกข้อมูลห้องเรียนของคุณ
        </p>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        {/* Form Section */}
        <div className="lg:col-span-2">
          <div className="card border-0 shadow-md">
            <RoomForm onClose={() => navigate('/')} />
          </div>
        </div>

        {/* Tips Section - Desktop Only */}
        <div className="hidden lg:block">
          <div className="card bg-gradient-to-br from-blue-50 to-white border border-blue-100 sticky top-24">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="text-2xl">💡</span> เคล็ดลับ
            </h3>
            <ul className="space-y-3 text-sm text-gray-600">
              <li className="flex gap-2">
                <span className="text-blue-600 font-bold">•</span>
                <span>ใช้ชื่อห้องที่ชัดเจน เช่น ป.3/1, ป.4/A</span>
              </li>
              <li className="flex gap-2">
                <span className="text-blue-600 font-bold">•</span>
                <span>เพิ่มรายละเอียด (ครู, ห้อง) เพื่อจำแนกง่าย</span>
              </li>
              <li className="flex gap-2">
                <span className="text-blue-600 font-bold">•</span>
                <span>คุณสามารถแก้ไขข้อมูลห้องได้ในภายหลัง</span>
              </li>
              <li className="flex gap-2">
                <span className="text-blue-600 font-bold">•</span>
                <span>หลังเพิ่มห้องสำเร็จ คุณจะเพิ่มนักเรียนได้</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Mobile Tips Section - Below Form */}
      <div className="lg:hidden">
        <button
          onClick={() => setShowTips(!showTips)}
          className="w-full px-4 py-3 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg font-semibold text-blue-600 transition-colors flex items-center justify-between"
        >
          <span className="flex items-center gap-2">
            <span>💡</span> เคล็ดลับ
          </span>
          <span className={`text-xl transition-transform ${showTips ? 'rotate-180' : ''}`}>
            ▼
          </span>
        </button>

        {showTips && (
          <div className="mt-3 p-4 bg-gradient-to-br from-blue-50 to-white border border-blue-100 rounded-lg animate-in fade-in slide-in-from-top duration-200">
            <ul className="space-y-3 text-sm text-gray-600">
              <li className="flex gap-2">
                <span className="text-blue-600 font-bold">•</span>
                <span>ใช้ชื่อห้องที่ชัดเจน เช่น ป.3/1, ป.4/A</span>
              </li>
              <li className="flex gap-2">
                <span className="text-blue-600 font-bold">•</span>
                <span>เพิ่มรายละเอียด (ครู, ห้อง) เพื่อจำแนกง่าย</span>
              </li>
              <li className="flex gap-2">
                <span className="text-blue-600 font-bold">•</span>
                <span>คุณสามารถแก้ไขข้อมูลห้องได้ในภายหลัง</span>
              </li>
              <li className="flex gap-2">
                <span className="text-blue-600 font-bold">•</span>
                <span>หลังเพิ่มห้องสำเร็จ คุณจะเพิ่มนักเรียนได้</span>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
