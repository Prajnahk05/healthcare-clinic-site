import {
  CheckCircle2,
  Clock3,
  Download,
  FileText,
  HelpCircle,
  KeyRound,
  LockKeyhole,
  LogOut,
  MessageCircle,
  Phone,
  ShieldCheck,
} from "lucide-react";
import { useMemo, useState } from "react";
import { Button } from "../components/Button.jsx";
import { SectionHeader } from "../components/SectionHeader.jsx";
import { fetchPublishedReportsByMobile } from "../data/reportStore.js";
import { clinic, phoneHref, whatsappHref } from "../data/siteData.js";

const reportSteps = ["Sample Collected", "In Lab Testing", "Under Review", "Ready for Download"];

const faqItems = [
  {
    q: "Which mobile number should I enter?",
    a: "Enter the mobile number you shared at registration or sample collection. The OTP will be sent only to that registered number.",
  },
  {
    q: "Why is my report not showing up?",
    a: "Routine reports are usually ready within 4 to 24 hours. Specialized tests can take longer if doctor review or repeat verification is needed.",
  },
  {
    q: "I cannot open the downloaded PDF.",
    a: "Check your Downloads folder and open the file with any standard PDF reader. If the file still does not open, contact lab support for a fresh copy.",
  },
];

export function LabTests() {
  const [mobileNumber, setMobileNumber] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [verified, setVerified] = useState(false);
  const [matchingReports, setMatchingReports] = useState([]);
  const [reportError, setReportError] = useState("");
  const [openFaq, setOpenFaq] = useState(faqItems[0].q);

  const normalizedMobileNumber = mobileNumber.trim();
  const canSendOtp = /^[0-9+\-\s()]{10,15}$/.test(normalizedMobileNumber);
  const canVerify = otpSent && otp.trim().length >= 4;
  const activeStep = useMemo(() => (verified ? 3 : otpSent ? 2 : canSendOtp ? 1 : 0), [canSendOtp, otpSent, verified]);

  function handleLookup() {
    if (!canSendOtp) return;
    setOtpSent(true);
    setVerified(false);
    setOtp("");
    setMatchingReports([]);
    setReportError("");
  }

  async function handleVerify() {
    if (!canVerify) return;
    setReportError("");
    try {
      const reports = await fetchPublishedReportsByMobile(normalizedMobileNumber);
      setMatchingReports(reports);
      setVerified(true);
    } catch {
      setReportError("We could not load reports right now. Please try again.");
    }
  }

  function handleLogout() {
    setMobileNumber("");
    setOtpSent(false);
    setOtp("");
    setVerified(false);
    setMatchingReports([]);
    setReportError("");
  }

  return (
    <>
      <section className="section-pad bg-gradient-to-br from-white to-blue-50">
        <div className="container-max grid items-center gap-10 lg:grid-cols-[1fr_420px]">
          <SectionHeader
            align="left"
            eyebrow="Patient Reports"
            title="Secure Clinical Results Portal"
            text="Access your lab report with your registered mobile number and OTP verification. Your results stay private, easy to track, and simple to download when ready."
          />

          <div className="rounded-[8px] border border-teal-100 bg-white p-5 shadow-card">
            <div className="flex items-start gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[8px] bg-teal-50 text-medical-teal">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-extrabold text-medical-navy">Privacy First</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Medical reports contain sensitive health information. OTP verification helps ensure only the registered patient can access the report.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad bg-white">
        <div className="container-max grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
          <div className="rounded-[8px] border border-slate-100 bg-white p-5 shadow-card sm:p-7">
            <div className="flex flex-col gap-4 border-b border-slate-100 pb-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-medical-teal">Report Access</p>
                <h2 className="mt-2 text-2xl font-extrabold text-medical-navy">Download Clinical Result</h2>
              </div>
              {verified && (
                <Button as="button" type="button" variant="ghost" onClick={handleLogout}>
                  <LogOut className="h-5 w-5" /> Secure Logout
                </Button>
              )}
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-[1fr_auto]">
              <label className="grid gap-2">
                <span className="text-sm font-bold text-medical-navy">Registered Mobile Number</span>
                <span className="relative">
                  <Phone className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                  <input
                    className="focus-ring w-full rounded-[8px] border border-slate-200 bg-white py-3 pl-12 pr-4 text-medical-navy placeholder:text-slate-400"
                    inputMode="tel"
                    placeholder="Example: +91 96865 68804"
                    value={mobileNumber}
                    onChange={(event) => {
                      setMobileNumber(event.target.value);
                      setOtpSent(false);
                      setOtp("");
                      setVerified(false);
                    }}
                  />
                </span>
              </label>
              <Button as="button" type="button" className="self-end" disabled={!canSendOtp} onClick={handleLookup}>
                <KeyRound className="h-5 w-5" /> Send OTP
              </Button>
            </div>

            {otpSent && (
              <div className="mt-5 rounded-[8px] border border-teal-100 bg-teal-50 p-4">
                <p className="text-sm font-semibold text-medical-navy">
                  OTP sent immediately to {normalizedMobileNumber}.
                </p>
                <div className="mt-4 grid gap-4 md:grid-cols-[1fr_auto]">
                  <label className="grid gap-2">
                    <span className="text-sm font-bold text-medical-navy">One-Time Password</span>
                    <input
                      className="focus-ring rounded-[8px] border border-teal-100 bg-white px-4 py-3 text-medical-navy placeholder:text-slate-400"
                      inputMode="numeric"
                      placeholder="Enter OTP"
                      value={otp}
                      onChange={(event) => setOtp(event.target.value)}
                    />
                  </label>
                  <Button as="button" type="button" className="self-end" disabled={!canVerify} onClick={handleVerify}>
                    <ShieldCheck className="h-5 w-5" /> Verify
                  </Button>
                </div>
              </div>
            )}

            <div className="mt-8">
              <h3 className="text-lg font-extrabold text-medical-navy">Report Status</h3>
              <div className="mt-5 grid gap-3 sm:grid-cols-4">
                {reportSteps.map((step, index) => {
                  const isDone = index <= activeStep;
                  const isReady = index === reportSteps.length - 1 && verified;
                  return (
                    <div
                      key={step}
                      className={`rounded-[8px] border p-4 ${
                        isDone ? "border-teal-200 bg-teal-50 text-medical-navy" : "border-slate-100 bg-slate-50 text-slate-500"
                      }`}
                    >
                      <div className={`mb-3 flex h-9 w-9 items-center justify-center rounded-full ${isDone ? "bg-medical-teal text-white" : "bg-white text-slate-400"}`}>
                        {isDone ? <CheckCircle2 className="h-5 w-5" /> : <Clock3 className="h-5 w-5" />}
                      </div>
                      <p className="text-sm font-extrabold">{step}</p>
                      {isReady && <p className="mt-2 text-xs font-semibold text-medical-teal">Available now</p>}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-7 rounded-[8px] border border-slate-100 bg-slate-50 p-5">
              <div className="flex items-start gap-3">
                <FileText className="mt-1 h-6 w-6 shrink-0 text-medical-teal" />
                <div>
                  <h3 className="font-extrabold text-medical-navy">Clinical Reports</h3>
                  <p className="mt-1 text-sm leading-6 text-slate-600">
                    Published reports uploaded by the clinic admin will appear here after OTP verification.
                  </p>
                </div>
              </div>

              {!verified && (
                <div className="mt-5 rounded-[8px] border border-slate-100 bg-white p-4 text-sm font-semibold text-slate-600">
                  Verify your registered mobile number to view available downloads.
                </div>
              )}

              {verified && matchingReports.length === 0 && (
                <div className="mt-5 rounded-[8px] border border-amber-100 bg-amber-50 p-4 text-sm font-semibold text-amber-800">
                  No published reports are available for {normalizedMobileNumber}. Please contact lab support if your sample was already collected.
                </div>
              )}

              {reportError && (
                <div className="mt-5 rounded-[8px] border border-red-100 bg-red-50 p-4 text-sm font-semibold text-red-700">
                  {reportError}
                </div>
              )}

              {verified && matchingReports.length > 0 && (
                <div className="mt-5 grid gap-3">
                  {matchingReports.map((report) => (
                    <div key={report.id} className="flex flex-col gap-4 rounded-[8px] border border-slate-100 bg-white p-4 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <h4 className="font-extrabold text-medical-navy">{report.title}</h4>
                        <p className="mt-1 text-sm text-slate-600">
                          {report.patientName} · {report.reportDate}
                        </p>
                        <p className="mt-1 text-xs font-semibold text-slate-500">{report.fileName}</p>
                      </div>
                      <Button as="a" href={report.fileData} download={report.fileName} className="shrink-0">
                        <Download className="h-5 w-5" /> Download
                      </Button>
                    </div>
                  ))}
                </div>
              )}

              <p className="mt-4 flex items-center gap-2 text-xs font-semibold text-slate-500">
                <LockKeyhole className="h-4 w-4" /> Session automatically clears when you use Secure Logout.
              </p>
            </div>
          </div>

          <aside className="grid content-start gap-5">
            <div className="rounded-[8px] bg-medical-navy p-6 text-white shadow-card">
              <h3 className="text-xl font-extrabold">Need Help?</h3>
              <p className="mt-2 text-sm leading-6 text-blue-100">For urgent report questions or download issues, contact the lab support desk directly.</p>
              <div className="mt-5 grid gap-3">
                <Button as="a" href={phoneHref(clinic.phone)} variant="secondary">
                  <Phone className="h-5 w-5" /> Call {clinic.phone}
                </Button>
                <Button as="a" href={whatsappHref(clinic.whatsapp)} variant="secondary">
                  <MessageCircle className="h-5 w-5" /> WhatsApp Support
                </Button>
              </div>
            </div>

            <div className="rounded-[8px] border border-slate-100 bg-white p-6 shadow-card">
              <div className="flex items-center gap-3">
                <HelpCircle className="h-6 w-6 text-medical-teal" />
                <h3 className="text-xl font-extrabold text-medical-navy">Quick Help</h3>
              </div>
              <div className="mt-5 grid gap-3">
                <div className="rounded-[8px] border border-slate-100 bg-slate-50 p-4">
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">Sample Receipt</p>
                  <div className="mt-3 rounded-[8px] bg-white p-4 text-sm shadow-sm">
                    <div className="mb-3 h-2 w-24 rounded-full bg-slate-200" />
                    <p className="font-extrabold text-medical-navy">Mobile: +91 96865 68804</p>
                    <p className="mt-2 text-slate-500">Name: Patient Name</p>
                    <p className="mt-1 text-slate-500">Bill No: 0048</p>
                  </div>
                </div>

                {faqItems.map((item) => {
                  const isOpen = openFaq === item.q;
                  return (
                    <button
                      key={item.q}
                      type="button"
                      className="focus-ring rounded-[8px] border border-slate-100 bg-white p-4 text-left"
                      onClick={() => setOpenFaq(isOpen ? "" : item.q)}
                    >
                      <span className="flex items-center justify-between gap-3 font-extrabold text-medical-navy">
                        {item.q}
                        <span className="text-xl leading-none text-medical-teal">{isOpen ? "-" : "+"}</span>
                      </span>
                      {isOpen && <span className="mt-3 block text-sm leading-6 text-slate-600">{item.a}</span>}
                    </button>
                  );
                })}
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
