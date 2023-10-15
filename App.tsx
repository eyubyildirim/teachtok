import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import Router from "./Router";
import { QueryClient, QueryClientProvider } from "react-query";

export default function App() {
  return (
    <View className="h-full w-full">
      <QueryClientProvider client={new QueryClient()}>
        <Router />
      </QueryClientProvider>
      <StatusBar style="light" />
    </View>
  );
}
