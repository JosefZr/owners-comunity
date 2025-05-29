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
                                {/* <RightVideo/> */}
                                <div className="w-1/2 border-l-[1px] border-l-[#2b3340] top-[20%] left-0 max-h-[100%] overflow-hidden" style={{ position: "absolute" }}>
                                    <img
                                        src="/ai/2.jpeg"
                                        alt="Section Timeout Background"
                                        style={{ color: "transparent" }}
                                        className="object-cover h-[100%] w-full"
                                        loading="lazy"
                                        width={1334}
                                        height={1642}
                                        decoding="async"
                                    />
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
                            <img
                                src="/ai/2.jpeg"
                                alt="carbon fiber bg"
                                width="1334"
                                height="1642"
                                loading="lazy"
                                className="object-cover h-[100%] w-full top-0 left-0 pointer-events-none z-0 opacity-75"
                                style={{ position: "absolute", color: "transparent" }}
                            />
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
                        </div>
                    </div>
                    <SmallRightShades />
                </article>
            </div>
        </div>
    )
}
