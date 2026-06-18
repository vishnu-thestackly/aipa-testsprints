
import { useState } from "react";
import Navbar from "../components/userprofile/Navbar";
import Sidebar from "../components/userprofile/Sidebar";
import ProfileDashboard from "../components/userprofile/ProfileDashboard";
import EditProfile from "../components/userprofile/EditProfile";
import PreferenceSetting from "../components/userprofile/PreferenceSetting";
import SubscriptionPlans from "../components/userprofile/subscription-details/SubscriptionPlans";
import SubscriptionDetails from "../components/userprofile/subscription-details/SubscriptionDetails";

export default function UserProfile() {
const [languageOpen, setLanguageOpen] = useState(false);
const [activeItem, setActiveItem] = useState("profileDashboard");
const [profilePage, setProfilePage] = useState("dashboard");
const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="h-screen flex flex-col">
      {/* Navbar */}
     <Navbar
  languageOpen={languageOpen}
  setLanguageOpen={setLanguageOpen}
  profilePage={profilePage}
  setProfilePage={setProfilePage}
  sidebarOpen={sidebarOpen}
  setSidebarOpen={setSidebarOpen}
/>

      {/* Main Layout */}
      <div className="flex flex-1 min-h-0 overflow-hidden">
        {/* Sidebar */}
       <Sidebar
  activeItem={activeItem}
  setActiveItem={setActiveItem}
  sidebarOpen={sidebarOpen}
  setSidebarOpen={setSidebarOpen}
  profilePage={profilePage}
  setProfilePage={setProfilePage}
/>

        {/* Content Wrapper */}
      <div className="flex-1 overflow-y-auto bg-gray-100">

  
   {activeItem === "profileDashboard" && (
  <>
    {profilePage === "dashboard" && (
      <ProfileDashboard
        languageOpen={languageOpen}
        setProfilePage={setProfilePage}
      />
    )}

    {profilePage === "preferenceSetting" && (
      <PreferenceSetting />
    )}

    {profilePage === "edit" && (
      <EditProfile setProfilePage={setProfilePage} />
    )}

    {profilePage === "subscription" && (
      <SubscriptionPlans setProfilePage={setProfilePage} />
    )}

    {profilePage === "subscriptionDetails" && (
      <SubscriptionDetails setProfilePage={setProfilePage} />
    )}
  </>
)}

  

</div>
      </div>
    </div>
  );
}

// import { useState } from "react";

// import Navbar from "../components/userprofile/Navbar";
// import Sidebar from "../components/userprofile/Sidebar";

// import ProfileDashboard from "../components/userprofile/ProfileDashboard";
// import EditProfile from "../components/userprofile/EditProfile";
// import PreferenceSetting from "../components/userprofile/PreferenceSetting";
// // import PersonalAssistant from "../../components/editprofile/PersonalAssistant";
// import SubscriptionPlans from "../components/userprofile/SubscriptionPlans";

// export default function UserProfile() {
//   const [languageOpen, setLanguageOpen] = useState(false);
//   const [activeItem, setActiveItem] = useState("profileDashboard");
// const [profilePage, setProfilePage] = useState("dashboard");

//   return (
//     <div className="h-screen flex flex-col">
//       {/* Navbar */}
//       <Navbar
//         languageOpen={languageOpen}
//         setLanguageOpen={setLanguageOpen}
//       />

//       {/* Main Layout */}
//       <div className="flex flex-1 min-h-0 overflow-hidden">
//         {/* Sidebar */}
//         <Sidebar
//           activeItem={activeItem}
//           setActiveItem={setActiveItem}
//         />

//         {/* Content Wrapper */}
//       <div className="flex-1 overflow-y-auto bg-gray-100">
//          {activeItem === "profileDashboard" && (
//   <>
//     {profilePage === "dashboard" && (
//       <ProfileDashboard
//         languageOpen={languageOpen}
//         setProfilePage={setProfilePage}
//       />
//     )}

//     {profilePage === "edit" && (
//       <EditProfile
//         setProfilePage={setProfilePage}
//       />
//     )}
//   </>
// )}

// {activeItem === "preferenceSetting" && (
//   <PreferenceSetting />
// )}

// {profilePage === "subscription" && (
//   <SubscriptionPlans
//     setProfilePage={setProfilePage}
//   />
// )}
//         </div>
//       </div>
//     </div>
//   );
// }
