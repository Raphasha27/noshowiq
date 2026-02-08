export const PROVINCES = [
  { value: "Eastern Cape", label: "Eastern Cape" },
  { value: "Free State", label: "Free State" },
  { value: "Gauteng", label: "Gauteng" },
  { value: "KwaZulu-Natal", label: "KwaZulu-Natal" },
  { value: "Limpopo", label: "Limpopo" },
  { value: "Mpumalanga", label: "Mpumalanga" },
  { value: "Northern Cape", label: "Northern Cape" },
  { value: "North West", label: "North West" },
  { value: "Western Cape", label: "Western Cape" },
];

export const LANGUAGES = [
  { value: "English", label: "English" },
  { value: "Zulu", label: "isiZulu" },
  { value: "Xhosa", label: "isiXhosa" },
  { value: "Afrikaans", label: "Afrikaans" },
  { value: "Sotho", label: "Sesotho" },
  { value: "Tswana", label: "Setswana" },
  { value: "Tsonga", label: "Xitsonga" },
  { value: "Venda", label: "Tshivenda" },
];

export const CLINICS = [
  // Gauteng
  { id: "chbh", name: "Chris Hani Baragwanath Hospital", province: "Gauteng", city: "Soweto", type: "Academic" },
  { id: "cmjah", name: "Charlotte Maxeke Johannesburg Academic Hospital", province: "Gauteng", city: "Johannesburg", type: "Academic" },
  { id: "stg", name: "Steve Biko Academic Hospital", province: "Gauteng", city: "Pretoria", type: "Academic" },
  { id: "hel", name: "Helen Joseph Hospital", province: "Gauteng", city: "Johannesburg", type: "Regional" },
  { id: "pta-eye", name: "Pretoria Eye Institute", province: "Gauteng", city: "Pretoria", type: "Specialist" },
  // KwaZulu-Natal
  { id: "ilembe", name: "Inkosi Albert Luthuli Central Hospital", province: "KwaZulu-Natal", city: "Durban", type: "Academic" },
  { id: "grey", name: "Grey's Hospital", province: "KwaZulu-Natal", city: "Pietermaritzburg", type: "Academic" },
  { id: "add", name: "Addington Hospital", province: "KwaZulu-Natal", city: "Durban", type: "Regional" },
  // Western Cape
  { id: "gsh", name: "Groote Schuur Hospital", province: "Western Cape", city: "Cape Town", type: "Academic" },
  { id: "tygerberg", name: "Tygerberg Hospital", province: "Western Cape", city: "Cape Town", type: "Academic" },
  { id: "somerset", name: "Somerset Hospital", province: "Western Cape", city: "Cape Town", type: "District" },
  // Eastern Cape
  { id: "liv", name: "Livingstone Hospital", province: "Eastern Cape", city: "Port Elizabeth", type: "Regional" },
  { id: "frere", name: "Frere Hospital", province: "Eastern Cape", city: "East London", type: "Regional" },
  // Free State
  { id: "pelonomi", name: "Pelonomi Hospital", province: "Free State", city: "Bloemfontein", type: "Academic" },
  { id: "univ-fs", name: "Universitas Academic Hospital", province: "Free State", city: "Bloemfontein", type: "Academic" },
  // Limpopo
  { id: "mankweng", name: "Mankweng Hospital", province: "Limpopo", city: "Polokwane", type: "Academic" },
  { id: "pietersburg", name: "Pietersburg Hospital", province: "Limpopo", city: "Polokwane", type: "Regional" },
  // Mpumalanga
  { id: "rpk", name: "Rob Ferreira Hospital", province: "Mpumalanga", city: "Nelspruit", type: "Regional" },
  { id: "wit", name: "Witbank Hospital", province: "Mpumalanga", city: "Witbank", type: "Regional" },
  // Northern Cape
  { id: "kimb", name: "Kimberley Hospital Complex", province: "Northern Cape", city: "Kimberley", type: "Academic" },
  { id: "upington", name: "Upington Hospital", province: "Northern Cape", city: "Upington", type: "District" },
  // North West
  { id: "klerk", name: "Klerksdorp/Tshepong Hospital Complex", province: "North West", city: "Klerksdorp", type: "Regional" },
  { id: "rustenburg", name: "Job Shimankana Tabane Hospital", province: "North West", city: "Rustenburg", type: "Regional" },
];

export const APPOINTMENT_TYPES = [
  { value: "general", label: "General Consultation", duration: 30 },
  { value: "followup", label: "Follow-up Visit", duration: 15 },
  { value: "specialist", label: "Specialist Referral", duration: 45 },
  { value: "emergency", label: "Emergency Walk-in", duration: 60 },
  { value: "vaccination", label: "Vaccination", duration: 15 },
  { value: "screening", label: "Health Screening", duration: 30 },
];

export const TIME_SLOTS = [
  "07:00", "07:30", "08:00", "08:30", "09:00", "09:30",
  "10:00", "10:30", "11:00", "11:30", "12:00", "12:30",
  "13:00", "13:30", "14:00", "14:30", "15:00", "15:30",
  "16:00", "16:30", "17:00"
];
