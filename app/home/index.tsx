import Categories from "@/components/Categories/Categories";
import { theme } from "@/constants/theme";
import { hp, wp } from "@/helpers/common";
import { Feather, FontAwesome6, Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import React, { useRef } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const HomeScreen = () => {
  const { top } = useSafeAreaInsets();
  const [search, setSearch] = React.useState<string>("");
  const searchInputref = useRef(null);

  const paddingTop = top > 0 ? top + 10 : 30;
  return (
    <View style={(style.container, { paddingTop })}>
      <StatusBar style="dark" />
      <View style={style.header}>
        <Pressable>
          <Text style={style.title}>Pixels</Text>
        </Pressable>
        <Pressable>
          <FontAwesome6
            style={style.filterIcon}
            name="bars-staggered"
            color={theme.colors.black}
          />
        </Pressable>
      </View>
      <ScrollView
        contentContainerStyle={{
          gap: 15,
        }}
      >
        <View style={style.searchBar}>
          <View style={style.searchIcon}>
            <Feather
              size={24}
              color={theme.colors.neutral(0.4)}
              name="search"
            />
          </View>
          <TextInput
            keyboardAppearance="light"
            placeholder="Search for Photos"
            style={style.searchInput}
            ref={searchInputref}
            value={search}
            onChangeText={(val) => setSearch(val)}
          />
          {search && (
            <Pressable onPress={() => setSearch("")}>
              <Ionicons
                style={style.closeIcon}
                name="close"
                color={theme.colors.neutral(0.4)}
              />
            </Pressable>
          )}
        </View>
        <View style={style.categories}>
          <Categories />
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

const style = StyleSheet.create({
  container: {
    flex: 1,
    gap: 15,
  },
  header: {
    marginHorizontal: wp(4),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: hp(3.5),
    fontWeight: theme.fontWeights.bold as any,
  },
  filterIcon: {
    fontSize: hp(3.5),
  },

  // Search Bar Styles

  searchBar: {
    marginHorizontal: wp(4),
    marginVertical: 6,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: theme.radius.sm,
    borderColor: theme.colors.greyBG,
    backgroundColor: theme.colors.white,
    padding: 6,
  },
  searchIcon: {},
  searchInput: {
    flex: 1,
    fontSize: hp(1.8),
    marginLeft: 6,
    paddingVertical: 10,
  },
  closeIcon: {
    backgroundColor: theme.colors.neutral(0.1),
    padding: 8,
    borderRadius: theme.radius.xs,
  },

  categories: {
    display: "flex",
    width: wp(100),
    flex: 1,
    marginHorizontal: wp(4),
  },
});
