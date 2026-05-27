import { PhoneCall } from "lucide-react";
import { clinic, phoneHref } from "../data/siteData.js";
import { Button } from "./Button.jsx";

export function EmergencyBanner() {
  return (
    <section className="px-4 py-8 sm:px-6 lg:px-8">
      <div className="container-max rounded-[8px] bg-gradient-to-r from-medical-teal via-medical-blue to-medical-green p-6 text-white shadow-soft md:flex md:items-center md:justify-between md:p-8">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-white/80">Emergency Support</p>
          <h2 className="mt-2 text-2xl font-extrabold sm:text-3xl">Need urgent medical guidance?</h2>
          <p className="mt-2 text-white/85">Call our clinic team for the next available consultation or emergency direction.</p>
        </div>
        <Button href={phoneHref(clinic.emergency)} variant="secondary" className="mt-5 md:mt-0">
          <PhoneCall className="h-5 w-5" /> {clinic.emergency}
        </Button>
      </div>
    </section>
  );
}
