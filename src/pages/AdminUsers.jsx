import { ShieldCheck, UserPlus, Users } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Button } from "../components/Button.jsx";
import { SectionHeader } from "../components/SectionHeader.jsx";
import { adminRoles, adminStatuses, defaultAdminUsers } from "../data/adminUsers.js";

const storageKey = "anjanadri-admin-users";

function loadAdminUsers() {
  try {
    const saved = window.localStorage.getItem(storageKey);
    return saved ? JSON.parse(saved) : defaultAdminUsers;
  } catch {
    return defaultAdminUsers;
  }
}

export function AdminUsers() {
  const [users, setUsers] = useState(loadAdminUsers);
  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "Reception",
    status: "Pending",
  });

  useEffect(() => {
    window.localStorage.setItem(storageKey, JSON.stringify(users));
  }, [users]);

  const activeCount = useMemo(() => users.filter((user) => user.status === "Active").length, [users]);

  function updateField(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  function addUser(event) {
    event.preventDefault();

    if (!form.name.trim() || !form.email.trim()) {
      return;
    }

    setUsers((current) => [
      {
        id: `admin-${Date.now()}`,
        name: form.name.trim(),
        email: form.email.trim(),
        role: form.role,
        status: form.status,
        lastActive: form.status === "Active" ? "Today" : "Invite pending",
      },
      ...current,
    ]);

    setForm({
      name: "",
      email: "",
      role: "Reception",
      status: "Pending",
    });
  }

  function updateStatus(id, status) {
    setUsers((current) => current.map((user) => (user.id === id ? { ...user, status } : user)));
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
