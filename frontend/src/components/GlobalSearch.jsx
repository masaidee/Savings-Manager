import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../hooks/useApp';

export default function GlobalSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const { searchStudents } = useApp();
  const navigate = useNavigate();
  const searchRef = useRef(null);

  useEffect(() => {
    if (query.length > 0) {
      const filtered = searchStudents(query);
      setResults(filtered);
      setIsOpen(true);
    } else {
      setResults([]);
      setIsOpen(false);
    }
  }, [query, searchStudents]);

  // Close search when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (studentId) => {
    navigate(`/student/${studentId}`);
    setQuery('');
    setIsOpen(false);
  };

  return (
    <div className="relative w-full max-w-md" ref={searchRef}>
      <div className="relative group">
        <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400 group-focus-within:text-blue-500 transition-colors">
          🔍
        </span>
        <input
          type="text"
          className="w-full pl-10 pr-4 py-2 bg-gray-100 border-transparent border-2 rounded-xl focus:bg-white focus:border-blue-500 focus:ring-0 transition-all text-sm"
          placeholder="ค้นหาชื่อ หรือ เลขที่..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query.length > 0 && setIsOpen(true)}
        />
      </div>

      {isOpen && results.length > 0 && (
        <div className="absolute mt-2 w-full bg-white rounded-2xl shadow-2xl border border-gray-100 z-[100] max-h-96 overflow-y-auto animate-in fade-in zoom-in duration-200">
          <div className="p-2">
            <p className="px-3 py-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
              ผลการค้นหา ({results.length})
            </p>
            {results.map((student) => (
              <button
                key={student._id}
                className="w-full text-left px-3 py-3 hover:bg-blue-50 rounded-xl transition-colors flex items-center justify-between group"
                onClick={() => handleSelect(student._id)}
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-gray-400">#{student.studentNumber || '-'}</span>
                    <span className="font-bold text-gray-800 group-hover:text-blue-600 transition-colors">{student.name}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[10px] bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full font-bold">
                      🏫 {student.roomName}
                    </span>
                    <span className="text-[10px] text-gray-400">
                      💰 {student.balance.toLocaleString('th-TH', { minimumFractionDigits: 2 })} ฿
                    </span>
                  </div>
                </div>
                <span className="text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {isOpen && query.length > 0 && results.length === 0 && (
        <div className="absolute mt-2 w-full bg-white rounded-2xl shadow-2xl border border-gray-100 z-[100] p-6 text-center animate-in fade-in zoom-in duration-200">
          <p className="text-gray-500 text-sm">❌ ไม่พบข้อมูลนักเรียน</p>
        </div>
      )}
    </div>
  );
}
