import React, { createContext, useState, useCallback } from 'react';

export const AppContext = createContext();

// localStorage keys
const STORAGE_KEYS = {
  ROOMS: 'savings_app_rooms',
  STUDENTS: 'savings_app_students',
  SAVINGS: 'savings_app_savings',
};

// Helper: generate unique ID
const generateId = () => '_' + Math.random().toString(36).substr(2, 9) + Date.now().toString(36);

// Helper: read from localStorage
const getStoredData = (key, fallback = []) => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : fallback;
  } catch {
    return fallback;
  }
};

// Helper: write to localStorage
const setStoredData = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const AppProvider = ({ children }) => {
  const [rooms, setRooms] = useState([]);
  const [students, setStudents] = useState([]);
  const [savings, setSavings] = useState([]);
  const [dashboard, setDashboard] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // ─── Rooms ───────────────────────────────────────────

  const loadRooms = useCallback(() => {
    try {
      setLoading(true);
      setError(null);
      const storedRooms = getStoredData(STORAGE_KEYS.ROOMS, []);
      const storedStudents = getStoredData(STORAGE_KEYS.STUDENTS, []);

      // Enrich rooms with studentCount and totalSaved
      const enriched = storedRooms.map((room) => {
        const roomStudents = storedStudents.filter((s) => s.roomId === room._id);
        return {
          ...room,
          studentCount: roomStudents.length,
          totalSaved: roomStudents.reduce((sum, s) => sum + s.balance, 0),
        };
      });

      setRooms(enriched);
    } catch (err) {
      setError('Failed to load rooms');
    } finally {
      setLoading(false);
    }
  }, []);

  const loadRoomDetails = useCallback((roomId) => {
    try {
      setLoading(true);
      setError(null);
      const storedRooms = getStoredData(STORAGE_KEYS.ROOMS, []);
      const storedStudents = getStoredData(STORAGE_KEYS.STUDENTS, []);

      const room = storedRooms.find((r) => r._id === roomId);
      if (!room) {
        setError('Room not found');
        return;
      }

      const roomStudents = storedStudents
        .filter((s) => s.roomId === roomId)
        .sort((a, b) => a.name.localeCompare(b.name));

      setSelectedRoom({
        ...room,
        students: roomStudents,
        studentCount: roomStudents.length,
        totalSaved: roomStudents.reduce((sum, s) => sum + s.balance, 0),
      });
      setStudents(roomStudents);
    } catch (err) {
      setError('Failed to load room details');
    } finally {
      setLoading(false);
    }
  }, []);

  const createRoom = useCallback((roomData) => {
    try {
      setLoading(true);
      setError(null);

      const stored = getStoredData(STORAGE_KEYS.ROOMS, []);

      // Check duplicate
      if (stored.some((r) => r.name.trim() === roomData.name.trim())) {
        throw 'ชื่อห้องนี้มีอยู่แล้ว';
      }

      const newRoom = {
        _id: generateId(),
        name: roomData.name.trim(),
        description: roomData.description || '',
        createdAt: new Date().toISOString(),
      };

      const updated = [newRoom, ...stored];
      setStoredData(STORAGE_KEYS.ROOMS, updated);
      setRooms(updated.map((r) => ({ ...r, studentCount: 0, totalSaved: 0 })));
      loadRooms();

      return newRoom;
    } catch (err) {
      const errorMsg = typeof err === 'string' ? err : 'Failed to create room';
      setError(errorMsg);
      throw errorMsg;
    } finally {
      setLoading(false);
    }
  }, [loadRooms]);

  const updateRoom = useCallback((roomId, roomData) => {
    try {
      setLoading(true);
      setError(null);

      const stored = getStoredData(STORAGE_KEYS.ROOMS, []);
      const index = stored.findIndex((r) => r._id === roomId);
      if (index === -1) throw 'Room not found';

      // Check duplicate name (exclude self)
      if (roomData.name && stored.some((r) => r._id !== roomId && r.name.trim() === roomData.name.trim())) {
        throw 'ชื่อห้องนี้มีอยู่แล้ว';
      }

      stored[index] = { ...stored[index], ...roomData };
      setStoredData(STORAGE_KEYS.ROOMS, stored);
      loadRooms();

      return stored[index];
    } catch (err) {
      const errorMsg = typeof err === 'string' ? err : 'Failed to update room';
      setError(errorMsg);
      throw errorMsg;
    } finally {
      setLoading(false);
    }
  }, [loadRooms]);

  const deleteRoom = useCallback((roomId) => {
    try {
      setLoading(true);
      setError(null);

      // Delete room
      const storedRooms = getStoredData(STORAGE_KEYS.ROOMS, []);
      setStoredData(STORAGE_KEYS.ROOMS, storedRooms.filter((r) => r._id !== roomId));

      // Delete students in room
      const storedStudents = getStoredData(STORAGE_KEYS.STUDENTS, []);
      const studentIds = storedStudents.filter((s) => s.roomId === roomId).map((s) => s._id);
      setStoredData(STORAGE_KEYS.STUDENTS, storedStudents.filter((s) => s.roomId !== roomId));

      // Delete savings of those students
      const storedSavings = getStoredData(STORAGE_KEYS.SAVINGS, []);
      setStoredData(STORAGE_KEYS.SAVINGS, storedSavings.filter((s) => !studentIds.includes(s.studentId)));

      loadRooms();
    } catch (err) {
      const errorMsg = 'Failed to delete room';
      setError(errorMsg);
      throw errorMsg;
    } finally {
      setLoading(false);
    }
  }, [loadRooms]);

  // ─── Students ────────────────────────────────────────

  const loadStudentDetails = useCallback((studentId) => {
    try {
      setLoading(true);
      setError(null);
      const storedStudents = getStoredData(STORAGE_KEYS.STUDENTS, []);
      const storedSavings = getStoredData(STORAGE_KEYS.SAVINGS, []);
      const storedRooms = getStoredData(STORAGE_KEYS.ROOMS, []);

      const student = storedStudents.find((s) => s._id === studentId);
      if (!student) {
        setError('Student not found');
        return;
      }

      const room = storedRooms.find((r) => r._id === student.roomId);
      const studentSavings = storedSavings
        .filter((s) => s.studentId === studentId)
        .sort((a, b) => new Date(b.date) - new Date(a.date));

      setSelectedStudent({
        ...student,
        roomName: room?.name || 'Unknown',
        savings: studentSavings,
      });
      setSavings(studentSavings);
    } catch (err) {
      setError('Failed to load student details');
    } finally {
      setLoading(false);
    }
  }, []);

  const createStudent = useCallback((studentData) => {
    try {
      setLoading(true);
      setError(null);

      const newStudent = {
        _id: generateId(),
        roomId: studentData.roomId,
        name: studentData.name.trim(),
        age: studentData.age || 0,
        notes: studentData.notes || '',
        balance: 0,
        totalSaved: 0,
        createdAt: new Date().toISOString(),
      };

      const stored = getStoredData(STORAGE_KEYS.STUDENTS, []);
      const updated = [newStudent, ...stored];
      setStoredData(STORAGE_KEYS.STUDENTS, updated);

      // Refresh room details if viewing
      if (selectedRoom?._id === studentData.roomId) {
        loadRoomDetails(studentData.roomId);
      }

      return newStudent;
    } catch (err) {
      const errorMsg = 'Failed to create student';
      setError(errorMsg);
      throw errorMsg;
    } finally {
      setLoading(false);
    }
  }, [selectedRoom, loadRoomDetails]);

  const updateStudent = useCallback((studentId, studentData) => {
    try {
      setLoading(true);
      setError(null);

      const stored = getStoredData(STORAGE_KEYS.STUDENTS, []);
      const index = stored.findIndex((s) => s._id === studentId);
      if (index === -1) throw 'Student not found';

      stored[index] = { ...stored[index], ...studentData };
      setStoredData(STORAGE_KEYS.STUDENTS, stored);

      if (selectedRoom) {
        loadRoomDetails(selectedRoom._id);
      }

      return stored[index];
    } catch (err) {
      const errorMsg = typeof err === 'string' ? err : 'Failed to update student';
      setError(errorMsg);
      throw errorMsg;
    } finally {
      setLoading(false);
    }
  }, [selectedRoom, loadRoomDetails]);

  const deleteStudent = useCallback((studentId) => {
    try {
      setLoading(true);
      setError(null);

      const storedStudents = getStoredData(STORAGE_KEYS.STUDENTS, []);
      setStoredData(STORAGE_KEYS.STUDENTS, storedStudents.filter((s) => s._id !== studentId));

      // Delete savings
      const storedSavings = getStoredData(STORAGE_KEYS.SAVINGS, []);
      setStoredData(STORAGE_KEYS.SAVINGS, storedSavings.filter((s) => s.studentId !== studentId));

      if (selectedRoom) {
        loadRoomDetails(selectedRoom._id);
      }
    } catch (err) {
      const errorMsg = 'Failed to delete student';
      setError(errorMsg);
      throw errorMsg;
    } finally {
      setLoading(false);
    }
  }, [selectedRoom, loadRoomDetails]);

  // ─── Savings ─────────────────────────────────────────

  const createSaving = useCallback((savingData) => {
    try {
      setLoading(true);
      setError(null);

      const amount = parseFloat(savingData.amount);
      const storedStudents = getStoredData(STORAGE_KEYS.STUDENTS, []);
      const studentIndex = storedStudents.findIndex((s) => s._id === savingData.studentId);
      if (studentIndex === -1) throw 'Student not found';

      const student = storedStudents[studentIndex];

      // Calculate new balance
      let newBalance;
      if (savingData.type === 'deposit') {
        newBalance = student.balance + amount;
      } else {
        if (student.balance < amount) throw 'ยอดเงินไม่เพียงพอ';
        newBalance = student.balance - amount;
      }

      const newTotalSaved =
        savingData.type === 'deposit' ? student.totalSaved + amount : student.totalSaved;

      // Create saving record
      const newSaving = {
        _id: generateId(),
        studentId: savingData.studentId,
        type: savingData.type,
        amount,
        notes: savingData.notes || '',
        date: new Date().toISOString(),
      };

      // Save saving
      const storedSavings = getStoredData(STORAGE_KEYS.SAVINGS, []);
      setStoredData(STORAGE_KEYS.SAVINGS, [newSaving, ...storedSavings]);

      // Update student balance
      storedStudents[studentIndex] = {
        ...student,
        balance: newBalance,
        totalSaved: newTotalSaved,
      };
      setStoredData(STORAGE_KEYS.STUDENTS, storedStudents);

      // Refresh selected student if viewing
      if (selectedStudent?._id === savingData.studentId) {
        loadStudentDetails(savingData.studentId);
      }

      return { ...newSaving, studentBalance: newBalance };
    } catch (err) {
      const errorMsg = typeof err === 'string' ? err : 'Failed to create saving';
      setError(errorMsg);
      throw errorMsg;
    } finally {
      setLoading(false);
    }
  }, [selectedStudent, loadStudentDetails]);

  const deleteSaving = useCallback((savingId) => {
    try {
      setLoading(true);
      setError(null);

      const storedSavings = getStoredData(STORAGE_KEYS.SAVINGS, []);
      const saving = storedSavings.find((s) => s._id === savingId);
      if (!saving) throw 'Saving not found';

      // Reverse balance
      const storedStudents = getStoredData(STORAGE_KEYS.STUDENTS, []);
      const studentIndex = storedStudents.findIndex((s) => s._id === saving.studentId);
      if (studentIndex !== -1) {
        const student = storedStudents[studentIndex];
        const newBalance =
          saving.type === 'deposit'
            ? student.balance - saving.amount
            : student.balance + saving.amount;
        const newTotalSaved =
          saving.type === 'deposit'
            ? student.totalSaved - saving.amount
            : student.totalSaved;

        storedStudents[studentIndex] = {
          ...student,
          balance: Math.max(0, newBalance),
          totalSaved: Math.max(0, newTotalSaved),
        };
        setStoredData(STORAGE_KEYS.STUDENTS, storedStudents);
      }

      // Remove saving
      setStoredData(STORAGE_KEYS.SAVINGS, storedSavings.filter((s) => s._id !== savingId));

      // Refresh selected student if viewing
      if (selectedStudent) {
        loadStudentDetails(selectedStudent._id);
      }
    } catch (err) {
      const errorMsg = typeof err === 'string' ? err : 'Failed to delete saving';
      setError(errorMsg);
      throw errorMsg;
    } finally {
      setLoading(false);
    }
  }, [selectedStudent, loadStudentDetails]);

  // ─── Dashboard ───────────────────────────────────────

  const loadDashboard = useCallback(() => {
    try {
      const storedRooms = getStoredData(STORAGE_KEYS.ROOMS, []);
      const storedStudents = getStoredData(STORAGE_KEYS.STUDENTS, []);
      const storedSavings = getStoredData(STORAGE_KEYS.SAVINGS, []);

      const totalRooms = storedRooms.length;
      const totalStudents = storedStudents.length;
      const totalSaved = storedStudents.reduce((sum, s) => sum + s.balance, 0);
      const averageSavings = totalStudents > 0 ? totalSaved / totalStudents : 0;
      const totalTransactions = storedSavings.length;

      // Top savers
      const topSavers = [...storedStudents]
        .sort((a, b) => b.balance - a.balance)
        .slice(0, 10)
        .map((s) => {
          const room = storedRooms.find((r) => r._id === s.roomId);
          return {
            _id: s._id,
            name: s.name,
            balance: s.balance,
            totalSaved: s.totalSaved,
            roomName: room?.name || 'Unknown',
          };
        });

      // Room summaries
      const roomSummaries = storedRooms.map((room) => {
        const roomStudents = storedStudents.filter((s) => s.roomId === room._id);
        return {
          _id: room._id,
          name: room.name,
          studentCount: roomStudents.length,
          totalSaved: roomStudents.reduce((sum, s) => sum + s.balance, 0),
        };
      });

      // Recent savings
      const recentSavings = [...storedSavings]
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 10)
        .map((s) => {
          const student = storedStudents.find((st) => st._id === s.studentId);
          return {
            ...s,
            studentName: student?.name || 'Unknown',
          };
        });

      setDashboard({
        totalRooms,
        totalStudents,
        totalSaved,
        averageSavings,
        totalTransactions,
        topSavers,
        roomSummaries,
        recentSavings,
      });
    } catch (err) {
      console.error('Failed to load dashboard:', err);
    }
  }, []);

  const loadRoomDashboard = useCallback((roomId) => {
    try {
      const storedRooms = getStoredData(STORAGE_KEYS.ROOMS, []);
      const storedStudents = getStoredData(STORAGE_KEYS.STUDENTS, []);
      const storedSavings = getStoredData(STORAGE_KEYS.SAVINGS, []);

      const room = storedRooms.find((r) => r._id === roomId);
      if (!room) return null;

      const roomStudents = storedStudents.filter((s) => s.roomId === roomId);
      const studentIds = roomStudents.map((s) => s._id);
      const roomSavings = storedSavings.filter((s) => studentIds.includes(s.studentId));

      return {
        room,
        totalStudents: roomStudents.length,
        totalSaved: roomStudents.reduce((sum, s) => sum + s.balance, 0),
        averageSavings: roomStudents.length > 0
          ? roomStudents.reduce((sum, s) => sum + s.balance, 0) / roomStudents.length
          : 0,
        totalTransactions: roomSavings.length,
        topSavers: [...roomStudents]
          .sort((a, b) => b.balance - a.balance)
          .slice(0, 10)
          .map((s) => ({
            _id: s._id,
            name: s.name,
            balance: s.balance,
            totalSaved: s.totalSaved,
          })),
        recentSavings: [...roomSavings]
          .sort((a, b) => new Date(b.date) - new Date(a.date))
          .slice(0, 10)
          .map((sv) => {
            const student = roomStudents.find((st) => st._id === sv.studentId);
            return { ...sv, studentName: student?.name || 'Unknown' };
          }),
      };
    } catch (err) {
      console.error('Failed to load room dashboard:', err);
      return null;
    }
  }, []);

  const value = {
    // Data
    rooms,
    students,
    savings,
    dashboard,
    selectedRoom,
    selectedStudent,
    loading,
    error,
    setError,

    // Rooms
    loadRooms,
    loadRoomDetails,
    createRoom,
    updateRoom,
    deleteRoom,
    setSelectedRoom,

    // Students
    loadStudentDetails,
    createStudent,
    updateStudent,
    deleteStudent,
    setSelectedStudent,

    // Savings
    createSaving,
    deleteSaving,

    // Dashboard
    loadDashboard,
    loadRoomDashboard,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
