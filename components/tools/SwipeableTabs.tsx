import React from "react";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
}
const SwipeableTabs = ({ value, className, children }: Props) => {
  const tabs = React.Children.toArray(children);
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {tabs.map((tab, i) => {
        const traslateX = i === value ? 0 : i > value ? 100 : -100;
        return (
          <div
            className="absolute h-full w-full overflow-x-hidden transition-[transform,opacity] duration-300 ease-in-out"
            key={i}
            style={{
              transform: ` translate(${traslateX}%) `,
              opacity: i === value ? 1 : 0,
            }}
          >
            {tab}
          </div>
        );
      })}
    </div>
  );
};

export default SwipeableTabs;