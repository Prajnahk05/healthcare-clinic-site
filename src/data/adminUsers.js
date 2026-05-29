export const adminRoles = ["Owner", "Doctor", "Reception", "Lab Staff", "Pharmacy"];

export const adminStatuses = ["Active", "Pending", "Disabled"];

export const defaultAdminUsers = [
  {
    id: "admin-owner",
    name: "Clinic Owner",
    email: "anjanadrihealthcare@gmail.com",
    role: "Owner",
    status: "Active",
    lastActive: "Today",
  },
  {
    id: "admin-reception",
    name: "Reception Admin",
    email: "reception@anjanadri.local",
    role: "Reception",
    status: "Pending",
    lastActive: "Invite pending",
  },
];
