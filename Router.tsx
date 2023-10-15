import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "./src/screens/Home";
import { FunctionComponent } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { MaterialCommunityIcons, FontAwesome5 } from "@expo/vector-icons";
import { Text } from "react-native";

export type MainTabParams = {
  Home: undefined;
  Discover: undefined;
  Activity: undefined;
  Bookmarks: undefined;
  Profile: undefined;
};

const MainTab = createBottomTabNavigator<MainTabParams>();

const MainTabNavigator = () => {
  const activeColor = "#ffffff";
  const inactiveColor = "#666666";

  return (
    <MainTab.Navigator
      screenOptions={({}) => ({
        tabBarStyle: {
          backgroundColor: "#000000",
          borderTopWidth: 0,
          borderTopColor: "#00000000",
        },
        headerShown: false,
        tabBarLabel: ({ children, focused, color }) => {
          return (
            <Text
              className="text-xs"
              style={{
                color: focused ? activeColor : inactiveColor,
              }}
            >
              {children}
            </Text>
          );
        },
      })}
    >
      <MainTab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <MaterialCommunityIcons
                name="home"
                size={24}
                color={focused ? activeColor : inactiveColor}
              />
            );
          },
        }}
      />
      <MainTab.Screen
        name="Discover"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <MaterialCommunityIcons
                name="compass"
                size={24}
                color={focused ? activeColor : inactiveColor}
              />
            );
          },
        }}
      />
      <MainTab.Screen
        name="Activity"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <FontAwesome5
                name="stopwatch"
                size={24}
                color={focused ? activeColor : inactiveColor}
              />
            );
          },
        }}
      />
      <MainTab.Screen
        name="Bookmarks"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <MaterialCommunityIcons
                name="bookmark"
                size={24}
                color={focused ? activeColor : inactiveColor}
              />
            );
          },
        }}
      />
      <MainTab.Screen
        name="Profile"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <MaterialCommunityIcons
                name="account-circle"
                size={24}
                color={focused ? activeColor : inactiveColor}
              />
            );
          },
        }}
      />
    </MainTab.Navigator>
  );
};

const Router: FunctionComponent = () => {
  return (
    <NavigationContainer>
      <MainTabNavigator />
    </NavigationContainer>
  );
};

export default Router;
