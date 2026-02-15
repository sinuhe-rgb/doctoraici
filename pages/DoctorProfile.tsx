import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useMedical } from '../contexts/MedicalContext';

const DoctorProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getDoctorById, user, linkDoctor, unlinkDoctor } = useMedical();
  const doctor = getDoctorById(id || '');

  if (!doctor) return <div className="p-10 text-center">Medic inexistent</div>;

  const isFamilyDoctor = user.linkedDoctorId === doctor.id;

  const handleLinkToggle = () => {
    if (isFamilyDoctor) {
      if(window.confirm("Ești sigur că vrei să renunți la acest medic de familie?")) {
        unlinkDoctor();
      }
    } else {
      linkDoctor(doctor.id);
      alert(`${doctor.name} a fost setat ca medicul tău de familie!`);
    }
  };

  const days = [
    { day: 'Luni', date: '16 Feb', slots: 6 },
    { day: 'Marți', date: '17 Feb', slots: 3 },
    { day: 'Miercuri', date: '18 Feb', slots: 8, selected: true },
    { day: 'Joi', date: '19 Feb', slots: 2 },
    { day: 'Vineri', date: '20 Feb', slots: 5 },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark pb-24">
      {/* Top Navigation */}
      <header className="sticky top-0 z-40 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-md mx-auto flex items-center justify-between px-4 h-16">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">
            <span className="material-symbols-outlined block">arrow_back</span>
          </button>
          <h1 className="text-lg font-bold">Profil Medic</h1>
          <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">
            <span className="material-symbols-outlined block">share</span>
          </button>
        </div>
      </header>

      <main className="flex-1 max-w-md mx-auto w-full">
        {/* Hero Section */}
        <section className="bg-white dark:bg-slate-900 p-6 rounded-b-3xl shadow-sm">
          <div className="flex flex-col items-center text-center">
            <div className="relative mb-4">
              <div className="w-32 h-32 rounded-full border-4 border-primary/10 p-1">
                <img 
                  src={doctor.image} 
                  alt={doctor.name}
                  className="w-full h-full rounded-full object-cover" 
                />
              </div>
              <div className="absolute bottom-1 right-2 w-6 h-6 bg-green-500 border-4 border-white dark:border-slate-900 rounded-full"></div>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{doctor.name}</h2>
            <p className="text-primary font-semibold text-lg">{doctor.specialty}</p>
            
            <button 
                onClick={handleLinkToggle}
                className={`mt-3 px-4 py-1.5 rounded-full text-sm font-bold border transition-colors ${
                  isFamilyDoctor 
                    ? 'bg-green-100 border-green-200 text-green-700' 
                    : 'bg-slate-100 border-slate-200 text-slate-600 hover:bg-slate-200'
                }`}
            >
                {isFamilyDoctor ? '✓ Medicul tău de familie' : '+ Setează ca medic de familie'}
            </button>

            <div className="flex items-center gap-4 mt-4">
              <div className="flex flex-col items-center px-4 py-2 bg-background-light dark:bg-slate-800 rounded-xl">
                <div className="flex items-center text-accent-yellow">
                  <span className="material-symbols-outlined text-sm fill-icon">star</span>
                  <span className="font-bold text-slate-900 dark:text-white ml-1">{doctor.rating}</span>
                </div>
                <p className="text-[10px] uppercase tracking-wider text-slate-500 font-medium">Rating</p>
              </div>
              <div className="flex flex-col items-center px-4 py-2 bg-background-light dark:bg-slate-800 rounded-xl">
                <span className="font-bold text-slate-900 dark:text-white">{doctor.reviews}</span>
                <p className="text-[10px] uppercase tracking-wider text-slate-500 font-medium">Recenzii</p>
              </div>
              <div className="flex flex-col items-center px-4 py-2 bg-background-light dark:bg-slate-800 rounded-xl">
                <span className="font-bold text-slate-900 dark:text-white">{doctor.experience} ani</span>
                <p className="text-[10px] uppercase tracking-wider text-slate-500 font-medium">Exp.</p>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="mt-6 px-4">
          <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">info</span>
            Despre mine
          </h3>
          <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl shadow-sm">
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              {doctor.description}
            </p>
          </div>
        </section>

        {/* Availability Section */}
        <section className="mt-8 px-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">calendar_month</span>
              Disponibilitate
            </h3>
            <button className="text-primary text-sm font-semibold">Vezi tot</button>
          </div>
          {/* Horizontal Scrolling Calendar Grid */}
          <div className="flex gap-3 overflow-x-auto pb-4 no-scrollbar -mx-4 px-4 snap-x">
            {days.map((d, i) => (
               <div key={i} className={`min-w-[100px] snap-start bg-white dark:bg-slate-900 border rounded-2xl p-4 flex flex-col items-center text-center shadow-sm cursor-pointer transition-all ${d.selected ? 'border-primary/30 ring-1 ring-primary/20' : 'border-slate-200 dark:border-slate-800'}`}>
                <span className={`${d.selected ? 'text-primary' : 'text-slate-500'} text-xs font-medium uppercase`}>{d.day}</span>
                <span className="text-lg font-bold my-1">{d.date}</span>
                <div className="mt-2 px-2 py-1 bg-accent-yellow rounded-lg">
                  <span className="text-[11px] font-bold text-slate-900">{d.slots} progr.</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Location Section */}
        <section className="mt-8 px-4">
          <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">location_on</span>
            Locație cabinet
          </h3>
          <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl shadow-sm space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-bold text-slate-900 dark:text-white">{doctor.locationName}</p>
                <p className="text-sm text-slate-500">{doctor.address}</p>
              </div>
              <a className="text-primary text-sm font-semibold flex items-center gap-1" href="#">
                Vezi hartă
                <span className="material-symbols-outlined text-sm">open_in_new</span>
              </a>
            </div>
            <div className="w-full h-40 rounded-xl bg-slate-200 dark:bg-slate-800 overflow-hidden relative group">
              <div className="absolute inset-0 bg-cover bg-center transition-transform group-hover:scale-105" style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuD6EpJQynq_ZuPiPBtWFW_zXqBjdXoFU6YSZaIH4Zmdzu5Z11pgbXtQP6RyJbj6JFUJv-GRL1jHeZL-cIp4q3KCPN4OewPq55P57KQH_os5BwRzco0uq43eHPUEb8ZxWExjCCPWT7o8VTIFv5M08pXpyp6Kkk9VZdmlfQ1rsHRmUsHJCUb3RzeBb-3XjFplpNbJwR_cRLn8do4yV5Sp4coZU2w0AEjmKUbghOJEAifi5sgGKACSacIWjHBeKu81P4OtnwGQYzGpaQPH')"}}></div>
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <span className="material-symbols-outlined text-primary text-4xl drop-shadow-md">location_on</span>
              </div>
            </div>
          </div>
        </section>

        {/* Action Button Section (Static in flow, not fixed) */}
        <div className="mt-8 px-4">
          <button 
            onClick={() => navigate(`/book/${doctor.id}`)}
            className="w-full bg-primary text-white font-bold py-4 rounded-2xl shadow-lg shadow-primary/25 hover:bg-primary/90 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined">event_available</span>
            Programează-te
          </button>
        </div>
      </main>
    </div>
  );
};

export default DoctorProfile;