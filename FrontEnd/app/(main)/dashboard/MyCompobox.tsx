'use client'
import { useState } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { LuSearch } from "react-icons/lu";

const people = [
    { id: 1, name: "Durward Reynolds" },
    { id: 2, name: "Kenton Towne" },
    { id: 3, name: "Therese Wunsch" },
    { id: 4, name: "Benedict Kessler" },
    { id: 5, name: "Katelyn Rohan" },
];

function MyCombobox() {
    const [selectedPerson, setSelectedPerson] = useState(people[0]);
    const [query, setQuery] = useState("");

    const filteredPeople =
        query === ""
            ? people
            : people.filter((person) => {
                  return person.name
                      .toLowerCase()
                      .includes(query.toLowerCase());
              });

    return (
        <Combobox value={selectedPerson} onChange={setSelectedPerson}>
            <div className="search_input_friends  w-[90%]  p-[2px] sm:max-h-[56px]   max-h-[46px] h-[10%] flex justify-center items-center">
                <div className="center pl-3 outline-none w-full h-full  flex justify-center items-center overflow-hidden">
                    <LuSearch className="h-7 w-7 text-placeholdercolor" />
                    <Combobox.Input
                        className="center text-cardtitle font-body placeholder:font-bold fold:placeholder:text-lg placeholder-placeholdercolor pl-5 outline-none h-full w-[84%]"
                        onChange={(event) => setQuery(event.target.value)}
                        displayValue={(person: any) => person.name}
                    />
                </div>
            </div>

            <Transition
                className={'w-[90%] z-10 relative'}
                enter="transition duration-100 ease-out"
                enterFrom="transform scale-95 opacity-0"
                enterTo="transform scale-100 opacity-100"
                leave="transition duration-75 ease-out"
                leaveFrom="transform scale-100 opacity-100"
                leaveTo="transform scale-95 opacity-0"
            >
                <Combobox.Options
                    className='bg-white w-full z-30 absolute'
                >
                    {filteredPeople.map((person) => (
                        <Combobox.Option className='' key={person.id} value={person}>
                            {person.name}
                        </Combobox.Option>
                    ))}
                </Combobox.Options>
            </Transition>
        </Combobox>
    );
}

export default MyCombobox;
