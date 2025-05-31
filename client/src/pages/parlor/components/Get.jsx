import useReveal from "@/hooks/useReveal";
import styled from "styled-components";
import { GiDoctorFace, GiLockedChest, GiNetworkBars, GiPayMoney, GiStarMedal, GiTeacher } from "react-icons/gi";

import React, { useEffect, useRef, useState } from "react";
import WideRightShades from "@/pages/ai-automation/components/Shades/WideRightShades";
import SmallLeftShades from "@/pages/ai-automation/components/Shades/SmallLeftShades";
import SmallSection2 from "@/pages/ai-automation/components/SmallSection2";
import SmallRightShades from "@/pages/ai-automation/components/Shades/SmallRightShades";
import WideLeftShades from "@/pages/ai-automation/components/Shades/WideLeftShades";
import GlowSquares from "@/pages/ai-automation/components/Shades/GlowSquares";
import { FaBusinessTime } from "react-icons/fa6";
import { Link } from "react-router-dom";
const Div = styled.div`
    background: linear-gradient(88.87deg, var(--from) -49.96%, var(--to) 99.26%);
    padding: 2px;
    clip-path: polygon(22px 0, 100% 0, 100% calc(100% - 22px), calc(100% - 22px) 100%, 0 100%, 0 22px);
    width: 100%;
    @media screen and (min-width: 1024px) {
        width: auto;
    }
`
const Button = styled.button`
    position: relative;
    padding: 16px 32px;
    background: linear-gradient(87.1deg, var(--from) 1.37%,  var(--to) 101.5%);
    text-align: center;
    color: black;
    clip-path: polygon(20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 20px);
    font-size: 22px;
    font-weight: 800;
    line-height: 27.5px;
    letter-spacing: -.05em;
    width: 100%;
    @media screen and (min-width: 1024px) {
        min-width: 400px;
        font-size: 28px;
        line-height: 35px;
        padding: 20px 52px;
        width: auto;
    }
`
const P = styled.p`
    font-size: 18px;
    font-weight: 500;
    line-height: 26px;
    color: hsla(0, 0%, 100%, .7);
    strong {
        color: #fff;
        font-weight: 600;
    }
    i{
        color: #fff;
        font-weight: 600;
        padding: 0 4px 0 0;
    }
@media screen and (min-width: 1024px) {
        font-size: 20px;
    }
    @media screen and (min-width: 1024px) {
        line-height: 28px;
    }
`
const Texture = styled.h5`
    background-color: white;
    text-transform: capitalize;
    background-position: 50%;
    background-repeat: repeat;
    -webkit-text-fill-color: transparent;
    background-image: url("/backs/heading-texture_1heading-texture.webp");
    background-clip: text;
    font-size: 22px;
    font-weight: 700;
    line-height: 38px;
    @media screen and (min-width: 1024px) {
        font-size: 24px;
        line-height: 24px;
    }
`
const HeroHeading = styled.h1`
    background-color: white;
    text-transform: capitalize;
    background-position: 50%;
    background-repeat: repeat;
    -webkit-text-fill-color: transparent;
    /* background-image: url("/backs/heading-texture_1heading-texture.webp"); */
    background-clip: text;
    font-size: 55px;
    font-weight: 700;
    letter-spacing: -.03em;
    line-height: 66px;
    text-align: center;
    @media screen and (max-width: 991px) {
        font-size: 30px;
        line-height: 40px;
    }
`;
const Items = [
    {
        title: "Execution Vault",
        icon: <GiLockedChest />,
        p: "Templates, funnels, SOPs — <strong>all the tools that actually move the needle.</strong>",
    },
    {
        title: "Private Network",
        icon: <GiNetworkBars />,
        p: "<strong>No fake hustle, no noisy threads.</strong> Just operators focused on results and growth.",
    },
    {
        title: "Personal Help From Dr. Truth",
        icon: <GiDoctorFace />,
        p: "<strong>You get my brain, my team, and our weapons.</strong> We'll help you fix what's broken and scale what's working.",
    },
    {
        title: "Access to Premium Services",
        icon: <GiStarMedal />,
        p: "Want help <strong>launching ads, scaling offers, or fixing broken websites?</strong> It's all available when you're ready.",
    },
    {
        title: "This Isn’t For Tourists.",
        icon: <GiStarMedal />,
        p: "If you’re not ready to talk about money/mindset this place isn’t for you.",
    },
]
export default function Get() {
    useReveal("vertical");

    const [currentSlide, setCurrentSlide] = useState(0);
    const [playingIndex, setPlayingIndex] = useState(-1);
    const players = useRef([]);
    const itemsPerSlide = 3;
    const totalSlides = Math.ceil(Items.length / itemsPerSlide);
    // Initialize players
    useEffect(() => {
        players.current = players.current.slice(0, Items.length);
    }, []);
    const handlePlay = async (index) => {
        try {
            if (playingIndex === index) {
                await players.current[index].pause();
                setPlayingIndex(-1);
            } else {
                if (playingIndex !== -1) {
                    await players.current[playingIndex].pause();
                }
                // Unmute before playing
                await players.current[index].setVolume(1);
                await players.current[index].play();
                setPlayingIndex(index);
            }
        } catch (error) {
            console.error('Video playback error:', error);
        }
    };
    // Update Items array with proper HTML
    const formattedItems = Items.map(item => ({
        ...item,
        p: item.p.replace(/<strong className='text-white'>(.*?)<\/strong>/g, "<strong>$1</strong>")
    }));
    const handleNext = () => {
        if (currentSlide < totalSlides - 1) {
            setCurrentSlide(prev => prev + 1);
        }
    };

    const handlePrev = () => {
        if (currentSlide > 0) {
            setCurrentSlide(prev => prev - 1);
        }
    }
    return (
        <div style={{ position: "relative", fontFamily: "'Funnel Display', sans-serif" }}>
            <div className="w-full border-b-[1px] border-b-[#2b3340] hidden lg:block reveal-vertical">
                <article className="w-full max-w-[1428px] mx-auto px-[15px] lg:px-[41px] lg:border-x-[1px] lg:border-[#2b3340]" style={{ position: "relative" }}>
                    <WideLeftShades />
                    <div className="border-x-[1px] border-[#2b3340]">
                        <div className="lg:p-[30px] p-2 w-full" style={{ position: "relative" }}>
                            {/* <div className="flex flex-col items-center justify-center">
                                <Subtitle top="Marketing is important…" />
                            </div> */}
                            <HeroHeading >
                                WHAT YOU GET:
                            </HeroHeading>
                        </div>
                    </div>
                    <div className="reveal-vertical-left">
                        <div className="lg:p-[40px] p-2 w-full" style={{ position: "relative" }}>
                            <GlowSquares />
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4" style={{ position: "relative" }}>
                                {formattedItems
                                    // .slice(
                                    //     currentSlide * itemsPerSlide,
                                    //     (currentSlide + 1) * itemsPerSlide
                                    // )
                                    .map((item, index) => {
                                        const absoluteIndex = currentSlide * itemsPerSlide + index;
                                        const videoId = item.video?.split("/").pop();
                                        return (
                                            <div key={index}>
                                                <article className="bg-[#12131d] group cursor-pointer transition-all duration-500 border-[#2b3340] border-[1px] h-full hover:border-white flex flex-col justify-between">
                                                    <div>
                                                        <div className="flex gap-3">
                                                            <div className="flex items-center justify-center h-[80px] w-[100px] border-r-[1px] border-r-[#2b3340] p-4 relative">
                                                                {item.icon.props?.src ? (
                                                                    <>
                                                                        <img
                                                                            src={item.icon.props.src}
                                                                            className="h-[48px] w-auto hidden lg:block transition-all  duration-500"
                                                                            alt={item.title}
                                                                        />
                                                                        <img
                                                                            src={item.icon.props.src}
                                                                            className="h-[48px] w-auto lg:opacity-0 group-hover:opacity-100 transition-all duration-500 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                                                                            alt={item.title}
                                                                        />
                                                                    </>
                                                                ) : (
                                                                    <>
                                                                        {React.cloneElement(item.icon, {
                                                                            className: "h-[48px] w-auto hidden lg:block transition-all duration-500",
                                                                        })}
                                                                        {React.cloneElement(item.icon, {
                                                                            className: "h-[48px] w-auto lg:opacity-0 group-hover:opacity-100 transition-all duration-500 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
                                                                        })}
                                                                    </>
                                                                )}
                                                            </div>
                                                            <div className="h-[80px] flex justify-center items-center">
                                                                <Texture className="mt-2 capitalize text-center">{item.title}</Texture>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center py-4 px-3 lg:p-3 border-t-[1px] border-t-[#2b3340]">
                                                            <P className="!text-[13px] lg:!text-[16px]" dangerouslySetInnerHTML={{ __html: item.p }} />
                                                        </div>
                                                    </div>

                                                </article>
                                            </div>
                                        );
                                    })}
                                <div style={{ position: "absolute" }} className=" bg-[#01020b] top-0 left-0 w-full h-full pointer-events-none duration-500 transition-all opacity-0"></div>
                            </div>
                        </div>
                    </div>
                    <WideRightShades />
                </article>
            </div>
            <div className="w-full h-full border-b-[1px] border-b-[#2b3340] lg:hidden">
                <article className="w-full max-w-[1428px] mx-auto px-[15px] lg:px-[41px] lg:border-x-[1px] lg:border-[#2b3340]" style={{ position: "relative" }}>
                    <SmallLeftShades />
                    <div className="border-x-[1px] border-[#2b3340]">
                        <div className="lg:p-[60px] p-2 w-full" >
                            <div className="flex flex-col items-center justify-center">
                                <SmallSection2
                                    top="Marketing is important…"
                                    title="…However, you’ve already got 49  things on your to-do list. Hiring. Sales. Payroll. Operations."
                                    p="Now, <i>you’re also expected to: </i> run ads, fix funnels, write copy, track leads, follow up, update your site... <br /> <br /> Come on. <br /><br /> <strong>What are you gonna do? </strong>"
                                />
                            </div>
                        </div>
                        <div className="">
                            <div className="lg:p-[60px] p-2 w-full" style={{ position: "relative" }}>
                                <GlowSquares />
                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4" style={{ position: "relative" }}>
                                    {formattedItems.map((item, index) => {
                                        const videoId = item.video?.split("/").pop();
                                        return (
                                            <div key={index} className="reveal-vertical" >
                                                <article className="bg-[#12131d] group cursor-pointer transition-all duration-500 border-[#2b3340] border-[1px] lg:min-h-[436px] hover:border-white flex flex-col justify-between">
                                                    <div>
                                                        <div className="flex gap-3">
                                                            <div className="flex items-center justify-center h-[80px] w-[100px] border-r-[1px] border-r-[#2b3340] p-4 " style={{ position: "relative" }}>
                                                                {item.icon.props?.src ? (
                                                                    <>
                                                                        <img
                                                                            src={item.icon.props.src}
                                                                            className="h-[48px] w-auto hidden lg:block transition-all duration-500"
                                                                            alt={item.title}
                                                                        />
                                                                        <img
                                                                            src={item.icon.props.src}
                                                                            className="h-[48px] w-auto lg:opacity-0 group-hover:opacity-100 transition-all duration-500 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                                                                            alt={item.title}
                                                                        />
                                                                    </>
                                                                ) : (
                                                                    <>
                                                                        {React.cloneElement(item.icon, {
                                                                            className: "h-[48px] w-auto hidden lg:block transition-all duration-500",
                                                                        })}
                                                                        {React.cloneElement(item.icon, {
                                                                            className: "h-[48px] w-auto lg:opacity-0 group-hover:opacity-100 transition-all duration-500 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
                                                                        })}
                                                                    </>
                                                                )}
                                                            </div>
                                                            <div className="h-[80px] flex justify-center items-center">
                                                                <Texture className="mt-2 capitalize text-center">{item.title}</Texture>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center py-4 px-3 lg:p-6 border-t-[1px] border-t-[#2b3340]">
                                                            <P className="!text-[13px] lg:!text-[16px] sm:max-w-[40%]" dangerouslySetInnerHTML={{ __html: item.p }} />
                                                        </div>
                                                    </div>
                                                    {item.img && (
                                                        <img src={item.img} alt={item.title} width="416" height="300" className="w-full" />
                                                    )}
                                                    {item.video && (
                                                        <div className="border-x-[1px] border-[#2b3340]">
                                                            <div className=" w-full group min-h-[200px]" style={{ position: "relative" }}>
                                                                <div className=" undefined" style={{ position: "relative" }}>
                                                                    <div className=" w-full  undefined" style={{ position: "relative" }}>
                                                                        <div className="max-w-[100%]  undefined" style={{ position: "relative" }}>
                                                                            <div className="w-full  lg:hidden undefined" style={{ position: "relative", paddingTop: "56.25%" }}>
                                                                                <iframe
                                                                                    src={`https://player.vimeo.com/video/${videoId}?autoplay=0&loop=0&byline=0&title=0`}
                                                                                    frameBorder="0"
                                                                                    height={"100%"}
                                                                                    width={"100%"}
                                                                                    style={{
                                                                                        position: "absolute",
                                                                                        inset: "0px",
                                                                                        width: "100%",
                                                                                        height: "100%",
                                                                                    }}
                                                                                    allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
                                                                                    allowFullScreen="true"
                                                                                ></iframe>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}
                                                </article>
                                            </div>
                                        );
                                    })}
                                    <div style={{ position: "absolute" }} className=" bg-[#01020b] top-0 left-0 w-full h-full pointer-events-none duration-500 transition-all opacity-0"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <SmallRightShades />
                </article>
            </div>
            <div className="flex justify-center pt-10">
                <Link>
                    <Div className="hover:scale-105 duration-300 transition-all ">
                        <Button className="hover:scale-105 duration-300 transition-all">
                            JOIN FOR FREE
                        </Button>
                    </Div>
                </Link>
            </div>
            <P className=" text-center px-4 text-pretty pb-10" dangerouslySetInnerHTML={{ __html: "<br/><strong>Dr Truth:</strong> ‘'The Parlor' Is Made for men who want to win.  Apply only IF YOU ARE A BUSINESSMAN.’" }} />

        </div>
    );
}