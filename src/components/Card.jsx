export function Card({ children, className = "" }) {
  return (
    <div className={`rounded-[8px] border border-slate-100 bg-white shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-soft ${className}`}>
      {children}
    </div>
  );
}
