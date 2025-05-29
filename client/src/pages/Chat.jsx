import { NavigationSidebar } from "@/components/navigation"
import ServerSideBar from "@/components/server/ServerSideBar"
import { Outlet, useLocation } from "react-router-dom"
import Chat1 from "./chat/chat1"
import { useContext, useEffect, useRef, useState } from "react"
import { UserContext } from "@/context/UserContext"
import PlanLikePro from "./PlanLikePro"
import PaymentReminder from "./PaymentReminder"
import TopDentistOpportunity from "./top-dentist"
import JobOpportunities from "./job-opportunities"
import GrowthSupport from "./growth-support"
import Sunnah from "./Sunnah"
// import styled from "styled-components"

// const Overlay = styled.div`
//   position: fixed;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 100vh;
//   background-color: rgba(0, 0, 0, 0.2);
//   z-index: 9998;
//   opacity: ${(props) => (props.$isOpen ? 1 : 0)};
//   visibility: ${(props) => (props.$isOpen ? "visible" : "hidden")};
//   transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
//   backdrop-filter: blur(3px);
//   -webkit-backdrop-filter: blur(3px);
// `;
export default function Chat() {
  const location = useLocation();
  const [showLoadingVideo, setShowLoadingVideo] = useState(true);
  const { isSidebarOpen } = useContext(UserContext);
  const hasShownVideo = useRef(false);

  useEffect(() => {
    if (location.state?.fromLogin && !hasShownVideo.current) {
      setShowLoadingVideo(true);
      hasShownVideo.current = true;

      // Clear the navigation state after using it
      window.history.replaceState({}, document.title);

      const timer = setTimeout(() => {
        setShowLoadingVideo(false);
      }, 4000);

      return () => {
        clearTimeout(timer);
        // Reset the ref when component unmounts
        hasShownVideo.current = false;
      };
    }
  }, [location.state]);

  if (showLoadingVideo) {
    return (
      <div className="fixed inset-0 bg-black z-[9999] flex items-center justify-center">
        <video
          autoPlay
          muted
          playsInline
          className="w-full h-full object-cover"
          onEnded={() => {
            setShowLoadingVideo(false);
            // Soft refresh by resetting internal state instead of full reload
            window.history.replaceState({}, document.title);
          }}
        >
          <source src="/vv.mp4" type="video/mp4" />
        </video>
      </div>
    );
  }
  const isPlanLikeProRoute = location.pathname.includes("/chat2")
  const isPaymentReminder = location.pathname.includes("/chat3")
  const isGrowthSupport = location.pathname.includes("/growth-support"); // New condition
  const isTopDentist = location.pathname.includes("/top-dentist-opportunity"); // New condition
  const isJobOpportunities = location.pathname.includes("/job-opportunities"); // New condition
  const isSunnah = location.pathname.includes("/sunnah");
  return (
    <div className="flex h-screen">
      {/* Navigation Sidebar with animation */}
      <div
        className={`fixed left-0 top-0 h-full z-[10] w-[72px]  transition-transform duration-300 ${isSidebarOpen ? "-translate-x-full " : "translate-x-0 bg-black"
          }`}
      >
        <NavigationSidebar />
      </div>

      {/* Server Sidebar with animation */}
      {!isGrowthSupport && !isPlanLikeProRoute && !isPaymentReminder && !isTopDentist && !isJobOpportunities && !isSunnah && (
        <div
          className={`fixed z-[10] left-[72px]  top-0 h-full w-72 transition-transform duration-300 ${isSidebarOpen ? "-translate-x-[360px] " : "translate-x-0 bg-black"
            }`}
        >
          <ServerSideBar
          />
        </div>
      )}
      {/* <Overlay $isOpen={isSidebarOpen} onClick={() => { toggleSidebar, console.log("hiiiiii") }} /> */}

      {/* Main Content Area */}
      <div
        className={`flex-1 flex flex-col h-full transition-all duration-300 ${isPlanLikeProRoute || isPaymentReminder || isGrowthSupport || isTopDentist || isJobOpportunities || isSunnah
          ? "ml-[72px]" // PlanLikePro & PaymentReminder should respect the sidebar width
          : isSidebarOpen
            ? "sm:ml-0"
            : "sm:ml-[360px] " // Normal chat view
          }`}
        style={{
          // Prevent mobile viewport scaling
          touchAction: 'manipulation',
          // Use dvh units for mobile browsers
          height: '100dvh'
        }}
      >
        {isPlanLikeProRoute ? (
          <PlanLikePro />
        ) : isPaymentReminder ? (
          <PaymentReminder />
        ) : isGrowthSupport ? (
          <GrowthSupport />
        ) : isTopDentist ? (
          <TopDentistOpportunity />
        ) : isJobOpportunities ? (
          <JobOpportunities />
        ) : isSunnah ? (
          <Sunnah />
        ) :
          (
            <>
              <div className="flex-1 overflow-x-hidden zoom-in-0 overflow-y-hidden">
                <Outlet />
                <div className="flex-1 h-full">
                  <Chat1 />
                </div>
              </div>
            </>
          )}
      </div>
    </div>
  )
}

