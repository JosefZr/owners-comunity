import { CtaButton } from "@/components"
import styled from "styled-components"
import { FaCheck } from "react-icons/fa6"
import { FaRegWindowClose } from "react-icons/fa"
import { useTranslation } from "react-i18next"
import { GiLaurelCrown } from "react-icons/gi"
import "../../exclusive/index.css"
import "../index.css"
import { RiMoneyDollarCircleLine } from "react-icons/ri"

export const GetChecks = (actor) => {
  const { t } = useTranslation()

  const transformDescriptionToTable = (description) => {
    return description
      .split(".")
      .map((item) => item.trim())
      .filter((item) => item.length > 0)
  }

  return transformDescriptionToTable(t(`${actor}.plans.paid.checks`))
}

const Cta = styled.div`
    width: 100%;
    max-width: 450px;
    background: url(https://www.jointherealworld.com/card1.png);
    background-position: 50%;
    padding: 31px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    position: relative;
    overflow: hidden;
    border-radius: 12px;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    height: 100%;
    
    @media screen and (max-width: 1024px) {
        margin-top: 20px;
        width: 100%;
    }
    
    @media screen and (min-width: 1024px) {
        min-height: 756px;
    }
    
    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 20px 40px #250305;
    }
    
    &:hover .glow-effect {
      opacity: 0.3;
    }
`

const IconImbedCustom = styled.div`
  flex-direction: column;
  margin: 0 auto;
  width: 4rem;
  height: 3.125rem;
  display: flex;
`

const SVGPrice = styled.div`
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 75%;
  gap: .3rem;
  height: 1.25rem;
  display: flex;
  
  font-family: 'Doawnloawd', sans-serif;
  font-size: 16px;
  font-weight: 500;
  line-height: 18px;
  color: #fff;
  padding: 0 32px;
  
  @media screen and (min-width: 1024px) {
    font-size: 18px;
    line-height: 22px;
  }
`

const GradientText = styled.h3`
  -webkit-text-fill-color: transparent;
  -webkit-background-clip: text;
  background-clip: text;
  background-image: linear-gradient(126deg, #ff6161, var(--redClaire));
  margin-left: 8px;
`

const GradientIcon = styled.div`
  background-image: linear-gradient(126deg, #ff7e7e, var(--redClaire));
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  
  svg {
    font-size: 1.5rem;
  }
`

const H2 = styled.h2`
  font-weight: 700;
  line-height: 1;
  font-size: 35px;
  line-height: 32px;
  margin-top: 19px;
  background-image: linear-gradient(126deg, #ff7e7e, var(--redClaire));
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;

`

const PriceBad = styled.div`
  font-family: 'Doawnloawd', sans-serif;
  line-height: 64px;
  letter-spacing: -.05em;
  font-size: 32px;
  font-weight: 400;
  color: #ffffff47;
`

const Price = styled.div`
  font-family: 'cg', sans-serif;
  line-height: 64px;
  letter-spacing: -.05em;
  background-image: linear-gradient(126deg, #ff7e7e, var(--redClaire));
  font-size: 41px;
  -webkit-text-fill-color: transparent;
  -webkit-background-clip: text;
  background-clip: text;
  font-weight: 500;
  color: #8d8f92;
`

const Description = styled.div`
  font-family: 'Doawnloawd', sans-serif;
  font-size: 16px;
  font-weight: 500;
  line-height: 18px;
  color: #fff;
  padding: 0 22px;
  
  @media screen and (min-width: 1024px) {
    font-size: 18px;
    line-height: 22px;
  }
`

const Small = styled.div`
  font-family: 'Doawnloawd', sans-serif;
  font-size: 16px;
  font-weight: 200;
  line-height: 14px;
  color: hsla(0, 0%, 100%, .5);
`

const GlowEffect = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 30%;
  background: var(--redClaire);
  filter: blur(100px);
  opacity: 0;
  pointer-events: none;
  border-radius: 12px;
  transition: opacity 0.5s ease;
  z-index: 1;
`

const ContentWrapper = styled.div`
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  flex: 1;
`

// eslint-disable-next-line react/prop-types
export default function CtaPreniumCard({ actor }) {
  const { t } = useTranslation()
  const checks = GetChecks(actor)

  return (
    <Cta>
      {/* Glow effect div */}
      <GlowEffect className="glow-effect" />

      <ContentWrapper>
        <IconImbedCustom>
          <GiLaurelCrown className="h-14 w-auto text-my-red" />
        </IconImbedCustom>
        <H2 className="text-center ">ZIRCONIUM PLAN</H2>
        <div className="w-[240px] mx-auto h-[1px] bg-[#383531] mt-8"></div>
        <div className="flex items-center justify-center gap-4 mt-4">
          <PriceBad className="price-bad line-through">$149</PriceBad>
          <Price className="price gradient-text-2">$59.99</Price>
        </div>
        <div>
          {checks.map((check, index) => (
            <div key={index} className="flex items-center mt-6">
              <FaCheck className="h-5 w-7 text-white" />
              <Description>{check}</Description>
            </div>
          ))}
          <div className="w-full h-[1px] bg-[#383531] my-8"></div>
        </div>

        <Description className="flex items-center description gap-4 mt-4">
          <FaRegWindowClose className="self-center" />
          <h3>{t(`${actor}.plans.paid.cta`)}</h3>
        </Description>
        <SVGPrice className="flex items-center gap-4 mt-4 " style={{ justifyContent: "start" }}>
          <GradientIcon>
            <RiMoneyDollarCircleLine className="text-my-red" />
          </GradientIcon>
          <GradientText className="text-nowrap">{t(`${actor}.plans.paid.cta2`)}</GradientText>
        </SVGPrice>
        <Description className="flex items-center gap-4 mt-4">
          <Small>Lock in your price before it increases</Small>
        </Description>
      </ContentWrapper>

      <div className="w-fit lg:max-w-[36rem] mt-10 relative z-2">
        <CtaButton isSmall={true} />
      </div>
    </Cta>
  )
}

