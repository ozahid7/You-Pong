import {
	LuUser,
	LuLogOut,
	LuSettings,
	LuGamepad2,
	LuUserX,
	LuBan,
	LuBellOff,
	LuDoorOpen,
	LuStar,
	LuUsers,
} from "react-icons/lu";
import { renderIcon } from "@/utils";

export const myRoutes = {
	root: "/",
	dashboard: "/user/profile",
	settings: "/settings",
	friends: "/friends",
	chat: "/chat/user",
	game: "/game",
	gameme: "/game/me",
	notfound: "/user",
};

export const socketurl = "http://localhost:4000";
export const defaultavatar = "/defaultavatar.png";

//render react icons
export const navMenuElements = [
	{ href: myRoutes.dashboard, label: "Profile", icon: renderIcon(LuUser) },
	{ href: myRoutes.settings, label: "Setting", icon: renderIcon(LuSettings) },
	{ href: "logout", label: "Logout", icon: renderIcon(LuLogOut) },
];

export const menuChatElements = [
	{ href: "/profile", label: "Profile", icon: renderIcon(LuUser) },
	{ href: "/game", label: "Play a game", icon: renderIcon(LuGamepad2) },
	{ href: "/block", label: "Block", icon: renderIcon(LuUserX) },
];

export const menuUserElements = [
	{ href: "/user/", label: "Profile", icon: renderIcon(LuUser) },
	{ href: "/game", label: "Play With", icon: renderIcon(LuGamepad2) },
	{ href: "block", label: "Block", icon: renderIcon(LuUserX) },
];

export const apiHost = "http://localhost:4000/";

export const menuGroupsElements = [
	{ label: "Members", icon: renderIcon(LuUsers), name: "Members" },
	{ label: "Edit group", icon: renderIcon(LuSettings), name: "Edit" },
];

export const MembersElem = [
	{ href: "/block", label: "Block", icon: renderIcon(LuUserX) },
	{ href: "/ban", label: "Ban", icon: renderIcon(LuBan) },
	{ href: "/mute", label: "Mute", icon: renderIcon(LuBellOff) },
	{ href: "/kick", label: "Kick", icon: renderIcon(LuDoorOpen) },
	{ href: "/admin", label: "Set as admin", icon: renderIcon(LuStar) },
];
export const landing_page_description =
	"ft_transcendence is the last common core project of école 42. The superficial purpose of this project is to implement a real-time online pong contest website, This project is about creating a website for\
 the mighty Pong contest! Thanks to your website, users will play Pong with others.\
You will provide a nice user interface, a chat, and real-time multiplayer online games!";
