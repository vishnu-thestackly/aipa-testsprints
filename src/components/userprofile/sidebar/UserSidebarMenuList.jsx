import React from "react";
import { useNavigate } from "react-router-dom";
import { userSidebarMenuItems, ChevronIcon } from "./UserSidebarMenuConfig";
import SidebarChatHistory from "./SidebarChatHistory";

/**
 * UserSidebarMenuList
 *
 * A single component that renders user sidebar menu items for all breakpoints.
 * Pass `variant` to control the rendering mode:
 *   - "tablet"  → icon-only slim column (md, hidden on lg+)
 *   - "desktop" → full label+icon sidebar (lg+)
 *   - "mobile"  → full label+icon slide-in drawer (< md)
 *
 * Mirrors the pattern used by admin's SidebarMenuList.
 */
export default function UserSidebarMenuList({
  activeItem,
  setActiveItem,
  openMenus,
  setOpenMenus,
  sidebarOpen,
  setSidebarOpen,
  profilePage,
  setProfilePage,
  variant = "desktop",
  showChatHistory = false,
}) {
  const navigate = useNavigate();
  const isTablet = variant === "tablet";
  const isMobile = variant === "mobile";

  const handleTopItemClick = (item, hasChildren, isMenuOpen) => {
    if (isTablet) {
      // On tablet icon column, clicking opens the slide-in drawer
      setActiveItem(item.key);
      setSidebarOpen?.(true);
      return;
    }

    if (hasChildren) {
      setOpenMenus({ ...openMenus, [item.toggleKey]: !isMenuOpen });
    } else {
      // Handle navigation items
      if (item.navigateTo) {
        navigate(item.navigateTo);
      }
      if (item.profilePageKey && setProfilePage) {
        setProfilePage(item.profilePageKey);
      }
      setActiveItem(item.key);
      if (isMobile) {
        setSidebarOpen?.(false);
      }
    }
  };

  const handleChildClick = (item, child) => {
    if (child.navigateTo) {
      navigate(child.navigateTo);
    }
    if (child.profilePageKey && setProfilePage) {
      setProfilePage(child.profilePageKey);
    }
    setActiveItem(child.key);
    if (isMobile) {
      setSidebarOpen?.(false);
    }
  };

  return (
    <div className={`flex flex-col ${isTablet ? "items-center gap-3" : "gap-1"}`}>
      {userSidebarMenuItems.map((item) => {
        const hasChildren = item.children && item.children.length > 0;
        const isActive = activeItem === item.key;
        const isChildActive = hasChildren && item.activeKeys?.includes(activeItem);
        const isMenuOpen = openMenus?.[item.toggleKey];
        const isItemActive = isActive || isChildActive;

        return (
          <div key={item.key} className={isTablet ? "" : "w-full"}>
            <button
              type="button"
              onClick={() => handleTopItemClick(item, hasChildren, isMenuOpen)}
              className={
                isTablet
                  ? `w-[50px] h-[50px] flex items-center justify-center rounded-[14px] mt-3 cursor-pointer transition-all duration-200 focus:outline-none group ${
                      isItemActive
                        ? "bg-[#4866F6] text-white"
                        : "hover:bg-[#4866F6] text-[#586D93] hover:text-white"
                    }`
                  : `w-full ${isMobile ? "h-[42px] px-3 mt-2" : "h-[44px] px-[10px] mt-2"} flex items-center justify-between rounded-lg cursor-pointer transition-all duration-200 focus:outline-none group ${
                      isItemActive
                        ? "bg-[#4866F6] text-white"
                        : "hover:bg-[#4866F6] text-[#586D93] hover:text-white"
                    }`
              }
            >
              <div className={isTablet ? "flex items-center justify-center" : "flex items-center gap-[12px]"}>
                <item.Icon
                  className={`w-5 h-5 transition-all duration-200 ${
                    isItemActive ? "text-white" : "text-[#586D93] group-hover:text-white"
                  }`}
                />
                {!isTablet && (
                  <p
                    className={`${isMobile ? "text-[14px]" : "text-[15px]"} ${
                      isItemActive ? "text-white" : "text-[#586D93] group-hover:text-white"
                    }`}
                  >
                    {item.label}
                  </p>
                )}
              </div>
              {hasChildren && !isTablet && (
                <ChevronIcon
                  className={`transition-all duration-200 ${isMenuOpen ? "rotate-180" : ""} ${
                    isItemActive ? "text-white" : "text-[#586D93] group-hover:text-white"
                  }`}
                />
              )}
            </button>

            {/* Children dropdown - only for non-tablet */}
            {hasChildren && isMenuOpen && !isTablet && (
              <div className={isMobile ? "ml-[32px] mt-[6px] flex flex-col gap-[2px]" : "ml-6 mt-[2px] flex flex-col gap-1"}>
                {item.children.map((child) => {
                  const isChildItemActive =
                    activeItem === child.key ||
                    (child.profilePageKey && profilePage === child.profilePageKey);

                  return (
                    <button
                      key={child.key}
                      type="button"
                      onClick={() => handleChildClick(item, child)}
                      className={`w-full flex items-center gap-[10px] cursor-pointer px-3 py-2 rounded-lg group transition-all duration-200 text-left ${
                        isChildItemActive ? "bg-[#4866F6]" : "hover:bg-[#4866F6]"
                      }`}
                    >
                      <child.Icon
                        className={`w-[18px] h-[18px] flex-shrink-0 ${
                          isChildItemActive
                            ? "text-white"
                            : "text-[#586D93] group-hover:text-white"
                        }`}
                      />
                      <p
                        className={`text-[13px] leading-[18px] ${
                          isChildItemActive
                            ? "text-white"
                            : "text-[#586D93] group-hover:text-white"
                        }`}
                      >
                        {child.label}
                      </p>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}

      {/* Chat history — only shown in desktop or mobile drawers when enabled */}
      {showChatHistory && !isTablet && <SidebarChatHistory />}
    </div>
  );
}
