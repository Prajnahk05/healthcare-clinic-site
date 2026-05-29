import {
  Activity,
  Baby,
  BadgeCheck,
  Bone,
  CalendarCheck,
  ClipboardCheck,
  Clock,
  Download,
  FlaskConical,
  HeartPulse,
  Hospital,
  MapPin,
  MessageCircle,
  Microscope,
  Pill,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Syringe,
  Truck,
  Users,
} from "lucide-react";

export const clinic = {
  name: "ANJANADRI MEDICALS & CLINIC",
  subName: "LAB & DIAGNOSTICS",
  tagline: "Your Health, Our Commitment",
  phone: "+91 96865 68804",
  whatsapp: "+91 96865 68804",
  email: "anjanadrihealthcare@gmail.com",
  address: "Sri Rajarajeshwari Jothishya Mandir, 12, 1st cross rd, MEI Colony, Phase3, Laggere, Bengaluru, karnataka 560058",
  emergency: "+91 96865 68804",
  hours: "Mon - Sat: 8:00 AM - 9:00 PM, Sun: 9:00 AM - 2:00 PM",
};

export const navLinks = [
  { label: "Home", path: "#/" },
  { label: "About", path: "#/about" },
  { label: "Doctors", path: "#/doctors" },
  { label: "Services", path: "#/services" },
  { label: "Lab Tests", path: "#/lab-tests" },
  { label: "Packages", path: "#/packages" },
  { label: "Medical Store", path: "#/medical-store" },
  { label: "Contact", path: "#/contact" },
];

export const heroImage =
  "https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?auto=format&fit=crop&w=1400&q=85";

export const environmentImages = [
  "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=900&q=85",
];

export const stats = [
  { value: "10k+", label: "Patients served" },
  { value: "24hr", label: "Report support" },
  { value: "2", label: "Expert doctors" },
  { value: "100+", label: "Lab tests" },
];

export const whyChoose = [
  {
    icon: ShieldCheck,
    title: "Trusted Care",
    text: "Experienced doctors, transparent advice, and family-friendly treatment plans.",
  },
  {
    icon: Microscope,
    title: "Accurate Lab Reports",
    text: "Reliable diagnostics with careful sample handling and clear report guidance.",
  },
  {
    icon: Pill,
    title: "Medicines Under One Roof",
    text: "Branded and generic medicines with prescription support and availability checks.",
  },
  {
    icon: HeartPulse,
    title: "Affordable Treatment",
    text: "Practical care pathways designed for families, children, and senior citizens.",
  },
];

export const doctors = [
  {
    name: "Dr. Shushruth Devanna",
    qualification: "MBBS, MS (Orthopedic Surgeon)",
    role: "Orthopedic Surgeon",
    image:
      "https://images.unsplash.com/photo-1622902046580-2b47f47f5471?auto=format&fit=crop&w=700&q=85",
    timings: "Mon - Sat, 10:00 AM - 2:00 PM",
    experience: "Bone, joint, fracture, spine, and knee care.",
    specialties: [
      "Bone & Joint Problems",
      "Fractures",
      "Back Pain",
      "Knee Pain",
      "Orthopedic Treatments",
    ],
  },
  {
    name: "Dr. Niranjan",
    qualification: "MBBS, MD (Pediatrics)",
    role: "Children Specialist",
    image:
      "https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=700&q=85",
    timings: "Mon - Sat, 4:00 PM - 8:00 PM",
    experience: "Child healthcare, vaccinations, fever care, and growth guidance.",
    specialties: [
      "Child Health Care",
      "Fever & Infection Treatment",
      "Vaccination",
      "Growth & Nutrition Guidance",
    ],
  },
];

export const serviceGroups = [
  {
    title: "Clinic Services",
    icon: Stethoscope,
    services: [
      { title: "General Consultation", icon: Stethoscope },
      { title: "Orthopedic Consultation", icon: Bone },
      { title: "Children Specialist Consultation", icon: Baby },
      { title: "Fever & Infection Treatment", icon: Activity },
      { title: "Health Checkups", icon: ClipboardCheck },
    ],
  },
  {
    title: "Laboratory & Diagnostics",
    icon: FlaskConical,
    services: [
      { title: "Blood Tests", icon: FlaskConical },
      { title: "Diabetes Tests", icon: Activity },
      { title: "Thyroid Tests", icon: Sparkles },
      { title: "CBC & Hemoglobin Tests", icon: Microscope },
      { title: "Liver Function Tests", icon: HeartPulse },
      { title: "Kidney Function Tests", icon: Hospital },
      { title: "Full Body Checkup Packages", icon: BadgeCheck },
    ],
  },
  {
    title: "Medical Store",
    icon: Pill,
    services: [
      { title: "All Types of Medicines Available", icon: Pill },
      { title: "Branded & Generic Medicines", icon: ShieldCheck },
      { title: "Prescription Medicines", icon: ClipboardCheck },
      { title: "Health Care Products", icon: HeartPulse },
    ],
  },
];

