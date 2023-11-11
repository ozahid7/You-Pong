import { LuUser, LuLogOut, LuSettings, LuGamepad2, LuUserX } from "react-icons/lu";
import { renderIcon } from "@/utils";


//render react icons
export const menuElements = [
    { href: "/login", label: "Logout", icon: renderIcon(LuLogOut)},
    { href: "/settings", label: "Setting", icon: renderIcon(LuSettings)},
];

export const menuChatElements = [
    { href: "/profile", label: "Profile", icon: renderIcon(LuUser)},
    { href: "/game", label: "Play a game", icon: renderIcon(LuGamepad2)},
    { href: "/block", label: "Block", icon: renderIcon(LuUserX)},
];

export const landing_page_description =
    "ft_transcendence is the last common core project of école 42. The superficial purpose of this project is to implement a real-time online pong contest website, This project is about creating a website for\
 the mighty Pong contest! Thanks to your website, users will play Pong with others.\
You will provide a nice user interface, a chat, and real-time multiplayer online games!";
