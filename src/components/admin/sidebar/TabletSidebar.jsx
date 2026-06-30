import React from "react";
import SignOut from "../../../assets/images/SignOut.png";
import { sidebarMenuItems, ChevronIcon } from "./SidebarMenuConfig";
import logo from "../../../assets/images/logo.png";

export default function TabletSidebar({
  sidebarOpen,
  setSidebarOpen,
  activeItem,
  setActiveItem,
  openMenu,
  setOpenMenu,
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
      <div className="px-[14px] py-[23px] flex flex-col">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-[10px]">
            <button
              onClick={() => setSidebarOpen(false)}
              className="md:hidden w-[42px] h-[42px] flex items-center justify-center rounded-full bg-[#F5F7FA] text-[30px] leading-none text-[#586D93] cursor-pointer"
            >
              <span className="mt-[-2px]">×</span>
            </button>
            <div
              onClick={() => navigate("/")}
              className="flex items-center ml-[10px] cursor-pointer"
            >
              <img
  src={logo}
  alt="Logo"
  className="h-[42px] w-auto min-[360px]:h-[46px] min-[390px]:h-[38px] object-contain"
/>
            </div>
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
        {/* Horizontal Line */}
        <div className="hidden md:block lg:hidden w-full border-t border-[#CFCFCF] mt-[18px] mb-[12px]"></div>

<div className="flex-1 flex flex-col justify-center mt-2">
            {sidebarMenuItems.map((item) => {
            const hasChildren = item.children && item.children.length > 0;
            const isActive = activeItem === item.key;
            const isChildActive = hasChildren && item.activeKeys?.includes(activeItem);
            const isMenuOpen = openMenu[item.toggleKey];

            return (
              <div key={item.key}>
                <div
                  onClick={() => {
                    if (hasChildren) {
                      setOpenMenu({ ...openMenu, [item.toggleKey]: !isMenuOpen });
                    } else {
                      setActiveItem(item.key);
                      setSidebarOpen(false);
                    }
                  }}
                  className={`w-full h-[42px] flex items-center justify-between px-[12px] rounded-lg mt-2 cursor-pointer transition-all duration-300 ${
                    isActive || isChildActive ? "bg-[#4866F6]" : "hover:bg-[#4866F6]"
                  }`}
                >
                  <div className="flex items-center gap-[12px]">
                    <item.Icon
                      className={`w-[20px] h-[20px] ${
                        isActive || isChildActive ? "text-white" : "text-[#586D93]"
                      }`}
                    />
                    <p
                      className={`block text-[14px] ${
                        isActive || isChildActive ? "text-white" : "text-[#586D93]"
                      }`}
                    >
                      {item.label}
                    </p>
                  </div>
                  {hasChildren && (
                    <ChevronIcon
                      className={`block text-[14px] transition-all duration-300 ${
                        isMenuOpen ? "rotate-180" : ""
                      } ${isActive || isChildActive ? "text-white" : "text-[#586D93]"}`}
                    />
                  )}
                </div>

                {hasChildren && isMenuOpen && (
                  <div className="ml-[32px] mt-[6px] flex flex-col gap-[2px]">
                    {item.children.map((child) => (
                      <div
                        key={child.key}
                        onClick={() => {
                          setActiveItem(child.key);
                          setSidebarOpen(false);
                        }}
                        className={`flex items-center gap-[10px] cursor-pointer px-3 py-2 rounded-lg group transition-all duration-300 ${
                          activeItem === child.key ? "bg-[#4866F6]" : "hover:bg-[#4866F6]"
                        }`}
                      >
                        <child.Icon
                          className={`w-[18px] h-[18px] ${
                            activeItem === child.key ? "text-white" : "text-[#586D93] group-hover:text-white"
                          }`}
                        />
                        <p
className={`text-[13px] leading-[18px] ${                            activeItem === child.key ? "text-white" : "text-[#586D93] group-hover:text-white"
                          }`}
                        >
                          {child.label}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Logout Button */}
        <div className="w-full flex mt-3 justify-center">
          <button
            className="w-full h-[44px] flex items-center justify-center gap-[10px] rounded-[10px] border border-[#FB0000] bg-[#FF000033] font-medium text-[18px] text-[#FF0000] cursor-pointer"
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

 