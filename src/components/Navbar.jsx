import { Clock, Mail, Menu, MessageCircle, Phone, Stethoscope, X } from "lucide-react";
import { useState } from "react";
import { clinic, navLinks, phoneHref } from "../data/siteData.js";
import { Button } from "./Button.jsx";

export function Navbar({ route, onBookAppointment, onNavigate }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/90 backdrop-blur-xl">
      <div className="hidden border-b border-slate-100 bg-medical-navy text-white md:block">
        <div className="container-max flex items-center justify-end gap-5 px-4 py-2 text-xs font-semibold lg:px-6">
          <a href={phoneHref(clinic.phone)} className="flex items-center gap-1.5 whitespace-nowrap text-blue-50 hover:text-white">
            <Phone className="h-3.5 w-3.5 text-teal-200" /> {clinic.phone}
          </a>
          <a href={`https://wa.me/${clinic.whatsapp.replace(/\D/g, "")}`} className="flex items-center gap-1.5 whitespace-nowrap text-blue-50 hover:text-white">
            <MessageCircle className="h-3.5 w-3.5 text-teal-200" /> WhatsApp: {clinic.whatsapp}
          </a>
          <a href={`mailto:${clinic.email}`} className="hidden items-center gap-1.5 whitespace-nowrap text-blue-50 hover:text-white lg:flex">
            <Mail className="h-3.5 w-3.5 text-teal-200" /> {clinic.email}
          </a>
          <span className="hidden items-center gap-1.5 whitespace-nowrap text-blue-50 xl:flex">
            <Clock className="h-3.5 w-3.5 text-teal-200" /> {clinic.hours}
          </span>
        </div>
      </div>

      <nav className="container-max flex min-h-20 items-center justify-between gap-3 px-2 py-3 sm:px-3 lg:px-4" aria-label="Main navigation">
        <a href="#/" className="-ml-2 flex min-w-0 flex-1 items-center gap-3 sm:-ml-3 xl:-ml-8 xl:max-w-[340px] 2xl:-ml-12 2xl:max-w-[420px]">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[8px] bg-gradient-to-br from-medical-teal to-medical-blue text-white shadow-soft">
            <Stethoscope className="h-6 w-6" aria-hidden="true" />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-extrabold leading-tight text-medical-navy sm:text-lg xl:text-base 2xl:text-xl">
              {clinic.name}
            </p>
            <p className="mt-0.5 text-[10px] font-bold tracking-[0.14em] text-medical-teal sm:text-sm xl:text-xs 2xl:text-sm">
              {clinic.subName}
            </p>
          </div>
        </a>

        <div className="hidden min-w-0 flex-1 items-center justify-center gap-0.5 xl:flex">
          {navLinks.map((link) => {
            const active = link.path === route;
            return (
              <a
                key={link.path}
                href={link.path}
                onClick={(event) => {
                  event.preventDefault();
                  onNavigate(link.path);
                }}
                className={`whitespace-nowrap rounded-full px-2 py-2 text-[11px] font-semibold transition 2xl:px-3 2xl:text-sm ${
                  active ? "bg-teal-50 text-medical-teal" : "text-slate-600 hover:bg-slate-50 hover:text-medical-navy"
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </div>

        <div className="hidden shrink-0 items-center xl:flex">
          <Button
            as="button"
            type="button"
            onClick={onBookAppointment}
            className="whitespace-nowrap px-3 py-2.5 text-xs 2xl:px-5 2xl:text-sm"
          >
            Book Appointment
          </Button>
        </div>

        <button
          className="focus-ring inline-flex h-11 w-11 items-center justify-center rounded-full bg-slate-50 text-medical-navy xl:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-label="Toggle navigation"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-slate-100 bg-white px-4 py-4 shadow-card xl:hidden">
          <div className="grid gap-2">
            {navLinks.map((link) => (
              <a
                key={link.path}
                href={link.path}
                onClick={(event) => {
                  event.preventDefault();
                  setOpen(false);
                  onNavigate(link.path);
                }}
                className={`rounded-[8px] px-4 py-3 text-sm font-bold ${
                  link.path === route ? "bg-teal-50 text-medical-teal" : "text-slate-700 hover:bg-slate-50"
                }`}
              >
                {link.label}
              </a>
            ))}
            <Button
              as="button"
              type="button"
              onClick={() => {
                setOpen(false);
                onBookAppointment();
              }}
              className="mt-2 w-full"
            >
              Book Appointment
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
