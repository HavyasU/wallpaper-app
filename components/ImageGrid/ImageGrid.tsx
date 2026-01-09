import { getColumnCount } from "@/helpers/common";
import { FlashList } from "@shopify/flash-list";
import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import ImageCard from "./ImageCard";

const ImageGrid = ({
  images,
  router,
  fetchImages,
}: {
  images: any;
  router: any;
  fetchImages: any;
}) => {
  const columns = getColumnCount();

  const [loading, setLoading] = React.useState<boolean>(false);

  const handleEndReached = async () => {
    if (loading) return;

    const nextPage = Math.ceil(images.length / 20) + 1;

    if (nextPage > 10) return; // API limit
    setLoading(true);

    await fetchImages({ page: nextPage }, true);
    setLoading(false);
  };
  return (
    <View style={{ flex: 1, width: "100%" }}>
      <FlashList<any>
        contentContainerStyle={style.ImagesContainer}
        numColumns={columns}
        masonry
        ListFooterComponent={
          loading ? <ActivityIndicator size="small" /> : null
        }
        data={images}
        // estimatedItemSize={250}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.2}
        scrollEnabled={true}
        renderItem={({ item }) => <ImageCard router={router} image={item} />}
      />
    </View>
  );
};

export default ImageGrid;

const style = StyleSheet.create({
  ImagesContainer: {
    gap: 10,
    paddingHorizontal: 20,
    justifyContent: "center",
  },
});
