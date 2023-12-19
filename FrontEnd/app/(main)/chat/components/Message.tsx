import Image from "next/image";
import React, { Fragment } from "react";
import avatar from "../../../../public/student.png";

const Message = () => {
  return (
    <Fragment>
      <div className="flex items-start w-fit max-w-[70%] justify-end gap-1 rounded-md shadow-md ">
        <Image
          src={avatar}
          width={50}
          height={50}
          className="rounded-full"
          alt="avatar"
        />
        <div
          className="flex flex-wrap collapse items-center debug w-fit"
          tabIndex={0}
        >
          <span className="collapse-title overflow-hidden w-fit text-[23px] font-archivo p-1 border-palette-green border-[2px] rounded-md bg-palette-white m-1">
            {obj.object[0].content}
          </span>
          <span className="collapse-content w-fit">2023-0455</span>
        </div>
      </div>
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

export default Message;
