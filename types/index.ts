import { MouseEventHandler } from "react";

export interface CustomButtonProps {
    color: string;
    text: string;
    handleclick?: MouseEventHandler<HTMLButtonElement>;
}