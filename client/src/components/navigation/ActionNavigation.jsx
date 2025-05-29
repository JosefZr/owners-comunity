import { Plus } from "lucide-react";
import { ActionTooltip } from "../ui/action-tooltip";
import { useModal } from "@/hooks/useModalStore";
export default function ActionNavigation() {
  const {onOpen} = useModal();
  return (
    <div>
        <ActionTooltip side="right" align='center' label ="Add a server">
            <button 
              onClick={()=>onOpen('createServer')}
              className="group flex items-center ">
                <div className=" flex mx-3 h-[48px] w-[48px] rounded-[24px] group-hover:rounded-[16px] transition-all overflow-hidden items-center justify-center bg-my-tin group-hover:bg-my-beige">
                    <Plus className="group-hover:text-white transition text-my-white-gray" size={25} />
                </div>
            </button>
        </ActionTooltip>
    </div>
  )
}
