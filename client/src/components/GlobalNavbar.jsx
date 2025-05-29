import { useState } from "react"
import styled, { keyframes } from "styled-components"
import { size } from "@/lib/mediaQuerys"
import { useTranslation } from "react-i18next"
import { Link, useNavigate, useParams } from "react-router-dom"
import { jwtDecode } from "jwt-decode"
import { GiEarthAmerica } from "react-icons/gi"

const dropDown = keyframes`
  0% {
    transform: translateY(-100%);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
`

const Navigation = styled.nav`
  opacity: 1;
  transform: translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg);
  transform-style: preserve-3d;
  z-index: 999;
  justify-content: space-between;
  align-items: center;
  padding-top: 1rem;
  position: fixed;
  /* inset: 0% 0% auto; */
  animation: ${dropDown} 0.5s ease-out forwards;
  width: 100%;
  position: fixed;
  top: 1.4rem;
  left: 0;
  right: 0;
  @media screen and (max-width: ${size.tablet}) {
    top: 2rem;           
    padding-top: 0;
    position: absolute;
  }
`

const Sidebar = styled.div`
  position: fixed;
  top: 0;
  left: ${({ $isOpen }) => ($isOpen ? "0" : "-100%")};
  width: 30%;
  height: 100vh;
  background-color: rgba(26, 26, 26, 0.2); /* Slightly darker but more transparent */
  backdrop-filter: blur(10px); /* Strong blur for glass effect */
  -webkit-backdrop-filter: blur(10px); /* For Safari */
  z-index: 997;
  padding: 6rem 2rem 2rem;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: ${({ $isOpen }) => ($isOpen ? "0 0 15px rgba(0, 0, 0, 0.3)" : "none")};
  border-right: 1px solid rgba(255, 255, 255, 0.1); /* Subtle border for glass effect */

  @media screen and (max-width: ${size.tablet}) {
    width: 70%;
  }
`

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.2); /* Very transparent */
  z-index: 996;
  opacity: ${(props) => (props.$isOpen ? 1 : 0)};
  visibility: ${(props) => (props.$isOpen ? "visible" : "hidden")};
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(3px); /* Light blur for background */
  -webkit-backdrop-filter: blur(3px); /* For Safari */
`

const MenuItem = styled.div`
  color: ${props => props.$active ? 'var(--redClaire)' : 'var(--white)'};
  font-size: 1.1rem;
  padding: 1rem 0;
  cursor: pointer;
  transition: all 0.2s;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  
  &:hover {
    color: var(--redClaire);
    transform: translateX(10px);
  }
  &.active {
    color: var(--redClaire);
  }
`

const Boss = styled.div`
  z-index: 999;
  cursor: pointer;
  color: var(--redClaire);
  border: 1px solid #00000018;
  padding: .4rem;
  font-size: .88rem;
  font-weight: 500;
  line-height: 1;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &:hover {
    background-color: #c2c2c27d;
    border: 1px solid #c2c2c22b;
  }
`

const PaddingGlobal = styled.div`
  padding-left: 2.5rem;
  padding-right: 2.5rem;
  position: relative;
  
  @media screen and (max-width: ${size.tablet}) {
    padding: .25rem 1.25rem;
  }
`

const Content = styled.div`
  justify-content: space-between;
  align-items: flex-start;
  display: flex;
  
  @media screen and (max-width: ${size.tablet}) {
    align-items: center;
    height: 100px;
    position: relative;
  }
`

// const NavLeft = styled.div`
//     z-index: 999;
//     align-items: center;
//     display: flex;
//     position: relative;
//     @media screen and (max-width: ${size.tablet}){
//         justify-content: space-between;
//         /* width: 100%; */
//     }
// `

// const NavCenter = styled.div`
//     justify-content: end;
//     display: flex;
//     padding:0 20px;
//     flex: 1; // This ensures it takes enough space for centering
//     /* position: absolute; */
//     /* left: 50%; */
//     color: black;
//     /* transform: translateX(-50%); // Proper centering technique using absolute positioning */
//     /* z-index: 1000; // Ensure it's above other elements */
//     @media screen and ((max-width: ${size.tablet})) {
//             font-size: 14px;
//             /* padding: 0.1rem; */
// }
// `

const NavRight = styled.div`
    /* flex: 1; */
    justify-content: flex-end;
    display: flex;
    white-space: nowrap;
    @media screen and (max-width: ${size.tablet}){
        z-index: 999;
        position: relative;
    }
`

const MenuHeader = styled.div`
  color: var(--redClaire);
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 2rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3); /* Text shadow for better readability on glass */
`

