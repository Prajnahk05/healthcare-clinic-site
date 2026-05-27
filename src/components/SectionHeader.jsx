export function SectionHeader({ eyebrow, title, text, align = "center" }) {
  const isCenter = align === "center";
  return (
    <div className={`${isCenter ? "mx-auto text-center" : ""} max-w-3xl`}>
      {eyebrow && (
        <p className="mb-3 text-sm font-bold uppercase tracking-[0.22em] text-medical-teal">{eyebrow}</p>
      )}
      <h2 className="text-3xl font-extrabold tracking-tight text-medical-navy sm:text-4xl">{title}</h2>
      {text && <p className="mt-4 text-base leading-7 text-slate-600 sm:text-lg">{text}</p>}
    </div>
  );
}
