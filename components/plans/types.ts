import { Meal, EditMealState } from "@components/meals/types";
import { IngredientWithQty } from "@components/ingredient/types";

export interface PlanSummary {
  id: number;
  name: string;
  time: string;
  completed: boolean;
}

export type PlanDetail = PlanSummary & {
  meals: Meal[];
  ingredients: IngredientWithQty[];
};

export type CreatePlanReq = Omit<PlanDetail, "id">;

export interface EditPlanState {
  id?: number;
  name: string;
  time: string;
  completed: boolean;
  meals: Record<number, Meal>;
  ingredients: Record<number, IngredientWithQty>;
}
