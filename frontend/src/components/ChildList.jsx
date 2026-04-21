import { useApp } from '../hooks/useApp';

export default function ChildList({ onSelectChild }) {
  const { children, loading } = useApp();

  if (loading) {
    return <div className="text-center py-8">Loading children...</div>;
  }

  if (children.length === 0) {
    return (
      <div className="card text-center text-gray-500 py-12">
        <p>No children added yet. Create one to get started!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {children.map((child) => (
        <div
          key={child._id}
          className="card hover:shadow-lg transition-shadow cursor-pointer"
          onClick={() => onSelectChild(child._id)}
        >
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-lg font-semibold">{child.name}</h3>
              {child.age > 0 && (
                <p className="text-sm text-gray-500">Age: {child.age}</p>
              )}
            </div>
            <span className="badge badge-blue">
              {child.balance.toFixed(2)} ฿
            </span>
          </div>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Total Saved:</span>
              <span className="font-medium">{child.totalSaved.toFixed(2)} ฿</span>
            </div>
            {child.notes && (
              <div className="text-gray-500 italic">
                Note: {child.notes}
              </div>
            )}
          </div>

          <div className="mt-4 pt-4 border-t border-gray-200">
            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
              View Details →
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
