import { Channel, Message, User_Hero } from "@/types";
import React, { Fragment } from "react";
import useSWR from "swr";
import { MyMessage } from ".";
import { getMainUser, getMessages } from "../data/api";

interface Props {
  channel: Channel;
}

const ChatDialog = ({ channel }: Props) => {
  var type: string = "";
  const fetchData_Messages = async () => {
    try {
      const result = await getMessages(channel.id_channel || "");
      return result.object;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchData_getMainUser = async () => {
    try {
      const result = await getMainUser();

      return result.userInfo;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const { data: MainUser } = useSWR<User_Hero>(
    "/MainUser",
    fetchData_getMainUser
  );

  const { data: Messages } = useSWR<Message[]>("/Messages", fetchData_Messages);

  return (
    <Fragment>
      <div className="flex flex-col w-full h-full overflow-auto my_scroll_green ">
        {Messages &&
          Messages.map((message) => {
            message.user.id_user === MainUser?.uid
              ? (type = "main")
              : (type = "sender");
            return (
              <MyMessage
                type={type}
                message={message}
              />
            );
          })}
      </div>
    </Fragment>
  );
};

export default ChatDialog;
