import { supabase } from "../lib/supabaseClient.js";
import { defaultAdminUsers } from "./adminUsers.js";

export const adminUserStorageKey = "anjanadri-admin-users";

function fromAdminUserRow(row) {
  return {
    id: row.id,
    name: row.full_name,
    email: row.email,
    role: row.role,
    status: row.status,
    lastActive: row.status === "Active" ? "Today" : "Invite pending",
  };
}

function toAdminUserRow(user) {
  return {
    full_name: user.name,
    email: user.email,
    role: user.role,
    status: user.status,
    updated_at: new Date().toISOString(),
  };
}

export function loadAdminUsers() {
  if (typeof window === "undefined") {
    return defaultAdminUsers;
  }

  try {
    const saved = window.localStorage.getItem(adminUserStorageKey);
    return saved ? JSON.parse(saved) : defaultAdminUsers;
  } catch {
    return defaultAdminUsers;
  }
}

export function saveAdminUsers(users) {
  window.localStorage.setItem(adminUserStorageKey, JSON.stringify(users));
}

export async function fetchAdminUsers() {
  if (!supabase) {
    return loadAdminUsers();
  }

  const { data, error } = await supabase.from("admin_users").select("*").order("created_at", { ascending: false });

  if (error) {
    throw error;
  }

  const users = data.map(fromAdminUserRow);
  saveAdminUsers(users);
  return users.length ? users : defaultAdminUsers;
}

export async function createAdminUser(user) {
  if (supabase) {
    const { data, error } = await supabase.from("admin_users").insert(toAdminUserRow(user)).select().single();

    if (error) {
      throw error;
    }

    return fromAdminUserRow(data);
  }

  const nextUser = { id: `admin-${Date.now()}`, lastActive: user.status === "Active" ? "Today" : "Invite pending", ...user };
  saveAdminUsers([nextUser, ...loadAdminUsers()]);
  return nextUser;
}

export async function updateAdminUserStatus(id, status) {
  if (supabase) {
    const { data, error } = await supabase
      .from("admin_users")
      .update({ status, updated_at: new Date().toISOString() })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      throw error;
    }

    return fromAdminUserRow(data);
  }

  const users = loadAdminUsers().map((user) => (user.id === id ? { ...user, status } : user));
  saveAdminUsers(users);
  return users.find((user) => user.id === id);
}
