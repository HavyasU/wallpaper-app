import { getColumnCount } from "@/helpers/common";
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
        // style={style.ImagesContainer}
        contentContainerStyle={style.ImagesContainer}
        numColumns={colums}
        masonry
        data={images}
        scrollToOverflowEnabled={true}
        scrollEnabled
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
    flex: 1,
    gap: 8,
    paddingHorizontal: 16,
  },
});
