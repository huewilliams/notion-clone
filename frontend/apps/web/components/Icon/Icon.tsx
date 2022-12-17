import React from "react";
import Image from "next/image";
import {ImageProps} from "next/dist/client/image";

interface Props extends Omit<ImageProps, "src" | "alt"> {
  iconName: string;
}

export default function Icon({iconName, ...props}: Props) {
  return (
    <Image
      src={`/icons/${iconName}.svg`}
      alt={iconName}
      style={{fill: "red"}}
      {...props}
    />
  );
}
