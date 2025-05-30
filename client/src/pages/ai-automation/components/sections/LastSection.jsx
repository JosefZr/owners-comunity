import { Link } from "react-router-dom";
import WideLeftShades from "../Shades/WideLeftShades";
import WideRightShades from "../Shades/WideRightShades";
import styled from "styled-components";
import { FaInstagram, FaLinkedinIn, FaWhatsapp } from "react-icons/fa6";

const P = styled.p`
    font-size: 28px;
    font-weight: 500;
    line-height: 26px;
    color: hsla(0, 0%, 100%, .7);
    @media screen and (min-width: 1024px) {
        line-height: 28px;
    }
    @media screen and (min-width: 1024px) {
            font-size: 22px;
    }
`
const SocialLink = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-2px);
  }
  
  img {
    width: 16px;
    height: 16px;
    filter: brightness(0) invert(1); /* Makes icons white */
  }
`;
// Added social media icons
const SocialIcons = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 16px;
  justify-content: center;
  
  @media (min-width: 1024px) {
    justify-content: flex-start;
  }
`;
const paragraph = [
    {
        p: " Your Dental Network",
        url: "https://buildydn.com"
    },
    {
        p: "Marketing 1.2.3",
        url: "https://www.yourdentalnetwork.com/"
    },
    {
        p: "Free Guide",
        url: "https://buildydn.com/#/growthSupport"
    }
]
const socialLinks = [
    {
        name: "instagram",
        url: "https://www.instagram.com/wc_marketingg/?__pwa=1",
        icon: <FaInstagram />
    },
    {
        name: "Linkedin",
        url: "https://www.linkedin.com/in/dr-truth-a19783362/",
        icon: <FaLinkedinIn />
    },
    {
        name: "whatsapp",
        url: "https://wa.me/79872346805",
        icon: <FaWhatsapp />
    }
];

export default function LastSection() {
    return (
        <div className="w-full border-b-[1px] border-b-stroke undefined" style={{ position: "relative", fontFamily: "'Funnel Display', sans-serif" }}>
            <div className="w-full max-w-[1428px] mx-auto px-[15px] lg:px-[41px] lg:border-x-[1px] lg:border-stroke" style={{ position: "relative" }}>
                <WideRightShades />
                <div className="border-x-[1px] border-stroke">
                    <div className="lg:p-[60px] p-2 w-full" style={{ position: "relative" }}>
                        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 py-4 lg:py-0">
                            {paragraph.map((item, index) => (
                                <Link key={index} to={item.url} className="flex flex-col items-center justify-center gap-2 cursor-pointer" target="_blank">
                                    <P className="mt-2 text-center px-4 text-pretty" >
                                        {item.p}
                                    </P>
                                </Link>
                            ))}
                        </div>
                    </div>
                    <div className="flex flex-col lg:flex-row border-t-[1px] border-t-stroke">
                        <div className="lg:w-1/2 lg:border-r-[1px] lg:border-r-stroke  py-4 lg:py-0">
                            <div className="lg:p-[30px] p-2 w-full " style={{ position: "relative" }}>
                                <p className="text-sm text-white/50 text-center lg:text-left">
                                    We help businesses <strong className="text-white">grow</strong> through <strong className="text-white">systems</strong> that actually <strong className="text-white">convert</strong> <br /><br />
                                    We don’t just run ads — <strong className="text-white">we build the full setup: </strong> offers, funnels, bots, and strategy. <br /><br />
                                    Everything we do is <strong className="text-white">focused on </strong>one thing: <strong className="text-white">getting you </strong> real, trackable  <strong className="text-white">results.</strong><br />
                                </p>
                            </div>
                        </div>
                        <div className="lg:w-1/2 border-t-[1px] border-t-stroke lg:border-none ">
                            <div className="lg:p-[30px] p-2 w-full" style={{ position: "relative" }}>
                                <div className="flex flex-col gap-8 lg:gap-0 lg:flex-row items-center justify-between  py-4 lg:py-0  ">
                                    {/* Added social media icons */}
                                    <div className="flex flex-col-reverse gap-3">
                                        {/* Social icons above support */}
                                        <SocialIcons>
                                            {socialLinks.map((social, index) => (
                                                <SocialLink
                                                    key={index}
                                                    href={social.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    aria-label={social.name}
                                                >
                                                    {social.icon}
                                                </SocialLink>
                                            ))}
                                        </SocialIcons>
                                        <div>
                                            <p className="text-sm text-white/50 text-center lg:text-left mb-4 lg:mb-0">Support</p>
                                            <a href="mailto:dr.truth@buildydn.com" className="flex justify-end pointer-events-auto items-center text-center lg:text-left">dr.truth@buildydn.com</a>
                                        </div>
                                    </div>
                                    <div className="flex justify-end pointer-events-auto items-center">
                                        <div className="border-[4px] border-[#2b334079]">
                                            <div className="border-[2px] border-[#2b3340be]">
                                                <div className="transition-all duration-500 flex w-auto gap-3 py-2 px-3 border-stroke hover:border-[#6a6d6f] border-[1px] hover:bg-[#202326]">
                                                    <img src="	https://www.cobratate.com/jointherealworld/login_icon.png" alt="a" height={20} width={20} />
                                                    <Link to={"https://buildydn.com/#/login"} target="_blank">The Parlor</Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                <WideLeftShades />
            </div>
        </div>
    )
}