import { FunctionComponent } from "react";
import { View, Text } from "react-native";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";

interface PlaylistProps {
  playlist: string;
  unit: string;
}

const Playlist: FunctionComponent<PlaylistProps> = ({ playlist, unit }) => {
  return (
    <View
      className="flex flex-row w-full justify-between items-center px-4 py-2"
      style={{
        backgroundColor: "#161616",
      }}
    >
      <View className="flex flex-row items-center">
        <MaterialCommunityIcons name="playlist-play" size={24} color="white" />
        <Text className="text-white font-semibold"> Playlist • </Text>
        <Text className="text-white font-semibold">
          Unit {unit}: {playlist}
        </Text>
      </View>
      <MaterialIcons name="arrow-forward-ios" size={20} color="white" />
    </View>
  );
};

export default Playlist;
