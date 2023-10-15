import { useTailwind } from "nativewind";

export const useTailwindColor = (className: string) => {
  console.log(className);

  const color = useTailwind({ className }) as { backgroundColor: string }[];
  console.log(color);

  return color[0].backgroundColor;
};
