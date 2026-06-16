// =============================================================================
// FILE: ManageUsers.jsx
// Manage users shell — scroll container and home vs detail switch
// =============================================================================

import { useState } from "react";
import ManageHome from "./ManageHome";
import UserDetailPage from "./UserDetailPage";

// -----------------------------------------------------------------------------
// ManageUsers — scroll wrapper; renders ManageHome or UserDetailPage
// -----------------------------------------------------------------------------
export default function ManageUsers() {
  const [userId, setUserId] = useState(null);

  return (
    <div className="h-[100%] overflow-y-auto px-3 sm:px-5 lg:px-7 pt-4 lg:pt-7 pb-5 scrollbar-hide ">
      {userId != null ? (
        <UserDetailPage userId={userId} onBack={() => setUserId(null)} />
      ) : (
        <ManageHome onViewUser={setUserId} />
      )}
    </div>
  );
}
