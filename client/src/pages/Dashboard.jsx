import { NavigationSidebar } from "@/components/navigation";
import { Outlet } from "react-router-dom";
import DashboardSidebar from "@/components/navigation/DashboardSideBar";

import { UserContext } from "@/context/UserContext";
import { useContext } from "react";

export default function Dashboard() {
  const { isDashboardSidebarOpen, setIsDashboardSidebarOpen } = useContext(UserContext);
  return (
    <div
    // className="flex h-screen" style={{
    //   paddingTop: 'env(safe-area-inset-top)',
    //   paddingBottom: 'env(safe-area-inset-bottom)',
    //   touchAction: 'manipulation',
    //   position: "relative"
    // }}
    >
      {/* Navigation Sidebar */}
      <div
        className={`fixed left-0 top-0 h-full z-[9999] w-[72px] border-r-[1px] border-[#213043] transition-transform duration-300 ${isDashboardSidebarOpen ? "-translate-x-full " : "translate-x-0 bg-black"
          }`}
      >
        <NavigationSidebar />
      </div>

      {/* Server Sidebar */}
      <div
        className={`fixed z-[9999] left-[72px]  top-0 h-full w-72 transition-transform duration-300 ${isDashboardSidebarOpen ? "-translate-x-[360px] " : "translate-x-0 bg-black"
          }`}>

        <DashboardSidebar />
      </div>

      {/* Main Chat Area */}
      <main className={`flex-1 flex flex-col h-full transition-all duration-300 ${isDashboardSidebarOpen
        ? "sm:ml-0"
        : "sm:ml-[360px] " // Normal chat view
        }`}
        style={{
          paddingTop: 'env(safe-area-inset-top)',
          paddingBottom: 'env(safe-area-inset-bottom)',
          position: "relative",
          // Prevent mobile viewport scaling
          touchAction: 'manipulation',
          // Use dvh units for mobile browsers
          height: '100dvh'
        }}>
        {/* Outlet for rendering child routes */}
        <div className="flex-1">
          <div
            className="flex-1 h-full"
          >
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
}