import { LuMenu, LuLogOut, LuSettings } from "react-icons/lu";
import { renderIcon } from "@/utils";



//render react icons
export const menuElements = [
    { href: "/login", label: "Logout", icon: renderIcon(LuLogOut)  },
    { href: "/settings", label: "Setting", icon: renderIcon(LuSettings)},
];