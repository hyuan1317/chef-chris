import AsyncStorage from "@react-native-async-storage/async-storage";
import { Meal, CreateMealReq } from "@components/meals/types";

const MEALS = "MEALS";
const MEAL_ID_COUNT = "MEAL_ID_COUNT";

export const getMeals = async (): Promise<Meal[]> => {
  const data = await AsyncStorage.getItem(MEALS);
  return data ? JSON.parse(data) : [];
};

export const createMeal = async (meal: CreateMealReq) => {
  const meals = await getMeals();
  if (meals.find((i) => i.name === meal.name)) {
    throw new Error("Meal exists");
  }

  const idCount = await AsyncStorage.getItem(MEAL_ID_COUNT);
  const id = idCount ? Number(idCount) + 1 : 1;
  const newMeal = {
    ...meal,
    id,
  };
  meals.push(newMeal);
  await AsyncStorage.setItem(MEALS, JSON.stringify(meals));
  await AsyncStorage.setItem(MEAL_ID_COUNT, id.toString());

  return newMeal;
};

export const editMeal = async (meal: Meal) => {
  const meals = await getMeals();
  const targetMeal = meals.find((m) => m.id === meal.id);
  targetMeal.name = meal.name;
  targetMeal.ingredients = meal.ingredients;

  await AsyncStorage.setItem(MEALS, JSON.stringify(meals));
  return meal;
};

export const deleteMeal = async (mealId: number) => {
  const meals = await getMeals();
  const newMeals = meals.filter((p) => p.id !== mealId);

  await AsyncStorage.setItem(MEALS, JSON.stringify(newMeals));
};
