import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { MedicalProvider } from './contexts/MedicalContext';
import BottomNav from './components/BottomNav';
import Search from './pages/Search';
import DoctorProfile from './pages/DoctorProfile';
import Booking from './pages/Booking';
import Appointments from './pages/Appointments';
import Profile from './pages/Profile';

const App = () => {
  return (
    <MedicalProvider>
      <Router>
        <div className="max-w-md mx-auto min-h-screen bg-gray-50 dark:bg-black shadow-2xl overflow-hidden relative">
           <Routes>
             <Route path="/" element={<Navigate to="/search" replace />} />
             <Route path="/search" element={<Search />} />
             <Route path="/doctor/:id" element={<DoctorProfile />} />
             <Route path="/book/:id" element={<Booking />} />
             <Route path="/appointments" element={<Appointments />} />
             <Route path="/profile" element={<Profile />} />
           </Routes>
           <BottomNav />
        </div>
      </Router>
    </MedicalProvider>
  );
};

export default App;
