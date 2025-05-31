import styled from "styled-components";
import { size } from "@/lib/mediaQuerys";
import { useState } from "react";
import { useParams } from "react-router-dom";
import WideRightShades from "@/pages/ai-automation/components/Shades/WideRightShades";
import WideLeftShades from "@/pages/ai-automation/components/Shades/WideLeftShades";

import Top from "@/pages/ai-automation/components/Top";
const Special = styled.h1`
    color: hsla(0, 0%, 100%, .21);
    font-size: 10px;
    line-height: 30px;
    letter-spacing: -3%;
    @media screen and (max-width: 991px) {
        display: none;
    }
`
const Sidebar = styled.div`
  position: fixed;
  top: 0;
  left: ${({ $isOpen }) => ($isOpen ? "0" : "-100%")};
  width: 30%;
  height: 100vh;
  background-color: rgba(26, 26, 26, 0.2); /* Slightly darker but more transparent */
  backdrop-filter: blur(10px); /* Strong blur for glass effect */
  -webkit-backdrop-filter: blur(10px); /* For Safari */
  z-index: 997;
  padding: 6rem 2rem 2rem;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: ${({ $isOpen }) => ($isOpen ? "0 0 15px rgba(0, 0, 0, 0.3)" : "none")};
  border-right: 1px solid rgba(255, 255, 255, 0.1); /* Subtle border for glass effect */

  @media screen and (max-width: ${size.tablet}) {
    width: 70%;
  }
`
const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.2); /* Very transparent */
  z-index: 996;
  opacity: ${(props) => (props.$isOpen ? 1 : 0)};
  visibility: ${(props) => (props.$isOpen ? "visible" : "hidden")};
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(3px); /* Light blur for background */
  -webkit-backdrop-filter: blur(3px); /* For Safari */
`
const MenuItem = styled.div`
  color: ${props => props.$active ? 'var(--redClaire)' : 'var(--white)'};
  font-size: 1.1rem;
  padding: 1rem 0;
  cursor: pointer;
  transition: all 0.2s;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  
  &:hover {
    color: var(--redClaire);
    transform: translateX(10px);
  }
  &.active {
    color: var(--redClaire);
  }
`
const MenuHeader = styled.div`
  color: var(--redClaire);
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 2rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3); /* Text shadow for better readability on glass */
`
const Texture = styled.h1`
    background-color: white;
    text-transform: capitalize;
    background-position: 50%;
    background-repeat: repeat;
    -webkit-text-fill-color: transparent;
    /* background-image: url("/backs/heading-texture_1heading-texture.webp"); */
    background-clip: text;
    font-size: 42px;
    font-weight: 600;
    line-height: 42px;
    letter-spacing: -.05em;
      @media screen and (min-width: 1024px) {
        font-size: 55px;
        line-height: 65px;
    }
`
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
`
export default function ParlorHero() {
    const [isLeftMenuOpen, setIsLeftMenuOpen] = useState(false)
    const params = useParams()

    const toggleMenu = () => {
        setIsLeftMenuOpen(!isLeftMenuOpen)
    }
    const closeMenu = () => {
        setIsLeftMenuOpen(false)
    }
    const menu = [
        {
            id: "Get My Marketing Plan.",
            name: "Get My Marketing Plan.",
            route: "https://buildydn.com"
        },
        {
            id: "Services.",
            name: "Services.",
            route: "https://buildydn.com/#/growthSupport"
        },
        {
            id: "Free",
            name: "Free Guide",
            route: "https://buildydn.com/#/growthSupport"
        },
        {
            id: "Join The Parlor.",
            name: "Join The Parlor.",
            route: "https://buildydn.com/#/growthSupport"
        }
    ]
    return (
        <div style={{ position: "relative", fontFamily: "'Funnel Display', sans-serif" }}>
            <img
                src="/ai/carbon_bg.webp"
                alt="carbon fiber bg"
                width="1736"
                height="943"
                loading="lazy"
                className="max-h-[100%] h-[100%] opacity-5 w-full object-cover top-0 left-0 pointer-events-none"
                style={{ position: "absolute" }}
            />
            <div className=" w-full pointer-events-none " style={{ position: "relative" }}>
                <nav className="text-sm">
                    <div className="w-full border-b-[1px] border-b-stroke undefined">
                        <article className="w-full max-w-[1428px] mx-auto px-[15px] lg:px-[41px] lg:border-x-[1px] lg:border-stroke " style={{ position: "relative" }}>
                            <WideLeftShades />
                            <div className="border-x-[1px] border-stroke">
                                <div className="justify-center flex w-full " style={{ position: "relative" }}>
                                    <div className="flex flex-col justify-center items-center py-3">
                                        <div className="border-[6px] border-white/50 rounded-full">
                                            <div className="border-[3px] border-white rounded-full">
                                                <img className="w-[60px] h-[60px] rounded-full scale-150" src="/parlor.jpg" alt="" height={168} width={168} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <WideRightShades />
                        </article>
                    </div>
                </nav>
            </div>
            <Overlay $isOpen={isLeftMenuOpen} onClick={closeMenu} />
            <Sidebar $isOpen={isLeftMenuOpen}>
                <MenuHeader>Menu</MenuHeader>
                {menu.map((item, index) => (
                    <MenuItem
                        key={index}
                        onClick={() => {
                            closeMenu();
                            window.open(item.route, '_blank', 'noopener,noreferrer');
                        }}
                        $active={params.name === item.id}
                    >
                        {item.name}
                    </MenuItem>
                ))}
            </Sidebar>
            <div className="w-full border-b-[1px] border-b-[#2b3340] ">
                <article className="w-full max-w-[1428px] mx-auto px-[15px] lg:px-[41px] lg:border-x-[1px] lg:border-[#2b3340] " style={{ position: "relative" }}>
                    <WideLeftShades />
                    <div className="border-x-[1px] border-[#2b3340]">
                        <div className="p-[20px] w-full" style={{ position: "relative" }}>
                            {/* <div className="flex"> */}
                            <div className="space-y-5">
                                <Top top='JOIN THE PARLOR'></Top>
                                <P className="mt-2 text-center px-4 text-pretty" dangerouslySetInnerHTML={{ __html: "“Execution. Connections. Money. One gate. One mission.” <br/><strong>By Dr Truth </strong> </br></br>  It’s free to join. The <strong>results</strong> cost you <strong>action.</strong>" }} />
                                <Texture className="capitalize text-center">You walk into The Parlor, you leave with something changed.</Texture>
                                <P className="mt-2 text-center px-4 text-pretty" dangerouslySetInnerHTML={{ __html: "A deal. </br> A mindset.</br> A Business plan." }} />
                            </div>
                            {/* <LeftContent
                                    top="Marketing is strategy. Advertising is action."
                                    title="Marketing Built for Results"
                                    p="<strong>Your Ads Should Do One Thing:</br>  Attract Buyers Who Say “Yes” Without Hesitation.</strong> <br/>
                                         We build the system that makes that happen.<br/>
                                        "
                                    button="Yes I Want That"
                                /> */}
                            {/* <RightVideo /> */}
                            {/* </div> */}
                        </div>
                    </div>
                    <WideRightShades />
                </article>
            </div >

        </div >
    )
}
