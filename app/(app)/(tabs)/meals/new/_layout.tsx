import { Stack } from "expo-router";

export default function NewMealLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen
        name="addIngredient"
        options={{
          headerShown: true,
          title: "Add Ingredient",
        }}
      />
    </Stack>
  );
}
