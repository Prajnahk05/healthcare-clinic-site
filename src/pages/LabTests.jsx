import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { ReportPortal } from "../components/ReportPortal.jsx";
import { SectionHeader } from "../components/SectionHeader.jsx";
import { labTests } from "../data/siteData.js";

export function LabTests() {
  const [query, setQuery] = useState("");
  const filtered = useMemo(
    () => labTests.filter((test) => `${test.name} ${test.category}`.toLowerCase().includes(query.toLowerCase())),
    [query]
  );

  return (
    <>
      <section className="section-pad bg-gradient-to-br from-white to-blue-50">
        <div className="container-max">
          <SectionHeader eyebrow="Lab Tests" title="Diagnostics With Search and Report Support" text="Browse common tests, sample pricing, delivery timing, and secure report download UI." />
          <div className="mx-auto mt-8 flex max-w-2xl items-center gap-3 rounded-full border border-slate-200 bg-white px-5 py-3 shadow-soft">
            <Search className="h-5 w-5 text-medical-teal" />
            <input value={query} onChange={(event) => setQuery(event.target.value)} className="w-full bg-transparent outline-none" placeholder="Search blood, diabetes, thyroid, CBC..." />
          </div>
        </div>
      </section>

      <section className="section-pad bg-white">
        <div className="container-max grid gap-8 lg:grid-cols-[1fr_380px]">
          <div className="overflow-hidden rounded-[8px] border border-slate-100 bg-white shadow-card">
            <div className="grid grid-cols-4 bg-slate-50 px-4 py-3 text-xs font-extrabold uppercase tracking-[0.14em] text-slate-500">
              <span>Test</span><span>Category</span><span>Price</span><span>Delivery</span>
            </div>
            {filtered.map((test) => (
              <div key={test.name} className="grid grid-cols-4 gap-3 border-t border-slate-100 px-4 py-4 text-sm">
                <span className="font-bold text-medical-navy">{test.name}</span>
                <span className="text-slate-600">{test.category}</span>
                <span className="font-bold text-medical-teal">{test.price}</span>
                <span className="text-slate-600">{test.time}</span>
              </div>
            ))}
          </div>
          <div className="grid gap-6">
            <div className="rounded-[8px] bg-teal-50 p-6">
              <h3 className="text-xl font-extrabold text-medical-navy">Report Delivery</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">Most routine reports are delivered the same day. Specialized profiles may take 24 hours depending on sample timing.</p>
            </div>
            <ReportPortal />
          </div>
        </div>
      </section>
    </>
  );
}
