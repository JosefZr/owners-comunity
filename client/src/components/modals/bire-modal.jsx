import { MODAL_TYPE, useModal } from "@/hooks/useModalStore"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Drawer, DrawerContent } from "@/components/ui/drawer"
import { IoMdClose } from "react-icons/io"
import Welcome from "./components/Welcome"
import Carousels from "./components/Carousels"
import DAilyCheckList from "./components/DAilyCheckList"
import { useState, useEffect } from "react"
import Home from "./components/Home"
import SmallDailyCheckList from "./components/SmallDailyCheckList"
import { useLocation, useNavigate } from "react-router-dom"
import Schedular from "./components/Schedular"
import { IoSettingsOutline } from "react-icons/io5"
import BesideWelcome from "./components/BesideWelcome"

const menuItems = [
  {
    label: "home",
    value: "home",
    component: (props) => <Home {...props} />,
  },
  {
    label: "checklist",
    value: "checklist",
    component: (props) => <SmallDailyCheckList {...props} />,
  },
  {
    label: "schedule",
    value: "schedule",
    component: (props) => <Schedular {...props} />,
  },
]

export default function BireModal() {
  const { isOpen, onClose, type, onOpen } = useModal()
  const [activeTab, setActiveTab] = useState("home")
  const [isMobile, setIsMobile] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const isModalOpen = isOpen && type === MODAL_TYPE.BIR

  // Detect mobile screen size
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkIsMobile()
    window.addEventListener("resize", checkIsMobile)

    return () => window.removeEventListener("resize", checkIsMobile)
  }, [])
  // useEffect(() => {
  //   const checkFirstVisit = () => {
  //     const isChannelsRoute = location.pathname.includes("/channels");
  //     console.log("isChannelsRoute", isChannelsRoute);
  //     const hasSeen = localStorage.getItem("hasSeenWelcomeModal");
  //     console.log("hasSeenWelcomeModal", hasSeen);

  //     if (!hasSeen === false && isChannelsRoute) {
  //       console.log("Opening BIR modal for the first time");
  //       // Open the BIR modal if it's the first visit 
  //       // and the user is on the channels route

  //       onOpen(MODAL_TYPE.BIR);

  //       localStorage.setItem("hasSeenWelcomeModal", "true");
  //     }
  //   };

  //   // Add a small delay to ensure DOM readiness
  //   const timer = setTimeout(checkFirstVisit, 300);
  //   return () => clearTimeout(timer);
  // }, [location.pathname, onOpen]);
  const handleClose = () => {
    onClose()
  }

  const handleSettings = () => {
    navigate("/dashboard")
    onClose()
  }

  // Desktop Content Component
  const DesktopContent = () => (
    <div className="z-[100] grid w-full h-full gap-4 md:[&>_*]:[zoom:95%] xl:[&>_*]:[zoom:90%]">
      {/* Close and Settings Buttons */}
      <div className="absolute top-2 right-2 z-10 flex items-center gap-2">
        <button
          className="h-12 w-12 rounded-full bg-[#0E1C26] flex items-center justify-center"
          onClick={handleSettings}
        >
          <IoSettingsOutline className="h-6 w-6 text-my-white" />
        </button>
        <button className="h-12 w-12 rounded-full bg-[#0E1C26] flex items-center justify-center" onClick={handleClose}>
          <IoMdClose className="h-6 w-6 text-my-white" />
        </button>
      </div>

      {/* Main Content Grid */}
      <div className="flex-1 grid grid-cols-6 gap-4 overflow-hidden">
        {/* Left Column */}
        <div className="col-span-3 flex flex-col gap-4 overflow-hidden">
          {/* Welcome Section */}
          <div className="grid grid-cols-2 gap-4 h-[200px]">
            <Welcome />
            <BesideWelcome />
          </div>

          {/* Daily Checklist */}
          <div className="flex-1 overflow-hidden col-span-3 row-span-1 mt-4 h-full">
            <DAilyCheckList />
          </div>
        </div>

        {/* Right Column */}
        <div className="col-span-3 flex flex-col gap-4 overflow-hidden">
          {/* Carousels */}
          <div>
            <Carousels handleClose={handleClose} />
          </div>

          {/* Scheduler */}
          <div className=" flex-1 BrownBack rounded-xl bg-my-Modal-back p-4 overflow-hidden">
            <Schedular />
          </div>
        </div>
      </div>
    </div>
  )

  // Mobile Content Component
  const MobileContent = () => (
    <div className="z-[10] BrownBack h-full min-h-full flex flex-col">
      {/* Mobile Header */}
      <div className="flex w-full items-center justify-end p-3 gap-2">
        <button
          className="h-12 w-12 rounded-full bg-slate-950 flex items-center justify-center"
          onClick={handleSettings}
        >
          <IoSettingsOutline className="text-2xl text-my-white" />
        </button>
        <button className="h-12 w-12 rounded-full bg-slate-950 flex items-center justify-center" onClick={handleClose}>
          <IoMdClose className="text-2xl text-my-white" />
        </button>
      </div>

      {/* Mobile Navigation */}
      <div className="flex h-auto w-full justify-stretch">
        {menuItems.map((menuItem, index) => (
          <button
            key={index}
            className={`relative flex w-1/3 items-center justify-center py-3 cursor-pointer text-sm`}
            onClick={() => setActiveTab(menuItem.value)}
          >
            <span className="block h-full capitalize transition-all duration-100 will-change-[transform,opacity,font-weight] font-semibold opacity-100">
              {menuItem.label}
            </span>
            <div
              className={`absolute bottom-0 left-0 z-10 h-1 w-full ${activeTab === menuItem.value ? "bg-gradient-to-r from-my-from to-my-to" : "bg-[#282E33]"
                }`}
            ></div>
          </button>
        ))}
      </div>

      {/* Mobile Content */}
      <div className="flex-1 overflow-hidden">
        {menuItems
          .find((menuItem) => menuItem.value === activeTab)
          ?.component({
            handleClose,
          })}
      </div>
    </div>
  )

  // Desktop Dialog
  if (!isMobile) {
    return (
      <Dialog className="z-[100]" open={isModalOpen} onOpenChange={handleClose}>
        <DialogContent
          className="  flex flex-col max-w-[93dvw] max-h-[93dvh] w-[93vw] h-[93vh] pointer-events-auto overflow-hidden rounded-lg border border-[#8ca4b5] border-solid py-2 px-3"
          style={{ backgroundColor: "#01020b" }}
        >
          <DesktopContent />
        </DialogContent>
      </Dialog>
    )
  }

  // Mobile Drawer
  return (
    <Drawer className='z-[100]' open={isModalOpen} onOpenChange={handleClose}>
      <DrawerContent
        className="border-none  flex flex-col h-[95vh] max-h-[95vh] pointer-events-auto overflow-hidden rounded-t-3xl p-0"
        style={{ backgroundColor: "#01020b" }}
      >
        <MobileContent />
      </DrawerContent>
    </Drawer>
  )
}
