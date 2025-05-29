import DentalAssistantList from "@/components/PlanLikePro/DentalAssistantList";
import SmallTaskList from "./SmallTaskList";

export default function SmallDailyCheckList() {
  return (
    <div className="carousel-item relative h-[calc(100dvh-10rem)] w-full overflow-hidden">
      <div className="scrollbar-custom  relative h-full w-full animate-fade-in">
        <div
          className="BrownBack scrollbar-none overflow-y-scroll h-full w-full"
          style={{
            position: "relative", // Maintain proper positioning
          }}
        >
          <img
            src="/ai/carbon_bg.webp"
            alt="carbon fiber bg"
            width="1736"
            height="943"
            loading="lazy"
            className="max-h-[100%] h-[100%] opacity-5 w-full object-cover top-0 left-0 pointer-events-none"
            style={{ position: "absolute" }}
          />
          <div
            className="h-full rounded-lg px-4 pb-4 sm:px-5"
          >
            {/* Include SmallTaskList and DentalAssistantList components */}
            <SmallTaskList />
            <DentalAssistantList />
          </div>
        </div>
      </div>
    </div>
  );
}

