import { ElementType, FunctionComponent, ReactNode } from "react";
import { Text, View } from "react-native";

interface IconWithLabelProps {
  Icon: ReactNode;
  label: string;
}

const IconWithLabel: FunctionComponent<IconWithLabelProps> = ({
  Icon,
  label,
}) => {
  return (
    <View className="flex flex-col items-center">
      {Icon}
      <Text className="text-white text-sm">{label}</Text>
    </View>
  );
};

export default IconWithLabel;
