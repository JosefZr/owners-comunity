import { CtaButton } from "@/components";
import { size } from "@/lib/mediaQuerys";
import styled, { keyframes } from "styled-components";

const dropUp = keyframes`
  0% {
    transform: translateY(100%);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
`;

const HeroSection = styled.section`
  /* background-image: url("/backs/dentist-landing-1.svg"); */
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  position: relative;
  display: flex;
  justify-content: center;
  background-color: #02040e;
`;
const Content = styled.div`
  text-align: center;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: -2rem;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  /* gap: 10px; */
  animation: ${dropUp} 0.5s ease-out forwards;

 
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
const Subtitle = styled.div`
    font-size: 14px;
    text-transform: uppercase;
    background-clip: text;
    letter-spacing: 3px;
    line-height: 1;
    font-weight: 400;
    line-height: 14px;
    color: #fff;
    text-align: center;
    font-family: "Open Sans", sans-serif;

`
const SubtitleGold = styled.div`
  font-family: "Open Sans", sans-serif;

    font-size: 14px;
    font-weight: 400;
    line-height: 14px;
    color: #fff;
    text-align: center;
    -webkit-text-fill-color: transparent;
    -webkit-background-clip: text;
    background-clip: text;
    background-image: linear-gradient(126deg,#BC1823,#BC1823);
    text-transform: uppercase;
`
const Title = styled.div`
  font-size: 30px;
  font-weight: 600;
  font-family: var(--font-sf);
  letter-spacing: 0;
  text-align: center;
  color: #fff;
  font-family: "Open Sans", sans-serif;

  
  @media screen and (min-width: ${size.laptopM}){
    font-size: 38px;
  }
`
const TitleGold = styled.div`
  font-family: "Open Sans", sans-serif;
  font-size: 30px;
  font-weight: 600;
  font-family: var(--font-sf);
  letter-spacing: 0;
  text-align: center;
  color: #fff;
  -webkit-text-fill-color: transparent;
    -webkit-background-clip: text;
    background-clip: text;
    background-image: linear-gradient(126deg,#BC1823,#BC1823);
  @media screen and (min-width: ${size.laptopM}){
    font-size: 38px;
  }
`
const Description = styled.div`
  margin: 0 0 24px;
  font-size: 16px;
  font-weight: 500;
  padding: 0 16px;
  text-align: center;
  color: hsla(0, 0%, 100%, .7);
  font-family: "Open Sans", sans-serif;
`
const Bad = styled.div`
  background: #212833;
    display: flex;
    justify-content: center;
    border: 3px solid #212833;
    cursor: pointer;
    &:hover{
    width: 100%;
    box-shadow: 0 4px 75px 0 rgba(0, 0, 0, .95);
    }
`
const ButtonBad = styled.button`
    background: #212833;
    font-size: 20px;
    line-height: 25px;
    font-weight: 400;
    cursor: pointer;
    text-align: center;
    color: hsla(0, 0%, 100%, .5);
    text-align: center;
    padding: 17px 37px;
    width: 100%;
`
const Good = styled.div`
  border: 4px solid;
    border-image-slice: 4;
    border-image-source: linear-gradient(92.15deg, #ffcf23 2.09%, #ff8d3a 86.55%);
    overflow: hidden;
    position: relative;
    display: flex
;
    align-items: center;
    justify-items: center;
    text-align: center;
`
const ButtonGood = styled.div`
  background: linear-gradient(100.33deg, rgba(255, 207, 35, .2) 5.1%, rgba(255, 141, 58, .2) 83.56%);
    box-shadow: 0 4px 50px 0 rgba(254, 180, 75, .24);
    color: #fff;
    backdrop-filter: blur(25px);
    font-size: 22px;
    font-weight: 600;
    line-height: 22px;
    text-align: center;
    padding: 16px 26px;
    width: 100%;
`
// import { useState } from "react";
import HeroViddeo from "./components/HeroViddeo";
import HeroHeader from "./components/HeroHeader";
import WideLeftShades from "@/pages/ai-automation/components/Shades/WideLeftShades";
import WideRightShades from "@/pages/ai-automation/components/Shades/WideRightShades";
import SmallLeftShades from "@/pages/ai-automation/components/Shades/SmallLeftShades";
import SmallRightShades from "@/pages/ai-automation/components/Shades/SmallRightShades";
import { Link } from "react-router-dom";

// eslint-disable-next-line react/prop-types
export default function Hero() {

  return (
    <div style={{ position: "relative", fontFamily: "'Funnel Display', sans-serif" }}>

      <div className="w-full border-b-[1px] border-b-[#2b3340] hidden lg:block">

        <div className="w-full max-w-[1428px] mx-auto px-[15px] lg:px-[41px] lg:border-x-[1px] lg:border-[#2b3340] " style={{ position: "relative" }}>

          <WideLeftShades />
          <div className="border-x-[1px] border-[#2b3340]">

            <div className="space-y-5">
              <HeroViddeo />
              {/* <div className="flex w-full gap-12 lg:gap-0 flex-col lg:flex-row items-center justify-evenly mt-4 lg:mt-32 max-w-[1280px] mx-auto">
                <div className="max-w-[320px] pt-2 mt-0">
                  <Subtitle>FAIL TO ACHIEVE</Subtitle>
                  <Title>Stay Stagnant</Title>
                  <Description>
                    • Work long hours for mediocre pay
                    <br />
                    • Hope to retire in 50 years after decades of stress
                  </Description>
                  <a href="">
                    <Bad style={{position:"relative"}} className="overflow-hidden flex items-center justify-center text-center w-auto duration-500 transition-all">
                      <ButtonBad className="uppercase duration-500 transition-all">Remain an Employee</ButtonBad>
                    </Bad>
                  </a>
                </div>
                <div className="hidden lg:block">
                  <img alt="Versus" loading="lazy" width="82" height="82" decoding="async" data-nimg="1" srcset="	https://www.jointherealworld.com/_next/image?url=%2Fvs.png&w=256&q=75" src="	https://www.jointherealworld.com/_next/image?url=%2Fvs.png&w=256&q=75" style={{ color: "transparent" }} />
                </div>
                <div className="max-w-[320px] pt-2 mt-0">
                  <SubtitleGold >pay</SubtitleGold>
                  <TitleGold>$59.99</TitleGold>
                  <Description>
                    <div className="text-my-white">
                      Unlock the blueprint to a stress-free, high-profit clinic. & Master the business side of dentistry & scale FAST
                    </div>
                  </Description>
                  <a href="">
                    <Good  className="button-container duration-500 transition-all w-full hover:w-[105%] hover:ml-[-2.5%] group">
                      <ButtonGood className="uppercase duration-500 transition-all alt !text-[20px] lg:!text-[22px]">BUILD YOUR DENTAL NETWROK</ButtonGood>
                      <div style={{
                        willChange:"height,width,top,left",position:'absolute'
                      }} className="left-[50%] top-[50%] w-[0px] h-[0px] bg-[#ffffff1a] rounded-full 
                                        group-hover:w-[500px] group-hover:h-[500px] duration-500 transition-all 
                                        pointer-events-none text-center group-hover:left-[calc(50%-250px)] group-hover:top-[calc(50%-250px)]"></div>
                    </Good>
                  </a>
                </div>
              </div> */}
              <HeroHeader />
              <CtaButton content="Get My Plan " />
            </div>
          </div>


          <WideRightShades />
        </div>
      </div>
      <div className="w-full border-b-[1px] border-b-[#2b3340] lg:hidden">
        <article className="w-full max-w-[1428px] mx-auto px-[15px] lg:px-[41px] lg:border-x-[1px] lg:border-[#2b3340]" style={{ position: "relative" }}>
          <SmallLeftShades />
          <div className="border-x-[1px] border-[#2b3340]">
            <div className="space-y-5">
              <HeroViddeo />
              {/* <div className="flex w-full gap-12 lg:gap-0 flex-col lg:flex-row items-center justify-evenly mt-4 lg:mt-32 max-w-[1280px] mx-auto">
                <div className="max-w-[320px] pt-2 mt-0">
                  <Subtitle>FAIL TO ACHIEVE</Subtitle>
                  <Title>Stay Stagnant</Title>
                  <Description>
                    • Work long hours for mediocre pay
                    <br />
                    • Hope to retire in 50 years after decades of stress
                  </Description>
                  <a href="">
                    <Bad style={{position:"relative"}} className="overflow-hidden flex items-center justify-center text-center w-auto duration-500 transition-all">
                      <ButtonBad className="uppercase duration-500 transition-all">Remain an Employee</ButtonBad>
                    </Bad>
                  </a>
                </div>
                <div className="hidden lg:block">
                  <img alt="Versus" loading="lazy" width="82" height="82" decoding="async" data-nimg="1" srcset="	https://www.jointherealworld.com/_next/image?url=%2Fvs.png&w=256&q=75" src="	https://www.jointherealworld.com/_next/image?url=%2Fvs.png&w=256&q=75" style={{ color: "transparent" }} />
                </div>
                <div className="max-w-[320px] pt-2 mt-0">
                  <SubtitleGold >pay</SubtitleGold>
                  <TitleGold>$59.99</TitleGold>
                  <Description>
                    <div className="text-my-white">
                      Unlock the blueprint to a stress-free, high-profit clinic. & Master the business side of dentistry & scale FAST
                    </div>
                  </Description>
                  <a href="">
                    <Good  className="button-container duration-500 transition-all w-full hover:w-[105%] hover:ml-[-2.5%] group">
                      <ButtonGood className="uppercase duration-500 transition-all alt !text-[20px] lg:!text-[22px]">BUILD YOUR DENTAL NETWROK</ButtonGood>
                      <div style={{
                        willChange:"height,width,top,left",position:'absolute'
                      }} className="left-[50%] top-[50%] w-[0px] h-[0px] bg-[#ffffff1a] rounded-full 
                                        group-hover:w-[500px] group-hover:h-[500px] duration-500 transition-all 
                                        pointer-events-none text-center group-hover:left-[calc(50%-250px)] group-hover:top-[calc(50%-250px)]"></div>
                    </Good>
                  </a>
                </div>
              </div> */}
              <HeroHeader />
              <div className="flex mt-4 justify-center pb-8">
                <Link>
                  <Div className="hover:scale-105 duration-300 transition-all ">
                    <Button className="hover:scale-105 duration-300 transition-all">
                      Get My Plan
                    </Button>
                  </Div>
                </Link>
              </div>

            </div>
          </div>
          <SmallRightShades />
        </article>
      </div>

    </div >
  );
}
