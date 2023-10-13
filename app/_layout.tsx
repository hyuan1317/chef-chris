import { Slot } from "expo-router";
import { PaperProvider } from "react-native-paper";
import MealProvider from "@components/meals/MealContext";
import PlanProvider from "@components/plans/PlanContext";
import IngredientProvider from "@components/ingredient/IngredientContext";
import CheckListProvider from "@components/groceryList/CheckListContext";

export default function Root() {
  return (
    <PlanProvider>
      <MealProvider>
        <IngredientProvider>
          <CheckListProvider>
            <PaperProvider>
              <Slot />
            </PaperProvider>
          </CheckListProvider>
        </IngredientProvider>
      </MealProvider>
    </PlanProvider>
  );
}
