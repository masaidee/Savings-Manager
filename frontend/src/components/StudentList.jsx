import { useNavigate } from 'react-router-dom';

export default function StudentList({ students }) {
  const navigate = useNavigate();

  if (students.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-gray-400">
        <span className="text-5xl mb-4">👥</span>
        <p className="text-lg">ยังไม่มีนักเรียนในห้องนี้</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {students.map((student) => (
        <div
          key={student._id}
          className="flex items-center justify-between p-5 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md hover:border-blue-100 transition-all cursor-pointer group"
          onClick={() => navigate(`/student/${student._id}`)}
        >
          <div className="flex-1">
            <div className="flex items-center gap-3">
              <h3 className="font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
                {student.name}
              </h3>
              {student.age > 0 && (
                <span className="text-xs font-semibold px-2 py-0.5 bg-gray-100 text-gray-500 rounded-full">
                  อายุ {student.age} ปี
                </span>
              )}
            </div>
            {student.notes && (
              <p className="text-xs text-gray-400 mt-1 line-clamp-1 italic">
                "{student.notes}"
              </p>
            )}
          </div>

          <div className="text-right">
            <div className="text-lg font-black text-green-600">
              {student.balance.toLocaleString('th-TH', { minimumFractionDigits: 2 })} ฿
            </div>
            <div className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">
              สะสมทั้งหมด
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
