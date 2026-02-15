import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Doctor, Appointment, UserProfile } from '../types';

interface MedicalContextType {
  doctors: Doctor[];
  user: UserProfile;
  appointments: Appointment[];
  updateUser: (data: Partial<UserProfile>) => void;
  linkDoctor: (doctorId: string) => void;
  unlinkDoctor: () => void;
  addAppointment: (doctorId: string, dateStr: string, time: string, notes: string) => void;
  cancelAppointment: (appointmentId: string) => void;
  getDoctorById: (id: string) => Doctor | undefined;
}

const MedicalContext = createContext<MedicalContextType | undefined>(undefined);

// --- MOCK DATA ---

const MOCK_DOCTORS: Doctor[] = [
  {
    id: 'd1',
    name: 'Dr. Ana Maria Popescu',
    specialty: 'Medic de familie',
    rating: 4.9,
    reviews: 120,
    experience: 15,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAvgIR4II9ByG5EmxWGW6VGAXP1H6OYis0LzCZhB_tIO3rpQ1U-4vi3AJF8JUJTxxnA4BuPD2SwIYmfU5ZCTg5vDp-YxW0Fd8sf3IhngWNRaM7YujXV2dOlPchMR78vY2xL0KuIOY4n1QbtA-Lv9u-z0VTjbSADRixWsc41V-S7zEy-0W6LwOWevQbY925h3jCtixtFWb4QN1pVYGZTabUyhxwvYPdRCwNtu84-YusOp6uzBmyjx_glD-b2zqNbzyEBY7-bS824NoWl',
    distance: 1.5,
    locationName: 'Clinica Medicală Speranța',
    address: 'Strada Libertății nr. 45, București',
    description: 'Sunt medic de familie cu peste 15 ani de experiență în îngrijirea primară a sănătății. Misiunea mea este să ofer pacienților mei o abordare holistică, axată pe prevenție și tratament personalizat.',
    coordinates: { x: 45, y: 35 }
  },
  {
    id: 'd2',
    name: 'Dr. Matei Ionescu',
    specialty: 'Medic Specialist Generală',
    rating: 4.7,
    reviews: 85,
    experience: 8,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB28_x6YAF22JFl9DM8qxyP2x5CR7IcGX12JgKPUJSj3Oy1sV0of_DiPl97PRACqTCf8EPXf-NVS6H5D9oHdIj5np7xlrD1fXOagCoLosWapGbBllz1qQnN5sGEEc4_EYc2PqYsosnapIY8YtaVStXYJMIY6JeURQC5bIXDF8Q1AMYdivIPqmgord5Y_pzg3fM3Zn1rzN8YLl5JdUly1l5CdgJQnpxxEIqdr4btfyJ_3Bu0NF-Nf36WEYRXeog4fZ0GywD5HFbfVFKw',
    distance: 2.8,
    locationName: 'Cabinet Individual Dr. Ionescu',
    address: 'Bulevardul Unirii nr. 10, București',
    description: 'Abordez medicina generală cu pasiune și dedicare, asigurând tratamente eficiente și sfaturi preventive pentru întreaga familie.',
    coordinates: { x: 65, y: 55 }
  },
  {
    id: 'd3',
    name: 'Dr. Elena Vasilescu',
    specialty: 'Pediatru / Medic de familie',
    rating: 5.0,
    reviews: 210,
    experience: 20,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuARTSaY5bn8Q9JogWHwKybFIqfTCXqj1J6imrBjc_l-99l9M_Z-A3u7hIWPATPLtj9y1h_54954q5Fdk1tbILZt4NTk5b1WST_CjsL6LkQpho2BGIjQa3lJY-2vs_w0fVMes2X63-5XcN3aYmYzWF3XHoikzTRrtFsMvmLJPRGlF13WlhVfT3F_DoMzAwqM5VT4Dd-Bv5aRilNZbizh-zOGAg0Y2D_OxjQcgiEwNUu9nl-UT6M2-JtxvwJ4BgJXOuzQSwoXRRczoNVh',
    distance: 3.2,
    locationName: 'Clinica Copiilor',
    address: 'Calea Dorobanților nr. 100, București',
    description: 'Dedicată sănătății copiilor și liniștii părinților. Experiență vastă în pediatrie și medicina de familie.',
    coordinates: { x: 25, y: 65 }
  },
    {
    id: 'd4',
    name: 'Dr. Popescu Cristian',
    specialty: 'Pediatrie',
    rating: 4.8,
    reviews: 92,
    experience: 10,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC7TozVQrcR-uR4GyQYaIQCDBPunSAfNwig6QnaE4sSQ4N5vbi-IBw1vSQ4_WHb0oBcsZyTYFeJgysCLufOTwtBnsoAK6GFJcXGyPE1lSu-s3WYtopVma6_tMFF1v9m7xFq2Z6ulTNB-ZbmMXbjyfIAxPB6-AgqGBPUHrpMHt8l7Q5l3jnXjX9-X3saqR49CRz9nTnsB9iUzwLFxNcg1TCt1gTMyCgXUqypzERojXsMvL11METxkBZLQmd6G4tCdVNIGez3goazwm8F',
    distance: 4.5,
    locationName: 'Centrul Medical Unirea',
    address: 'Bd. Tineretului 12',
    description: 'Expertiză în pediatrie generală și imunologie.',
    coordinates: { x: 75, y: 25 }
  }
];

