// =============================================================================
// FILE: UserDetailPage.jsx
// User detail view — profile, plan info, and not-found handling
// =============================================================================

// -----------------------------------------------------------------------------
// IMPORTS
// -----------------------------------------------------------------------------
import { ArrowLeft, Calendar, Check, User } from "lucide-react";
import { useEffect, useState } from "react";
import { getUserDetails, updateUser } from "../../../api/authApi";

// -----------------------------------------------------------------------------
// UserDetailPage — user detail view (selected by ManageUsers state)
// -----------------------------------------------------------------------------
export default function UserDetailPage({ userId, onBack }) {
  
  const [user, setUser] = useState(null);
const [loading, setLoading] = useState(true);
console.log("Fetching user:", userId);

useEffect(() => {
  const loadUser = async () => {
    try {
      const response = await getUserDetails(userId);

const formattedUser = {
  ...response,

  lastLogin: new Date(response.last_login).toLocaleString(),

  createdDate: new Date(response.created_at).toLocaleDateString(),

  plan: {
    name: response.subscription_type || "Free Plan",
    price:
      response.subscription_type === "Premium"
        ? "$29.99"
        : response.subscription_type === "Basic"
        ? "$9.99"
        : "$0.00",

    period: "/ month",

    description:
      response.subscription_type === "Premium"
        ? "Premium subscription plan"
        : response.subscription_type === "Basic"
        ? "Basic subscription plan"
        : "Best plan for freshers",

    features: [
      "Profile Access",
      "Dashboard Access",
      "Support Access",
      "Subscription Active",
    ],
  },
};

setUser(formattedUser);
    // } catch (error) {
    //   console.error("Failed to load user details:", error);
    // } 
    }catch (error) {
  console.log("Error Object:", error);
  console.log("Error Response:", error.response);
  console.log("Error Data:", error.response?.data);
  console.log("Error Status:", error.response?.status);
}finally {
      setLoading(false);
    }
  };


  if (userId) {
    loadUser();
  }
}, [userId]);


// update user api
const handleUpdateUser = async () => {
  try {
    const payload = {
      name: user.name,
      email: user.email,
      status: user.status,
      subscription: user.subscription,
    };

    const response = await updateUser(userId, payload);

    console.log("User Updated:", response);

    alert("User updated successfully");
  } catch (error) {
    console.error("Update failed:", error);
    alert("Failed to update user");
  }
};

if (loading) {
  return (
    <div className='h-[100%] px-3 sm:px-5 lg:px-7 pt-4 lg:pt-7 pb-5'>
      <div className="flex min-h-full items-center justify-center rounded-[20px] md:rounded-[25px] border border-gray-100 bg-white p-6 shadow-[0px_1px_4px_0px_#00000040]">
        <p className="text-lg text-slate-600">
          Loading user details...
        </p>
      </div>
    </div>
  );
}

  if (!user) {
    return (
      <div className='h-[100%]  px-3 sm:px-5 lg:px-7 pt-4 lg:pt-7 pb-5 '>
      <div className="flex min-h-full flex-col items-center justify-center rounded-[20px] md:rounded-[25px] border border-gray-100 bg-white p-6 shadow-[0px_1px_4px_0px_#00000040]">
        <p className="text-lg text-slate-600">User not found.</p>
        <button
          type="button"
          onClick={onBack}
          className="mt-4 text-sm font-medium text-blue-600 hover:text-blue-700"
        >
          Back to users list
        </button>
      </div>
      </div>
    );
  }

  return (
    <div className='h-[100%]  px-3 sm:px-5 lg:px-7 pt-4 lg:pt-7 pb-5 '>
        <div className="flex min-h-full min-w-0 flex-col gap-4 max-md:h-auto max-md:overflow-visible max-md:flex-none md:overflow-visible rounded-[20px] md:rounded-[25px] border-b border-gray-200 bg-white p-4 shadow-[0px_1px_4px_0px_#00000040] md:gap-5 md:p-5 lg:gap-6 lg:p-6">
          <UserDetailsBlock user={user} onBack={onBack} onUpdate={handleUpdateUser}/>
        </div>
    </div>
  );
}

// -----------------------------------------------------------------------------
// UserDetailsBlock — header, basic info, and plan section
// -----------------------------------------------------------------------------
function UserDetailsBlock({ user, onBack, onUpdate }) {
  return (
    <div>
      <UserDetailHeader userName={user.name} onBack={onBack} />
      <UserDetailsCard user={user} onUpdate={onUpdate}/>
    </div>
  );
}

