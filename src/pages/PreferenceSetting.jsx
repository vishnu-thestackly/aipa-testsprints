
import Navbar from '../components/userprofile/Navbar'
import Sidebar from '../components/userprofile/Sidebar'
import PreferenceSetting from "../components/userprofile/settings/PreferenceSetting";

export default function UserProfile() {
  return (
    <div className="h-screen flex flex-col">
      {/* Navbar */}
      <Navbar />
      {/* Main Layout */}
      {/* <div className="flex flex-1 overflow-hidden"> */}
      <div className='flex flex-1 overflow-hidden mt-[6px]'>

        {/* Sidebar */}
        <Sidebar />

        {/* Content Wrapper */}
        <div className="flex-1 overflow-hidden">
          {/* <ProfileDashboard /> */}
          <PreferenceSetting />
        </div>
      </div>
    </div>
  );
}
