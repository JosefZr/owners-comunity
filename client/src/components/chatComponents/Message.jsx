import { UserContext } from "@/context/UserContext";
import { useContext, useState, useEffect, useMemo } from "react";
import Preview from "../Profile/Preview";
import { MdMessage } from "react-icons/md";
import { FaUserMinus } from "react-icons/fa6";
import { HiUserAdd } from "react-icons/hi";
import { IoMdClose } from "react-icons/io";
import { addingFriendRequest, deletePendingRequests, getAllPending, getAllReceived, getFriendsRequest } from "@/services";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useUserToChatContext } from "@/context/ToChatUser";
import { Dialog, DialogContent, DialogDescription, DialogTrigger } from "../ui/dialog";
import { useAuthUser } from "@/hooks/jwt/useAuthUser";
import Name from "./Name";
import MessageDate from "./MessageDate";
import MessageText from "./MessageText";
import MessageImage from "./MessageImage";
import MessageTools from "./MessageTools";
import { LoadingSpinner } from "../LoadingSpinner";
import styled from "styled-components";

const Back = styled.div`
  background: linear-gradient(180deg, #11131e 29.43%, #0c0e15);
  position: relative;
  overflow: hidden;
  border: 1px solid hsla(0, 0%, 60%, .31);
  border-radius: 20px;
  padding: 10px;
`

