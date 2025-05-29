import { Link } from "react-router-dom";
import WideLeftShades from "../Shades/WideLeftShades";
import WideRightShades from "../Shades/WideRightShades";
import styled from "styled-components";

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
const paragraph =[
    {
        p:" Your Dental Network",
        url:"https://buildydn.com"
    },
    {
        p:"Marketing 1.2.3",
        url:"https://buildydn.com/#/growthSupport"
    },
    {
        p:"Free Guide",
        url:"https://buildydn.com/#/growthSupport"
    }
]
export default function LastSection() {
    return (
        <div className="w-full border-b-[1px] border-b-stroke undefined" style={{position:"relative",fontFamily:"'Funnel Display', sans-serif"}}>
            <div className="w-full max-w-[1428px] mx-auto px-[15px] lg:px-[41px] lg:border-x-[1px] lg:border-stroke" style={{position:"relative"}}>
                <WideRightShades/>
                <div className="border-x-[1px] border-stroke">
                    <div className="lg:p-[60px] p-2 w-full" style={{position:"relative"}}>
                        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 py-4 lg:py-0">
                        {paragraph.map((item, index) => (
                                <Link key={index} to={item.url} className="flex flex-col items-center justify-center gap-2" target="_blank">
                                    <P className="mt-2 text-center px-4 text-pretty" >
                                        {item.p}    
                                    </P>               
                                </Link>
                            ))}            
                        </div>
                    </div>
                    <div className="flex flex-col lg:flex-row border-t-[1px] border-t-stroke">
                        <div className="lg:w-1/2 lg:border-r-[1px] lg:border-r-stroke  py-4 lg:py-0">
                            <div className="lg:p-[30px] p-2 w-full " style={{position:"relative"}}>
                                <p className="text-sm text-white/50 text-center lg:text-left">
                                    <strong className="text-white">Dr. Truth Says:</strong> <br />
                                    <strong className="text-white">AI</strong> won’t replace real connection.
                                    The human touch? That’s still yours. <br /><br />
                                    <strong className="text-white">But</strong>  it can take the pressure off—by handling the repetitive stuff… <br />
                                    So your team can focus on what matters: patients. <br /><br />

                                    We’re not replacing care. <br />
                                    <strong className="text-white">We’re giving you more time to deliver it.</strong>
                                </p>
                            </div>
                        </div>
                        <div className="lg:w-1/2 border-t-[1px] border-t-stroke lg:border-none ">
                            <div className="lg:p-[30px] p-2 w-full" style={{position:"relative"}}>
                                <div className="flex flex-col gap-8 lg:gap-0 lg:flex-row items-center justify-between  py-4 lg:py-0  mt-28">
                                    <div>
                                    <p className="text-sm text-white/50 text-center lg:text-left mb-4 lg:mb-0">Support</p>
                                    <a href="mailto:dr.truth@buildydn.com" className="flex justify-end pointer-events-auto items-center text-center lg:text-left">dr.truth@buildydn.com</a>
                                    </div>
                                    <div className="flex justify-end pointer-events-auto items-center">
                                    <div className="border-[4px] border-[#2b334079]">
                                        <div className="border-[2px] border-[#2b3340be]">
                                            <div className="transition-all duration-500 flex w-auto gap-3 py-2 px-3 border-stroke hover:border-[#6a6d6f] border-[1px] hover:bg-[#202326]">
                                                <img src="	https://www.cobratate.com/jointherealworld/login_icon.png" alt="a"  height={20} width={20}/>
                                                <Link to={"https://buildydn.com/#/login" } target="_blank">LOG IN</Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </div>
                <WideLeftShades/>
            </div>
        </div>
    )
}
