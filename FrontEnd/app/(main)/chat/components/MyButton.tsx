import { ButtonProps } from "@nextui-org/react";
import { Button as NextUIButton } from "@nextui-org/react";
export default function MyButton({
  children,
  color,
  className,
  ...rest
}: ButtonProps) {
  if (color === "primary") {
    className = `${className} hover:bg-primary-800 dark:hover:bg-primary-100`;
  }
  if (color === "default" || color === undefined) {
    className = `${className} bg-transparent hover:bg-palette-orange dark:hover:bg-palette-orange hover:text-palette-white dark:hover:text-palette-white`;
  }

  return (
    <NextUIButton
      color={color}
      className={className}
      {...rest}
    >
      {children}
    </NextUIButton>
  );
}
