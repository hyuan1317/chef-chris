import React, { createContext, useContext, useEffect, useState } from "react";
import { Meal, CreateMealReq } from "./types";
import * as mealService from "@services/mealService";

interface MealContextValue {
  meals: Meal[];
  createMeal: (meal: CreateMealReq) => Promise<Meal>;
  editMeal: (meal: Meal) => Promise<Meal>;
}

const MealContext = createContext<MealContextValue>({
  meals: [],
  createMeal: undefined,
  editMeal: undefined,
});

export default function MealProvider({ children }) {
  const [meals, setMeals] = useState<Meal[]>([]);

  useEffect(() => {
    fetchMeals();
  }, []);

  const fetchMeals = async () => {
    try {
      const data = await mealService.getMeals();
      setMeals(data);
    } catch {
      // error
    }
  };

  const createMeal = async (meal: CreateMealReq) => {
    try {
      const data = await mealService.createMeal(meal);
      fetchMeals();
      return data;
    } catch {
      // error
    }
  };

  const editMeal = async (meal: Meal) => {
    try {
      const data = await mealService.editMeal(meal);
      fetchMeals();
      return data;
    } catch {
      // error
    }
  };

  return (
    <MealContext.Provider value={{ meals, createMeal, editMeal }}>
      {children}
    </MealContext.Provider>
  );
}

export const useMeal = () => {
  const ctx = useContext(MealContext);
  if (!ctx) throw new Error("useMeal must be used within a MealProvider");
  return ctx;
};
