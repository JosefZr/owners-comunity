import SmallWelcom from "./SmallWelcom";
import SmallProgress from "./SmallProgress";
import SmallBalence from "./SmallBalence";
import SmallCoat from "./SmallCoat";
import { FaLongArrowAltRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";


export default function Home({ handleClose }) {
    const navigate = useNavigate()
    return (
        <div className="carousel-item relative h-[calc(100dvh-10rem)] w-full overflow-hidden"
            style={{ scrollSnapStop: "always", overflowAnchor: "auto", scrollSnapAlign: "start" }}
        >

            <div style={{ position: "relative" }} className=" size-full animate-fade-in">
                <div
                    className="scrollbar-custom  flex h-full w-full flex-col items-stretch justify-start gap-5 overflow-y-scroll overscroll-y-none bg-next-midnight p-6 swipe-dialog-scroll-descendant"
                    style={{ backgroundColor: "rgb(6 14 21 )" }}
                >
                    <img
                        src="/ai/carbon_bg.webp"
                        alt="carbon fiber bg"
                        width="1736"
                        height="943"
                        loading="lazy"
                        className="max-h-[100%] h-[100%] opacity-5 w-full object-cover top-0 left-0 pointer-events-none"
                        style={{ position: "absolute" }}
                    />
                    <SmallWelcom />
                    <SmallProgress />
                    <SmallBalence />
                    <SmallCoat handleClose={handleClose} />
                    <div className="absolute group inset-x-0 bottom-0 z-20 flex w-full px-5 h-[calc(3.5rem+45px)]">
                        <button
                            className="overflow-hidden h-[3.5rem] rounded-lg w-full font-semibold 
                                flex items-center justify-center gap-2 border
                                transition-all duration-500 ease-out
                                hover:transform hover:-translate-y-1
                                hover:shadow-2xl
                                group btn "
                            style={{
                                borderColor: "var(--from)",
                                borderWidth: "1px",
                                color: "var(--to)",
                                position: "relative",
                                background: "linear-gradient(180deg, #11131e 29.43%, #0c0e15)",
                                boxShadow: "rgb(0, 0, 0) 0px 20px 20px -20px",
                            }}
                            onClick={() => {
                                handleClose()
                                navigate("/channels")
                            }}
                        >
                            {/* Hover overlay */}
                            <div
                                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out"
                                style={{
                                    background: "linear-gradient(to left, var(--from), var(--to))",
                                }}
                            />

                            {/* Content */}
                            <span className=" z-10 transition-colors duration-500 ease-out group-hover:text-black">
                                Enter Your Dental Network
                            </span>
                            <FaLongArrowAltRight className=" z-10 transition-all duration-500 ease-out group-hover:text-black group-hover:translate-x-1" />
                        </button>
                    </div>

                </div>
            </div>
        </div>
    )
}
