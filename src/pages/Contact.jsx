import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { AppointmentForm } from "../components/AppointmentForm.jsx";
import { Button } from "../components/Button.jsx";
import { SectionHeader } from "../components/SectionHeader.jsx";
import { clinic, contactCards, phoneHref, whatsappHref } from "../data/siteData.js";

export function Contact() {
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(clinic.address)}&output=embed`;
  const mapHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(clinic.address)}`;
  const contactHref = {
    Call: phoneHref(clinic.phone),
    WhatsApp: whatsappHref(clinic.whatsapp),
    Email: `mailto:${clinic.email}`,
    Visit: mapHref,
  };

  return (
    <>
      <section className="section-pad bg-gradient-to-br from-white to-blue-50">
        <div className="container-max">
          <SectionHeader eyebrow="Contact Us" title="Book, Call, or Visit the Clinic" text="Reach us for appointments, diagnostics, medicines, working hours, and emergency support." />
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {contactCards.map((item) => {
              const href = contactHref[item.title];
              const CardTag = href ? "a" : "article";
              const externalProps = item.title === "Visit" ? { target: "_blank", rel: "noreferrer" } : {};

              return (
                <CardTag key={item.title} href={href} {...externalProps} className="rounded-[8px] bg-white p-5 shadow-card transition hover:-translate-y-1 hover:shadow-lg">
                  <item.icon className="mb-4 h-7 w-7 text-medical-teal" />
                  <h3 className="font-bold text-medical-navy">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{item.value}</p>
                </CardTag>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-pad bg-white">
        <div className="container-max grid gap-8 lg:grid-cols-2">
          <div>
            <h2 className="mb-5 text-2xl font-extrabold text-medical-navy">Online Appointment Booking</h2>
            <AppointmentForm />
          </div>
          <form className="rounded-[8px] border border-slate-100 bg-slate-50 p-6 shadow-card">
            <h2 className="mb-5 text-2xl font-extrabold text-medical-navy">Contact Form</h2>
            <div className="grid gap-4">
              <input className="focus-ring rounded-[8px] border border-slate-200 px-4 py-3" placeholder="Full name" />
              <input className="focus-ring rounded-[8px] border border-slate-200 px-4 py-3" placeholder="Phone or email" />
              <textarea className="focus-ring min-h-36 rounded-[8px] border border-slate-200 px-4 py-3" placeholder="How can we help?" />
              <Button as="button" type="button">Send Message</Button>
            </div>
          </form>
        </div>
      </section>

      <section className="section-pad bg-slate-50">
        <div className="container-max grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[8px] bg-white p-6 shadow-card">
            <h2 className="text-2xl font-extrabold text-medical-navy">Clinic Details</h2>
            <div className="mt-6 grid gap-4 text-sm text-slate-600">
              <a href={phoneHref(clinic.phone)} className="flex gap-3 hover:text-medical-teal"><Phone className="h-5 w-5 text-medical-teal" /> Phone: {clinic.phone}</a>
              <a href={whatsappHref(clinic.whatsapp)} className="flex gap-3 hover:text-medical-teal"><MessageCircle className="h-5 w-5 text-medical-teal" /> WhatsApp: {clinic.whatsapp}</a>
              <a href={`mailto:${clinic.email}`} className="flex gap-3 hover:text-medical-teal"><Mail className="h-5 w-5 text-medical-teal" /> Email: {clinic.email}</a>
              <a href={mapHref} target="_blank" rel="noreferrer" className="flex gap-3 hover:text-medical-teal"><MapPin className="h-5 w-5 text-medical-teal" /> {clinic.address}</a>
              <p className="flex gap-3"><Clock className="h-5 w-5 text-medical-teal" /> {clinic.hours}</p>
            </div>
            <div className="mt-6 rounded-[8px] bg-red-50 p-5">
              <p className="font-extrabold text-red-700">Emergency Contact</p>
              <a href={phoneHref(clinic.emergency)} className="mt-2 block text-xl font-extrabold text-medical-navy">{clinic.emergency}</a>
            </div>
          </div>
          <iframe
            title="Anjanadri Medicals location map"
            className="h-[460px] w-full rounded-[8px] border-0 shadow-card"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            src={mapSrc}
          />
        </div>
      </section>
    </>
  );
}
