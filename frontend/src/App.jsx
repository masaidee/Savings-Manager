import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Dashboard from './pages/Dashboard';
import AddRoom from './pages/AddRoom';
import RoomDetail from './pages/RoomDetail';
import EditRoom from './pages/EditRoom';
import StudentDetail from './pages/StudentDetail';
import AddStudent from './pages/AddStudent';
import EditStudent from './pages/EditStudent';
import Navigation from './components/Navigation';

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-gray-50">
          <Navigation />

          <main className="max-w-7xl mx-auto px-3 py-4 md:px-4 md:py-8">
            <Routes>
              {/* Dashboard / Home Screen */}
              <Route path="/" element={<Dashboard />} />

              {/* Add Room Screen */}
              <Route path="/add-room" element={<AddRoom />} />

              {/* Room Detail Screen */}
              <Route path="/room/:roomId" element={<RoomDetail />} />

              {/* Edit Room Screen */}
              <Route path="/room/:roomId/edit" element={<EditRoom />} />

              {/* Add Student Screen */}
              <Route path="/room/:roomId/add-student" element={<AddStudent />} />

              {/* Student Detail Screen */}
              <Route path="/student/:studentId" element={<StudentDetail />} />

              {/* Edit Student Screen */}
              <Route path="/student/:studentId/edit" element={<EditStudent />} />

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
