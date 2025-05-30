import useReveal from "@/hooks/useReveal";
import WideLeftShades from "../Shades/WideLeftShades";
import Subtitle from "../Subtitle";
import styled from "styled-components";
import GlowSquares from "../Shades/GlowSquares";
import { GiPayMoney, GiSpiderWeb, GiTeacher } from "react-icons/gi";
import { TbDatabaseDollar } from "react-icons/tb";
import { FiPhoneOutgoing } from "react-icons/fi";
import { RiCalendarScheduleFill } from "react-icons/ri";
import { BsRobot } from "react-icons/bs";
import React, { useEffect, useRef, useState } from "react";
import WideRightShades from "../Shades/WideRightShades";
import Player from "@vimeo/player";
import SmallLeftShades from "../Shades/SmallLeftShades";
import SmallRightShades from "../Shades/SmallRightShades";
import SmallSection2 from "../SmallSection2";
import { FaBusinessTime } from "react-icons/fa6";
const VideoWrapper = styled.div`
  position: relative;
  padding-top: 56.25%;
  &:hover .play-button {
    opacity: 1;
  }
`;
const PlayButton = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 60px;
  height: 60px;
  background: rgba(0, 0, 0, 0.7);
  border-radius: 50%;
  cursor: pointer;
  opacity: ${({ playing }) => (playing ? 0 : 1)};
  transition: opacity 0.3s;
  &::after {
    content: "";
    position: absolute;
    left: 55%;
    top: 50%;
    transform: translate(-40%, -50%);
    border-style: solid;
    border-width: 10px 0 10px 20px;
    border-color: transparent transparent transparent white;
  }
