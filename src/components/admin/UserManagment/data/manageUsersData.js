// =============================================================================
// FILE: manageUsersData.js
// Mock data — users, KPIs, and plan templates
// =============================================================================

// DATA: Subscription KPI summary
export const kpiData = [
  { id: 1, value: "55%", label: "Free Users" },
  { id: 2, value: "25%", label: "Basic Plan Users" },
  { id: 3, value: "74%", label: "Premium Plan users" },
];

// DATA: Plan templates used to hydrate user records
const defaultFeatures = [
  "Culpa qui official",
  "Deserunt mollitia an",
  "Imi, id est laborum et",
  "Dolorum fuga Et har",
  "Um quidem rerum",
];

export const planTemplates = {
  Free: {
    price: "$0.00",
    period: "/ month",
    name: "Free plan",
    description: "Best plan for the fresher individuals",
    features: defaultFeatures,
  },
  Basic: {
    price: "$9.99",
    period: "/ month",
    name: "Basic plan",
    description: "Ideal for growing teams and daily usage",
    features: defaultFeatures,
  },
  Premium: {
    price: "$19.99",
    period: "/ month",
    name: "Premium plan",
    description: "Full access for power users and enterprises",
    features: defaultFeatures,
  },
};

// DATA: Base user records for list and detail views
const userDetails = [
  {
    id: 1,
    name: "Mahizhan N R",
    email: "mahilan@gmail.com",
    status: "Active",
    subscription: "Free",
    lastLogin: "Yesterday - 12:30 PM",
    createdDate: "15 - 04 - 2026",
  },
  {
    id: 2,
    name: "Bharani Dharan K D",
    email: "bharanidharan@gmail.com",
    status: "Idle",
    subscription: "Basic",
    lastLogin: "Today - 09:15 AM",
    createdDate: "22 - 03 - 2026",
  },
  {
    id: 3,
    name: "Amuthan S",
    email: "amuthan@gmail.com",
    status: "Active",
    subscription: "Free",
    lastLogin: "Yesterday - 06:45 PM",
    createdDate: "10 - 02 - 2026",
  },
  {
    id: 4,
    name: "Akilan s",
    email: "akilan@gmail.com",
    status: "Idle",
    subscription: "Premium",
    lastLogin: "2 days ago - 11:00 AM",
    createdDate: "05 - 01 - 2026",
  },
  {
    id: 5,
    name: "Raghu L",
    email: "raghu@gmail.com",
    status: "Inactive",
    subscription: "Free",
    lastLogin: "1 week ago - 03:20 PM",
    createdDate: "18 - 12 - 2025",
  },
  {
    id: 6,
    name: "Prasanth s",
    email: "Prasanth@gmail.com",
    status: "Inactive",
    subscription: "Basic",
    lastLogin: "3 days ago - 08:50 AM",
    createdDate: "30 - 11 - 2025",
  },
];

// DATA: Users with plan details merged from templates
export const users = userDetails.map((user) => ({
  ...user,
  plan: planTemplates[user.subscription],
}));

// -----------------------------------------------------------------------------
// getUserById — resolves a user record by id for the detail view
// -----------------------------------------------------------------------------
export function getUserById(id) {
  return users.find((user) => user.id === Number(id));
}
