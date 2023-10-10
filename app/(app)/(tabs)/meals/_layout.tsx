import { Stack } from "expo-router";
import MealProvider from "@components/meals/MealContext";
import EditMealProvider from "@components/meals/EditMealContext";
import IngredientProvider from "@components/ingredient/IngredientContext";

export default function MealsLayout() {
  return (
    <MealProvider>
      <EditMealProvider>
        <IngredientProvider>
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
        </IngredientProvider>
      </EditMealProvider>
    </MealProvider>
  );
}
