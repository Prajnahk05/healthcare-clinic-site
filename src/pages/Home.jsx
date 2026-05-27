import { ArrowRight, CalendarCheck, CheckCircle2 } from "lucide-react";
import { AppointmentForm } from "../components/AppointmentForm.jsx";
import { Button } from "../components/Button.jsx";
import { EmergencyBanner } from "../components/CTA.jsx";
import { FAQ } from "../components/FAQ.jsx";
import { SectionHeader } from "../components/SectionHeader.jsx";
import { ServiceCard } from "../components/ServiceCard.jsx";
import { Testimonials } from "../components/Testimonials.jsx";
import { clinic, doctors, heroImage, serviceGroups, whyChoose } from "../data/siteData.js";

export function Home() {
  const featuredServices = serviceGroups.flatMap((group) => group.services).slice(0, 6);

  return (
    <>
      <section className="medical-grid relative overflow-hidden bg-gradient-to-br from-white via-teal-50 to-blue-50 px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="container-max grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="animate-fadeUp">
            <p className="mb-4 inline-flex rounded-full bg-white px-4 py-2 text-sm font-bold text-medical-teal shadow-soft">
              Complete healthcare under one roof
            </p>
            <h1 className="text-4xl font-extrabold tracking-tight text-medical-navy sm:text-5xl lg:text-6xl">
              {clinic.name}
              <span className="mt-3 block text-2xl text-medical-teal sm:text-3xl">{clinic.subName}</span>
            </h1>
            <p className="mt-5 max-w-2xl text-xl font-semibold text-slate-700">"{clinic.tagline}"</p>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
              Trusted doctors, accurate diagnostics, quality medicines, and compassionate patient care for families and children.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href="#/contact"><CalendarCheck className="h-5 w-5" /> Book Appointment</Button>
            </div>
          </div>
          <div className="relative">
            <img src={heroImage} alt="Modern clinic diagnostics" className="aspect-[4/3] w-full rounded-[8px] object-cover shadow-card" />
            <div className="glass absolute -bottom-6 left-4 right-4 rounded-[8px] p-5 shadow-card sm:left-auto sm:w-80">
              <p className="text-sm font-bold text-medical-teal">Doctor Highlights</p>
              <div className="mt-3 grid gap-3">
                {doctors.map((doctor) => (
                  <div key={doctor.name} className="flex items-center gap-3">
                    <img src={doctor.image} alt={doctor.name} className="h-12 w-12 rounded-full object-cover" />
                    <div>
                      <p className="text-sm font-bold text-medical-navy">{doctor.name}</p>
                      <p className="text-xs text-slate-600">{doctor.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad bg-white">
        <div className="container-max">
          <SectionHeader eyebrow="Services" title="Clinic, Diagnostics, and Medicines" text="Fast access to everyday healthcare services with a calm, professional experience." />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featuredServices.map((service) => <ServiceCard key={service.title} {...service} text="Patient-friendly service with clear next steps and reliable support." />)}
          </div>
        </div>
      </section>

      <section className="section-pad bg-slate-50">
        <div className="container-max grid items-center gap-10 lg:grid-cols-2">
          <div>
            <SectionHeader align="left" eyebrow="Why Choose Us" title="Premium Care That Feels Practical" text="Built around trust, accuracy, affordability, and friendly care for every patient." />
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {whyChoose.map((item) => (
                <div key={item.title} className="rounded-[8px] bg-white p-5 shadow-card">
                  <item.icon className="mb-4 h-7 w-7 text-medical-teal" />
                  <h3 className="font-bold text-medical-navy">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
          <AppointmentForm />
        </div>
      </section>

      <EmergencyBanner />

      <section className="section-pad bg-white">
        <div className="container-max grid gap-8 lg:grid-cols-2">
          <div className="rounded-[8px] bg-gradient-to-br from-blue-50 to-teal-50 p-8 shadow-card">
            <h2 className="text-3xl font-extrabold text-medical-navy">Lab & Diagnostics</h2>
            <p className="mt-4 leading-7 text-slate-600">From CBC and diabetes tests to thyroid, liver, kidney, and full body packages, our diagnostics workflow is designed for accurate reporting and easy collection.</p>
            <a href="#/lab-tests" className="mt-6 inline-flex items-center gap-2 font-bold text-medical-teal">Explore Lab Tests <ArrowRight className="h-4 w-4" /></a>
          </div>
          <div className="rounded-[8px] bg-gradient-to-br from-green-50 to-white p-8 shadow-card">
            <h2 className="text-3xl font-extrabold text-medical-navy">Medical Store</h2>
            <p className="mt-4 leading-7 text-slate-600">Branded, generic, prescription medicines, and healthcare products are available with convenient prescription upload support.</p>
            <div className="mt-6 grid gap-2 text-sm font-semibold text-slate-700">
              {["Prescription medicines", "Healthcare products", "Availability support"].map((item) => (
                <span key={item} className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-medical-green" /> {item}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Testimonials />
      <FAQ />
    </>
  );
}
