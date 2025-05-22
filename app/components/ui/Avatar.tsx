import React, { use } from "react";
import { Image } from "expo-image";
import { AuthContext } from "@/context/auth";

interface AvatarProps {
  size?: number;
  image?: string | null;
}

export default function Avatar({ size = 100, image }: AvatarProps) {
  const { user } = use(AuthContext);
  return (
    <Image
      source={
        image || user?.image
          ? { uri: image || user?.image }
          : require("@/assets/img/profile.png")
      }
      style={{
        width: size,
        height: size,
        borderRadius: 999,
      }}
    />
  );
}
