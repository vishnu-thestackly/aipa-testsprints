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
import Frame from "./assets/images/Frame.png";
import UserProfile from "./pages/UserProfile";
import NewChatPage from "./pages/NewChatPage";
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

import InvoicePopup from "./components/userprofile/InvoicePopup";
import PaymentProcessing from "./components/userprofile/PaymentProcessing";
import PaymentSuccess from "./components/userprofile/PaymentSuccess";
import PaymentMethod from "./components/userprofile/PaymentMethod";
import EditProfile from "./components/userprofile/EditProfile";
import PaymentUnsuccessful from "./components/userprofile/PaymentUnsuccessful";

function App() {
  const [showChat, setShowChat] = useState(false);
  return (
    <BrowserRouter>
      <Routes>
        {/* HOME */}
        <Route path="/" element={<HomePage />} />

        {/* CONVERSATION */}
        <Route path="/conversation" element={<Conversation />} />

        {/* FAQ */}
        <Route path="/faq" element={<FaqPage />} />

        {/* HELP */}
        <Route path="/help" element={<HelpPage />} />

        {/* LOGIN */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/otp-verification" element={<AdminLoginOTP />} />
        <Route path="/signup-otp" element={<VerifyUserOTP />} />
        <Route path="/send-email" element={<ForgotPassword />} />
        <Route path="/send-email-otp" element={<ForgotPasswordOTP />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/force-reset-password" element={<ForceResetPassword />} />
        <Route
          path="/password-expiry-login"
          element={<PasswordExpiryLogin />}
        />
        <Route path="/password-expired" element={<PasswordExpired />} />

        {/* sprint3 */}

        <Route path="/user-profile" element={<UserProfile />} />
        <Route path="/new-chat/*" element={<NewChatPage />} />

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
        <Route path="/dashboard" element={<Dashboard />} />

        <Route
          path="/editprofile"
          element={<EditProfile onOpenChat={() => setShowChat(true)} />}
        />
        <Route path="/" element={<PersonalAssistant />} />
        <Route path="/paymentmethod" element={<PaymentMethod />} />

        <Route path="/invoice" element={<InvoicePopup />} />
        <Route path="/paymentprocess" element={<PaymentProcessing />} />

        <Route path="/user-profile/success" element={<PaymentSuccess />} />
        <Route path="/user-profile/cancel" element={<PaymentUnsuccessful />} />
      </Routes>

      {showChat && <PersonalAssistant onClose={() => setShowChat(false)} />}
    </BrowserRouter>
  );
}

export default App;
