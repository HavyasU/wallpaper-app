import { getColumnCount, wp } from "@/helpers/common";
import React from "react";
import { Image, Pressable } from "react-native";

const ImageCard = ({ image, router }: { image: any; router: any }) => {
  const column = getColumnCount();
  const imageSize = wp(100) / column - 25;
  return (
    <Pressable
      onPress={() => {
        router.push({ pathname: "home/image", params: { ...image } });
      }}
      style={{ width: imageSize, margin: 3 }}
    >
      <Image
        source={{ uri: image?.webformatURL }}
        style={{
          width: imageSize,
          height: (image.webformatHeight / image.webformatWidth) * wp(45),
          borderRadius: 8,
        }}
        resizeMode="cover"
      />
    </Pressable>
  );
};

export default ImageCard;
