import { Plus } from "lucide-react";
import { ActionTooltip } from "../ui/action-tooltip";
import { useModal } from "@/hooks/useModalStore";
import { useContext, useState } from "react";
import { UserContext } from "@/context/UserContext";
import { jwtDecode } from "jwt-decode";
import { MdKeyboardArrowDown } from "react-icons/md";

export default function ServerSection({ label, allowedRole, children, channelType }) {
    const { onOpen } = useModal();
    const [isExpanded, setIsExpanded] = useState(true);
    const { setChannelType, setChannelAllowedUsers } = useContext(UserContext);
    const userInfo = jwtDecode(localStorage.getItem("token"))
    const role = userInfo.role

    const handleCreateChannel = () => {
        console.log(allowedRole)
        setChannelType(channelType);
        setChannelAllowedUsers(allowedRole)
        onOpen("createChannel");
    };
    return (
        <div style={{
            fontFamily: "'Inter', sans-serif"
        }}>
            <div className=" flex justify-between items-center cursor-pointer">
                <div className="mt-2 mb-3 flex shrink-0 items-center font-bold text-gray-400 text-xs uppercase hover:text-gray-200 " style={{
                    color: "rgb(156 163 175)",
                    lineHeight: ".75rem",
                    fontSize: "1rem",
                    fontWeight: 700
                }}
                    onClick={() => setIsExpanded(!isExpanded)}
                >
                    <MdKeyboardArrowDown className={` w-4 transform transition-all  ${isExpanded ? '-rotate-90' : ''}`} />
                    <p className=" uppercase  " >
                        {label}
                    </p>
                </div>
                <ActionTooltip lebel="create channel" side="top">
                    {role === "admin" &&
                        <button
                            className="text-zinc-400  hover:text-zinc-600 transition"
                            onClick={handleCreateChannel}
                        >
                            <Plus className="h-4 w-4" />
                        </button>
                    }
                </ActionTooltip>
            </div>
            <div className={`transition-all duration-300 ${isExpanded ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                {children}
            </div>
        </div>
    );
}