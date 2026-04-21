import { useState, useEffect } from 'react';
import { AppProvider } from './context/AppContext';
import Dashboard from './pages/Dashboard';
import ChildDetail from './pages/ChildDetail';
import Navigation from './components/Navigation';

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [selectedChildId, setSelectedChildId] = useState(null);

  const handleSelectChild = (childId) => {
    setSelectedChildId(childId);
    setCurrentPage('detail');
  };

  const handleBackToDashboard = () => {
    setCurrentPage('dashboard');
    setSelectedChildId(null);
  };

  return (
    <AppProvider>
      <div className="min-h-screen bg-gray-50">
        <Navigation currentPage={currentPage} onNavigate={setCurrentPage} />

        <main className="max-w-7xl mx-auto px-4 py-8">
          {currentPage === 'dashboard' && (
            <Dashboard onSelectChild={handleSelectChild} />
          )}
          {currentPage === 'detail' && selectedChildId && (
            <ChildDetail
              childId={selectedChildId}
              onBack={handleBackToDashboard}
            />
          )}
        </main>
      </div>
    </AppProvider>
  );
}

export default App;
