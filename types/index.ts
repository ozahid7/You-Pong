import { MouseEventHandler } from "react";

export interface CustomButtonProps {
    color: string;
    text: string;
    otherclass?: string;
    styleclass?: string;
    bordercolor?: string;
    handleclick?: MouseEventHandler<HTMLButtonElement>;
}

export interface AcheivementProps{
    text: string
    isOpened: boolean
}

export interface AnimatedTextProps {
    text: string;
    customclass?: string;
    limit: number;
    maxwidth: string;
    color: string;
}

export interface MyDropdownProps {
    icontype: string
    items: object
}

export enum channel_type {
	PRIVATE,
	PUBLIC,
	PROTECTED,
	DIRECT
}

export interface Channel {
    name: string,
    description: string,
    avatar: string,
    hash: string,
    type: string,  
}