import { MODAL_TYPE, useModal } from "@/hooks/useModalStore"
import { Dialog, DialogContent } from "@/components/ui/dialog";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useState } from "react";

const Text = styled.div`
    width: 100%;
    overflow-wrap: break-word;
    color: rgb(255, 255, 255);
    margin: 6px auto 4px;
    padding: 0px;
    font-size: 17px;
    font-style: normal;
    text-align: center;
    font-family: Verdana, Geneva, sans-serif;
    font-weight: 400;
    line-height: 1.2;
    border-style: none;
    border-width: 1px;
    border-radius: 0px;
    letter-spacing: 0px;
    text-decoration: none;
    font-family: "Handjet", sans-serif;
    font-size: 38px;
    font-weight: 400;
    text-transform: uppercase;
`
const P = styled.div`
  color: inherit;
  font-family: inherit;
  font-size: inherit;
  font-style: inherit;
  font-weight: inherit;
  letter-spacing: inherit;
  line-height: inherit;
  overflow-wrap: inherit;
  text-align: inherit;
  text-decoration: inherit;
  width: inherit;
`
const H1 = styled.h1`
    width: 100%;
    overflow-wrap: break-word;
    color: rgb(255, 255, 255);
    margin: 6px auto 10px;
    padding: 0px;
    font-size: 19px;
    font-style: normal;
    text-align: center;
    font-family: Verdana, Geneva, sans-serif;
    font-weight: 400;
    line-height: 1.2;
    border-style: none;
    border-width: 1px;
    border-radius: 0px;
    letter-spacing: 0px;
    text-decoration: none;
`
const Input = styled.input`
    color: rgb(68, 68, 68);
    width: 100%;
    height: 40px;
    padding: 5px 10px;
    font-size: 16px;
    max-width: 450px;
    margin-top: 0px;
    min-height: 10px;
    text-align: center;
    font-family: Arial, Helvetica, sans-serif;
    font-weight: 400;
    line-height: 1.2;
    border-color: rgb(0, 0, 0);
    border-style: none;
    border-width: 0px;
    border-radius: 0px;
    margin-bottom: 10px;
    background-color: rgb(233, 233, 233);
`
const TextArea = styled.textarea`
    color: rgb(68, 68, 68);
    width: 100%;
    padding: 5px 10px;
    font-size: 16px;
    max-width: 450px;
    margin-top: 0px;
    min-height: 80px;
    text-align: center;
    font-family: Arial, Helvetica, sans-serif;
    font-weight: 400;
    line-height: 1.2;
    border-color: rgb(0, 0, 0);
    border-style: none;
    border-width: 0px;
    border-radius: 0px;
    margin-bottom: 10px;
    background-color: rgb(233, 233, 233);
    resize: vertical;
`
const Button = styled.button`
color: rgb(0, 0, 0);
    width: 100%;
    display: flex;
    outline: none;
    font-size: 33px;
    max-width: 360px;
    font-style: normal;
    margin-top: 0px;
    min-height: 42px;
    align-items: center;
    font-family: Oswald, "Arial Narrow", "MS UI Gothic", sans-serif;
    font-weight: 400;
    line-height: 1;
    border-color: rgb(142, 142, 142);
    border-style: solid;
    border-width: 4px;
    border-radius: 12px;
    margin-top: 15px;
    letter-spacing: 0px;
    justify-content: center;
    text-decoration: none;
    background-color: rgb(255, 255, 255);
`
const Button2 = styled.button`
  color: rgb(255, 255, 255);
    width: 100%;
    display: flex;
    outline: none;
    font-size: 15px;
    max-width: 360px;
    font-style: normal;
    margin-top: 0px;
    min-height: 42px;
    align-items: center;
    font-family: Verdana, Geneva, sans-serif;
    font-weight: 400;
    line-height: 1.2;
    border-color: rgb(0, 0, 0);
    border-style: none;
    border-width: 0px;
    border-radius: 0px;
    margin-bottom: 0px;
    letter-spacing: 0px;
    justify-content: center;
    text-decoration: none;
    background-color: rgb(0, 0, 0);
`
export default function AiModal() {
    const [isSent, setIsSent] = useState(false)
    const { isOpen, onClose, type } = useModal()
    const isModalOpen = isOpen && type === MODAL_TYPE.AI_MODAL;
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        console.log(data)
        try {
            const res = await fetch(`${import.meta.env.VITE_SERVER_API}/api/v1/emails/waitlist`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: 'include', // If using cookies
                body: JSON.stringify({
                    ...data,
                    type: "waitlist"
                }),
            });

            const responseData = await res.json();

            if (!res.ok) {
                throw new Error(responseData.message || "Failed to submit form");
            }
            setIsSent(true)
            localStorage.setItem("emailSubmitted", "true");
            toast.success("Thanks Doc!");
        } catch (error) {
            console.error("Submission error:", error);
            toast.error(error.message || "Failed to submit. Please try again.");
        }
    };

    return (
        <Dialog open={isModalOpen} onOpenChange={onClose} >
            <DialogContent className="bg-black border-my-black max-w-md text-center z-50"
                style={{
                    margin: "auto",
                    display: 'grid',
                    maxWidth: "500px",
                    minWidth: "275px",
                    minHeight: "unset",
                    gridTemplateColumns: "unset",
                    borderRadius: "0",
                    maxHeight: "100%",
                    overflow: "scroll",
                    scrollbarWidth: "none",
                    zIndex: "1000"
                }}>

            </DialogContent>
        </Dialog>
    )
}