import SignOut from "../../assets/images/SignOut.png";
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
}) {
  return (
    <div
      className={`fixed top-0 left-0 h-screen w-[285px] bg-white z-50 shadow-lg transition-all duration-300 md:block lg:hidden overflow-y-auto no-scrollbar ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
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
                src={logos}
                alt="Logo"
                className="h-[42px] w-auto min-[360px]:h-[46px] min-[390px]:h-[38px] object-contain"
              />
            </div>
            <div
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="hidden md:flex lg:hidden absolute top-[22px] right-[20px] w-[40px] h-[40px] rounded-[20px] justify-center items-center bg-[#4866F626] text-[#4866F6] hover:bg-[#4866F6] hover:text-white cursor-pointer"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M17.5 2.5H2.5C2.16848 2.5 1.85054 2.6317 1.61612 2.86612C1.3817 3.10054 1.25 3.41848 1.25 3.75V16.25C1.25 16.5815 1.3817 16.8995 1.61612 17.1339C1.85054 17.3683 2.16848 17.5 2.5 17.5H17.5C17.8315 17.5 18.1495 17.3683 18.3839 17.1339C18.6183 16.8995 18.75 16.5815 18.75 16.25V3.75C18.75 3.41848 18.6183 3.10054 18.3839 2.86612C18.1495 2.6317 17.8315 2.5 17.5 2.5ZM2.5 3.75H6.25V16.25H2.5V3.75ZM17.5 16.25H7.5V3.75H17.5V16.25Z" />
              </svg>
            </div>
          </div>
        </div>
        {/* Horizontal Line */}
        <div className="hidden md:block lg:hidden w-full border-t border-[#CFCFCF] mt-[18px] mb-[12px]"></div>
        {/* mmobile sidebar */}
        <div className="mt-[16px] md:mt-0">
          <div
            onClick={() => {
              setActiveItem("newchat");
              navigate("/new-chat");
            }}
            className={`w-full h-[42px] flex items-center gap-[12px] px-[12px] rounded-lg mt-2 cursor-pointer transition-all duration-300 ${activeItem === "newchat" ? "bg-[#4866F6]" : "hover:bg-[#4866F6]"}`}
          >
            <svg
              className={`w-[20px] h-[20.73px] ${activeItem === "newchat" ? "text-white" : "text-[#586D93]"} group-hover:text-white`}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_1751_4622)">
                <mask
                  id="mask0_1751_4622"
                  style={{ maskType: "luminance" }}
                  maskUnits="userSpaceOnUse"
                  x="0"
                  y="0"
                  width="24"
                  height="24"
                >
                  <path d="M24 0H0V24H24V0Z" fill="white" />
                </mask>
                <g mask="url(#mask0_1751_4622)">
                  <path
                    d="M6 12H18"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 18V6"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
              </g>
              <defs>
                <clipPath id="clip0_1751_4622">
                  <rect width="24" height="24" fill="white" />
                </clipPath>
              </defs>
            </svg>
            <p
              className={`block text-[14px] ${activeItem === "newchat" ? "text-white" : "text-[#586D93] group-hover:text-white"}`}
            >
              New Chat
            </p>
          </div>
          {/* second icon */}
          <div>
            <div
              onClick={() => {
                setActiveItem("tasks");
                setOpenMenu({ ...openMenu, tasks: !openMenu.tasks });
              }}
              className={`w-full h-[42px] flex items-center justify-between px-[14px] rounded-[8px] mt-[12px] cursor-pointer transition-all duration-300 ${activeItem === "tasks" ? "bg-[#4D63F3]" : "hover:bg-[#4866F6]"}`}
            >
              <div className="flex items-center gap-[14px]">
                <svg
                  className={`w-[20px] h-[20px] ${activeItem === "tasks" ? "text-white" : "text-[#586D93]"} group-hover:text-white`}
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_tasks)">
                    <mask
                      id="mask0_tasks"
                      style={{ maskType: "luminance" }}
                      maskUnits="userSpaceOnUse"
                      x="0"
                      y="0"
                      width="24"
                      height="24"
                    >
                      <path d="M24 0H0V24H24V0Z" fill="white" />
                    </mask>
                    <g mask="url(#mask0_tasks)">
                      <path
                        d="M17.6201 9.61914H12.3701C11.9601 9.61914 11.6201 9.27914 11.6201 8.86914C11.6201 8.45914 11.9601 8.11914 12.3701 8.11914H17.6201C18.0301 8.11914 18.3701 8.45914 18.3701 8.86914C18.3701 9.27914 18.0401 9.61914 17.6201 9.61914Z"
                        fill="currentColor"
                      />
                      <path
                        d="M7.12055 10.3803C6.93055 10.3803 6.74055 10.3103 6.59055 10.1603L5.84055 9.41031C5.55055 9.12031 5.55055 8.64031 5.84055 8.35031C6.13055 8.06031 6.61055 8.06031 6.90055 8.35031L7.12055 8.57031L8.84055 6.85031C9.13055 6.56031 9.61055 6.56031 9.90055 6.85031C10.1906 7.14031 10.1906 7.62031 9.90055 7.91031L7.65055 10.1603C7.51055 10.3003 7.32055 10.3803 7.12055 10.3803Z"
                        fill="currentColor"
                      />
                      <path
                        d="M17.6201 16.6191H12.3701C11.9601 16.6191 11.6201 16.2791 11.6201 15.8691C11.6201 15.4591 11.9601 15.1191 12.3701 15.1191H17.6201C18.0301 15.1191 18.3701 15.4591 18.3701 15.8691C18.3701 16.2791 18.0401 16.6191 17.6201 16.6191Z"
                        fill="currentColor"
                      />
                      <path
                        d="M7.12055 17.3803C6.93055 17.3803 6.74055 17.3103 6.59055 17.1603L5.84055 16.4103C5.55055 16.12031 5.55055 15.6403 5.84055 15.3503C6.13055 15.0603 6.61055 15.0603 6.90055 15.3503L7.12055 15.5703L8.84055 13.8503C9.13055 13.5603 9.61055 13.5603 9.90055 13.8503C10.1906 14.1403 10.1906 14.6203 9.90055 14.9103L7.65055 17.1603C7.51055 17.3003 7.32055 17.3803 7.12055 17.3803Z"
                        fill="currentColor"
                      />
                      <path
                        d="M15 22.75H9C3.57 22.75 1.25 20.43 1.25 15V9C1.25 3.57 3.57 1.25 9 1.25H15C20.43 1.25 22.75 3.57 22.75 9V15C22.75 20.43 20.43 22.75 15 22.75ZM9 2.75C4.39 2.75 2.75 4.39 2.75 9V15C2.75 19.61 4.39 21.25 9 21.25H15C19.61 21.25 21.25 19.61 21.25 15V9C21.25 4.39 19.61 2.75 15 2.75H9Z"
                        fill="currentColor"
                      />
                    </g>
                  </g>
                  <defs>
                    <clipPath id="clip0_tasks">
                      <rect width="24" height="24" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
                <p
                  className={`block text-[14px] ${activeItem === "tasks" ? "text-white" : "text-[#586D93]"} group-hover:text-white`}
                >
                  Tasks
                </p>
              </div>
              <svg
                className={`block text-[14px] transition-all duration-300 ${openMenu.tasks ? "rotate-180" : ""}`}
                width="18"
                height="9"
                viewBox="0 0 18 9"
                fill="none"
              >
                <path
                  d="M16.59 0.75L10.07 7.27C9.30002 8.04 8.04002 8.04 7.27002 7.27L0.75 0.75"
                  stroke={activeItem === "tasks" ? "white" : "#586D93"}
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            {openMenu.tasks && (
              <div className="ml-[32px] mt-[6px] flex flex-col gap-[2px]">
                <div
                  onClick={() => setActiveItem("myTasks")}
                  className={`flex items-center gap-[10px] cursor-pointer px-3 py-2 rounded-lg group transition-all duration-300 ${
                    activeItem === "myTasks"
                      ? "bg-[#4866F6]"
                      : "hover:bg-[#4866F6]"
                  }`}
                >
                  <svg
                    className={`w-[18px] h-[18px] ${
                      activeItem === "myTasks"
                        ? "text-white"
                        : "text-[#586D93] group-hover:text-white"
                    }`}
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <g clipPath="url(#clip0_1)">
                      <mask
                        id="mask0_1"
                        style={{ maskType: "luminance" }}
                        maskUnits="userSpaceOnUse"
                        x="0"
                        y="0"
                        width="24"
                        height="24"
                      >
                        <path d="M24 0H0V24H24V0Z" fill="white" />
                      </mask>
                      <g mask="url(#mask0_1)">
                        <path
                          d="M20 8.25V18C20 21 18.21 22 16 22H8C5.79 22 4 21 4 18V8.25C4 5 5.79 4.25 8 4.25C8 4.87 8.24997 5.43 8.65997 5.84C9.06997 6.25 9.63 6.5 10.25 6.5H13.75C14.99 6.5 16 5.49 16 4.25C18.21 4.25 20 5 20 8.25Z"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M16 4.25C16 5.49 14.99 6.5 13.75 6.5H10.25C9.63 6.5 9.06997 6.25 8.65997 5.84C8.24997 5.43 8 4.87 8 4.25C8 3.01 9.01 2 10.25 2H13.75C14.37 2 14.93 2.25 15.34 2.66C15.75 3.07 16 3.63 16 4.25Z"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M8 13H12"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                        <path
                          d="M8 17H16"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                      </g>
                    </g>
                    <defs>
                      <clipPath id="clip0_1">
                        <rect width="24" height="24" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>

                  <p
                    className={`${
                      activeItem === "myTasks"
                        ? "text-white"
                        : "text-[#586D93] group-hover:text-white"
                    }`}
                  >
                    My Tasks
                  </p>
                </div>

                <div
                  onClick={() => setActiveItem("upcomingTasks")}
                  className={`flex items-center gap-[10px] cursor-pointer px-3 py-2 rounded-lg group transition-all duration-300 ${
                    activeItem === "upcomingTasks"
                      ? "bg-[#4866F6]"
                      : "hover:bg-[#4866F6]"
                  }`}
                >
                  <svg
                    className={`w-[16px] h-[16px] min-w-[16px] min-h-[16px] flex-shrink-0 ${
                      activeItem === "upcomingTasks"
                        ? "text-white"
                        : "text-[#586D93] group-hover:text-white"
                    }`}
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <mask
                      id="mask0_2"
                      style={{ maskType: "luminance" }}
                      maskUnits="userSpaceOnUse"
                      x="0"
                      y="0"
                      width="24"
                      height="24"
                    >
                      <path d="M24 0H0V24H24V0Z" fill="white" />
                    </mask>

                    <g mask="url(#mask0_2)">
                      <path
                        d="M15.0594 19.3896C14.4394 19.8096 13.6594 20.1596 12.7094 20.4696L11.1294 20.9896C7.15936 22.2696 5.06936 21.1996 3.77936 17.2296L2.49936 13.2796C1.21936 9.30961 2.27936 7.20961 6.24936 5.92961L7.82936 5.40961C8.23936 5.27961 8.62936 5.16961 8.99936 5.09961C8.69936 5.70961 8.45936 6.44961 8.25936 7.29961L7.27936 11.4896C6.29936 15.6696 7.58936 17.7296 11.7594 18.7196L13.4394 19.1196C14.0194 19.2596 14.5594 19.3496 15.0594 19.3896Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M12.6396 8.5293L17.4896 9.7593"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M11.6602 12.4004L14.5602 13.1404"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M20.9602 5.1005C22.0402 6.3005 22.2302 8.0205 21.6602 10.4405L20.6802 14.6205C19.8402 18.2305 18.1802 19.6905 15.0602 19.3905C14.5602 19.3505 14.0202 19.2605 13.4402 19.1205L11.7602 18.7205C7.59018 17.7305 6.30018 15.6705 7.28018 11.4905L8.26018 7.3005C8.46018 6.4505 8.70018 5.7105 9.00018 5.1005C10.1702 2.6805 12.1602 2.0305 15.5002 2.8205L17.1702 3.2105"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </g>
                  </svg>

                  <p
                    className={`${
                      activeItem === "upcomingTasks"
                        ? "text-white"
                        : "text-[#586D93] group-hover:text-white"
                    }`}
                  >
                    Upcoming Tasks
                  </p>
                </div>

                <div
                  onClick={() => setActiveItem("completedTasks")}
                  className={`flex items-center gap-[10px] cursor-pointer px-3 py-2 rounded-lg group transition-all duration-300 ${
                    activeItem === "completedTasks"
                      ? "bg-[#4866F6]"
                      : "hover:bg-[#4866F6]"
                  }`}
                >
                  <svg
                    className={`w-[18px] h-[18px] ${
                      activeItem === "completedTasks"
                        ? "text-white"
                        : "text-[#586D93] group-hover:text-white"
                    }`}
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <g clipPath="url(#clip0_3)">
                      <mask
                        id="mask0_3"
                        style={{ maskType: "luminance" }}
                        maskUnits="userSpaceOnUse"
                        x="0"
                        y="0"
                        width="24"
                        height="24"
                      >
                        <path d="M24 0H0V24H24V0Z" fill="white" />
                      </mask>

                      <g mask="url(#mask0_3)">
                        <path
                          d="M9.31055 14.6992L10.8106 16.1992L14.8106 12.1992"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                        <path
                          d="M10.96 2H10C9 2 8 2 8 4C8 6 9 6 10 6H14C16 6 16 5 16 4C16 2 15 2 14 2"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        />
                        <path
                          d="M3 9.99953C3 5.43953 4.67 4.19953 8 4.01953"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        />
                        <path
                          d="M16 4.01953C19.33 4.19953 21 5.42953 21 9.99953V15.9995C21 19.9995 20 21.9995 15 21.9995H9C4 21.9995 3 19.9995 3 15.9995V13.9095"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        />
                      </g>
                    </g>

                    <defs>
                      <clipPath id="clip0_3">
                        <rect width="24" height="24" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>

                  <p
                    className={`${
                      activeItem === "completedTasks"
                        ? "text-white"
                        : "text-[#586D93] group-hover:text-white"
                    }`}
                  >
                    Completed Tasks
                  </p>
                </div>
              </div>
            )}
          </div>
          {/* <div onClick={() => setActiveItem("manage")} className={`w-[50px] lg:w-[302px] h-[44px] flex justify-center lg:justify-start gap-[10px] rounded-lg py-[10px] px-[10px] group items-center mt-3 cursor-pointer ${activeItem==="manage" ? "bg-[#4866F6]" : "hover:bg-[#4866F6]"}`}><svg className={`w-[20px] h-[20.73px] ${activeItem==="manage" ? "text-white" : "text-[#586D93]"} group-hover:text-white`} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g clipPath="url(#clip0_1751_4631)"><mask id="mask0_1751_4631" style={{maskType:"luminance"}} maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24"><path d="M24 0H0V24H24V0Z" fill="white"/></mask><g mask="url(#mask0_1751_4631)"><path d="M17.6201 9.61914H12.3701C11.9601 9.61914 11.6201 9.27914 11.6201 8.86914C11.6201 8.45914 11.9601 8.11914 12.3701 8.11914H17.6201C18.0301 8.11914 18.3701 8.45914 18.3701 8.86914C18.3701 9.27914 18.0401 9.61914 17.6201 9.61914Z" fill="currentColor"/><path d="M7.12055 10.3803C6.93055 10.3803 6.74055 10.3103 6.59055 10.1603L5.84055 9.41031C5.55055 9.12031 5.55055 8.64031 5.84055 8.35031C6.13055 8.06031 6.61055 8.06031 6.90055 8.35031L7.12055 8.57031L8.84055 6.85031C9.13055 6.56031 9.61055 6.56031 9.90055 6.85031C10.1906 7.14031 10.1906 7.62031 9.90055 7.91031L7.65055 10.1603C7.51055 10.3003 7.32055 10.3803 7.12055 10.3803Z" fill="currentColor"/><path d="M17.6201 16.6191H12.3701C11.9601 16.6191 11.6201 16.2791 11.6201 15.8691C11.9601 15.4591 11.9601 15.1191 12.3701 15.1191H17.6201C18.0301 15.1191 18.3701 15.4591 18.3701 15.8691C18.3701 16.2791 18.0401 16.6191 17.6201 16.6191Z" fill="currentColor"/><path d="M7.12055 17.3803C6.93055 17.3803 6.74055 17.3103 6.59055 17.1603L5.84055 16.4103C5.55055 16.1203 5.55055 15.6403 5.84055 15.3503C6.13055 15.0603 6.61055 15.0603 6.90055 15.3503L7.12055 15.5703L8.84055 13.8503C9.13055 13.5603 9.61055 13.5603 9.90055 13.8503C10.1906 14.1403 10.1906 14.6203 9.90055 14.9103L7.65055 17.1603C7.51055 17.3003 7.32055 17.3803 7.12055 17.3803Z" fill="currentColor"/><path d="M15 22.75H9C3.57 22.75 1.25 20.43 1.25 15V9C1.25 3.57 3.57 1.25 9 1.25H15C20.43 1.25 22.75 3.57 22.75 9V15C22.75 20.43 20.43 22.75 15 22.75ZM9 2.75C4.39 2.75 2.75 4.39 2.75 9V15C2.75 19.61 4.39 21.25 9 21.25H15C19.61 21.25 21.25 19.61 21.25 15V9C21.25 4.39 19.61 2.75 15 2.75H9Z" fill="currentColor"/></g></g><defs><clipPath id="clip0_1751_4631"><rect width="24" height="24" fill="white"/></clipPath></defs></svg><p className={`block text-[14px] ${activeItem==="manage" ? "text-white" : "text-[#586D93]"} group-hover:text-white`}>Tasks</p></div> */}

          {/* third icon */}
          <div>
            <div
              onClick={() => {
                setActiveItem("track");
                setOpenMenu({
                  ...openMenu,
                  integrations: !openMenu.integrations,
                });
              }}
              className={`w-full h-[42px] flex items-center justify-between px-[14px] rounded-[8px] mt-[12px] cursor-pointer transition-all duration-300 ${activeItem === "track" ? "bg-[#4D63F3]" : "hover:bg-[#4866F6]"}`}
            >
              <div className="flex items-center gap-[10px]">
                <svg
                  className={`w-[20px] h-[20.73px] ${activeItem === "track" ? "text-white" : "text-[#586D93]"} group-hover:text-white`}
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_1751_4646)">
                    <mask
                      id="mask0_1751_4646"
                      style={{ maskType: "luminance" }}
                      maskUnits="userSpaceOnUse"
                      x="0"
                      y="0"
                      width="24"
                      height="24"
                    >
                      <path d="M24 0H0V24H24V0Z" fill="white" />
                    </mask>
                    <g mask="url(#mask0_1751_4646)">
                      <path
                        d="M12.5002 14.75H10.0002C9.59025 14.75 9.25025 14.41 9.25025 14C9.25025 13.59 9.59025 13.25 10.0002 13.25H12.5002C15.1202 13.25 17.2502 11.12 17.2502 8.5C17.2502 5.88 15.1202 3.75 12.5002 3.75H7.50024C4.88024 3.75 2.75024 5.88 2.75024 8.5C2.75024 9.6 3.14023 10.67 3.84023 11.52C4.10023 11.84 4.06023 12.31 3.74023 12.58C3.42023 12.84 2.95024 12.8 2.68024 12.48C1.75024 11.36 1.24023 9.95 1.24023 8.5C1.24023 5.05 4.04023 2.25 7.49023 2.25H12.4902C15.9402 2.25 18.7402 5.05 18.7402 8.5C18.7402 11.95 15.9502 14.75 12.5002 14.75Z"
                        fill="currentColor"
                      />
                      <path
                        d="M16.5 21.75H11.5C8.05 21.75 5.25 18.95 5.25 15.5C5.25 12.05 8.05 9.25 11.5 9.25H14C14.41 9.25 14.75 9.59 14.75 10C14.75 10.41 14.41 10.75 14 10.75H11.5C8.88 10.75 6.75 12.88 6.75 15.5C6.75 18.12 8.88 20.25 11.5 20.25H16.5C19.12 20.25 21.25 18.12 21.25 15.5C21.25 14.4 20.86 13.33 20.16 12.48C19.9 12.16 19.94 11.69 20.26 11.42C20.58 11.15 21.05 11.2 21.32 11.52C22.25 12.64 22.76 14.05 22.76 15.5C22.75 18.95 19.95 21.75 16.5 21.75Z"
                        fill="currentColor"
                      />
                    </g>
                  </g>
                  <defs>
                    <clipPath id="clip0_1751_4646">
                      <rect width="24" height="24" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
                <p
                  className={`block text-[14px] ${activeItem === "track" ? "text-white" : "text-[#586D93]"} group-hover:text-white`}
                >
                  Integrations
                </p>
              </div>
              <svg
                className={`block text-[14px] transition-all duration-300 ${openMenu.integrations ? "rotate-180" : ""}`}
                width="18"
                height="9"
                viewBox="0 0 18 9"
                fill="none"
              >
                <path
                  d="M16.59 0.75L10.07 7.27C9.30002 8.04 8.04002 8.04 7.27002 7.27L0.75 0.75"
                  stroke={activeItem === "track" ? "white" : "#586D93"}
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            {openMenu.integrations && (
              <div className="ml-[32px] mt-[6px] flex flex-col gap-[2px]">
                <div
                  onClick={() => setActiveItem("calendar")}
                  className={`flex items-center gap-[10px] cursor-pointer px-3 py-2 rounded-lg group transition-all duration-300 ${
                    activeItem === "calendar"
                      ? "bg-[#4866F6]"
                      : "hover:bg-[#4866F6]"
                  }`}
                >
                  <svg
                    className={`w-[18px] h-[18px] ${
                      activeItem === "calendar"
                        ? "text-white"
                        : "text-[#586D93] group-hover:text-white"
                    }`}
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <g clipPath="url(#clip0_calendar)">
                      <mask
                        id="mask0_calendar"
                        style={{ maskType: "luminance" }}
                        maskUnits="userSpaceOnUse"
                        x="0"
                        y="0"
                        width="24"
                        height="24"
                      >
                        <path d="M24 0H0V24H24V0Z" fill="white" />
                      </mask>

                      <g mask="url(#mask0_calendar)">
                        <path
                          d="M8 2V5"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M16 2V5"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M3.5 9.08984H20.5"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M18 23C20.2091 23 22 21.2091 22 19C22 16.7909 20.2091 15 18 15C15.7909 15 14 16.7909 14 19C14 21.2091 15.7909 23 18 23Z"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M19.4898 19.0508H16.5098"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M18 17.5898V20.5798"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M21 8.5V16.36C20.27 15.53 19.2 15 18 15C15.79 15 14 16.79 14 19C14 19.75 14.21 20.46 14.58 21.06C14.79 21.42 15.06 21.74 15.37 22H8C4.5 22 3 20 3 17V8.5C3 5.5 4.5 3.5 8 3.5H16C19.5 3.5 21 5.5 21 8.5Z"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M11.9951 13.6992H12.0041"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M8.29395 13.6992H8.30293"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M8.29395 16.6992H8.30293"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </g>
                    </g>
                  </svg>

                  <p
                    className={`${
                      activeItem === "calendar"
                        ? "text-white"
                        : "text-[#586D93] group-hover:text-white"
                    }`}
                  >
                    Calendar
                  </p>
                </div>
                <div
                  onClick={() => setActiveItem("email")}
                  className={`flex items-center gap-[10px] cursor-pointer px-3 py-2 rounded-lg group transition-all duration-300 ${
                    activeItem === "email"
                      ? "bg-[#4866F6]"
                      : "hover:bg-[#4866F6]"
                  }`}
                >
                  <svg
                    className={`w-[18px] h-[18px] ${
                      activeItem === "email"
                        ? "text-white"
                        : "text-[#586D93] group-hover:text-white"
                    }`}
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <g clipPath="url(#clip0_email)">
                      <mask
                        id="mask0_email"
                        style={{ maskType: "luminance" }}
                        maskUnits="userSpaceOnUse"
                        x="0"
                        y="0"
                        width="24"
                        height="24"
                      >
                        <path d="M24 0H0V24H24V0Z" fill="white" />
                      </mask>

                      <g mask="url(#mask0_email)">
                        <path
                          d="M3.13 8.20957L10.13 2.64957C11.23 1.77957 12.78 1.77957 13.88 2.64957L20.88 8.20957C21.59 8.77957 22 9.62957 22 10.5296V19.0196C22 20.6696 20.66 21.9996 19 21.9996H5C3.34 21.9996 2 20.6696 2 19.0196V10.5296C2 9.62957 2.41 8.76957 3.13 8.20957Z"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M2 10.96C2 11.65 2.37 12.3 2.97 12.66L10.46 17.11C11.41 17.68 12.6 17.68 13.55 17.11L21.04 12.66C21.64 12.3 22.01 11.66 22.01 10.96"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </g>
                    </g>

                    <defs>
                      <clipPath id="clip0_email">
                        <rect width="24" height="24" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>

                  <p
                    className={`${
                      activeItem === "email"
                        ? "text-white"
                        : "text-[#586D93] group-hover:text-white"
                    }`}
                  >
                    Email
                  </p>
                </div>
              </div>
            )}
          </div>
          {/* <div onClick={() => setActiveItem("track")} className={`w-[50px] lg:w-[302px] h-[44px] flex justify-center lg:justify-start gap-[10px] rounded-lg py-[10px] px-[10px] group items-center mt-3 cursor-pointer ${activeItem==="track" ? "bg-[#4866F6]" : "hover:bg-[#4866F6]"}`}><svg className={`w-[20px] h-[20.73px] ${activeItem==="track" ? "text-white" : "text-[#586D93]"} group-hover:text-white`} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g clipPath="url(#clip0_1751_4646)"><mask id="mask0_1751_4646" style={{maskType:"luminance"}} maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24"><path d="M24 0H0V24H24V0Z" fill="white"/></mask><g mask="url(#mask0_1751_4646)"><path d="M12.5002 14.75H10.0002C9.59025 14.75 9.25025 14.41 9.25025 14C9.25025 13.59 9.59025 13.25 10.0002 13.25H12.5002C15.1202 13.25 17.2502 11.12 17.2502 8.5C17.2502 5.88 15.1202 3.75 12.5002 3.75H7.50024C4.88024 3.75 2.75024 5.88 2.75024 8.5C2.75024 9.6 3.14023 10.67 3.84023 11.52C4.10023 11.84 4.06023 12.31 3.74023 12.58C3.42023 12.84 2.95024 12.8 2.68024 12.48C1.75024 11.36 1.24023 9.95 1.24023 8.5C1.24023 5.05 4.04023 2.25 7.49023 2.25H12.4902C15.9402 2.25 18.7402 5.05 18.7402 8.5C18.7402 11.95 15.9502 14.75 12.5002 14.75Z" fill="currentColor"/><path d="M16.5 21.75H11.5C8.05 21.75 5.25 18.95 5.25 15.5C5.25 12.05 8.05 9.25 11.5 9.25H14C14.41 9.25 14.75 9.59 14.75 10C14.75 10.41 14.41 10.75 14 10.75H11.5C8.88 10.75 6.75 12.88 6.75 15.5C6.75 18.12 8.88 20.25 11.5 20.25H16.5C19.12 20.25 21.25 18.12 21.25 15.5C21.25 14.4 20.86 13.33 20.16 12.48C19.9 12.16 19.94 11.69 20.26 11.42C20.58 11.15 21.05 11.2 21.32 11.52C22.25 12.64 22.76 14.05 22.76 15.5C22.75 18.95 19.95 21.75 16.5 21.75Z" fill="currentColor"/></g></g><defs><clipPath id="clip0_1751_4646"><rect width="24" height="24" fill="white"/></clipPath></defs></svg><p className={`block text-[14px] ${activeItem==="track" ? "text-white" : "text-[#586D93]"} group-hover:text-white`}>Integrations</p></div> */}

          {/* fourth icon */}
          <div>
            <div
              onClick={() => {
                setActiveItem("communication");
                setOpenMenu({ ...openMenu, settings: !openMenu.settings });
              }}
              className={`w-full h-[42px] flex items-center justify-between px-[12px] rounded-lg mt-2 cursor-pointer group transition-all duration-300 ${activeItem === "communication" ? "bg-[#4866F6]" : "hover:bg-[#4866F6]"}`}
            >
              <div className="flex items-center gap-[10px]">
                <svg
                  className={`w-[20px] h-[20.73px] ${activeItem === "communication" ? "text-white" : "text-[#586D93]"} group-hover:text-white`}
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_1751_4658)">
                    <mask
                      id="mask0_1751_4658"
                      style={{ maskType: "luminance" }}
                      maskUnits="userSpaceOnUse"
                      x="0"
                      y="0"
                      width="24"
                      height="24"
                    >
                      <path d="M24 0H0V24H24V0Z" fill="white" />
                    </mask>
                    <g mask="url(#mask0_1751_4658)">
                      <path
                        d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
                        stroke="currentColor"
                        strokeWidth="1"
                        strokeLinecap="round"
                      />
                      <path
                        d="M2 12.8794V11.1194C2 10.0794 2.85 9.21945 3.9 9.21945C5.71 9.21945 6.45 7.93945 5.54 6.36945C5.02 5.46945 5.33 4.29945 6.24 3.77945L7.97 2.78945C8.76 2.31945 9.78 2.59945 10.25 3.38945L10.36 3.57945C11.26 5.14945 12.74 5.14945 13.65 3.57945L13.76 3.38945C14.23 2.59945 15.25 2.31945 16.04 2.78945L17.77 3.77945C18.68 4.29945 18.99 5.46945 18.47 6.36945C17.56 7.93945 18.3 9.21945 20.11 9.21945C21.15 9.21945 22.01 10.0694 22.01 11.1194V12.8794C22.01 13.9194 21.16 14.7794 20.11 14.7794C18.3 14.7794 17.56 16.0594 18.47 17.6294C18.99 18.5394 18.68 19.6994 17.77 20.2194L16.04 21.2094C15.25 21.6794 14.23 21.3994 13.76 20.6094L13.65 20.4194C12.75 18.8494 11.27 18.8494 10.36 20.4194L10.25 20.6094C9.78 21.3994 8.76 21.6794 7.97 21.2094L6.24 20.2194C5.33 19.6994 5.02 18.5294 5.54 17.6294C6.45 16.0594 5.71 14.7794 3.9 14.7794C2.85 14.7794 2 13.9194 2 12.8794Z"
                        stroke="currentColor"
                        strokeWidth="1"
                      />
                    </g>
                  </g>
                  <defs>
                    <clipPath id="clip0_1751_4658">
                      <rect width="24" height="24" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
                <p
                  className={`block text-[14px] ${activeItem === "communication" ? "text-white" : "text-[#586D93]"} group-hover:text-white`}
                >
                  Settings
                </p>
              </div>
              <svg
                className={`block text-[14px] transition-all duration-300 ${openMenu.settings ? "rotate-180" : ""}`}
                width="18"
                height="9"
                viewBox="0 0 18 9"
                fill="none"
              >
                <path
                  d="M16.59 0.75L10.07 7.27C9.30002 8.04 8.04002 8.04 7.27002 7.27L0.75 0.75"
                  stroke={activeItem === "communication" ? "white" : "#586D93"}
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            {openMenu.settings && (
              <div className="ml-[32px] mt-[6px] flex flex-col gap-[2px]">
                <div
                  onClick={() => {
                    setActiveItem("profileDashboard");
                    setSidebarOpen(false);
                  }}
                  className={`flex items-center gap-[10px] cursor-pointer px-3 py-2 rounded-lg group ${
                    profilePage === "preferenceSetting"
                      ? "bg-[#4866F6]"
                      : "hover:bg-[#4866F6]"
                  }`}
                >
                  <svg
                    className={`w-[18px] h-[18px] ${
                      profilePage === "preferenceSetting"
                        ? "text-white"
                        : "text-[#586D93] group-hover:text-white"
                    }`}
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <g clipPath="url(#clip0_preferences)">
                      <mask
                        id="mask0_preferences"
                        style={{ maskType: "luminance" }}
                        maskUnits="userSpaceOnUse"
                        x="0"
                        y="0"
                        width="24"
                        height="24"
                      >
                        <path d="M24 0H0V24H24V0Z" fill="white" />
                      </mask>
                      <g mask="url(#mask0_preferences)">
                        <path
                          d="M22 6.5H16"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeMiterlimit="10"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M6 6.5H2"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeMiterlimit="10"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M10 10C11.933 10 13.5 8.433 13.5 6.5C13.5 4.567 11.933 3 10 3C8.067 3 6.5 4.567 6.5 6.5C6.5 8.433 8.067 10 10 10Z"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeMiterlimit="10"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M8 17.5H2"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeMiterlimit="10"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M22 17.5H18"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeMiterlimit="10"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M14 21C15.933 21 17.5 19.433 17.5 17.5C17.5 15.567 15.933 14 14 14C12.067 14 10.5 15.567 10.5 17.5C10.5 19.433 12.067 21 14 21Z"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeMiterlimit="10"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </g>
                    </g>
                    <defs>
                      <clipPath id="clip0_preferences">
                        <rect width="24" height="24" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>

                  <p
                    className={`${
                      profilePage === "preferenceSetting"
                        ? "text-white"
                        : "text-[#586D93] group-hover:text-white"
                    }`}
                  >
                    Preferences
                  </p>
                </div>

                <div
                  onClick={() => {
                    setActiveItem("profileDashboard");
                    setProfilePage("security");
                    setSidebarOpen(false);
                  }}
                  className={`flex items-center gap-[10px] cursor-pointer px-3 py-2 rounded-lg group ${
                    profilePage === "security"
                      ? "bg-[#4866F6]"
                      : "hover:bg-[#4866F6]"
                  }`}
                >
                  <svg
                    className={`w-[18px] h-[18px] ${
                      profilePage === "security"
                        ? "text-white"
                        : "text-[#586D93] group-hover:text-white"
                    }`}
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <g clipPath="url(#clip0_security)">
                      <mask
                        id="mask0_security"
                        style={{ maskType: "luminance" }}
                        maskUnits="userSpaceOnUse"
                        x="0"
                        y="0"
                        width="24"
                        height="24"
                      >
                        <path d="M24 0H0V24H24V0Z" fill="white" />
                      </mask>
                      <g mask="url(#mask0_security)">
                        <path
                          d="M20.9099 11.1203C20.9099 16.0103 17.3599 20.5903 12.5099 21.9303C12.1799 22.0203 11.8199 22.0203 11.4899 21.9303C6.63983 20.5903 3.08984 16.0103 3.08984 11.1203V6.73028C3.08984 5.91028 3.70985 4.98028 4.47985 4.67028L10.0499 2.39031C11.2999 1.88031 12.7099 1.88031 13.9599 2.39031L19.5299 4.67028C20.2899 4.98028 20.9199 5.91028 20.9199 6.73028L20.9099 11.1203Z"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M12 12.5C13.1046 12.5 14 11.6046 14 10.5C14 9.39543 13.1046 8.5 12 8.5C10.8954 8.5 10 9.39543 10 10.5C10 11.6046 10.8954 12.5 12 12.5Z"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeMiterlimit="10"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M12 12.5V15.5"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeMiterlimit="10"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </g>
                    </g>
                    <defs>
                      <clipPath id="clip0_security">
                        <rect width="24" height="24" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>

                  <p
                    className={`${
                      profilePage === "security"
                        ? "text-white"
                        : "text-[#586D93] group-hover:text-white"
                    }`}
                  >
                    Security
                  </p>
                </div>

                <div
                  onClick={() => {
                    setActiveItem("profileDashboard");
                    setProfilePage("notifications");
                    setSidebarOpen(false);
                  }}
                  className={`flex items-center gap-[10px] cursor-pointer px-3 py-2 rounded-lg group ${
                    profilePage === "notifications"
                      ? "bg-[#4866F6]"
                      : "hover:bg-[#4866F6]"
                  }`}
                >
                  <svg
                    className={`w-[18px] h-[18px] ${
                      profilePage === "notifications"
                        ? "text-white"
                        : "text-[#586D93] group-hover:text-white"
                    }`}
                    viewBox="0 0 21 22"
                    fill="none"
                  >
                    <path
                      d="M0.780982 13.52C0.567982 14.914 1.51898 15.881 2.68298 16.363C7.14598 18.213 13.356 18.213 17.819 16.363C18.983 15.881 19.934 14.913 19.721 13.52C19.591 12.663 18.944 11.95 18.465 11.253C17.838 10.329 17.776 9.322 17.775 8.25C17.776 4.108 14.408 0.75 10.251 0.75C6.09398 0.75 2.72598 4.108 2.72598 8.25C2.72598 9.322 2.66398 10.33 2.03598 11.253C1.55798 11.95 0.911982 12.663 0.780982 13.52Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M6.25098 17.75C6.70898 19.475 8.32698 20.75 10.251 20.75C12.176 20.75 13.792 19.475 14.251 17.75"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>

                  <p
                    className={`${
                      profilePage === "notifications"
                        ? "text-white"
                        : "text-[#586D93] group-hover:text-white"
                    }`}
                  >
                    Notifications
                  </p>
                </div>
              </div>
            )}
          </div>
          {/* <div onClick={() => setActiveItem("communication")} className={`w-[50px] lg:w-[302px] h-[44px] flex justify-center lg:justify-start gap-[10px] rounded-lg py-[10px] px-[10px] group items-center mt-3 cursor-pointer ${activeItem==="communication" ? "bg-[#4866F6]" : "hover:bg-[#4866F6]"}`}><svg className={`w-[20px] h-[20.73px] ${activeItem==="communication" ? "text-white" : "text-[#586D93]"} group-hover:text-white`} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g clipPath="url(#clip0_1751_4658)"><mask id="mask0_1751_4658" style={{maskType:"luminance"}} maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24"><path d="M24 0H0V24H24V0Z" fill="white"/></mask><g mask="url(#mask0_1751_4658)"><path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="currentColor" strokeWidth="1" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/><path d="M2 12.8794V11.1194C2 10.0794 2.85 9.21945 3.9 9.21945C5.71 9.21945 6.45 7.93945 5.54 6.36945C5.02 5.46945 5.33 4.29945 6.24 3.77945L7.97 2.78945C8.76 2.31945 9.78 2.59945 10.25 3.38945L10.36 3.57945C11.26 5.14945 12.74 5.14945 13.65 3.57945L13.76 3.38945C14.23 2.59945 15.25 2.31945 16.04 2.78945L17.77 3.77945C18.68 4.29945 18.99 5.46945 18.47 6.36945C17.56 7.93945 18.3 9.21945 20.11 9.21945C21.15 9.21945 22.01 10.0694 22.01 11.1194V12.8794C22.01 13.9194 21.16 14.7794 20.11 14.7794C18.3 14.7794 17.56 16.0594 18.47 17.6294C18.99 18.5394 18.68 19.6994 17.77 20.2194L16.04 21.2094C15.25 21.6794 14.23 21.3994 13.76 20.6094L13.65 20.4194C12.75 18.8494 11.27 18.8494 10.36 20.4194L10.25 20.6094C9.78 21.3994 8.76 21.6794 7.97 21.2094L6.24 20.2194C5.33 19.6994 5.02 18.5294 5.54 17.6294C6.45 16.0594 5.71 14.7794 3.9 14.7794C2.85 14.7794 2 13.9194 2 12.8794Z" stroke="currentColor" strokeWidth="1" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/></g></g><defs><clipPath id="clip0_1751_4658"><rect width="24" height="24" fill="white"/></clipPath></defs></svg><p className={`block text-[14px] ${activeItem==="communication" ? "text-white" : "text-[#586D93]"} group-hover:text-white`}>Settings</p></div> */}
          {/* fifth icon */}

          <div
            onClick={() => {
              setActiveItem("profileDashboard");
              setProfilePage("dashboard");
              navigate("/user-profile");
              setSidebarOpen(false);
            }}
            className={`w-full h-[42px] flex items-center justify-start gap-[12px] px-[14px] rounded-[8px] mt-[10px] cursor-pointer group transition-all duration-300 ${
              activeItem === "profileDashboard"
                ? "bg-[#4D63F3]"
                : "hover:bg-[#4866F6]"
            }`}
          >
            <svg
              className={`w-[20px] h-[20px] ${
                activeItem === "profileDashboard"
                  ? "text-white"
                  : "text-[#586D93]"
              } group-hover:text-white`}
              viewBox="0 0 24 24"
              fill="none"
            >
              <mask
                id="mask0_1751_4346"
                style={{ maskType: "luminance" }}
                maskUnits="userSpaceOnUse"
                x="0"
                y="0"
                width="24"
                height="24"
              >
                <path d="M24 0H0V24H24V0Z" fill="white" />
              </mask>
              <g mask="url(#mask0_1751_4346)">
                <path
                  d="M15.02 3.01001C14.18 2.37001 13.14 2 12 2C9.24 2 7 4.24 7 7C7 9.76 9.24 12 12 12C14.76 12 17 9.76 17 7"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M20.5902 22C20.5902 18.13 16.7402 15 12.0002 15C7.26016 15 3.41016 18.13 3.41016 22"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
            </svg>

            <p
              className={`text-[14px] font-medium ${
                activeItem === "profileDashboard"
                  ? "text-white"
                  : "text-[#586D93]"
              } group-hover:text-white`}
            >
              Profile
            </p>
          </div>
          <div className="mt-auto pt-6">
            <button
              onClick={() => navigate("/")}
              className="w-full h-[44px] flex items-center justify-center gap-[10px] rounded-[10px] border border-[#FB0000] bg-[#FF000033] text-[#FF0000] font-medium cursor-pointer"
            >
              <span>Logout</span>
              <img src={SignOut} alt="logout" className="w-[18px] h-[18px]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
