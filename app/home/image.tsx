import { theme } from "@/constants/theme";
import { hp, wp } from "@/helpers/common";
import { Octicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { Directory, File, Paths } from "expo-file-system";
import { Image } from "expo-image";
import * as MediaLibrary from "expo-media-library";
import { useLocalSearchParams, useRouter } from "expo-router";
import * as Sharing from "expo-sharing";
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Platform,
  Pressable,
  StyleSheet,
  View,
} from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
const ImageScreen = () => {
  const router = useRouter();
  const item = useLocalSearchParams();
  let uri = item?.webformatURL;
  const isWeb = Platform.OS === "web";
  const fileName = item?.previewURL?.split("/").pop();

  const destination = isWeb ? null : new Directory(Paths.cache, "pixels");

  const getSize = () => {
    const imageWidth = Number(item.previewWidth);
    const imageHeight = Number(item.previewHeight);

    const aspectRatio = imageWidth / imageHeight;
    console.log(imageHeight);
    const maxWidth =
      Platform.OS === "web" ? (imageHeight > 90 ? wp(25) : wp(50)) : wp(92);
    let calculatedHeight = maxWidth / aspectRatio;
    let calculatedWidth = maxWidth;

    if (aspectRatio < 1) {
      calculatedWidth = calculatedHeight * aspectRatio;
    }

    return {
      width: calculatedWidth,
      height: calculatedHeight,
    };
  };
  const [status, setStatus] = useState<string>("loading");
  const [permissionResponse, requestPermission] = MediaLibrary.usePermissions({
    writeOnly: true,
  });
  const onLoad = () => {
    setStatus("");
  };

  const getLocalFilePath = async () => {
    try {
      if (permissionResponse?.status !== "granted") {
        const { status } = await requestPermission();
        if (status !== "granted") return;
      }

      const cacheDirectory = new Directory(Paths.cache, "pixels");
      if (!cacheDirectory?.exists) {
        cacheDirectory.create();
      }
      const targetFile = new File(cacheDirectory, fileName);
      try {
        if (targetFile.exists) {
          targetFile.delete();
        }
      } catch (e) {
        Alert.alert("Error", "Error In Deleting Existing File");
        // File doesn't exist, continue
      }

      await File.downloadFileAsync(uri, targetFile);
      return targetFile;
    } catch (error) {
      console.log("Error in localizing file:", error);
      return null;
    }
  };

  const handleShareImage = async () => {
    setStatus("loading");

    //web version

    if (isWeb) {
      try {
        //copy to clipboard
        await navigator.clipboard.writeText(uri as string);
        alert("Image URL copied to clipboard. You can now share it anywhere!");
      } catch (error) {
        console.log("Error while sharing", error);
      } finally {
        setStatus("");
      }
      return;
    }

    //mobile version
    if (!isWeb) {
      try {
        const targetFile = await getLocalFilePath();
        if (!targetFile?.exists) {
          Alert.alert("Download Failed", "Could not download the image");
          setStatus("");
          return;
        } else {
          if (await Sharing?.isAvailableAsync()) {
            await Sharing.shareAsync(targetFile.uri, {
              dialogTitle: "Share this document",
              mimeType: "application/pdf",
            });
          }
        }
      } catch (error) {
        console.log("Error while sharing", error);
      } finally {
        setStatus("");
      }
    }
  };

  const handleDownloadImage = async () => {
    //web logic
    setStatus("loading");
    if (isWeb) {
      const response = await fetch(uri);
      const blob = await response.blob();

      const blobUrl = URL.createObjectURL(blob);
      const link = document.createElement("a") as HTMLAnchorElement;

      link.href = blobUrl;

      link.download = fileName;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setStatus("downloaded");
      return;
    }

    //mobile logic
    try {
      setStatus("loading");
      if (!uri) {
        Alert.alert("Image", "No Image URL");
      }
      const targetFile = await getLocalFilePath();

      if (!targetFile?.exists) {
        Alert.alert("Download Failed", "Could not download the image");
        setStatus("");
        return;
      } else {
        await MediaLibrary.saveToLibraryAsync(targetFile.uri);
        Alert.alert("Success", "Image saved to gallery");
      }
    } catch (error) {
      console.log(error);
      Alert.alert("Image Download", error?.message);
    } finally {
      setStatus("downloaded");
    }
    // await downloadImage();
  };

  return (
    <BlurView style={styles.containerStyle} tint="dark" intensity={60}>
      <View style={getSize()}>
        {/* <View style={styles.loading}>
          {status === "loading" && (
            <ActivityIndicator size={"large"} color={"white"} />
          )}
        </View> */}
        <Image
          transition={100}
          style={[styles.image, getSize()]}
          source={uri}
          onLoad={onLoad}
        />
      </View>
      {status === "loading" && (
        <View style={styles.loading}>
          {status === "loading" && (
            <ActivityIndicator size={"large"} color={""} />
          )}
        </View>
      )}
      <View style={styles.buttonsContainer}>
        <Animated.View entering={FadeInDown.springify()}>
          <Pressable onPress={() => router?.back()} style={styles.buttonStyles}>
            <Octicons color={"white"} name="x" size={25} />
          </Pressable>
        </Animated.View>
        <Animated.View entering={FadeInDown.springify().delay(100)}>
          <Pressable onPress={handleDownloadImage} style={styles.buttonStyles}>
            <Octicons color={"white"} name="download" size={25} />
          </Pressable>
        </Animated.View>
        <Animated.View entering={FadeInDown.springify().delay(200)}>
          <Pressable
            onPress={() => handleShareImage()}
            style={styles.buttonStyles}
          >
            <Octicons color={"white"} name="share-android" size={25} />
          </Pressable>
        </Animated.View>
      </View>
    </BlurView>
  );
};

export default ImageScreen;
const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: wp(4),
    backgroundColor: "rgb(0,0,0,.5)",
  },
  image: {
    borderRadius: theme.radius.md,
    borderWidth: 5,
    backgroundColor: "rgb(255,255,255,.1)",
    borderColor: "rgb(255,255,255,0.4)",
    marginBlock: 10,
  },
  loading: {
    position: "absolute",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonsContainer: {
    marginTop: 30,
    flexDirection: "row",
    alignItems: "center",
    gap: 50,
  },
  buttonStyles: {
    width: hp(6),
    height: hp(6),
    justifyContent: "center",
    alignItems: "center",
    margin: "auto",
    color: "white",
    borderRadius: theme.radius.full,
    backgroundColor: "rgb(255,255,255,.2)",
  },
});
