import { useApp } from '../hooks/useApp';

export default function DashboardStats() {
  const { dashboard } = useApp();

  if (!dashboard) {
    return (
      <div className="flex gap-4 overflow-x-auto pb-2 md:grid md:grid-cols-2 lg:grid-cols-4 md:gap-6 mb-6 md:mb-8">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="min-w-[220px] md:min-w-0 card bg-white animate-pulse h-24 rounded-2xl border border-gray-100"
          />
        ))}
      </div>
    );
  }

  const stats = [
    {
      label: 'จำนวนห้องเรียน',
      value: dashboard.totalRooms,
      icon: '🏫',
      color: 'text-blue-600',
      bg: 'bg-blue-50',
    },
    {
      label: 'จำนวนนักเรียน',
      value: dashboard.totalStudents,
      icon: '👥',
      color: 'text-indigo-600',
      bg: 'bg-indigo-50',
    },
    {
      label: 'ยอดออมรวม',
      value: `${dashboard.totalSaved.toLocaleString('th-TH', {
        minimumFractionDigits: 2,
      })} ฿`,
      icon: '💰',
      color: 'text-green-600',
      bg: 'bg-green-50',
    },
    {
      label: 'เฉลี่ยต่อคน',
      value: `${dashboard.averageSavings.toLocaleString('th-TH', {
        minimumFractionDigits: 2,
      })} ฿`,
      icon: '📈',
      color: 'text-purple-600',
      bg: 'bg-purple-50',
    },
  ];

  return (
    <div className="mb-6 md:mb-8">

      {/* 🔷 Mobile: Horizontal Scroll */}
      <div className="flex gap-4 overflow-x-auto pb-2 md:hidden snap-x snap-mandatory">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="min-w-[240px] snap-start bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4"
          >
            <div className={`${stat.bg} ${stat.color} w-12 h-12 rounded-xl flex items-center justify-center text-2xl`}>
              {stat.icon}
            </div>

            <div className="min-w-0">
              <div className="text-gray-400 text-xs font-bold uppercase tracking-widest truncate">
                {stat.label}
              </div>
              <div className={`text-lg font-black ${stat.color}`}>
                {stat.value}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 🔷 Desktop: Grid */}
      <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="card bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex items-center gap-4"
          >
            <div className={`${stat.bg} ${stat.color} w-12 h-12 rounded-xl flex items-center justify-center text-2xl shadow-inner`}>
              {stat.icon}
            </div>

            <div>
              <div className="text-gray-400 text-xs font-bold uppercase tracking-widest">
                {stat.label}
              </div>
              <div className={`text-xl font-black ${stat.color} mt-0.5`}>
                {stat.value}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}