import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Dashboard from './pages/Dashboard';
import RoomDetail from './pages/RoomDetail';
import StudentDetail from './pages/StudentDetail';
import Navigation from './components/Navigation';

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-gray-50">
          <Navigation />

          <main className="max-w-7xl mx-auto px-4 py-8">
            <Routes>
              {/* Dashboard / Home Screen */}
              <Route path="/" element={<Dashboard />} />

              {/* Room Detail Screen */}
              <Route path="/room/:roomId" element={<RoomDetail />} />

              {/* Student Detail Screen */}
              <Route path="/student/:studentId" element={<StudentDetail />} />

              {/* 404 Fallback */}
              <Route path="*" element={<Dashboard />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
