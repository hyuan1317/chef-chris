import { Stack } from "expo-router";
import EditMealProvider from "@components/meals/EditMealContext";

export default function MealsLayout() {
  return (
    <EditMealProvider>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen
          name="[id]"
          options={{
            presentation: "modal",
          }}
        />
        <Stack.Screen
          name="new"
          options={{
            presentation: "modal",
          }}
        />
      </Stack>
    </EditMealProvider>
  );
}
