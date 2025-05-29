import { UserContext } from "@/context/UserContext";
import { MODAL_TYPE, useModal } from "@/hooks/useModalStore";
import { jwtDecode } from "jwt-decode";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import useSocketStore from "../socketStore";
const Back = styled.div`
  background-image: url("/ai/carbon_bg.webp");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  opacity:0.05;
  z-index: -1; /* Ensure it stays behind other content */
`;
const Div = styled.div`
  background: linear-gradient(180deg, #11131e 29.43%, #0c0e15);
  position: relative;
  overflow: hidden;
  border: 1px solid hsla(0, 0%, 60%, .31);
  border-radius: 20px;
  padding: 20px;
`
const fetchUserData = async (data) => {
  console.log(data);
  try {
    const response = await fetch(`${import.meta.env.VITE_SERVER_API}/api/v1/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Invalid email or password");
    }

    let jwt;
    try {
      jwt = await response.json();
    } catch {
      throw new Error("Failed to parse server response");
    }

    if (!jwt.accessToken) {
      throw new Error("No access token received");
    }

    localStorage.setItem("token", jwt.accessToken);
    useSocketStore.getState().connectSocket();

    return true;
  } catch (error) {
    console.error(error.message);
    alert(error.message);
    return false;
  }
};


export default function Login() {
  const { onOpen } = useModal()

  const { setUser } = useContext(UserContext);

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Handle input changes and update state
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetchUserData(formData);
    console.log(res)
    if (res) {
      const token = localStorage.getItem("token");
      const userInfo = jwtDecode(token);
      setUser(userInfo)
      navigate("/channels", {
        state: { fromLogin: true }
      });
      onOpen(MODAL_TYPE.BIR)

    };
  };

  return (
    <section className="absolute inset-0 flex flex-col bg-black">
      <div className="relative flex-1">
        <div className="absolute inset-0 ">
          <img
            src="/ai/carbon_bg.webp"
            alt="carbon fiber bg"
            width="1736"
            height="943"
            loading="lazy"
            className="max-h-[100%] h-[100%] opacity-10 w-full object-cover top-0 left-0 pointer-events-none"
            style={{ position: "absolute" }}
          />
          <div className="absolute inset-0 max-h-[100vh] overflow-y-auto pt-inset-top pb-inset-bottom flex flex-col items-center justify-center">
            <div className=" flex flex-col items-center">
              <div className="relative lg:mr-3 mx-auto lg:mx-0 max-w-[35vh] max-h-[35vh] rounded-full overflow-hidden mt-[20%]">
                <img
                  className="trw-logo w-full h-full object-cover transform scale-[1.39]   max-h-[35vh] max-sm:max-h-[15vh] "
                  src="/signLogo.webp"
                  alt="logo"
                />
              </div>
              <h2 className="mt-[10%] text-center font-bold text-[30px] max-sm:text-[18px] text-white uppercase">
                YOUR DENTAL NETWORK
              </h2>
            </div>
            <div className="w-full max-w-[500px] p-8 max-sm:p-0">
              <button
                className="btn font-normal normal-case btn-lg btn-ghost btn-block"
                onClick={() => navigate("/sign-up")}
              >
                I don&rsquo;t have an account
              </button>
              {/* <Link to={"/login"}>
            <button className='btn mt-3 btn-lg btn-primary btn-block'></button>
          </Link> */}
              <Div className="relative z-10 mx-auto mt-2 flex max-w-[500px] flex-col overflow-auto rounded-xl bg-my-dark-blue p-6 shadow-lg ">
                <div className="w-full max-w-[95vw] text-center md:max-w-md">
                  <div className=" text-center font-bold text-xl">
                    Sign in to your account
                  </div>
                  <form
                    action="#"
                    className="form-control mt-4 flex flex-col"
                    onSubmit={handleSubmit}
                  >
                    <input
                      type="email"
                      id="Email"
                      name="email"
                      value={formData.email}
                      placeholder="Email Address"
                      onChange={handleChange}
                      className="input bg-base-200 focus:outline-offset-0"
                    />
                    <input
                      type="password"
                      id="Password"
                      name="password"
                      placeholder="Password"
                      value={formData.password}
                      onChange={handleChange}
                      className="input mt-2 bg-base-200 focus:outline-offset-0"
                    />

                    <Link
                      to="/forgot-password"
                      className="mt-3 self-start text-purple-800 text-xs"
                    >
                      Forgot your password?
                    </Link>

                    <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                      <button
                        type="submit"
                        className="btn btn-no-effects bg-gradient-to-r from-[#a6a6a6] to-[#ffffff]  hover:opacity-80 relative mt-6 text-black w-full"
                      >
                        LOG IN
                      </button>
                    </div>
                  </form>
                </div>
              </Div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
