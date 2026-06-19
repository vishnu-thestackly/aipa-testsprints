import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import HomePage from "./pages/HomePage";
import Conversation from "./pages/AIConversation";
import AskPage from "./pages/AskPage";
import FaqPage from "./pages/FaqPage";
import HelpPage from "./pages/HelpPage";
import LoginPage from "./pages/LoginPage";
import Signup from "./pages/Signup";
import PersonalDetails from "./pages/PersonalDetails";
import AiPreferences from "./pages/AiPreferences";
import ConnectIntegrations from "./pages/ConnectIntegrations";
import NotificationSetup from "./pages/NotificationSetup";
import Completion from "./pages/Completion";
import PreferenceSetting from "./pages/PreferenceSetting";
import Frame from "./assets/images/Frame.png"
import UserProfile from "./pages/UserProfile";
import AdminLogin from "./pages/AdminLogin";
import AdminLoginOTP from "./pages/AdminLoginOTP";
import ResetPassword from "./pages/ResetPassword";
import ForgotPassword from "./pages/ForgotPassword";
import ForgotPasswordOTP from "./pages/ForgotPasswordOTP";
import PasswordExpiryLogin from "./pages/PasswordExpiryLogin";
import PasswordExpired from "./pages/PasswordExpired";
import ForceResetPassword from "./pages/ForceResetPassword";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import VerifyUserOTP from "./pages/VerifyUserOTP";
import PersonalAssistant from "./components/editprofile/PersonalAssistant";
import EditProfile from "./components/userprofile/EditProfile"
import DownArrow from "./assets/images/DownArrow.png"

function App() {
  const [showChat, setShowChat] = useState(false);
  return (
    <BrowserRouter>
      <Routes>

        {/* HOME */}
        <Route path="/" element={<HomePage />} />

        {/* CONVERSATION */}
        <Route
          path="/conversation"
          element={<Conversation />}
        />

        
        {/* FAQ */}
        <Route
          path="/faq"
          element={<FaqPage />}
        />

        {/* HELP */}
        <Route
          path="/help"
          element={<HelpPage />}
        />

        <Route
          path="/editProfile"
          element={<EditProfile onOpenChat={() => setShowChat(true)} />}
        />
        <Route
          path="/chat"
          element={<PersonalAssistant />}
        
        />
       

        {/* LOGIN */}
        <Route
          path="/login"
          element={<LoginPage />}
        />
        <Route path="/signup" element={<Signup />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/otp-verification" element={<AdminLoginOTP />} />
        <Route path="/signup-otp" element={<VerifyUserOTP />} />
        <Route path="/send-email" element={<ForgotPassword />} />
        <Route path="/send-email-otp" element={<ForgotPasswordOTP />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/force-reset-password" element={<ForceResetPassword />} />
        <Route path="/password-expiry-login" element={<PasswordExpiryLogin />} />
        <Route path="/password-expired" element={<PasswordExpired />} />

        {/* sprint3 */}
    
<Route path="/user-profile" element={<UserProfile />} />

<Route path="/preferences" element={<PreferenceSetting />} />

{/* Onboarding */}
<Route path="/personal-details" element={<PersonalDetails />} />
<Route path="/aipreferences" element={<AiPreferences />} />
<Route path="/connect-integrations" element={<ConnectIntegrations />} />
<Route path="/notification-setup" element={<NotificationSetup />} />
<Route path="/completion" element={<Completion />} />

        {/* <Route path="/dashboard" element={<ProtectedRoute>
                                              <Dashboard />
                                          </ProtectedRoute>} /> */}
                                          <Route path="/dashboard" element={
                                              <Dashboard />
                                          } />
          
  


  </Routes>
                   
    {/* Chat Popup */}
      {showChat && (
        <div className="fixed inset-0 z-50 flex items-center justify-center sm:items-end sm:justify-end p-4 sm:p-0">
          <div
            className="fixed inset-0 bg-black/40 sm:bg-transparent"
            onClick={() => setShowChat(false)}
          />
          
          <div className="relative  border-1 border-[#4866F6]">
            
            
            <button
              onClick={() => setShowChat(false)}
              className="absolute  lg:mt-[-610px] mt-[-65px] ml-[100px] lg:mr-[40px] md:mr-[35px] md:mt-[-600px] mt-[-500px] sm:-top-5 sm:-right-5 lg:w-[50px] lg:h-[50px] md:-top-6 lg:mt-[-40px] lg:mr-[20px] md:mt-[-40px] md:mr-[20px] mt-[-40px] mr-[20px] md:-right-6 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14  bg-[#4866F6] rounded-full z-30 flex items-center justify-center hover:bg-[#3D5AE8] shadow-xl border-2 border-white"
            >
             <img src={DownArrow} alt="Close" className="h-5 w-5  sm:h-6 sm:w-6 md:h-7 md:w-7" />
            </button>

            <PersonalAssistant onClose={() => setShowChat(false)} />
          </div>
        </div>
      )}
 
                                      


    </BrowserRouter>                
  
  );
}

export default App;