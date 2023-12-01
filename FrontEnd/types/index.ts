import { MouseEventHandler } from "react";

export interface CustomButtonProps {
    color: string;
    text: string;
    otherclass?: string;
    styleclass?: string;
    handleclick?: any;
    btnType?: "button" | "submit";
    isLoading?: boolean
}

export interface AcheivementProps{
    text: string
    isOpened: boolean
    classname?: string
    description: string
  color: string;
  otherclass?: string;
  styleclass?: string;
  bordercolor?: string;
  handleclick?: MouseEventHandler<HTMLButtonElement>;
  onclose?: MouseEventHandler<HTMLButtonElement>;
}

export interface AcheivementProps {
  text: string;
  isOpened: boolean;
}

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
}
