export interface Meal {
  id: number;
  name: string;
  ingredients: MealIngredient[];
}

export type MealIngredient = Ingredient & {
  quantity: number;
};

export interface Ingredient {
  id: number;
  name: string;
}

export interface MealDetails {
  name: string;
  ingredients: Record<number, MealIngredient>; // id: ingredient
}

export type CreateMealReq = Omit<Meal, "id">;
