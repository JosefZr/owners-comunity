import useReveal from "@/hooks/useReveal";
import WideLeftShades from "../Shades/WideLeftShades";
import WideRightShades from "../Shades/WideRightShades";
import LeftContent2 from "../LeftContent2";
import SmallRightShades from "../Shades/SmallRightShades";
import SmallLeftShades from "../Shades/SmallLeftShades";
import SmallSection2 from "../SmallSection2";

export default function ReverseSection() {
    useReveal('vertical');
    useReveal('horizontal');
    return (
        <div className="reveal-vertical" style={{ position: "relative", fontFamily: "'Funnel Display', sans-serif" }}>
            <div className="w-full border-b-[1px] border-b-[#2b3340] hidden lg:block">
                <article className="w-full max-w-[1428px] mx-auto px-[15px] lg:px-[41px] lg:border-x-[1px] lg:border-[#2b3340] " style={{ position: "relative" }}>
                    <WideLeftShades />
                    <div className="border-x-[1px] border-[#2b3340]">
                        <div className="lg:p-[60px] p-2 w-full" style={{ position: "relative" }}>
                            <div className="flex flex-row-reverse">
                                <LeftContent2
                                    top="How We Work"
                                    title="Book Your Free Strategy Call"
                                    p="
                                    <strong>We audit your business</strong> — fast, honest, brutal.
                                    Then we give you a <strong> clear plan</strong> that gets <strong>results.</strong> 
                                    </br>
                                    </br>

                                    No generic “tips.” No BS.
                                    </br>

                                    You talk. We listen.
                                    </br>
                                    </br>
                                    You walk away with a real plan built around your business, your offer, and your goals.

                                "
                                    button="GET MY MARKETING PLAN"
                                    cutted="true"
                                />
                                {/* Calendar Embed */}
                                <div className="w-1/2 border-l-[1px] border-l-[#2b3340] top-0 left-0 h-full" style={{ position: "absolute" }}>
                                    <div className="w-full h-full bg-gray-100">
                                        <iframe
                                            src="https://calendly.com/wcmarketingg/30min?month=2025-05"
                                            width="100%"
                                            height="100%"
                                            frameBorder="0"
                                            className="bg-white"
                                        ></iframe>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <WideRightShades />
                </article>
            </div>
            <div className="w-full border-b-[1px] border-b-[#2b3340] lg:hidden">
                <article className="w-full max-w-[1428px] mx-auto px-[15px] lg:px-[41px] lg:border-x-[1px] lg:border-[#2b3340]" style={{ position: "relative" }}>
                    <SmallLeftShades />
                    <div className="border-x-[1px] border-[#2b3340]">
                        <div className="lg:hidden pt-12 pb-8" style={{ position: "relative" }}>
                            <SmallSection2
                                top="How We Work"
                                title="Book Your Free Strategy Call"
                                p="
                                    <strong>We audit your business</strong> — fast, honest, brutal.
                                    Then we give you a <strong> clear plan</strong> that gets <strong>results.</strong> 
                                    </br>
                                    </br>

                                    No generic “tips.” No BS.
                                    </br>

                                    You talk. We listen.
                                    </br>
                                    </br>
                                    You walk away with a real plan built around your business, your offer, and your goals.

                                "
                                button="GET MY MARKETING PLAN"
                                cutted="true"
                            />
                            {/* Mobile Calendar Embed */}
                            <div className="mt-8 px-4 w-full h-[700px]">
                                <iframe
                                    src="https://calendly.com/wcmarketingg/30min?month=2025-05"
                                    width="100%"
                                    height="100%"
                                    frameBorder="0"
                                    className="bg-white rounded-lg"
                                ></iframe>
                            </div>
                        </div>
                    </div>
                    <SmallRightShades />
                </article>
            </div>
        </div>
    )
}