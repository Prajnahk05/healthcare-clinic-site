import { CalendarCheck, CheckCircle2, Loader2 } from "lucide-react";
import { useState } from "react";
import { supabase } from "../lib/supabaseClient.js";
import { Button } from "./Button.jsx";

const doctors = [
  "Dr. Shushruth Devanna - Orthopedic Surgeon",
  "Dr. Niranjan - Pediatrics Specialist",
];

const initialForm = {
  patientName: "",
  mobileNumber: "",
  email: "",
  doctor: doctors[0],
  appointmentDate: "",
  appointmentTime: "",
  notes: "",
};

export function AppointmentForm({ compact = false }) {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ type: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  const updateField = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: "" }));
    if (status.type) {
      setStatus({ type: "", message: "" });
    }
  };

  const validate = () => {
    const nextErrors = {};

    if (!form.patientName.trim()) {
      nextErrors.patientName = "Please enter the patient name.";
    }

    if (!form.mobileNumber.trim()) {
      nextErrors.mobileNumber = "Please enter a mobile number.";
    } else if (!/^[0-9+\-\s()]{7,15}$/.test(form.mobileNumber.trim())) {
      nextErrors.mobileNumber = "Please enter a valid mobile number.";
    }

    if (!form.appointmentDate) {
      nextErrors.appointmentDate = "Please select an appointment date.";
    }

    if (!form.appointmentTime) {
      nextErrors.appointmentTime = "Please select an appointment time.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validate()) {
      setStatus({ type: "error", message: "Please complete the required fields." });
      return;
    }

    if (!supabase) {
      setStatus({
        type: "error",
        message: "Appointment booking is not configured yet. Please contact the clinic directly.",
      });
      return;
    }

    setSubmitting(true);
    setStatus({ type: "", message: "" });

    const payload = {
      patient_name: form.patientName.trim(),
      mobile_number: form.mobileNumber.trim(),
      email: form.email.trim() || null,
      doctor: form.doctor,
      appointment_date: form.appointmentDate,
      appointment_time: form.appointmentTime,
      symptoms_notes: form.notes.trim() || null,
    };

    const { error } = await supabase.from("appointments").insert(payload);

    setSubmitting(false);

    if (error) {
      setStatus({
        type: "error",
        message: "We could not submit your appointment right now. Please try again.",
      });
      return;
    }

    setForm(initialForm);
    setErrors({});
    setStatus({
      type: "success",
      message: "Your appointment request has been submitted successfully.",
    });
  };

  const inputClass =
    "focus-ring w-full rounded-[8px] border border-slate-200 bg-white px-4 py-3 text-sm text-medical-ink placeholder:text-slate-400";
  const labelClass = "text-sm font-bold text-medical-navy";
  const errorClass = "mt-1 text-xs font-semibold text-red-600";

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className={`grid gap-4 ${compact ? "" : "rounded-[8px] border border-slate-100 bg-white p-6 shadow-card"}`}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="patientName" className={labelClass}>Patient Name *</label>
          <input
            id="patientName"
            className={`${inputClass} mt-1`}
            placeholder="Enter patient name"
            value={form.patientName}
            onChange={(event) => updateField("patientName", event.target.value)}
            aria-invalid={Boolean(errors.patientName)}
            aria-describedby={errors.patientName ? "patientName-error" : undefined}
            required
          />
          {errors.patientName && <p id="patientName-error" className={errorClass}>{errors.patientName}</p>}
        </div>

        <div>
          <label htmlFor="mobileNumber" className={labelClass}>Mobile Number *</label>
          <input
            id="mobileNumber"
            className={`${inputClass} mt-1`}
            placeholder="+91 98765 43210"
            value={form.mobileNumber}
            onChange={(event) => updateField("mobileNumber", event.target.value)}
            aria-invalid={Boolean(errors.mobileNumber)}
            aria-describedby={errors.mobileNumber ? "mobileNumber-error" : undefined}
            required
          />
          {errors.mobileNumber && <p id="mobileNumber-error" className={errorClass}>{errors.mobileNumber}</p>}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="email" className={labelClass}>Email</label>
          <input
            id="email"
            type="email"
            className={`${inputClass} mt-1`}
            placeholder="name@example.com"
            value={form.email}
            onChange={(event) => updateField("email", event.target.value)}
          />
        </div>

        <div>
          <label htmlFor="doctor" className={labelClass}>Select Doctor</label>
          <select
            id="doctor"
            className={`${inputClass} mt-1`}
            value={form.doctor}
            onChange={(event) => updateField("doctor", event.target.value)}
          >
            {doctors.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="appointmentDate" className={labelClass}>Appointment Date *</label>
          <input
            id="appointmentDate"
            type="date"
            className={`${inputClass} mt-1`}
            value={form.appointmentDate}
            onChange={(event) => updateField("appointmentDate", event.target.value)}
            aria-invalid={Boolean(errors.appointmentDate)}
            aria-describedby={errors.appointmentDate ? "appointmentDate-error" : undefined}
            required
          />
          {errors.appointmentDate && <p id="appointmentDate-error" className={errorClass}>{errors.appointmentDate}</p>}
        </div>

        <div>
          <label htmlFor="appointmentTime" className={labelClass}>Appointment Time *</label>
          <input
            id="appointmentTime"
            type="time"
            className={`${inputClass} mt-1`}
            value={form.appointmentTime}
            onChange={(event) => updateField("appointmentTime", event.target.value)}
            aria-invalid={Boolean(errors.appointmentTime)}
            aria-describedby={errors.appointmentTime ? "appointmentTime-error" : undefined}
            required
          />
          {errors.appointmentTime && <p id="appointmentTime-error" className={errorClass}>{errors.appointmentTime}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="notes" className={labelClass}>Symptoms / Notes</label>
        <textarea
          id="notes"
          className={`${inputClass} mt-1 min-h-28 resize-y`}
          placeholder="Briefly describe symptoms or appointment notes"
          value={form.notes}
          onChange={(event) => updateField("notes", event.target.value)}
        />
      </div>

      {status.message && (
        <div
          className={`rounded-[8px] px-4 py-3 text-sm font-semibold ${
            status.type === "success" ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700"
          }`}
          role={status.type === "success" ? "status" : "alert"}
        >
          {status.type === "success" && <CheckCircle2 className="mr-2 inline h-4 w-4" />}
          {status.message}
        </div>
      )}

      <Button as="button" type="submit" className="w-full" disabled={submitting}>
        {submitting ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" /> Submitting...
          </>
        ) : (
          <>
            <CalendarCheck className="h-5 w-5" /> Request Appointment
          </>
        )}
      </Button>
    </form>
  );
}
