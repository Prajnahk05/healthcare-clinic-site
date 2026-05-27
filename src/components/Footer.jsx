import { Mail, MapPin, Phone, Stethoscope } from "lucide-react";
import { clinic, navLinks, phoneHref } from "../data/siteData.js";

export function Footer() {
  return (
    <footer className="bg-medical-navy text-white">
      <div className="container-max grid gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div>
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-[8px] bg-white/10">
              <Stethoscope className="h-6 w-6" />
            </div>
            <div>
              <p className="font-extrabold">{clinic.name}</p>
              <p className="text-xs font-bold tracking-[0.18em] text-teal-200">{clinic.subName}</p>
            </div>
          </div>
          <p className="max-w-sm text-sm leading-6 text-blue-100">{clinic.tagline}. Trusted healthcare, diagnostics, and medicines under one roof.</p>
        </div>

        <div>
          <h3 className="mb-4 font-bold">Quick Links</h3>
          <div className="grid gap-2">
            {navLinks.slice(0, 6).map((link) => (
              <a key={link.path} href={link.path} className="text-sm text-blue-100 transition hover:text-white">
                {link.label}
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="mb-4 font-bold">Services</h3>
          <div className="grid gap-2 text-sm text-blue-100">
            <span>General Consultation</span>
            <span>Orthopedic Care</span>
            <span>Children Specialist</span>
            <span>Lab & Diagnostics</span>
            <span>Medical Store</span>
          </div>
        </div>

        <div>
          <h3 className="mb-4 font-bold">Contact</h3>
          <div className="grid gap-3 text-sm text-blue-100">
            <a href={phoneHref(clinic.phone)} className="flex gap-2 hover:text-white">
              <Phone className="mt-0.5 h-4 w-4 shrink-0" /> {clinic.phone}
            </a>
            <a href={`mailto:${clinic.email}`} className="flex gap-2 hover:text-white">
              <Mail className="mt-0.5 h-4 w-4 shrink-0" /> {clinic.email}
            </a>
            <span className="flex gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0" /> {clinic.address}
            </span>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 px-4 py-5 text-center text-xs text-blue-100">
        © 2026 Anjanadri Medicals & Clinic Lab & Diagnostics. All rights reserved.
      </div>
    </footer>
  );
}
