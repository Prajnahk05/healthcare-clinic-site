import { CalendarCheck } from "lucide-react";
import { appointmentDefaults } from "../data/siteData.js";
import { Button } from "./Button.jsx";

export function AppointmentForm({ compact = false }) {
  return (
    <form className={`grid gap-4 ${compact ? "" : "rounded-[8px] border border-slate-100 bg-white p-6 shadow-card"}`}>
      <div className="grid gap-4 sm:grid-cols-2">
        <input className="focus-ring rounded-[8px] border border-slate-200 px-4 py-3" placeholder="Patient name" />
        <input className="focus-ring rounded-[8px] border border-slate-200 px-4 py-3" placeholder="Mobile number" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <select className="focus-ring rounded-[8px] border border-slate-200 px-4 py-3">
          {appointmentDefaults.departments.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>
        <select className="focus-ring rounded-[8px] border border-slate-200 px-4 py-3">
          {appointmentDefaults.slots.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>
      </div>
      <textarea className="focus-ring min-h-28 rounded-[8px] border border-slate-200 px-4 py-3" placeholder="Symptoms or message" />
      <Button as="button" type="button" className="w-full">
        <CalendarCheck className="h-5 w-5" /> Request Appointment
      </Button>
    </form>
  );
}
