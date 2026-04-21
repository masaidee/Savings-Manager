import { useApp } from '../hooks/useApp';

export default function Statistics() {
  const { statistics } = useApp();

  if (!statistics) {
    return null;
  }

  const { summary, topSavers, recentActivity } = statistics;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <div className="card">
        <div className="text-gray-600 text-sm font-medium">Total Children</div>
        <div className="text-3xl font-bold text-blue-600 mt-2">
          {summary.totalChildren}
        </div>
      </div>

      <div className="card">
        <div className="text-gray-600 text-sm font-medium">Total Saved</div>
        <div className="text-3xl font-bold text-green-600 mt-2">
          {summary.totalSaved.toFixed(2)} ฿
        </div>
      </div>

      <div className="card">
        <div className="text-gray-600 text-sm font-medium">Average Savings</div>
        <div className="text-3xl font-bold text-purple-600 mt-2">
          {summary.averageSavings.toFixed(2)} ฿
        </div>
      </div>

      <div className="card">
        <div className="text-gray-600 text-sm font-medium">Total Transactions</div>
        <div className="text-3xl font-bold text-indigo-600 mt-2">
          {summary.totalTransactions}
        </div>
      </div>
    </div>
  );
}
