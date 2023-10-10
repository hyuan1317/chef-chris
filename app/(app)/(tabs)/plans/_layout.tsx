import { Stack } from "expo-router";
import PlanProvider from "@components/plans/PlanContext";
import EditPlanProvider from "@components/plans/EditPlanContext";
import IngredientProvider from "@components/ingredient/IngredientContext";
import MealProvider from "@components/meals/MealContext";

export default function PlansLayout() {
  return (
    <PlanProvider>
      <EditPlanProvider>
        <MealProvider>
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
                  presentation: "fullScreenModal",
                }}
              />
              <Stack.Screen
                name="new"
                options={{
                  presentation: "fullScreenModal",
                }}
              />
            </Stack>
          </IngredientProvider>
        </MealProvider>
      </EditPlanProvider>
    </PlanProvider>
  );
}
