import { theme } from "@/constants/theme";
import { wp } from "@/helpers/common";
import React from "react";
import { FlatList, Pressable, StyleSheet, Text } from "react-native";
import Animated, { FadeInRight } from "react-native-reanimated";
import categoriesData from "../../constants/Data/CategoriesData";

const Categories = ({
  activeCategory,
  handleChangeCategory,
}: {
  activeCategory: string | null;
  handleChangeCategory: (cat: string) => void;
}) => {
  return (
    <FlatList
      horizontal
      contentContainerStyle={{ paddingRight: 15 }}
      data={categoriesData}
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item) => item}
      renderItem={({ item: ele }) => (
        <CategoryItem
          activeCategory={activeCategory}
          handleChangeCategory={handleChangeCategory}
          isActive={activeCategory === ele}
          ele={ele}
          index={categoriesData.indexOf(ele)}
        />
      )}
    />
  );
};

export default Categories;

function CategoryItem({
  ele,
  handleChangeCategory,
  activeCategory,
  isActive,
  index,
}: {
  ele: string;
  handleChangeCategory: (cat: string) => void;
  activeCategory: string | null;
  isActive: boolean;
  index: number;
}) {
  const color = isActive ? theme.colors.white : theme.colors.neutral(0.8);
  const backgroundColor = isActive
    ? theme.colors.neutral(0.9)
    : theme.colors.white;
  return (
    <Animated.View
      entering={FadeInRight.delay(index * 200)
        .duration(1000)
        .springify()
        .damping(0)}
    >
      <Pressable
        key={ele}
        onPress={() => handleChangeCategory(ele)}
        style={[style.categoryButton, { backgroundColor }]}
      >
        <Text style={[style.categoryButtonText, { color }]}>{ele}</Text>
      </Pressable>
    </Animated.View>
  );
}

const style = StyleSheet.create({
  categoryButton: {
    backgroundColor: theme.colors.greyBG,
    padding: 8,
    borderRadius: theme.radius.lg,
    marginHorizontal: 6,
  },

  categoryContainer: {
    width: wp(100),
    flex: 1,
    marginRight: 90,
  },
  categoryButtonText: {
    color: theme.colors.black,
    textTransform: "capitalize",
    fontWeight: theme.fontWeights.medium as any,
  },
});
