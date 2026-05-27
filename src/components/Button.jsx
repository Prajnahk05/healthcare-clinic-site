export function Button({ as: Component = "a", children, className = "", variant = "primary", ...props }) {
  const variants = {
    primary: "bg-gradient-to-r from-medical-teal to-medical-blue text-white shadow-soft hover:-translate-y-0.5 hover:shadow-card",
    secondary: "bg-white text-medical-navy ring-1 ring-slate-200 hover:-translate-y-0.5 hover:ring-teal-200 hover:shadow-card",
    ghost: "bg-teal-50 text-medical-teal hover:bg-teal-100",
  };

  return (
    <Component
      className={`focus-ring inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-bold transition duration-300 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
}
