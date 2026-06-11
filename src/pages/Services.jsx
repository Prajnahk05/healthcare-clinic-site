import { SectionHeader } from "../components/SectionHeader.jsx";
import { ServiceCard } from "../components/ServiceCard.jsx";
import { serviceGroups } from "../data/siteData.js";

export function Services() {
  return (
    <section className="section-pad bg-white">
      <div className="container-max">
        <SectionHeader eyebrow="Services" title="Healthcare Services Under One Roof" text="Consultations, lab diagnostics, and medicines organized for convenient family care." />
        <div className="mt-12 grid gap-12">
          {serviceGroups.map((group) => (
            <div key={group.title}>
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-[8px] bg-teal-50 text-medical-teal">
                  <group.icon className="h-6 w-6" />
                </div>
                <h2 className="text-2xl font-extrabold text-medical-navy">{group.title}</h2>
              </div>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {group.services.map((service) => (
                  <ServiceCard
                    key={service.title}
                    {...service}
                    href={group.title === "Laboratory & Diagnostics" ? "#/lab-tests" : undefined}
                    text="Available with supportive staff and patient-friendly guidance."
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