const LoginButton = styled.a`
    opacity: .9;
    text-transform: uppercase;
    
    /* border: 1px solid #a3a3a3; */
    padding: .75rem 1rem;
    color: var(--redClaire) ;
    font-family: Clashdisplay Variable, sans-serif;
    font-weight: 600;
    transition: all .1s;
    &:hover{
        opacity: 1;
        background-color:var(--gold-text);
    }
    @media screen and (max-width: ${size.mobileM}){
        padding: .5rem .9rem;
    } 
`
const Notification = styled.div`
    z-index: 999;
    color: #fff;
    text-align: center;
    letter-spacing: 0;
    text-transform: uppercase;
    font-size: .88rem;
    font-weight: 500;
    position: relative;
`
const PaddingGlobal1 = styled.div`
    justify-content: center;
    align-items: center;
    padding-left: 2.5rem;
    padding-right: 2.5rem;
    padding-top: .5rem;
    padding-bottom: .5rem;
    display: flex;
    position: relative;
`
export default function GlobalNavbar() {
  const [isLeftMenuOpen, setIsLeftMenuOpen] = useState(false)
  const navigate = useNavigate()
  const { t } = useTranslation()
  const params = useParams()
  const toggleMenu = () => {
    setIsLeftMenuOpen(!isLeftMenuOpen)
  }
  let token
  try {
    const tokenString = localStorage.getItem("token")
    token = tokenString ? jwtDecode(tokenString) : null
  } catch (error) {
    console.error("Error decoding token:", error)
    token = null
  }

  const handleLogin = () => {
    if (token) {
      console.log("channels")
      navigate("/channels", {
        state: { fromLogin: true }
      });
    } else {
      console.log("login")
      navigate("/login")
    }
    setIsLeftMenuOpen(false)
  }

  const closeMenu = () => {
    setIsLeftMenuOpen(false)
  }
  const menu = [
    {
      id: "growth",
      name: "Marketing",
      route: "/marketing"
    },
    {
      id: "dentist",
      name: "Dentist",
      route: "/dentist"
    },
    {
      id: "lab",
      name: "Dental Lab",
      route: "/lab"
    },
    {
      id: "store",
      name: "Dental Suppliers",
      route: "/store"
    }
  ]
  return (
    <>
      {/* top bar */}
      <Notification >
        <PaddingGlobal1 className="hash-background">
          <div >
            THE PRICE OF YDN WILL BE INCREASING SOON.
            <Link to={"/sign-up"} style={{
              fontWeight: "bold",
              paddingLeft: "5px",
              textDecoration: "underline",
              transition: "opacity .2s"
            }}>
              join now
            </Link>
          </div>
        </PaddingGlobal1>
      </Notification>
      <Navigation>
        <PaddingGlobal>
          <div className="container-large">
            <Content>
              <div onClick={toggleMenu} className="group cursor-pointer">
                <Boss>
                  <div className="w-10 h-5 flex flex-col items-center justify-center text-my-red">
                    {/* Menu Icon */}
                    <div
                      className={`w-[50%] h-[2px] bg-my-red rounded-sm transition-all duration-300 origin-left translate-y-[0.45rem] ${isLeftMenuOpen ? "rotate-[-45deg]" : ""
                        }`}
                    />
                    <div
                      className={`w-[50%] h-[2px] bg-my-red rounded-md transition-all duration-300 origin-center ${isLeftMenuOpen ? "hidden" : ""
                        }`}
                    />
                    <div
                      className={`w-[50%] h-[2px] bg-my-red rounded-md transition-all duration-300 origin-left -translate-y-[0.45rem] ${isLeftMenuOpen ? "rotate-[45deg]" : ""
                        }`}
                    />
                  </div>
                  {/* <span>Menu</span> */}
                </Boss>
              </div>

              <NavRight>
                <LoginButton className="uppercase">
                  <GiEarthAmerica className="text-3xl cursor-pointer " onClick={handleLogin} />
                </LoginButton>
              </NavRight>
            </Content>
          </div>
        </PaddingGlobal>
      </Navigation>

      <Overlay $isOpen={isLeftMenuOpen} onClick={closeMenu} />

      <Sidebar $isOpen={isLeftMenuOpen}>
        <MenuHeader>Menu</MenuHeader>
        <MenuItem onClick={handleLogin}>{t("login")}</MenuItem>
        {menu.map((item, index) => (
          <MenuItem
            key={index}
            onClick={() => navigate(item.route)}
            $active={params.name === item.id}
          >
            {item.name}
          </MenuItem>
        ))}
        <MenuItem onClick={() => {
          window.open("https://buildydn.wixsite.com/ydn-journal", "_blank")
          closeMenu()
        }}>
          YDN Journal
        </MenuItem>
      </Sidebar>
    </>
  )
}

