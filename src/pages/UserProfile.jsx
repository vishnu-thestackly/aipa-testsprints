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


  return (
    <div className="h-screen flex flex-col">
      {/* Navbar */}
      <Navbar
        languageOpen={languageOpen}
        setLanguageOpen={setLanguageOpen}
        profile={profile}
      />

      {/* Main Layout */}
      <div className="flex flex-1 min-h-0 overflow-hidden">
        {/* Sidebar */}
        <Sidebar
          activeItem={activeItem}
          setActiveItem={setActiveItem}
        />

        {/* Content Wrapper */}
      <div className="flex-1 overflow-y-auto bg-gray-100">
         {activeItem === "profileDashboard" && (
  <>
    {/* {profilePage === "dashboard" && (
      <ProfileDashboard
        languageOpen={languageOpen}
        setProfilePage={setProfilePage}
      />
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