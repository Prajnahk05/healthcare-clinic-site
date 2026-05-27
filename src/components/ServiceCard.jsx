import { Card } from "./Card.jsx";

export function ServiceCard({ icon: Icon, title, text }) {
  return (
    <Card className="p-6">
      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-[8px] bg-gradient-to-br from-teal-50 to-blue-50 text-medical-teal">
        <Icon className="h-6 w-6" aria-hidden="true" />
      </div>
      <h3 className="text-lg font-bold text-medical-navy">{title}</h3>
      {text && <p className="mt-3 text-sm leading-6 text-slate-600">{text}</p>}
    </Card>
  );
}
