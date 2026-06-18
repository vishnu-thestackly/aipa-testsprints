import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from '../components/admin/Navbar'
import Sidebar from '../components/admin/Sidebar'
import DashboardContent from '../components/admin/DashboardContent'
import Configurations from '../components/admin/Configurations'
import ManageHome from '../components/admin/UserManagment/ManageHome'
import UserDetailPage from '../components/admin/UserManagment/UserDetailPage'
import SessionTimeout from "../components/admin/SessionTimeout";
// session timeout
import useIdleTimeout from "../hooks/useIdleTimeout";
<<<<<<< HEAD

import TranscationMonitoring from '../components/admin/TranscationMonitoring';

// sub plan
import AddSubscription from "../components/admin/AddSubscription";
import EditSubscription from "../components/admin/EditSubscription";
import SubscriptionPlan from '../components/admin/SubscriptionPlan';

import SubscriptionTracking from "../components/admin/SubscriptionTracking";
import PaymentReport from "../components/admin/PaymentReport";
import RefundDispute from "../components/admin/RefundDispute";

//Admin Profile
import AdminProfile from "../components/admin/AdminProfile"


=======
import TransactionMonitoring from "../components/admin/TransactionMonitoring";
>>>>>>> d59cd9811fcdae9d277e123b337195690bf067c6

export default function Dashboard() {
  const [activeItem, setActiveItem] = useState("dashboard");
  const [userId, setUserId] = useState(null);
<<<<<<< HEAD
  console.log("Dashboard userId:", userId);
  console.log("userId: after");
  console.log("userId:", userId);
=======
>>>>>>> d59cd9811fcdae9d277e123b337195690bf067c6
  const [currentPage, setCurrentPage] = useState(1);
  console.log(activeItem);

  // Added session TimeOut

  const navigate = useNavigate();
  const [showSessionTimeout, setShowSessionTimeout] = useState(false);

  const handleSessionTimeout = useCallback(() => {
<<<<<<< HEAD
    setShowSessionTimeout(true);
  }, []);

  useIdleTimeout({
    timeoutMs: 15 * 60 * 1000,
    onTimeout: handleSessionTimeout,
    enabled: !showSessionTimeout,
  });

  const handleLogout = () => {
    localStorage.removeItem("token");
    sessionStorage.clear();
    navigate("/admin", { replace: true });
  };
=======
  setShowSessionTimeout(true);
  }, []);

  useIdleTimeout({
  timeoutMs: 15 * 60 * 1000,
  onTimeout: handleSessionTimeout,
  enabled: !showSessionTimeout,
  });

  const handleLogout = () => {
  localStorage.removeItem("token");
  sessionStorage.clear();
  navigate("/admin",{ replace: true });
};
>>>>>>> d59cd9811fcdae9d277e123b337195690bf067c6

  return (
    <div className='h-screen flex  flex-col'>

      {/* Navbar */}
      <Navbar />

      {/* Main Layout */}
      <div className='flex flex-1 min-h-0 overflow-hidden'>

        {/* Sidebar */}
<<<<<<< HEAD
        <Sidebar
          activeItem={activeItem}
          setActiveItem={setActiveItem}
          onLogout={handleLogout}
        />
=======
        <Sidebar 
        activeItem={activeItem}
          setActiveItem={setActiveItem}
          />
>>>>>>> d59cd9811fcdae9d277e123b337195690bf067c6

        {/* Content Wrapper */}
        <div className='flex-1 overflow-hidden bg-gray-100 '>
          {activeItem === "dashboard" && <DashboardContent />}

<<<<<<< HEAD
          {activeItem === "manage" &&
            (userId ? (
              <UserDetailPage
                userId={userId}
                onBack={() => setUserId(null)}
              />
=======
          {/* {activeItem === "manage" && (
            <ManageHome />
          )} */}

          {activeItem === "manage" &&
            (userId ? (
              <UserDetailPage userId={userId} onBack={() => setUserId(null)} />
>>>>>>> d59cd9811fcdae9d277e123b337195690bf067c6
            ) : (
              <ManageHome
                onViewUser={setUserId}
                currentPage={currentPage}
                onPageChange={setCurrentPage}
              />
            ))}
<<<<<<< HEAD

          {activeItem === "configuration" && (
            <Configurations />
          )}

          {/* Subscription Plans */}
          {activeItem === "transactions" && (
            <TranscationMonitoring/>
          )}

          {activeItem === "plan" && (
  <SubscriptionPlan setActiveItem={setActiveItem} />
)}

{activeItem === "addSubscription" && (
  <AddSubscription setActiveItem={setActiveItem} />
)}

{activeItem === "editSubscription" && (
  <EditSubscription setActiveItem={setActiveItem} />
)} 

          {activeItem === "refund" && (
            <RefundDispute />
          )}

          {activeItem === "payment" && (
            <PaymentReport />
          )}

          {activeItem === "tracking" && (
            <SubscriptionTracking />
          )}

          {/* Admin Profile */}
          {activeItem === "adminProfile" && (
            <AdminProfile />
          )}
=======
            

       {activeItem === "transactionmonitoring" && (
  <TransactionMonitoring />
)}
          {activeItem === "configuration" && (
            <Configurations />
          )}
>>>>>>> d59cd9811fcdae9d277e123b337195690bf067c6
        </div>

      </div>
      <SessionTimeout
<<<<<<< HEAD
        open={showSessionTimeout}
        onClose={handleLogout}
        onLogin={handleLogout}
      />
=======
  open={showSessionTimeout}
  onClose={handleLogout}
  onLogin={handleLogout}
/>
>>>>>>> d59cd9811fcdae9d277e123b337195690bf067c6

    </div>
  )
}