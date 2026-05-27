import { MessageCircle, Phone } from "lucide-react";
import { clinic, phoneHref } from "../data/siteData.js";

export function FloatingActions() {
  return (
    <>
      <a
        href={`https://wa.me/${clinic.whatsapp.replace(/\D/g, "")}`}
        className="fixed bottom-6 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-card transition hover:-translate-y-1 hover:bg-green-600"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="h-7 w-7" />
      </a>
      <a
        href={phoneHref(clinic.emergency)}
        className="fixed inset-x-4 bottom-4 z-40 flex items-center justify-center gap-2 rounded-full bg-medical-blue px-5 py-3 text-sm font-extrabold text-white shadow-card md:hidden"
      >
        <Phone className="h-5 w-5" /> Emergency Call
      </a>
    </>
  );
}
