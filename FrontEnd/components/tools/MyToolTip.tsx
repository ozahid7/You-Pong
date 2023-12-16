'use client'
import React from 'react'
import { Tooltip } from 'react-tooltip';

const MyToolTip = (props: {id: string}) => {
  return (
      <Tooltip
          id={props.id}
          className="greenTooltip max-w-[160px] font-body border-2 border-palette-grey font-semibold drop-shadow-lg z-10"
          style={{
              backgroundColor: "#46686A",
              color: "#fff",
          }}
          opacity={1}
          place={"top"}
      />
  );
}

export default MyToolTip