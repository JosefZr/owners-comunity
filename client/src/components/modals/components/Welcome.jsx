import { UserContext } from "@/context/UserContext";
import { useContext } from "react";
import BigProfileLogo from "@/components/BigProfileLogo";
import { LiaChessKingSolid } from "react-icons/lia";
import { progress } from "@/components/Profile/Preview";
import { getCurrentProgress, getDaysDifference } from "@/utils/progressUtils";
import UnderWelcome from "./UnderWelcome";

export default function Welcome() {
    const { user } = useContext(UserContext)
    const diffDays = getDaysDifference(user.createdAt);
    const currentProgress = getCurrentProgress(diffDays, progress);
    return (
        <div className=" BrownBack flex flex-col justify-between rounded-xl sm:mt-4  sm:p-4 h-[200px]  ">

            <div className="m-[2px] flex items-start gap-2">
                <img
                    src="/ai/carbon_bg.webp"
                    alt="carbon fiber bg"
                    width="1736"
                    height="943"
                    loading="lazy"
                    className="max-h-[100%] h-[100%] opacity-5 w-full object-cover top-0 left-0 pointer-events-none"
                    style={{ position: "absolute" }}
                />
                <section style={{ position: "relative" }} className=" flex-shrink-0 rounded-full bg-base-300 mr-2 cursor-pointer">
                    <BigProfileLogo image={user.avatar} />
                    <div className="absolute text-[22px] w-[22px] h-[18px] left-[30px] " style={{ bottom: "2px" }}>
                        {user.role === "admin" ? (
                            <LiaChessKingSolid style={{ color: "rgb(185, 242, 255)" }} />
                        ) : (
                            currentProgress.logo
                        )}
                    </div>
                </section>
                <section className="flex min-h-[40px] flex-1 flex-col items-baseline justify-between sm:min-h-[56px]">
                    <div className="font-light text-base opacity-80">Welcome,</div>
                    <div className="text-xl sm:font-medium sm:text-2xl uppercase">{user.firstName} {user.lastName}</div>
                </section>
            </div>
            <hr className="mt-2 opacity-25" />
            <UnderWelcome />
        </div>

    )
}
