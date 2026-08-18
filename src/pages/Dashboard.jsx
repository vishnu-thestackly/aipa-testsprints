import { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/admin/Navbar";
import Sidebar from "../components/admin/sidebar/Sidebar";
import DashboardContent from "../components/admin/DashboardContent";
import Configurations from "../components/admin/Configurations";
import ManageHome from "../components/admin/UserManagment/ManageHome";
import UserDetailPage from "../components/admin/UserManagment/UserDetailPage";
import SessionTimeout from "../components/admin/SessionTimeout";
import TransactionMonitoring from "../components/admin/ManageSubscription/TransactionMonitoring";
import RefundDispute from "../components/admin/ManageSubscription/RefundDispute";
import PaymentReport from "../components/admin/ManageSubscription/PaymentReport";
import SubscriptionTracking from "../components/admin/ManageSubscription/SubscriptionTracking";
import SubscriptionPlan from "../components/admin/adminprofile/SubscriptionPlan";
import AddSubscription from "../components/admin/adminprofile/AddSubscription";
import EditSubscription from "../components/admin/adminprofile/EditSubscription";
import AiMonitoring from "../components/admin/AiMonitoring";
import AdminProfile from "../components/admin/adminprofile/AdminProfile";
import BehaviorLearning from "../components/admin/ai/BehaviorLearning/BehaviorLearning";
import SemanticMemory from "../components/admin/ai/SemanticMemory/SemanticMemory";

// session timeout
import useIdleTimeout from "../hooks/useIdleTimeout";

export default function Dashboard() {
  const [activeItem, setActiveItem] = useState(() => {
    return sessionStorage.getItem("adminActiveItem") || "dashboard";
  });

  useEffect(() => {
    sessionStorage.setItem("adminActiveItem", activeItem);
  }, [activeItem]);
  const [userId, setUserId] = useState(null);
  console.log("Dashboard userId:", userId);
  console.log("userId: after");
  console.log("userId:", userId);
  const [currentPage, setCurrentPage] = useState(1);
  console.log(activeItem);
  const [refundCurrentPage, setRefundCurrentPage] = useState(1);
  const [paymentCurrentPage, setPaymentCurrentPage] = useState(1);
  const [trackingCurrentPage, setTrackingCurrentPage] = useState(1);

  // Added session TimeOut

  const navigate = useNavigate();
  const [showSessionTimeout, setShowSessionTimeout] = useState(false);

  const handleSessionTimeout = useCallback(() => {
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
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [openMenus, setOpenMenus] = useState({});

  return (
    <div className="h-screen flex  flex-col">
      {/* Navbar */}
      <Navbar
        activeItem={activeItem}
        setActiveItem={setActiveItem}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        openMenus={openMenus}
        setOpenMenus={setOpenMenus}
      />

      {/* Main Layout */}
      <div className="flex flex-1 min-h-0 overflow-hidden">
        {/* Sidebar */}
        <Sidebar
          activeItem={activeItem}
          setActiveItem={setActiveItem}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          openMenus={openMenus}
          setOpenMenus={setOpenMenus}
          onLogout={handleLogout}
        />

        {/* Content Wrapper */}
        <div className="flex-1 overflow-hidden bg-gray-100 ">
          {activeItem === "dashboard" && <DashboardContent />}

          {/* {activeItem === "manage" && (
            <ManageHome />
          )} */}

          {/*Manage Users & Roles */}
          {activeItem === "manage" &&
            (userId ? (
              <UserDetailPage userId={userId} onBack={() => setUserId(null)} />
            ) : (
              <ManageHome
                onViewUser={setUserId}
                currentPage={currentPage}
                onPageChange={setCurrentPage}
              />
            ))}

          {/*Configuration */}
          {activeItem === "configuration" && <Configurations />}

          {/* Usage Dashboard - AI Monitoring */}
          {activeItem === "aimonitoring" && <AiMonitoring />}

          {/* AI - Semantic Memory */}
          {activeItem === "semanticmemory" && <SemanticMemory />}

          {/* AI - Behavior Learning */}
          {activeItem === "behaviorlearning" && <BehaviorLearning />}

          {/*Manage Subscription - Transaction Monitoring */}
          {activeItem === "transaction" && <TransactionMonitoring />}

          {/*Manage Subscription - Refund & Dispute */}
          {activeItem === "refund" && (
            <RefundDispute
              currentPage={refundCurrentPage}
              onPageChange={setRefundCurrentPage}
            />
          )}

          {/*Manage Subscription - Payment Report */}
          {activeItem === "payment" && (
            <PaymentReport
              currentPage={paymentCurrentPage}
              onPageChange={setPaymentCurrentPage}
            />
          )}

          {/*Manage Subscription - Subscription Tracking */}
          {activeItem === "tracking" && (
            <SubscriptionTracking
              currentPage={trackingCurrentPage}
              onPageChange={setTrackingCurrentPage}
            />
          )}

          {activeItem === "subscriptionplan" && (
            <SubscriptionPlan setActiveItem={setActiveItem} />
          )}

          {activeItem === "addSubscription" && (
            <AddSubscription setActiveItem={setActiveItem} />
          )}

          {activeItem === "editSubscription" && (
            <EditSubscription setActiveItem={setActiveItem} />
          )}
          {activeItem === "profile" && <AdminProfile />}
        </div>
      </div>
      <SessionTimeout
        open={showSessionTimeout}
        onClose={handleLogout}
        onLogin={handleLogout}
      />
    </div>
  );
}
