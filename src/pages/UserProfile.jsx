<<<<<<< HEAD
import { useState,useEffect } from "react";

import Navbar from "../components/userprofile/Navbar";
import Sidebar from "../components/userprofile/Sidebar";

import { getUserProfile } from "../api/authApi";

import ProfileDashboard from "../components/userprofile/ProfileDashboard";
import EditProfile from "../components/userprofile/EditProfile";
import PreferenceSetting from "../components/userprofile/PreferenceSetting";
// import PersonalAssistant from "../../components/editprofile/PersonalAssistant";
import SubscriptionPlans from "../components/userprofile/SubscriptionPlans";

export default function UserProfile() {
  const [profile, setProfile] = useState(null);
  const [languageOpen, setLanguageOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("profileDashboard");
const [profilePage, setProfilePage] = useState("dashboard");

useEffect(() => {
  const fetchProfile = async () => {
    try {
      const data = await getUserProfile();
      setProfile(data);
    } catch (error) {
      console.error(error);
    }
  };

  fetchProfile();
}, []);

=======

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
>>>>>>> d59cd9811fcdae9d277e123b337195690bf067c6

  return (
    <div className="h-screen flex flex-col">
      {/* Navbar */}
<<<<<<< HEAD
      <Navbar
        languageOpen={languageOpen}
        setLanguageOpen={setLanguageOpen}
        profile={profile}
      />
=======
     <Navbar
  languageOpen={languageOpen}
  setLanguageOpen={setLanguageOpen}
  profilePage={profilePage}
  setProfilePage={setProfilePage}
  sidebarOpen={sidebarOpen}
  setSidebarOpen={setSidebarOpen}
/>
>>>>>>> d59cd9811fcdae9d277e123b337195690bf067c6

      {/* Main Layout */}
      <div className="flex flex-1 min-h-0 overflow-hidden">
        {/* Sidebar */}
<<<<<<< HEAD
        <Sidebar
          activeItem={activeItem}
          setActiveItem={setActiveItem}
        />

        {/* Content Wrapper */}
      <div className="flex-1 overflow-y-auto bg-gray-100">
         {activeItem === "profileDashboard" && (
  <>
    {/* {profilePage === "dashboard" && (
=======
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
>>>>>>> d59cd9811fcdae9d277e123b337195690bf067c6
      <ProfileDashboard
        languageOpen={languageOpen}
        setProfilePage={setProfilePage}
      />
<<<<<<< HEAD
    )} */}

    

    {profilePage === "dashboard" && (
  <ProfileDashboard
    languageOpen={languageOpen}
    setProfilePage={setProfilePage}
    profile={profile}
    setProfile={setProfile}
  />
)}

{profilePage === "edit" && (
  <EditProfile
    setProfilePage={setProfilePage}
    setProfile={setProfile}
  />
)}
  </>
)}

{activeItem === "preferenceSetting" && (
  <PreferenceSetting />
)}

{profilePage === "subscription" && (
  <SubscriptionPlans
    setProfilePage={setProfilePage}
  />
)}
        </div>
      </div>
    </div>
  );
}
=======
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
>>>>>>> d59cd9811fcdae9d277e123b337195690bf067c6
