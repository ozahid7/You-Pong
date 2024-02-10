"use client";
import { Switch } from "@headlessui/react";
import { twMerge } from "tailwind-merge";

interface MyToggleProps {
    string1?: string;
    string2?: string;
    handelCheck?: any;
    otherclass?: string;
    enabled: boolean;
    setIsEnabled: any;
}

function MyToggle({
    string1,
    string2,
    handelCheck,
    otherclass,
    enabled,
    setIsEnabled,
    
}: MyToggleProps) {
    const classname = twMerge(
        `w-[140px] h-[43px] pr-3 flex items-center justify-around ${
            !enabled
                ? "bg-palette-green border-2 border-greenborder"
                : "bg-palette-orange border-2 border-orangeborder"
        }
          relative inline-flex h-[38px] w-[74px] shrink-0 cursor-pointer rounded-sm transition-colors duration-200 ease-in-out focus-visible:ring-2  focus-visible:ring-white/75`,
        otherclass
    );

    return (
        <div className="">
            <Switch
                checked={enabled}
                onChange={() => {
                    handelCheck();
                    setIsEnabled(!enabled);
                }}
                className={classname}
            >
                <span
                    className={` font-body font-bold text-white text-lg ml-3 ${
                        enabled ? "flex " : "hidden"
                    }`}
                >
                    {string1}
                </span>
                <span
                    aria-hidden="true"
                    className={`${
                        enabled ? "translate-x-[8px]" : "translate-x-0"
                    }
                    pointer-events-none inline-block h-[30px] w-[30px] transform rounded-sm bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
        />
        <span
          className={` ${
            enabled ? "hidden" : "flex"
          } font-body font-bold text-white text-lg`}
        >
          {string2}
        </span>
      </Switch>
    </div>
  );
}

export default MyToggle;
