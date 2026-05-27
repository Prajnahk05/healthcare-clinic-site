import { UploadCloud } from "lucide-react";
import { Button } from "../components/Button.jsx";
import { SectionHeader } from "../components/SectionHeader.jsx";
import { storeCategories } from "../data/siteData.js";

export function MedicalStore() {
  return (
    <>
      <section className="section-pad bg-gradient-to-br from-white to-green-50">
        <div className="container-max">
          <SectionHeader eyebrow="Medical Store" title="Medicines and Healthcare Products" text="Availability support for branded, generic, prescription medicines, baby care, wellness, and daily healthcare needs." />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {storeCategories.map((item) => (
              <article key={item.title} className="rounded-[8px] bg-white p-6 shadow-card">
                <item.icon className="mb-5 h-8 w-8 text-medical-teal" />
                <h3 className="text-lg font-bold text-medical-navy">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">Check availability at the counter or through WhatsApp before visiting.</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad bg-white">
        <div className="container-max grid gap-8 lg:grid-cols-2">
          <div className="rounded-[8px] border border-dashed border-teal-300 bg-teal-50 p-8">
            <UploadCloud className="h-10 w-10 text-medical-teal" />
            <h2 className="mt-4 text-2xl font-extrabold text-medical-navy">Prescription Upload</h2>
            <p className="mt-3 text-slate-600">Upload or share your prescription to confirm medicine availability and prepare your order.</p>
            <input type="file" className="mt-6 w-full rounded-[8px] bg-white p-3 text-sm" />
            <Button as="button" type="button" className="mt-5">Submit Prescription</Button>
          </div>
          <div className="rounded-[8px] bg-medical-navy p-8 text-white shadow-card">
            <h2 className="text-2xl font-extrabold">Home Delivery Availability</h2>
            <p className="mt-4 leading-7 text-blue-100">Home delivery can be arranged for nearby locations based on medicine availability, prescription verification, and order timing.</p>
            <div className="mt-6 rounded-[8px] bg-white/10 p-5">
              <p className="font-bold">Availability Info</p>
              <p className="mt-2 text-sm text-blue-100">Call or WhatsApp with medicine names, prescription, and delivery address.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
