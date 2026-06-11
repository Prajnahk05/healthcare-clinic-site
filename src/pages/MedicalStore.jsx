import { AlertCircle, CheckCircle2, UploadCloud, X } from "lucide-react";
import { useState } from "react";
import { Button } from "../components/Button.jsx";
import { SectionHeader } from "../components/SectionHeader.jsx";
import { storeCategories } from "../data/siteData.js";

export function MedicalStore() {
  const [selectedFile, setSelectedFile] = useState("");
  const [message, setMessage] = useState(null);

  function handleSubmit(event) {
    event.preventDefault();

    if (!selectedFile) {
      setMessage({ type: "error", text: "Please choose a prescription file before submitting." });
      return;
    }

    setMessage({ type: "success", text: "Prescription submitted successfully." });
  }

  return (
    <>
      {message && (
        <div className="fixed right-4 top-24 z-50 flex max-w-sm items-start gap-3 rounded-[8px] bg-white p-4 text-sm font-semibold text-medical-navy shadow-card ring-1 ring-slate-100">
          {message.type === "success" ? (
            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-medical-green" />
          ) : (
            <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-amber-500" />
          )}
          <p className="leading-6">{message.text}</p>
          <button
            type="button"
            onClick={() => setMessage(null)}
            className="ml-auto rounded-full p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
            aria-label="Close message"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

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
        <div className="container-max">
          <form onSubmit={handleSubmit} className="rounded-[8px] border border-dashed border-teal-300 bg-teal-50 p-8">
            <UploadCloud className="h-10 w-10 text-medical-teal" />
            <h2 className="mt-4 text-2xl font-extrabold text-medical-navy">Prescription Upload</h2>
            <p className="mt-3 text-slate-600">Upload or share your prescription to confirm medicine availability and prepare your order.</p>
            <input
              type="file"
              onChange={(event) => setSelectedFile(event.target.files?.[0]?.name ?? "")}
              className="mt-6 w-full rounded-[8px] bg-white p-3 text-sm"
            />
            <Button as="button" type="submit" className="mt-5">Submit Prescription</Button>
          </form>
        </div>
      </section>
    </>
  );
}
