import { supabase } from "../lib/supabaseClient.js";

export const appointmentStorageKey = "anjanadri-appointments";

export const appointmentStatuses = ["New", "Confirmed", "Completed", "Cancelled"];

function fromAppointmentRow(row) {
  return {
    id: row.id,
    patientName: row.patient_name,
    mobileNumber: row.mobile_number,
    email: row.email || "",
    appointmentType: row.appointment_type,
    doctor: row.doctor,
    serviceName: row.service_name,
    appointmentDate: row.appointment_date,
    appointmentTime: String(row.appointment_time || "").slice(0, 5),
    notes: row.symptoms_notes || "",
    status: row.status,
    createdAt: row.created_at,
  };
}

function toAppointmentRow(appointment) {
  return {
    patient_name: appointment.patientName,
    mobile_number: appointment.mobileNumber,
    email: appointment.email || null,
    appointment_type: appointment.appointmentType,
    doctor: appointment.doctor,
    service_name: appointment.serviceName,
    appointment_date: appointment.appointmentDate,
    appointment_time: appointment.appointmentTime,
    symptoms_notes: appointment.notes || null,
    status: appointment.status || "New",
  };
}

export function loadAppointments() {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const saved = window.localStorage.getItem(appointmentStorageKey);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

export function saveAppointments(appointments) {
  window.localStorage.setItem(appointmentStorageKey, JSON.stringify(appointments));
  window.dispatchEvent(new Event("anjanadri-appointments-updated"));
}

export async function fetchAppointments() {
  if (!supabase) {
    return loadAppointments();
  }

  const { data, error } = await supabase
    .from("appointments")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    throw error;
  }

  const appointments = data.map(fromAppointmentRow);
  saveAppointments(appointments);
  return appointments;
}

export async function addAppointment(appointment) {
  if (supabase) {
    const { data, error } = await supabase
      .from("appointments")
      .insert(toAppointmentRow(appointment))
      .select()
      .single();

    if (error) {
      throw error;
    }

    const nextAppointment = fromAppointmentRow(data);
    saveAppointments([nextAppointment, ...loadAppointments().filter((item) => item.id !== nextAppointment.id)]);
    return nextAppointment;
  }

  const appointments = loadAppointments();
  const nextAppointment = {
    id: `appointment-${Date.now()}`,
    status: "New",
    createdAt: new Date().toISOString(),
    ...appointment,
  };

  saveAppointments([nextAppointment, ...appointments]);
  return nextAppointment;
}

export async function updateAppointmentStatus(id, status) {
  if (supabase) {
    const { data, error } = await supabase
      .from("appointments")
      .update({ status, updated_at: new Date().toISOString() })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      throw error;
    }

    return fromAppointmentRow(data);
  }

  const appointments = loadAppointments().map((appointment) => (appointment.id === id ? { ...appointment, status } : appointment));
  saveAppointments(appointments);
  return appointments.find((appointment) => appointment.id === id);
}
