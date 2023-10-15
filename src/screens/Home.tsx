import { FunctionComponent, useEffect, useState } from "react";
import {
  ActivityIndicator,
  ImageBackground,
  Text,
  View,
  Image,
} from "react-native";
import Overlay from "../components/Overlay";
import PagerView from "react-native-pager-view";
import { useQuery } from "react-query";
import { get } from "../util/api/axios";
import { Question } from "../types/question";
import { SafeAreaView } from "react-native-safe-area-context";
import Options from "../components/Options";
import Playlist from "../components/Playlist";
import { MaterialCommunityIcons, Entypo } from "@expo/vector-icons";
import IconWithLabel from "../components/IconWithLabel";

interface HomeProps {}

const Home: FunctionComponent<HomeProps> = () => {
  const [sessionQuestions, setSessionQuestions] = useState<Question[]>([]);

  const { refetch: nextQuestion, isLoading: questionLoading } = useQuery({
    queryKey: "fetchQuestion",
    queryFn: async () => {
      const res = await get("https://cross-platform.rp.devfactory.com/for_you");

      const question = res.data as Question;

      setSessionQuestions([...sessionQuestions, question]);

      return;
    },
    onError: (err) => {
      console.log(JSON.stringify(err));
    },
    retry: false,
  });

  return (
    <View className="bg-black h-full w-full flex-col flex">
      <Overlay />
      {questionLoading ? (
        <View className="flex flex-col justify-center h-full">
          <ActivityIndicator size={"large"} />
        </View>
      ) : (
        <PagerView
          initialPage={0}
          className="flex flex-1"
          orientation={"vertical"}
          onPageSelected={async ({ nativeEvent }) => {
            if (nativeEvent.position >= sessionQuestions.length - 3) {
              await nextQuestion();
              await nextQuestion();
              nextQuestion();
            }
          }}
        >
          {sessionQuestions.map((question, i) => {
            return (
              <ImageBackground
                key={i}
                className="h-full w-full flex-col flex"
                imageStyle={{ resizeMode: "cover", opacity: 0.5 }}
                source={{
                  uri: question.image,
                }}
              >
                <SafeAreaView
                  className="h-full w-full flex flex-col justify-around"
                  edges={["top"]}
                >
                  <View className="flex-1 flex flex-col justify-center px-4">
                    <View className="bg-black/60 w-2/3 rounded-xl">
                      <Text className="text-white text-xl p-2">
                        {question.question}
                      </Text>
                    </View>
                  </View>
                  <View className="flex flex-col w-full">
                    <View className="flex flex-row w-full px-4 items-end">
                      <View className="flex flex-col flex-1">
                        <Options
                          options={question.options}
                          questionId={question.id}
                        />
                        <Text className="text-base font-semibold text-white mt-4">
                          {question.user.name}
                        </Text>
                        <Text className="text-sm text-white mb-4">
                          {question.description}
                        </Text>
                      </View>
                      <View className="flex flex-col ml-2 items-center justify-around h-[42vh] mb-4">
                        <View>
                          <Image
                            source={{
                              uri: question.user.avatar,
                            }}
                            className="w-12 aspect-square border border-white rounded-full"
                          />
                          <View className="rounded-full items-center justify-center flex flex-row w-4 aspect-square absolute top-10 left-4 bg-[#28b18f]">
                            <Entypo
                              name="plus"
                              size={16}
                              color="white"
                              style={{
                                marginLeft: 1,
                              }}
                            />
                          </View>
                        </View>
                        <IconWithLabel
                          Icon={
                            <MaterialCommunityIcons
                              name="heart"
                              size={32}
                              color="white"
                              className="absolute bottom-0 right-0"
                            />
                          }
                          label="87"
                        />
                        <IconWithLabel
                          Icon={
                            <MaterialCommunityIcons
                              name="comment-processing"
                              size={32}
                              color="white"
                              className="absolute bottom-0 right-0"
                            />
                          }
                          label="2"
                        />
                        <IconWithLabel
                          Icon={
                            <MaterialCommunityIcons
                              name="bookmark"
                              size={32}
                              color="white"
                              className="absolute bottom-0 right-0"
                            />
                          }
                          label="203"
                        />
                        <IconWithLabel
                          Icon={
                            <Entypo
                              name="forward"
                              size={32}
                              color="white"
                              className="absolute bottom-0 right-0"
                            />
                          }
                          label="17"
                        />
                      </View>
                    </View>
                    <View className="flex flex-col justify-end">
                      <Playlist
                        playlist={question.playlist}
                        unit={question.description[0]}
                      />
                    </View>
                  </View>
                </SafeAreaView>
              </ImageBackground>
            );
          })}
        </PagerView>
      )}
    </View>
  );
};

export default Home;
