import { IngredientWithQty } from "@components/ingredient/types";

export type ListItem = IngredientWithQty & {
  checked: boolean;
};

export type CheckListState = {
  planId: number;
  checklist: Record<number, ListItem>;
};
