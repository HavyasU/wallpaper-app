import { theme } from "@/constants/theme";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { hp, wp } from "./../helpers/common";
const WelcomeScreen = () => {
  const router = useRouter();
  const navigateToHome = () => {
    router.push("/home");
  };
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Image
        source={require("../assets/images/welcome.png")}
        resizeMode="cover"
        style={styles?.bgImage}
      />

      {/* Linear Gradient */}
      <Animated.View entering={FadeInDown.duration(700)} style={{ flex: 1 }}>
        <LinearGradient
          colors={[
            "rgba(255,255,255,0.0)",
            "rgba(255,255,255,.5)",
            "white",
            "white",
          ]}
          style={styles.gradient}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 0.8 }}
        />
        <View style={styles.contentContainer}>
          <Animated.Text
            entering={FadeInDown.delay(400).springify()}
            style={styles.title}
          >
            Pixels
          </Animated.Text>
          <Animated.Text
            entering={FadeInDown.delay(500).springify()}
            style={styles.punchline}
          >
            Every Pixel Starts a Story
          </Animated.Text>
          <Animated.View entering={FadeInDown.delay(600).springify()}>
            <Pressable onPress={navigateToHome} style={styles.exploreButton}>
              <Text style={styles.exploreText}>Explore</Text>
            </Pressable>
          </Animated.View>
        </View>
        {/* Content */}
      </Animated.View>
    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bgImage: {
    width: wp(100),
    position: "absolute",
  },
  gradient: {
    width: wp(100),
    height: hp(60),
    position: "absolute",
    bottom: 0,
  },
  contentContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    gap: 2,
  },
  title: {
    fontSize: hp(6),
    fontWeight: theme.fontWeights.bold as any,
    color: theme.colors.black,
  },
  punchline: {
    fontSize: hp(2),
    fontWeight: theme.fontWeights.bold as any,
    color: theme.colors.black,
    marginBottom: 20,
  },
  exploreButton: {
    height: hp(12),
  },
  exploreText: {
    width: wp(60),
    // height: hp(4),
    backgroundColor: theme.colors.black,
    color: theme.colors.white,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    fontSize: hp(2.2),
    padding: 5,
    letterSpacing: 2,
    paddingBlock: 13,
    borderRadius: theme.radius.xl,
    fontWeight: theme.fontWeights.bold as any,
  },
});
