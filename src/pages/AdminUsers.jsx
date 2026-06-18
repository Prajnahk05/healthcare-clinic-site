import { CalendarCheck, Download, FileText, FileUp, ShieldCheck, Trash2, UserPlus, Users } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Button } from "../components/Button.jsx";
import { SectionHeader } from "../components/SectionHeader.jsx";
import { appointmentStatuses, fetchAppointments, loadAppointments, saveAppointments, updateAppointmentStatus as saveAppointmentStatus } from "../data/appointmentStore.js";
import { adminRoles, adminStatuses } from "../data/adminUsers.js";
import { createAdminUser, fetchAdminUsers, loadAdminUsers, saveAdminUsers, updateAdminUserStatus } from "../data/adminUserStore.js";
import {
  defaultReports,
  deleteReportById,
  fetchReports,
  loadReports,
  reportStatuses,
  saveReports,
  updateReportStatus as saveReportStatus,
  uploadReportFile,
  upsertReport,
} from "../data/reportStore.js";

export function AdminUsers() {
  const [users, setUsers] = useState(loadAdminUsers);
  const [reports, setReports] = useState(loadReports);
  const [appointments, setAppointments] = useState(loadAppointments);
  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "Reception",
    status: "Pending",
  });
  const [reportForm, setReportForm] = useState({
    patientName: "",
    mobile: "",
    title: "",
    reportDate: new Date().toISOString().slice(0, 10),
    status: "Published",
    fileName: "",
    fileData: "",
  });
  const [reportFile, setReportFile] = useState(null);
  const [editingReportId, setEditingReportId] = useState("");
  const [dashboardMessage, setDashboardMessage] = useState("");

  useEffect(() => {
    saveAdminUsers(users);
  }, [users]);

  useEffect(() => {
    saveReports(reports);
  }, [reports]);

  useEffect(() => {
    let active = true;

    async function loadDashboardData() {
      try {
        const [nextUsers, nextAppointments, nextReports] = await Promise.all([fetchAdminUsers(), fetchAppointments(), fetchReports()]);
        if (!active) return;
        setUsers(nextUsers);
        setAppointments(nextAppointments);
        setReports(nextReports);
      } catch {
        if (active) {
          setDashboardMessage("Supabase data could not be loaded. Showing saved browser data for now.");
        }
      }
    }

    loadDashboardData();

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    const syncAppointments = () => setAppointments(loadAppointments());
    window.addEventListener("anjanadri-appointments-updated", syncAppointments);
    return () => window.removeEventListener("anjanadri-appointments-updated", syncAppointments);
  }, []);

  const activeCount = useMemo(() => users.filter((user) => user.status === "Active").length, [users]);
  const publishedReportCount = useMemo(() => reports.filter((report) => report.status === "Published").length, [reports]);
  const newAppointmentCount = useMemo(() => appointments.filter((appointment) => appointment.status === "New").length, [appointments]);

  function updateField(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  async function addUser(event) {
    event.preventDefault();

    if (!form.name.trim() || !form.email.trim()) {
      return;
    }

    try {
      const savedUser = await createAdminUser({
        name: form.name.trim(),
        email: form.email.trim(),
        role: form.role,
        status: form.status,
      });
      setUsers((current) => [savedUser, ...current]);
      setDashboardMessage("");
    } catch {
      setDashboardMessage("Admin user could not be saved to Supabase. Check admin_users policies or duplicate email.");
      return;
    }

    setForm({
      name: "",
      email: "",
      role: "Reception",
      status: "Pending",
    });
  }

  async function updateStatus(id, status) {
    const previousUsers = users;
    setUsers((current) => current.map((user) => (user.id === id ? { ...user, status } : user)));

    try {
      const savedUser = await updateAdminUserStatus(id, status);
      setUsers((current) => current.map((user) => (user.id === id ? savedUser : user)));
      setDashboardMessage("");
    } catch {
      setUsers(previousUsers);
      setDashboardMessage("Admin user status could not be updated in Supabase.");
    }
  }

  function updateReportField(event) {
    const { name, value } = event.target;
    setReportForm((current) => ({ ...current, [name]: value }));
  }

  function updateReportFile(event) {
    const file = event.target.files?.[0];
    if (!file) return;

    setReportFile(file);
    const reader = new FileReader();
    reader.onload = () => {
      setReportForm((current) => ({
        ...current,
        fileName: file.name,
        fileData: String(reader.result || ""),
      }));
    };
    reader.readAsDataURL(file);
  }

  function resetReportForm() {
    setReportForm({
      patientName: "",
      mobile: "",
      title: "",
      reportDate: new Date().toISOString().slice(0, 10),
      status: "Published",
      fileName: "",
      fileData: "",
    });
    setEditingReportId("");
    setReportFile(null);
  }

  async function saveReport(event) {
    event.preventDefault();

    if (!reportForm.patientName.trim() || !reportForm.mobile.trim() || !reportForm.title.trim()) {
      return;
    }

    let fileUrl = reportForm.fileData;

    try {
      const uploadedUrl = await uploadReportFile(reportFile);
      if (uploadedUrl) {
        fileUrl = uploadedUrl;
      }
    } catch {
      setDashboardMessage("Report file upload failed. Please check the Supabase Storage bucket setup.");
      return;
    }

    const nextReport = {
      ...reportForm,
      id: editingReportId || undefined,
      patientName: reportForm.patientName.trim(),
      mobile: reportForm.mobile.trim(),
      title: reportForm.title.trim(),
      fileName: reportForm.fileName || "Report file not attached",
      fileData: fileUrl,
      fileUrl,
      updatedAt: new Date().toISOString().slice(0, 10),
    };

    try {
      const savedReport = await upsertReport(nextReport);
      setReports((current) => {
        if (editingReportId) {
          return current.map((report) => (report.id === editingReportId ? savedReport : report));
        }

        return [savedReport, ...current];
      });
      setDashboardMessage("");
    } catch {
      setDashboardMessage("Report could not be saved to Supabase. Please check patient_reports policies.");
      return;
    }

    resetReportForm();
  }

  function editReport(report) {
    setEditingReportId(report.id);
    setReportForm({
      patientName: report.patientName,
      mobile: report.mobile,
      title: report.title,
      reportDate: report.reportDate,
      status: report.status,
      fileName: report.fileName,
      fileData: report.fileData,
    });
    setReportFile(null);
  }

  async function updateReportStatus(id, status) {
    const previousReports = reports;
    setReports((current) =>
      current.map((report) => (report.id === id ? { ...report, status, updatedAt: new Date().toISOString().slice(0, 10) } : report))
    );

    try {
      const savedReport = await saveReportStatus(id, status);
      setReports((current) => current.map((report) => (report.id === id ? savedReport : report)));
      setDashboardMessage("");
    } catch {
      setReports(previousReports);
      setDashboardMessage("Report status could not be updated in Supabase.");
    }
  }

  async function deleteReport(id) {
    const previousReports = reports;
    setReports((current) => {
      const nextReports = current.filter((report) => report.id !== id);
      return nextReports.length ? nextReports : defaultReports;
    });

    try {
      await deleteReportById(id);
      setDashboardMessage("");
    } catch {
      setReports(previousReports);
      setDashboardMessage("Report could not be deleted from Supabase.");
    }

    if (editingReportId === id) {
      resetReportForm();
    }
  }

  function sendAppointmentWhatsApp(appointment) {
    const phoneNumber = String(appointment.mobileNumber || "").replace(/\D/g, "");
    if (!phoneNumber) return;

    const message = `Your appointment at Anjanadri Medicals & Clinic is confirmed for ${appointment.serviceName} with ${appointment.doctor} on ${appointment.appointmentDate} at ${appointment.appointmentTime}.`;
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, "_blank", "noreferrer");
  }

  async function updateAppointmentStatus(id, status) {
    const appointment = appointments.find((item) => item.id === id);
    const previousAppointments = appointments;
    const nextAppointments = appointments.map((item) => (item.id === id ? { ...item, status } : item));
    setAppointments(nextAppointments);
    saveAppointments(nextAppointments);

    try {
      const savedAppointment = await saveAppointmentStatus(id, status);
      setAppointments((current) => current.map((item) => (item.id === id ? savedAppointment : item)));
      setDashboardMessage("");
      if (status === "Confirmed" && appointment?.status !== "Confirmed") {
        sendAppointmentWhatsApp({ ...appointment, status });
      }
    } catch {
      setAppointments(previousAppointments);
      saveAppointments(previousAppointments);
      setDashboardMessage("Appointment status could not be updated in Supabase.");
    }
  }

  return (
    <>
      <section className="section-pad bg-gradient-to-br from-white to-blue-50">
        <div className="container-max">
          <SectionHeader
            eyebrow="Admin"
            title="Admin Users"
            text="Create and manage clinic staff access for appointments, lab reports, medicines, and patient support."
          />

          {dashboardMessage && (
            <div className="mt-6 rounded-[8px] border border-amber-100 bg-amber-50 px-4 py-3 text-sm font-semibold text-amber-800">
              {dashboardMessage}
            </div>
          )}

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            <div className="rounded-[8px] bg-white p-5 shadow-card">
              <Users className="mb-4 h-7 w-7 text-medical-teal" />
              <p className="text-3xl font-extrabold text-medical-navy">{users.length}</p>
              <p className="mt-1 text-sm font-semibold text-slate-600">Total admin users</p>
            </div>
            <div className="rounded-[8px] bg-white p-5 shadow-card">
              <ShieldCheck className="mb-4 h-7 w-7 text-medical-green" />
              <p className="text-3xl font-extrabold text-medical-navy">{activeCount}</p>
              <p className="mt-1 text-sm font-semibold text-slate-600">Active users</p>
            </div>
            <div className="rounded-[8px] bg-white p-5 shadow-card">
              <UserPlus className="mb-4 h-7 w-7 text-medical-blue" />
              <p className="text-3xl font-extrabold text-medical-navy">{users.length - activeCount}</p>
              <p className="mt-1 text-sm font-semibold text-slate-600">Pending or disabled</p>
            </div>
            <div className="rounded-[8px] bg-white p-5 shadow-card md:col-span-3">
              <FileText className="mb-4 h-7 w-7 text-medical-teal" />
              <p className="text-3xl font-extrabold text-medical-navy">{publishedReportCount}</p>
              <p className="mt-1 text-sm font-semibold text-slate-600">Published patient reports available for download</p>
            </div>
            <div className="rounded-[8px] bg-white p-5 shadow-card md:col-span-3">
              <CalendarCheck className="mb-4 h-7 w-7 text-medical-blue" />
              <p className="text-3xl font-extrabold text-medical-navy">{newAppointmentCount}</p>
              <p className="mt-1 text-sm font-semibold text-slate-600">New appointment requests waiting for admin review</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad bg-white">
        <div className="container-max">
          <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-medical-teal">Bookings</p>
              <h2 className="mt-2 text-2xl font-extrabold text-medical-navy">Appointment Requests</h2>
            </div>
            <p className="text-sm font-semibold text-slate-500">{appointments.length} total requests</p>
          </div>

          <div className="overflow-hidden rounded-[8px] border border-slate-100 bg-white shadow-card">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[980px] text-left text-sm">
                <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                  <tr>
                    <th className="px-6 py-4">Patient</th>
                    <th className="px-6 py-4">Contact</th>
                    <th className="px-6 py-4">Doctor</th>
                    <th className="px-6 py-4">Test / Service</th>
                    <th className="px-6 py-4">Date & Time</th>
                    <th className="px-6 py-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {appointments.length === 0 && (
                    <tr>
                      <td colSpan="6" className="px-6 py-8 text-center font-semibold text-slate-500">
                        No appointment requests yet. New bookings from the website will appear here.
                      </td>
                    </tr>
                  )}
                  {appointments.map((appointment) => (
                    <tr key={appointment.id} className="align-middle">
                      <td className="px-6 py-4">
                        <p className="font-bold text-medical-navy">{appointment.patientName}</p>
                        <p className="mt-1 text-xs text-slate-500">{appointment.appointmentType}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="font-semibold text-slate-700">{appointment.mobileNumber}</p>
                        {appointment.email && <p className="mt-1 text-xs text-slate-500">{appointment.email}</p>}
                      </td>
                      <td className="px-6 py-4 text-slate-600">{appointment.doctor}</td>
                      <td className="px-6 py-4">
                        <p className="font-semibold text-medical-navy">{appointment.serviceName}</p>
                        {appointment.notes && <p className="mt-1 max-w-xs text-xs leading-5 text-slate-500">{appointment.notes}</p>}
                      </td>
                      <td className="px-6 py-4 text-slate-600">
                        <p>{appointment.appointmentDate}</p>
                        <p className="mt-1 text-xs font-semibold text-slate-500">{appointment.appointmentTime}</p>
                      </td>
                      <td className="px-6 py-4">
                        <select
                          className="focus-ring rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-700"
                          value={appointment.status}
                          onChange={(event) => updateAppointmentStatus(appointment.id, event.target.value)}
                        >
                          {appointmentStatuses.map((status) => (
                            <option key={status}>{status}</option>
                          ))}
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad bg-slate-50">
        <div className="container-max grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <form onSubmit={saveReport} className="rounded-[8px] border border-slate-100 bg-white p-6 shadow-card">
            <h2 className="mb-5 text-2xl font-extrabold text-medical-navy">
              {editingReportId ? "Update Patient Report" : "Upload Patient Report"}
            </h2>
            <div className="grid gap-4">
              <input
                className="focus-ring rounded-[8px] border border-slate-200 px-4 py-3"
                name="patientName"
                placeholder="Patient name"
                value={reportForm.patientName}
                onChange={updateReportField}
              />
              <input
                className="focus-ring rounded-[8px] border border-slate-200 px-4 py-3"
                name="mobile"
                placeholder="Registered mobile number"
                value={reportForm.mobile}
                onChange={updateReportField}
              />
              <input
                className="focus-ring rounded-[8px] border border-slate-200 px-4 py-3"
                name="title"
                placeholder="Report title, example: CBC Report"
                value={reportForm.title}
                onChange={updateReportField}
              />
              <input
                className="focus-ring rounded-[8px] border border-slate-200 px-4 py-3"
                name="reportDate"
                type="date"
                value={reportForm.reportDate}
                onChange={updateReportField}
              />
              <select className="focus-ring rounded-[8px] border border-slate-200 px-4 py-3" name="status" value={reportForm.status} onChange={updateReportField}>
                {reportStatuses.map((status) => (
                  <option key={status}>{status}</option>
                ))}
              </select>
              <label className="focus-ring flex cursor-pointer items-center justify-between gap-3 rounded-[8px] border border-dashed border-teal-200 bg-teal-50 px-4 py-3 text-sm font-bold text-medical-navy">
                <span className="flex min-w-0 items-center gap-2">
                  <FileUp className="h-5 w-5 shrink-0 text-medical-teal" />
                  <span className="truncate">{reportForm.fileName || "Attach report file PDF/image"}</span>
                </span>
                <input className="sr-only" type="file" accept=".pdf,image/*,.txt" onChange={updateReportFile} />
              </label>
              <div className="flex flex-wrap gap-3">
                <Button as="button" type="submit">
                  <FileUp className="h-5 w-5" /> {editingReportId ? "Update Report" : "Publish Report"}
                </Button>
                {editingReportId && (
                  <Button as="button" type="button" variant="secondary" onClick={resetReportForm}>
                    Cancel
                  </Button>
                )}
              </div>
            </div>
          </form>

          <div className="overflow-hidden rounded-[8px] border border-slate-100 bg-white shadow-card">
            <div className="border-b border-slate-100 p-6">
              <h2 className="text-2xl font-extrabold text-medical-navy">Patient Reports</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[760px] text-left text-sm">
                <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                  <tr>
                    <th className="px-6 py-4">Patient</th>
                    <th className="px-6 py-4">Mobile</th>
                    <th className="px-6 py-4">Report</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {reports.map((report) => (
                    <tr key={report.id} className="align-middle">
                      <td className="px-6 py-4">
                        <p className="font-bold text-medical-navy">{report.patientName}</p>
                        <p className="mt-1 text-xs text-slate-500">{report.reportDate}</p>
                      </td>
                      <td className="px-6 py-4 text-slate-600">{report.mobile}</td>
                      <td className="px-6 py-4">
                        <p className="font-bold text-medical-navy">{report.title}</p>
                        <p className="mt-1 text-xs text-slate-500">{report.fileName}</p>
                      </td>
                      <td className="px-6 py-4">
                        <select
                          className="focus-ring rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-700"
                          value={report.status}
                          onChange={(event) => updateReportStatus(report.id, event.target.value)}
                        >
                          {reportStatuses.map((status) => (
                            <option key={status}>{status}</option>
                          ))}
                        </select>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-2">
                          <Button as="button" type="button" variant="ghost" className="px-3 py-2 text-xs" onClick={() => editReport(report)}>
                            Edit
                          </Button>
                          {report.fileData && (
                            <Button as="a" href={report.fileData} download={report.fileName} variant="secondary" className="px-3 py-2 text-xs">
                              <Download className="h-4 w-4" /> Test
                            </Button>
                          )}
                          <Button as="button" type="button" variant="secondary" className="px-3 py-2 text-xs text-red-600" onClick={() => deleteReport(report.id)}>
                            <Trash2 className="h-4 w-4" /> Delete
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad bg-white">
        <div className="container-max grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <form onSubmit={addUser} className="rounded-[8px] border border-slate-100 bg-slate-50 p-6 shadow-card">
            <h2 className="mb-5 text-2xl font-extrabold text-medical-navy">Create Admin User</h2>
            <div className="grid gap-4">
              <input
                className="focus-ring rounded-[8px] border border-slate-200 px-4 py-3"
                name="name"
                placeholder="Full name"
                value={form.name}
                onChange={updateField}
              />
              <input
                className="focus-ring rounded-[8px] border border-slate-200 px-4 py-3"
                name="email"
                placeholder="Email address"
                type="email"
                value={form.email}
                onChange={updateField}
              />
              <select className="focus-ring rounded-[8px] border border-slate-200 px-4 py-3" name="role" value={form.role} onChange={updateField}>
                {adminRoles.map((role) => (
                  <option key={role}>{role}</option>
                ))}
              </select>
              <select className="focus-ring rounded-[8px] border border-slate-200 px-4 py-3" name="status" value={form.status} onChange={updateField}>
                {adminStatuses.map((status) => (
                  <option key={status}>{status}</option>
                ))}
              </select>
              <Button as="button" type="submit">
                <UserPlus className="h-5 w-5" /> Add Admin User
              </Button>
            </div>
          </form>

          <div className="overflow-hidden rounded-[8px] border border-slate-100 bg-white shadow-card">
            <div className="border-b border-slate-100 p-6">
              <h2 className="text-2xl font-extrabold text-medical-navy">Users</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[680px] text-left text-sm">
                <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                  <tr>
                    <th className="px-6 py-4">Name</th>
                    <th className="px-6 py-4">Email</th>
                    <th className="px-6 py-4">Role</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Last Active</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {users.map((user) => (
                    <tr key={user.id} className="align-middle">
                      <td className="px-6 py-4 font-bold text-medical-navy">{user.name}</td>
                      <td className="px-6 py-4 text-slate-600">{user.email}</td>
                      <td className="px-6 py-4 text-slate-600">{user.role}</td>
                      <td className="px-6 py-4">
                        <select
                          className="focus-ring rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-700"
                          value={user.status}
                          onChange={(event) => updateStatus(user.id, event.target.value)}
                        >
                          {adminStatuses.map((status) => (
                            <option key={status}>{status}</option>
                          ))}
                        </select>
                      </td>
                      <td className="px-6 py-4 text-slate-600">{user.lastActive}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
