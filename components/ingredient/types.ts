export type IngredientWithQty = Ingredient & {
  quantity: number;
};

export interface Ingredient {
  id: number;
  name: string;
}
