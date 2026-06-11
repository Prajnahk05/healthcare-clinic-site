import { CalendarCheck, CheckCircle2 } from "lucide-react";
import { Button } from "../components/Button.jsx";
import { SectionHeader } from "../components/SectionHeader.jsx";
import { packages } from "../data/siteData.js";

export function Packages({ onBookAppointment }) {
  return (
    <section className="section-pad bg-gradient-to-br from-white via-slate-50 to-teal-50">
      <div className="container-max">
        <SectionHeader eyebrow="Health Packages" title="Preventive Checkups for Every Age" text="Modern package cards with clear inclusions and simple booking actions." />
        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {packages.map((item) => (
            <article key={item.title} className="rounded-[8px] border border-slate-100 bg-white p-6 shadow-card transition hover:-translate-y-1 hover:shadow-soft">
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-[8px] bg-gradient-to-br from-teal-50 to-blue-50 text-medical-teal">
                <item.icon className="h-7 w-7" />
              </div>
              <h2 className="text-2xl font-extrabold text-medical-navy">{item.title}</h2>
              <p className="mt-3 text-3xl font-extrabold text-medical-teal">{item.price}</p>
              <div className="mt-5 grid gap-3">
                {item.tests.map((test) => (
                  <span key={test} className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                    <CheckCircle2 className="h-4 w-4 text-medical-green" /> {test}
                  </span>
                ))}
              </div>
              <Button as="button" type="button" onClick={onBookAppointment} className="mt-6 w-full"><CalendarCheck className="h-5 w-5" /> Book Now</Button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
