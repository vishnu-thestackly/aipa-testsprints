import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SignOut from "../../../assets/images/SignOut.png";
import TabletSidebar from "./TabletSidebar";
import UserSidebarMenuList from "./UserSidebarMenuList";

export default function Sidebar({
  activeItem,
  setActiveItem,
  sidebarOpen,
  setSidebarOpen,
  profilePage,
  setProfilePage,
}) {
  const navigate = useNavigate();
  const [openMenu, setOpenMenu] = useState({
    tasks: false,
    integrations: false,
    settings: false,
  });

  const handleLogout = () => {
    setSidebarOpen?.(false);
    navigate("/");
  };

  return (
    <>
      <aside className="hidden md:flex w-[115px] lg:w-[280px] xl:w-[375px] h-full bg-white p-1 lg:p-4 flex-col overflow-hidden">
        <div className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden no-scrollbar pt-4 px-0 xl:px-3">
          <div className="lg:hidden">
            <UserSidebarMenuList
              activeItem={activeItem}
              setActiveItem={setActiveItem}
              openMenus={openMenu}
              setOpenMenus={setOpenMenu}
              sidebarOpen={sidebarOpen}
              setSidebarOpen={setSidebarOpen}
              profilePage={profilePage}
              setProfilePage={setProfilePage}
              variant="tablet"
            />
          </div>
          <div className="hidden lg:block">
            <UserSidebarMenuList
              activeItem={activeItem}
              setActiveItem={setActiveItem}
              openMenus={openMenu}
              setOpenMenus={setOpenMenu}
              sidebarOpen={sidebarOpen}
              setSidebarOpen={setSidebarOpen}
              profilePage={profilePage}
              setProfilePage={setProfilePage}
              variant="desktop"
              showChatHistory
            />
          </div>
        </div>

        <div className="shrink-0 flex justify-center px-0 xl:px-3 pt-4 pb-2">
  <button
    type="button"
    onClick={handleLogout}
    className="w-[50px] lg:w-[220px] xl:w-[315px] h-[44px] flex items-center justify-center gap-[10px] rounded-[10px] border border-[#FB0000] bg-[#FF000033] text-[#FF0000] cursor-pointer hover:bg-[#FF000044]"
  >
    <span className="hidden lg:block">Logout</span>
    <img src={SignOut} alt="Logout" className="w-[18px] h-[18px]" />
  </button>
</div>
      </aside>

      {sidebarOpen && (
        <>
          <button
            type="button"
            aria-label="Close sidebar"
            className="fixed inset-0 bg-black/40 z-40 md:block lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
          <TabletSidebar
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
            activeItem={activeItem}
            setActiveItem={setActiveItem}
            openMenu={openMenu}
            setOpenMenu={setOpenMenu}
            profilePage={profilePage}
            setProfilePage={setProfilePage}
            navigate={navigate}
            onLogout={handleLogout}
          />
        </>
      )}
    </>
  );
}