export default function Message({ message, chanId, handleEditMessage }) {
  const userInfo = useAuthUser()
  const { setPreview, userPreview, setFriendsRequest, friendsRequest, setPendingRequests, friends } = useContext(UserContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const { setClickedUserId } = useUserToChatContext();
  const [loading, setLoading] = useState(false);

  const handleAddFriendRequest = async () => {
    if (!userPreview?._id) return;

    try {
      const response = await addingFriendRequest(userInfo.userId, userPreview._id);
      sendNotification({ userId: userPreview?._id, content: `${userPreview?.firstName} ${userPreview?.lastName} `, name: "New Friend Request" })
      if (response?.success) {
        toast.success("Friend request has been sent successfully");
        const updatedFriendsRequest = await getFriendsRequest(userInfo.userId, userPreview._id);
        setFriendsRequest(updatedFriendsRequest.data);
      } else {
        toast.error("Error sending friend request.");
      }
    } catch (error) {
      console.error("Error sending friend request:", error);
      toast.error("Something went wrong.");
    }
  };
  const handleDeletePendingRequest = async (request) => {
    try {
      const response = await deletePendingRequests(userInfo.userId, userPreview._id);
      if (response.success) {
        setPendingRequests(prev => prev.filter(r => r._id !== request._id));
        setFriendsRequest(response.data);
        toast.success(response.message);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.error("Error deleting pending request:", error);
      toast.error("Failed to delete request");
    }
  };
  const handleUserData = async () => {
    if (!userPreview?._id) return;
    setLoading(true);

    try {
      const response = await getFriendsRequest(userInfo.userId, userPreview._id);
      if (response.success) {
        setFriendsRequest(response.data);
      } else {
        setFriendsRequest(null);
      }
    } catch (error) {
      console.log("Error fetching user data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userPreview?._id && isModalOpen) {
      handleUserData();
    }
  }, [userPreview?._id, isModalOpen]);

  const handleImageClick = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_API}/api/v1/users/${message.sender._id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      if (response.ok) {
        const userData = await response.json();
        setPreview(userData.data);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
  const handleClose = () => {
    setIsModalOpen(false);
    setPreview(null);
  };
  const showRemoveButton = friendsRequest && userPreview?._id &&
    (friendsRequest.sender === userPreview._id || friendsRequest.receiver === userPreview._id);
  const [localFriends, setLocalFriends] = useState([]);
  const [localPending, setLocalPending] = useState([]);
  const [localReceived, setLocalReceived] = useState([]);
  const [loadingFriends, setLoadingFriends] = useState(true);
  // Fetch friend data directly in component
  useEffect(() => {
    const fetchFriendData = async () => {
      try {
        const [pendingRes, receivedRes] = await Promise.all([
          getAllPending(userInfo.userId),
          getAllReceived(userInfo.userId)
        ]);

        if (pendingRes.success && receivedRes.success) {
          setLocalPending(pendingRes.data.friendRequest);
          setLocalReceived(receivedRes.data.friendRequest);
          setLocalFriends(pendingRes.data.friends.concat(receivedRes.data.friends));
        }
      } catch (error) {
        console.error("Error fetching friend data:", error);
      } finally {
        setLoadingFriends(false);
      }
    };

    fetchFriendData();
  }, [userInfo.userId, userPreview?._id]);
  // Check friendship status
  const areFriends = useMemo(() => {
    if (!userPreview?._id) return false;

    return localFriends.some(friend =>
      friend.sender._id === userPreview._id ||
      friend.receiver._id === userPreview._id
    );
  }, [localFriends, userPreview]);

  // Check if request exists
  const hasPendingRequest = useMemo(() => {
    if (!userPreview?._id) return false;

    return localPending.some(request =>
      request.receiver._id === userPreview._id ||
      request.sender._id === userPreview._id
    );
  }, [localPending, userPreview]);

  const sendNotification = async ({ userId, content, name }) => {
    const response = await fetch(`${import.meta.env.VITE_SERVER_API}/api/v1/notification/send-friend-request`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: userId,
        title: name,
        message: content,
        link: `/#/dashboard/friends`,
      }),
    });

    const data = await response.json();
    console.log("Notifications sent:", data);
  };
  return (
    <div className="group chat-item-wrapper will-change-transform translate-y-0 " style={{ position: "relative" }}>
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <div
          className="chat-message group relative flex w-[94.5%] mx-auto focus:border-primary  focus:ring"
          style={{
            transition: "transform 0.25s ease-out",
            flexDirection: "row",
            alignItems: "flex-start",
          }}
        >
          {/* Message Content */}
          <Back
            className="mb-[2px] opacity-90 inline-block w-full border  px-2 py-[4px] border-transparent group"
            style={{
              position: "relative"
            }}
          >
            <div className="flex items-center gap-2 py-1">
              <div className="flex flex-row items-center gap-2 ">
                <DialogTrigger asChild>
                  <div
                    className="relative rounded-full block flex-shrink-0 cursor-pointer"
                    style={{ width: "40px", height: "40px" }}
                    onClick={handleImageClick}
                  >
                    {message.sender?.avatar === "/default-avatar.webp" ? (
                      <img
                        src={`${message.sender.avatar}`}
                        className="rounded-full object-cover"
                        loading="lazy"
                        style={{ width: "40px", height: "40px" }}
                        alt=""
                      />
                    ) : (
                      <img
                        src={`${import.meta.env.VITE_UPLOAD_AVATAR_URL}${message.sender?.avatar}`}
                        className="rounded-full object-cover"
                        loading="lazy"
                        style={{ width: "40px", height: "40px" }}
                        alt=""
                      />
                    )}
                  </div>
                </DialogTrigger>
                <div className="flex flex-col">
                  <DialogTrigger asChild>
                    <div className="cursor-pointer hover:underline"
                      onClick={() => setPreview(message.sender)}
                    >
                      <Name message={message} />
                    </div>
                  </DialogTrigger>
                  <MessageDate message={message} />
                </div>
              </div>

            </div>
            <span className="custom-break-words break-words text-sm">
              <div className="sc-jEACwC gqSGRP markdown break-wordsfalse">
                <MessageText message={message} />
                <MessageImage message={message} />
              </div>
            </span>
          </Back>
          <MessageTools message={message} chanId={chanId} onEdit={handleEditMessage} />
        </div>
        <DialogContent className="border-none rounded-none text-white p-0 bg-my-dark-blue">
          <DialogDescription className="border-none p-0">
            {loading ? (
              <div className="p-6 text-center">
                <LoadingSpinner />
              </div>
            ) : (
              <>
                {userPreview && <Preview user={userPreview} />}
                <div className="absolute top-3 right-4 z-[11] flex justify-end gap-1 sm:z-10">
                  {userPreview?._id !== userInfo?.userId && (
                    <>
                      {areFriends ? (
                        <button
                          className="h-[2rem] w-[2rem] rounded-full px-[6px] py-[2px] bg-slate-950"
                          onClick={() => {
                            setClickedUserId({ userId: userPreview._id, username: `${userPreview.firstName} ${userPreview.lastName}` });
                            navigate("/dashboard/userChat", {
                              state: { userId: userPreview._id, username: `${userPreview.firstName} ${userPreview.lastName}` }
                            });
                            handleClose();

                          }}
                        >
                          <MdMessage className="h-[30px] w-[21px] text-my-white" />
                        </button>
                      ) : hasPendingRequest ? (
                        <button
                          className="h-[2rem] w-[2rem] rounded-full px-2 bg-slate-950 text-center"
                          onClick={handleDeletePendingRequest}
                        >
                          <FaUserMinus className="h-[32px] w-[20px] text-my-white" />
                        </button>
                      ) : (
                        <button
                          className="h-[2rem] w-[2rem] rounded-full px-1 bg-slate-950 text-center"
                          onClick={handleAddFriendRequest}
                        >
                          <HiUserAdd className="h-[33px] w-[24px] text-my-white" />
                        </button>
                      )}
                    </>
                  )}
                  <button
                    className="h-[2rem] w-[2rem] rounded-full px-1 bg-slate-950 text-center"
                    onClick={handleClose}
                  >
                    <IoMdClose className="text-2xl text-my-white" />
                  </button>
                </div>
              </>
            )}
          </DialogDescription>
        </DialogContent>
      </Dialog>
    </div >
  );
}