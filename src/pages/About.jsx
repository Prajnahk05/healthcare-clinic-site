import { HeartHandshake, Target, Telescope, Users } from "lucide-react";
import { SectionHeader } from "../components/SectionHeader.jsx";
import { environmentImages } from "../data/siteData.js";

export function About() {
  return (
    <>
      <section className="section-pad bg-gradient-to-br from-white to-teal-50">
        <div className="container-max">
          <SectionHeader
            eyebrow="About Us"
            title="Trusted Healthcare Services for Families"
            text="We provide trusted healthcare services with experienced doctors, accurate lab diagnostics, and quality medicines under one roof. Our clinic focuses on patient care, accurate diagnosis, and affordable treatment for families and children."
          />
        </div>
      </section>

      <section className="section-pad bg-white">
        <div className="container-max grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: Target, title: "Mission", text: "Deliver accessible, accurate, and compassionate healthcare with dependable diagnostics and medicines." },
            { icon: Telescope, title: "Vision", text: "Become a trusted neighborhood healthcare center for complete family care." },
            { icon: HeartHandshake, title: "Patient-First Care", text: "Listen carefully, explain clearly, and guide each patient toward practical next steps." },
            { icon: Users, title: "Family Focus", text: "Support children, adults, and senior citizens with respectful, affordable care." },
          ].map((item) => (
            <article key={item.title} className="rounded-[8px] border border-slate-100 bg-white p-6 shadow-card">
              <item.icon className="mb-5 h-8 w-8 text-medical-teal" />
              <h3 className="text-xl font-bold text-medical-navy">{item.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-pad bg-slate-50">
        <div className="container-max grid items-center gap-10 lg:grid-cols-2">
          <div>
            <SectionHeader align="left" eyebrow="Environment" title="Clean, Calm, and Organized Clinic Experience" text="Our clinic environment is designed to be welcoming, hygienic, and easy to navigate for patients of every age." />
            <p className="mt-6 leading-7 text-slate-600">From consultation to lab sample collection and medicines, the patient journey is kept simple and reassuring.</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img src={environmentImages[0]} alt="Clinic reception" className="h-full min-h-72 rounded-[8px] object-cover shadow-card" />
            <div className="grid gap-4">
              <img src={environmentImages[1]} alt="Doctor consultation" className="h-36 rounded-[8px] object-cover shadow-card" />
              <img src={environmentImages[2]} alt="Diagnostics room" className="h-36 rounded-[8px] object-cover shadow-card" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
