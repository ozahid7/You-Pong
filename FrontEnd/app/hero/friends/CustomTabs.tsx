"use client";
import React, { useState } from "react";
import { Tab } from "@headlessui/react";

const CustomTabs = () => {
    const [index, setIndex] = useState(0);

    return (
        <div className="w-full flex flex-col items-center h-[70%] dred">
            <Tab.Group
                defaultIndex={0}
                onChange={(index) => {
                    setIndex(index);
                }}
            >
                <Tab.List className="bg-[#819FA1] outline-none min-h-[50px] overflow-hidden py-2 w-[90%] flex rounded-sm  justify-evenly">
                    <Tab
                        className={`outline-none text-sm md:text-lg font-body xl:text-xl drop-shadow-lg  ${
                            index === 0 ? "border-b-2 border-white" : ""
                        } font-semibold text-white rounded- hover:scale-110`}
                    >
                        Friend Request
                    </Tab>

                    {/* Selects this tab by default */}
                    <Tab
                        className={`outline-none text-sm md:text-lg  font-body xl:text-xl drop-shadow-lg  ${
                            index === 1 ? "border-b-2 border-white" : ""
                        } font-semibold text-white rounded- hover:scale-110`}
                    >
                        Friend List
                    </Tab>

                    <Tab
                        className={`outline-none text-sm md:text-lg  font-body xl:text-xl drop-shadow-lg  ${
                            index === 2 ? "border-b-2 border-white" : ""
                        } font-semibold text-white rounded- hover:scale-110`}
                    >
                        Blocked
                    </Tab>
                </Tab.List>
                <Tab.Panels className="mt-4 dblue">
                    <Tab.Panel>Content 1</Tab.Panel>

                    {/* Displays this panel by default */}
                    <Tab.Panel>Content 2</Tab.Panel>

                    <Tab.Panel>Content 3</Tab.Panel>
                </Tab.Panels>
            </Tab.Group>
        </div>
    );
};

export default CustomTabs;
