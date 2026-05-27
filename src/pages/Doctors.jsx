import { CalendarCheck, Clock } from "lucide-react";
import { Button } from "../components/Button.jsx";
import { SectionHeader } from "../components/SectionHeader.jsx";
import { doctors } from "../data/siteData.js";

export function Doctors() {
  return (
    <section className="section-pad bg-gradient-to-br from-white via-slate-50 to-teal-50">
      <div className="container-max">
        <SectionHeader eyebrow="Doctors" title="Experienced Doctors, Clear Consultations" text="Meet our specialists for orthopedic and pediatric care." />
        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          {doctors.map((doctor) => (
            <article key={doctor.name} className="overflow-hidden rounded-[8px] bg-white shadow-card">
              <img src={doctor.image} alt={doctor.name} className="h-72 w-full object-cover" />
              <div className="p-6">
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-medical-teal">{doctor.role}</p>
                <h2 className="mt-2 text-2xl font-extrabold text-medical-navy">{doctor.name}</h2>
                <p className="mt-1 font-semibold text-slate-700">{doctor.qualification}</p>
                <p className="mt-4 text-sm leading-6 text-slate-600">{doctor.experience}</p>
                <div className="mt-5 flex items-center gap-2 rounded-[8px] bg-teal-50 px-4 py-3 text-sm font-bold text-medical-teal">
                  <Clock className="h-5 w-5" /> {doctor.timings}
                </div>
                <div className="mt-5 flex flex-wrap gap-2">
                  {doctor.specialties.map((item) => (
                    <span key={item} className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-700">{item}</span>
                  ))}
                </div>
                <Button href="#/contact" className="mt-6"><CalendarCheck className="h-5 w-5" /> Book Appointment</Button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
