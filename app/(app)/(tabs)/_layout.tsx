import { Tabs } from "expo-router";
import { IconButton } from "react-native-paper";

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }} initialRouteName="(plans)">
      <Tabs.Screen
        name="plans"
        options={{
          title: "Plans",
          tabBarLabelStyle: {
            fontFamily: "Inter_600SemiBold",
          },
          tabBarIcon: ({ focused, color }) => {
            const iconName = focused
              ? "clipboard-list"
              : "clipboard-list-outline";
            return <IconButton icon={iconName} size={26} iconColor={color} />;
          },
        }}
      />
      <Tabs.Screen
        name="meals"
        options={{
          title: "Meals",
          tabBarLabelStyle: {
            fontFamily: "Inter_600SemiBold",
          },
          tabBarIcon: ({ focused, color }) => {
            const iconName = focused ? "food" : "food-outline";
            return <IconButton icon={iconName} size={26} iconColor={color} />;
          },
        }}
      />
    </Tabs>
  );
}
