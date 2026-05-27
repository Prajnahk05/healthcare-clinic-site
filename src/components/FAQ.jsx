import { faqs } from "../data/siteData.js";
import { SectionHeader } from "./SectionHeader.jsx";

export function FAQ() {
  return (
    <section className="section-pad bg-white">
      <div className="container-max">
        <SectionHeader eyebrow="FAQ" title="Common Questions" text="Quick answers for appointments, reports, medicines, and home collection." />
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {faqs.map((faq) => (
            <details key={faq.q} className="group rounded-[8px] border border-slate-100 bg-slate-50 p-5">
              <summary className="cursor-pointer list-none text-base font-bold text-medical-navy">
                {faq.q}
                <span className="float-right text-medical-teal transition group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 text-sm leading-6 text-slate-600">{faq.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
