import React from "react";

export const renderIcon = (icon: any, style?: string, elmsize?: number) => {
    return React.createElement(icon, {className: style, size: elmsize});
};
