import { useNavigate } from 'react-router-dom';

export default function StudentList({ students }) {
  const navigate = useNavigate();

  if (students.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-8 md:py-12 text-gray-400 bg-gray-50 rounded-lg md:rounded-2xl border-2 border-dashed border-gray-100">
        <span className="text-4xl md:text-5xl mb-2 md:mb-4">👥</span>
        <p className="text-sm md:text-lg font-medium">ยังไม่มีนักเรียนในห้องนี้</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-3 md:gap-4">
      {students.map((student) => (
        <div
          key={student._id}
          className="flex items-center justify-between p-3 md:p-4 bg-white border border-gray-100 rounded-lg md:rounded-2xl shadow-sm hover:shadow-md hover:border-blue-100 transition-all cursor-pointer group relative overflow-hidden"
          onClick={() => navigate(`/student/${student._id}`)}
        >
          {/* Student Number Badge */}
          <div className="absolute top-0 left-0 bg-gray-50 text-gray-400 px-1.5 md:px-2 py-0.5 md:py-1 text-[8px] md:text-[10px] font-bold rounded-br-lg border-b border-r border-gray-100 group-hover:bg-blue-50 group-hover:text-blue-400 transition-colors">
            #{student.studentNumber || '-'}
          </div>

          <div className="flex-1 mt-1 md:mt-2 min-w-0">
            <div className="flex items-center gap-2 md:gap-3">
              <h3 className="font-bold text-gray-800 group-hover:text-blue-600 transition-colors text-sm md:text-base truncate">
                {student.name}
              </h3>
            </div>
            <div className="flex items-center gap-1.5 md:gap-2 mt-1 flex-wrap">
               {student.age > 0 && (
                <span className="text-[8px] md:text-[10px] font-bold px-1.5 md:px-2 py-0.5 bg-gray-100 text-gray-500 rounded-full flex-shrink-0">
                  {student.age} ปี
                </span>
              )}
              {student.notes && (
                <p className="text-[8px] md:text-[10px] text-gray-400 line-clamp-1 italic">
                  {student.notes}
                </p>
              )}
            </div>
          </div>

          <div className="text-right ml-2 md:ml-4 flex-shrink-0">
            <div className="text-lg md:text-xl font-black text-green-600 leading-none break-words">
              {student.balance.toLocaleString('th-TH', { minimumFractionDigits: 2 })}
            </div>
            <div className="text-[8px] md:text-[9px] uppercase font-bold text-gray-400 tracking-widest mt-0.5 md:mt-1">
              ยอดคงเหลือ (฿)
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
