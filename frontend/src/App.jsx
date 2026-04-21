import { useState } from 'react';
import { AppProvider } from './context/AppContext';
import Dashboard from './pages/Dashboard';
import RoomDetail from './pages/RoomDetail';
import StudentDetail from './pages/StudentDetail';
import Navigation from './components/Navigation';

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [selectedRoomId, setSelectedRoomId] = useState(null);
  const [selectedStudentId, setSelectedStudentId] = useState(null);

  const handleSelectRoom = (roomId) => {
    setSelectedRoomId(roomId);
    setCurrentPage('room');
  };

  const handleSelectStudent = (studentId) => {
    setSelectedStudentId(studentId);
    setCurrentPage('student');
  };

  const handleBackToDashboard = () => {
    setCurrentPage('dashboard');
    setSelectedRoomId(null);
    setSelectedStudentId(null);
  };

  const handleBackToRoom = () => {
    setCurrentPage('room');
    setSelectedStudentId(null);
  };

  return (
    <AppProvider>
      <div className="min-h-screen bg-gray-50">
        <Navigation currentPage={currentPage} onNavigate={handleBackToDashboard} />

        <main className="max-w-7xl mx-auto px-4 py-8">
          {currentPage === 'dashboard' && (
            <Dashboard onSelectRoom={handleSelectRoom} />
          )}
          {currentPage === 'room' && selectedRoomId && (
            <RoomDetail
              roomId={selectedRoomId}
              onBack={handleBackToDashboard}
              onSelectStudent={handleSelectStudent}
            />
          )}
          {currentPage === 'student' && selectedStudentId && (
            <StudentDetail
              studentId={selectedStudentId}
              onBack={handleBackToRoom}
            />
          )}
        </main>
      </div>
    </AppProvider>
  );
}

export default App;
