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

export default function Dashboard() {
  const [activeItem, setActiveItem] = useState("dashboard");
  const [userId, setUserId] = useState(null);
  console.log("Dashboard userId:", userId);
  console.log("userId: after");
  console.log("userId:", userId);
  const [currentPage, setCurrentPage] = useState(1);
  console.log(activeItem);

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
  navigate("/admin",{ replace: true });
};

  return (
    <div className='h-screen flex  flex-col'>

      {/* Navbar */}
      <Navbar />

      {/* Main Layout */}
      <div className='flex flex-1 min-h-0 overflow-hidden'>

        {/* Sidebar */}
        <Sidebar 
        activeItem={activeItem}
          setActiveItem={setActiveItem}
          onLogout={handleLogout}
          />

        {/* Content Wrapper */}
        <div className='flex-1 overflow-hidden bg-gray-100 '>
          {activeItem === "dashboard" && <DashboardContent />}

          {/* {activeItem === "manage" && (
            <ManageHome />
          )} */}

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

          {activeItem === "configuration" && (
            <Configurations />
          )}
        </div>

      </div>
      <SessionTimeout
  open={showSessionTimeout}
  onClose={handleLogout}
  onLogin={handleLogout}
/>

    </div>
  )
}