export const labTests = [
  { name: "Complete Blood Count (CBC)", category: "Blood", price: "₹350", time: "Same day" },
  { name: "Hemoglobin Test", category: "Blood", price: "₹150", time: "Same day" },
  { name: "Fasting Blood Sugar", category: "Diabetes", price: "₹120", time: "Same day" },
  { name: "HbA1c", category: "Diabetes", price: "₹450", time: "Same day" },
  { name: "Thyroid Profile", category: "Hormone", price: "₹650", time: "Same day" },
  { name: "Liver Function Test", category: "Organ Function", price: "₹800", time: "24 hours" },
  { name: "Kidney Function Test", category: "Organ Function", price: "₹750", time: "24 hours" },
  { name: "Lipid Profile", category: "Cardiac", price: "₹700", time: "Same day" },
  { name: "Vitamin D", category: "Vitamin", price: "₹1,100", time: "24 hours" },
  { name: "Full Body Checkup", category: "Package", price: "₹2,499", time: "24 hours" },
];

export const packages = [
  {
    title: "Basic Health Checkup",
    price: "₹999",
    icon: ClipboardCheck,
    tests: ["CBC", "Blood Sugar", "Urine Routine", "Doctor Review"],
  },
  {
    title: "Diabetes Package",
    price: "₹1,299",
    icon: Activity,
    tests: ["Fasting Sugar", "PP Sugar", "HbA1c", "Kidney Profile"],
  },
  {
    title: "Full Body Checkup",
    price: "₹2,499",
    icon: HeartPulse,
    tests: ["CBC", "LFT", "KFT", "Lipid", "Thyroid", "Consultation"],
  },
  {
    title: "Senior Citizen Package",
    price: "₹2,999",
    icon: Users,
    tests: ["Cardiac Risk", "Diabetes", "Kidney", "Liver", "Bone Health"],
  },
  {
    title: "Children Health Package",
    price: "₹1,499",
    icon: Baby,
    tests: ["CBC", "Vitamin Profile", "Growth Review", "Pediatric Consultation"],
  },
];

export const testimonials = [
  {
    name: "Ramesh K.",
    text: "The doctors explained everything patiently and the lab reports were delivered on time.",
  },
  {
    name: "Priya S.",
    text: "Clean clinic, friendly staff, and helpful medicine availability after consultation.",
  },
  {
    name: "Meena R.",
    text: "My child received excellent care. The pediatric consultation felt very reassuring.",
  },
  {
    name: "Arun M.",
    text: "Convenient place for checkups, diagnostics, and medicines under one roof.",
  },
];

export const faqs = [
  {
    q: "Do I need an appointment?",
    a: "Walk-ins are welcome, but appointments help reduce waiting time.",
  },
  {
    q: "Can I download reports online?",
    a: "Yes, use the report portal UI with your registered mobile number and report ID.",
  },
  {
    q: "Are home sample collections available?",
    a: "Home collection can be arranged based on location and test requirements.",
  },
  {
    q: "Do you keep pediatric medicines?",
    a: "Common pediatric, prescription, generic, and health care products are available.",
  },
];

export const storeCategories = [
  { title: "Prescription Medicines", icon: ClipboardCheck },
  { title: "Branded Medicines", icon: ShieldCheck },
  { title: "Generic Medicines", icon: Pill },
  { title: "Baby Care", icon: Baby },
  { title: "Wellness Products", icon: HeartPulse },
  { title: "Home Delivery", icon: Truck },
];

export const contactCards = [
  { title: "Call", value: clinic.phone, icon: Clock },
  { title: "WhatsApp", value: clinic.whatsapp, icon: MessageCircle },
  { title: "Email", value: clinic.email, icon: Download },
  { title: "Visit", value: clinic.address, icon: MapPin },
];

export const appointmentDefaults = {
  departments: ["General Consultation", "Orthopedic", "Pediatrics", "Lab Test", "Health Package"],
  slots: ["Morning", "Afternoon", "Evening"],
};

export const ctaItems = [
  { label: "Book Appointment", icon: CalendarCheck, href: "#/contact" },
  { label: "Contact Now", icon: MessageCircle, href: "tel:+919686568804" },
];

export function phoneHref(value) {
  return `tel:${String(value).replace(/\s+/g, "")}`;
}

export function whatsappHref(value) {
  return `https://wa.me/${String(value).replace(/\D/g, "")}`;
}
