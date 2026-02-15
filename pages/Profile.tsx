import React from 'react';
import { useMedical } from '../contexts/MedicalContext';
import { Link, useNavigate } from 'react-router-dom';

const Profile = () => {
  const { user, updateUser, getDoctorById } = useMedical();
  const navigate = useNavigate();
  const linkedDoctor = user.linkedDoctorId ? getDoctorById(user.linkedDoctorId) : null;

  return (
    <div className="bg-background-light dark:bg-background-dark text-[#101c22] dark:text-white min-h-screen flex flex-col pb-20">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-primary/10 px-4 py-4 flex items-center justify-between">
        <button onClick={() => navigate(-1)} className="p-2 hover:bg-primary/10 rounded-full transition-colors">
          <span className="material-symbols-outlined text-primary">arrow_back</span>
        </button>
        <h1 className="text-lg font-bold tracking-tight">Profilul Meu</h1>
        <button className="p-2 hover:bg-primary/10 rounded-full transition-colors">
          <span className="material-symbols-outlined text-primary">settings</span>
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto pb-6">
        {/* Avatar */}
        <div className="flex flex-col items-center py-8">
          <div className="relative group">
            <div className="w-28 h-28 rounded-full border-4 border-primary/20 p-1">
              <div 
                className="w-full h-full rounded-full bg-cover bg-center" 
                style={{ backgroundImage: `url('${user.avatar}')` }}
              ></div>
            </div>
            <button className="absolute bottom-1 right-1 bg-primary text-white p-2 rounded-full shadow-lg hover:scale-105 transition-transform">
              <span className="material-symbols-outlined text-sm">edit</span>
            </button>
          </div>
          <h2 className="mt-4 text-xl font-bold">{user.name}</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">{user.role}</p>
        </div>

        {/* Form */}
        <section className="px-6 space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5 ml-1">Nume Complet</label>
            <div className="relative">
              <input 
                className="w-full bg-white dark:bg-slate-800/50 border border-primary/10 rounded-xl px-4 py-3.5 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" 
                type="text" 
                value={user.name}
                onChange={(e) => updateUser({ name: e.target.value })}
              />
              <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm">edit</span>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5 ml-1">Vârstă</label>
              <input 
                className="w-full bg-white dark:bg-slate-800/50 border border-primary/10 rounded-xl px-4 py-3.5 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" 
                type="number" 
                value={user.age}
                onChange={(e) => updateUser({ age: parseInt(e.target.value) || 0 })}
              />
            </div>
            <div className="flex-[2]">
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5 ml-1">Oraș</label>
              <input 
                className="w-full bg-white dark:bg-slate-800/50 border border-primary/10 rounded-xl px-4 py-3.5 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" 
                type="text" 
                value={user.city}
                onChange={(e) => updateUser({ city: e.target.value })}
              />
            </div>
          </div>
        </section>

        {/* Family Doctor Section */}
        <section className="px-6 mt-10">
          <h3 className="text-base font-bold mb-4 ml-1">Medicul meu de familie</h3>
          {linkedDoctor ? (
            <div className="bg-white dark:bg-slate-800/50 border border-primary/10 rounded-xl p-4 shadow-sm">
              <div className="flex items-center gap-4">
                <div 
                  className="w-16 h-16 rounded-lg bg-cover bg-center" 
                  style={{ backgroundImage: `url('${linkedDoctor.image}')` }}
                ></div>
                <div className="flex-1">
                  <h4 className="font-bold text-gray-900 dark:text-white">{linkedDoctor.name}</h4>
                  <p className="text-sm text-primary font-medium">{linkedDoctor.specialty}</p>
                  <div className="flex items-center mt-1 text-xs text-gray-500">
                    <span className="material-symbols-outlined text-xs mr-1 text-yellow-500 fill-icon">star</span>
                    {linkedDoctor.rating} ({linkedDoctor.reviews} recenzii)
                  </div>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-primary/5 flex justify-between items-center">
                <Link to={`/doctor/${linkedDoctor.id}`} className="text-primary text-sm font-bold flex items-center gap-1 hover:underline">
                  Vezi Profil Medic
                  <span className="material-symbols-outlined text-xs">arrow_forward</span>
                </Link>
                <button className="bg-primary/10 text-primary p-2 rounded-lg">
                  <span className="material-symbols-outlined">chat</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white dark:bg-slate-800/50 border border-dashed border-slate-300 rounded-xl p-8 text-center flex flex-col items-center">
                <span className="material-symbols-outlined text-4xl text-slate-300 mb-2">medical_services</span>
                <p className="text-slate-500 text-sm mb-4">Nu ai selectat încă un medic de familie.</p>
                <Link to="/search" className="text-primary font-bold text-sm hover:underline">Caută un medic acum</Link>
            </div>
          )}
        </section>

        {/* Stats List */}
        <section className="px-6 mt-8 space-y-2">
          <button className="w-full flex items-center justify-between p-4 bg-white dark:bg-slate-800/50 rounded-xl border border-primary/5">
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 p-2 rounded-lg">
                <span className="material-symbols-outlined text-primary">history</span>
              </div>
              <span className="font-medium text-sm">Istoric Medical</span>
            </div>
            <span className="material-symbols-outlined text-gray-400">chevron_right</span>
          </button>
          <button className="w-full flex items-center justify-between p-4 bg-white dark:bg-slate-800/50 rounded-xl border border-primary/5">
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 p-2 rounded-lg">
                <span className="material-symbols-outlined text-primary">description</span>
              </div>
              <span className="font-medium text-sm">Prescripții Active</span>
            </div>
            <span className="material-symbols-outlined text-gray-400">chevron_right</span>
          </button>
        </section>
      </main>
    </div>
  );
};

export default Profile;
