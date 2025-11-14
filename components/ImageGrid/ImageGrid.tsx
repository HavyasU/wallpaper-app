import { getColumnCount, wp } from "@/helpers/common";
import { FlashList } from "@shopify/flash-list";
import React from "react";
import { StyleSheet, View } from "react-native";
import ImageCard from "./ImageCard";

const ImageGrid = ({ images }: { images: any }) => {
  const colums = getColumnCount();

  return (
    <View
      style={{
        paddingBottom: 50,
      }}
    >
      <FlashList
        style={style.ImagesContainer}
        numColumns={colums}
        masonry
        data={images}
        renderItem={({ index, item }) => {
          return <ImageCard image={item} />;
        }}
      />
    </View>
  );
};

export default ImageGrid;

const style = StyleSheet.create({
  ImagesContainer: {
    width: wp(100),
    minHeight: 3,
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
  },
});
