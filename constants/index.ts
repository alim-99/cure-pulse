export const GenderOptions = ["male", "female", "Other"];

export const PatientFormDefaultValues = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  birthDate: new Date(Date.now()),
  gender: "male" as Gender,
  address: "",
  occupation: "",
  emergencyContactName: "",
  emergencyContactNumber: "",
  primaryPhysician: "",
  insuranceProvider: "",
  insurancePolicyNumber: "",
  allergies: "",
  currentMedication: "",
  familyMedicalHistory: "",
  pastMedicalHistory: "",
  identificationType: "Birth Certificate",
  identificationNumber: "",
  identificationDocument: [],
  treatmentConsent: false,
  disclosureConsent: false,
  privacyConsent: false,
};

export const IdentificationTypes = [
  "Birth Certificate",
  "Driver's License",
  "Medical Insurance Card/Policy",
  "Military ID Card",
  "National Identity Card",
  "Passport",
  "Resident Alien Card (Green Card)",
  "Social Security Card",
  "State ID Card",
  "Student ID Card",
  "Voter ID Card",
];

export const Doctors = [
  {
    image: "/dr-green.png",
    name: "John Green",
  },
  {
    image: "/dr-cameron.png",
    name: "Leila Cameron",
  },
  {
    image: "/dr-livingston.png",
    name: "David Livingston",
  },
  {
    image: "/dr-peter.png",
    name: "Evan Peter",
  },
  {
    image: "/dr-powell.png",
    name: "Jane Powell",
  },
  {
    image: "/dr-remirez.png",
    name: "Alex Ramirez",
  },
  {
    image: "/dr-lee.png",
    name: "Jasmine Lee",
  },
  {
    image: "/dr-cruz.png",
    name: "Alyana Cruz",
  },
  {
    image: "/dr-sharma.png",
    name: "Hardik Sharma",
  },
];

export const StatusIcon = {
  scheduled: "/assets/icons/check.svg",
  pending: "/assets/icons/pending.svg",
  cancelled: "/assets/icons/cancelled.svg",
};