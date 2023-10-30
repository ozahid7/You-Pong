import { MouseEventHandler } from "react";

export interface CustomButtonProps {
    color: string;
    text: string;
    bordercolor?: string;
    handleclick?: MouseEventHandler<HTMLButtonElement>;
}