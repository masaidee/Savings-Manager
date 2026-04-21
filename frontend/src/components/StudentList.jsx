export default function StudentList({ students, onSelectStudent }) {
  if (students.length === 0) {
    return (
      <p className="text-gray-500 text-center py-8">
        ยังไม่มีนักเรียนในห้องนี้
      </p>
    );
  }

  return (
    <div className="space-y-3">
      {students.map((student) => (
        <div
          key={student._id}
          className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
          onClick={() => onSelectStudent(student._id)}
        >
          <div className="flex-1">
            <div className="flex items-center gap-3">
              <h3 className="font-semibold">{student.name}</h3>
              {student.age > 0 && (
                <span className="text-sm text-gray-500">อายุ {student.age} ปี</span>
              )}
            </div>
            {student.notes && (
              <p className="text-sm text-gray-500 mt-1">{student.notes}</p>
            )}
          </div>

          <div className="text-right">
            <div className="font-bold text-green-600">
              {student.balance.toFixed(2)} ฿
            </div>
            <div className="text-xs text-gray-500">
              ออมรวม {student.totalSaved.toFixed(2)} ฿
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
