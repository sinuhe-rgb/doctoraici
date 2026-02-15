import React from 'react';
import { useMedical } from '../contexts/MedicalContext';
import { Link } from 'react-router-dom';

const Appointments = () => {
  const { appointments, getDoctorById, cancelAppointment } = useMedical();

  const activeAppointments = appointments.filter(a => a.status === 'upcoming');

  return (
    <div className="relative flex min-h-screen w-full flex-col max-w-md mx-auto bg-white dark:bg-background-dark shadow-xl overflow-hidden pb-20">
      {/* Header */}
      <header className="sticky top-0 z-10 flex items-center bg-white/80 dark:bg-background-dark/80 backdrop-blur-md p-4 border-b border-primary/10">
        <Link to="/" className="text-primary hover:bg-primary/10 p-2 rounded-full transition-colors">
          <span className="material-symbols-outlined block">arrow_back</span>
        </Link>
        <h1 className="text-xl font-bold leading-tight tracking-tight flex-1 text-center pr-10 font-display">Programările Mele</h1>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-4 space-y-4">
        <div className="flex items-center justify-between mb-2 px-1">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-primary/70">Programări Viitoare</h2>
          <span className="bg-primary/10 text-primary text-xs font-bold px-2 py-1 rounded-full">{activeAppointments.length} Programări</span>
        </div>

        {activeAppointments.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-slate-400">
            <span className="material-symbols-outlined text-4xl mb-2">event_busy</span>
            <p>Nu ai programări viitoare.</p>
            <Link to="/search" className="mt-4 text-primary font-bold hover:underline">Caută un medic</Link>
          </div>
        )}

        {activeAppointments.map(appt => {
          const doctor = getDoctorById(appt.doctorId);
          if (!doctor) return null;

          return (
            <div key={appt.id} className="group relative flex flex-col gap-4 rounded-xl border border-primary/10 bg-white dark:bg-slate-900 p-4 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4">
                <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-primary/5">
                  <img src={doctor.image} alt={doctor.name} className="h-full w-full object-cover" />
                </div>
                <div className="flex flex-col flex-1">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-tight">{doctor.name}</h3>
                  <p className="text-sm font-medium text-primary">{doctor.specialty}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 bg-background-light dark:bg-slate-800/50 p-3 rounded-lg">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-xl">calendar_today</span>
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase font-bold text-slate-500">Data</span>
                    <span className="text-sm font-bold">{appt.dateStr}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-xl">schedule</span>
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase font-bold text-slate-500">Ora</span>
                    <span className="text-sm font-bold">{appt.time}</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => {
                   if(window.confirm('Sigur doriți să anulați programarea?')) cancelAppointment(appt.id);
                }}
                className="w-full h-10 flex items-center justify-center gap-2 rounded-lg border border-red-200 bg-red-50 dark:bg-red-950/20 text-red-600 dark:text-red-400 text-sm font-bold transition-all hover:bg-red-100 dark:hover:bg-red-900/30"
              >
                <span className="material-symbols-outlined text-lg">event_busy</span>
                Anulează programarea
              </button>
            </div>
          );
        })}
        <div className="h-10"></div>
      </main>
    </div>
  );
};

export default Appointments;
