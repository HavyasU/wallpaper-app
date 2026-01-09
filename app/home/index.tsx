import { apicall } from "@/api";
import Categories from "@/components/Categories/Categories";
import ImageGrid from "@/components/ImageGrid/ImageGrid";
import { theme } from "@/constants/theme";
import { hp, wp } from "@/helpers/common";
import { Feather, Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { debounce } from "lodash";

import React, { useCallback, useEffect, useRef } from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

let page = 1;

const HomeScreen = () => {
  const { top } = useSafeAreaInsets();
  const [search, setSearch] = React.useState<string>("");
  const [images, setImages] = React.useState<any[]>([]);
  const searchInputref = useRef(null);
  const router = useRouter();

  const paddingTop = top > 0 ? top + 10 : 30;
  const [activeCategory, setActiveCategory] = React.useState<string | null>(
    null
  );

  const clearSearch = () => {
    searchInputref?.current?.clear();
    setSearch("");
  };

  const handleChangeCategory = (cat: string) => {
    setActiveCategory(cat);
    clearSearch();
    setImages([]);
    page = 1;
    const params = { page, category: "" };

    if (cat) {
      params.category = cat;
    }

    fetchImages(params, false);
  };

  const fetchImages = async (
    params: object = { page: 1 },
    append: boolean = true
  ): Promise<void> => {
    try {
      console.log(params, append);
      let res = await apicall(params);
      if (res?.status === 200 && res?.data?.hits) {
        setImages((pev: any[]) => {
          return append ? [...pev, ...res.data.hits] : res.data.hits;
        });
      }
    } catch (error) {
      console.log("Error fetching images", error);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const handleSearch = (text: string) => {
    console.log("Search For ", text);
    setSearch(text);

    if (text.length > 2) {
      page = 1;
      setImages([]);
      fetchImages({ page, q: text }, false);
    }

    if (text === "") {
      //reset
      page = 1;
      searchInputref?.current?.clear();
      setImages([]);
      fetchImages({ page }, false);
    }
  };

  const handleTextDebounce = useCallback(debounce(handleSearch, 500), []);

  return (
    <View style={[style.container, { paddingTop }]}>
      <StatusBar style="dark" />
      <View style={style.header}>
        <Pressable>
          <Text style={style.title}>Pixels</Text>
        </Pressable>
      </View>

      {/* Search Bar */}
      <View style={style.searchBar}>
        <View style={style.searchIcon}>
          <Feather size={24} color={theme.colors.neutral(0.4)} name="search" />
        </View>
        <TextInput
          keyboardAppearance="light"
          placeholder="Search for Photos"
          style={[style.searchInput, { outlineStyle: "none" } as any]}
          ref={searchInputref}
          returnKeyType="search"
          onChangeText={handleTextDebounce}
        />
        {search && (
          <Pressable onPress={() => handleSearch("")}>
            <Ionicons
              style={style.closeIcon}
              name="close"
              color={theme.colors.neutral(0.4)}
            />
          </Pressable>
        )}
      </View>

      {/* Categories */}
      <View style={style.categories}>
        <Categories
          activeCategory={activeCategory}
          handleChangeCategory={handleChangeCategory}
        />
      </View>
      <View
        // contentContainerStyle={{
        //   alignContent: "center",
        //   justifyContent: "center",
        // }}
        // // scrollEnabled={false}
        // persistentScrollbar
        style={{ flex: 1 }}
      >
        {/* Images Grid */}
        {images?.length === 0 && (
          <View style={style.loading}>
            <ActivityIndicator size={"large"} color={"black"} />
          </View>
        )}
        {images?.length > 0 && (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <ImageGrid
              router={router}
              fetchImages={fetchImages}
              images={images}
            />
          </View>
        )}
      </View>
    </View>
  );
};

export default HomeScreen;

const style = StyleSheet.create({
  container: {
    flex: 1,
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
    paddingHorizontal: 10,
  },
  loading: {
    position: "absolute",
    top: 40,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  searchIcon: {},
  searchInput: {
    flex: 1,
    fontSize: hp(1.8),
    marginLeft: 6,
    paddingVertical: 10,
    borderRadius: 4,
    padding: 10,
  },
  closeIcon: {
    backgroundColor: theme.colors.neutral(0.1),
    padding: 8,
    borderRadius: theme.radius.xs,
  },

  categories: {
    display: "flex",
    width: wp(100),
    paddingVertical: 5,
    marginHorizontal: wp(1),
  },
});
