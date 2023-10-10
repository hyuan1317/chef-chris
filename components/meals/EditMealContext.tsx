import React, { createContext, useContext, useState } from "react";
import { EditMealState } from "./types";

interface EditMealContextValue {
  editMealState: EditMealState;
  setEditMealState: React.Dispatch<React.SetStateAction<EditMealState>>;
}

const EditMealContext = createContext<EditMealContextValue>({
  editMealState: {
    name: "",
    ingredients: {},
  },
  setEditMealState: undefined,
});

export default function EditMealProvider({ children }) {
  const [editMealState, setEditMealState] = useState<EditMealState>({
    name: "",
    ingredients: {},
  });

  return (
    <EditMealContext.Provider value={{ editMealState, setEditMealState }}>
      {children}
    </EditMealContext.Provider>
  );
}

export const useEditMeal = () => {
  const ctx = useContext(EditMealContext);
  if (!ctx) throw new Error("useEditMeal must be used within a MealProvider");
  return ctx;
};
