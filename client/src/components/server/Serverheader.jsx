import {
  Landmark,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import styled from "styled-components";
const Div = styled.div`
    background: linear-gradient(88.87deg, var(--from) -49.96%, var(--to) 99.26%);
    padding: 2px;
    clip-path: polygon(18px 0, 100% 0, 100% calc(100% - 18px), calc(100% - 18px) 100%, 0 100%, 0 18px);
    width: 100%;
    @media screen and (min-width: 1024px) {
        width: auto;
    }
`
const Button = styled.button`
    position: relative;
    padding: 8px 18px;
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
        padding: 10px 26px;
        width: auto;
    }
`
export default function ServerHeader() {
  const navigate = useNavigate();

  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("token not found")

  } catch (err) {
    throw new Error(err.message);
  }
  const handleNavigation = () => {
    navigate("/course");
  };

  return (
    <div>
      {/* {dentist ? (
        <DropdownMenu>
          <DropdownMenuTrigger className=" focus:outline-none " asChild>
            <button className=" w-full text-md font-semibold px-3 flex items-center h-12 border-neutral-800 border-b-2 hover:bg-slate-800 transition">
              {/* {server.name} */}
      {/* first
              <ChevronDown className="h-5 w-5 ml-auto" />
            </button> */}
      {/* </DropdownMenuTrigger>
          <DropdownMenuContent className=" w-56 text-xs font-medium text-neutral-400 space-y-[2px] bg-my-dark-blue  border-none  ">
            {isModerator && (
              <DropdownMenuItem
                className="text-indigo-400 px-3 py-2 text-sm cursor-pointer hover:bg-slate-900 "
                onClick={() => onOpen("invitePeople", { server })}
                style={{ display: "flex", flexDirection: "row" }}
              >
                Invite People
                <UserPlus className="h-4 w-4 ml-auto" />
              </DropdownMenuItem>
            )}

            {dentist && (
              <DropdownMenuItem
                className=" px-3 py-2 text-sm cursor-pointer hover:bg-slate-900 "
                style={{ display: "flex", flexDirection: "row" }}
                onClick={() => onOpen("editServer", { server })}
              >
                Server Settings
                <Settings className="h-4 w-4 ml-auto" />
              </DropdownMenuItem>
            )}
            {dentist && (
              <DropdownMenuItem
                className=" px-3 py-2 text-sm cursor-pointer hover:bg-slate-900 "
                style={{ display: "flex", flexDirection: "row" }}
                onClick={() => onOpen("manageMembers", { server })}
              >
                Manage Members
                <Users className="h-4 w-4 ml-auto" />
              </DropdownMenuItem>
            )}
            {isModerator && (
              <DropdownMenuItem
                className=" px-3 py-2 text-sm cursor-pointer hover:bg-slate-900 "
                style={{ display: "flex", flexDirection: "row" }}
                onClick={() => onOpen("createChannel", { server })}
              >
                create channel
                <PlusCircle className="h-4 w-4 ml-auto" />
              </DropdownMenuItem>
            )}
            {isModerator && <DropdownMenuSeparator className="bg-my-tin" />}
            {dentist && (
              <DropdownMenuItem
                className="text-rose-500 px-3 py-2 text-sm cursor-pointer hover:bg-slate-900 "
                style={{ display: "flex", flexDirection: "row" }}
              >
                Delete Server
                <Trash className="h-4 w-4 ml-auto" />
              </DropdownMenuItem>
            )}
            {!dentist && (
              <DropdownMenuItem
                className="text-rose-500 px-3 py-2 text-sm cursor-pointer hover:bg-slate-900 "
                style={{ display: "flex", flexDirection: "row" }}
              >
                Leave Server
                <LogOut className="h-4 w-4 ml-auto" />
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu> */}

      <Div
        onClick={handleNavigation}
        className="flex items-center cursor-pointer bg-gradient-to-r from-my-from to-my-to justify-center text-my-black  font-bold text-lg gap-2"
      >
        <Button className="hover:scale-105 duration-300 transition-all flex flex-row items-center justify-center gap-2">  <Landmark className="h-8 w-8" />
          SKILL UP
        </Button>
      </Div>

    </div >
  );
}
