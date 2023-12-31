import React, { createContext, useContext, useState } from "react";
import { EditMealState } from "./types";

interface EditMealContextValue {
  editMealState: EditMealState;
  setEditMealState: React.Dispatch<React.SetStateAction<EditMealState>>;
  reset: () => void;
}

const initialEditMealState: EditMealState = {
  name: "",
  ingredients: {},
};

const EditMealContext = createContext<EditMealContextValue>({
  editMealState: initialEditMealState,
  setEditMealState: undefined,
  reset: undefined,
});

export default function EditMealProvider({ children }) {
  const [editMealState, setEditMealState] =
    useState<EditMealState>(initialEditMealState);

  const reset = () => {
    // hard reset ingredients with new obj
    // due to the way we manipulate data: nested obj won't be reset (ingredients) if we use the same initial variable
    setEditMealState({
      name: "",
      ingredients: {},
    });
  };

  return (
    <EditMealContext.Provider
      value={{ editMealState, setEditMealState, reset }}
    >
      {children}
    </EditMealContext.Provider>
  );
}

export const useEditMeal = () => {
  const ctx = useContext(EditMealContext);
  if (!ctx)
    throw new Error("useEditMeal must be used within a EditMealProvider");
  return ctx;
};
