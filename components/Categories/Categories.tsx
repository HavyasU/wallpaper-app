import { theme } from "@/constants/theme";
import { wp } from "@/helpers/common";
import React from "react";
import { FlatList, Pressable, StyleSheet, Text } from "react-native";

import categroyData from "../../constants/Data/CategoriesData";
const Categories = () => {
  return (
    <FlatList
      horizontal
      data={categroyData}
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item) => item}
      renderItem={({ item: ele }) => <CategoryItem ele={ele} />}
    />
  );
};

export default Categories;

function CategoryItem({ ele }: { ele: string }) {
  return (
    <Pressable style={style.categoryButton}>
      <Text style={style.categoryButtonText}>{ele}</Text>
    </Pressable>
  );
}

const style = StyleSheet.create({
  categoryButton: {
    backgroundColor: theme.colors.greyBG,
    padding: 8,
    borderRadius: theme.radius.md,
    marginHorizontal: 6,
  },

  categoryContainer: {
    width: wp(100),
    flex: 1,
  },
  categoryButtonText: {
    color: theme.colors.black,
    textTransform: "capitalize",
    fontWeight: theme.fontWeights.medium as any,
  },
});
