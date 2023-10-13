import { Stack } from "expo-router";

export default function PlanLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen
        options={{
          headerShown: true,
          title: "Add Item",
        }}
        name="addIngredient"
      />
      <Stack.Screen
        options={{
          headerShown: true,
          title: "Add Meal",
        }}
        name="addMeal"
      />
      <Stack.Screen
        options={{
          headerShown: true,
        }}
        name="[mealId]"
      />
    </Stack>
  );
}
