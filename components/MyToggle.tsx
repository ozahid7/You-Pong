"use client";
import { useState } from "react";
import { Switch } from "@headlessui/react";

interface MyToggleProps {
    Default: string
    enable: string
}

function MyToggle({Default, enable}: MyToggleProps) {
    const [enabled, setEnabled] = useState(false);

    return (
        <div className="p-2 dred">
            <Switch
                checked={enabled}
                onChange={setEnabled}
                className={`w-[140px] h-[42px] pr-3 flex items-center justify-around ${
                    enabled
                        ? "bg-palette-orange border-2 border-orangeborder"
                        : "bg-palette-green border-2 border-greenborder"
                }
          relative inline-flex h-[38px] w-[74px] shrink-0 cursor-pointer rounded-sm transition-colors duration-200 ease-in-out focus-visible:ring-2  focus-visible:ring-white/75`}
            >
                <span
                    className={` font-body font-bold text-white text-lg ml-3 ${
                        enabled ? "flex " : "hidden"
                    }`}
                >
                    {Default}
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
                    {enable}
                </span>
            </Switch>
        </div>
    );
}

export default MyToggle;
