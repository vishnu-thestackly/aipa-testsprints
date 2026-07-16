import React from "react";
import SignOut from "../../../assets/images/SignOut.png";
import logo from "../../../assets/images/logo.png";
import UserSidebarMenuList from "./UserSidebarMenuList";

/**
 * UserProfile TabletSidebar
 *
 * Slide-in sidebar drawer for mobile (< md) and tablet (md–lg).
 * Mirrors the structure of the admin TabletSidebar, but uses user-specific
 * menu items via UserSidebarMenuList.
 *
 * On mobile: triggered from Navbar's hamburger → shows this component.
 * On tablet: triggered from Navbar's panel icon → shows this component.
 */
export default function TabletSidebar({
  sidebarOpen,
  setSidebarOpen,
  activeItem,
  setActiveItem,
  openMenu,
  setOpenMenu,
  profilePage,
  setProfilePage,
  navigate,
  logos,
  onLogout,
}) {
  return (
    <div
      className={`fixed top-0 left-0 h-screen w-[285px] bg-white z-50 shadow-lg transition-all duration-300 lg:hidden overflow-y-auto no-scrollbar ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="px-[14px] py-[23px] flex flex-col h-full">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-[10px]">
            {/* Close button — visible on mobile only */}
            <button
              onClick={() => setSidebarOpen(false)}
              className="md:hidden w-[42px] h-[42px] flex items-center justify-center rounded-full bg-[#F5F7FA] text-[30px] leading-none text-[#586D93] cursor-pointer"
            >
              <span className="mt-[-2px]">×</span>
            </button>

            {/* Logo */}
            <div
              onClick={() => navigate("/")}
              className="flex items-center ml-[10px] cursor-pointer"
            >
              <img
                src={logos || logo}
                alt="Logo"
                className="h-[42px] w-auto min-[360px]:h-[46px] min-[390px]:h-[38px] object-contain"
              />
            </div>

            {/* Panel collapse toggle — visible on tablet only */}
            <div
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="hidden md:flex lg:hidden absolute top-[22px] right-[20px] w-[40px] h-[40px] rounded-[20px] justify-center items-center bg-[#4866F626] text-[#4866F6] hover:bg-[#4866F6] hover:text-white cursor-pointer"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                <path d="M17.5 2.5H2.5C2.16848 2.5 1.85054 2.6317 1.61612 2.86612C1.3817 3.10054 1.25 3.41848 1.25 3.75V16.25C1.25 16.5815 1.3817 16.8995 1.61612 17.1339C1.85054 17.3683 2.16848 17.5 2.5 17.5H17.5C17.8315 17.5 18.1495 17.3683 18.3839 17.1339C18.6183 16.8995 18.75 16.5815 18.75 16.25V3.75C18.75 3.41848 18.6183 3.10054 18.3839 2.86612C18.1495 2.6317 17.8315 2.5 17.5 2.5ZM2.5 3.75H6.25V16.25H2.5V3.75ZM17.5 16.25H7.5V3.75H17.5V16.25Z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Horizontal divider — visible on tablet only */}
        <div className="hidden md:block lg:hidden w-full border-t border-[#CFCFCF] mt-[18px] mb-[12px]" />

        {/* Menu Items */}
        <div className="flex-1 flex flex-col mt-2 overflow-y-auto no-scrollbar">
          <UserSidebarMenuList
            activeItem={activeItem}
            setActiveItem={setActiveItem}
            openMenus={openMenu}
            setOpenMenus={setOpenMenu}
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
            profilePage={profilePage}
            setProfilePage={setProfilePage}
            variant="mobile"
            showChatHistory={true}
          />
        </div>

        {/* Logout Button */}
        <div className="w-full flex mt-3 justify-center pt-4">
          <button
            className="w-[220px] max-w-full h-[44px] flex items-center justify-center gap-[10px] rounded-[10px] border border-[#FB0000] bg-[#FF000033] font-medium text-[16px] text-[#FF0000] cursor-pointer hover:bg-[#FF000044] transition-all"
            onClick={onLogout}
          >
            <span>Logout</span>
            <img src={SignOut} alt="logout" className="w-[18px] h-[18px]" />
          </button>
        </div>
      </div>
    </div>
  );
}
