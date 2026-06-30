import React from "react";
import { sidebarMenuItems, ChevronIcon } from "./SidebarMenuConfig";

export default function SidebarMenuList({
  activeItem,
  setActiveItem,
  openMenus,
  setOpenMenus,
  sidebarOpen,
  setSidebarOpen,
  variant = "desktop",
}) {
  const isDesktop = variant === "desktop";
  const isTablet = variant === "tablet";
  const isMobile = variant === "mobile";

  const handleTopItemClick = (item, hasChildren, isMenuOpen) => {
    if (isTablet) {
      setActiveItem(item.key);
      setSidebarOpen?.(true);
      return;
    }

    if (hasChildren) {
      setOpenMenus({ ...openMenus, [item.toggleKey]: !isMenuOpen });
    } else {
      setActiveItem(item.key);
      if (isMobile) {
        setSidebarOpen?.(false);
      }
    }
  };

  return (
<div className={`flex flex-col ${isTablet ? "items-center gap-3" : "gap-2"}`}>
        {sidebarMenuItems.map((item) => {
        const hasChildren = item.children && item.children.length > 0;
        const isActive = activeItem === item.key;
        const isChildActive = hasChildren && item.activeKeys?.includes(activeItem);
        const isMenuOpen = openMenus[item.toggleKey];
        const isItemActive = isActive || isChildActive;

        return (
          <div key={item.key} className={isTablet ? "" : "w-full"}>
            <button
              type="button"
              onClick={() => handleTopItemClick(item, hasChildren, isMenuOpen)}
              className={
                isTablet
                  ? `w-[50px] h-[50px] flex items-center justify-center rounded-[14px] mt-3 cursor-pointer transition-all duration-200 focus:outline-none group ${
                      isItemActive ? "bg-[#4866F6] text-white" : "hover:bg-[#4866F6] text-[#586D93] hover:text-white"
                    }`
                  : `w-full ${isMobile ? "h-[42px] px-3 mt-2" : "h-[44px] px-[10px] mt-3"} flex items-center justify-between rounded-lg cursor-pointer transition-all duration-200 focus:outline-none group ${
                      isItemActive ? "bg-[#4866F6] text-white" : "hover:bg-[#4866F6] text-[#586D93] hover:text-white"
                    }`
              }
            >
              <div className={isTablet ? "flex items-center justify-center" : "flex items-center gap-[10px]"}>
                <item.Icon
                  className={`w-5 h-5 transition-all duration-200 ${
                    isItemActive
                      ? "text-white"
                      : "text-[#586D93] group-hover:text-white"
                  }`}
                />
                {!isTablet && (
                  <p
                    className={`${isMobile ? "text-[14px]" : "text-[16px]"} ${
                      isItemActive ? "text-white" : "text-[#586D93] group-hover:text-white"
                    }`}
                  >
                    {item.label}
                  </p>
                )}
              </div>
              {hasChildren && !isTablet && (
                <ChevronIcon
                  className={`transition-all duration-200 ${
                    isMenuOpen ? "rotate-180" : ""
                  } ${isItemActive ? "text-white" : "text-[#586D93] group-hover:text-white"}`}
                />
              )}
            </button>

            {hasChildren && isMenuOpen && !isTablet && (
              <div className={isMobile ? "ml-[42px] mt-[6px] flex flex-col gap-[2px]" : "ml-6 mt-[2px] flex flex-col gap-1"}>
                {item.children.map((child) => (
                  <button
  key={child.key}
  type="button"
  onClick={() => {
    setActiveItem(child.key);
    if (isMobile) {
      setSidebarOpen?.(false);
    }
  }}
 className={
  isMobile
    ? `w-auto h-auto flex items-center gap-3 rounded-lg px-3 py-2 cursor-pointer transition-all duration-200 group text-left ${
        activeItem === child.key
          ? "bg-[#4866F6]"
          : "hover:bg-[#EEF3FF]"
      }`
    : `w-[270px] h-[40px] flex items-center gap-3 rounded-lg px-3 cursor-pointer transition-all duration-200 group text-left ${
        activeItem === child.key
          ? "bg-[#4866F6]"
          : "hover:bg-[#EEF3FF]"
      }`
}
>
                    <child.Icon
                      className={`w-5 h-5 ${
                        activeItem === child.key ? "brightness-0 invert text-white" : "text-[#586D93] group-hover:text-[#4866F6]"
                      }`}
                    />
                    <span
                      className={`${isMobile ? "text-[14px]" : "text-[16px]"} ${
                        activeItem === child.key
                          ? "text-white"
                          : "text-[#586D93] group-hover:text-[#4866F6]"
                      }`}
                    >
                      {child.label}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

 