const INITIAL_USER: UserProfile = {
  name: 'Ion Popescu',
  role: 'Pacient din 2022',
  year: 2022,
  age: 34,
  city: 'București',
  avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC49TSAtbfIFWppLPodizzeJcfZckeIECQfJb_rT6h9QQqd3WGm6HObMZ_4fYXe43gpYvZBjKwOgVbTtcqd-RAmhmKkNE2xUjwd9S_HHwx3ktof1TYPu2Nj-2VJVtP2yEnwezV9DChVl2ASotGKdPy8yQJVSDmGt8EDU4Ouy4I8MTf0Q10vf2j_lBJ5vac1EMCVPi7dfnIp2SOoWvEeGwmJJNstsPKS64p4xpMlw7ep43UMxH05XVG3VNOESEHnRczGddjFtWF7JBOw',
  linkedDoctorId: null // Start with no linked doctor for demo purposes
};

const INITIAL_APPOINTMENTS: Appointment[] = [
    {
        id: 'appt1',
        doctorId: 'd4',
        dateStr: '20 Februarie',
        time: '10:00',
        notes: 'Control rutină',
        status: 'upcoming'
    }
];

export const MedicalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [doctors] = useState<Doctor[]>(MOCK_DOCTORS);
  const [user, setUser] = useState<UserProfile>(INITIAL_USER);
  const [appointments, setAppointments] = useState<Appointment[]>(INITIAL_APPOINTMENTS);

  const updateUser = (data: Partial<UserProfile>) => {
    setUser(prev => ({ ...prev, ...data }));
  };

  const linkDoctor = (doctorId: string) => {
    updateUser({ linkedDoctorId: doctorId });
  };

  const unlinkDoctor = () => {
    updateUser({ linkedDoctorId: null });
  };

  const addAppointment = (doctorId: string, dateStr: string, time: string, notes: string) => {
    const newAppt: Appointment = {
      id: Math.random().toString(36).substr(2, 9),
      doctorId,
      dateStr,
      time,
      notes,
      status: 'upcoming'
    };
    setAppointments(prev => [...prev, newAppt]);
  };

  const cancelAppointment = (appointmentId: string) => {
    setAppointments(prev => prev.filter(a => a.id !== appointmentId));
  };

  const getDoctorById = (id: string) => doctors.find(d => d.id === id);

  return (
    <MedicalContext.Provider value={{
      doctors,
      user,
      appointments,
      updateUser,
      linkDoctor,
      unlinkDoctor,
      addAppointment,
      cancelAppointment,
      getDoctorById
    }}>
      {children}
    </MedicalContext.Provider>
  );
};

export const useMedical = () => {
  const context = useContext(MedicalContext);
  if (!context) throw new Error("useMedical must be used within MedicalProvider");
  return context;
};
