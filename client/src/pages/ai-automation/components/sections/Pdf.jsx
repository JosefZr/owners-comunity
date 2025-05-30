import styled from "styled-components";
import WideLeftShades from "../Shades/WideLeftShades";
import WideRightShades from "../Shades/WideRightShades";
import SmallLeftContent from "../SmallLeftContent";
import Subtitle from "../Subtitle";
import { Link } from "react-router-dom";
import { CtaButton } from "@/components";

const Special = styled.h1`
    color: hsla(0, 0%, 100%, .21);
    font-size: 15px;
    line-height: 30px;
    letter-spacing: -3%;
`
const HeroHeading = styled.h1`
    margin-top: 2rem;
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
    line-height: 50px;
    text-align: center;
    @media screen and (max-width: 991px) {
        font-size: 30px;
        line-height: 34px;
    }
    a {
        color: inherit;
        text-decoration: none;
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
        line-height: 28px;
    }
`
const CaseStudyLink = styled.a`
    display: block;
    text-align: center;
    margin-top: 12px;
    font-weight: 600;
    color: #fff;
    text-decoration: underline;
    &:hover {
        opacity: 0.8;
    }
`;
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
export default function Pdf() {
    return (
        <div style={{ position: "relative", fontFamily: "'Funnel Display', sans-serif" }}>
            <div className="w-full border-b-[1px] border-b-[#2b3340] block">
                <article className="w-full max-w-[1428px] mx-auto px-[15px] lg:px-[41px] lg:border-x-[1px] lg:border-[#2b3340]" style={{ position: "relative" }}>
                    <WideLeftShades />
                    <div className="border-x-[1px] border-[#2b3340]">
                        <div className="lg:p-[30px] p-2 w-full" style={{ position: "relative" }}>
                            <div className="mt-5">
                                <HeroHeading>
                                    Wanna See How I Built This Business From Zero?
                                </HeroHeading>
                                <P className="mt-4 max-w-[550px] text-center mx-auto">
                                    How I generated 600+ leads, built the systems, launched the ads, and scaled a cold start into a revenue machine — <strong>in under 6 months. </strong>
                                </P>
                                <P className="mt-4 max-w-[550px] text-center mx-auto">
                                    Just real world results.
                                </P>
                                <div className="flex flex-row w-full text-center items-center justify-center gap-5 pb-5">
                                    <div className="flex mt-8 justify-center">
                                        <Link
                                            target="_blank"
                                            to={"https://docs.google.com/document/d/1PRoBoyc2TCyF9UWCNVkdngW6CaQ2iIvmEnOWP2ZZEDs/edit?usp=sharing"}
                                        >
                                            <Div className="hover:scale-105 duration-300 transition-all ">
                                                <Button className="hover:scale-105 duration-300 transition-all">
                                                    SEE THE CASE STUDY
                                                </Button>
                                            </Div>
                                        </Link>
                                    </div>
                                    {/* <div className="flex mt-8 justify-center">
                                        <Link
                                            target="_blank"
                                            to={"https://docs.google.com/document/d/1PRoBoyc2TCyF9UWCNVkdngW6CaQ2iIvmEnOWP2ZZEDs/edit?usp=sharing"}>
                                            <Div className="hover:scale-105 duration-300 transition-all ">
                                                <Button className="hover:scale-105 duration-300 transition-all">
                                                    Yes I Need That
                                                </Button>
                                            </Div>
                                        </Link>
                                    </div> */}
                                </div>
                            </div>
                        </div>
                    </div>
                    <WideRightShades />
                </article>
            </div>
        </div>
    );
}
