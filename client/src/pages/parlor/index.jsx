import Get from "./components/Get";
import ParlorHero from "./components/ParlorHero";


export default function Parlor() {
    return (
        <div className="overflow-y-scroll h-[100vh] custom-scroll">
            <ParlorHero />
            <Get />
        </div>
    )
}
