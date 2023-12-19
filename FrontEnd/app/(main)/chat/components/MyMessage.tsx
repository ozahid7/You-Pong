import Image from "next/image";
import React, { Fragment } from "react";
import avatar from "../../../../public/avatar.jpeg";

interface Props {
  type: string;
}

const MyMessage = ({ type }: Props) => {
  return (
    <Fragment>
      {type === "sender" ? (
        <div className="chat chat-start p-1">
          <div className="chat-image avatar">
            <div className="w-10 rounded-full">
              <Image
                alt="Sender's avatar"
                src={avatar}
              />
            </div>
          </div>
          <div className="flex chat-header items-center gap-1">
            <div className="w-fit h-fit">Abderrachid Yassir</div>
            <time className="text-xs opacity-50">12:45</time>
          </div>
          <div className="w-full h-full dropdown dropdown-hover">
            <div
              role="button"
              tabIndex={0}
              data-theme="mytheme"
              className="chat-bubble chat-bubble-primary text-palette-white w-fit max-w-[80%] overflow-hidden whitespace-pre-wrap"
            >
              Hey sahbi Oussama Zahid!wefwefwefwefewfw we jw w wbwe fhwe w ww
              weffwefwewefwf ewfefw wef ew we wf w wef wef wef wef wef wf wfe
              wfe wfe wfe wfe wf ewf ewfe wef wef wefewfewfew wef wef ew fwe fwe
              fw fe fw f wefwefewfwefew fwefwefwefeww
            </div>
            <ul
              tabIndex={0}
              className="chat-footer opacity-50 dropdown-content z-[1] menu p-2 bg-base-100 rounded-box w-fit"
            >
              <li>Delivered</li>
            </ul>
          </div>
        </div>
      ) : (
        <div className="chat chat-end p-1 ">
          <div className="chat-image avatar">
            <div className="w-10 rounded-full">
              <Image
                alt="Main user's avatar"
                src={avatar}
              />
            </div>
          </div>
          <div className="flex chat-header items-center gap-1">
            <div className="w-fit h-fit">Oussama Zahid</div>
            <time className="text-xs opacity-50">12:45</time>
          </div>
          <div className="dropdown dropdown-hover flex items-end justify-end w-full h-full flex-col">
            <div
              role="button"
              tabIndex={0}
              data-theme="mytheme"
              className="chat-bubble chat-bubble-secondary text-palette-white w-fit max-w-[80%] overflow-hidden whitespace-pre-wrap"
            >
              Fuck you!wefwefwefwefewfw we jw w wbwe fhwe w ww weffwefwewefwf
              ewfefw wef ew we wf w wef wef wef wef wef wf wfe wfe wfe wfe wfe
              wf ewf ewfe wef wef wefewfewfew wef wef ew fwe fwe fw fe fw f
              wefwefewfwefew fwefwefwefeww
            </div>
            <ul
              tabIndex={0}
              className="chat-footer opacity-50 dropdown-content z-[1] menu p-2 bg-base-100 rounded-box w-fit"
            >
              <li>Seen at 12:46</li>
            </ul>
          </div>
        </div>
      )}
    </Fragment>
  );
};

var obj = {
  message: "Messages founded successfully",
  object: [
    {
      id_message: "afb2869d-9354-40dc-8da3-8d8d5d61b8c0",
      content: "hada machi",
      created_at: "2023-12-19T00:03:59.139Z",
      id_sender: "a1fbe353-d166-4928-9148-e9bf9312f2fa",
      name_room: "c628d95c-c291-4fc0-99ca-6e663a99bd24",
      id_channel: "80e20a16-4122-4e18-9bc7-9a6fccb45bd0",
    },
    {
      id_message: "eac5d71d-b284-4d1d-a9be-37104a5c2456",
      content: "hada ghir ana li kandwiiiii",
      created_at: "2023-12-19T00:02:36.773Z",
      id_sender: "7bc96d40-48ff-48e4-a77c-4fa1cb0f2007",
      name_room: "642850cd-f21b-48c2-a6bc-0db14125abbe",
      id_channel: "80e20a16-4122-4e18-9bc7-9a6fccb45bd0",
    },
    {
      id_message: "5e720cde-30c7-4a52-b19b-b33d288d2b98",
      content: "can i help you ",
      created_at: "2023-12-19T00:01:51.657Z",
      id_sender: "a1fbe353-d166-4928-9148-e9bf9312f2fa",
      name_room: "c628d95c-c291-4fc0-99ca-6e663a99bd24",
      id_channel: "80e20a16-4122-4e18-9bc7-9a6fccb45bd0",
    },
    {
      id_message: "d3f38beb-7d97-4db3-9cc3-61d7765f37a6",
      content: "hey abdo",
      created_at: "2023-12-18T23:59:18.731Z",
      id_sender: "7bc96d40-48ff-48e4-a77c-4fa1cb0f2007",
      name_room: "642850cd-f21b-48c2-a6bc-0db14125abbe",
      id_channel: "80e20a16-4122-4e18-9bc7-9a6fccb45bd0",
    },
  ],
};

export default MyMessage;
