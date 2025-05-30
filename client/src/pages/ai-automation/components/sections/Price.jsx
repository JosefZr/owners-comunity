import styled from "styled-components";
import WideLeftShades from "../Shades/WideLeftShades";
import { Link } from "react-router-dom";
import WideRightShades from "../Shades/WideRightShades";
import SmallLeftShades from "../Shades/SmallLeftShades";
import SmallRightShades from "../Shades/SmallRightShades";

const Texture = styled.h1`
    background-color: white;
    text-transform: capitalize;
    background-position: 50%;
    background-repeat: repeat;
    -webkit-text-fill-color: transparent;
    /* background-image: url("/backs/heading-texture_1heading-texture.webp"); */
    background-clip: text;
    font-size: 34px;
    font-weight: 600;
    line-height: 42px;
    letter-spacing: -.05em;
`
const P = styled.p`
    font-size: 18px;
    font-weight: 500;
    line-height: 26px;
    text-align: center;
    color: hsla(0, 0%, 100%, .7);
    margin: 0 auto;
    @media screen and (min-width: 1024px) {
        font-size: 22px;
    }
    @media screen and (min-width: 1024px) {
        line-height: 28px;
    }
`
const P1 = styled.p`
    font-size: 18px;
    font-weight: 500;
    line-height: 26px;
    color: white;
    @media screen and (min-width: 1024px) {
        font-size: 22px;
    }
    @media screen and (min-width: 1024px) {
        line-height: 28px;
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
        min-width: 450px;
        font-size: 28px;
        line-height: 35px;
        padding: 20px 52px;
        width: auto;
    }
`
export default function Prices() {
    return (
        <div className="reveal-vertical" style={{ position: "relative", fontFamily: "'Funnel Display', sans-serif" }}>
            <div className="w-full border-b-[1px] border-b-[#2b3340] hidden lg:block">
                <article className="w-full max-w-[1428px] items-center mx-auto px-[15px] lg:px-[41px] lg:border-x-[1px] lg:border-[#2b3340]" style={{ position: "relative" }}>
                    <WideLeftShades />
                    <div className="border-x-[1px] border-[#2b3340] ">
                        <div className="lg:p-[60px] p-2 w-full" style={{ position: "relative" }}>
                            <Texture className="capitalize text-center">OK... But What Makes You Different?</Texture>
                        </div>
                    </div>

                    <div className="flex border-t-[1px] border-t-[#2b3340]">
                        <div className="w-1/3 border-x-[1px] border-x-[#2b3340]">
                            <div className="lg:p-[30px]  p-2 w-full " style={{ position: "relative" }}>
                                <div className="flex justify-center items-center flex-col">
                                    <Texture className="my-2 capitalize text-center justify-self-end">We Guarantee Results.</Texture>
                                </div>
                            </div>
                        </div>
                        <div className="w-1/3 ">
                            <div className="lg:py-[30px] p-2 w-full " style={{ position: "relative" }}>
                                <div className="flex justify-center items-center flex-col">
                                    <Texture className="mt-2 capitalize text-center justify-self-center">We’re Local & Reachable.</Texture>
                                </div>
                            </div>
                        </div>
                        <div className="w-1/3 border-x-[1px] border-x-[#2b3340]">
                            <div className="lg:py-[30px] p-2 w-full " style={{ position: "relative" }}>
                                <div className="flex justify-center items-center flex-col">
                                    <Texture className="mt-2 capitalize text-center justify-self-start">We Specialize.</Texture>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex">
                        <div className="w-1/3 border-x-[1px] border-x-[#2b3340]">
                            <div className="p-[15px] w-full  undefined">
                                <div className="flex justify-center">
                                    <div className="flex flex-col justify-center gap-4">
                                        <div className="flex gap-4 items-center">
                                            <P >If you don’t win, we don’t eat.</P>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-1/3 ">
                            <div className=" w-full ">
                                <div className="p-[15px] w-full  undefined">
                                    <div className="flex justify-center">
                                        <div className="flex flex-col justify-center gap-4">
                                            <div className="flex gap-4 items-center">
                                                <P >We only work in the niches we dominate. That’s how we win.</P>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className="w-1/3 border-x-[1px] border-x-[#2b3340]">
                            <div className="p-[15px] w-full  undefined">
                                <div className="flex justify-center">
                                    <div className="flex flex-col justify-center gap-4">
                                        <div className="flex gap-4 items-center">
                                            <P >Stop losing patients when you&apos;re not available</P>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex border-t-[1px] border-t-[#2b3340] border-x-[1px] border-x-[#2b3340]">
                        <div className="lg:p-[60px] p-2 w-full " style={{ position: "relative" }}>
                            <div className="flex justify-center mt-2">
                                <Link>
                                    <Div >
                                        <Button className="hover:scale-105 duration-300 transition-all">
                                            Let’s Get To Work
                                        </Button>

                                    </Div>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <WideRightShades />
                </article>
            </div>
            <div className="w-full border-b-[1px] border-b-[#2b3340] lg:hidden">
                <div className="w-full max-w-[1428px] mx-auto px-[15px] lg:px-[41px] lg:border-x-[1px] lg:border-[#2b3340]">
                    <SmallLeftShades />
                    <div className="border-x-[1px] border-[#2b3340]">
                        <div className="border-t-[1px] border-t-[#2b3340]">
                            <div className="border-b-[1px] border-b-[#2b3340] pb-2 py-4">
                                <div className="lg:p-[60px] p-2 w-full " style={{ position: "relative" }}>
                                    <div className="flex justify-center items-center">
                                        <div className="flex justify-center items-center flex-col">
                                            <Texture className="mb-3 capitalize text-center">We Guarantee Results.</Texture>
                                        </div>
                                    </div>
                                </div>
                                <div className="lg:p-[60px] p-2 w-full border-t-[1px] border-t-[#2b3340]" style={{ position: "relative" }}>
                                    <div className="flex justify-center">
                                        <div className="flex flex-col justify-center gap-4 my-4">
                                            <div className="flex gap-4 items-center">
                                                <P >If you don’t win, we don’t eat.</P>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="border-b-[1px] border-b-[#2b3340] pb-2 py-4">
                                <div className="lg:p-[60px] p-2 w-full " style={{ position: "relative" }}>
                                    <div className="flex justify-center items-center">
                                        <div className="flex justify-center items-center flex-col">
                                            <Texture className="mb-3 capitalize text-center">We’re Local & Reachable.</Texture>
                                        </div>
                                    </div>
                                </div>
                                <div className="lg:p-[60px] p-2 w-full border-t-[1px] border-t-[#2b3340]" style={{ position: "relative" }}>
                                    <div className="flex justify-center">
                                        <div className="flex flex-col justify-center gap-4 my-4">
                                            <div className="flex gap-4 items-center">
                                                <P> We only work in the niches we dominate. That’s how we win.</P>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="border-b-[1px] border-b-[#2b3340] pb-2 py-4">
                                <div className="lg:p-[60px] p-2 w-full " style={{ position: "relative" }}>
                                    <div className="flex justify-center items-center">
                                        <div className="flex justify-center items-center flex-col">
                                            <Texture className="mb-3 capitalize text-center">We Specialize.</Texture>
                                        </div>
                                    </div>
                                </div>
                                <div className="lg:p-[60px] p-2 w-full border-t-[1px] border-t-[#2b3340]" style={{ position: "relative" }}>
                                    <div className="flex justify-center">
                                        <div className="flex flex-col justify-center gap-4 my-4">
                                            <div className="flex gap-4 items-center">
                                                <P > Stop losing patients when you&apos;re not available.</P>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex border-x-[1px] border-x-[#2b3340]">
                                <div className="p-[30px] w-full " style={{ position: "relative" }}>
                                    <div className="flex justify-center">
                                        <Link>
                                            <Div >
                                                <Button className="hover:scale-105 duration-300 transition-all">
                                                    Let’s Get To Work
                                                </Button>

                                            </Div>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <SmallRightShades />
                </div>
            </div>
        </div>
    )
}
