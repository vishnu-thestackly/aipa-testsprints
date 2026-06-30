import React, { useEffect } from "react";
import SignOut from "../../../assets/images/SignOut.png";
import SidebarMenuList from "./SidebarMenuList";

export default function Sidebar({
  activeItem,
  setActiveItem,
  sidebarOpen,
  setSidebarOpen,
  openMenus,
  setOpenMenus,
  onLogout,
}) {
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setOpenMenus({});
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [setOpenMenus]);

  return (
    <>
      {/* TABLET VIEW - SLIM SIDEBAR (ICONS ONLY) */}
      <div className="hidden md:flex lg:hidden w-[100px] h-full bg-white p-3 flex-col items-center justify-between overflow-y-auto scrollbar-hide border-r border-gray-200">
        <div className="w-full flex-1">
          <SidebarMenuList
            activeItem={activeItem}
            setActiveItem={setActiveItem}
            openMenus={openMenus}
            setOpenMenus={setOpenMenus}
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
            variant="tablet"
          />
        </div>

        <div className="w-full flex justify-center mt-auto">
          <button
            className="flex mt-8 w-[50px] h-[44px] rounded-[10px] border border-[#FB0000] bg-[#FF000033] items-center justify-center cursor-pointer hover:bg-[#FF000044] transition-all"
            onClick={onLogout}
          >
            <img src={SignOut} alt="logout" className="w-[18px] h-[18px]" />
          </button>
        </div>
      </div>

      {/* DESKTOP VIEW - FULL SIDEBAR */}
      <div className="hidden lg:block">
        <div className="w-[376px] bg-white p-6 h-full flex flex-col justify-between overflow-y-auto scrollbar-hide border-r border-gray-200">
          <div>
            <SidebarMenuList
              activeItem={activeItem}
              setActiveItem={setActiveItem}
              openMenus={openMenus}
              setOpenMenus={setOpenMenus}
              sidebarOpen={sidebarOpen}
              setSidebarOpen={setSidebarOpen}
              variant="desktop"
            />
          </div>

          <div className="w-full flex mt-6 justify-center">
            <button
              className="flex w-[292px] h-[44px] items-center justify-center gap-[10px] rounded-[10px] border border-[#FB0000] bg-[#FF000033] font-medium text-[18px] text-[#FF0000] cursor-pointer hover:bg-[#FF000044] transition-all"
              onClick={onLogout}
            >
              <span>Logout</span>
              <img src={SignOut} alt="logout" className="w-[18px] h-[18px]" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

 