import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useUpdateFriendsMutation } from "../../modules/Friends/api/friendsApiSlice";
import { useUpdateFriendRequestsMutation } from "../../modules/Friends/api/friendsRequestsApiSlice";
import { updatePeople } from "../../redux/slices/peopleSlice";
import { setUserAccessToken } from "../../redux/slices/userSlice";
import { optionsNotification } from "../actions/optionsNotification";
import { updateAccessToken } from "../actions/updateAccessToken";

const useWebsocket = (userAccessToken) => {
  const dispatch = useDispatch();
  const [socket, setSocket] = useState(null);
  const [statusSocket, setStatusSocket] = useState("pending");
  const [newMessage, setNewMessage] = useState(null);
  const isAuth = useSelector((state) => state.user.isAuth);
  const refresh = useSelector((state) => state.user.tokens.refresh);
  const myId = useSelector((state) => state.user.aboutUser.id);

  const [updateFriendRequests] = useUpdateFriendRequestsMutation();
  const [updateFriends] = useUpdateFriendsMutation();

  useEffect(() => {
    let ws = null;

    const closeHandler = () => {
      console.log("соединение разорванно");

      toast.error("Соединение разорвано,\n пытаюсь подключится", optionsNotification);

      const token = updateAccessToken(refresh);
      localStorage.setItem("accessToken", token.access);
      dispatch(setUserAccessToken(token.access));

      setTimeout(() => {
        createChannel();
      }, 3000);
    };
    const createChannel = () => {
      if (statusSocket === "ready" && socket?.readyState === 1) return;

      console.log("соединение установлено");
      ws?.removeEventListener("close", closeHandler);
      ws?.close();

      ws = new WebSocket(`ws://127.0.0.1:8000/ws/chat/?token=${localStorage.getItem("accessToken")}`);

      ws?.addEventListener("close", closeHandler);
      setSocket(ws);
    };
    if (isAuth) {
      createChannel();
      return () => {
        ws?.removeEventListener("close", closeHandler);
        ws?.close();
      };
    }
  }, [isAuth, userAccessToken]);

  useEffect(() => {
    let openHandler = () => {
      setStatusSocket("ready");
    };

    socket?.addEventListener("open", openHandler);
    return () => {
      socket?.removeEventListener("open", openHandler);
    };
  }, [socket]);

  useEffect(() => {
    const messageHandler = async (e) => {
      const eventData = JSON.parse(e.data);

      if (eventData.action === "friend") {
        if (eventData.data.type === "friend_request") {
          await updateFriendRequests();
          toast.success(`Заявка в друзья от ${eventData.data.user.first_name + " " + eventData.data.user.last_name}`, optionsNotification);
        }
        if (eventData.data.type === "friend_accepted") {
          await updateFriends();
          toast.success(`Заявка в друзья принята ${eventData.data.user.first_name + " " + eventData.data.user.last_name}`, optionsNotification);
        }
        if (eventData.data.type === "friend_denied") {
          toast.error(`Ваша заявка в друзья отклонена ${eventData.data.user.first_name + " " + eventData.data.user.last_name} `, optionsNotification);
        }
        if (eventData.data.type === "friend_canceled") {
          // в будущем
        }
        if (eventData.data.type === "friend_delete") {
          // в будущем
        }
      } else {
        const newMessage2 = eventData.data;
        dispatch(updatePeople({ data: newMessage2, myId: myId }));
        setNewMessage(newMessage2);
      }
    };

    socket?.addEventListener("message", messageHandler);

    return () => {
      socket?.removeEventListener("message", messageHandler);
    };
  }, [socket]);

  return [socket, statusSocket, newMessage];
};

export default useWebsocket;
