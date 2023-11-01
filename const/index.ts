import { LuMenu, LuLogOut, LuSettings } from "react-icons/lu";
import { renderIcon } from "@/utils";



//render react icons
export const menuElements = [
    { href: "/login", label: "Logout", icon: renderIcon(LuLogOut)  },
    { href: "/settings", label: "Setting", icon: renderIcon(LuSettings)},
];

export const landing_page_description = 'This project is about doing something you’ve never done before.\
 Remind yourself the beginning of your journey in computer science.\
 Look at you now. Time to shine! This project is about creating a website for\
 the mighty Pong contest! Thanks to your website, users will play Pong with others.\
You will provide a nice user interface, a chat, and real-time multiplayer online games!'