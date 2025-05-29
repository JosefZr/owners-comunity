import Hero from "./components/sections/Hero";
import Section2 from "./components/sections/Section2";
import ReverseSection from "./components/sections/ReverseSection";
import Services from "./components/sections/Services";
import AfterServices from "./components/sections/AfterServices";
import Prices from "./components/sections/Price";
import Questions from "./components/sections/Questions";
import LastSection from "./components/sections/LastSection";
import TopBar from "./components/sections/topBar";
import HeroAi from "../../pages/landing/hero-section/Hero";
export default function AiAutomation() {
    return (
        <div className="overflow-y-scroll h-[100vh] custom-scroll">
            <TopBar />
            <Hero />
            <HeroAi />
            {/* <Section2 /> */}
            {/* <ReverseSection /> */}
            <Services />
            {/* <AfterServices /> */}
            <Prices />
            <Questions />
            <LastSection />
        </div>
    )
}