// -----------------------------------------------------------------------------
// UserDetailHeader — back button and page title
// -----------------------------------------------------------------------------
function UserDetailHeader({ userName, onBack }) {
  return (
    <div>
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onBack}
          aria-label="Back to users list"
          className="flex h-9 w-9 shrink-0 items-center justify-center cursor-pointer rounded-full bg-[#4866F6] text-white transition-colors hover:opacity-90"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <h1 className="text-lg font-semibold text-slate-800">
          User - {userName}
        </h1>
      </div>
      <SectionDivider />
    </div>
  );
}

// -----------------------------------------------------------------------------
// UserDetailsCard — bordered card wrapping basic info and plan
// -----------------------------------------------------------------------------
function UserDetailsCard({ user,  onUpdate }) {
  return (
    <div className="rounded-2xl border border-slate-200 p-8 pt-5 shadow-[0_0_2px_0px_rgba(61,61,61,0.15)]">
      <UserBasicDetails user={user} />
      <UserPlanSection user={user} />
    </div>
  );
}

// -----------------------------------------------------------------------------
// UserBasicDetails — last login and created date
// -----------------------------------------------------------------------------
function UserBasicDetails({ user }) {
  return (
    <section>
      <h2 className="text-lg font-semibold text-slate-800">
        User Basic Details
      </h2>
      <SectionDivider />
      <div className="flex flex-col items-start gap-8 sm:flex-row sm:items-center sm:justify-start sm:gap-12">
        <DetailBlock icon={User} label="Last Login" value={user.lastLogin} />
        <DetailBlock
          icon={Calendar}
          label="Created Date"
          value={user.createdDate}
        />
      </div>
    </section>
  );
}

// -----------------------------------------------------------------------------
// DetailBlock — icon, label, and value row
// -----------------------------------------------------------------------------
function DetailBlock({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#4866F6]">
        <Icon className="h-5 w-5 text-white" strokeWidth={2} />
      </div>
      <div>
        <p className="text-base font-semibold text-slate-800">{label}</p>
        <p className="text-sm text-slate-500">{value}</p>
      </div>
    </div>
  );
}

// -----------------------------------------------------------------------------
// UserPlanSection — plan pricing, description, and features list
// -----------------------------------------------------------------------------
function UserPlanSection({ user }) {
  const { plan } = user;

  return (
    <section className="mt-8">
      <h2 className="text-lg font-semibold text-slate-800">
        User Plan - {user.name}
      </h2>
      <SectionDivider />
      <div className="w-full rounded-2xl border border-slate-200 bg-white px-5 py-5 md:px-8 md:py-6 lg:px-10 min-[1024px]:max-[1160px]:w-full min-[1161px]:w-fit min-[1161px]:max-w-full">
        <div className="flex flex-col items-stretch gap-6 md:flex-row md:justify-between md:gap-8 md:items-center min-[1024px]:max-[1160px]:flex-col min-[1024px]:max-[1160px]:items-stretch min-[1024px]:max-[1160px]:gap-6 min-[1161px]:flex-row min-[1161px]:justify-between min-[1161px]:items-center min-[1161px]:gap-15">
          <div className="shrink-0 text-left md:max-w-[45%] min-[1024px]:max-[1160px]:max-w-none min-[1161px]:max-w-none">
            <p className="text-2xl font-bold leading-tight">
              <span className="text-lg text-[#4866F6]">{plan.price}</span>
              <span className="text-lg font-normal text-[#586D93]">
                {plan.period}
              </span>
            </p>
            <p className="mt-2 text-lg font-bold text-slate-900">{plan.name}</p>
            <p className="mt-2 text-base font-medium text-[#586D93] md:text-md">
              {plan.description}
            </p>
          </div>

          <div className="flex w-full min-w-0 items-center justify-center rounded-xl bg-[#4866F61A] px-5 py-4 md:max-w-[50%] md:flex-1 md:px-5 md:py-5 min-[1024px]:max-[1160px]:w-full min-[1024px]:max-[1160px]:max-w-none min-[1024px]:max-[1160px]:flex-none min-[1161px]:w-auto min-[1161px]:max-w-none min-[1161px]:shrink-0 min-[1161px]:flex-1 min-[1161px]:pr-7">
            <ul className="w-full min-w-0 space-y-3">
              {plan.features.map((feature) => (
                <li
                  key={feature}
                  className="flex items-center gap-2.5 text-sm text-[#586D93]"
                >
                  <span className="flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full bg-[#4866F6]">
                    <Check className="h-3 w-3 text-white" strokeWidth={3} />
                  </span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

// -----------------------------------------------------------------------------
// SectionDivider — horizontal rule between sections
// -----------------------------------------------------------------------------
function SectionDivider() {
  return (
    <hr
      className="my-4 mt-3 border-0 border-t border-[#CFCFCF]"
      aria-hidden="true"
    />
  );
}