`;
const P = styled.p`
    font-size: 18px;
    font-weight: 500;
    line-height: 26px;
    color: hsla(0, 0%, 100%, .7);
    strong {
        color: #fff;
        font-weight: 600;
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
    margin-top: 2rem;
    background-color: white;
    text-transform: capitalize;
    background-position: 50%;
    background-repeat: repeat;
    -webkit-text-fill-color: transparent;
    background-image: url("/backs/heading-texture_1heading-texture.webp");
    background-clip: text;
    font-size: 55px;
    font-weight: 700;
    letter-spacing: -.03em;
    line-height: 50px;
    text-align: center;
    @media screen and (max-width: 991px) {
        font-size: 30px;
        line-height: 34px;
    }
`;
const Items = [
    {
        title: "Do it yourself?",
        icon: <FaBusinessTime />,
        p: "If you have little to do, it's not a problem. However, if you're busy... this is not feasible. ",
    },
    {
        title: "Hire a team?",
        icon: <GiTeacher />,
        p: "Finding good people is difficult,  training them is expensive. Even if you find the perfect person... You still rely on one individual.",
    },
    {
        title: "Hire an agency?",
        icon: <GiPayMoney />,
        p: "Don't have a marketing budget of tens of thousands of euros per month? Well then your account is often managed by the intern of the assistant of the assistant. Not ideal.",
    },
]
export default function Services() {
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
                                Marketing is important…
                            </HeroHeading>
                            <P
                                className="mt-4 max-w-[550px] text-center mx-auto"
                                dangerouslySetInnerHTML={{
                                    __html: "…However, you’ve already got 49  things on your to-do list. Hiring.Sales.Payroll.Operations."
                                }}
                            />
                            < P
                                className="mt-4 max-w-[550px] text-center mx-auto"
                                dangerouslySetInnerHTML={{ __html: "Now, <strong>you’re also expected to:</strong>  run ads, fix funnels, write copy, track leads, follow up, update your site... <br /> Come on. <br /><br /> <strong>What are you gonna do? </strong>" }}
                            />
                        </div>
                    </div>
                    <div className="reveal-vertical-left">
                        <div className="lg:p-[40px] p-2 w-full" style={{ position: "relative" }}>
                            <GlowSquares />
                            {/* <img
                                src="https://www.cobratate.com/jointherealworld/arrow_left_alt.png"
                                alt="Arrow Left"
                                width={46}
                                height={36}
                                onClick={handlePrev}
                                className={`left-0 top-[calc(50%-20px)] cursor-pointer transition-all duration-300 hover:scale-110 ${currentSlide === 0 ? 'opacity-50 cursor-not-allowed' : ''
                                    }`}
                                style={{ position: "absolute", color: "transparent" }}
                            /> */}
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4" style={{ position: "relative" }}>
                                {formattedItems.slice(
                                    currentSlide * itemsPerSlide,
                                    (currentSlide + 1) * itemsPerSlide
                                ).map((item, index) => {
                                    const absoluteIndex = currentSlide * itemsPerSlide + index;
                                    const videoId = item.video?.split("/").pop();
                                    return (
                                        <div key={index}>
                                            <article className="bg-[#12131d] group cursor-pointer transition-all duration-500 border-[#2b3340] border-[1px] h-full hover:border-white flex flex-col justify-between">                            <div>
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
                                                {/* {item.img && (
                                                    <img src={item.img} alt={item.title} width="416" height="300" className="w-full " style={{
                                                        maxHeight: "240px",
                                                        minHeight: "240px",
                                                        objectFit: "cover",
                                                        objectPosition: "center top",
                                                        backgroundPositionY: "top",
                                                        backgroundRepeat: "repeat",
                                                        backgroundSize: "cover",
                                                    }} />
                                                )}
                                                {item.video && (
                                                    <VideoWrapper>
                                                        <div className=" top-0 left-0 w-full h-full" style={{
                                                            position: "absolute",
                                                        }}>
                                                            <iframe
                                                                src={`https://player.vimeo.com/video/${videoId}?background=1&autoplay=0&loop=0&byline=0&title=0`}
                                                                ref={(el) => {
                                                                    if (el && !players.current[absoluteIndex]) {
                                                                        players.current[absoluteIndex] = new Player(el, {
                                                                            muted: false,
                                                                            background: false
                                                                        });
                                                                    }
                                                                }}
                                                                className="w-full h-full "
                                                                frameBorder="0"
                                                                allow="autoplay; fullscreen"
                                                                allowFullScreen
                                                            />
                                                        </div>
                                                        <PlayButton
                                                            playing={playingIndex === absoluteIndex}
                                                            onClick={() => handlePlay(absoluteIndex)}
                                                        />
                                                    </VideoWrapper>
                                                )} */}
                                            </article>
                                        </div>
                                    );
                                })}
                                <div style={{ position: "absolute" }} className=" bg-[#01020b] top-0 left-0 w-full h-full pointer-events-none duration-500 transition-all opacity-0"></div>
                            </div>
                            {/* <img
                                src="https://www.cobratate.com/jointherealworld/arrow_right_alt.png"
                                alt="Arrow Right"
                                width={46}
                                height={36}
                                onClick={handleNext}
                                className={`right-0 top-[calc(50%-20px)] cursor-pointer transition-all duration-300 hover:scale-110 ${currentSlide === totalSlides - 1 ? 'opacity-50 cursor-not-allowed' : ''
                                    }`}
                                style={{ position: "absolute", color: "transparent" }}
                            /> */}
                            {/* <div className="flex items-center justify-center gap-2 mt-10 bottom-6 left-[calc(50%-120px)]" style={{ position: "absolute" }}>
                                {Array.from({ length: totalSlides }).map((_, index) => (
                                    <div
                                        key={index}
                                        className={`w-[75px] h-[4px] ${index === currentSlide ? 'bg-[#fff]' : 'bg-[#2b3340]'
                                            }`}
                                    />
                                ))}
                            </div> */}
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
                                    top="That ends today."
                                    title="…However, you’ve already got 49  things on your to-do list. Hiring. Sales. Payroll. Operations."
                                    p="Now, <strong>you’re also expected to:</strong>  run ads, fix funnels, write copy, track leads, follow up, update your site... <br/> Come on. <br/><br/> <strong>What are you gonna do? </strong>"
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
        </div>
    );
}