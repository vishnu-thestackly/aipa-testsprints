import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import logo from "../../assets/images/Logo.svg";
import SignOut from "../../assets/images/SignOut.png";
import defaultProfile from "../../assets/images/profile.png";
import logos from "../../assets/images/logo.png";
import TabletSidebar from "./sidebar/TabletSidebar";
import { mockNotifications } from "../../utils/mockNotifications";
import notificationTaskImg from "../../assets/images/notification-task.png";

const icon_bg = "w-[36px] h-[36px] bg-[#4866F626] rounded-[18px] flex justify-center items-center text-[#4866F6] transition-all duration-300 ease-in-out";

export default function Navbar({ profile }) {
  const navigate = useNavigate();
  const [openMenu, setOpenMenu] = useState({ tasks: false, integrations: false, settings: false, language: false });
  const [activeItem, setActiveItem] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showLanguages, setShowLanguages] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const [showNotifications, setShowNotifications] = useState(false);
  const languageRef = useRef(null);
  const notificationRef = useRef(null);
  const notificationRefMobile = useRef(null);
  const languages = ["English", "Spanish", "German", "Portuguese", "Latin"];

  useEffect(() => {
    function handleClickOutside(event) {
      if (languageRef.current && !languageRef.current.contains(event.target)) setShowLanguages(false);
      if (notificationRef.current && !notificationRef.current.contains(event.target) && (!notificationRefMobile.current || !notificationRefMobile.current.contains(event.target))) {
        setShowNotifications(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="w-screen min-w-screen relative left-0 right-0 bg-white overflow-visible">
      {/* MOBILE VIEW */}
      <div className="md:hidden px-[20px] pt-[10px] pb-[14px]">
        <div className="flex justify-between items-center">
          <div onClick={() => { setSidebarOpen(true); setActiveItem("tasks"); setOpenMenu({ ...openMenu, tasks: !openMenu.tasks }); }} className="w-[38px] h-[38px] min-[360px]:w-[40px] min-[360px]:h-[40px] min-[390px]:w-[42px] min-[390px]:h-[42px] rounded-full bg-[#F3F3F3] flex justify-center items-center cursor-pointer">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#586D93" strokeWidth="2"><path d="M3 6H21M3 12H21M3 18H21" /></svg>
          </div>
          <div onClick={() => navigate("/")} className="flex items-center gap-[8px]">
            <img src={logo} alt="" className="w-[38px] h-[32px] min-[360px]:w-[40px] min-[360px]:h-[34px] min-[390px]:w-[44px] min-[390px]:h-[38px]" />
            <div>
              <h2 className="font-bold text-[18px] min-[360px]:text-[19px] min-[390px]:text-[20px] text-[#4866F6] leading-[16px]">Personal</h2>
              <p className="text-[#4866F6] text-[8px] min-[360px]:text-[9px] min-[390px]:text-[10px] tracking-[0.5em] mt-[4px]">ASSISTANT</p>
            </div>
          </div>
          <img src={profile?.avatar_url ? `http://54.188.108.28${profile.avatar_url}` : defaultProfile} alt="" className="w-[45px] h-[45px] min-[360px]:w-[48px] min-[360px]:h-[48px] min-[390px]:w-[52px] min-[390px]:h-[52px]" />
        </div>
        <div className="flex justify-between items-center mt-[25px]">
          <div className="w-[120px]"></div>
          <div className="flex gap-[8px] items-center">
            <div className="flex gap-[8px] items-center">
              {/* Translate */}
              <div onClick={() => setShowLanguages(!showLanguages)} className="w-[35px] h-[35px] min-[360px]:w-[38px] min-[360px]:h-[38px] min-[390px]:w-[40px] min-[390px]:h-[40px] bg-[#4866F626] rounded-full flex justify-center items-center cursor-pointer">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" className="text-[#4866F6]"><path d="M13.5 3.75V5.25H11.1C10.6058 7.37035 9.59593 9.33596 8.16 10.9725C9.24497 12.0793 10.5543 12.9412 12 13.5L11.4675 14.88C9.8444 14.228 8.37362 13.2475 7.1475 12C5.89872 13.2306 4.42769 14.213 2.8125 14.895L2.25 13.5C3.68742 12.8915 4.99958 12.0218 6.12 10.935C5.10624 9.69875 4.3421 8.27746 3.87 6.75H5.445C5.82704 7.8886 6.4086 8.95013 7.1625 9.885C8.31901 8.55344 9.13944 6.96402 9.555 5.25H1.5V3.75H6.75V1.5H8.25V3.75H13.5ZM22.5 21.75H20.8874L19.6874 18.75H14.55L13.35 21.75H11.7375L16.2374 10.5H18L22.5 21.75ZM17.115 12.33L15.15 17.25H19.0874L17.115 12.33Z" /></svg>
              </div>
              {showLanguages && (
                <div ref={languageRef} className="absolute top-[130px] right-[20px] z-[99999] w-[280px]">
                  <div className="bg-white rounded-[25px] border border-[#E5E5E5] px-[8px] py-[6px]">
                    <div className="flex items-center gap-[2px] overflow-x-auto scrollbar-hide">
                      {languages.map((item, index) => (
                        <button key={index} onClick={(e) => { e.stopPropagation(); setSelectedLanguage(item); setTimeout(() => { setShowLanguages(false); }, 300); }} className={`flex-shrink-0 min-w-[110px] h-[32px] rounded-[18px] text-[14px] ${selectedLanguage === item ? "bg-[#4866F6] text-white" : "text-[#4866F6]"}`}>{item}</button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              {/* Notification */}
              <div ref={notificationRefMobile} className="relative">
                <div onClick={() => setShowNotifications(!showNotifications)} className="w-[35px] h-[35px] min-[360px]:w-[38px] min-[360px]:h-[38px] min-[390px]:w-[40px] min-[390px]:h-[40px] bg-[#4866F6] text-white rounded-full flex justify-center items-center relative cursor-pointer hover:scale-105 transition-all">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M2.53001 14.77C2.31701 16.164 3.26801 17.131 4.43201 17.613C8.89501 19.463 15.105 19.463 19.568 17.613C20.732 17.131 21.683 16.163 21.47 14.77C21.34 13.913 20.693 13.2 20.214 12.503C19.587 11.579 19.525 10.572 19.524 9.5C19.525 5.358 16.157 2 12 2C7.843 2 4.47501 5.358 4.47501 9.5C4.47501 10.572 4.41301 11.58 3.78501 12.503C3.30701 13.2 2.66101 13.913 2.53001 14.77Z" stroke="currentColor" strokeWidth="1.5" /><path d="M8 19C8.458 20.725 10.076 22 12 22C13.925 22 15.541 20.725 16 19" stroke="currentColor" strokeWidth="1.5" /></svg>
                  <div className="absolute top-[2px] right-[2px] w-[8px] h-[8px] bg-[#FF3B30] rounded-full border border-white"></div>
                </div>
                {showNotifications && (
                  <div className="fixed top-[130px] left-1/2 -translate-x-1/2 z-[99999] w-[calc(100vw-32px)] max-w-[360px] bg-white rounded-[20px] border border-[#E5E5E5] p-4 shadow-[0px_4px_20px_rgba(0,0,0,0.1)]">
                    <h3 className="text-[16px] font-semibold text-[#3D3D3D] mb-2 px-1 text-left">Notifications</h3>
                    <div className="border-b border-[#E5E5E5] mb-3"></div>
                    <div className="flex flex-col gap-3 max-h-[300px] overflow-y-auto scrollbar-hide">
                      {mockNotifications.map((item) => (
                        <div key={item.id} onClick={() => { setShowNotifications(false); navigate("/user/settings/notifications"); }} className="flex items-start gap-3 p-2 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer">
                          <div className="w-[32px] h-[32px] rounded-full bg-[#4866F61A] text-[#4866F6] flex items-center justify-center flex-shrink-0">
                            {item.iconType === "tasks" && <img src={notificationTaskImg} alt="Task" className="w-[14px] h-[14px] object-contain" />}
                            {item.iconType === "reminders" && <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>}
                            {item.iconType === "meetings" && <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z" /></svg>}
                            {item.iconType === "security" && <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>}
                          </div>
                          <div className="flex-1 min-w-0 text-left">
                            <h4 className="text-[14px] font-bold text-[#3D3D3D] mb-1 truncate">{item.title}</h4>
                            <p className="text-[12px] text-[#586D93] leading-relaxed line-clamp-2">{item.description}</p>
                            <div className="flex items-center gap-1.5 mt-1 text-[12px] text-[#8898AA]">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#4866F6]"></span>
                              <span>{item.dropdownTime || item.time}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              {/* Settings */}
              <div className="w-[35px] h-[35px] min-[360px]:w-[38px] min-[360px]:h-[38px] min-[390px]:w-[40px] min-[390px]:h-[40px] bg-[#4866F626] rounded-full flex justify-center items-center">
                <svg width="26" height="26" viewBox="0 0 20 26" className="text-[#4866F6]"><path d="M10.625 5.36011H9.375V8.48511H10.625V5.36011ZM15.7452 7.4811L13.5541 9.67224L14.4379 10.556L16.629 8.36489L15.7452 7.4811ZM15.625 13.4851H18.75V14.7351H15.625V13.4851ZM14.4379 17.6642L13.5541 18.548L15.7452 20.7391L16.629 19.8553L14.4379 17.6642ZM9.375 19.7351H10.625V22.8601H9.375V19.7351ZM5.56212 17.6642L3.37097 19.8553L4.25477 20.7391L6.44591 18.548L5.56212 17.6642ZM1.25 13.4851H4.375V14.7351H1.25V13.4851ZM4.25479 7.48108L3.37099 8.36487L5.56214 10.556L6.44593 9.67222L4.25479 7.48108ZM11.3889 12.0314C10.9778 11.7567 10.4945 11.6101 10 11.6101C9.33719 11.6108 8.70174 11.8745 8.23306 12.3432C7.76438 12.8118 7.50075 13.4473 7.5 14.1101C7.5 14.6046 7.64662 15.0879 7.92133 15.499C8.19603 15.9101 8.58648 16.2306 9.04329 16.4198C9.50011 16.609 10.0028 16.6585 10.4877 16.5621C10.9727 16.4656 11.4181 16.2275 11.7678 15.8779C12.1174 15.5282 12.3555 15.0828 12.452 14.5978C12.5484 14.1129 12.4989 13.6102 12.3097 13.1534C12.1205 12.6966 11.8 12.3061 11.3889 12.0314ZM7.91661 10.9921C8.5333 10.58 9.25832 10.3601 10 10.3601C10.9946 10.3601 11.9484 10.7552 12.6517 11.4585C13.3549 12.1617 13.75 13.1155 13.75 14.1101C13.75 14.8518 13.5301 15.5768 13.118 16.1935C12.706 16.8102 12.1203 17.2908 11.4351 17.5746C10.7498 17.8585 9.99584 17.9327 9.26841 17.788C8.54098 17.6434 7.8728 17.2862 7.34835 16.7618C6.8239 16.2373 6.46675 15.5691 6.32206 14.8417C6.17736 14.1143 6.25163 13.3603 6.53545 12.675C6.81928 11.9898 7.29993 11.4041 7.91661 10.9921Z" fill="currentColor" /></svg>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* MOBILE SIDEBAR — uses shared TabletSidebar component */}
      {sidebarOpen && <div className="fixed inset-0 bg-black/30 z-40 md:hidden" onClick={() => setSidebarOpen(false)} />}
      <TabletSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} activeItem={activeItem} setActiveItem={setActiveItem} openMenu={openMenu} setOpenMenu={setOpenMenu} navigate={navigate} logos={logos} onLogout={() => navigate("/")} />

{/* normal mobile view */}
<div className="hidden md:flex w-full max-w-none h-[80px] md:h-[80px] lg:h-[100px]">{/* LEFT */}
<div className="flex items-center gap-0 md:gap-0 lg:gap-2 md:ml-[25px] lg:ml-[30px]">
  <div className="flex md:hidden w-[40px] h-[40px] rounded-full bg-[#F3F3F3] justify-center items-center mr-4 cursor-pointer">
<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#586D93" strokeWidth="2">
<path d="M3 6H21M3 12H21M3 18H21"/>
</svg></div>
{/* LOGO */}
<div className="flex justify-center items-center gap-2 md:gap-4 lg:gap-5 ml-0 md:ml-1 lg:ml-[-10px] xl:ml-1 transition-transform duration-300 hover:scale-105 cursor-pointer">
<img src={logo} alt="" onClick={() => navigate("/")} className="w-[46px] h-[40px] md:w-[50px] md:h-[42px] lg:w-[46px] lg:h-[40px] ml-5px]" />
            {/* Hide in tablet only */}
<div className="hidden lg:block text-[14px]">
  <h2 className="w-auto font-bold text-[24px] text-[#4866F6]">
    Personal
  </h2>
  <p className="font-medium text-[8px] tracking-[.73em] text-[#4866F6]">
    ASSISTANT
  </p>
</div></div>
{/* LEFT LINE + ICON */}
{/* TABLET VIEW */}
<div
  onClick={() => setOpenMenu(true)}
  className="hidden md:flex lg:hidden items-center ml-[-25px] cursor-pointer"
>  {/* vertical line */}
<div className="w-[60px] border-t border-[#CFCFCF] rotate-90 ml-[27px]"></div>
{/* sidebar button minimise */}
<div onClick={() => setSidebarOpen(true)} className="ml-[0px] xl:ml-[95px] w-[40px] h-[40px] rounded-[20px] flex justify-center items-center bg-[#4866F626] text-[#4866F6] hover:bg-[#4866F6] hover:text-white cursor-pointer">
    <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
<path d="M17.5 2.5H2.5C2.16848 2.5 1.85054 2.6317 1.61612 2.86612C1.3817 3.10054 1.25 3.41848 1.25 3.75V16.25C1.25 16.5815 1.3817 16.8995 1.61612 17.1339C1.85054 17.3683 2.16848 17.5 2.5 17.5H17.5C17.8315 17.5 18.1495 17.3683 18.3839 17.1339C18.6183 16.8995 18.75 16.5815 18.75 16.25V3.75C18.75 3.41848 18.6183 3.10054 18.3839 2.86612C18.1495 2.6317 17.8315 2.5 17.5 2.5ZM2.5 3.75H6.25V16.25H2.5V3.75ZM17.5 16.25H7.5V3.75H17.5V16.25Z"/>
</svg></div></div>
{/* WEB VIEW */}
<div className="hidden lg:flex items-center ml-[-6px]">
<div className="ml-[25px] xl:ml-[95px] w-[40px] h-[40px] rounded-[20px] flex justify-center items-center bg-[#4866F626] text-[#4866F6] hover:bg-[#4866F6] hover:text-white cursor-pointer">
<svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
<path d="M17.5 2.5H2.5C2.16848 2.5 1.85054 2.6317 1.61612 2.86612C1.3817 3.10054 1.25 3.41848 1.25 3.75V16.25C1.25 16.5815 1.3817 16.8995 1.61612 17.1339C1.85054 17.3683 2.16848 17.5 2.5 17.5H17.5C17.8315 17.5 18.1495 17.3683 18.3839 17.1339C18.6183 16.8995 18.75 16.5815 18.75 16.25V3.75C18.75 3.41848 18.6183 3.10054 18.3839 2.86612C18.1495 2.6317 17.8315 2.5 17.5 2.5ZM2.5 3.75H6.25V16.25H2.5V3.75ZM17.5 16.25H7.5V3.75H17.5V16.25Z"/>
</svg></div>
{/* vertical line */}
<div className="w-[70px] border-t border-[#CFCFCF] rotate-90 lg:ml-[-9px] xl:ml-[2px]"></div>
</div></div>
{/* RIGHT */}
<div className="relative flex items-center justify-between flex-1 min-w-0 ml-3 lg:pr-[30px] overflow-visible">
<div className="flex items-center gap-4 md:gap-2 lg:gap-7 shrink-0 ml-auto md:mr-[25px] lg:mr-[30px]">            {/* ICON GROUP */}
<div className="flex items-center gap-4 md:gap-5 lg:gap-7 shrink-0 ml-auto md:mr-[25px] lg:mr-[30px]"><div onClick={() => setShowLanguages(!showLanguages)} className={`${icon_bg} group hover:bg-[#4866F6] hover:text-white cursor-pointer hover:scale-105`}>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="transition-colors duration-300">
      <path d="M13.5 3.75V5.25H11.1C10.6058 7.37035 9.59593 9.33596 8.16 10.9725C9.24497 12.0793 10.5543 12.9412 12 13.5L11.4675 14.88C9.8444 14.228 8.37362 13.2475 7.1475 12C5.89872 13.2306 4.42769 14.213 2.8125 14.895L2.25 13.5C3.68742 12.8915 4.99958 12.0218 6.12 10.935C5.10624 9.69875 4.3421 8.27746 3.87 6.75H5.445C5.82704 7.8886 6.4086 8.95013 7.1625 9.885C8.31901 8.55344 9.13944 6.96402 9.555 5.25H1.5V3.75H6.75V1.5H8.25V3.75H13.5ZM22.5 21.75H20.8874L19.6874 18.75H14.55L13.35 21.75H11.7375L16.2374 10.5H18L22.5 21.75ZM17.115 12.33L15.15 17.25H19.0874L17.115 12.33Z"/>
    </svg></div>
  <div className={`${icon_bg} group hover:bg-[#4866F6] hover:text-white cursor-pointer hover:scale-105`}>
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="transition-colors duration-300">
      <path d="M2.53001 14.77C2.31701 16.164 3.26801 17.131 4.43201 17.613C8.89501 19.463 15.105 19.463 19.568 17.613C20.732 17.131 21.683 16.163 21.47 14.77C21.34 13.913 20.693 13.2 20.214 12.503C19.587 11.579 19.525 10.572 19.524 9.5C19.525 5.358 16.157 2 12 2C7.843 2 4.47501 5.358 4.47501 9.5C4.47501 10.572 4.41301 11.58 3.78501 12.503C3.30701 13.2 2.66101 13.913 2.53001 14.77Z" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M8 19C8.458 20.725 10.076 22 12 22C13.925 22 15.541 20.725 16 19" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  </div>
  <div className={`${icon_bg} group hover:bg-[#4866F6] hover:text-white cursor-pointer hover:scale-105`}>
    <svg width="24" height="30" viewBox="0 0 20 26" xmlns="http://www.w3.org/2000/svg" className="text-[#4866F6] transition-all duration-300 group-hover:text-white">
      <path fillRule="evenodd" clipRule="evenodd" d="M10.625 5.36011H9.375V8.48511H10.625V5.36011ZM15.7452 7.4811L13.5541 9.67224L14.4379 10.556L16.629 8.36489L15.7452 7.4811ZM15.625 13.4851H18.75V14.7351H15.625V13.4851ZM14.4379 17.6642L13.5541 18.548L15.7452 20.7391L16.629 19.8553L14.4379 17.6642ZM9.375 19.7351H10.625V22.8601H9.375V19.7351ZM5.56212 17.6642L3.37097 19.8553L4.25477 20.7391L6.44591 18.548L5.56212 17.6642ZM1.25 13.4851H4.375V14.7351H1.25V13.4851ZM4.25479 7.48108L3.37099 8.36487L5.56214 10.556L6.44593 9.67222L4.25479 7.48108ZM11.3889 12.0314C10.9778 11.7567 10.4945 11.6101 10 11.6101C9.33719 11.6108 8.70174 11.8745 8.23306 12.3432C7.76438 12.8118 7.50075 13.4473 7.5 14.1101C7.5 14.6046 7.64662 15.0879 7.92133 15.499C8.19603 15.9101 8.58648 16.2306 9.04329 16.4198C9.50011 16.609 10.0028 16.6585 10.4877 16.5621C10.9727 16.4656 11.4181 16.2275 11.7678 15.8779C12.1174 15.5282 12.3555 15.0828 12.452 14.5978C12.5484 14.1129 12.4989 13.6102 12.3097 13.1534C12.1205 12.6966 11.8 12.3061 11.3889 12.0314ZM7.91661 10.9921C8.5333 10.58 9.25832 10.3601 10 10.3601C10.9946 10.3601 11.9484 10.7552 12.6517 11.4585C13.3549 12.1617 13.75 13.1155 13.75 14.1101C13.75 14.8518 13.5301 15.5768 13.118 16.1935C12.706 16.8102 12.1203 17.2908 11.4351 17.5746C10.7498 17.8585 9.99584 17.9327 9.26841 17.788C8.54098 17.6434 7.8728 17.2862 7.34835 16.7618C6.8239 16.2373 6.46675 15.5691 6.32206 14.8417C6.17736 14.1143 6.25163 13.3603 6.53545 12.675C6.81928 11.9898 7.29993 11.4041 7.91661 10.9921Z" fill="currentColor"/>
    </svg></div></div>
{showLanguages && (
  <div
    ref={languageRef}
    className="absolute top-[100px] right-[40px] z-[99999] w-[350px]"
  >

    <div className="bg-white rounded-[25px] border border-[#E5E5E5] px-[8px] py-[6px]">

<div className="flex items-center gap-[2px] overflow-x-auto scrollbar-hide">
        {languages.map((item, index) => (
          <button
  key={index}
  onClick={(e) => {
  e.stopPropagation();

  setSelectedLanguage(item);

  setTimeout(() => {
    setShowLanguages(false);
  }, 300); // half second
}}
  className={`flex-shrink-0 min-w-[125px] h-[32px] rounded-[18px] text-[14px] transition-all duration-300 ${
    selectedLanguage === item
      ? "bg-[#4866F6] text-white"
      : "text-[#4866F6]"
  }`}
>
  {item}
</button>
        ))}

      </div>

    </div>

  </div>
)}

<img src={profile?.avatar_url
      ? `http://54.188.108.28${profile.avatar_url}`
      : defaultProfile} alt="" className="w-[55px] h-[55px] md:w-[42px] md:h-[42px] lg:w-[60px] lg:h-[60px] rounded-full" />
<div className="hidden lg:flex flex-col">
  <h4 className="font-semibold text-[16px] text-[#4866F6]">{profile?.name || "User"}</h4>
  <p className="text-[14px] text-[#586D93]">{profile?.status || "User"}</p>
</div>
</div></div></div>
<div className="hidden md:flex justify-start items-center pl-4 lg:pl-5">
  {/* horizontal line */}
<div className="w-[90px] lg:w-[240px] xl:w-[330px] border-t border-[#CFCFCF]"></div></div></div> ); }

