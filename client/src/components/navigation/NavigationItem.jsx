import { useLocation, Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";

const getTooltipText = (id) => {
  const tooltips = {
    "channels": "Your Dental Network",
    "chat3": "Manage Your Finance",
    "chat2": "Plan Like A Pro",
    "growth-support": "Marketing Services",
    "job-opportunities": "Job Portal",
    "top-dentist-opportunity": "Top Dentist Academy",
    "sunnah": "Islamic Guidance"
  };
  return tooltips[id] || id;
};

export default function NavigationItem({ id, imageUrl }) {
  const location = useLocation(); // Get the current location
  const isActive = location.pathname.includes(`/${id}`); // Check if the current path includes the id
  // Helper function to get tooltip text based on id

  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link to={`/${id}`}>
            <button className="group relative flex items-center hover:bg-slate-900 py-3 w-full">
              <div
                className={cn(
                  "absolute left-0 bg-my-white rounded-r-full transition-all w-[4px]",
                  isActive ? "h-[8px] group-hover:h-[20px]" : ""
                )}
              />
              <div
                className={cn(
                  "relative flex mx-3 h-[40px] w-[40px] transition-all overflow-hidden",
                  isActive ? "bg-my-white/10" : "bg-transparent "
                )}
              >
                <div
                  style={{
                    opacity: isActive ? 1 : 1,
                    color: isActive ? 'var(--my-to)' : '#8ca4b5',
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                >
                  {imageUrl}
                </div>
              </div>
            </button>
          </Link>
        </TooltipTrigger>
        <TooltipContent side="right" align="center" className="text-md py-[2px] font-semibold bg-black" style={{
          fontFamily: "inter, system-ui, sans-serif"
        }}>
          {getTooltipText(id)}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
