import { supabase } from "../lib/supabaseClient.js";

export const reportStorageKey = "anjanadri-patient-reports";

export const reportStatuses = ["Published", "Draft", "Archived"];
export const reportBucket = "patient-reports";

export const defaultReports = [
  {
    id: "report-demo-cbc",
    patientName: "Patient Name",
    mobile: "+91 96865 68804",
    title: "Complete Blood Count (CBC)",
    reportDate: "2026-06-15",
    status: "Published",
    fileName: "cbc-report-sample.txt",
    fileData:
      "data:text/plain;charset=utf-8,Anjanadri%20Medicals%20%26%20Clinic%0ASample%20CBC%20Report%0AThis%20is%20a%20demo%20download%20file.",
    updatedAt: "2026-06-15",
  },
];

export function normalizeMobile(value) {
  return String(value || "").replace(/\D/g, "");
}

function fromReportRow(row) {
  return {
    id: row.id,
    patientName: row.patient_name,
    mobile: row.mobile,
    title: row.title,
    reportDate: row.report_date,
    status: row.status,
    fileName: row.file_name,
    fileData: row.file_url,
    fileUrl: row.file_url,
    updatedAt: row.updated_at,
  };
}

function toReportRow(report) {
  return {
    patient_name: report.patientName,
    mobile: report.mobile,
    title: report.title,
    report_date: report.reportDate,
    status: report.status,
    file_name: report.fileName,
    file_url: report.fileUrl || report.fileData,
  };
}

export function loadReports() {
  if (typeof window === "undefined") {
    return defaultReports;
  }

  try {
    const saved = window.localStorage.getItem(reportStorageKey);
    return saved ? JSON.parse(saved) : defaultReports;
  } catch {
    return defaultReports;
  }
}

export function saveReports(reports) {
  window.localStorage.setItem(reportStorageKey, JSON.stringify(reports));
  window.dispatchEvent(new Event("anjanadri-reports-updated"));
}

export async function fetchReports() {
  if (!supabase) {
    return loadReports();
  }

  const { data, error } = await supabase
    .from("patient_reports")
    .select("*")
    .order("report_date", { ascending: false });

  if (error) {
    throw error;
  }

  const reports = data.map(fromReportRow);
  saveReports(reports);
  return reports;
}

export async function fetchPublishedReportsByMobile(mobile) {
  if (!supabase) {
    return findPublishedReportsByMobile(loadReports(), mobile);
  }

  const { data, error } = await supabase
    .from("patient_reports")
    .select("*")
    .eq("status", "Published")
    .order("report_date", { ascending: false });

  if (error) {
    throw error;
  }

  return findPublishedReportsByMobile(data.map(fromReportRow), mobile);
}

export async function uploadReportFile(file) {
  if (!supabase || !file) {
    return null;
  }

  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "-");
  const filePath = `reports/${Date.now()}-${safeName}`;
  const { error } = await supabase.storage.from(reportBucket).upload(filePath, file, {
    cacheControl: "3600",
    upsert: false,
  });

  if (error) {
    throw error;
  }

  const { data } = supabase.storage.from(reportBucket).getPublicUrl(filePath);
  return data.publicUrl;
}

export async function upsertReport(report) {
  if (supabase) {
    const query = report.id
      ? supabase.from("patient_reports").update({ ...toReportRow(report), updated_at: new Date().toISOString() }).eq("id", report.id)
      : supabase.from("patient_reports").insert(toReportRow(report));

    const { data, error } = await query.select().single();

    if (error) {
      throw error;
    }

    return fromReportRow(data);
  }

  const reports = loadReports();
  const nextReport = report.id ? report : { ...report, id: `report-${Date.now()}` };
  const nextReports = report.id
    ? reports.map((item) => (item.id === report.id ? nextReport : item))
    : [nextReport, ...reports];

  saveReports(nextReports);
  return nextReport;
}

export async function updateReportStatus(id, status) {
  if (supabase) {
    const { data, error } = await supabase
      .from("patient_reports")
      .update({ status, updated_at: new Date().toISOString() })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      throw error;
    }

    return fromReportRow(data);
  }

  const reports = loadReports().map((report) => (report.id === id ? { ...report, status } : report));
  saveReports(reports);
  return reports.find((report) => report.id === id);
}

export async function deleteReportById(id) {
  if (supabase) {
    const { error } = await supabase.from("patient_reports").delete().eq("id", id);

    if (error) {
      throw error;
    }
  }

  const reports = loadReports().filter((report) => report.id !== id);
  saveReports(reports.length ? reports : defaultReports);
}

export function findPublishedReportsByMobile(reports, mobile) {
  const normalizedMobile = normalizeMobile(mobile);

  return reports
    .filter((report) => report.status === "Published" && normalizeMobile(report.mobile) === normalizedMobile)
    .sort((a, b) => String(b.reportDate).localeCompare(String(a.reportDate)));
}
