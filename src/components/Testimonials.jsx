import { Quote } from "lucide-react";
import { testimonials } from "../data/siteData.js";
import { SectionHeader } from "./SectionHeader.jsx";

export function Testimonials() {
  const loop = [...testimonials, ...testimonials];
  return (
    <section className="section-pad overflow-hidden bg-slate-50">
      <div className="container-max">
        <SectionHeader eyebrow="Testimonials" title="Patients Trust Our Care" text="Realistic patient stories that reflect our focus on clarity, comfort, and timely care." />
        <div className="mt-10 overflow-hidden">
          <div className="flex w-max animate-marquee gap-5 hover:[animation-play-state:paused]">
            {loop.map((item, index) => (
              <article key={`${item.name}-${index}`} className="w-[300px] rounded-[8px] border border-slate-100 bg-white p-6 shadow-card sm:w-[380px]">
                <Quote className="mb-4 h-8 w-8 text-medical-teal" />
                <p className="text-sm leading-6 text-slate-600">"{item.text}"</p>
                <p className="mt-5 font-bold text-medical-navy">{item.name}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
