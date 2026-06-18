import { useEffect, useMemo, useState } from "react";
import { AppointmentModal } from "./components/AppointmentModal.jsx";
import { FloatingActions } from "./components/FloatingActions.jsx";
import { Footer } from "./components/Footer.jsx";
import { Navbar } from "./components/Navbar.jsx";
import { About } from "./pages/About.jsx";
import { AdminUsers } from "./pages/AdminUsers.jsx";
import { Contact } from "./pages/Contact.jsx";
import { Doctors } from "./pages/Doctors.jsx";
import { Home } from "./pages/Home.jsx";
import { LabTests } from "./pages/LabTests.jsx";
import { MedicalStore } from "./pages/MedicalStore.jsx";
import { Packages } from "./pages/Packages.jsx";
import { Services } from "./pages/Services.jsx";

const routes = {
  "#/": { title: "Anjanadri Medicals & Clinic | Lab & Diagnostics", component: Home },
  "#/about": { title: "About | Anjanadri Medicals & Clinic", component: About },
  "#/doctors": { title: "Doctors | Anjanadri Medicals & Clinic", component: Doctors },
  "#/services": { title: "Services | Anjanadri Medicals & Clinic", component: Services },
  "#/lab-tests": { title: "My Report | Anjanadri Medicals & Clinic", component: LabTests },
  "#/packages": { title: "Health Packages | Anjanadri Medicals & Clinic", component: Packages },
  "#/medical-store": { title: "Medical Store | Anjanadri Medicals & Clinic", component: MedicalStore },
  "#/contact": { title: "Contact | Anjanadri Medicals & Clinic", component: Contact },
  "#/admin-users": { title: "Admin Users | Anjanadri Medicals & Clinic", component: AdminUsers },
};

function currentHash() {
  if (typeof window === "undefined") {
    return "#/";
  }
  return routes[window.location.hash] ? window.location.hash : "#/";
}

export default function App() {
  const [route, setRoute] = useState(currentHash);
  const [appointmentOpen, setAppointmentOpen] = useState(false);

  useEffect(() => {
    if (!window.location.hash) {
      window.location.replace("#/");
      setRoute("#/");
    }
    const onHashChange = () => {
      setRoute(currentHash());
      window.scrollTo({ top: 0, behavior: "smooth" });
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  const ActivePage = useMemo(() => routes[route]?.component ?? Home, [route]);
  const openAppointmentModal = () => setAppointmentOpen(true);
  const closeAppointmentModal = () => setAppointmentOpen(false);
  const navigateTo = (path) => {
    if (!routes[path]) {
      return;
    }

    if (window.location.hash !== path) {
      window.location.hash = path;
    }
    setRoute(path);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    document.title = routes[route]?.title ?? routes["#/"].title;
    const description = document.querySelector("meta[name='description']");
    if (description) {
      description.setAttribute(
        "content",
        "Anjanadri Medicals & Clinic Lab & Diagnostics provides trusted doctors, accurate lab tests, medicines, health packages, and patient-first care under one roof."
      );
    }
  }, [route]);

  return (
    <div className="min-h-screen bg-slate-50 text-medical-ink">
      <Navbar route={route} onBookAppointment={openAppointmentModal} onNavigate={navigateTo} />
      <main>
        <ActivePage onBookAppointment={openAppointmentModal} />
      </main>
      <Footer />
      <FloatingActions />
      <AppointmentModal isOpen={appointmentOpen} onClose={closeAppointmentModal} />
    </div>
  );
}
