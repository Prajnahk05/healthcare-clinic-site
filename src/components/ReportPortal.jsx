import { Download, FileText, KeyRound, LockKeyhole, Send } from "lucide-react";
import { useState } from "react";
import { Button } from "./Button.jsx";

export function ReportPortal() {
  const [mobileNumber, setMobileNumber] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");

  const canSendOtp = mobileNumber.trim().length >= 10;
  const canDownload = otpSent && otp.trim().length >= 4;

  function handleSendOtp() {
    if (!canSendOtp) return;
    setOtpSent(true);
  }

  return (
    <div className="rounded-[8px] bg-medical-navy p-6 text-white shadow-card">
      <div className="mb-5 flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-[8px] bg-white/10">
          <FileText className="h-6 w-6" />
        </div>
        <div>
          <h3 className="text-xl font-extrabold">Online Report Download</h3>
          <p className="text-sm text-blue-100">Verify with your registered mobile number and OTP.</p>
        </div>
      </div>
      <div className="grid gap-3">
        <input
          className="focus-ring rounded-[8px] border border-white/15 bg-white/10 px-4 py-3 text-white placeholder:text-blue-100"
          inputMode="tel"
          placeholder="Registered mobile number"
          value={mobileNumber}
          onChange={(event) => {
            setMobileNumber(event.target.value);
            setOtpSent(false);
            setOtp("");
          }}
        />
        <Button as="button" type="button" variant="secondary" disabled={!canSendOtp} onClick={handleSendOtp}>
          <Send className="h-5 w-5" /> Send OTP
        </Button>
        {otpSent && (
          <p className="rounded-[8px] border border-white/15 bg-white/10 px-4 py-3 text-sm text-blue-100">
            OTP has been sent to the registered mobile number.
          </p>
        )}
        <div className="relative">
          <KeyRound className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-blue-100" />
          <input
            className="focus-ring w-full rounded-[8px] border border-white/15 bg-white/10 py-3 pl-12 pr-4 text-white placeholder:text-blue-100 disabled:cursor-not-allowed disabled:opacity-60"
            disabled={!otpSent}
            inputMode="numeric"
            placeholder="Enter OTP"
            value={otp}
            onChange={(event) => setOtp(event.target.value)}
          />
        </div>
        <Button as="button" type="button" variant="secondary" className="mt-2" disabled={!canDownload}>
          <Download className="h-5 w-5" /> Download Report
        </Button>
      </div>
      <p className="mt-4 flex items-center gap-2 text-xs text-blue-100">
        <LockKeyhole className="h-4 w-4" /> Reports are shared only after OTP verification.
      </p>
    </div>
  );
}
