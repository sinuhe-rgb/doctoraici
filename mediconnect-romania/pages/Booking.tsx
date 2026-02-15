import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useMedical } from '../contexts/MedicalContext';

const Booking = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getDoctorById, addAppointment } = useMedical();
  const doctor = getDoctorById(id || '');
  
  const [selectedTime, setSelectedTime] = useState('08:00');
  const [notes, setNotes] = useState('');

  if (!doctor) return null;

  const handleConfirm = () => {
    addAppointment(doctor.id, '18 Februarie', selectedTime, notes);
    navigate('/appointments');
  };

  const times = [
    '08:00', '08:30', '09:00', '09:30',
    '10:00', '10:30', '11:00', '11:30',
    '13:00', '13:30', '14:00', '14:30'
  ];

  // Disable some slots for mock effect
  const disabledSlots = ['09:00', '10:30', '14:00'];

  return (
    <div className="bg-background-light dark:bg-background-dark min-h-screen text-[#0d171b] pb-24">
      <div className="relative flex flex-col max-w-md mx-auto bg-white dark:bg-background-dark shadow-sm min-h-screen">
        
        {/* Header */}
        <div className="flex items-center bg-white dark:bg-background-dark p-4 sticky top-0 z-40 border-b border-primary/10">
          <button onClick={() => navigate(-1)} className="text-primary flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-primary/10 transition-colors">
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <h2 className="text-primary dark:text-white text-lg font-bold leading-tight tracking-tight flex-1 text-center pr-10">
            Finalizare Programare
          </h2>
        </div>

        <div className="flex-1">
          {/* Doctor Info */}
          <div className="p-4">
            <div className="flex w-full flex-col gap-4 bg-primary/5 dark:bg-primary/10 p-5 rounded-xl border border-primary/10">
              <div className="flex gap-4 items-center">
                <div 
                  className="bg-center bg-no-repeat aspect-square bg-cover rounded-full h-20 w-20 border-2 border-primary/20 shadow-sm"
                  style={{ backgroundImage: `url('${doctor.image}')` }}
                ></div>
                <div className="flex flex-col">
                  <p className="text-primary dark:text-white text-xl font-bold leading-tight">{doctor.name}</p>
                  <p className="text-[#4c819a] dark:text-slate-400 text-sm font-medium flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">medical_services</span> {doctor.specialty}
                  </p>
                  <p className="text-primary font-bold text-sm mt-1 flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">calendar_month</span> Miercuri, 18 Februarie
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Time Slots */}
          <div className="px-4 py-2">
            <h3 className="text-[#0d171b] dark:text-white text-base font-bold leading-tight tracking-tight pb-3 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">schedule</span> Alege ora disponibilă
            </h3>
            <div className="grid grid-cols-4 gap-2">
              {times.map(time => {
                const isDisabled = disabledSlots.includes(time);
                const isSelected = selectedTime === time;
                return (
                  <button
                    key={time}
                    disabled={isDisabled}
                    onClick={() => setSelectedTime(time)}
                    className={`flex h-10 items-center justify-center rounded-lg text-sm font-medium transition-all ${
                      isDisabled 
                        ? 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500 border border-gray-200 dark:border-gray-700 line-through cursor-not-allowed'
                        : isSelected 
                          ? 'bg-primary text-white shadow-md shadow-primary/20 ring-2 ring-primary'
                          : 'bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary border border-primary/20 hover:border-primary'
                    }`}
                  >
                    {time}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Notes */}
          <div className="px-4 py-6">
            <label className="flex flex-col w-full">
              <p className="text-primary dark:text-white text-base font-bold leading-normal pb-3 flex items-center gap-2">
                <span className="material-symbols-outlined">edit_note</span> Motivul vizitei / Note suplimentare
              </p>
              <textarea 
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="form-textarea flex w-full resize-none overflow-hidden rounded-xl text-[#0d171b] dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary border border-primary/20 bg-background-light dark:bg-slate-800 focus:border-primary min-h-[120px] placeholder:text-[#4c819a] p-4 text-base font-normal leading-relaxed outline-none" 
                placeholder="Ex: Control anual, durere de gât, rețetă compensată..."
              ></textarea>
            </label>
          </div>

          {/* Static Footer */}
          <div className="p-4 bg-white dark:bg-background-dark border-t border-primary/10 mt-auto">
            <button 
              onClick={handleConfirm}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-4 text-white font-bold text-lg shadow-lg shadow-primary/30 active:scale-[0.98] transition-all"
            >
              <span className="material-symbols-outlined">check_circle</span>
              Confirmă Programarea
            </button>
            <p className="text-center text-xs text-[#4c819a] dark:text-slate-500 mt-3 px-4">
              Prin confirmare, ești de acord cu termenii și condițiile clinicii noastre.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;