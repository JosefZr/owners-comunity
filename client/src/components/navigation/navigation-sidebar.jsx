import { ScrollArea } from "../ui/scroll-area";
import NavigationItem from "./NavigationItem";
import { GiEarthAmerica, GiTakeMyMoney } from "react-icons/gi";
import { useNavigate } from "react-router-dom";
import ProfileImage from "../chatComponents/ProfileImage";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "@/context/UserContext";
import { fetchUserData } from "@/hooks/useFetchUserData";
import { FaMoneyBillTrendUp, FaPlus, FaRegChessKnight, FaRegChessQueen, FaDownload } from "react-icons/fa6";
import { MdWorkHistory } from "react-icons/md";
import { FaUssunnah } from "react-icons/fa";
import { useAuthUser } from "@/hooks/jwt/useAuthUser";
import { MODAL_TYPE, useModal } from "@/hooks/useModalStore";
import { useGetSettings } from "@/hooks/payments/useGetSettings";
import { LoadingSpinner } from "../LoadingSpinner";
import toast from "react-hot-toast";
import { GiFlatPawPrint } from "react-icons/gi";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
// import { useUserToChatContext } from "@/context/ToChatUser";
// import { useGetAdmin } from "@/hooks/user/useGetAdmin";


export default function NavigationSidebar() {
  const userInfo = useAuthUser();
  const { user, setUser } = useContext(UserContext);
  // const { setClickedUserId } = useUserToChatContext();

  const { data: Settings, isLoading: isLoadingSettings } = useGetSettings({ userId: userInfo.userId });
  const { onOpen } = useModal();
  const navigate = useNavigate();
  const handleAssistance = async () => {
    // try {
    //   const response = await fetch(`${import.meta.env.VITE_SERVER_API}/api/v1/auth/getAdmin`, {
    //     method: "GET",
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //   });

    //   if (!response.ok) {
    //     throw new Error('Failed to fetch admin');
    //   }

    //   const data = await response.json();

    //   if (!data.data) {
    //     toast.error('Admin user not found');
    //     return;
    //   }

    //   setClickedUserId({
    //     userId: data.data._id,
    //     username: `${data.data.firstName} ${data.data.lastName}`,
    //   });
    //   navigate("/dashboard/user-chat");

    // } catch (error) {
    //   console.error('Error fetching admin:', error);
    //   toast.error('Failed to connect to support');
    // }
    loadVGAgent()
  };
  // State to store the install prompt
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isInstallable, setIsInstallable] = useState(false);

  const servers = [
    {
      id: "channels",
      imageUrl: <GiEarthAmerica className="object-cover w-full h-full" />,
    },
    {
      id: "chat3",
      imageUrl: <GiTakeMyMoney className="object-cover w-full h-full" />,
    },
    {
      id: "chat2",
      imageUrl: <FaRegChessKnight className="object-cover w-full h-full" />,
    },
    {
      id: "growth-support",
      imageUrl: <FaMoneyBillTrendUp className="object-cover w-[90%] h-[90%] items-center text-center mx-auto" />
    },
    {
      id: "job-opportunities",
      imageUrl: <MdWorkHistory className="object-cover w-[90%] h-[90%] items-center text-center mx-auto" />
    },
  ];

  // Add Sunnah icon if enabled
  if (Settings?.settings?.Sunnah) {
    servers.push({
      id: "sunnah",
      imageUrl: <FaUssunnah className="object-cover w-[90%] h-[90%] items-center text-center mx-auto" />,
    });
  }
  if (Settings?.settings?.topDentist) {
    servers.push({
      id: "top-dentist-opportunity",
      imageUrl: <FaRegChessQueen className="object-cover w-[90%] h-[90%] items-center text-center mx-auto" />
    });
  }

  // Effect to fetch user data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchUserData(userInfo.userId);
        setUser(data.user);
      } catch (err) {
        console.error("Error fetching user data:", err);
      }
    };
    fetchData();
  }, [userInfo.userId, setUser]);

  // Effect to handle PWA install prompt
  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallable(true);
    };

    // Check if app is already installed
    const checkInstallation = async () => {
      if (window.matchMedia('(display-mode: standalone)').matches) {
        setIsInstallable(false);
      }
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    checkInstallation();

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      // Check if it's iOS
      const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window).MSStream;

      if (isIOS) {
        toast.success('To install: tap the share button and select "Add to Home Screen"');
        return;
      }

      // If already installed or not supported
      if (window.matchMedia('(display-mode: standalone)').matches) {
        toast.success('Application is already installed!');
      } else {
        toast.error('Installation not supported in this browser/device');
      }
      return;
    }

    try {
      await deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        toast.success('Thank you for installing our app!');
      }

      setDeferredPrompt(null);
      setIsInstallable(false);
    } catch (err) {
      console.error('Error installing PWA:', err);
      toast.error('Failed to install application');
    }
  };
  // Update the useEffect for installation handling
  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallable(true);
    };

    const handleAppInstalled = () => {
      setIsInstallable(false);
    };

    const checkInstallation = () => {
      const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
      const isInstalled = navigator.standalone || isStandalone;
      setIsInstallable(!isInstalled && !!deferredPrompt);
    };

    // Add event listeners
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    // Check installation status periodically
    const interval = setInterval(checkInstallation, 1000);

    // Initial check
    checkInstallation();

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
      clearInterval(interval);
    };
  }, [deferredPrompt]);
  // Function to load the agent script
  const loadVGAgent = () => {
    if (!window.VG_CONFIG) {
      window.VG_CONFIG = {
        ID: "gNESfhWMiW3IRBZN9sTC",
        region: 'na',
        render: 'bottom-right',
        stylesheets: [
          "https://vg-bunny-cdn.b-cdn.net/vg_live_build/styles.css",
        ],
      };
    }

    // Only add the script if it doesn't already exist
    if (!document.getElementById('vg-agent-script')) {
      const VG_SCRIPT = document.createElement("script");
      VG_SCRIPT.id = 'vg-agent-script';
      VG_SCRIPT.src = "https://vg-bunny-cdn.b-cdn.net/vg_live_build/vg_bundle.js";
      VG_SCRIPT.defer = true;
      document.body.appendChild(VG_SCRIPT);
    }
  };
  useEffect(() => {
    return () => {
      // Cleanup script when component unmounts
      const script = document.getElementById('vg-agent-script');
      if (script) {
        script.remove();
      }
      delete window.VG_CONFIG;
    };
  }, []);
  return (
    <div
      className="h-full border-l-stroke border-l-[2px] space-y-4 flex flex-col items-center text-my-white-gray "
      style={{
        paddingTop: 'env(safe-area-inset-top)',
        paddingBottom: 'env(safe-area-inset-bottom)',
        touchAction: 'manipulation',
        position: "relative",
        boxSizing: 'border-box'
      }}
    >
      <div
        className="max-h-[100%] h-[100%] border-r-[1px] border-[#213043] hash-background  w-full object-cover left-0 pointer-events-none"
        style={{ position: "absolute", top: 'env(safe-area-inset-bottom)' }}
      />
      <div style={{ position: "absolute", paddingTop: "env(safe-area-inset-top)" }} className="top-[105px] left-[-10px] z-50"><div className="plus-sign"></div></div>
      <div style={{ position: "absolute", paddingTop: "env(safe-area-inset-top)" }} className="top-[105px] left-[59px] z-50"><div className="plus-sign"></div></div>
      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger asChild>
            <div
              className=" flex h-[40px] w-[40px]  items-center justify-center transition-opacity cursor-pointer"
              onClick={() => navigate("/dashboard")}
              style={{
                position: "relative"
              }}
            >
              <ProfileImage image={user.avatar} />
            </div>
          </TooltipTrigger>
          <TooltipContent side="right" className="text-md py-[2px] font-semibold bg-black" style={{
            fontFamily: "inter, system-ui, sans-serif"
          }}>
            Your Profile
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <div className=" rounded-full px-[13px] cursor-pointer w-full" onClick={handleAssistance}>
              <div className="border-[4px] border-[#2b334079]">
                <div className="border-[2px] border-[#2b3340be]">
                  <div className="group cursor-pointer text-white flex items-center  pointer-events-auto transition-all duration-300 border-stroke hover:border-[#6a6d6f] border-[1px] hover:bg-[#202326] py-1 px-1 w-auto">
                    <GiFlatPawPrint className="object-cover w-[100%] h-[100%] items-center text-center mx-auto" />
                  </div>
                </div>
              </div>
            </div>
          </TooltipTrigger>
          <TooltipContent side="right" className="text-md py-[2px] font-semibold bg-black" style={{
            fontFamily: "inter, system-ui, sans-serif"
          }}>
            SAVAGE-DENTAL-AI
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      {isLoadingSettings ? (
        <LoadingSpinner />
      ) : (
        <ScrollArea className="flex-1 border-stroke border-t-[1px] w-full">

          {servers.map((server, index) => (
            <div key={index}>
              <NavigationItem
                id={server.id}
                imageUrl={server.imageUrl}
              />
            </div>
          ))}
          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="cursor-pointer py-2 text-my-from">
                  <FaPlus
                    className="object-cover w-[40%] h-[40%] opacity-70 items-center text-center mx-auto"
                    onClick={() => {
                      onOpen(MODAL_TYPE.ADD_MODAL)
                    }}
                    style={{ color: "#8ca4b5" }}
                  />
                </div>
              </TooltipTrigger>
              <TooltipContent side="right" className="text-md py-[2px] font-semibold bg-black" style={{
                fontFamily: "inter, system-ui, sans-serif",
              }}>
                Add New Channel
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </ScrollArea>
      )}

      <div className="pb-4 mt-auto flex flex-col items-center gap-4 ">
        <div style={{ position: "absolute", paddingTop: "env(safe-area-inset-top)" }} className="top-[-10px] left-[-11px]"><div className="plus-sign"></div></div>
        <div style={{ position: "absolute", paddingTop: "env(safe-area-inset-top)" }} className="top-[-10px] left-[59px]"><div className="plus-sign"></div></div>
        {isInstallable && (
          <TooltipProvider delayDuration={0}>
            <div style={{ position: "absolute" }} className="bottom-[-9px] left-[-11px]"><div className="plus-sign"></div></div>
            <div style={{ position: "absolute" }} className="bottom-[-9px] left-[59px]"><div className="plus-sign"></div></div>

            <Tooltip>
              <TooltipTrigger asChild>
                <div className="cursor-pointer group relative">
                  <FaDownload
                    className="w-[24px] h-[24px] text-zinc-400 group-hover:text-zinc-200 transition"
                    onClick={handleInstallClick}
                  />
                </div>
              </TooltipTrigger>
              <TooltipContent side="right">
                Install Application
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
    </div >
  );
}