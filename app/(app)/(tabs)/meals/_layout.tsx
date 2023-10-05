import { Stack } from "expo-router";
import MealProvider from "@components/meals/MealContext";

export default function MealsLayout() {
  return (
    <MealProvider>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen
          name="(modal)"
          options={{
            presentation: "modal",
          }}
        />
      </Stack>
    </MealProvider>
  );
}
