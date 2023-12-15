import { MouseEventHandler } from "react";

export interface CustomButtonProps {
  color: string;
  text: string;
  otherclass?: string;
  styleclass?: string;
  handleclick?: any;
  btnType?: "button" | "submit";
  isLoading?: boolean;
}

export interface AcheivementProps {
  text: string;
  isOpened: boolean;
  classname?: string;
  description: string;
  color?: string;
  otherclass?: string;
  styleclass?: string;
  bordercolor?: string;
  handleclick?: MouseEventHandler<HTMLButtonElement>;
  onclose?: MouseEventHandler<HTMLButtonElement>;
}

// export interface AcheivementProps {
//   text: string;
//   isOpened: boolean;
// }

export interface AnimatedTextProps {
  text: string;
  customclass?: string;
  limit: number;
  maxwidth: string;
  color: string;
}

export interface MyDropdownProps {
  icontype: string;
  items: object;
}

export enum channel_type {
  PRIVATE,
  PUBLIC,
  PROTECTED,
  DIRECT,
}

export interface Channel {
  name: string;
  description?: string;
  avatar?: string;
  hash?: string;
  type: string;
  users?: User[];
  id_channel?: string;
}

export interface Room_Chat {
	name: String;
	user_role: "ADMIN" | "MEMBER" | "OWNER";
	member_status: "MUTED" | "BANNED" | "NONE";
	lefted: Boolean; 
	blocked_users: User[];
	id_user: String;
	user: User; 
	id_channel: String;
}

export interface User {
  id_user: string;
  username: string;
  firstname?: string;
  lastname?: string;
  avatar?: string;
  hash?: string;
  email: string;
  two_fact_auth?: string;
  tfaIsEnable: Boolean;
  victory: number;
  defeats: number;
  level: number;
  rank?: number;
  status: "ONLINE" | "OFFLINE" | "INGAME";
  // created_at: DateTime;
  // updated_at: DateTime;
  rooms: Room_Chat[];
  blocked: Room_Chat[];
  channels?: Channel[];
  // messages: Message[]
  // notifications Notification[]
  // freindship_freind: Freindship[];
  // freindship_user: Freindship[];
  // matchs Match_History[]
  // owned: Owned[]
}
