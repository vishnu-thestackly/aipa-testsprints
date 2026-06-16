import React from "react";

const TabletSidebar = ({
  menuItems,
  activeItem,
  setActiveItem,
  sidebarExpanded,
  setSidebarExpanded,
}) => {
  const handleClick = (id) => {
    setSidebarExpanded(true);
    setActiveItem(id);
  };

  return (
    <div
      className={`
        hidden md:flex lg:hidden
        fixed left-0 top-0 h-screen
        bg-white border-r border-[#E5E5E5]
        flex-col py-4 z-50
        transition-all duration-300 ease-in-out
        ${sidebarExpanded ? "w-[240px]" : "w-[72px]"}
      `}
    >
      {menuItems.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.id}
            onClick={() => handleClick(item.id)}
            className={`
              mx-3 h-[48px]
              flex items-center
              rounded-xl cursor-pointer
              mb-2 transition-all
              ${
                activeItem === item.id
                  ? "bg-[#4D63F3] text-white"
                  : "text-[#555555] hover:bg-[#F5F5F5]"
              }
            `}
          >
            {/* Icon */}
            <div className="min-w-[48px] flex justify-center items-center">
              <Icon size={22} />
            </div>

            {/* Text appears when expanded */}
            <div
              className={`
                overflow-hidden whitespace-nowrap
                transition-all duration-300
                ${sidebarExpanded ? "opacity-100" : "opacity-0 w-0"}
              `}
            >
              {item.label}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TabletSidebar;