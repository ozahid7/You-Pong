import { MouseEventHandler } from "react";

export interface CustomButtonProps {
    color: string;
    text: string;
    otherclass?: string;
    styleclass?: string;
    handleclick?: MouseEventHandler<HTMLButtonElement>;
    btnType?: "button" | "submit";
}

export interface AcheivementProps{
    text: string
    isOpened: boolean
    classname?: string
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