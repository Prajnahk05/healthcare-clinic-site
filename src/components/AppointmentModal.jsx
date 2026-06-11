import { CalendarCheck, X } from "lucide-react";
import { useEffect, useState } from "react";
import { AppointmentForm } from "./AppointmentForm.jsx";

export function AppointmentModal({ isOpen, onClose }) {
  const [shouldRender, setShouldRender] = useState(isOpen);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      document.body.style.overflow = "hidden";
      return;
    }

    const timer = window.setTimeout(() => setShouldRender(false), 200);
    document.body.style.overflow = "";
    return () => window.clearTimeout(timer);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  useEffect(() => () => {
    document.body.style.overflow = "";
  }, []);

  if (!shouldRender) {
    return null;
  }

  return (
    <div
      className={`fixed inset-0 z-[80] flex items-center justify-center bg-slate-950/65 px-4 py-6 backdrop-blur-sm transition-opacity duration-200 ${
        isOpen ? "opacity-100" : "opacity-0"
      }`}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="appointment-modal-title"
        className={`max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-[8px] bg-white shadow-2xl transition duration-200 ${
          isOpen ? "translate-y-0 scale-100 opacity-100" : "translate-y-4 scale-95 opacity-0"
        }`}
      >
        <div className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-slate-100 bg-white px-5 py-4 sm:px-6">
          <div className="flex gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[8px] bg-teal-50 text-medical-teal">
              <CalendarCheck className="h-6 w-6" aria-hidden="true" />
            </div>
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-medical-teal">Clinic Appointment</p>
              <h2 id="appointment-modal-title" className="mt-1 text-xl font-extrabold text-medical-navy sm:text-2xl">
                Book an Appointment
              </h2>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="focus-ring inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-50 text-slate-600 transition hover:bg-red-50 hover:text-red-600"
            aria-label="Close appointment form"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="p-5 sm:p-6">
          <AppointmentForm compact />
        </div>
      </section>
    </div>
  );
}
