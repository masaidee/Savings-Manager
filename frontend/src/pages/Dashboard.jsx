import { useEffect } from 'react';
import { useApp } from '../hooks/useApp';
import ChildList from '../components/ChildList';
import ChildForm from '../components/ChildForm';
import Statistics from '../components/Statistics';

export default function Dashboard({ onSelectChild }) {
  const { loadChildren, loadStatistics } = useApp();

  useEffect(() => {
    loadChildren();
    loadStatistics();
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          Savings Dashboard
        </h1>
        <p className="text-gray-600">
          Track and manage your children's savings
        </p>
      </div>

      <Statistics />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-bold mb-6">Children</h2>
          <ChildList onSelectChild={onSelectChild} />
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-6">Add Child</h2>
          <ChildForm onSuccess={loadChildren} />
        </div>
      </div>
    </div>
  );
}
