import { Download, FileText, LockKeyhole } from "lucide-react";
import { Button } from "./Button.jsx";

export function ReportPortal() {
  return (
    <div className="rounded-[8px] bg-medical-navy p-6 text-white shadow-card">
      <div className="mb-5 flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-[8px] bg-white/10">
          <FileText className="h-6 w-6" />
        </div>
        <div>
          <h3 className="text-xl font-extrabold">Online Report Download</h3>
          <p className="text-sm text-blue-100">Secure portal UI for registered patients.</p>
        </div>
      </div>
      <div className="grid gap-3">
        <input className="focus-ring rounded-[8px] border border-white/15 bg-white/10 px-4 py-3 text-white placeholder:text-blue-100" placeholder="Registered mobile number" />
        <input className="focus-ring rounded-[8px] border border-white/15 bg-white/10 px-4 py-3 text-white placeholder:text-blue-100" placeholder="Report ID" />
        <Button as="button" type="button" variant="secondary" className="mt-2">
          <Download className="h-5 w-5" /> Download Report
        </Button>
      </div>
      <p className="mt-4 flex items-center gap-2 text-xs text-blue-100">
        <LockKeyhole className="h-4 w-4" /> Reports are shared only after patient verification.
      </p>
    </div>
  );
}
