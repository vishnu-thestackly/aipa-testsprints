import { useState, useEffect } from "react";

import Navbar from "../components/userprofile/Navbar";
import Sidebar from "../components/userprofile/sidebar/Sidebar";


import { getUserProfile } from "../api/authApi";

// import ProfileDashboard from "../components/userprofile/ProfileDashboard";
// import EditProfile from "../components/userprofile/EditProfile";
// import PreferenceSetting from "../components/userprofile/PreferenceSetting";
// // import PersonalAssistant from "../../components/editprofile/PersonalAssistant";
// import SubscriptionPlans from "../components/userprofile/subscription-details/SubscriptionPlans";
// import SubscriptionDetails from "../components/userprofile/subscription-details/SubscriptionDetails";

import { Outlet, useLocation } from "react-router-dom";

export default function UserProfile() {
  
  const [profile, setProfile] = useState(null);
  const [languageOpen, setLanguageOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("profileDashboard");
  const [profilePage, setProfilePage] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedConversationId, setSelectedConversationId] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;
    const menuKey =
      path.includes("/new-chat") ? "newchat" :
      path.includes("/tasks/my") ? "myTasks" :
      path.includes("/tasks/upcoming") ? "upcomingTasks" :
      path.includes("/tasks/completed") ? "completedTasks" :
      path.includes("/integrations/calendar") ? "calendar" :
      path.includes("/integrations/email") ? "email" :
      path.includes("/settings/preferences") ? "preferenceSetting" :
      path.includes("/settings/security") ? "security" :
      path.includes("/settings/notifications") ? "notifications" :
      "profileDashboard";

    setActiveItem(menuKey);
    if (path.includes("/settings/preferences")) setProfilePage("preferenceSetting");
    if (path.includes("/settings/security")) setProfilePage("security");
    if (path.includes("/settings/notifications")) setProfilePage("notifications");
    if (path.endsWith("/profile")) setProfilePage("dashboard");
  }, [location.pathname]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getUserProfile();
        setProfile(data);
        console.log("User Profile API Response:", data);
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
          setSelectedConversationId={setSelectedConversationId}
        />

        {/* Content Wrapper */}
        <div className="flex-1 overflow-y-auto bg-gray-100">

          <Outlet
    context={{
      languageOpen,
      profile,
      setProfile,
      profilePage,
      setProfilePage,
      activeItem,
      setActiveItem,
      selectedConversationId,
    }}
  />
        </div>
      </div>
      
    </div>
  );
}
