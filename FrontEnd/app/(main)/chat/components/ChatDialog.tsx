import { Channel } from "@/types";
import React, { Fragment } from "react";
import { Message } from ".";

interface Props {
  channel: Channel;
}

const ChatDialog = ({ channel }: Props) => {
  return (
    <Fragment>
      <div className="flex items-end justify-end flex-col w-full h-full ">
        <Message />
      </div>
    </Fragment>
  );
};



export default ChatDialog;
