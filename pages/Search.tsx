import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMedical } from '../contexts/MedicalContext';
import { Doctor } from '../types';

const Search = () => {
  const { doctors } = useMedical();
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMapDoctor, setSelectedMapDoctor] = useState<Doctor | null>(null);

  const filteredDoctors = doctors.filter(doc => 
    doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doc.specialty.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col h-screen pb-20">
      {/* Header */}
      <header className="pt-6 px-4 pb-2 bg-white dark:bg-background-dark sticky top-0 z-30">
        <div className="flex items-center justify-between mb-4">
          <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors" onClick={() => navigate(-1)}>
            <span className="material-symbols-outlined text-slate-700 dark:text-slate-300">arrow_back</span>
          </button>
          <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">Găsește un medic</h1>
          <button 
            className="flex items-center justify-center size-10 bg-primary/10 hover:bg-primary/20 text-primary rounded-full transition-all active:scale-95"
            onClick={() => setViewMode(viewMode === 'list' ? 'map' : 'list')}
            title={viewMode === 'list' ? 'Mod Hartă' : 'Mod Listă'}
          >
            <span className="material-symbols-outlined text-[22px]">
              {viewMode === 'list' ? 'map' : 'format_list_bulleted'}
            </span>
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="material-symbols-outlined text-primary text-xl">search</span>
          </div>
          <input 
            className="block w-full pl-10 pr-4 py-3 bg-slate-100 dark:bg-slate-800 border-none rounded-xl focus:ring-2 focus:ring-primary/50 text-slate-900 dark:text-white placeholder:text-slate-500 transition-all outline-none" 
            placeholder="Caută medic sau specialitate..." 
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Filters */}
        <div className="flex gap-2 mt-4 overflow-x-auto no-scrollbar pb-2">
          <button className="flex items-center gap-1.5 px-4 py-2 bg-primary text-white rounded-full text-sm font-medium whitespace-nowrap shadow-sm">
            <span>Specialitate</span>
            <span className="material-symbols-outlined text-base">keyboard_arrow_down</span>
          </button>
          <button className="flex items-center gap-1.5 px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-full text-sm font-medium whitespace-nowrap border border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
            <span>Distanță</span>
            <span className="material-symbols-outlined text-base">keyboard_arrow_down</span>
          </button>
          <button className="flex items-center gap-1.5 px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-full text-sm font-medium whitespace-nowrap border border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
            <span>Disponibilitate</span>
            <span className="material-symbols-outlined text-base">keyboard_arrow_down</span>
          </button>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 overflow-y-auto relative bg-slate-50 dark:bg-slate-900/20">
        
        {viewMode === 'list' ? (
          <div className="px-4 py-2 space-y-4 pb-8">
            {filteredDoctors.map(doctor => (
              <div key={doctor.id} className="bg-white dark:bg-slate-800/50 p-4 rounded-xl border border-slate-100 dark:border-slate-700 shadow-sm flex flex-col gap-4">
                <div className="flex gap-4 cursor-pointer" onClick={() => navigate(`/doctor/${doctor.id}`)}>
                  <div className="relative">
                    <img alt={doctor.name} className="size-20 rounded-xl object-cover bg-slate-200" src={doctor.image} />
                    <div className="absolute -bottom-1 -right-1 size-4 bg-green-500 border-2 border-white dark:border-slate-800 rounded-full"></div>
                  </div>
                  <div className="flex flex-col flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-slate-900 dark:text-white text-lg leading-tight">{doctor.name}</h3>
                        <p className="text-primary text-sm font-medium">{doctor.specialty}</p>
                      </div>
                      <div className="flex items-center bg-yellow-50 dark:bg-yellow-900/30 px-2 py-0.5 rounded-lg shrink-0">
                        <span className="material-symbols-outlined text-yellow-500 text-sm fill-icon">star</span>
                        <span className="text-xs font-bold text-yellow-700 dark:text-yellow-500 ml-1">{doctor.rating}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 mt-auto text-slate-500 dark:text-slate-400 text-sm">
                      <div className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-base">distance</span>
                        <span>{doctor.distance} km</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-base">chat_bubble</span>
                        <span>{doctor.reviews} recenzii</span>
                      </div>
                    </div>
                  </div>
                </div>
                <button 
                  onClick={() => navigate(`/doctor/${doctor.id}`)}
                  className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3 rounded-lg transition-all active:scale-[0.98] flex items-center justify-center gap-2 shadow-lg shadow-primary/20"
                >
                  <span className="material-symbols-outlined">calendar_today</span>
                  <span>Programează-te</span>
                </button>
              </div>
            ))}
          </div>
        ) : (
          /* Map View */
          <div className="relative w-full h-full">
            <div className="absolute inset-0 bg-cover bg-center opacity-80" style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBfEAv5RxFn0U6c8l0amwe_d-Jp_--mdEp4-LQBWgVPZS3nS0L_fn0YDIigUzk6j3PHxs2Ps-2JJa72ng3tLthErRVHqnJGjhnuRDymyrx_QZemY5f-L36TuO8kWt3fG9FdptVHnhytIAO2cnb71VKH3Am2TrkKNpFiONU07VtvI0nPVRMXQNjAJbzYKyMz_6cphJepE56FK1wDi0xWLlKmI2ZIRF-GHTQUieT3maOcHGihP4I8WpiZ6IQ-T4diOftXl9-x8OFAs-zz')"}}></div>
            
            {/* Map Pins */}
            {filteredDoctors.map(doctor => (
              <div 
                key={doctor.id}
                className="absolute z-10 cursor-pointer transform -translate-x-1/2 -translate-y-1/2 transition-all hover:scale-110"
                style={{ top: `${doctor.coordinates.y}%`, left: `${doctor.coordinates.x}%` }}
                onClick={() => setSelectedMapDoctor(doctor)}
              >
                <div className={`p-2 rounded-full shadow-lg border-2 border-white ${selectedMapDoctor?.id === doctor.id ? 'bg-primary text-white scale-110' : 'bg-primary/60 text-white hover:bg-primary'}`}>
                  <span className="material-symbols-outlined text-xl">medical_services</span>
                </div>
                {selectedMapDoctor?.id === doctor.id && (
                   <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1">
                    <div className="bg-white/90 px-2 py-0.5 rounded text-[10px] font-bold text-slate-800 whitespace-nowrap shadow-sm border border-slate-200">
                      {doctor.locationName}
                    </div>
                  </div>
                )}
              </div>
            ))}

             {/* Map Controls */}
            <div className="absolute right-4 bottom-56 flex flex-col gap-2 z-10">
              <button className="flex size-12 items-center justify-center rounded-xl bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 shadow-xl hover:bg-slate-50 transition-colors">
                <span className="material-symbols-outlined">add</span>
              </button>
              <button className="flex size-12 items-center justify-center rounded-xl bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 shadow-xl hover:bg-slate-50 transition-colors">
                <span className="material-symbols-outlined">remove</span>
              </button>
              <button className="mt-2 flex size-12 items-center justify-center rounded-xl bg-primary text-white shadow-xl hover:bg-primary/90 transition-colors">
                <span className="material-symbols-outlined">my_location</span>
              </button>
            </div>

            {/* Selected Card Overlay */}
            {selectedMapDoctor && (
              <div className="absolute bottom-4 left-4 right-4 z-20 animate-in slide-in-from-bottom-5 duration-300">
                <div className="flex flex-col gap-3 rounded-2xl bg-white dark:bg-slate-900 p-4 shadow-2xl border border-slate-100 dark:border-slate-800">
                  <div className="flex items-start justify-between">
                    <div className="flex gap-3">
                      <div className="size-16 rounded-xl bg-slate-100 dark:bg-slate-800 bg-cover bg-center" style={{backgroundImage: `url('${selectedMapDoctor.image}')`}}></div>
                      <div className="flex flex-col">
                        <span className="text-[10px] font-bold text-primary uppercase tracking-wider">Programare disponibilă azi</span>
                        <h3 className="text-base font-bold text-slate-900 dark:text-white leading-tight">{selectedMapDoctor.locationName}</h3>
                        <div className="flex items-center gap-1 mt-0.5">
                          <span className="material-symbols-outlined text-yellow-500 text-sm fill-icon">star</span>
                          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{selectedMapDoctor.rating}</span>
                          <span className="text-sm text-slate-400">({selectedMapDoctor.reviews} recenzii)</span>
                        </div>
                      </div>
                    </div>
                    <button className="text-slate-400" onClick={() => setSelectedMapDoctor(null)}>
                      <span className="material-symbols-outlined">close</span>
                    </button>
                  </div>
                  <div className="flex items-center gap-4 border-t border-slate-50 dark:border-slate-800 pt-3">
                    <div className="flex-1">
                      <p className="text-[10px] text-slate-400 uppercase font-bold">Specialitate principală</p>
                      <p className="text-sm font-medium text-slate-700 dark:text-slate-300">{selectedMapDoctor.specialty}</p>
                    </div>
                    <div className="flex-1">
                      <p className="text-[10px] text-slate-400 uppercase font-bold">Distanță</p>
                      <p className="text-sm font-medium text-slate-700 dark:text-slate-300">{selectedMapDoctor.distance} km</p>
                    </div>
                  </div>
                  <div className="flex gap-2 pt-1">
                    <button 
                      onClick={() => navigate(`/doctor/${selectedMapDoctor.id}`)}
                      className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-primary py-3 text-sm font-bold text-white shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all"
                    >
                      <span>Fă o programare</span>
                      <span className="material-symbols-outlined text-lg">calendar_add_on</span>
                    </button>
                    <button className="flex size-11 items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 transition-colors">
                      <span className="material-symbols-outlined">info</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default Search;
