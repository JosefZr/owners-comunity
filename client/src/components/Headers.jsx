import styled from "styled-components"
import {
    Dialog,
    DialogContent,
    DialogTrigger,
  } from "@/components/ui/dialog"
import {  FaRegHandPointRight } from "react-icons/fa6";
import { MdDone} from "react-icons/md";
import CtaButton from "./CtaButton";
import { Plus } from "@/components";
import { TiWarningOutline } from "react-icons/ti";
// const getExtraServices = (t)=>{
//     return[
//         {
//             logo:<FaRegChessQueen className=" h-10 w-12  max-[400px]:h-5 max-[400px]:w-6"/>,
//             title:t("store.plusServices.top.title"),
//             description:t("store.plusServices.top.description"),
//         },
//         {
//             logo:<FaMoneyBillTrendUp className=" h-10 w-12  max-[400px]:h-5 max-[400px]:w-6"/>,
//             title:t("store.plusServices.growth.title"),
//             description:t("store.plusServices.growth.description"),
//         },
//         {
//             logo:<GiTakeMyMoney className=" h-10 w-12  max-[400px]:h-5 max-[400px]:w-6"/>,
//             title:t("store.plusServices.financial.title"),
//             description:t("store.plusServices.financial.description"),
//         },
//         {
//             logo:<MdOutlineNotificationsActive className=" h-10 w-12 max-[400px]:h-5 max-[400px]:w-6"/>,
//             title:t("store.plusServices.notifications.title"),
//         },
//         {
//             logo:<FaRegChessKnight className=" h-10 w-12  max-[400px]:h-5 max-[400px]:w-6"/>,
//             title:t("store.plusServices.plan.title"),
//             description:t("store.plusServices.plan.description"),
//         },
//         {
//             logo:<MdOutlinePhonelinkSetup className=" h-10 w-12  max-[400px]:h-5 max-[400px]:w-6"/>,
//             title:t("store.plusServices.setup.title"),
//             description:t("store.plusServices.setup.description"),
//         }
//     ]
// }
const HeaderSection = styled.section`
    margin-top: 2rem;
`
const Content = styled.div`
    grid-column-gap: 1.75rem;
    grid-row-gap: 1.75rem;
    text-align: center;
    flex-direction: column;
    align-items: center;
    display: flex;
    position: relative;
    padding: 1rem;
    
    @media screen and (max-width: 768px) {
        gap: 1rem;
        padding: 0.75rem;
    }
    
    @media screen and (max-width: 520px) {
        gap: 0.75rem;
        padding: 0.5rem;
    }
`
// const H2 = styled.h2`
//     text-align: center;
//     text-transform: uppercase;
//     /* -webkit-text-fill-color: transparent; */
//     /* background-image: url(../images/heading-texture_1heading-texture.webp), linear-gradient(125deg, #fff 85%, #fff0); */
//     background-position: 0 0, 0 0;
//     background-size: auto, auto;
//     color: var(--whiteGray);
//     /* -webkit-background-clip: text; */
//     -webkit-background-clip: text;
//     background-clip: text;
//     margin-top: 0;
//     margin-bottom: 0;
//     font-family: Clashdisplay Variable, sans-serif;
//     font-size: 1.8rem;
//     font-weight: 600;
//     line-height: 1.1;
//     @media screen and (max-width:520px){
//         font-size: 1.2rem;
//     }
//     @media screen and (max-width:400px){
//         font-size: 1.2rem;
//     }
// `
// const Description = styled.p`
//     color: var(--gold);
//     text-align: center;
//     text-transform: none;
//     -webkit-text-fill-color: inherit;
//     background-image: none;
//     background-clip: border-box;
//     margin-bottom: 0;
//     font-family: Inter Variablefont Slnt Wght, sans-serif;
//     font-size: 1.5rem;
//     font-weight: 300;
//     line-height: 1;
// `
// const Container = styled.div`
//   background-color: #111;
//   color: #fff;
//   padding: 2rem;
//   border-radius: 8px;
//   text-align: center;
//   max-width: 600px;
//   margin: auto;
//   box-shadow: 0px 0px 20px rgba(255, 255, 255, 0.1);
// `;
const Title = styled.h2`
    font-size: 1.4rem;
    font-weight: 600;
    color: var(--vertRolex);
    margin-bottom: .5rem;
    
    @media screen and (max-width: 768px) {
        font-size: 1.2rem;
    }
    
    @media screen and (max-width: 520px) {
        font-size: 1rem;
    }
`

const Subtitle = styled.h3`
    font-size: 1.8rem;
    font-weight: 600;
    margin-bottom: .5rem;
    
    @media screen and (max-width: 768px) {
        font-size: 1.5rem;
    }
    
    @media screen and (max-width: 520px) {
        font-size: 1.2rem;
    }
`

const Description = styled.p`
    font-size: 1.2rem;
    line-height: 1.5;
    color: #ddd;
    
    @media screen and (max-width: 768px) {
        font-size: 1.1rem;
    }
    
    @media screen and (max-width: 520px) {
        font-size: 1rem;
        line-height: 1.4;
    }
`


const FeatureList = styled.ul`
    list-style: none;
    padding: 0;
    text-align: left;
    width: 100%;
    max-width: 90%;
    
    @media screen and (max-width: 520px) {
        max-width: 100%;
    }
`

const FeatureItem = styled.li`
    display: flex;
    align-items: flex-start;
    gap: 0.5rem;
    font-size: 1.2rem;
    margin-bottom: 0.75rem;
    
    @media screen and (max-width: 768px) {
        font-size: 1rem;
        gap: 0.3rem;
    }
    
    @media screen and (max-width: 520px) {
        font-size: 0.9rem;
        margin-bottom: 0.5rem;
    }
`
export default function Headers() {
    return (
        <HeaderSection>
          <Dialog >
            <DialogTrigger className=" w-full"><Plus/></DialogTrigger>
            <DialogContent className="bg-black border-my-gray max-w-[60%] max-h-[90vh] overflow-y-auto max-lg:max-w-[75%] max-md:max-w-[85%] max-sm:max-w-[95%] max-xs:max-w-[98%] p-4 max-sm:p-3 max-xs:p-2">
          <Content>
          <img src="/NEw.webp" alt="new loading" loading="lazy"/>
          </Content>
          <div className="mt-4 max-sm:mt-2">
            <CtaButton cta={true} />
          </div>
        </DialogContent>
        </Dialog>
        </HeaderSection>
    )
}
