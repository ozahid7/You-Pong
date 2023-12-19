import { Channel, Message } from "@/types";
import React, { Fragment } from "react";
import useSWR from "swr";
import { MyMessage } from ".";
import { getMessages } from "../data/api";

interface Props {
  channel: Channel;
}

const ChatDialog = ({ channel }: Props) => {
  const fetchData_Messages = async () => {
    try {
      const result = await getMessages(channel.id_channel || "");
      return result;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const { data: Messages } = useSWR<any>(fetchData_Messages);

  console.log("MESSAGES",Messages)
  return (
    <Fragment>
      <div className="flex flex-col w-full h-full overflow-auto my_scroll_green ">
        <MyMessage type="sender" />
        <MyMessage type="" />
        <MyMessage type="sender" />
        <MyMessage type="" />
        <MyMessage type="sender" />
        <MyMessage type="" />
      </div>
    </Fragment>
  );
};

export default ChatDialog;
