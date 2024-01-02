"use client";
import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import React from "react";
import { renderIcon } from "@/utils";
import { useRouter } from "next/navigation";
import { QueryClient, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiHost, myRoutes } from "@/const";
import axios from "axios";
import { blockuser } from "@/api/friendShip";
import { useUser } from "@/api/getHero";
import { notify } from "@/utils/game";
import { useGlobalSocket } from "@/providers/UserContextProvider";

const MyDropdown = (props: {
  icon: any;
  style?: string;
  size?: number;
  image?: any;
  placement: string;
  menuElements?: any;
  user?: string;
  setDataInvalid?: any;
  uid?: string;
  status?: string;
}) => {
  const router = useRouter();
  const user = useUser(true);
  const block = blockuser(props.uid);
  const { globalSocket } = useGlobalSocket();
  const query = useQueryClient();
  const handleLogout = async () => {
    const apiUrl = `${apiHost}user/signout`;

    await new Promise((resolve) => setTimeout(resolve, 500));
    await axios
      .get(apiUrl, { withCredentials: true })
      .then((response) => {
        console.log("data posted successfuly : ");
        localStorage.removeItem("isLoged");
        query.removeQueries();
        router.push("/");
      })
      .catch((e) => {
        console.log(".catch error", e);
      });
  };
  const handelClick = (e: string) => {
    if (e === "/user/") router.push(e + props.user);
    else if (e === "/game") {
      if (props.status === "INGAME")
        notify(
          props.user,
          user.data.avatar,
          false,
          2000,
          "Player Already In Game"
        );
      else router.push(myRoutes.game + "/" + props.uid);
    } else if (e === "block") {
      block.mutate();
    } else if (e === "/settings") {
      router.push(e);
    } else if (e === "logout") {
      handleLogout();
      globalSocket.emit("offline");
    } else if (e === "/user/profile") router.push(myRoutes.dashboard);
  };

  return (
    <div className="flex flex-col justify-center relative">
      <Menu>
        <Menu.Button
          as="div"
          className=""
        >
          {props.icon !== ""
            ? renderIcon(props.icon, props.style, props.size)
            : props.image}
        </Menu.Button>
        <Menu.Items
          as="div"
          className={`flex flex-col border-2 border-palette-green  h-auto outline-none w-auto rounded-sm drop-shadow-lg z-[1000] bg-palette-white top-full ${props.placement} absolute`}
        >
          {props.menuElements?.map((elm) => (
            <Menu.Item
              key={elm.href}
              as={Fragment}
            >
              {({ active }) => (
                <div
                  onClick={() => {
                    handelClick(elm.href);
                  }}
                  className={`py-2 z-10 px-4 min-w-[150px] cursor-pointer border-b border-palette-grey font-body font-bold flex items-center space-x-4  ${
                    active
                      ? "bg-palette-orange text-white"
                      : " text-palette-green"
                  }`}
                >
                  <div className="h-auto flex">{elm.icon}</div>
                  <div className="h-auto flex">{elm.label}</div>
                </div>
              )}
            </Menu.Item>
          ))}
        </Menu.Items>
      </Menu>
    </div>
  );
};

export default MyDropdown;
