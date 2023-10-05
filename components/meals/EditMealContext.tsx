import React, { createContext, useContext, useState } from "react";
import { MealDetails } from "./types";
import { useMeal } from "./MealContext";

interface EditMealContextValue {
  mealDetail: MealDetails;
  setMealDetail: React.Dispatch<React.SetStateAction<MealDetails>>;
}

const EditMealContext = createContext<EditMealContextValue>({
  mealDetail: {
    name: "",
    ingredients: {},
  },
  setMealDetail: undefined,
});

export default function EditMealProvider({ children }) {
  const [mealDetail, setMealDetail] = useState<MealDetails>({
    name: "",
    ingredients: {},
  });
  const {} = useMeal();

  return (
    <EditMealContext.Provider value={{ mealDetail, setMealDetail }}>
      {children}
    </EditMealContext.Provider>
  );
}

export const useEditMeal = () => {
  const ctx = useContext(EditMealContext);
  if (!ctx) throw new Error("useEditMeal must be used within a MealProvider");
  return ctx;
};
