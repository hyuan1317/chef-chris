import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ingredient } from "@components/ingredient/types";

const INGREDIENTS = "INGREDIENTS";
const INGREDIENT_ID_COUNT = "INGREDIENT_ID_COUNT";

export const getIngredients = async (): Promise<Ingredient[]> => {
  const data = await AsyncStorage.getItem(INGREDIENTS);
  return data ? JSON.parse(data) : [];
};

export const createIngredient = async (name: string) => {
  const ingredients = await getIngredients();
  if (ingredients.find((i) => i.name === name)) {
    throw new Error("Ingredient exists");
  }

  const idCount = await AsyncStorage.getItem(INGREDIENT_ID_COUNT);
  const id = idCount ? Number(idCount) + 1 : 1;
  const newIngredient = {
    name,
    id,
  };
  ingredients.push(newIngredient);
  await AsyncStorage.setItem(INGREDIENTS, JSON.stringify(ingredients));
  await AsyncStorage.setItem(INGREDIENT_ID_COUNT, id.toString());

  return newIngredient;
};
