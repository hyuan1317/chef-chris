import { Stack } from "expo-router";
import IngredientProvider from "@components/meals/ingredient/IngredientContext";
import EditMealProvider from "@components/meals/EditMealContext";

export default function MealsLayout() {
  return (
    <EditMealProvider>
      <IngredientProvider>
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="[id]" />
          <Stack.Screen
            name="addIngredient"
            options={{
              headerShown: true,
              title: "Add Ingredient",
            }}
          />
          <Stack.Screen name="newMeal" />
        </Stack>
      </IngredientProvider>
    </EditMealProvider>
  );
}
