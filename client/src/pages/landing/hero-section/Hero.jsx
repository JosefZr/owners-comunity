import styled, { keyframes } from "styled-components";
import HeroViddeo from "./components/HeroViddeo";
import HeroHeader from "./components/HeroHeader";
import WideLeftShades from "@/pages/ai-automation/components/Shades/WideLeftShades";
import WideRightShades from "@/pages/ai-automation/components/Shades/WideRightShades";
import SmallLeftShades from "@/pages/ai-automation/components/Shades/SmallLeftShades";
import SmallRightShades from "@/pages/ai-automation/components/Shades/SmallRightShades";
import { Link } from "react-router-dom";

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

const HeroSection = styled.div`
  background-color: #02040e;
  position: relative;
  overflow-y: hidden;
  overflow-x: hidden; /* Prevent horizontal overflow */
  width: 100%;
`;

const ContentContainer = styled.div`
  max-width: 1428px;
  margin: 0 auto;
  position: relative;
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
`;

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
`;

// Other styled components remain the same...

export default function Hero() {
  return (
    <HeroSection>
      {/* Desktop Layout */}
      <div className="w-full border-b border-b-[#2b3340] hidden lg:block">
        <ContentContainer className="px-[15px] lg:px-[41px] lg:border-x border-[#2b3340]">
          <WideLeftShades />
          <div className="border-x border-[#2b3340]">
            <div className="space-y-5">
              <HeroViddeo />
              <HeroHeader />
              <div className="flex mt-4 justify-center pb-8">
                <Link to="#">
                  <Div className="hover:scale-105 duration-300 transition-all">
                    <Button className="hover:scale-105 duration-300 transition-all">
                      Get My Plan
                    </Button>
                  </Div>
                </Link>
              </div>
            </div>
          </div>
          <WideRightShades />
        </ContentContainer>
      </div>

      {/* Mobile Layout */}
      <div className="w-full border-b border-b-[#2b3340] lg:hidden">
        <ContentContainer className="px-[15px] lg:px-[41px] lg:border-x border-[#2b3340]">
          <SmallLeftShades />
          <div className="border-x border-[#2b3340]">
            <div className="space-y-5">
              <HeroViddeo />
              <HeroHeader />
              <div className="flex mt-4 justify-center pb-8">
                <Link to="#">
                  <Div className="hover:scale-105 duration-300 transition-all">
                    <Button className="hover:scale-105 duration-300 transition-all">
                      Get My Plan
                    </Button>
                  </Div>
                </Link>
              </div>
            </div>
          </div>
          <SmallRightShades />
        </ContentContainer>
      </div>
    </HeroSection>
  );
}