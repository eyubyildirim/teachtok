import { FunctionComponent, useEffect, useRef, useState } from "react";
import { TouchableOpacity, Text, View } from "react-native";
import { Answer, CorrectOption, Option } from "../types/question";
import { useQuery } from "react-query";
import { get } from "../util/api/axios";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

interface OptionsProps {
  options: Option[];
  questionId: number;
}

const Options: FunctionComponent<OptionsProps> = ({ options, questionId }) => {
  const correctAnswer = useRef("");
  const [optionTrueList, setOptionTrueList] = useState(options.map((o) => 0));

  const { refetch: revealAnswer } = useQuery({
    queryKey: "revealAnswer",
    queryFn: async () => {
      const res = await get(
        `https://cross-platform.rp.devfactory.com/reveal?id=${questionId}`
      );

      const answer = res.data as Answer;

      correctAnswer.current = answer.correct_options[0].id;

      return;
    },
    enabled: false,
    retry: false,
  });

  return (
    <View>
      {options.map((o, i) => {
        return (
          <QuestionOption
            i={i}
            option={o}
            optionTrue={optionTrueList[i]}
            onPress={async () => {
              await revealAnswer();
              if (correctAnswer.current === o.id) {
                setOptionTrueList(options.map((o2, j) => (j === i ? 1 : 0)));
              } else {
                const newOptionsList = options.map((o2, j) => {
                  if (j === i) return -1;
                  if (o2.id === correctAnswer.current) return 1;

                  return 0;
                });

                setOptionTrueList(newOptionsList);
              }
            }}
          />
        );
      })}
    </View>
  );
};

interface OptionProps {
  i: number;
  option: Option;
  optionTrue: number;
  onPress: () => void;
}

const QuestionOption: FunctionComponent<OptionProps> = ({
  i,
  option,
  optionTrue,
  onPress,
}) => {
  const AnimatedTouchableOpacity =
    Animated.createAnimatedComponent(TouchableOpacity);

  useEffect(() => {
    answerTrue.value = optionTrue;
  }, [optionTrue]);

  const answerTrue = useSharedValue(0);

  const optionStyle = useAnimatedStyle(() => {
    if (answerTrue.value === 1) {
      return {
        backgroundColor: "green",
      };
    } else if (answerTrue.value === -1) {
      return {
        backgroundColor: "red",
      };
    }

    return {
      backgroundColor: "#ffffff60",
      width: "100%",
    };
  }, []);

  const bgStyle = useAnimatedStyle(() => {
    if (answerTrue.value === 1) {
      return {
        backgroundColor: "green",
        width: withTiming("100%"),
      };
    } else if (answerTrue.value === -1) {
      return {
        backgroundColor: "red",
        width: withTiming("100%"),
      };
    }

    return {
      backgroundColor: "#00000000",
      width: "0%",
    };
  }, []);

  return (
    <AnimatedTouchableOpacity
      key={i}
      activeOpacity={0.6}
      className="w-full bg-white/60 mt-2 rounded-xl"
      onPress={onPress}
    >
      <Animated.View style={bgStyle} className="absolute h-full rounded-xl" />
      <View className="px-2 py-4">
        <Text
          className="text-base text-white"
          style={{
            shadowColor: "#000",
            shadowOffset: {
              height: 2,
              width: 2,
            },
            shadowRadius: 2,
            shadowOpacity: 1,
          }}
        >
          {option.answer}
        </Text>
      </View>
    </AnimatedTouchableOpacity>
  );
};

export default Options;
