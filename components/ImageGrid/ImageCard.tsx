import { getColumnCount, wp } from "@/helpers/common";
import React from "react";
import { Image, View } from "react-native";

const ImageCard = ({ image }: { image: any }) => {
  const column = getColumnCount();
  const imageSize = wp(100) / column - 20;
  return (
    <View style={{ width: wp(50), padding: 10 }}>
      <Image
        source={{ uri: image?.webformatURL }}
        style={{
          width: imageSize,
          height: (image.webformatHeight / image.webformatWidth) * wp(45),
          borderRadius: 10,
        }}
        resizeMode="cover"
      />
    </View>
  );
};

export default ImageCard;
