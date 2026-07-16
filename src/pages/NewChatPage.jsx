import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "../components/userprofile/Navbar";
import Sidebar from "../components/userprofile/sidebar/Sidebar";
import NewChat from "../components/userprofile/new-chat/NewChat";
import NewChatConversation from "../components/userprofile/new-chat/NewChatConversation";

export default function NewChatPage() {
  const [languageOpen, setLanguageOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("newchat");
  const [profilePage, setProfilePage] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="h-screen flex flex-col">
      <Navbar
        languageOpen={languageOpen}
        setLanguageOpen={setLanguageOpen}
        profilePage={profilePage}
        setProfilePage={setProfilePage}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <div className="flex flex-1 min-h-0 overflow-hidden">
        <Sidebar
          activeItem={activeItem}
          setActiveItem={setActiveItem}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          profilePage={profilePage}
          setProfilePage={setProfilePage}
        />

        <div className="flex-1 overflow-y-auto bg-gray-100">
          {activeItem === "newchat" && (
            <Routes>
              <Route index element={<NewChat languageOpen={languageOpen} />} />
              <Route
                path="conversation"
                element={<NewChatConversation languageOpen={languageOpen} />}
              />
            </Routes>
          )}
        </div>
      </div>
    </div>
  );
}
