import { IngredientWithQty } from "../ingredient/types";
export interface Meal {
  id: number;
  name: string;
  ingredients: IngredientWithQty[];
}

export interface EditMealState {
  id?: number;
  name: string;
  ingredients: Record<number, IngredientWithQty>; // id: ingredient
}

export type CreateMealReq = Omit<Meal, "id">;
