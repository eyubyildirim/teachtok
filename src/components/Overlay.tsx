import { FontAwesome5 } from "@expo/vector-icons";
import { FunctionComponent } from "react";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface OverlayProps {}

const Overlay: FunctionComponent<OverlayProps> = () => {
  return (
    <SafeAreaView
      className="absolute flex flex-row justify-between w-full px-4"
      style={{
        zIndex: 10,
      }}
      edges={["top"]}
    >
      <View className="flex flex-row justify-start items-center w-8">
        <FontAwesome5 name="stopwatch" size={24} color="#b5b5b2" />
        <Text
          className="ml-1"
          style={{
            color: "#b5b5b2",
          }}
        >
          10m
        </Text>
      </View>
      <View className="flex flex-col items-center">
        <Text className="text-white text-base">For You</Text>
        <View className="t-2 w-2/3 h-1 bg-white" />
      </View>
      <View className="flex w-8">
        <FontAwesome5 name="search" size={24} color="white" />
      </View>
    </SafeAreaView>
  );
};

export default Overlay;
