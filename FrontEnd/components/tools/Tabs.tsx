"use client";
import { motion } from "framer-motion";
import React, { useId } from "react";
import { twMerge } from "tailwind-merge";

interface Props extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  value: number;
  active?: {
    className?: string;
    style?: React.CSSProperties;
  };
  label?: {
    className?: string;
    style?: React.CSSProperties;
  };
  onChange: (value: number) => void;
  labels: (React.ReactNode | string)[];
  indicator?: {
    className?: string;
  };
}

function MyTabs({
  value,
  onChange,
  labels,
  className,
  indicator,
  label,
  active,
  ...props
}: Props) {
  const layoutId = useId();
  return (
    <div
      className={twMerge("flex gap-4 ", className)}
      {...props}
    >
      {(labels || [])?.map((l, index) => {
        return (
          <button
            className="label relative w-full "
            key={index}
            onClick={() => {
              onChange(index);
            }}
          >
            <span
              className={twMerge(
                label?.className,
                value === index && active?.className
              )}
            >
              {l}
            </span>
            {value === index && (
              <motion.div
                layoutId={layoutId}
                transition={{ type: "spring", mass: 0.5 }}
                className={twMerge(
                  "absolute bottom-0 h-1 w-[91%] rounded",
                  indicator?.className
                )}
              ></motion.div>
            )}
          </button>
        );
      })}
    </div>
  );
}

export default MyTabs;
